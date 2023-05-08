"use client"

import { useDrag, useDrop } from "react-dnd"

import { cn } from "@/lib/utils"

export const LayerItem = ({
  block,
  blockIcon,
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
    drop: (item: any) => moveBlock(item.id, block.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  const handleClick = () => {
    if (!isSelected) {
      setSelectedBlockId(block.id)
    }
  }

  const applyDrag = (node: any) => {
    if (isSelected) {
      return drag(node)
    }
    return node
  }

  const Icon = blockIcon

  return (
    <div
      ref={(node) => drop(applyDrag(node))}
      style={{ opacity: isDragging ? 0.5 : 1, paddingLeft: level * 16 }}
      onClick={handleClick}
      className={cn(
        "w-full p-2 text-sm font-normal text-slate-300",
        isSelected && "font-bold text-white",
        isOver && "bg-slate-500 px-4"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        {Icon && <Icon size="16" />}
        <span>{block.type}:</span>
        <div className="flex rounded-full bg-slate-700 px-1 text-xs font-normal text-slate-400">
          {block.id}
        </div>
      </div>
    </div>
  )
}
