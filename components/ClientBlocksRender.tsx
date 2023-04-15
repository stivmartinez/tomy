"use client"

import React, { useState } from "react"

import { generateRandomId } from "@/lib/generateRandomId"
import BlocksRender from "@/components/blocksRender"
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
}

const ClientBlocksRender: React.FC<ClientBlocksRenderProps> = ({
  template,
  setStructure,
  level,
  addChild,
  addBlock,
  removeBlock,
}) => {
  const [classNames, setClassNames] = useState("")

  const handleClassNamesChange = (newStyles: { [key: string]: string }) => {
    const updatedClassNames = Object.entries(newStyles)
      .map(([key, value]) => `${key}-${value}`)
      .join(" ")
    setClassNames(updatedClassNames)
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

  return (
    <BlocksRender
      template={template}
      setStructure={setStructure}
      addChild={addChild}
      level={level}
      addBlock={addBlock}
      classNames={`${classNames} border border-blue-600/50`}
      onClassNamesChange={handleClassNamesChange}
      removeBlock={removeBlock}
    >
      {buttons}
    </BlocksRender>
  )
}

export default ClientBlocksRender
