"use client"

import React, { useState } from "react"

import ClientBlocksRender from "@/components/ClientBlocksRender"
import blockConfigMap from "./blockConfigMap"

interface CustomPageProps {
  initialData?: any[] // Add this line
}

const CustomPage: React.FC<CustomPageProps> = ({ initialData = [] }) => {
  const generateRandomId = () => Math.floor(Math.random() * 1000000).toString()

  const [structure, setStructure] = useState<any[]>(initialData)

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
    </>
  )
}

export default CustomPage
