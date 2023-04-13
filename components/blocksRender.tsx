import React, { ReactElement } from "react"
import dynamic from "next/dynamic"

import { generateRandomId } from "@/lib/generateRandomId"
import { cn } from "@/lib/utils"
import BlockSettingsSheet from "./BlockSettingsSheet"
import ClientBlocksRender from "./ClientBlocksRender"
import blockConfigMap from "./blockConfigMap"
import componentsPathMap from "./componentsPathMap"
import { Button } from "./ui/button"

interface Child {
  id: string
  tag: string
  className: string
  children: Child[]
}

interface BlocksRenderProps {
  template: any
  data?: any
  setStructure: (structure: any[]) => void
  addChild: (parentId: string, blockConfiguration: any) => void
  level: number
  addBlock: (parentId: string, type: string) => void
  classNames: string // Add this line
  onClassNamesChange: (color: string) => void // Add this line
  isHovered: boolean
  removeBlock: (blockId: string) => void
}

const BlocksRender: React.FC<BlocksRenderProps> = ({
  template,
  setStructure,
  addChild,
  level,
  addBlock,
  classNames,
  onClassNamesChange,
  isHovered,
  removeBlock,
}) => {
  const blocksRender = (component: any): ReactElement => {
    const {
      id,
      tag,
      className,
      children,
      content,
      style,
      componentName,
      props,
    } = component
    const Tag = tag as keyof JSX.IntrinsicElements

    const CustomComponent =
      componentName && componentsPathMap[componentName]
        ? dynamic(() => import(`${componentsPathMap[componentName]}`))
        : null

    const updatedProps = props

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

    const handleClick = (event: React.MouseEvent) => {
      event.stopPropagation()
    }

    const handleRemove = (event: React.MouseEvent) => {
      event.stopPropagation()
      removeBlock(template.id)
    }

    const handleClone = (event: React.MouseEvent) => {
      event.stopPropagation()
      const clonedBlock = JSON.parse(JSON.stringify(template))
      clonedBlock.id = generateRandomId() // You'll need to move the generateRandomId() function to a shared location.
      addChild(template.parentId, clonedBlock)
    }

    return (
      <BlockSettingsSheet blockId={id} onClassNamesChange={onClassNamesChange}>
        <Tag
          key={id}
          className={cn(className, "relative", classNames)}
          style={style}
          onClick={handleClick}
        >
          {CustomComponent ? <CustomComponent {...updatedProps} /> : content}
          {children?.map((child: Child) => (
            <ClientBlocksRender
              key={child.id}
              template={child}
              setStructure={setStructure}
              addChild={addChild}
              level={level + 1}
              addBlock={addBlock}
              removeBlock={removeBlock}
            />
          ))}
          <>
            <div
              className="mx-auto flex h-full w-fit flex-row items-center justify-center gap-1 rounded-xl bg-transparent p-2"
              style={{ zIndex: level * 10 }}
            >
              <Button
                className="flex h-6 w-6 items-center justify-center rounded-lg bg-green-600 p-0 text-white"
                onClick={handleClone}
              >
                C
              </Button>
              <Button
                className="flex h-6 w-6 items-center justify-center rounded-lg bg-red-600 p-0 text-white"
                onClick={handleRemove}
              >
                X
              </Button>
              {isContainerElement(tag) &&
                Object.keys(blockConfigMap).map((componentName) => {
                  const Icon = blockConfigMap[componentName].icon
                  return (
                    <Button
                      key={componentName}
                      className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-900 p-0 text-white"
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
          </>
        </Tag>
      </BlockSettingsSheet>
    )
  }

  return blocksRender(template)
}

export default BlocksRender
