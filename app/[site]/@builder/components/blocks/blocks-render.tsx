import { cn } from "@/lib/utils"
import dynamic from "next/dynamic"
import React, { ReactElement } from "react"

import advancedBlocks from "./advancedBlocks"
import ClientBlocksRender from "./client-blocks-render"

interface Child {
  id: string
  tag: string
  className: string
  children: Child[]
}

interface BlocksRenderProps {
  template: any
  setStructure: (callback: (structure: any[]) => any[]) => void
  addChild: (parentId: string, blockConfiguration: any) => void
  level: number
  addBlock: (parentId: string, type: string) => void
  classNames: string
  removeBlock: (blockId: string) => void
  children?: React.ReactNode
  styles: any
  onClick?: any
  setSelectedBlockId: (
    callback: (blockId: string | null) => string | null
  ) => void
  selectedBlockId: string | null
  contentEditable?: boolean
  onBlur?: any
  suppressContentEditableWarning?: boolean
  blockRef: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>
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
  contentEditable,
  onBlur,
  suppressContentEditableWarning,
  blockRef,
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
      componentName && advancedBlocks[componentName]
        ? dynamic(() => import(`${advancedBlocks[componentName]}`))
        : null

    return (
      <Tag
        key={id}
        className={cn(className, "relative", classNames)}
        style={{ ...style, ...styles }}
        onClick={onClick ? (event) => onClick(event) : undefined}
        onBlur={onBlur}
        contentEditable={contentEditable}
        suppressContentEditableWarning={suppressContentEditableWarning}
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
            blockRef={blockRef}
            parentLength={componentChildren.length}
            index={componentChildren.indexOf(child)}
          />
        ))}
        {children}
      </Tag>
    )
  }

  return blocksRender(template)
}

export default BlocksRender
