"use client"

import React from "react"
import ClientBlocksRender from "@/app/[site]/@builder/components/client-blocks-render"

import BuilderNavbar from "./components/navbar"
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
    <>
      <MouseRuler />
      {structure.map((block, index) => (
        <ClientBlocksRender
          key={`${block.id}-${renderKey}`}
          template={block}
          index={index}
          parentLength={structure.length}
        />
      ))}
      <BuilderNavbar
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
    </>
  )
}

export default Builder
