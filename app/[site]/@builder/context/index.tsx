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
  addChildToStructure: (
    parentId: string | null,
    blockConfiguration: any
  ) => void
}

interface BuilderContextProviderProps {
  children: React.ReactNode
}

const BuilderContext = createContext<BuilderContextValues>(
  {} as BuilderContextValues
)

export const BuilderContextProvider: React.FC<BuilderContextProviderProps> = ({
  children,
}) => {
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null)
  const [structure, setStructure] = useState<any[]>([])
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
    } else {
      setStructure([])
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
        addChildToStructure,
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
