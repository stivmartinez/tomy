/* eslint-disable @next/next/no-img-element */
import { Calendar } from "lucide-react"

import { cn } from "@/lib/utils"

/*
How to use this component:

RECENT:
{
  "id": "123456",
  "tag": "div",
  "className": "flex flex-wrap justify-between",
  "componentName": "BlockPosts",
  "props": {
    "posts": "recent"
  }
}

FEATURED EXAMPLE:
{
  "id": "789012",
  "tag": "div",
  "className": "flex flex-wrap justify-between",
  "componentName": "BlockPosts",
  "props": {
    "posts": "featured"
  }
}
*/

interface TypePost {
  excerpt: any
  slug?: string
  media?: {
    source_url: string
  }
  date: string
  category?: {
    slug: string
    name: string
  }
  title: {
    rendered: string
  }
}

interface BlockPostsProps {
  posts: TypePost[]
}

const BlockPosts = ({
  posts,
  variants,
}: {
  posts: TypePost[]
  variants: any
}) => {
  function truncateWithEllipsis(content: any, limit: any) {
    var words = content
      .replace(/<[^>]*>/g, "")
      ?.replace(/&hellip;/g, "")
      ?.replace(/\[|\]/g, "")
      ?.split(" ")
    if (words.length > limit) {
      words = words.slice(0, limit)
      content = words.join(" ") + "..."
    }
    return content
  }

  return (
    <>
      {posts.map((post, index) => (
        <article
          key={index}
          className={cn(
            "relative w-full items-center",
            variants.type === "list"
              ? "flex flex-row gap-6"
              : "flex flex-col gap-3"
          )}
        >
          {variants.image === "off" ? null : (
            <a
              href={post?.slug || "/"}
              className={cn(
                "mt-1 flex w-full flex-col gap-1",
                variants.type === "list" ? "w-4/12" : "w-full"
              )}
            >
              <div
                className={cn(
                  "relative w-full gap-6",
                  variants.imageHeight
                    ? `h-[${variants.imageHeight}]`
                    : variants.type === "list"
                    ? "h-full"
                    : "h-[200px]"
                )}
              >
                <img
                  className="h-full w-full rounded-lg object-cover"
                  src={
                    post.media?.source_url || "https://via.placeholder.com/300"
                  }
                  alt="A photo of a person"
                />
              </div>
            </a>
          )}
          {variants.caption === "off" ? null : (
            <div
              className={cn(
                "flex flex-col gap-1",
                variants.overlay
                  ? "absolute bottom-0 left-0 w-full p-8"
                  : variants.type === "list"
                  ? "w-8/12"
                  : "w-full"
              )}
            >
              <div className="flex flex-row items-center gap-2 text-gray-400">
                <Calendar size="14" />
                <p className="my-1 text-xs">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              {variants.category === "off" ? null : (
                <a
                  href={post.category?.slug || "/"}
                  className="text-xs font-bold text-blue-600"
                >
                  {post.category?.name}
                </a>
              )}
              <a href={post?.slug || "/"}>
                <h2
                  className={cn(
                    "text-lg font-bold leading-snug tracking-tight hover:underline"
                  )}
                >
                  {post.title.rendered}
                </h2>
                {variants.description === "off" ? null : (
                  <p className="mt-2 text-sm text-gray-400">
                    {truncateWithEllipsis(post.excerpt.rendered, 25)}
                  </p>
                )}
              </a>
            </div>
          )}
        </article>
      ))}
    </>
  )
}

export default BlockPosts
