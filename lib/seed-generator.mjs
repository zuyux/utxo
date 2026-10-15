// One fair six-sided die: odd = 0, even = 1. Each roll supplies one bit.
export function diceToBits(rolls) {
  const compact = rolls.replace(/\s/g, "")
  if (!/^[1-6]*$/.test(compact)) throw new Error("Use only dice faces 1–6 and whitespace.")
  return [...compact].map((face) => Number(face) % 2 === 0 ? "1" : "0").join("")
}

export async function entropyToMnemonic(bits, words) {
  if (!/^(?:[01]{128}|[01]{256})$/.test(bits)) throw new Error("Exactly 128 or 256 entropy bits are required.")
  if (words.length !== 2048 || new Set(words).size !== 2048) throw new Error("Invalid BIP39 dictionary.")
  const bytes = Uint8Array.from(bits.match(/.{8}/g), (byte) => parseInt(byte, 2))
  const digest = new Uint8Array(await globalThis.crypto.subtle.digest("SHA-256", bytes))
  const checksum = digest[0].toString(2).padStart(8, "0").slice(0, bits.length / 32)
  const combined = bits + checksum
  const indices = combined.match(/.{11}/g).map((group) => parseInt(group, 2))
  return { checksum, indices, words: indices.map((index) => words[index]) }
}
