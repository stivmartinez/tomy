import { ArrowRight, RefreshCcw } from "lucide-react"

/* eslint-disable @next/next/no-img-element */

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LandingHero({ t }: { t: any }) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 py-16 text-center md:py-28">
      <div className="flex w-60 flex-row items-center justify-center gap-4">
        <img
          src="/wordpress-logo.svg"
          alt="Logo"
          className="w-12 md:w-20"
        />
        <div className="flex animate-pulse flex-row justify-between gap-1">
          <div className="h-1 w-1 animate-bounce rounded-full bg-gray-700 p-0"></div>
          <div className="h-1 w-1 animate-bounce rounded-full bg-gray-700 p-0 delay-200"></div>
          <div className="h-1 w-1 animate-bounce rounded-full bg-gray-700 p-0 delay-500"></div>
        </div>
        <img
          src="/themesei-logo.svg"
          alt="Logo"
          className="w-14 md:w-24"
        />
      </div>
      <a className="flex w-fit cursor-pointer flex-row items-center gap-2 rounded-full bg-blue-600/10 px-3 py-1 text-xs text-blue-900 hover:bg-blue-600/20 md:text-sm">
        <h1 className="text-blue-900">{t.hero.feature}</h1>
        <ArrowRight size="14" />
      </a>
      <h2
        className={cn`font-bold tracking-tight text-gray-900 text-xl max-w-sm leading-tight md:text-4xl md:max-w-2xl`}
      >
        {t.hero.title}
      </h2>
      <p
        className={cn`text-md leading-6 max-w-sm md:text-lg md:max-w-xl md:leading-7`}
      >
        {t.hero.description}
      </p>
      <div className="flex w-full max-w-4xl flex-col">
        <div className="mt-4 flex w-full items-center justify-center rounded-t-2xl bg-slate-200 p-2">
          <form className="mx-lg flex w-full max-w-2xl flex-col items-center justify-center gap-2 md:flex-row md:gap-4">
            <div className="relative w-full">
              <span className="md:text-md pointer-events-none absolute top-[14px] left-6 text-sm md:top-3 md:left-8">
                https://
              </span>
              <Input
                placeholder={t.hero.form.placeholder}
                className="md:text-md rounded-xl bg-white p-6 pl-20 text-sm md:pl-24"
                type="url"
                required
              />
            </div>
            <Button className="text-md w-full whitespace-nowrap rounded-xl bg-blue-600 p-6 md:w-fit">
              {t.hero.form.button}
            </Button>
          </form>
        </div>
        <div className="relative flex h-32 w-full flex-col items-center justify-center border-x-2 border-slate-200">
          <Button className="relative z-10 h-7 w-fit gap-2 rounded-full bg-slate-100 text-xs font-normal text-slate-500 hover:bg-slate-200">
            <RefreshCcw size="14" />
            {t.hero.randomDemo}
          </Button>
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-t from-white to-white/0"
            style={{
              marginLeft: "-2px",
              marginRight: "-2px",
              width: "calc(100% + 4px)",
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}
