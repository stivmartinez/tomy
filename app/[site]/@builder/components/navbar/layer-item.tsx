"use client"

import React from "react"
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
    <div className="relative">
      {level > 0 && (
        <div
          className="absolute left-0 top-0 h-full bg-gray-300"
          style={{
            width: "1px",
            marginLeft: `${level * 8 - 4}px`,
          }}
        ></div>
      )}
      <div
        ref={(node) => drop(applyDrag(node))}
        // eslint-disable-next-line tailwindcss/classnames-order
        className={cn(
          "flex items-center h-8 gap-2 cursor-pointer text-slate-900 text-md whitespace-nowrap rounded-md px-2 hover:bg-slate-50",
          isSelected && "bg-slate-100 font-semibold",
          isOver && "bg-gray-100"
        )}
        style={{ marginLeft: `${level * 8}px`, opacity: isDragging ? 0.5 : 1 }}
        onClick={handleClick}
      >
        <div className="flex flex-row items-center gap-2">
          {Icon && <Icon size="16" />}
          <span>{block.type}:</span>
        </div>
        <div className="flex rounded-full bg-slate-200 px-1 text-xs text-slate-500">
          {block.id}
        </div>
      </div>
    </div>
  )
}
