const website = "https://disenadorescolombianos.co";

interface Post {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  featured_media: number;
  categories: number[];
  media: Media;
  category: Category;
}

interface Media {
  id: number;
  source_url: string;
}

interface Category {
  id: number;
  name: string;
}

const fetchApi = async (
  endpoint: string,
  params: Record<string, string>
) => {
  const searchParams = new URLSearchParams(params);
  const res = await fetch(`${website}${endpoint}?${searchParams}`);
  return res.json();
};

async function getPosts(params: Record<string, string> = {}): Promise<Post[]> {
  return fetchApi("/wp-json/wp/v2/posts", params);
}

async function getMedia(posts: Post[]): Promise<Media[]> {
  const mediaIds = posts.map((post) => post.featured_media);
  return fetchApi("/wp-json/wp/v2/media", { include: mediaIds.join(",") });
}

async function getCategories(posts: Post[]): Promise<Category[]> {
  const categoryIds = posts.flatMap((post) => post.categories);
  return fetchApi("/wp-json/wp/v2/categories", {
    include: categoryIds.join(","),
  });
}

function concatenateMediaAndCategories(
  postList: Post[],
  media: Media[],
  categories: Category[]
): Post[] {
  return postList.map((post) => {
    const mediaItem = media.find((item) => item.id === post.featured_media);
    const categoryItem = categories.find(
      (item) => item.id === post.categories[0]
    );

    // Provide default values for media and category properties
    const defaultMedia: Media = {
      id: -1,
      source_url: "",
    };

    const defaultCategory: Category = {
      id: -1,
      name: "",
    };

    return {
      ...post,
      media: mediaItem || defaultMedia,
      category: categoryItem || defaultCategory,
    };
  });
}

function generatePostParams({
  page = 1,
  perPage = 9,
  featured,
  sticky,
}: {
  page?: number;
  perPage?: number;
  featured?: boolean;
  sticky?: boolean;
}): Record<string, string> {
  const params: Record<string, string> = {
    page: String(page),
    per_page: String(perPage),
  };

  if (featured) {
    params["filter[meta_key]"] = "featured";
    params["filter[meta_value]"] = "1";
  }

  if (sticky) {
    params["sticky"] = "true";
  }

  return params;
}

export {
  getPosts,
  getMedia,
  getCategories,
  concatenateMediaAndCategories,
  generatePostParams,
};
