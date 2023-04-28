"use client"

import React, { useCallback, useEffect, useState } from "react"
import ClientBlocksRender from "@/app/[site]/@builder/client-blocks-render"

import blocks from "@/lib/blocks"
import { generateRandomId } from "@/lib/generateRandomId"
import BuilderNavbar from "./components/navbar"
import MouseRuler from "./mouse-ruler"

interface BuilderProps {
  initialData?: any[]
}

const Builder: React.FC<BuilderProps> = ({ initialData = [] }) => {
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null)
  const [structure, setStructure] = useState<any[]>(initialData)
  const [renderKey, setRenderKey] = useState<number>(0)

  const saveStructure = () => {
    localStorage.setItem("savedStructure", JSON.stringify(structure))
  }

  const resetSavedStructure = () => {
    localStorage.removeItem("savedStructure")
  }

  const loadSavedStructure = () => {
    const savedStructure = localStorage.getItem("savedStructure")
    if (savedStructure) {
      setStructure(JSON.parse(savedStructure))
    } else {
      setStructure(initialData)
    }
  }

  useEffect(() => {
    loadSavedStructure()
  }, [])

  const addChildToStructure = useCallback(
    (parentId: string | null, blockConfiguration: any) => {
      setStructure((prevStructure) => {
        const newStructure = JSON.parse(JSON.stringify(prevStructure))

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

        return newStructure
      })
    },
    []
  )

  const addBlock = useCallback(
    (parentId: string, componentName: string) => {
      const blockConfig = blocks[componentName]

      if (blockConfig) {
        addChildToStructure(parentId, blockConfig)
      }
    },
    [addChildToStructure]
  )

  const removeBlock = useCallback((blockId: string) => {
    setStructure((prevStructure) => removeBlockById(prevStructure, blockId))
    setRenderKey((prevRenderKey) => prevRenderKey + 1)
  }, [])

  const removeBlockById = (blocks: any[], blockId: string): any[] => {
    const result = []
    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i]
      if (block.id !== blockId) {
        if (block.children && block.children.length > 0) {
          block.children = removeBlockById(block.children, blockId)
        }
        result.push(block)
      }
    }
    return result
  }

  return (
    <>
      <MouseRuler />
      {structure.map((block, index) => (
        <ClientBlocksRender
          key={`${block.id}-${renderKey}`}
          template={block}
          setStructure={setStructure}
          level={0}
          addChild={addChildToStructure}
          addBlock={addBlock}
          removeBlock={removeBlock}
          selectedBlockId={selectedBlockId}
          setSelectedBlockId={setSelectedBlockId}
          index={index}
          parentLength={structure.length}
          isEditable={true}
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
      />
    </>
  )
}

export default Builder
