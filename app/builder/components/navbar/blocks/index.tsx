import blocksList from "@/app/builder/constants/blocks-list"
import { Button } from "@/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/ui/sheet"
import { PlusIcon, Square } from "lucide-react"

import { cn } from "@/lib/cn"
import { generateRandomId } from "@/lib/generate-random-Id"
import { useBuilderContext } from "../../../context"
import {
  navbarButton,
  navbarContent,
  navbarInternalButtonSquare,
  navbarTitle,
} from "../styles"

export default function SidebarBlocks() {
  const { selectedBlockId, setStructure, addBlock } = useBuilderContext()

  return (
    <Sheet>
      <SheetTrigger asChild className="relative z-50">
        <Button
          className={cn(navbarButton, "rounded-full bg-white/5")}
          variant="subtle"
        >
          <PlusIcon size="18" />
        </Button>
      </SheetTrigger>
      <SheetContent position="bottom" className={navbarContent}>
        <SheetHeader className={navbarTitle}>Blocks</SheetHeader>
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-between">
          <div className="mx-auto flex w-full flex-wrap px-4">
            {!selectedBlockId && (
              <Button
                variant="subtle"
                className={navbarInternalButtonSquare}
                onClick={() => {
                  {
                    setStructure((prevStructure: any[]) => [
                      ...prevStructure,
                      {
                        id: generateRandomId(),
                        tag: "section",
                        type: "container",
                        className: "w-full min-h-[24px]",
                        children: [],
                      },
                    ])
                  }
                }}
              >
                <Square size="20" />
                <span>container</span>
              </Button>
            )}
            {selectedBlockId &&
              Object.keys(blocksList).map((componentName) => {
                const Icon = blocksList[componentName].icon
                return (
                  <Button
                    key={componentName}
                    variant="subtle"
                    className={navbarInternalButtonSquare}
                    onClick={(event) => {
                      event.stopPropagation()
                      addBlock(String(selectedBlockId), componentName)
                    }}
                  >
                    <Icon size="20" />
                    <span className="text-xs text-white/50">
                      {componentName}
                    </span>
                  </Button>
                )
              })}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
