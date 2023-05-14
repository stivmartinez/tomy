import BlocksRender from "@/app/[site]/blocks-render"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

import ClientBlocksRender from "."
import { useBuilderContext } from "../../context"

interface BlockObject {
  id: string
  type: string
  children?: BlockObject[]
}

export default function LayersBlocksRender() {
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

  // LayersBlocksRender.js
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
            {block.type === "client" ? (
              <ClientBlocksRender
                template={block}
                level={level}
                isEditable={false}
              />
            ) : (
              <BlocksRender template={block} level={level} isEditable={false} />
            )}
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
    <ScrollArea className="h-[620px] w-full">
      <DndProvider backend={HTML5Backend}>
        <>{renderLayerItems(structure, 0)}</>
      </DndProvider>
    </ScrollArea>
  )
}
