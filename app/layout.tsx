import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { cn } from "@/lib/utils"
import "./globals.css"
import { fetchApiResponse } from "@/api/mockApi"

import BlocksRender from "@/components/blocksRender"

const inter = Inter({ weight: ["400", "600"], subsets: ["latin"] })

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
  const template = await fetchApiResponse()

  return (
    <html lang="en">
      <body className={cn`${inter.className} text-slate-900`}>
        <BlocksRender template={template.header} />
        {children}
        <BlocksRender template={template.footer} />
      </body>
    </html>
  )
}
