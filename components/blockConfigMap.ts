// blockConfigMap.ts
type BlockConfig = {
  tag: string;
  className?: string;
  content?: string;
  componentName?: string;
  props?: any;
};

const blockConfigMap: Record<string, BlockConfig> = {
  row: {
    tag: "div",
    className:
      "w-full max-w-6xl mx-auto flex flex-row border-2 border-blue-500 min-h-16",
    content: "",
  },
  column: {
    tag: "div",
    className:
      "w-full max-w-6xl mx-auto flex flex-col border-2 border-orange-500 min-h-16",
    content: "",
  },
  heading: {
    tag: "h1",
    className: "text-4xl font-bold",
    content: "Example",
  },
  paragraph: {
    tag: "p",
    className: "text-base",
    content: "Example",
  },
  logo: {
    tag: "div",
    componentName: "BlockLogo",
    className: "w-[180px]",
    props: {
      src: "/logo.svg",
      alt: "logo",
      className: "w-full h-auto",
    },
  },
};

export default blockConfigMap;
