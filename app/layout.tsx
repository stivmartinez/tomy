import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { cn } from "@/lib/utils"
import "./globals.css"
import { fetchFooter } from "@/lib/api/footer"
import { fetchHeader } from "@/lib/api/header"
import BlocksRender from "@/components/blocksRender"

const inter = Inter({ weight: ["300", "500", "700"], subsets: ["latin"] })

export async function generateMetadata(): Promise<Metadata> {
  const title = {
    default: "Viralike",
    template: "%s | Viralike",
  }
  const description = "A simple, fast, and secure way to create a website."

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
}: {
  children: React.ReactNode
}) {
  const header = (await fetchHeader()).header
  const footer = (await fetchFooter()).footer

  return (
    <html lang="en">
      <body className={cn`${inter.className} text-slate-900`}>
        <BlocksRender template={header} />
        {children}
        <BlocksRender template={footer} />
      </body>
    </html>
  )
}
