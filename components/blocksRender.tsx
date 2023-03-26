import componentsMap from "@/components/componentsMap"
import { JSONComponent } from "@/types/JSONComponent"
import dynamic from "next/dynamic"
import React, { FunctionComponent, ReactElement } from "react"

const BlocksRender: FunctionComponent<any> = ({ template, data }) => {
  const blocksRender = (component: JSONComponent): ReactElement => {
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
      componentName && componentsMap[componentName]
        ? dynamic(() => import(`${componentsMap[componentName]}`))
        : null

    // Check if props contain the "posts" key and update it with the corresponding data from the "data" prop
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
