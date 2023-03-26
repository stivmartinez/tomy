import { Media } from "./Media";
import { Category } from "./Category";

export interface Post {
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
