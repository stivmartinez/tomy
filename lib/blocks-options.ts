import { EditIcon } from "lucide-react";

export type BlockProperty = {
  propertyName: string
  propertyPath: (string | number)[]
  promptMessage: string
  icon: React.ComponentType<{ size: string | number }>
}

export type BlockPropertyMapping = {
  [key: string]: BlockProperty[]
}

export const blockPropertyMapping: BlockPropertyMapping = {
  heading: [
    {
      propertyName: "content",
      propertyPath: [],
      promptMessage: "Heading:",
      icon: EditIcon,
    },
  ],
  paragraph: [
    {
      propertyName: "content",
      propertyPath: [],
      promptMessage: "Paragraph:",
      icon: EditIcon,
    },
  ],
  link: [
    {
      propertyName: "content",
      propertyPath: [],
      promptMessage: "Link text:",
      icon: EditIcon,
    },
    {
      propertyName: "href",
      propertyPath: ["props", "href"],
      promptMessage: "Link URL:",
      icon: EditIcon,
    },
  ],
  anchorLink: [
    {
      propertyName: "href",
      propertyPath: ["props", "href"],
      promptMessage: "anchorLink URL:",
      icon: EditIcon,
    },
  ],
  image: [
    {
      propertyName: "src",
      propertyPath: ["props", "src"],
      promptMessage: "Image URL:",
      icon: EditIcon,
    },
    {
      propertyName: "alt",
      propertyPath: ["props", "alt"],
      promptMessage: "Alt text:",
      icon: EditIcon,
    },
  ],
  text: [
    {
      propertyName: "content",
      propertyPath: [],
      promptMessage: "New text:",
      icon: EditIcon,
    },
  ],
  button: [
    {
      propertyName: "content",
      propertyPath: [],
      promptMessage: "New button text:",
      icon: EditIcon,
    },
    {
      propertyName: "href",
      propertyPath: ["props", "href"],
      promptMessage: "Button URL:",
      icon: EditIcon,
    },
  ],
}
