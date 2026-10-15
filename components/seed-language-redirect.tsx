"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { deviceSeedLanguage, seedLanguages } from "@/lib/seed"

export function SeedLanguageRedirect() {
  const router = useRouter()
  useEffect(() => {
    router.replace(`/seed/${deviceSeedLanguage(navigator.languages?.length ? navigator.languages : [navigator.language])}`)
  }, [router])

  return <main className="mx-auto min-h-[80vh] max-w-2xl space-y-6 px-4 py-12">
    <h1 className="text-3xl font-semibold">Seed word dictionary</h1>
    <p className="text-muted-foreground">Choose a dictionary language.</p>
    <nav className="flex flex-wrap gap-4" aria-label="Dictionary language">
      {seedLanguages.map((language) => <Link key={language.code} href={`/seed/${language.code}`} className="underline">{language.label}</Link>)}
    </nav>
  </main>
}
