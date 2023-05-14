"use client"

import React from "react"
import ClientBlocksRender from "@/app/[site]/@builder/components/client-blocks-render"

import BuilderNavbar from "./components/navbar"
import { useBuilderContext } from "./context"

const Builder = () => {
  const { structure, renderKey } = useBuilderContext()

  return (
    <>
      {structure.map((block, index) => (
        <ClientBlocksRender
          key={`${block.id}-${renderKey}`}
          template={block}
          index={index}
          parentLength={structure.length}
        />
      ))}
      <BuilderNavbar />
    </>
  )
}

export default Builder
