"use client"

import React, { useState } from "react"

import BlocksRender from "@/components/blocksRender"

interface ClientBlocksRenderProps {
  template: any
  data?: any
  setStructure: (structure: any[]) => void
  level: number
  addChild: (parentId: string, blockConfiguration: any) => void
  addBlock: (parentId: string, type: string) => void
}

// ClientBlocksRender.tsx
const ClientBlocksRender: React.FC<ClientBlocksRenderProps> = ({
  template,
  setStructure,
  level,
  addChild,
  addBlock,
}) => {
  const [classNames, setClassNames] = useState("")
  const [isHovered, setIsHovered] = useState(false)

  const handleClassNamesChange = (color: string) => {
    setClassNames(color)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <BlocksRender
        template={template}
        setStructure={setStructure}
        addChild={addChild}
        level={level}
        addBlock={addBlock}
        classNames={classNames}
        onClassNamesChange={handleClassNamesChange}
        isHovered={isHovered}
      />
    </div>
  )
}

export default ClientBlocksRender
