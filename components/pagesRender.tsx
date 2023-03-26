import React, { FunctionComponent, ReactElement } from "react"
import dynamic from "next/dynamic"

import { JSONComponent } from "@/types/JSONComponent"
import { PagesRenderProps } from "@/types/PagesRenderProps"
import componentsMap from "@/components/componentsMap"

const PagesRender: FunctionComponent<PagesRenderProps> = ({
  template,
  regularPosts,
}) => {
  const renderPagesRender = (component: JSONComponent): ReactElement => {
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

    // Check if props contain the "posts" key with a value of "regularPosts"
    const updatedProps =
      props?.posts === "regularPosts"
        ? { ...props, posts: regularPosts }
        : props

    return (
      <Tag key={id} className={className} style={style}>
        {CustomComponent ? <CustomComponent {...updatedProps} /> : content}
        {children?.map((child) => renderPagesRender(child))}
      </Tag>
    )
  }

  return (
    <>
      {renderPagesRender(template?.header)}
      {renderPagesRender(template?.body)}
      {renderPagesRender(template?.footer)}
    </>
  )
}

export default PagesRender
