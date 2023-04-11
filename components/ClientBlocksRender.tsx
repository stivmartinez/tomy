"use client"

import React from "react"

import BlocksRender from "@/components/blocksRender"

interface ClientBlocksRenderProps {
  template: any
  setStructure: (structure: any[]) => void
  level: number
  addChild: (parentId: string) => void
  addColumnBlock: (parentId: string) => void
  addRowBlock: (parentId: string) => void
}

const ClientBlocksRender: React.FC<ClientBlocksRenderProps> = ({
  template,
  setStructure,
  level,
  addChild,
  addColumnBlock,
  addRowBlock,
}) => {
  return (
    <BlocksRender
      template={template}
      setStructure={setStructure}
      addChild={addChild}
      level={level}
      addColumnBlock={addColumnBlock}
      addRowBlock={addRowBlock}
    />
  )
}

export default ClientBlocksRender
