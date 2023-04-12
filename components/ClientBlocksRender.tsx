"use client"

import React from "react"

import BlocksRender from "@/components/blocksRender"

interface ClientBlocksRenderProps {
  template: any
  setStructure: (structure: any[]) => void
  level: number
  addChild: (parentId: string) => void
  addBlock: (parentId: string, type: string) => void // Add this line
}

const ClientBlocksRender: React.FC<ClientBlocksRenderProps> = ({
  template,
  setStructure,
  level,
  addChild,
  addBlock, // Add this line
}) => {
  return (
    <BlocksRender
      template={template}
      setStructure={setStructure}
      addChild={addChild}
      level={level}
      addBlock={addBlock} // Add this line
    />
  )
}

export default ClientBlocksRender
