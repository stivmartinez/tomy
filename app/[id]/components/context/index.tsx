"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"

import blocks from "@/lib/blocks"
import { generateRandomId } from "@/lib/generateRandomId"

interface BlockConfiguration {
  id: string
  parentId: string | null
  children: BlockConfiguration[]
  [key: string]: any
}

interface BuilderContextValues {
  structure: BlockConfiguration[]
  setStructure: React.Dispatch<React.SetStateAction<BlockConfiguration[]>>
  renderKey: number
  setRenderKey: React.Dispatch<React.SetStateAction<number>>
  selectedBlockId: string | null
  setSelectedBlockId: React.Dispatch<React.SetStateAction<string | null>>
  addBlock: (parentId: string, componentName: string) => void
  removeBlock: (blockId: string) => void
  showShadow: boolean
  setShowShadow: React.Dispatch<React.SetStateAction<boolean>>
  saveStructure: () => void
  resetSavedStructure: () => void
  addChild: (parentId: string | null, blockConfiguration: any) => void
  moveBlock: (blockId: string, newParentId: string | null) => void
}

interface BuilderContextProviderProps {
  children: React.ReactNode
}

interface ParentAndIndex {
  parent: any
  index: number
}

const BuilderContext = createContext<BuilderContextValues>(
  {} as BuilderContextValues
)

export const BuilderContextProvider: React.FC<BuilderContextProviderProps> = ({
  children,
}) => {
  const initialStructure = [
    {
      id: "1",
      tag: "main",
      type: "main",
      className: "flex-grow overflow-auto",
      children: [
        {
          id: "2",
          tag: "div",
          type: "container",
          className: "w-full max-w-3xl mx-auto px-4 min-h-screen",
          children: [
            {
              id: "3",
              tag: "section",
              type: "rows",
              className: "min-h-screen w-full flex flex-col gap-2",
              children: [],
            },
          ],
        },
      ],
    },
  ]

  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null)
  const [structure, setStructure] = useState<any[]>(initialStructure)
  const [renderKey, setRenderKey] = useState<number>(0)
  const [showShadow, setShowShadow] = useState(true)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedBlockId(null)
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    // Clean up the event listener when the component is unmounted
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

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
    }
  }

  useEffect(() => {
    loadSavedStructure()
  }, [])

  const addChild = useCallback(
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
        addChild(parentId, blockConfig)
      }
    },
    [addChild]
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

  const moveBlock = (blockId: any, direction: any) => {
    setStructure((prevStructure) => {
      const newStructure = JSON.parse(JSON.stringify(prevStructure))

      const findParentAndIndex = (
        children: any,
        blockId: any
      ): ParentAndIndex | undefined => {
        for (let i = 0; i < children.length; i++) {
          if (children[i].id === blockId) {
            return { parent: children, index: i }
          }
          if (children[i].children) {
            const result = findParentAndIndex(children[i].children, blockId)
            if (result) {
              return result
            }
          }
        }
        return undefined
      }

      const parentAndIndex = findParentAndIndex(newStructure, blockId)

      if (parentAndIndex) {
        const { parent, index } = parentAndIndex

        // Perform operations with parent and index

        const block = parent[index]

        if (direction === "up") {
          if (index > 0) {
            parent.splice(index, 1)
            parent.splice(index - 1, 0, block)
          }
        } else if (direction === "down") {
          if (index < parent.length - 1) {
            parent.splice(index, 1)
            parent.splice(index + 1, 0, block)
          }
        }

        return newStructure
      } else {
        // Handle the case when parentAndIndex is undefined
        console.error("Block not found")
        return prevStructure
      }
    })
  }

  return (
    <BuilderContext.Provider
      value={{
        structure,
        setStructure,
        renderKey,
        setRenderKey,
        selectedBlockId,
        setSelectedBlockId,
        addBlock,
        removeBlock,
        showShadow,
        setShowShadow,
        saveStructure,
        resetSavedStructure,
        addChild,
        moveBlock,
      }}
    >
      {children}
    </BuilderContext.Provider>
  )
}

export const useBuilderContext = () => {
  const context = useContext(BuilderContext)
  if (context === null) {
    throw new Error(
      "useBuilderContext must be used within a BuilderContextProvider"
    )
  }
  return context
}
