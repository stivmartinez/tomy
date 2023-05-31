import { Heading, Type, Image, CircleEllipsis, Columns, ExternalLink, Link } from "lucide-react";


const blocksList: Record<string, any> = {
  columns: {
    type: "columns",
    tag: "div",
    className:
      "flex w-full min-h-20",
    content: "",
    icon: Columns
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
    props: {
      src: "#",
    },
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

export default blocksList;
