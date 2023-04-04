/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function BlockSingle({ posts }: any) {
  const post = posts?.[0] || null;

  return (
    <article className="w-full">
      <h1 className="mx-auto my-12 max-w-2xl text-center text-4xl font-semibold leading-tight tracking-tight">
        {post?.title?.rendered}
      </h1>
      <div className="relatives mb-12 w-full">
        <img
          className="h-[440px] w-full rounded-xl object-cover"
          src={post?.media?.source_url || "https://via.placeholder.com/300"}
          alt="A photo of a person"
        />
      </div>
      {post?.content?.rendered && (
        <div
          className="wordpress-single-content mx-auto max-w-2xl"
          dangerouslySetInnerHTML={{ __html: post?.content?.rendered }}
        />
      )}
    </article>
  );
}
