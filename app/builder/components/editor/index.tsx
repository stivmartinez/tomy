"use client"

import React, { FC, useRef } from "react"
import BlocksRender from "@/app/blocks-render"

import { useBuilderContext } from "../../context"
import BuilderBlockOptions from "./options"

const BuilderBlockEditor: FC<any> = ({
  block,
  blockRef,
  blockPosition,
  parentBlockLength,
  level = 0,
}) => {
  const defaultRef = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const currentBlockRef = blockRef || defaultRef
  const { selectedBlockId, showShadow, handleSelect } = useBuilderContext()

  const shadow =
    selectedBlockId === block.id
      ? "inset 0 0 0 2px red"
      : showShadow
      ? "inset 0 0 0 1px aqua"
      : "inset 0 0 0 1px transparent"

  return (
    <BlocksRender
      block={block}
      level={level}
      styles={{ boxShadow: shadow }}
      handleSelect={handleSelect}
      blockRef={currentBlockRef}
    >
      {selectedBlockId === block.id && (
        <BuilderBlockOptions
          block={block}
          blockPosition={blockPosition}
          parentBlockLength={parentBlockLength}
        />
      )}
    </BlocksRender>
  )
}

export default React.memo(BuilderBlockEditor)
