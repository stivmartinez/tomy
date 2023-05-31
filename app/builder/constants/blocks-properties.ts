import { EditIcon } from "lucide-react";

export const blocksProperties: any = {
  container: [
    {
      propertyName: "className",
      propertyPath: [],
      label: "Container class:",
      icon: EditIcon,
    },
  ],
  heading: [
    {
      propertyName: "content",
      propertyPath: [],
      label: "Heading:",
      icon: EditIcon,
    },
    {
      propertyName: "className",
      propertyPath: [],
      label: "Container class:",
      icon: EditIcon,
    },
  ],
  paragraph: [
    {
      propertyName: "content",
      propertyPath: [],
      label: "Paragraph:",
      icon: EditIcon,
    },
    {
      propertyName: "className",
      propertyPath: [],
      label: "Container class:",
      icon: EditIcon,
    },
  ],
  link: [
    {
      propertyName: "content",
      propertyPath: [],
      label: "Link text:",
      icon: EditIcon,
    },
    {
      propertyName: "href",
      propertyPath: ["props", "href"],
      label: "Link URL:",
      icon: EditIcon,
    },
    {
      propertyName: "className",
      propertyPath: [],
      label: "Container class:",
      icon: EditIcon,
    },
  ],
  anchorLink: [
    {
      propertyName: "href",
      propertyPath: ["props", "href"],
      label: "anchorLink URL:",
      icon: EditIcon,
    },
    {
      propertyName: "className",
      propertyPath: [],
      label: "Container class:",
      icon: EditIcon,
    },
  ],
  image: [
    {
      propertyName: "src",
      propertyPath: ["props", "src"],
      label: "Image URL:",
      icon: EditIcon,
    },
    {
      propertyName: "alt",
      propertyPath: ["props", "alt"],
      label: "Alt text:",
      icon: EditIcon,
    },
    {
      propertyName: "className",
      propertyPath: [],
      label: "Container class:",
      icon: EditIcon,
    },
  ],
  text: [
    {
      propertyName: "content",
      propertyPath: [],
      label: "New text:",
      icon: EditIcon,
    },
    {
      propertyName: "className",
      propertyPath: [],
      label: "Container class:",
      icon: EditIcon,
    },
  ],
  button: [
    {
      propertyName: "content",
      propertyPath: [],
      label: "New button text:",
      icon: EditIcon,
    },
    {
      propertyName: "href",
      propertyPath: ["props", "href"],
      label: "Button URL:",
      icon: EditIcon,
    },
    {
      propertyName: "className",
      propertyPath: [],
      label: "Container class:",
      icon: EditIcon,
    },
  ],
}
