import React, { ReactElement, useState } from "react"
import dynamic from "next/dynamic"

import { cn } from "@/lib/utils"
import ClientBlocksRender from "./ClientBlocksRender"
import componentsMap from "./componentsMap"

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
  addBlock: (parentId: string, type: string) => void // Add this line
}

const BlocksRender: React.FC<BlocksRenderProps> = ({
  template,
  setStructure,
  addChild,
  level,
  addBlock, // Add this line
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

    const isClientComponent =
      typeof componentsMap[componentName as string] !== "string"

    const CustomComponent =
      componentName && componentsMap[componentName]
        ? isClientComponent
          ? componentsMap[componentName]
          : dynamic(() => import(`${componentsMap[componentName]}`))
        : null

    const updatedProps = props

    return (
      <Tag key={id} className={cn(className, "relative")} style={style}>
        {CustomComponent ? <CustomComponent {...updatedProps} /> : content}
        {children?.map((child: Child) => (
          <ClientBlocksRender
            key={child.id}
            template={child}
            setStructure={setStructure}
            addChild={addChild}
            level={level + 1}
            addBlock={addBlock} // Replace addColumnBlock and addRowBlock with addBlock
          />
        ))}
        <button onClick={() => setShowDropdown(!showDropdown)}>
          {showDropdown ? "-" : "+"}
        </button>
        {showDropdown && (
          <div className="absolute left-1 top-0">
            <button
              className="inline-flex bg-slate-200 py-2"
              onClick={() => addBlock(template.id, "row")}
            >
              Add Row
            </button>
            <button
              className="inline-flex bg-slate-200 py-2"
              onClick={() => addBlock(template.id, "column")}
            >
              Add Column
            </button>
            <button
              className="inline-flex bg-slate-200 py-2"
              onClick={() => addBlock(template.id, "heading")}
            >
              Add Heading
            </button>
            <button
              className="inline-flex bg-slate-200 py-2"
              onClick={() => addBlock(template.id, "paragraph")}
            >
              Add Paragraph
            </button>
            <button
              className="inline-flex bg-slate-200 py-2"
              onClick={() => addBlock(template.id, "logo")}
            >
              Add logo
            </button>
          </div>
        )}
      </Tag>
    )
  }

  return blocksRender(template)
}

export default BlocksRender
