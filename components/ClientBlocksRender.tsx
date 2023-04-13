"use client"

import React, { useRef, useState } from "react"

import BlocksRender from "@/components/blocksRender"

interface ClientBlocksRenderProps {
  template: any
  data?: any
  setStructure: (structure: any[]) => void
  level: number
  addChild: (parentId: string, blockConfiguration: any) => void
  addBlock: (parentId: string, type: string) => void
  removeBlock: (blockId: string) => void
}

const ClientBlocksRender: React.FC<ClientBlocksRenderProps> = ({
  template,
  setStructure,
  level,
  addChild,
  addBlock,
  removeBlock,
}) => {
  const [classNames, setClassNames] = useState("")
  const [isHovered, setIsHovered] = useState(false)
  const blockRef = useRef(null)

  const handleClassNamesChange = (color: string) => {
    setClassNames(color)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const getBorderColorByLevel = (level: number): string => {
    const colors = ["red", "blue", "green", "purple", "orange"]

    // Use modulo to loop through the colors array when the level is higher than the available colors
    return colors[level % colors.length]
  }

  const blocksRenderElement = (
    <BlocksRender
      template={template}
      setStructure={setStructure}
      addChild={addChild}
      level={level}
      addBlock={addBlock}
      classNames={`${classNames} border border-blue-600/50`}
      onClassNamesChange={handleClassNamesChange}
      isHovered={isHovered}
      removeBlock={removeBlock}
    />
  )

  return React.cloneElement(blocksRenderElement, {
    ref: blockRef,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  })
}

export default ClientBlocksRender
