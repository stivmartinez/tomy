import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet"
import blocks from "@/lib/blocks"
import { generateRandomId } from "@/lib/generateRandomId"
import { PlusIcon, Square } from "lucide-react"

import { useBuilderContext } from "../../context"
import { navbarButton, navbarContent, navbarInternalButtonSquare, navbarTitle } from "../styles"

export default function SidebarBlocks() {
  const { selectedBlockId, setStructure, addBlock } = useBuilderContext()

  return (
    <Sheet>
      <SheetTrigger asChild className="relative z-50">
        <Button className={navbarButton} variant="subtle">
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
              Object.keys(blocks).map((componentName) => {
                const Icon = blocks[componentName].icon
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
