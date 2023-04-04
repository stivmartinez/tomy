import dynamic from "next/dynamic"
import React, { FunctionComponent, ReactElement } from "react"

import componentsMap from "./componentsMap"

const BlocksRender: FunctionComponent<any> = ({ template, data }) => {
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
      componentType,
    } = component
    const Tag = tag as keyof JSX.IntrinsicElements

    const isClientComponent =
      componentType === "client-side" ||
      typeof componentsMap[componentName as string] !== "string"

    const CustomComponent =
      componentName && componentsMap[componentName]
        ? isClientComponent
          ? componentsMap[componentName]
          : dynamic(() => import(`${componentsMap[componentName]}`))
        : null

    const updatedProps =
      props?.posts && data?.wordpress?.posts?.[props.posts]
        ? { ...props, posts: data.wordpress.posts[props.posts] }
        : props

    return (
      <Tag key={id} className={className} style={style}>
        {CustomComponent ? <CustomComponent {...updatedProps} /> : content}
        {children?.map((child) => blocksRender(child))}
      </Tag>
    )
  }

  return blocksRender(template)
}

export default BlocksRender
