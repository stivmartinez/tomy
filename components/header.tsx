import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronRight, User } from "lucide-react"
/* eslint-disable @next/next/no-img-element */

import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function Header({ t }: { t: any }) {
  return (
    <header
      className={cn`${inter.className} w-full flex items-center border-b`}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-row items-center justify-between px-4">
        <div className={cn`w-24 py-4 md:w-28`}>
          <img src="/logo.svg" alt="Logo" className="w-full" />
        </div>
        <div className="flex flex-row gap-2">
          <Button className="h-8 w-fit gap-2 whitespace-nowrap bg-transparent px-3 text-xs font-normal text-slate-900 hover:bg-transparent sm:text-sm">
            <span>{t.header.buttons.signIn}</span>
            <ChevronRight size="16" />
          </Button>
          <Button className="h-8 w-fit gap-2 whitespace-nowrap border border-slate-700 px-3 text-xs font-normal md:text-sm">
            <span>{t.header.buttons.requestAccess}</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
