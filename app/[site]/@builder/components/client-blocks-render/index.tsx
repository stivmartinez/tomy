"use client"

import React, { useState } from "react"
import BlocksRender from "@/app/[site]/blocks-render"

import { generateRandomId } from "@/lib/generateRandomId"
import { useBuilderContext } from "../../context"
import ClientButtons from "./buttons"

interface ClientBlocksRenderProps {
  template: any
  blockRef?: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>
  index?: number
  parentLength?: number
  level?: number
  isEditable?: boolean
}

const ClientBlocksRender: React.FC<ClientBlocksRenderProps> = ({
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
    addBlock,
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

  const shadow =
    selectedBlockId === template.id
      ? "0 0 0 2px red"
      : showShadow
      ? "inset 0 0 0 1px blue"
      : "inset 0 0 0 1px transparent"

  return React.cloneElement(
    <BlocksRender
      template={template}
      setStructure={setStructure}
      addChild={addChild}
      level={level || undefined}
      addBlock={addBlock}
      styles={{ boxShadow: shadow, cursor: "pointer" }}
      classNames={classNames}
      removeBlock={removeBlock}
      handleSelect={handleSelect}
      selectedBlockId={selectedBlockId}
      setSelectedBlockId={setSelectedBlockId}
      contentEditable={isEditing && selectedBlockId === template.id}
      blockRef={currentBlockRef}
      suppressContentEditableWarning
      isEditable={isEditable}
      showShadow={showShadow}
    >
      {selectedBlockId === template.id && (
        <ClientButtons
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

export default React.memo(ClientBlocksRender)
