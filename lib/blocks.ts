import { Image, List, Plus } from "lucide-react";
import { FileText, Heading, Square, Type } from "lucide-react";

type BlockConfig = {
  tag: string;
  className?: string;
  content?: string;
  componentName?: string;
  props?: any;
  icon?: any;
  type?: string;
  onClick?: (event: React.MouseEvent) => void;
  selfClosing?: boolean;
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
  button: {
    type: "button",
    tag: "button",
    className: "bg-blue-500 text-white px-4 py-2 rounded",
    content: "Click me",
    icon: Plus,
    onClick: (event: React.MouseEvent) => {
      event.stopPropagation();
    },
  },
  image: {
    type: "image",
    tag: "img",
    className: "ignore-click w-fit",
    content: "",
    componentName: "Image",
    props: {
      src: "https://via.placeholder.com/150",
      alt: "Example image",
    },
    icon: Image,
    selfClosing: true,
    onClick: (event: React.MouseEvent) => {
      event.stopPropagation();
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
