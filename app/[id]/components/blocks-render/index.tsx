"use client";
import React, { useState } from "react"
import BlocksRender from "@/app/blocks-render"

import { generateRandomId } from "@/lib/generateRandomId"
import BlockOptions from "../block-options"
import { useBuilderContext } from "../context"

interface BuilderBlocksRenderProps {
  template: any
  blockRef?: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>
  index?: number
  parentLength?: number
  level?: number
  isEditable?: boolean
}

const BuilderBlocksRender: React.FC<BuilderBlocksRenderProps> = ({
  template,
  blockRef,
  index,
  parentLength,
  level = 0,
  isEditable = true,
}) => {
  const defaultRef = React.useRef<{ [key: string]: HTMLDivElement | null }>({})
  const currentBlockRef = blockRef || defaultRef
  const {
    setStructure,
    addChild,
    removeBlock,
    selectedBlockId,
    setSelectedBlockId,
    showShadow,
    moveBlock,
  } = useBuilderContext()

  const [classNames, setClassNames] = useState<string[]>(
    template?.className || []
  )
  const [isEditing, setIsEditing] = useState(false)

  const handleClassNameChange = (value: any) => {
    setClassNames(() => {
      // Now update the structure with the new class names
      setStructure((prevStructure: any[]) => {
        const newStructure = JSON.parse(JSON.stringify(prevStructure))

        const updateClassNameRecursive = (node: any) => {
          if (!node) return
          if (node.id === template.id) {
            node.className = value // Use the new class names here
          }
          if (node.children) {
            for (const child of node.children) {
              updateClassNameRecursive(child)
            }
          }
        }

        newStructure.forEach((node: any) => {
          updateClassNameRecursive(node)
        })

        return newStructure
      })

      return value
    })
  }

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
    promptMessage: string,
    value: any
  ) => {
    setStructure((prevStructure: any[]) => {
      const newStructure = JSON.parse(JSON.stringify(prevStructure))

      const updatePropertyRecursive = (node: any) => {
        if (!node) return false
        if (node.id === template.id) {
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

      return newStructure
    })
  }

  const shadow =
    selectedBlockId === template.id
      ? "inset 0 0 0 2px red"
      : showShadow
      ? "inset 0 0 0 1px rgba(0, 0, 0, 0.2)"
      : "inset 0 0 0 1px transparent"

  return React.cloneElement(
    <BlocksRender
      template={template}
      level={level || undefined}
      styles={{ boxShadow: shadow, cursor: "pointer" }}
      handleSelect={handleSelect}
      contentEditable={isEditing && selectedBlockId === template.id}
      blockRef={currentBlockRef}
      suppressContentEditableWarning
      isEditable={isEditable}
    >
      {selectedBlockId === template.id && (
        <BlockOptions
          template={template}
          index={index}
          parentLength={parentLength}
          moveBlock={moveBlock}
          handleClone={handleClone}
          handleRemove={handleRemove}
          handleClassNameChange={handleClassNameChange}
          classNames={classNames}
          handlePropertyUpdate={handlePropertyUpdate}
        />
      )}
    </BlocksRender>,
    {
      ref: (el: HTMLDivElement) => {
        currentBlockRef.current[template.id] = el
      },
    }
  )
}

export default React.memo(BuilderBlocksRender)
