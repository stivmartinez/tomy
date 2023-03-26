import { Post } from "./Post";

export interface PagesRenderProps {
  template?: any;
  regularPosts?: Post[];
  featuredPosts?: Post[];
  stickyPosts?: Post[];
}
