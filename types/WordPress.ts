interface Post {
  id: number;
  date: string;
  date_gmt: string;
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
  };
  excerpt: {
    rendered: string;
  };
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  template: string;
  categories: number[];
  tags: number[];
  _embedded: {
    author: {
      name: string;
      avatar_urls: {
        [size: string]: string;
      };
    }[];
    'wp:featuredmedia': {
      media_details: {
        sizes: {
          [size: string]: {
            source_url: string;
          };
        };
      };
    }[];
    'wp:term': {
      id: number;
      name: string;
      slug: string;
      taxonomy: string;
      _links: {
        self: {
          href: string;
        };
        collection: {
          href: string;
        };
      };
    }[][];
  };
}

interface Page {
  id: number;
  date: string;
  date_gmt: string;
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
  };
  excerpt: {
    rendered: string;
  };
  author: number;
  featured_media: number;
  parent: number;
  menu_order: number;
  comment_status: string;
  ping_status: string;
  template: string;
  _embedded: {
    author: {
      name: string;
      avatar_urls: {
        [size: string]: string;
      };
    }[];
    'wp:featuredmedia': {
      media_details: {
        sizes: {
          [size: string]: {
            source_url: string;
          };
        };
      };
    }[];
    'wp:term': {
      id: number;
      name: string;
      slug: string;
      taxonomy: string;
      _links: {
        self: {
          href: string;
        };
        collection: {
          href: string;
        };
      };
    }[][];
    'wp:parent': Page[];
    'wp:attachment': Attachment[];
  };
}

interface Attachment {
  id: number;
  date: string;
  date_gmt: string;
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
  media_type: string;
  mime_type: string;
  media_details: {
    width: number;
    height: number;
    file: string;
    sizes: {
      [size: string]: {
        file: string;
        width: number;
        height: number;
        mime_type: string;
        source_url: string;
      };
    };
  };
  source_url: string;
}

interface Category {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
  meta: {
    links: {
      self: string;
      collection: string;
      up: string;
    };
  };
}

interface Tag {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  meta: {
    links: {
      self: string;
      collection: string;
      up: string;
    };
  };
}

interface User {
  id: number;
  name: string;
  url: string;
  description: string;
  link: string;
  slug: string;
  avatar_urls: {
    [size: string]: string;
  };
  meta: {
    links: {
      self: string;
      collection: string;
    };
  };
}
