import React from "react"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { ChevronDown, Layers } from "lucide-react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

import blocks from "@/lib/blocks"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useBuilderContext } from "../../../context"
import { sidebarButton } from "../styles"
import { LayerItem } from "./layer-item"

export default function SidebarLayers() {
  const { structure, setStructure, selectedBlockId, setSelectedBlockId } =
    useBuilderContext()

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

  // SidebarLayers.js
  const renderLayerItems = (blocksList: any, level = 0) => {
    return blocksList.map((block: any, index: number) => (
      <React.Fragment key={block.id}>
        <AccordionItem
          value={`item-${block.id}`}
          className="h-auto border-0 border-t p-0"
        >
          <AccordionTrigger
            asChild
            className={`px-4 py-0 ${
              block.children && block.children.length > 0
                ? "[&[data-state=open]]:bg-white"
                : "[&>svg]:hidden [&[data-state=open]]:bg-white"
            }`}
          >
            <div role="button">
              <LayerItem
                block={block}
                blockIcon={blocks[block.type]?.icon || null}
                selectedBlockId={selectedBlockId}
                setSelectedBlockId={setSelectedBlockId}
                level={level}
                moveBlock={moveBlock}
                hasChildren={block.children && block.children.length > 0}
              />
              <ChevronDown className="h-4 w-4 transition-transform duration-200" />
            </div>
          </AccordionTrigger>
          {block.children && block.children.length > 0 && (
            <AccordionContent>
              <Accordion type="multiple" className="w-full border-none">
                {renderLayerItems(block.children, level + 1)}
              </Accordion>
            </AccordionContent>
          )}
        </AccordionItem>
      </React.Fragment>
    ))
  }

  return (
    <Sheet>
      <SheetTrigger asChild className="relative z-50">
        <Button className={sidebarButton} variant="subtle">
          <Layers size="16" />
        </Button>
      </SheetTrigger>
      <SheetContent
        position="left"
        className="z-0 ml-12 w-full max-w-xs border-x border-slate-200 bg-white p-0"
      >
        <SheetHeader className="p-4 font-semibold">Layers</SheetHeader>
        {structure.length === 0 ? (
          <div className="p-4">
            <div className="flex flex-col gap-2 rounded-xl bg-slate-100 p-12 text-center">
              <h3>No layers yet</h3>
              <p className="text-sm text-slate-500">Add some layers and after that come back here.</p>
            </div>
          </div>
        ) : (
          <ScrollArea className="h-[620px] w-full">
            <DndProvider backend={HTML5Backend}>
              <Accordion type="multiple" className="w-full border-none">
                {renderLayerItems(structure, 0)}
              </Accordion>
            </DndProvider>
          </ScrollArea>
        )}
      </SheetContent>
    </Sheet>
  )
}
