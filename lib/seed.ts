export const seedLanguages = [
  { code: "en", label: "English", file: "english" },
  { code: "es", label: "Español", file: "spanish" },
  { code: "pt", label: "Português", file: "portuguese" },
  { code: "fr", label: "Français", file: "french" },
  { code: "it", label: "Italiano", file: "italian" },
  { code: "cs", label: "Čeština", file: "czech" },
  { code: "ja", label: "日本語", file: "japanese" },
  { code: "ko", label: "한국어", file: "korean" },
  { code: "zh-hans", label: "中文（简体）", file: "chinese_simplified" },
  { code: "zh-hant", label: "中文（繁體）", file: "chinese_traditional" },
] as const

export function deviceSeedLanguage(locales: readonly string[]) {
  for (const locale of locales) {
    const code = locale.toLowerCase()
    if (code === "zh" || code.startsWith("zh-")) {
      return /(?:hant|tw|hk|mo)/.test(code) ? "zh-hant" : "zh-hans"
    }
    const match = seedLanguages.find((item) => item.code === code.split("-")[0])
    if (match) return match.code
  }
  return "en"
}
