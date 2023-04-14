import React, { ReactElement } from "react"
import dynamic from "next/dynamic"

import { cn } from "@/lib/utils"
import BlockSettingsSheet from "./BlockSettingsSheet"
import ClientBlocksRender from "./ClientBlocksRender"
import componentsPathMap from "./componentsPathMap"

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
  isHovered?: boolean
  removeBlock: (blockId: string) => void
  children?: React.ReactNode // Add this line
}

const BlocksRender: React.FC<BlocksRenderProps> = ({
  template,
  setStructure,
  addChild,
  level,
  addBlock,
  classNames,
  onClassNamesChange,
  removeBlock,
  children,
}) => {
  const blocksRender = (component: any): ReactElement => {
    const {
      id,
      tag,
      className,
      children: componentChildren,
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

    const handleClick = (event: React.MouseEvent) => {
      event.stopPropagation()
    }

    return (
      <BlockSettingsSheet blockId={id} onClassNamesChange={onClassNamesChange}>
        <Tag
          key={id}
          className={cn(className, "relative", classNames)}
          style={style}
          onClick={handleClick}
        >
          {CustomComponent ? <CustomComponent {...props} /> : content}
          {componentChildren?.map((child: Child) => (
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
          {children}
        </Tag>
      </BlockSettingsSheet>
    )
  }

  return blocksRender(template)
}

export default BlocksRender
