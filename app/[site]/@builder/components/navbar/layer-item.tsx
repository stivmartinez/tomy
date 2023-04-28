import React from "react"
import { useDrag, useDrop } from "react-dnd"

import { cn } from "@/lib/utils"

export const LayerItem = ({
  block,
  blockIcon, // Add the blockIcon prop
  selectedBlockId,
  setSelectedBlockId,
  level,
  moveBlock,
}: any) => {
  const isSelected = selectedBlockId === block.id

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "layerItem",
    item: { id: block.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "layerItem",
    drop: (item) => moveBlock(item.id, block.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  const handleClick = () => {
    if (!isSelected) {
      setSelectedBlockId(block.id)
    }
  }

  const applyDrag = (node) => {
    if (isSelected) {
      return drag(node)
    }
    return node
  }

  const Icon = blockIcon

  return (
    <div
      ref={(node) => drop(applyDrag(node))}
      // eslint-disable-next-line tailwindcss/classnames-order
      className={cn(
        "flex items-center h-8 gap-2 cursor-pointer text-slate-900 text-sm whitespace-nowrap rounded-md px-2",
        isSelected && "bg-slate-100 font-semibold",
        isOver && "bg-gray-100"
      )}
      style={{ marginLeft: `${level * 8}px`, opacity: isDragging ? 0.5 : 1 }}
      onClick={handleClick}
    >
      {Icon && <Icon size="16" />} {/* Display the icon */}
      {block.type}: {block.id}
    </div>
  )
}
