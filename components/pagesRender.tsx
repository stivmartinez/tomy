import React, { FunctionComponent, ReactElement } from "react"
import dynamic from "next/dynamic"

import { apiResponse } from "@/lib/apiResponse"
import componentsMap from "./componentsMap"

export type { Post }

interface JSONComponent {
  id: string
  tag: string
  className?: string
  children?: JSONComponent[]
  content?: string
  style?: React.CSSProperties
  componentName?: string
  props?: Record<string, any>
}

interface Media {
  id: number
  source_url: string
  // Add any other relevant properties for media
}

interface Category {
  id: number
  name: string
  // Add any other relevant properties for categories
}

interface Post {
  id: number
  slug: string
  title: {
    rendered: string
  }
  featured_media: number
  categories: number[]
  media: Media
  category: Category
}

interface PagesRenderProps {
  regularPosts: Post[]
  featuredPosts: Post[]
  stickyPosts: Post[]
}

const PagesRender: FunctionComponent<PagesRenderProps> = ({
  regularPosts,
  featuredPosts,
  stickyPosts,
}) => {
  const renderPagesRender = (
    component: JSONComponent,
    index: number
  ): ReactElement => {
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
      <Tag key={id || index} className={className} style={style}>
        {CustomComponent ? <CustomComponent {...updatedProps} /> : content}
        {children?.map((child, index) => renderPagesRender(child, index))}
      </Tag>
    )
  }

  return (
    <>
      {renderPagesRender(apiResponse.header, 0)}
      {renderPagesRender(apiResponse.body, 0)}
    </>
  )
}

export default PagesRender
