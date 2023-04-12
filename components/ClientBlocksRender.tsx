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

const ClientBlocksRender: React.FC<ClientBlocksRenderProps> = ({
  template,
  setStructure,
  level,
  addChild,
  addBlock,
}) => {
  const [classNames, setClasNames] = useState("") // Add this line

  const handleClassNamesChange = (color: string) => {
    setClasNames(color)
  }

  return (
    <BlocksRender
      template={template}
      setStructure={setStructure}
      addChild={addChild}
      level={level}
      addBlock={addBlock}
      classNames={classNames} // Add this line
      onClassNamesChange={handleClassNamesChange} // Add this line
    />
  )
}

export default ClientBlocksRender
