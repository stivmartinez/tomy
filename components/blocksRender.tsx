import React, { ReactElement } from "react"
import dynamic from "next/dynamic"

import { cn } from "@/lib/utils"
import ClientBlocksRender from "./ClientBlocksRender"
import componentsMap from "./componentsMap"

interface BlocksRenderProps {
  template: any
  data?: any
  setStructure: (structure: any[]) => void
  addChild: (parentId: string) => void
  level: number
}

interface Child {
  id: string
  tag: string
  className: string
  children: Child[]
}

const BlocksRender: React.FC<BlocksRenderProps> = ({
  template,
  setStructure,
  addChild,
  level,
}) => {
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
      <Tag key={id} className={cn(className)} style={style}>
        {CustomComponent ? <CustomComponent {...updatedProps} /> : content}
        {children?.map((child: Child) => (
          <ClientBlocksRender
            key={child.id}
            template={child}
            setStructure={setStructure}
            addChild={addChild}
            level={level + 1}
          />
        ))}
        <button onClick={() => addChild(template.id)}>+</button>
      </Tag>
    )
  }

  return blocksRender(template)
}

export default BlocksRender
