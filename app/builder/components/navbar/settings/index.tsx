import { Button } from "@/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/ui/sheet"
import { SettingsIcon } from "lucide-react"

import { useBuilderContext } from "../../../context"
import {
  navbarButton,
  navbarContent,
  navbarInternalButton,
  navbarTitle,
} from "../styles"

export default function SidebarSettings() {
  const { showShadow, setShowShadow } = useBuilderContext()

  return (
    <Sheet>
      <SheetTrigger asChild className="relative z-50">
        <Button className={navbarButton} variant="subtle">
          <SettingsIcon size="18" />
        </Button>
      </SheetTrigger>
      <SheetContent position="bottom" className={navbarContent}>
        <SheetHeader className={navbarTitle}>Settings</SheetHeader>
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-between">
          <div
            className={navbarInternalButton}
            role="button"
            onClick={() => {
              setShowShadow(!showShadow)
            }}
          >
            <span>Show Borders</span>
            <input
              type="checkbox"
              checked={showShadow}
              className="h-4 w-4"
              readOnly
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
