"use client"

import React, { useState } from "react"
import BlocksRender from "@/app/[site]/blocks-render"

import { generateRandomId } from "@/lib/generateRandomId"
import ClientButtons from "./components/client-buttons"

interface ClientBlocksRenderProps {
  template: any
  setStructure?: (callback: (structure: any[]) => any[]) => void
  level?: number | null | undefined
  addChild?: (parentId: string, blockConfiguration: any) => void
  addBlock?: (parentId: string, type: string) => void
  removeBlock?: (blockId: string) => void
  selectedBlockId?: string | null
  setSelectedBlockId?: (
    callback: (blockId: string | null) => string | null
  ) => void
  blockRef?: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>
  index?: number
  parentLength?: number
  isEditable?: boolean
}

interface ParentAndIndex {
  parent: any
  index: number
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
  blockRef,
  index,
  parentLength,
  isEditable = true,
}) => {
  const [classNames, setClassNames] = useState("")
  const [isEditing, setIsEditing] = useState(false)

  const handleSelect = (event: React.MouseEvent) => {
    event.stopPropagation()

    if ((event.target as HTMLElement).classList.contains("ignore-click")) {
      return
    }

    setSelectedBlockId((prevState: any) => {
      if (prevState === template.id) {
        setIsEditing(true)
        return null
      } else {
        setIsEditing(false)
        return template.id
      }
    })
  }

  const filterConflictingClassNames = (
    classNames: string[],
    newClassName: string
  ) => {
    const newClassNamePrefix = newClassName.split("-")[0]
    return classNames.filter(
      (className) => className.split("-")[0] !== newClassNamePrefix
    )
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

    setClassNames((prevClassNames) => {
      const existingClassNames = prevClassNames.split(" ")
      const newClassNames = updatedClassNames.split(" ")
      const filteredClassNames = filterConflictingClassNames(
        existingClassNames,
        newClassNames[0]
      )
      const combinedClassNames = Array.from(
        new Set([...filteredClassNames, ...newClassNames])
      )
      const finalClassNames = combinedClassNames.join(" ")

      // Update the structure with the new classNames
      setStructure((prevStructure: any[]) => {
        const newStructure = JSON.parse(JSON.stringify(prevStructure))
        const updateClassNamesRecursive = (node: any) => {
          if (!node) return false
          if (node.id === template.id) {
            const defaultClassNames = node.className.split(" ")
            const mergedClassNames = Array.from(
              new Set([...defaultClassNames, ...combinedClassNames])
            )
            node.className = mergedClassNames.join(" ")
            return true
          }
          if (node.children) {
            for (const child of node.children) {
              if (updateClassNamesRecursive(child)) {
                return true
              }
            }
          }
          return false
        }

        newStructure.forEach((node: any) => {
          updateClassNamesRecursive(node)
        })

        return newStructure
      })

      return finalClassNames
    })
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

  const handlePropertyUpdate = (
    propertyName: string,
    propertyPath: string[],
    promptMessage: string
  ) => {
    const newValue = prompt(promptMessage)
    if (newValue) {
      setStructure((prevStructure: any[]) => {
        const newStructure = JSON.parse(JSON.stringify(prevStructure))

        const updatePropertyRecursive = (node: any) => {
          if (!node) return false
          if (node.id === template.id) {
            let target = node
            if (propertyPath.length === 0) {
              target[propertyName] = newValue
            } else {
              propertyPath.forEach((path, index) => {
                if (index < propertyPath.length - 1) {
                  target = target[path]
                } else {
                  target[path] = newValue
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

        return newStructure
      })
    }
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

  const shadow =
    selectedBlockId === template.id ? "0 0 0 2px red" : "inset 0 0 0 1px blue"

  return React.cloneElement(
    <BlocksRender
      template={template}
      setStructure={setStructure}
      addChild={addChild}
      level={level || undefined}
      addBlock={addBlock}
      styles={{ boxShadow: shadow, cursor: "pointer" }}
      classNames={`${classNames}`}
      removeBlock={removeBlock}
      handleSelect={handleSelect}
      selectedBlockId={selectedBlockId}
      setSelectedBlockId={setSelectedBlockId}
      contentEditable={isEditing && selectedBlockId === template.id}
      blockRef={blockRef}
      suppressContentEditableWarning
      isEditable={isEditable}
    >
      {selectedBlockId === template.id && (
        <ClientButtons
          template={template}
          index={index}
          parentLength={parentLength}
          moveBlock={moveBlock}
          handleClone={handleClone}
          handleRemove={handleRemove}
          handleClassNamesChange={handleClassNamesChange}
          classNames={classNames}
          handlePropertyUpdate={handlePropertyUpdate}
        />
      )}
    </BlocksRender>,
    {
      ref: (el: HTMLDivElement) => {
        blockRef.current[template.id] = el
      },
    }
  )
}

export default React.memo(ClientBlocksRender)
