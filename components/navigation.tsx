/* eslint-disable @next/next/no-img-element */

import { Inter } from "next/font/google"
import { Home, LayoutTemplate, Plug, Settings } from "lucide-react"

import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export default function Navigation() {
  const classes = cn`flex items-center px-6 py-3 rounded-xl hover:bg-slate-50 cursor-pointer gap-3`
  return (
    <nav className={cn`${inter.className} flex flex-col w-3/12`}>
      <p className="pb-4 pl-4 text-xs uppercase tracking-wider text-slate-400">
        Main menu
      </p>
      <a
        href="#"
        className={cn`${classes} bg-slate-100 flex flex-row text-md gap-2`}
      >
        <Home size="16" />
        <span>Home</span>
      </a>
      <a href="#" className={cn`${classes}`}>
        <Plug size="16" />
        <span>Plugins</span>
      </a>
      <a href="#" className={cn`${classes}`}>
        <LayoutTemplate size="16" />
        <span>Themes</span>
      </a>
      <a href="#" className={cn`${classes}`}>
        <Settings size="16" />
        <span>Settings</span>
      </a>
    </nav>
  )
}
