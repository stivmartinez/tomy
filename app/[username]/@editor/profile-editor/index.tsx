"use client"

import React, { useState } from "react"
import { Plus } from "lucide-react"

import { generateRandomId } from "@/lib/generateRandomId"
import ClientBlocksRender from "@/components/ClientBlocksRender"
import blockConfigMap from "@/components/blockConfigMap"
import { Button } from "@/components/ui/button"

interface ProfileEditorProps {
  initialData?: any[] // Add this line
}

const ProfileEditor: React.FC<ProfileEditorProps> = ({ initialData = [] }) => {
  const [structure, setStructure] = useState<any[]>(initialData)

  const addChildToStructure = (
    parentId: string | null,
    blockConfiguration: any
  ) => {
    const newStructure = JSON.parse(JSON.stringify(structure))

    const newBlock = {
      ...blockConfiguration,
      id: generateRandomId(),
      parentId,
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

    if (parentId) {
      newStructure.forEach((node: any) => {
        addChildRecursive(node)
      })
    } else {
      newStructure.push(newBlock)
    }

    setStructure(newStructure)
  }

  const addBlock = (parentId: string, componentName: string) => {
    const blockConfig = blockConfigMap[componentName]

    if (blockConfig) {
      addChildToStructure(parentId, blockConfig)
    }
  }

  const removeBlock = (blockId: string) => {
    const removeBlockById = (blocks: any[]): any[] => {
      return blocks.reduce((result, block) => {
        if (block.id !== blockId) {
          if (block.children && block.children.length > 0) {
            block.children = removeBlockById(block.children)
          }
          result.push(block)
        }
        return result
      }, [])
    }

    setStructure(removeBlockById(structure))
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
          addBlock={addBlock}
          removeBlock={removeBlock}
        />
      ))}
      <div className="mt-4 flex justify-center">
        <Button
          onClick={() => {
            const newBlock = {
              id: generateRandomId(),
              tag: "section",
              type: "container",
              className: "w-full min-h-[24px]",
              children: [],
            }
            setStructure((prevStructure: any[]) => [...prevStructure, newBlock])
          }}
          className="h-8 w-8 rounded-full p-0"
        >
          <Plus size="16" />
        </Button>
      </div>
    </>
  )
}

export default ProfileEditor
