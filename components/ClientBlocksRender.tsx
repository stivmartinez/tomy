"use client"

import { relative } from "path"
import React, { useState } from "react"

import { generateRandomId } from "@/lib/generateRandomId"
import BlocksRender from "@/components/blocksRender"
import BlockSettingsSheet from "./BlockSettingsSheet"
import blockConfigMap from "./blockConfigMap"
import { Button } from "./ui/button"

interface ClientBlocksRenderProps {
  template: any
  data?: any
  setStructure: (structure: any[]) => void
  level: number
  addChild: (parentId: string, blockConfiguration: any) => void
  addBlock: (parentId: string, type: string) => void
  removeBlock: (blockId: string) => void
  selectedBlockId: string | null
  setSelectedBlockId: (blockId: string | null) => void
}

const ClientBlocksRender: React.FC<ClientBlocksRenderProps> = ({
  template,
  setStructure,
  level,
  addChild,
  addBlock,
  removeBlock,
  selectedBlockId,
  setSelectedBlockId,
}) => {
  const [classNames, setClassNames] = useState("")
  const [styles, setStyles] = useState<Record<string, string | number>>({})

  const handleSelect = (event: React.MouseEvent) => {
    event.stopPropagation()
    setSelectedBlockId((prevState: any) => {
      if (prevState === template.id) {
        return null
      }
      return template.id
    })
  }

  const handleClassNamesChange = (newStyles: { [key: string]: string }) => {
    const updatedClassNames = Object.entries(newStyles)
      .map(([key, value]) => {
        if (value) {
          return `${key}-${value}`
        } else {
          return key
        }
      })
      .join(" ")
    setClassNames(updatedClassNames)
  }

  const handleStylesChange = (newStyles: {
    [key: string]: string | number
  }) => {
    setStyles((prevState) => ({ ...prevState, ...newStyles }))
  }

  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation()
    removeBlock(template.id)
  }

  const handleClone = (event: React.MouseEvent) => {
    event.stopPropagation()
    const clonedBlock = JSON.parse(JSON.stringify(template))
    clonedBlock.id = generateRandomId()
    addChild(template.parentId || null, clonedBlock)
  }

  const isContainerElement = (tag: string): boolean => {
    const containerElements = [
      "div",
      "section",
      "footer",
      "header",
      "main",
      "nav",
      "aside",
      "article",
    ]
    return containerElements.includes(tag)
  }

  const buttons = (
    <div
      className="absolute mx-auto flex h-full w-fit flex-row items-center justify-center gap-1 rounded-xl bg-transparent p-2"
      style={{
        left: !isContainerElement(template.tag) ? "inherit" : "50%",
        zIndex: level * 10,
      }}
    >
      <BlockSettingsSheet
        onClassNamesChange={handleClassNamesChange}
        onStylesChange={handleStylesChange}
      >
        <Button className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-600 p-0 text-white">
          S
        </Button>
      </BlockSettingsSheet>
      <Button
        className="flex h-6 w-6 items-center justify-center rounded-lg bg-green-600 p-0 text-white"
        onClick={handleClone}
      >
        C
      </Button>
      <Button
        className="flex h-6 w-6 items-center justify-center rounded-lg bg-red-600 p-0 text-white"
        onClick={handleRemove}
      >
        X
      </Button>
      {isContainerElement(template.tag) &&
        Object.keys(blockConfigMap).map((componentName) => {
          const Icon = blockConfigMap[componentName].icon
          return (
            <Button
              key={componentName}
              className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-900 p-0 text-white"
              onClick={(event) => {
                event.stopPropagation()
                addBlock(template.id, componentName)
              }}
            >
              <Icon size="14" />
            </Button>
          )
        })}
    </div>
  )

  const shadow =
    selectedBlockId === template.id
      ? "inset 0 0 0 1px rgba(255, 0, 0, 0.6)"
      : "none"

  return (
    <BlocksRender
      template={template}
      setStructure={setStructure}
      addChild={addChild}
      level={level}
      addBlock={addBlock}
      styles={{ ...styles, boxShadow: shadow }}
      classNames={`${classNames}`}
      removeBlock={removeBlock}
      onClick={handleSelect}
      selectedBlockId={selectedBlockId}
      setSelectedBlockId={setSelectedBlockId}
    >
      {selectedBlockId === template.id && buttons}
    </BlocksRender>
  )
}

export default ClientBlocksRender
