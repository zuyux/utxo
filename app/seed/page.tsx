import { SeedLanguageRedirect } from "@/components/seed-language-redirect"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata("Physical BIP39 Seed Generator", "Printable BIP39 word posters, physical dice instructions and a downloadable offline checksum calculator.", "/seed")

export default function SeedPage() {
  return <SeedLanguageRedirect />
}
