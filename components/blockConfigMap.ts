import { Heading, Image, MoveHorizontal, MoveVertical, Square, Type } from "lucide-react";

// blockConfigMap.ts
type BlockConfig = {
  tag: string;
  className?: string;
  content?: string;
  componentName?: string;
  props?: any;
  icon?: any;
};

const blockConfigMap: Record<string, BlockConfig> = {
  container: {
    tag: "div",
    className:
      "w-full max-w-6xl mx-auto flex flex-col min-h-[24px]",
    content: "",
    icon: Square
  },
  heading: {
    tag: "h1",
    className: "text-4xl font-bold",
    content: "Example",
    icon: Heading
  },
  paragraph: {
    tag: "p",
    className: "text-base",
    content: "Example",
    icon: Type
  },
  image: {
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

export default blockConfigMap;
