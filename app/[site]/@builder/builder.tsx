"use client"

import React from "react"
import ClientBlocksRender from "@/app/[site]/@builder/components/client-blocks-render"

import BuilderLeftSidebar from "./components/left-sidebar"
import MouseRuler from "./components/utils/mouse-ruler"
import { useBuilderContext } from "./context"

interface BuilderProps {
  initialData?: any[]
}

const Builder: React.FC<BuilderProps> = () => {
  const {
    structure,
    setStructure,
    addBlock,
    selectedBlockId,
    setSelectedBlockId,
    renderKey,
    saveStructure,
    resetSavedStructure,
    showShadow,
    setShowShadow,
  } = useBuilderContext()

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
      <BuilderLeftSidebar
        setStructure={setStructure}
        structure={structure}
        selectedBlockId={selectedBlockId}
        setSelectedBlockId={setSelectedBlockId}
        addBlock={addBlock}
        saveStructure={saveStructure}
        resetSavedStructure={resetSavedStructure}
        showShadow={showShadow}
        setShowShadow={setShowShadow}
      />
    </div>
  )
}

export default Builder
