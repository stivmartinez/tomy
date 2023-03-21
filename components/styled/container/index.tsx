import Footer from "@/components/footer"
import Header from "@/components/header"
import { cn } from "@/lib/utils"
import { DM_Sans } from "next/font/google"

const inter = DM_Sans({ weight: ["400", "500"], subsets: ["latin"] })

export default function StyledContainer({
  children,
  t,
}: {
  children: React.ReactNode
  t: any
}) {
  return (
    <div className="overflow-y-auto text-slate-600">
      <div className="flex h-full flex-col">
        <Header t={t} />
        <main
          className={cn`${inter.className} w-full max-w-6xl mx-auto flex flex-col relative px-4`}
        >
          {children}
        </main>
        <Footer t={t} />
      </div>
    </div>
  )
}
