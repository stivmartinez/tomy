import { Heading, Image, Square, Type } from "lucide-react";

type BlockConfig = {
  tag: string;
  className?: string;
  content?: string;
  componentName?: string;
  props?: any;
  icon?: any;
  type?: string;
};

const blocks: Record<string, BlockConfig> = {
  container: {
    type: "container",
    tag: "div",
    className:
      "w-full max-w-6xl mx-auto flex flex-col min-h-[24px]",
    content: "",
    icon: Square
  },
  heading: {
    type: "heading",
    tag: "h1",
    className: "text-4xl font-bold",
    content: "Example",
    icon: Heading
  },
  paragraph: {
    type: "paragraph",
    tag: "p",
    className: "text-base",
    content: "Example",
    icon: Type
  },
  image: {
    type: "image",
    tag: "span",
    componentName: "BlockImage",
    className: "w-[180px]",
    icon: Image,
    props: {
      src: "/logo.svg",
      alt: "logo",
      className: "w-full h-auto",
    },
  },
};

export default blocks;
