import { ArrowRight } from "lucide-react"

/* eslint-disable @next/next/no-img-element */

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LandingHero({ t }: { t: any }) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 py-28 text-center">
      <div className="flex w-60 flex-row items-center justify-center gap-4">
        <img src="/wordpress-logo.svg" alt="Logo" className="w-20 delay-500" />
        <div className="flex animate-pulse flex-row justify-between gap-1">
          <div className="h-1 w-1 animate-bounce rounded-full bg-gray-700 p-0"></div>
          <div className="h-1 w-1 animate-bounce rounded-full bg-gray-700 p-0 delay-200"></div>
          <div className="h-1 w-1 animate-bounce rounded-full bg-gray-700 p-0 delay-500"></div>
        </div>
        <img src="/themesei-logo.svg" alt="Logo" className="w-24" />
      </div>
      <a className="flex w-fit cursor-pointer flex-row items-center gap-2 rounded-full bg-blue-600/10 px-3 py-1 text-sm text-blue-900 hover:bg-blue-600/20">
        <h1 className="text-blue-900">{t.hero.feature}</h1>
        <ArrowRight size="14" />
      </a>
      <h2
        className={cn`font-bold tracking-tight text-gray-900 text-5xl max-w-2xl leading-tight`}
      >
        {t.hero.title}
      </h2>
      <p className={cn`text-lg leading-7 max-w-2xl`}>{t.hero.description}</p>
      <form className="mx-lg my-4 flex w-full max-w-2xl flex-row items-center justify-center gap-4">
        <div className="relative w-full">
          <span className="pointer-events-none absolute top-3 left-8">
            https://
          </span>
          <Input
            placeholder={t.hero.form.placeholder}
            className="text-md border-gray-200 bg-transparent p-6 pl-24"
            type="url"
            required
          />
        </div>
        <Button className="text-md w-fit whitespace-nowrap bg-blue-600 p-6">
          {t.hero.form.button}
        </Button>
      </form>
    </div>
  )
}
