import React, { ReactElement } from "react"

import { cn } from "@/lib/cn"
import BuilderBlocksEditor from "./builder/[id]/components/blocks-editor"

interface Child {
  id: string
  tag: string
  className: string
  children: Child[]
}

interface BlocksRenderProps {
  template: any
  level?: number
  children?: React.ReactNode
  styles?: any
  handleSelect?: any
  contentEditable?: boolean
  suppressContentEditableWarning?: boolean
  blockRef?: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>
  isEditable: boolean
}

const BlocksRender: React.FC<BlocksRenderProps> = React.memo(
  ({
    template,
    level,
    children,
    styles,
    handleSelect,
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
        selfClosing,
      } = component

      const Tag = tag as keyof JSX.IntrinsicElements

      if (selfClosing) {
        return (
          <>
            <Tag
              key={id}
              className={cn(className)}
              style={{ ...style, ...styles }}
              onClick={handleSelect}
              {...component.props}
            />
            {children}
          </>
        )
      }

      return (
        <Tag
          key={id}
          className={cn(className)}
          style={{ ...style, ...styles }}
          onClick={handleSelect}
          contentEditable={contentEditable}
          suppressContentEditableWarning={suppressContentEditableWarning}
        >
          {component.content}
          {componentChildren?.map((child: Child) => {
            if (isEditable)
              return (
                <BuilderBlocksEditor
                  key={child.id}
                  template={child}
                  level={level ? level + 1 : undefined}
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
