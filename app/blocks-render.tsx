import React, { ReactElement } from "react"

import { cn } from "@/lib/cn"
import BuilderBlockEditor from "./builder/components/editor"

const BlocksRender: React.FC<any> = React.memo(
  ({
    block,
    level,
    children,
    styles,
    handleSelect,
    blockRef,
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
              onClick={(e) => handleSelect(e, id)}
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
          onClick={(e) => handleSelect(e, id)}
        >
          {component.content}
          {componentChildren?.map((child: any) => {
            return (
              <BuilderBlockEditor
                key={child.id}
                block={child}
                level={level ? level + 1 : undefined}
                blockRef={blockRef}
                parentBlockLength={componentChildren.length}
                blockPosition={componentChildren.indexOf(child)}
              />
            )
          })}
          {children}
        </Tag>
      )
    }

    return blocksRender(block)
  }
)

BlocksRender.displayName = "BlocksRender"
export default BlocksRender
