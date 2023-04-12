"use client"

import React, { useState } from "react"

import ClientBlocksRender from "@/components/ClientBlocksRender"
import blockConfigMap from "./blockConfigMap"

interface CustomPageProps {
  structure: any[]
}

const CustomPage: React.FC<CustomPageProps> = ({
  structure: initialStructure,
}) => {
  const generateRandomId = () => Math.floor(Math.random() * 1000000).toString()

  const [structure, setStructure] = useState<any[]>(initialStructure)

  const addChildToStructure = (parentId: string, blockConfiguration: any) => {
    const newStructure = JSON.parse(JSON.stringify(structure))

    const newBlock = {
      ...blockConfiguration,
      id: generateRandomId(),
      children: [],
    }

    const addChildRecursive = (node: any) => {
      if (!node) return false
      if (node.id === parentId) {
        node.children.push(newBlock)
        return true
      }
      if (node.children) {
        for (const child of node.children) {
          if (addChildRecursive(child)) {
            return true
          }
        }
      }
      return false
    }

    newStructure.forEach((node: any) => {
      addChildRecursive(node)
    })

    setStructure(newStructure)
  }

  const addBlock = (parentId: string, componentName: string) => {
    const blockConfig = blockConfigMap[componentName]

    if (blockConfig) {
      addChildToStructure(parentId, blockConfig)
    }
  }

  return (
    <>
      {structure.map((block) => (
        <ClientBlocksRender
          key={block.id}
          template={block}
          setStructure={setStructure}
          level={0}
          addChild={addChildToStructure}
          addBlock={addBlock} // Add this line
        />
      ))}
      <button
        onClick={() => {
          const id = generateRandomId()
          const newBlock = {
            id,
            tag: "div",
            className: "min-h-32 w-full border-2 border-red-500",
            children: [],
            content: id,
          }
          setStructure((prevStructure: any[]) => [...prevStructure, newBlock])
        }}
      >
        Add child to header
      </button>
    </>
  )
}

export default CustomPage
