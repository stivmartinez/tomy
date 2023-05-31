"use client"

import React from "react"
import BuilderBlockEditor from "@/app/builder/components/editor"

import BuilderNavbar from "./components/navbar"
import { useBuilderContext } from "./context"

const BuilderPage: React.FC = () => {
  const { structure } = useBuilderContext()

  const renderBlockEditor = () => {
    if (structure) {
      return structure.map((block: any, index: number) => (
        <BuilderBlockEditor
          key={block.id}
          block={block}
          blockPosition={index}
          parentBlockLength={structure.length}
        />
      ))
    }

    return null
  }

  return (
    <div className="flex min-h-screen flex-col overflow-y-auto">
      {renderBlockEditor()}
      <BuilderNavbar />
    </div>
  )
}

export default BuilderPage
