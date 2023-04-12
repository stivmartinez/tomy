import React, { ReactElement, useState } from "react"
import dynamic from "next/dynamic"

import { cn } from "@/lib/utils"
import ClientBlocksRender from "./ClientBlocksRender"
import blockConfigMap from "./blockConfigMap"
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
        {isContainerElement(tag) && (
          <>
            <button onClick={() => setShowDropdown(!showDropdown)}>
              {showDropdown ? "-" : "+"}
            </button>
            {showDropdown && (
              <div className="absolute left-1 top-0">
                {Object.keys(blockConfigMap).map((componentName) => {
                  const Icon = blockConfigMap[componentName].icon
                  return (
                    <button
                      key={componentName}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white"
                      onClick={() => addBlock(template.id, componentName)}
                    >
                      <Icon size="14" />
                    </button>
                  )
                })}
              </div>
            )}
          </>
        )}
      </Tag>
    )
  }

  return blocksRender(template)
}

export default BlocksRender
