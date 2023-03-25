import React, { FunctionComponent, ReactElement } from "react"
import dynamic from "next/dynamic"

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
  // Simulate the API response
  const apiResponse = {
    header: {
      id: "123",
      tag: "header",
      className: "w-full",
      children: [
        {
          id: "1234",
          tag: "section",
          className: "w-full py-4 bg-black",
          children: [
            {
              id: "12345",
              tag: "div",
              className:
                "w-full max-w-6xl mx-auto flex flex-row justify-between",
              children: [
                {
                  id: "123456",
                  tag: "div",
                  className: "flex flex-col w-full",
                  children: [
                    {
                      id: "1234567",
                      tag: "h1",
                      className: "flex flex-col w-full text-2xl text-white",
                      content: "Viralike",
                    },
                  ],
                },
                {
                  id: "1234567",
                  tag: "div",
                  className: "flex flex-row w-full justify-end gap-2",
                  componentName: "BlockSocial",
                  props: {
                    items: [
                      {
                        id: "1",
                        name: "Facebook",
                        icon: "Facebook",
                        type: "a",
                        className:
                          "inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white",
                        props: {
                          href: "https://facebook.com",
                          target: "_blank",
                          rel: "noopener noreferrer",
                        },
                      },
                      {
                        id: "2",
                        name: "Twitter",
                        icon: "Twitter",
                        type: "a",
                        className:
                          "inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-400 text-white",
                        props: {
                          href: "https://twitter.com",
                          target: "_blank",
                          rel: "noopener noreferrer",
                        },
                      },
                      {
                        id: "3",
                        name: "Youtube",
                        icon: "Youtube",
                        type: "a",
                        className:
                          "inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-600 text-white",
                        props: {
                          href: "https://youtube.com",
                          target: "_blank",
                          rel: "noopener noreferrer",
                        },
                      },
                      {
                        id: "4",
                        name: "Instagram",
                        icon: "Instagram",
                        type: "a",
                        className:
                          "inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white",
                        props: {
                          href: "https://instagram.com",
                          target: "_blank",
                          rel: "noopener noreferrer",
                        },
                      },
                    ],
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    body: {
      id: "345",
      tag: "main",
      className: "w-full",
      children: [
        {
          id: "3456",
          tag: "section",
          className: "w-full",
          style: { backgroundColor: "#f0f0f0", minHeight: "100vh" },
          children: [
            {
              id: "34567",
              tag: "div",
              className: "w-full max-w-6xl mx-auto flex flex-row",
              children: [
                {
                  id: "345678",
                  tag: "div",
                  className: "flex flex-col w-8/12",
                  children: [
                    {
                      id: "3456789",
                      tag: "div",
                      className: "flex flex-col w-full",
                      style: { backgroundColor: "#ffffff", minHeight: "300px" },
                      componentName: "BlockHeading",
                      props: {
                        title: "My Block Heading",
                        subtitle: "A sample subtitle",
                        titleClassName: "text-4xl",
                        subtitleClassName: "text-2xl",
                      },
                    },
                    {
                      id: "34567890",
                      tag: "div",
                      className:
                        "grid gap-12 my-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2",
                      componentName: "BlockPosts",
                      props: {
                        posts: "regularPosts",
                      },
                    },
                    {
                      id: "345678901",
                      tag: "div",
                      className: "flex flex-col w-full",
                      style: { backgroundColor: "#ffffff", minHeight: "300px" },
                      componentName: "BlockLogo",
                      props: {
                        src: "/logo.svg",
                        alt: "logo",
                      },
                    },
                    {
                      id: "3456789012",
                      tag: "div",
                      className: "flex flex-col w-full",
                      style: { backgroundColor: "#ffffff", minHeight: "300px" },
                      content: "Main Content",
                    },
                  ],
                },
                {
                  id: "34567890123",
                  tag: "div",
                  className: "flex flex-col w-4/12",
                  style: { backgroundColor: "#e6e6e6", minHeight: "300px" },
                  content: "Sidebar",
                },
              ],
            },
          ],
        },
      ],
    },
    footer: {},
  }

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
