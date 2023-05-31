"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import blocksList from "@/app/builder/constants/blocks-list"

import { generateRandomId } from "@/lib/generate-random-Id"

const BuilderContext = createContext<any>({} as any)

export const BuilderContextProvider: React.FC<any> = ({ children }) => {
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null)
  const [structure, setStructure] = useState<any[]>([])
  const [renderKey, setRenderKey] = useState<number>(0)
  const [showShadow, setShowShadow] = useState(true)
  const [reload, setReload] = useState(false)

  const saveStructure = async (newStructure: any) => {
    await fetch("/api/site", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ siteId: "site1", jsonData: newStructure }),
    })

    setReload((prev) => !prev)
  }

  const loadSavedStructure = async () => {
    await fetch("/api/site?siteId=site1")
      .then((res) => res.json())
      .then((data) => {
        setStructure(data)
      })
  }

  useEffect(() => {
    loadSavedStructure()
  }, [reload])

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
      const blockConfig = blocksList[componentName]

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
      ): any | undefined => {
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

  const [isEditing, setIsEditing] = useState(false)

  const handleSelect = (event: React.MouseEvent, id: any) => {
    event.stopPropagation()

    setSelectedBlockId((prevState: any) => {
      if (prevState === id) {
        setIsEditing(true)
        return null
      } else {
        setIsEditing(false)
        return id
      }
    })
  }

  const handlePropertyUpdate = (
    id: string,
    propertyName: string,
    propertyPath: string[],
    value: any
  ) => {
    const newStructure = JSON.parse(JSON.stringify(structure))

    const updatePropertyRecursive = (node: any) => {
      if (!node) return false
      if (node.id === id) {
        let target = node
        if (propertyPath.length === 0) {
          target[propertyName] = value
        } else {
          propertyPath.forEach((path, index) => {
            if (index < propertyPath.length - 1) {
              target = target[path]
            } else {
              target[path] = value
            }
          })
        }
        return true
      }
      if (node.children) {
        for (const child of node.children) {
          if (updatePropertyRecursive(child)) {
            return true
          }
        }
      }
      return false
    }

    newStructure.forEach((node: any) => {
      updatePropertyRecursive(node)
    })

    saveStructure(newStructure)
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
        addChild,
        moveBlock,
        handleSelect,
        isEditing,
        setIsEditing,
        handlePropertyUpdate,
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
