import { notFound } from "next/navigation"
import { SeedDictionary } from "@/components/seed-dictionary"
import { seedLanguages } from "@/lib/seed"
import { getSeedPageCopy } from "@/lib/seed-page-copy"
import { pageMetadata } from "@/lib/seo"

export const dynamicParams = false

export function generateStaticParams() {
  return seedLanguages.map(({ code }) => ({ language: code }))
}

export async function generateMetadata({ params }: { params: Promise<{ language: string }> }) {
  const { language } = await params
  const selected = seedLanguages.find((item) => item.code === language)
  if (!selected) notFound()
  const copy = getSeedPageCopy(language)
  const metadata = pageMetadata(copy.title, copy.intro, `/seed/${selected.code}`)
  if (metadata.openGraph) metadata.openGraph.locale = language.replace("-", "_")
  return metadata
}

export default async function SeedLanguagePage({ params }: { params: Promise<{ language: string }> }) {
  const { language } = await params
  const selected = seedLanguages.find((item) => item.code === language)
  if (!selected) notFound()
  const { default: words } = await import(`@/lib/seed-wordlists/${selected.file}.json`) as { default: string[] }
  return <SeedDictionary key={selected.code} language={selected.code} words={words} />
}
