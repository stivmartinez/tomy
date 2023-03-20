import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronRight, User } from "lucide-react"
/* eslint-disable @next/next/no-img-element */

import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function Header() {
  return (
    <header className={cn`${inter.className} w-full flex items-center border-b`}>
      <div className="mx-auto flex w-full max-w-6xl flex-row items-center justify-between">
        <div className={cn`w-28 py-4`}>
          <img src="/logo.svg" alt="Logo" className="w-full" />
        </div>
        <div className="flex flex-row gap-2">
          <Button className="h-auto w-fit gap-2 whitespace-nowrap bg-transparent py-2 px-5 text-sm font-normal text-slate-900 hover:bg-transparent">
            <span>Sign in</span>
            <ChevronRight size="20" />
          </Button>
          <Button className="h-auto w-fit gap-2 whitespace-nowrap border border-slate-700 py-2 px-5 text-sm font-normal hover:bg-transparent">
            <span>Request access</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
