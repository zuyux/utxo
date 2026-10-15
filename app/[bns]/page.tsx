import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getBnsProfile, normalizeBnsName } from "@/lib/bns"
import { BnsProfileView } from "@/components/bns-profile"

export async function generateMetadata({ params }: { params: Promise<{ bns: string }> }): Promise<Metadata> {
  const { bns } = await params
  return { title: `${normalizeBnsName(bns) ?? "BNS"} · BNS`, robots: { index: false, follow: true } }
}

export default async function BnsPage({ params }: { params: Promise<{ bns: string }> }) {
  const { bns } = await params
  const name = normalizeBnsName(bns)
  if (!name) notFound()
  const result = await getBnsProfile(name)
  return <BnsProfileView bns={bns} name={name} result={result} />
}
