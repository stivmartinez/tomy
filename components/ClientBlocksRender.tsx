"use client"

import React from "react"

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
