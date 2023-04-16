import React, { ReactElement } from "react"
import dynamic from "next/dynamic"

import { cn } from "@/lib/utils"
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
  setStructure: (structure: any[]) => void
  addChild: (parentId: string, blockConfiguration: any) => void
  level: number
  addBlock: (parentId: string, type: string) => void
  classNames: string
  removeBlock: (blockId: string) => void
  children?: React.ReactNode
  styles: any
  onClick?: any
  setSelectedBlockId: (id: string | null) => void
  selectedBlockId: string | null
}

const BlocksRender: React.FC<BlocksRenderProps> = ({
  template,
  setStructure,
  addChild,
  level,
  addBlock,
  classNames,
  removeBlock,
  children,
  styles,
  onClick,
  setSelectedBlockId,
  selectedBlockId,
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

    return (
      <Tag
        key={id}
        className={cn(className, "relative", classNames)}
        style={{ ...style, ...styles }}
        onClick={onClick ? (event) => onClick(event) : undefined}
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
            selectedBlockId={selectedBlockId}
            setSelectedBlockId={setSelectedBlockId}
          />
        ))}
        {children}
      </Tag>
    )
  }

  return blocksRender(template)
}

export default BlocksRender
