"use client"

import React, { useRef, useState } from "react"

import { generateRandomId } from "@/lib/generateRandomId"
import ClientBlocksRender from "@/components/ClientBlocksRender"
import blockConfigMap from "@/components/blockConfigMap"
import ProfileEditorNavbar from "./components/navbar"

interface ProfileEditorProps {
  initialData?: any[] // Add this line
}

const ProfileEditor: React.FC<ProfileEditorProps> = ({ initialData = [] }) => {
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null)
  const [structure, setStructure] = useState<any[]>(initialData)

  const blockRef = useRef<{ [key: string]: HTMLDivElement | null }>({})

  console.log(structure)

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
          selectedBlockId={selectedBlockId}
          setSelectedBlockId={setSelectedBlockId}
          blockRef={blockRef}
        />
      ))}
      <ProfileEditorNavbar
        setStructure={setStructure}
        structure={structure}
        selectedBlockId={selectedBlockId}
        setSelectedBlockId={setSelectedBlockId}
      />
    </>
  )
}

export default ProfileEditor
