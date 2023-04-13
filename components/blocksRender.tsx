import React, { ReactElement, useState } from "react"
import dynamic from "next/dynamic"

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
}

const BlocksRender: React.FC<BlocksRenderProps> = ({
  template,
  setStructure,
  addChild,
  level,
  addBlock,
  classNames, // Add this line
  onClassNamesChange, // Add this line
  isHovered,
}) => {
  // Inside the BlocksRender component
  const [showDropdown, setShowDropdown] = useState(false)

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

    const getBorderColorByLevel = (level: number): string => {
      const colors = ["red", "blue", "green", "purple", "orange"]

      // Use modulo to loop through the colors array when the level is higher than the available colors
      return colors[level % colors.length]
    }

    return (
      <Tag
        key={id}
        className={cn(className, "relative", classNames, {
          [`border border-${getBorderColorByLevel(level)}-600`]: isHovered,
        })}
        style={{ ...style }}
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
          />
        ))}

        {isHovered && (
          <>
            <div className="absolute left-8 top-0 flex flex-row gap-2">
              {Object.keys(blockConfigMap).map((componentName) => {
                const Icon = blockConfigMap[componentName].icon
                return (
                  <Button
                    key={componentName}
                    className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-900 p-0 text-white"
                    onClick={() => addBlock(template.id, componentName)}
                  >
                    <Icon size="14" />
                  </Button>
                )
              })}
            </div>
            <BlockSettingsSheet
              blockId={id}
              onClassNamesChange={onClassNamesChange}
            />
          </>
        )}
      </Tag>
    )
  }

  return blocksRender(template)
}

export default BlocksRender
