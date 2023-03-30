import {
  getCategories,
  getPosts,
  getMedia,
  concatenateMediaAndCategories,
} from "./fetchPosts";

import { extractPostParams } from "./extractPostParams";

export async function processApiResponse(
  response: any,
  slug?: string,
  pageType: "home" | "taxonomy" | "single" = "home"
): Promise<{
  body: any;
  data: Record<string, any>;
}> {
  let body: any
  let allPosts: any

  if (pageType === "single") {
    body = JSON.parse(
      JSON.stringify(response.body).replace(/\{post_slug\}/g, () => String(slug))
    );
    const singlePost = await getPosts({ slug: slug as string });
    const [media, categories] = await Promise.all([
      getMedia(singlePost),
      getCategories(singlePost),
    ]);
    const singlePostData = concatenateMediaAndCategories(
      singlePost,
      media,
      categories
    );
    allPosts = { single: singlePostData };
  } else {
    const allCategories = slug
      ? await getCategories(undefined, false, { slug })
      : [];
    const categoryId = allCategories[0]?.id;

    body = categoryId
      ? JSON.parse(
        JSON.stringify(response.body).replace(
          /\{categories_ids\}/g,
          () => String(categoryId)
        )
      )
      : response.body;

    const postParams = extractPostParams(body);

    const allPostsPromises = Object.entries(postParams).map(
      async ([postType, params]) => {
        const posts = await getPosts({ ...params, post_type: postType });
        return { postType, posts };
      }
    );

    const allPostsArray = await Promise.all(allPostsPromises);
    allPosts = allPostsArray.reduce((acc, { postType, posts }) => {
      acc[postType] = posts;
      return acc;
    }, {} as Record<string, Array<typeof allPostsCombined[0]>>);
  }

  const allPostsCombined = Object.values(allPosts).flat();
  const [media, categories] = await Promise.all([
    getMedia(allPostsCombined),
    getCategories(allPostsCombined),
  ]);

  const allPostsWithMediaAndCategories = Object.fromEntries(
    Object.entries(allPosts).map(([postType, posts]) => [
      postType,
      concatenateMediaAndCategories(posts, media, categories),
    ])
  );

  return {
    body,
    data: {
      wordpress: {
        posts: allPostsWithMediaAndCategories,
      },
    },
  };
}
