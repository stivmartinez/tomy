import { cn } from "@/lib/utils"
/* eslint-disable @next/next/no-img-element */

import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function Footer({ t }: { t: any }) {
  return (
    <footer
      className={cn`${inter.className} w-full flex py-10 items-center`}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-row items-center justify-center px-4">
        <p className="text-xs text-slate-400">{t.footer.copyright}</p>
      </div>
    </footer>
  )
}
