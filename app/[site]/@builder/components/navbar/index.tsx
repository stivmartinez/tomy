import React from "react"
import { Layers, LogOut, Plus, Save, Settings, Square } from "lucide-react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

import blocks from "@/lib/blocks"
import { generateRandomId } from "@/lib/generateRandomId"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LayerItem } from "./layer-item"

const BuilderNavbar = ({
  structure,
  setStructure,
  selectedBlockId,
  setSelectedBlockId,
  addBlock,
  saveStructure,
  resetSavedStructure,
}: {
  structure: any[]
  setStructure: (callback: (structure: any[]) => any[]) => void
  selectedBlockId: string | null
  setSelectedBlockId: (
    callback: (blockId: string | null) => string | null
  ) => void
  addBlock: (parentId: string, componentName: string) => void
  saveStructure: any
  resetSavedStructure: any
}) => {
  const moveBlock = (draggedId: string, droppedId: string) => {
    if (draggedId === droppedId) return

    const findBlock = (blocks, id) => {
      for (const block of blocks) {
        if (block.id === id) return { block, parent: blocks }
        if (block.children) {
          const result = findBlock(block.children, id)
          if (result) return result
        }
      }
    }

    const { block: draggedBlock, parent: oldParent } = findBlock(
      structure,
      draggedId
    )
    const { block: droppedBlock, parent: newParent } = findBlock(
      structure,
      droppedId
    )

    // Remove dragged block from old parent
    oldParent.splice(oldParent.indexOf(draggedBlock), 1)

    // Add dragged block as a child of the dropped block
    if (!droppedBlock.children) droppedBlock.children = []
    droppedBlock.children.push(draggedBlock)

    // Update the structure
    setStructure([...structure])

    // Force a re-render by updating the selectedBlockId state
    setSelectedBlockId((prevState) =>
      prevState === draggedId ? null : prevState
    )
  }

  const renderLayerItems = (blocksList: any, level = 0) => {
    return blocksList.map((block: any, index: number) => (
      <React.Fragment key={block.id}>
        {block.children && block.children.length > 0 ? (
          <>
            <LayerItem
              block={block}
              blockIcon={blocks[block.type]?.icon || null}
              selectedBlockId={selectedBlockId}
              setSelectedBlockId={setSelectedBlockId}
              level={level}
              moveBlock={moveBlock}
            />
            {renderLayerItems(block.children, level + 1)}
          </>
        ) : (
          <LayerItem
            block={block}
            blockIcon={blocks[block.type]?.icon || null}
            selectedBlockId={selectedBlockId}
            setSelectedBlockId={setSelectedBlockId}
            level={level}
            moveBlock={moveBlock}
          />
        )}
      </React.Fragment>
    ))
  }

  return (
    // eslint-disable-next-line tailwindcss/enforces-negative-arbitrary-values
    <nav className="fixed bottom-0 left-[50%] -ml-[80px] mb-4 flex w-[160px] flex-row justify-around gap-2 rounded-2xl bg-black p-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="h-8 w-8 rounded-full bg-slate-700 p-0 focus:ring-0 data-[state=open]:bg-slate-700">
            <Layers size="16" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Layers</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <ScrollArea className="h-[620px] w-full">
            <DndProvider backend={HTML5Backend}>
              {renderLayerItems(structure, 0)}
            </DndProvider>
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="h-8 w-8 rounded-full bg-slate-700 p-0 focus:ring-0 data-[state=open]:bg-slate-700">
            <Plus size="16" />
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="h-8 w-8 rounded-full bg-slate-700 p-0 focus:ring-0 data-[state=open]:bg-slate-700">
            <Settings size="16" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={saveStructure}>
              <Save className="mr-2 h-4 w-4" />
              <span>Save</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={resetSavedStructure}>
              <span>Reset</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  )
}

export default React.memo(BuilderNavbar)
