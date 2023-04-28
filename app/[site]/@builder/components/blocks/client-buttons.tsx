import React from "react"
import BlocksDesign from "@/app/[site]/@builder/components/blocks/options/blocks-design"
import {
  ArrowDown,
  ArrowUp,
  Camera,
  Copy,
  Edit,
  Paintbrush,
  Trash,
} from "lucide-react"

import { Button } from "@/components/ui/button"

const ClientButtons: React.FC = ({
  template,
  index,
  parentLength,
  moveBlock,
  handleClone,
  handleRemove,
  handleClassNamesChange,
  classNames,
  handlePropertyUpdate,
}: any) => {
  const extractDefaultValues = (classNames: string) => {
    const classesArray = classNames.split(" ")
    const defaultValues: { [key: string]: string } = {}

    const rules = [
      {
        match: (className: string) => className.startsWith("bg-"),
        process: (className: string) => ({ bg: className.substring(3) }),
      },
      {
        match: (className: string) =>
          className.startsWith("text-") && !className.startsWith("textSize-"),
        process: (className: string) => ({ text: className.substring(5) }),
      },
      {
        match: (className: string) => className.startsWith("h-"),
        process: (className: string) => ({ h: className.substring(2) }),
      },
    ]

    classesArray.forEach((className) => {
      rules.forEach((rule) => {
        if (rule.match(className)) {
          const values = rule.process(className)
          Object.assign(defaultValues, values)
        }
      })
    })

    return defaultValues
  }

  const blockPropertyMapping = {
    heading: [
      {
        propertyName: "content",
        propertyPath: [],
        promptMessage: "Please enter the new heading text:",
        icon: Edit,
      },
    ],
    paragraph: [
      {
        propertyName: "content",
        propertyPath: [],
        promptMessage: "Please enter the new paragraph text:",
        icon: Edit,
      },
    ],
    link: [
      {
        propertyName: "content",
        propertyPath: [],
        promptMessage: "Please enter the new link text:",
        icon: Edit,
      },
      {
        propertyName: "href",
        propertyPath: ["props", "href"],
        promptMessage: "Please enter the new link URL:",
        icon: Edit,
      },
    ],
    image: [
      {
        propertyName: "src",
        propertyPath: ["props", "src"],
        promptMessage: "Please enter the new image URL:",
        icon: Edit,
      },
      {
        propertyName: "alt",
        propertyPath: ["props", "alt"],
        promptMessage: "Please enter the new alt text:",
        icon: Edit,
      },
    ],
    text: [
      {
        propertyName: "content",
        propertyPath: [],
        promptMessage: "Please enter the new text:",
        icon: Edit,
      },
    ],
    button: [
      {
        propertyName: "content",
        propertyPath: [],
        promptMessage: "Please enter the new button text:",
        icon: Edit,
      },
    ],
  }

  const renderPropertyButtons = () => {
    const blockProperties = blockPropertyMapping[template.type]

    if (blockProperties) {
      return blockProperties.map((property) => (
        <Button
          key={property.propertyName}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-500 p-0 text-white focus:ring-0 data-[state=open]:bg-slate-700"
          onClick={(event) => {
            event.stopPropagation()
            handlePropertyUpdate(
              property.propertyName,
              property.propertyPath,
              property.promptMessage
            )
          }}
        >
          <property.icon size="12" />
        </Button>
      ))
    }

    return null
  }

  return (
    <div
      className="fixed right-0 top-0 flex w-fit flex-row items-center gap-1 rounded-bl-xl bg-black p-2"
      style={{ zIndex: 1 }}
    >
      {template.type && (
        <span className="flex flex-row items-center gap-2 px-2 text-sm font-normal text-slate-300">
          {template.type}
          <span className="inline-flex rounded-full bg-slate-800 px-2 py-1 text-xs">
            {template.id}
          </span>
        </span>
      )}
      <Button
        className={`flex h-8 w-8 items-center justify-center rounded-lg bg-slate-500 p-0 text-white ${
          index === 0 ? "cursor-not-allowed opacity-50" : ""
        }`}
        onClick={(event) => {
          event.stopPropagation()
          if (index > 0) {
            moveBlock(template.id, "up")
          }
        }}
        disabled={index === 0}
      >
        <ArrowUp size="12" />
      </Button>
      <Button
        className={`flex h-8 w-8 items-center justify-center rounded-lg bg-slate-500 p-0 text-white ${
          index === parentLength - 1 ? "cursor-not-allowed opacity-50" : ""
        }`}
        onClick={(event) => {
          event.stopPropagation()
          if (index < parentLength - 1) {
            moveBlock(template.id, "down")
          }
        }}
        disabled={index === parentLength - 1}
      >
        <ArrowDown size="12" />
      </Button>
      <BlocksDesign
        onClassNamesChange={handleClassNamesChange}
        defaultValues={extractDefaultValues(classNames)}
      >
        <Button
          onClick={(event) => event.stopPropagation()}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 p-0 text-white focus:ring-0 data-[state=open]:bg-blue-700"
        >
          <Paintbrush size="12" />
        </Button>
      </BlocksDesign>
      <Button
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime-500 p-0 text-white focus:ring-0 data-[state=open]:bg-lime-700"
        onClick={handleClone}
      >
        <Copy size="12" />
      </Button>
      <Button
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500 p-0 text-white focus:ring-0 data-[state=open]:bg-red-700"
        onClick={handleRemove}
      >
        <Trash size="12" />
      </Button>
      {renderPropertyButtons()}
    </div>
  )
}

export default ClientButtons
