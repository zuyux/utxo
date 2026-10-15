import type { MetadataRoute } from "next"
import { seedLanguages } from "@/lib/seed"
import { siteUrl } from "@/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/seed`, changeFrequency: "yearly", priority: 0.5 },
    ...seedLanguages.map(({ code }) => ({ url: `${siteUrl}/seed/${code}`, changeFrequency: "yearly" as const, priority: 0.4 })),
    { url: `${siteUrl}/testnet`, changeFrequency: "daily", priority: 0.6 },
  ]
}
