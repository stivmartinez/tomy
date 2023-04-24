"use client"

import { relative } from "path"
import React, { useState } from "react"
import {
  ArrowDown,
  ArrowUp,
  Copy,
  Delete,
  Edit,
  Settings,
  Settings2,
  Trash,
} from "lucide-react"

import { generateRandomId } from "@/lib/generateRandomId"
import BlocksRender from "@/components/blocksRender"
import BlockSettingsSheet from "./BlockSettingsSheet"
import blockConfigMap from "./blockConfigMap"
import { Button } from "./ui/button"

interface ClientBlocksRenderProps {
  template: any
  setStructure: (structure: any[]) => void
  level: number
  addChild: (parentId: string, blockConfiguration: any) => void
  addBlock: (parentId: string, type: string) => void
  removeBlock: (blockId: string) => void
  selectedBlockId: string | null
  setSelectedBlockId: (blockId: string | null) => void
  blockRef: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>
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
}) => {
  const [classNames, setClassNames] = useState("")
  const [styles, setStyles] = useState<Record<string, string | number>>({})

  const [isEditing, setIsEditing] = useState(false)

  const handleBlur = (event: React.FocusEvent<HTMLHeadingElement>) => {
    const newContent = event.target.textContent
    if (newContent === "E" && !isEditing) {
      event.target.textContent = template.content
    } else if (newContent !== template.content) {
      setStructure((prevStructure: any[]) => {
        const newStructure = JSON.parse(JSON.stringify(prevStructure))
        const updateContentRecursive = (node: any) => {
          if (!node) return false
          if (node.id === template.id) {
            node.content = newContent
            return true
          }
          if (node.children) {
            for (const child of node.children) {
              if (updateContentRecursive(child)) {
                return true
              }
            }
          }
          return false
        }

        newStructure.forEach((node: any) => {
          updateContentRecursive(node)
        })

        return newStructure
      })
    }
  }

  const handleSelect = (event: React.MouseEvent) => {
    event.stopPropagation()
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
    setClassNames(updatedClassNames)
  }

  const handleStylesChange = (newStyles: {
    [key: string]: string | number
  }) => {
    setStyles((prevState) => ({ ...prevState, ...newStyles }))
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

  const isContainerElement = (tag: string): boolean => {
    const containerElements = [
      "div",
      "section",
      "footer",
      "header",
      "main",
      "nav",
      "aside",
      "article",
    ]
    return containerElements.includes(tag)
  }

  const handleImageSourceUpdate = () => {
    const newSrc = prompt("Please enter the new image source URL:")
    if (newSrc) {
      setStructure((prevStructure: any[]) => {
        const newStructure = JSON.parse(JSON.stringify(prevStructure))
        const updateImageSourceRecursive = (node: any) => {
          if (!node) return false
          if (node.id === template.id) {
            node.props.src = newSrc
            return true
          }
          if (node.children) {
            for (const child of node.children) {
              if (updateImageSourceRecursive(child)) {
                return true
              }
            }
          }
          return false
        }

        newStructure.forEach((node: any) => {
          updateImageSourceRecursive(node)
        })

        return newStructure
      })
    }
  }

  const moveBlock = (blockId, direction) => {
    setStructure((prevStructure) => {
      const newStructure = JSON.parse(JSON.stringify(prevStructure))

      const findParentAndIndex = (children, blockId) => {
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
        return null
      }

      const { parent, index } = findParentAndIndex(newStructure, blockId)

      if (!parent) {
        console.error("Block not found")
        return prevStructure
      }

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
    })
  }

  const buttons = (
    <div
      className="fixed right-0 top-0 flex w-fit flex-row items-center gap-1 rounded-bl-xl bg-slate-900 p-2"
      style={{ zIndex: level * 10 }}
    >
      <Button
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-500 p-0 text-white"
        onClick={(e) => moveBlock(template.id, "up")}
      >
        <ArrowUp size="12" />
      </Button>
      <Button
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-500 p-0 text-white"
        onClick={(e) => moveBlock(template.id, "down")}
      >
        <ArrowDown size="12" />
      </Button>
      {template.type && (
        <span className="flex px-2 text-sm font-normal text-slate-300">
          {template.type}
        </span>
      )}
      <BlockSettingsSheet
        onClassNamesChange={handleClassNamesChange}
        onStylesChange={handleStylesChange}
      >
        <Button className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 p-0 text-white">
          <Settings2 size="12" />
        </Button>
      </BlockSettingsSheet>
      <Button
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-500 p-0 text-white"
        onClick={handleClone}
      >
        <Copy size="12" />
      </Button>
      <Button
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-500 p-0 text-white"
        onClick={handleRemove}
      >
        <Trash size="12" />
      </Button>
      <Button
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-500 p-0 text-white"
        onClick={(event) => {
          event.stopPropagation()
          if (template.type === "image") {
            handleImageSourceUpdate()
          } else {
            setIsEditing((prev) => !prev)
          }
        }}
      >
        <Edit size="12" />
      </Button>
      {isContainerElement(template.tag) &&
        Object.keys(blockConfigMap).map((componentName) => {
          const Icon = blockConfigMap[componentName].icon
          return (
            <Button
              key={componentName}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 p-0 text-white"
              onClick={(event) => {
                event.stopPropagation()
                addBlock(template.id, componentName)
              }}
            >
              <Icon size="14" />
            </Button>
          )
        })}
    </div>
  )

  const shadow =
    selectedBlockId === template.id ? "0 0 0 2px red" : "inset 0 0 0 1px blue"

  return React.cloneElement(
    <BlocksRender
      template={template}
      setStructure={setStructure}
      addChild={addChild}
      level={level}
      addBlock={addBlock}
      styles={{ ...styles, boxShadow: shadow, cursor: "pointer" }}
      classNames={`${classNames}`}
      removeBlock={removeBlock}
      onClick={handleSelect}
      selectedBlockId={selectedBlockId}
      setSelectedBlockId={setSelectedBlockId}
      contentEditable={isEditing && selectedBlockId === template.id}
      onBlur={isEditing ? handleBlur : undefined}
      blockRef={blockRef}
      suppressContentEditableWarning
    >
      {selectedBlockId === template.id && buttons}
    </BlocksRender>,
    {
      ref: (el: HTMLDivElement) => {
        blockRef.current[template.id] = el
      },
    }
  )
}

export default React.memo(ClientBlocksRender)
