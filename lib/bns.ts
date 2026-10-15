/** Bare aliases use the Bitcoin namespace; fully qualified names are preserved. */
export function normalizeBnsName(alias: string): string | null {
  const name = alias.trim().toLowerCase()
  if (!/^[a-z0-9_-]{1,37}(?:\.[a-z0-9_-]{1,20})?$/.test(name)) return null
  return name.includes(".") ? name : `${name}.btc`
}

export type BnsResolution =
  | { status: "resolved"; address: string }
  | { status: "unregistered" }
  | { status: "missing" }
  | { status: "unavailable" }

export async function resolveBnsAddress(name: string): Promise<BnsResolution> {
  try {
    const registration = await fetch(`https://api.bnsv2.com/names/${encodeURIComponent(name)}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    })
    if (registration.status === 404) {
      const data: unknown = await registration.json()
      if (data && typeof data === "object" && "error" in data && data.error === "Name not found") {
        return { status: "unregistered" }
      }
      return { status: "unavailable" }
    }
    if (!registration.ok) return { status: "unavailable" }

    let response = await fetch(`https://api.bnsv2.com/btc-address/${encodeURIComponent(name)}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    })
    // Some BTC.US records are valid JSON but rejected by the address endpoint's
    // profile validator. The raw endpoint checks expiry, revocation, and owner.
    let rawZonefile = false
    if (response.status === 400) {
      response = await fetch(`https://api.bnsv2.com/zonefile/${encodeURIComponent(name)}/raw`, {
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
      })
      rawZonefile = true
    }
    if (response.status === 400 || response.status === 404) return { status: "missing" }
    if (!response.ok) return { status: "unavailable" }

    const payload: unknown = await response.json()
    const data = rawZonefile
      ? payload && typeof payload === "object" && "full_name" in payload && payload.full_name === name && "zonefile" in payload
        ? payload.zonefile
        : undefined
      : payload
    const address = data && typeof data === "object" && "btc" in data ? data.btc : undefined
    // Only mainnet Bitcoin destinations may enter the address explorer.
    if (typeof address !== "string" || !/^(?:[13][1-9A-HJ-NP-Za-km-z]{25,34}|bc1[ac-hj-np-z02-9]{11,87})$/.test(address)) {
      return { status: "missing" }
    }
    return { status: "resolved", address }
  } catch {
    return { status: "unavailable" }
  }
}

export type BnsProfile =
  | { status: "registered"; registration: Record<string, unknown>; zonefile: Record<string, unknown> | null; profileUnavailable: boolean }
  | { status: "unregistered" | "unavailable" }

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

export async function getBnsProfile(name: string): Promise<BnsProfile> {
  try {
    const response = await fetch(`https://api.bnsv2.com/names/${encodeURIComponent(name)}`, { cache: "no-store", signal: AbortSignal.timeout(8000) })
    const registration: unknown = await response.json()
    if (response.status === 404 && isRecord(registration) && registration.error === "Name not found") return { status: "unregistered" }
    if (!response.ok || !isRecord(registration) || !isRecord(registration.data) || registration.data.full_name !== name) return { status: "unavailable" }
    const profile: BnsProfile = { status: "registered", registration, zonefile: null, profileUnavailable: false }
    try {
      const raw = await fetch(`https://api.bnsv2.com/zonefile/${encodeURIComponent(name)}/raw`, { cache: "no-store", signal: AbortSignal.timeout(8000) })
      if (raw.status === 400 || raw.status === 404) return profile
      if (!raw.ok) return { ...profile, profileUnavailable: true }
      const payload: unknown = await raw.json()
      if (!isRecord(payload) || payload.full_name !== name || !isRecord(payload.zonefile) || payload.zonefile.owner !== registration.data.owner) return { ...profile, profileUnavailable: true }
      return { ...profile, zonefile: payload.zonefile }
    } catch {
      return { ...profile, profileUnavailable: true }
    }
  } catch {
    return { status: "unavailable" }
  }
}
