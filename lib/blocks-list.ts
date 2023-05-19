import { CircleEllipsis, Columns, ExternalLink, Link, Rows } from "lucide-react";
import { Image } from "lucide-react";
import { Heading, Type } from "lucide-react";

type BlockList = {
  tag: string;
  className?: string;
  content?: string;
  props?: any;
  icon?: any;
  type?: string;
  onClick?: (event: React.MouseEvent) => void;
  selfClosing?: boolean;
};

const blocks: Record<string, BlockList> = {
  columns: {
    type: "columns",
    tag: "div",
    className:
      "w-full flex flex-row min-h-[24px] gap-2",
    content: "",
    icon: Columns
  },
  rows: {
    type: "rows",
    tag: "div",
    className:
      "w-full flex flex-col min-h-[24px] gap-2",
    content: "",
    icon: Rows
  },
  heading: {
    type: "heading",
    tag: "h1",
    className: "text-4xl font-bold w-full",
    content: "Example",
    icon: Heading
  },
  paragraph: {
    type: "paragraph",
    tag: "p",
    className: "text-md w-full",
    content: "Example",
    icon: Type
  },
  button: {
    type: "button",
    tag: "button",
    className: "bg-blue-500 text-white px-4 py-2 rounded w-full",
    content: "Click me",
    icon: CircleEllipsis,
    onClick: (event: React.MouseEvent) => {
      event.stopPropagation();
    },
  },
  image: {
    type: "image",
    tag: "img",
    className: "w-full block",
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
    className: "text-blue-500 w-full",
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
