import { PlusCircleIcon, Square } from "lucide-react";

import blocks from "@/lib/blocks"
import { generateRandomId } from "@/lib/generateRandomId"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useBuilderContext } from "../../../context"
import { sidebarButton, sidebarContent, sidebarInternalButton, sidebarTitle } from "../styles"

export default function SidebarBlocks() {
  const { selectedBlockId, setStructure, addBlock } = useBuilderContext()

  return (
    <Sheet>
      <SheetTrigger asChild className="relative z-50">
        <Button className={sidebarButton} variant="subtle">
          <PlusCircleIcon size="16" />
        </Button>
      </SheetTrigger>
      <SheetContent position="left" className={sidebarContent}>
        <SheetHeader className={sidebarTitle}>Blocks</SheetHeader>
        <div className="mx-auto flex w-full flex-row flex-wrap justify-center">
          {!selectedBlockId && (
            <Button
              variant="subtle"
              className={cn(sidebarInternalButton, "justify-start")}
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
                  className={cn(sidebarInternalButton, "justify-start")}
                  onClick={(event) => {
                    event.stopPropagation()
                    addBlock(String(selectedBlockId), componentName)
                  }}
                >
                  <Icon size="16" />
                  <span>{componentName}</span>
                </Button>
              )
            })}
        </div>
      </SheetContent>
    </Sheet>
  )
}
