"use client"

import React from "react"
import ClientBlocksRender from "@/app/[site]/@builder/components/client-blocks-render"

import BuilderLeftSidebar from "./components/left-sidebar"
import MouseRuler from "./components/mouse-ruler"
import { useBuilderContext } from "./context"

const Builder = () => {
  const { structure, renderKey } = useBuilderContext()

  return (
    <div className="pl-12">
      <MouseRuler />
      {structure.map((block, index) => (
        <ClientBlocksRender
          key={`${block.id}-${renderKey}`}
          template={block}
          index={index}
          parentLength={structure.length}
        />
      ))}
      <BuilderLeftSidebar />
    </div>
  )
}

export default Builder
