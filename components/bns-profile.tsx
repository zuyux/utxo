"use client"

import Link from "next/link"
import type { BnsProfile } from "@/lib/bns"
import { useLanguage } from "@/lib/i18n"
import { bnsTranslations } from "@/lib/bns-translations"

function field(record: Record<string, unknown> | null, key: string) {
  const value = record?.[key]
  return typeof value === "string" && value.trim() ? value : null
}

function webLink(value: string | null) {
  if (!value) return undefined
  try {
    const url = new URL(value)
    return ["https:", "http:"].includes(url.protocol) ? url.href : undefined
  } catch { return undefined }
}

export function BnsProfileView({ bns, name, result }: { bns: string; name: string; result: BnsProfile }) {
  const { language } = useLanguage()
  const copy = bnsTranslations[language]
  const profile = result.status === "registered" ? result : null
  const status = profile?.registration.status
  const statusLabel = status === "active" ? copy.active : status === "expired" ? copy.expired : status === "revoked" ? copy.revoked : typeof status === "string" ? status : copy.registered
  const zonefile = profile?.zonefile ?? null
  const registration = profile?.registration.data as Record<string, unknown> | undefined
  const bitcoin = field(zonefile, "btc")
  const bitcoinHref = bitcoin && /^(?:[13][1-9A-HJ-NP-Za-km-z]{25,34}|bc1[ac-hj-np-z02-9]{11,87})$/.test(bitcoin) ? `/address/${encodeURIComponent(bitcoin)}` : undefined
  const lightning = field(zonefile, "lightning")
  const nostr = field(zonefile, "nostr")
  const owner = field(registration ?? null, "owner")
  const stacks = field(zonefile, "stx") ?? field(zonefile, "stacks")
  const website = field(zonefile, "url") ?? field(zonefile, "website")
  const stacksLink = (value: string | null) => value && /^SP[0-9A-Z]+$/.test(value) ? `https://explorer.hiro.so/address/${encodeURIComponent(value)}?chain=mainnet` : undefined
  const fields = [
    { label: "Bitcoin", value: bitcoin, href: bitcoinHref },
    { label: "Lightning (LN)", value: lightning, href: webLink(lightning) },
    { label: "Nostr", value: nostr, href: nostr && /^(?:npub|nprofile)1[ac-hj-np-z02-9]+$/.test(nostr) ? `nostr:${nostr}` : undefined },
    { label: copy.owner, value: owner, href: stacksLink(owner) },
    ...(stacks ? [{ label: copy.stacks, value: stacks, href: stacksLink(stacks) }] : []),
    { label: copy.website, value: website, href: webLink(website) },
    { label: copy.description, value: field(zonefile, "general") ?? field(zonefile, "bio"), href: undefined },
    { label: "Twitter / X", value: field(zonefile, "twitter"), href: undefined },
  ]
  return (
    <main className="mx-auto min-h-[75vh] max-w-2xl space-y-6 px-4 py-10 sm:py-16">
      <Link href="/" className="text-sm text-muted-foreground underline underline-offset-4">{copy.back}</Link>
      <header className="space-y-2">
        <p className="text-sm text-muted-foreground">{copy.profile}</p>
        <h1 className="break-all text-3xl font-semibold sm:text-4xl">{name}</h1>
        {profile && <p className="text-sm text-muted-foreground">{copy.status}: {statusLabel}</p>}
      </header>
      {profile ? <>
        {!zonefile && <p role="status" className="rounded-xl border p-4 text-sm text-muted-foreground">{profile.profileUnavailable ? copy.unavailableProfile : copy.missingProfile}</p>}
        <dl className="divide-y rounded-2xl border px-5">
          {fields.map(({ label, value, href }) => <div key={label} className="space-y-2 py-5">
            <dt className="text-sm text-muted-foreground">{label}</dt>
            <dd className="break-all text-sm">{value ? href ? <a href={href} className="underline underline-offset-4">{value}</a> : value : <span className="text-muted-foreground">{profile.profileUnavailable ? copy.unavailable : copy.empty}</span>}</dd>
          </div>)}
        </dl>
        {bitcoinHref && <Link href={bitcoinHref} className="inline-flex rounded-lg border px-4 py-2 text-sm hover:bg-muted">{copy.explore}</Link>}
        <details className="rounded-xl border p-4">
          <summary className="cursor-pointer text-sm">{copy.all}</summary>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap break-all text-xs text-muted-foreground">{JSON.stringify({ registration: profile.registration, zonefile }, null, 2)}</pre>
        </details>
      </> : <p className="text-muted-foreground">{result.status === "unregistered" ? copy.unregistered : copy.outage}</p>}
      {result.status === "unregistered" && <a href="https://btc.us" target="_blank" rel="noopener noreferrer" className="inline-flex rounded-lg border px-4 py-2 text-sm hover:bg-muted">{copy.buy}</a>}
      <div><a href={`/${encodeURIComponent(bns)}`} className="text-sm underline underline-offset-4">{copy.refresh}</a></div>
    </main>
  )
}
