import { CircleEllipsis, ExternalLink, Link } from "lucide-react";
import { Image, List } from "lucide-react";
import { FileText, Heading, Square, Type } from "lucide-react";

type BlockConfig = {
  tag: string;
  className?: string;
  content?: string;
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
      "w-full flex flex-col min-h-[24px]",
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
    className: "text-md",
    content: "Example",
    icon: Type
  },
  button: {
    type: "button",
    tag: "button",
    className: "bg-blue-500 text-white px-4 py-2 rounded",
    content: "Click me",
    icon: CircleEllipsis,
    onClick: (event: React.MouseEvent) => {
      event.stopPropagation();
    },
  },
  image: {
    type: "image",
    tag: "img",
    className: "w-fit block",
    content: "",
    props: {
      src: "https://via.placeholder.com/150",
      alt: "Example image",
    },
    icon: Image,
    selfClosing: true,
  },
  link: {
    type: "link",
    tag: "a",
    className: "text-blue-500 hover:text-blue-700",
    content: "Example Link",
    props: {
      href: "#",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    icon: ExternalLink,
    onClick: (event: React.MouseEvent) => {
      event.stopPropagation();
    },
  },
  blockquote: {
    type: "blockquote",
    tag: "blockquote",
    className:
      "border-l-4 border-slate-600 px-4 py-2 text-slate-600 italic",
    content: "Quote",
    icon: Type,
  },
  anchorLink: {
    type: "anchorLink",
    tag: "a",
    className: "",
    content: "",
    props: {
      href: "#",
    },
    icon: Link,
    onClick: (event: React.MouseEvent) => {
      event.stopPropagation();
    },
  },
};

export default blocks;
