"use client"

import React from "react"
import BuilderBlocksRender from "@/app/[id]/components/blocks-render"

import { useBuilderContext } from "./components/context"
import BuilderNavbar from "./components/navbar"

const BuilderPage = () => {
  const { structure, renderKey } = useBuilderContext()

  return (
    <div className="flex min-h-screen flex-col overflow-y-auto">
      {structure.map((block, index) => (
        <BuilderBlocksRender
          key={`${block.id}-${renderKey}`}
          template={block}
          index={index}
          parentLength={structure.length}
        />
      ))}
      <BuilderNavbar />
    </div>
  )
}

export default BuilderPage
