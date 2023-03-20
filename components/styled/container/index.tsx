import Footer from "@/components/footer"
import Header from "@/components/header"
import { cn } from "@/lib/utils"
import { DM_Sans, Inter } from "next/font/google"

const inter = DM_Sans({ weight: ["400", "500"], subsets: ["latin"] })

export default function StyledContainer({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen overflow-y-auto bg-white text-slate-600">
      <div className="flex h-full flex-col">
        <Header />
        <main
          className={cn`${inter.className} w-full max-w-6xl mx-auto flex flex-col relative flex-1`}
        >
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}
