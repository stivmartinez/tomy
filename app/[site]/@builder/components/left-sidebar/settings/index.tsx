import { ScrollArea } from "@radix-ui/react-scroll-area"
import { RotateCcwIcon, SaveIcon, SettingsIcon } from "lucide-react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useBuilderContext } from "../../../context"
import { sidebarButton, sidebarContent, sidebarInternalButton } from "../styles"

export default function SidebarSettings() {
  const { saveStructure, resetSavedStructure, showShadow, setShowShadow } =
    useBuilderContext()

  return (
    <Sheet>
      <SheetTrigger asChild className="relative z-50">
        <Button className={sidebarButton} variant="subtle">
          <SettingsIcon size="16" />
        </Button>
      </SheetTrigger>
      <SheetContent position="left" className={sidebarContent}>
        <SheetHeader className="p-4 font-semibold">Settings</SheetHeader>
        <ScrollArea className="h-[620px] w-full">
          <DndProvider backend={HTML5Backend}>
            <div
              className={sidebarInternalButton}
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
            <Button
              onClick={saveStructure}
              variant="subtle"
              className={sidebarInternalButton}
            >
              <span>Save</span>
              <SaveIcon className="h-4 w-4 text-slate-400" />
            </Button>
            <Button
              onClick={resetSavedStructure}
              className={sidebarInternalButton}
            >
              <span>Reset</span>
              <RotateCcwIcon className="h-4 w-4 text-slate-400" />
            </Button>
          </DndProvider>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
