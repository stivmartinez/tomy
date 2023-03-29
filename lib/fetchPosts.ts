const website = "https://www.saastoday.co";

interface Post {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: any[];
  categories: number[];
  tags: number[];
  _links: {
    [key: string]: any;
  };
  media: Media;
  category: Category;
}

interface Media {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  author: number;
  comment_status: string;
  ping_status: string;
  template: string;
  meta: any[];
  description: {
    rendered: string;
  };
  caption: {
    rendered: string;
  };
  alt_text: string;
  media_type: string;
  mime_type: string;
  media_details: {
    [key: string]: any;
  };
  post: number;
  source_url: string;
  _links: {
    [key: string]: any;
  };
}

interface Category {
  id: number;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
  meta: any[];
  _links: {
    [key: string]: any;
  };
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
      date: "",
      date_gmt: "",
      guid: {
        rendered: ""
      },
      modified: "",
      modified_gmt: "",
      slug: "",
      status: "",
      type: "",
      link: "",
      title: {
        rendered: ""
      },
      author: 0,
      comment_status: "",
      ping_status: "",
      template: "",
      meta: [],
      description: {
        rendered: ""
      },
      caption: {
        rendered: ""
      },
      alt_text: "",
      media_type: "",
      mime_type: "",
      media_details: {},
      post: 0,
      _links: {}
    };

    const defaultCategory: Category = {
      id: -1,
      name: "",
      link: "",
      slug: "",
      taxonomy: "",
      parent: 0,
      meta: [],
      _links: {}
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
  search,
  categories,
  tags,
  author,
  orderby,
  order,
  slug
}: {
  page?: number;
  perPage?: number;
  featured?: boolean;
  sticky?: boolean;
  search?: string;
  categories?: string;
  tags?: string;
  author?: string;
  orderby?: string;
  order?: string;
  slug?: string;
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

  if (search) {
    params["search"] = search;
  }

  if (categories) {
    params["categories"] = categories;
  }

  if (tags) {
    params["tags"] = tags;
  }

  if (author) {
    params["author"] = author;
  }

  if (orderby) {
    params["orderby"] = orderby;
  }

  if (order) {
    params["order"] = order;
  }

  if (slug) {
    params["slug"] = slug;
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
