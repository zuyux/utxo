import { HDKey } from "@scure/bip32"

export const receivingKeyPath = "m/84'/0'/0'/0/0"

// Derive the first BIP84 mainnet receiving key using the BIP39 passphrase.
export async function mnemonicToPublicKey(words, passphrase = "") {
  const encoder = new TextEncoder()
  const material = await globalThis.crypto.subtle.importKey(
    "raw", encoder.encode(words.join(" ").normalize("NFKD")), "PBKDF2", false, ["deriveBits"],
  )
  const seed = new Uint8Array(await globalThis.crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: encoder.encode(("mnemonic" + passphrase).normalize("NFKD")), iterations: 2048, hash: "SHA-512" }, material, 512,
  ))
  let root
  let child
  try {
    root = HDKey.fromMasterSeed(seed)
    child = root.derive(receivingKeyPath)
    return Array.from(child.publicKey, byte => byte.toString(16).padStart(2, "0")).join("")
  } finally {
    seed.fill(0)
    root?.wipePrivateData()
    child?.wipePrivateData()
  }
}
