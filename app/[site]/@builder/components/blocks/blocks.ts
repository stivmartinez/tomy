import { List } from "lucide-react";
import { FileText, Heading, Image, Link2, Square, Type } from "lucide-react";

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
  button: {
    type: "button",
    tag: "button",
    componentName: "BlockButton",
    className: "bg-white text-slate-900",
    icon: Link2,
    props: {
      variant: "default",
      size: "default",
      children: "Button",
    },
  },
  list: {
    type: "list",
    tag: "ul",
    className: "list-disc list-inside",
    content: "",
    icon: List,
  },
  listItem: {
    type: "listItem",
    tag: "li",
    className: "",
    content: "List item",
    icon: FileText,
  },
  blockquote: {
    type: "blockquote",
    tag: "blockquote",
    className:
      "border-l-4 border-slate-600 px-4 py-2 text-slate-600 italic",
    content: "Quote",
    icon: Type,
  },
};

export default blocks;
