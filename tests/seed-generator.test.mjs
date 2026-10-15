import { test } from "node:test"
import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import { diceToBits, entropyToMnemonic, generateEntropy } from "../lib/seed-generator.mjs"

test("random entropy requests the exact byte count and preserves every bit", (t) => {
  const sizes = []
  t.mock.method(globalThis.crypto, "getRandomValues", (bytes) => {
    sizes.push(bytes.length)
    bytes.set(Array.from({ length: bytes.length }, (_, index) => index % 2 ? 255 : 0))
    return bytes
  })
  assert.equal(generateEntropy(128), "0000000011111111".repeat(8))
  assert.equal(generateEntropy(256), "0000000011111111".repeat(16))
  assert.deepEqual(sizes, [16, 32])
  assert.throws(() => generateEntropy(129))
  assert.throws(() => generateEntropy("128"))
})

test("random entropy fails closed when secure randomness is unavailable", (t) => {
  t.mock.method(globalThis.crypto, "getRandomValues", () => { throw new Error("unavailable") })
  assert.throws(() => generateEntropy(128), /unavailable/)
})

const vectors = JSON.parse(await readFile(new URL("./seed-vectors.json", import.meta.url)))
for (const [language, cases] of Object.entries(vectors)) {
  const words = JSON.parse(await readFile(new URL(`../lib/seed-wordlists/${language}.json`, import.meta.url)))
  test(`published Trezor BIP39 vectors: ${language}`, async () => {
    for (const [hex, phrase] of cases) {
      const bits = [...Buffer.from(hex, "hex")].map(byte => byte.toString(2).padStart(8, "0")).join("")
      const result = await entropyToMnemonic(bits, words)
      assert.equal(result.words.join(" ").normalize("NFKD"), phrase.normalize("NFKD").replaceAll("\u3000", " "))
      assert.equal(result.checksum.length, bits.length / 32)
    }
  })
}
test("dice parity mapping preserves one bit per roll", () => {
  assert.equal(diceToBits("1 2 3\n4 5 6"), "010101")
  assert.throws(() => diceToBits("120"))
  assert.throws(() => diceToBits("1,2"))
})
test("reject invalid entropy and dictionaries", async () => {
  await assert.rejects(entropyToMnemonic("0".repeat(127), []))
  await assert.rejects(entropyToMnemonic("2".repeat(128), []))
  await assert.rejects(entropyToMnemonic("0".repeat(128), Array(2048).fill("same")))
})

test("offline translations cover every language and every message", async () => {
  const { offlineTranslations, offlineLanguages } = await import("../lib/seed-offline-translations.mjs")
  const keys = Object.keys(offlineTranslations.en).sort()
  assert.equal(offlineLanguages.length, 10)
  for (const [code] of offlineLanguages) {
    const copy = offlineTranslations[code]
    assert.deepEqual(Object.keys(copy).sort(), keys)
    assert(Object.values(copy).every(value => typeof value === "string" && value.trim().length))
    assert(copy.diceInstructions.includes("128") && copy.diceInstructions.includes("256"))
    assert(copy.checksumInstructions.includes("SHA-256"))
  }
})
