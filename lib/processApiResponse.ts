import { extractPostParams } from "./extractPostParams";
import { concatenateMediaAndCategories, getCategories, getMedia, getPosts } from "./fetchPosts";

export async function processApiResponse(
  response: any,
  slug?: string,
  pageType: "home" | "taxonomy" | "single" = "home",
  searchParams?: { [key: string]: string }
): Promise<{
  body: any;
  data: Record<string, any>;
}> {
  let body: any;
  let allPosts: any;

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

    // Update the `page` parameter in the `postParams` object with the value from `searchParams`
    if (searchParams && searchParams.page) {
      Object.values(postParams).forEach((params) => {
        params.page = Array.isArray(searchParams.page)
          ? parseInt(searchParams.page[0], 10)
          : parseInt(searchParams.page, 10);
      });
    }

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
