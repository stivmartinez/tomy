"use client"

/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils"
import styles from "./BlockSingle.module.css"

export default function BlockSingle({ posts }: any) {
  const post = posts?.[0] || null

  console.log("post", post)

  return (
    <article className={cn`w-full`}>
      <h1 className="my-12 mx-auto max-w-2xl text-center text-4xl font-semibold leading-tight tracking-tight">
        {post?.title?.rendered}
      </h1>
      <div className={cn`w-full relatives mb-12`}>
        <img
          className={cn`w-full h-[440px] object-cover rounded-xl`}
          src={post?.media?.source_url || "https://via.placeholder.com/300"}
          alt="A photo of a person"
        />
      </div>
      <div className={styles.content}>
        {post?.content?.rendered && (
          <div dangerouslySetInnerHTML={{ __html: post?.content?.rendered }} />
        )}
      </div>
    </article>
  )
}
