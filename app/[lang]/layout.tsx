import type { Metadata } from "next"
import { i18n } from "@/i18n-config"

import "../globals.css"
import { getLocale } from "@/locales"

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const lang = params.lang
  const t = await getLocale(lang)
  const title = {
    default: t.seo.home.title,
    template: "%s | Themesei",
  }
  const description = t.seo.home.description

  return {
    title,
    description,
    icons: {
      icon: "/favicon.png",
      shortcut: "/favicon.png",
      apple: "/favicon.png",
    },
  }
}

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  )
}
