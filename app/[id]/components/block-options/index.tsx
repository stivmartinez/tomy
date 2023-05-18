import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronDown, ChevronUp, Copy, Edit, Settings, Trash, X } from "lucide-react"
import React from "react"

import { clientBlocksButton } from "../blocks-render/styles"

type BlockProperty = {
  propertyName: string
  propertyPath: (string | number)[]
  promptMessage: string
  icon: React.ComponentType<{ size: string | number }>
}

type BlockPropertyMapping = {
  [key: string]: BlockProperty[]
}

interface BlockOptionsProps {
  template: any
  index: number | undefined
  parentLength: number | undefined
  moveBlock: (blockId: string, newParentId: string | null) => void
  handleClone: (event: React.MouseEvent) => void
  handleRemove: (event: React.MouseEvent) => void
  handleClassNameChange: (value: any) => void
  classNames: string[]
  handlePropertyUpdate: (
    propertyName: string,
    propertyPath: string[],
    promptMessage: string,
    value?: any
  ) => void
}

const BlockOptions: React.FC<BlockOptionsProps> = ({
  template,
  index,
  parentLength,
  moveBlock,
  handleClone,
  handleRemove,
  handleClassNameChange,
  classNames,
  handlePropertyUpdate,
}: any) => {
  const blockPropertyMapping: BlockPropertyMapping = {
    heading: [
      {
        propertyName: "content",
        propertyPath: [],
        promptMessage: "Heading:",
        icon: Edit,
      },
    ],
    paragraph: [
      {
        propertyName: "content",
        propertyPath: [],
        promptMessage: "Paragraph:",
        icon: Edit,
      },
    ],
    link: [
      {
        propertyName: "content",
        propertyPath: [],
        promptMessage: "Link text:",
        icon: Edit,
      },
      {
        propertyName: "href",
        propertyPath: ["props", "href"],
        promptMessage: "Link URL:",
        icon: Edit,
      },
    ],
    anchorLink: [
      {
        propertyName: "href",
        propertyPath: ["props", "href"],
        promptMessage: "anchorLink URL:",
        icon: Edit,
      },
    ],
    image: [
      {
        propertyName: "src",
        propertyPath: ["props", "src"],
        promptMessage: "Image URL:",
        icon: Edit,
      },
      {
        propertyName: "alt",
        propertyPath: ["props", "alt"],
        promptMessage: "Alt text:",
        icon: Edit,
      },
    ],
    text: [
      {
        propertyName: "content",
        propertyPath: [],
        promptMessage: "New text:",
        icon: Edit,
      },
    ],
    button: [
      {
        propertyName: "content",
        propertyPath: [],
        promptMessage: "New button text:",
        icon: Edit,
      },
      {
        propertyName: "href",
        propertyPath: ["props", "href"],
        promptMessage: "Button URL:",
        icon: Edit,
      },
    ],
  }

  const renderPropertyButtons = () => {
    const blockProperties =
      blockPropertyMapping[template.type as keyof BlockPropertyMapping]

    if (blockProperties) {
      return blockProperties.map((property: any) => (
        <div className="flex flex-col items-start gap-2">
          <Label
            className="text-xs text-white/60"
            htmlFor={property.propertyName}
          >
            {property.promptMessage}
          </Label>
          <Input
            id={property.propertyName}
            key={property.propertyName}
            onChange={(event) => {
              event.stopPropagation()
              handlePropertyUpdate(
                property.propertyName,
                property.propertyPath,
                property.promptMessage,
                event.target.value
              )
            }}
            defaultValue={template[property.propertyName]}
            autoComplete="off"
            className="border-white/30 text-white focus:shadow-none focus:outline-none focus:ring-0 focus-visible:ring-0"
          />
        </div>
      ))
    }

    return null
  }

  return (
    <div
      className="fixed bottom-12 left-0 flex w-full flex-col justify-center"
      style={{ zIndex: 1 }}
    >
      <div className="z-10 flex h-12 w-full flex-row items-center justify-between gap-2 border-y border-white/10 bg-black px-4">
        <div className="mx-auto flex w-full flex-row items-center justify-between gap-4">
          {template.type && (
            <span className="flex flex-row items-center gap-2 text-sm font-normal text-white/60">
              {template.type}
              <span className="text-xs text-white/40">{template.id}</span>
            </span>
          )}
          {template.id !== "1" &&
            template.id !== "2" &&
            template.id !== "3" && (
              <>
                <div className="h-6 w-1 border-l border-white/10"></div>
                <Button
                  className={`${clientBlocksButton} ${
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
                  <ChevronUp size="16" />
                </Button>
                <Button
                  className={`${clientBlocksButton} ${
                    index === parentLength - 1
                      ? "cursor-not-allowed opacity-50"
                      : ""
                  }`}
                  onClick={(event) => {
                    event.stopPropagation()
                    if (index < parentLength - 1) {
                      moveBlock(template.id, "down")
                    }
                  }}
                  disabled={index === parentLength - 1}
                >
                  <ChevronDown size="16" />
                </Button>
                <Button className={clientBlocksButton} onClick={handleClone}>
                  <Copy size="16" />
                </Button>
                <Button className={clientBlocksButton} onClick={handleRemove}>
                  <Trash size="16" />
                </Button>
              </>
            )}
          <div className="flex justify-end">
            <Button className="h-6 w-6 rounded-none bg-black p-0 text-white/60">
              <X size="14" />
            </Button>
          </div>
        </div>
      </div>
      <div
        className="w-full border-b border-white/10 bg-black p-4 font-normal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto flex max-w-3xl flex-col gap-4">
          {renderPropertyButtons()}
          <div className="flex flex-col gap-2">
            <Input
              id="classNames"
              defaultValue={classNames}
              onChange={(e) => handleClassNameChange(e.target.value)}
              autoComplete="off"
              className="h-auto border-white/0 p-0 text-center text-xs text-white/30 focus:text-white focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlockOptions
