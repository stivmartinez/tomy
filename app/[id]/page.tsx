"use client"

import React from "react"
import BuilderBlocksRender from "@/app/[id]/components/blocks-render"

import { useBuilderContext } from "./components/context"
import BuilderNavbar from "./components/navbar"

const BuilderPage = () => {
  const { structure, renderKey } = useBuilderContext()

  return (
    <>
      {structure.map((block, index) => (
        <BuilderBlocksRender
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

export default BuilderPage
