"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, BookOpen, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { seedLanguages } from "@/lib/seed"
import { getSeedPageCopy } from "@/lib/seed-page-copy"

export function SeedDictionary({ language, words }: { language: string; words: string[] }) {
  const router = useRouter()
  const copy = getSeedPageCopy(language)
  const selected = seedLanguages.find((item) => item.code === language)!

  return <>
    <div className="seed-screen" lang={language}>
      <header className="flex h-14 items-center justify-between border-b px-4">
        <Link href="/" className="font-title font-semibold">utxo.lat</Link>
        <ThemeToggle label={copy.theme} />
      </header>
      <main className="mx-auto min-h-[80vh] max-w-3xl space-y-8 px-4 py-10 sm:py-14">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" aria-hidden="true" />{copy.back}</Link>
        <section className="space-y-4">
          <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground"><BookOpen className="size-4" aria-hidden="true" /> BIP39 · 2,048</p>
          <h1 className="text-3xl font-semibold sm:text-4xl">{copy.title}</h1>
          <p className="max-w-xl text-muted-foreground">{copy.intro}</p>
        </section>
        <section className="space-y-4 rounded-xl border p-5" aria-label={copy.language}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <label htmlFor="seed-language" className="block text-sm">{copy.language}</label>
              <select id="seed-language" value={language} onChange={(event) => router.push(`/seed/${event.target.value}`)} className="h-10 w-full rounded-md border bg-background px-3 text-sm sm:w-64">
                {seedLanguages.map((item) => <option key={item.code} value={item.code}>{item.label}</option>)}
              </select>
            </div>
            <Button onClick={() => window.print()} className="gap-2"><Printer className="size-4" aria-hidden="true" />{copy.print}</Button>
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">{copy.help}</p>
        </section>
        <section className="space-y-4" aria-labelledby="seed-guide">
          <h2 id="seed-guide" className="text-xl font-semibold">{copy.heading}</h2>
          <a href="/seed-offline.html" download className="inline-flex rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent">{copy.download}</a>
          <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-muted-foreground">
            {copy.steps.map((step) => <li key={step} className="pl-2">{step}</li>)}
          </ol>
          <p className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 text-sm leading-relaxed">{copy.note}</p>
        </section>
        <section className="space-y-4" aria-labelledby="seed-words">
          <div className="flex items-baseline justify-between gap-4">
            <h2 id="seed-words" className="text-xl font-semibold" lang={language}>{selected.label}</h2>
            <span className="text-xs text-muted-foreground">{words.length.toLocaleString(language)} {copy.count}</span>
          </div>
          <a href="https://github.com/bitcoin/bips/tree/master/bip-0039" target="_blank" rel="noopener noreferrer" className="inline-block text-xs text-muted-foreground underline underline-offset-4">{copy.source} ↗</a>
        </section>
      </main>
    </div>
    <article className="seed-print seed-poster" lang={language}>
      <h1>BIP39 — {selected.label} — 2,048</h1>
      <p>{copy.reference}</p>
      <div className="seed-poster-grid">{words.map((word, index) => <div key={index}><span>{index.toString().padStart(4, "0")} · {index.toString(2).padStart(11, "0")}</span><strong>{word}</strong></div>)}</div>
      <p>https://github.com/bitcoin/bips/tree/master/bip-0039</p>
    </article>
  </>
}
