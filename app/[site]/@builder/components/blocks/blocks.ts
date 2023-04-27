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
