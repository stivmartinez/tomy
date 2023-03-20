/* eslint-disable @next/next/no-img-element */

import { Inter } from "next/font/google"
import { User } from "lucide-react"

import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export default function Footer() {
  return (
    <footer
      className={cn`${inter.className} w-full flex py-10 items-center self-end`}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-row items-center justify-between">
        <p className="text-xs text-slate-400">
          Copyright © 2023 Themesei. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
