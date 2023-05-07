import React from "react"
import { LayoutTemplateIcon, Square } from "lucide-react"

import blocks from "@/lib/blocks"
import { generateRandomId } from "@/lib/generateRandomId"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import SidebarLayers from "./layers"
import SidebarSettings from "./settings"
import { sidebarButton } from "./styles"

const BuilderLeftSidebar = ({
  setStructure,
  selectedBlockId,
  addBlock,
}: {
  setStructure: (callback: (structure: any[]) => any[]) => void
  selectedBlockId: string | null
  addBlock: (parentId: string, componentName: string) => void
}) => {
  return (
    // eslint-disable-next-line tailwindcss/enforces-negative-arbitrary-values
    <nav className="w-13 fixed left-0 top-0 flex h-screen flex-col items-center justify-center gap-2 border-r border-slate-200 bg-white">
      <Sheet>
        <SheetTrigger asChild>
          <Button className={sidebarButton} variant="subtle">
            <LayoutTemplateIcon size="16" />
          </Button>
        </SheetTrigger>
        <SheetContent
          position="bottom"
          className="mb-20 flex h-auto flex-col gap-4 bg-transparent"
        >
          <div className="mx-auto flex w-fit flex-row justify-center gap-4">
            {!selectedBlockId && (
              <Button
                variant="outline"
                className="flex h-16 w-16 flex-col gap-3 rounded-2xl border-2 bg-white ring-0 focus:ring-0"
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
              </Button>
            )}
            {selectedBlockId &&
              Object.keys(blocks).map((componentName) => {
                const Icon = blocks[componentName].icon
                return (
                  <Button
                    key={componentName}
                    variant="outline"
                    className="flex h-16 w-16 flex-col gap-3 rounded-2xl border-2 bg-white ring-0 focus:ring-0"
                    onClick={(event) => {
                      event.stopPropagation()
                      addBlock(String(selectedBlockId), componentName)
                    }}
                  >
                    <Icon size="20" />
                  </Button>
                )
              })}
          </div>
        </SheetContent>
      </Sheet>
      <SidebarLayers />
      <SidebarSettings />
    </nav>
  )
}

export default React.memo(BuilderLeftSidebar)
