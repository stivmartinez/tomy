import { CopyXIcon, Layers } from "lucide-react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

import blocks from "@/lib/blocks"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useBuilderContext } from "../../context"
import { navbarButton, navbarContent, navbarTitle } from "../styles"
import { LayerItem } from "./layer-item"

interface BlockObject {
  id: string
  type: string
  children?: BlockObject[]
}

export default function SidebarLayers() {
  const { structure, setStructure, selectedBlockId, setSelectedBlockId } =
    useBuilderContext()

  const moveBlock = (draggedId: string, droppedId: string) => {
    if (draggedId === droppedId) return

    const findBlock = (
      blocks: any[],
      id: string
    ): { block: BlockObject; parent: any[] } | undefined => {
      for (const block of blocks) {
        if (block.id === id) return { block, parent: blocks }
        if (block.children) {
          const result: { block: BlockObject; parent: any[] } | undefined =
            findBlock(block.children, id)
          if (result) return result
        }
      }
    }

    const draggedResult = findBlock(structure, draggedId)
    const droppedResult = findBlock(structure, droppedId)

    if (!draggedResult || !droppedResult) return

    const { block: draggedBlock, parent: oldParent } = draggedResult
    const { block: droppedBlock, parent: newParent } = droppedResult

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
      <div
        key={block.id}
        className="h-auto border-0 border-t border-white/10 p-0"
      >
        <div
          className={`px-4 py-0 ${
            block.children && block.children.length > 0
              ? "[&[data-state=open]]:bg-black"
              : "[&>svg]:hidden [&[data-state=open]]:bg-black"
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
          </div>
        </div>
        {block.children && block.children.length > 0 && (
          <div className="w-full border-none">
            {renderLayerItems(block.children, level + 1)}
          </div>
        )}
      </div>
    ))
  }

  return (
    <Sheet>
      <SheetTrigger asChild className="relative z-50">
        <Button className={navbarButton} variant="subtle">
          <Layers size="18" />
        </Button>
      </SheetTrigger>
      <SheetContent position="bottom" className={navbarContent}>
        <SheetHeader className={navbarTitle}>Layers</SheetHeader>
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-between">
          {structure.length === 0 ? (
            <div className="p-4">
              <div className="flex flex-col items-center gap-2 rounded-xl text-center">
                <CopyXIcon className="text-white/60" />
                <h3 className="mt-2 text-sm text-white/60">No layers yet</h3>
                <p className="px-12 text-sm text-white/60">
                  Add some layers and after that come back here.
                </p>
              </div>
            </div>
          ) : (
            <DndProvider backend={HTML5Backend}>
              <div className="w-full">{renderLayerItems(structure, 0)}</div>
            </DndProvider>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
