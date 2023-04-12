import { Heading, Image, MoveHorizontal, MoveVertical, Type } from "lucide-react";

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
  row: {
    tag: "div",
    className:
      "w-full max-w-6xl mx-auto flex flex-row border-2 border-blue-500 h-16",
    content: "",
    icon: MoveHorizontal
  },
  column: {
    tag: "div",
    className:
      "w-full max-w-6xl mx-auto flex flex-col border-2 border-orange-500 h-16",
    content: "",
    icon: MoveVertical
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
    tag: "div",
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
