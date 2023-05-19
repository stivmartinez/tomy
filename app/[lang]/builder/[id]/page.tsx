"use client"

import React from "react"
import BuilderBlocksEditor from "@/app/[lang]/builder/[id]/components/blocks-editor"

import { useBuilderContext } from "./components/context"
import BuilderNavbar from "./components/navbar"

const BuilderPage = () => {
  const { structure, renderKey } = useBuilderContext()

  return (
    <div className="flex min-h-screen flex-col overflow-y-auto">
      {structure.map((block, index) => (
        <BuilderBlocksEditor
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
