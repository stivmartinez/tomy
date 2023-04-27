import React, { ReactElement } from "react"

import { cn } from "@/lib/utils"
import ClientBlocksRender from "./client-blocks-render"

interface Child {
  id: string
  tag: string
  className: string
  children: Child[]
}

interface BlocksRenderProps {
  template: any
  setStructure?: (callback: (structure: any[]) => any[]) => void
  addChild?: (parentId: string, blockConfiguration: any) => void
  level?: number
  addBlock?: (parentId: string, type: string) => void
  classNames?: string
  removeBlock?: (blockId: string) => void
  children?: React.ReactNode
  styles?: any
  handleSelect?: any
  setSelectedBlockId?: (
    callback: (blockId: string | null) => string | null
  ) => void
  selectedBlockId?: string | null
  contentEditable?: boolean
  suppressContentEditableWarning?: boolean
  blockRef?: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>
  isEditable: boolean
}

const BlocksRender: React.FC<BlocksRenderProps> = React.memo(
  ({
    template,
    setStructure,
    addChild,
    level,
    addBlock,
    classNames,
    removeBlock,
    children,
    styles,
    handleSelect,
    setSelectedBlockId,
    selectedBlockId,
    contentEditable,
    suppressContentEditableWarning,
    blockRef,
    isEditable,
  }) => {
    const blocksRender = (component: any): ReactElement => {
      const {
        id,
        tag,
        className,
        children: componentChildren,
        style,
      } = component

      const Tag = tag as keyof JSX.IntrinsicElements

      return (
        <Tag
          key={id}
          className={cn(className, "relative", classNames)}
          style={{ ...style, ...styles }}
          onClick={handleSelect}
          contentEditable={contentEditable}
          suppressContentEditableWarning={suppressContentEditableWarning}
        >
          {component.content}
          {componentChildren?.map((child: Child) => {
            if (isEditable)
              return (
                <ClientBlocksRender
                  key={child.id}
                  template={child}
                  setStructure={setStructure}
                  addChild={addChild}
                  level={level ? level + 1 : null}
                  addBlock={addBlock}
                  removeBlock={removeBlock}
                  selectedBlockId={selectedBlockId}
                  setSelectedBlockId={setSelectedBlockId}
                  blockRef={blockRef}
                  parentLength={componentChildren.length}
                  index={componentChildren.indexOf(child)}
                />
              )

            return (
              <BlocksRender
                key={child.id}
                template={child}
                isEditable={false}
              />
            )
          })}
          {children}
        </Tag>
      )
    }

    return blocksRender(template)
  }
)

BlocksRender.displayName = "BlocksRender"
export default BlocksRender
