import React, { useState } from "react"
import BlocksDesign from "@/app/[id]/components/block-options/settings"
import {
  ChevronDown,
  ChevronUp,
  Copy,
  Edit,
  Paintbrush,
  Settings,
  Trash,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
    ],
  }

  const renderPropertyButtons = () => {
    const blockProperties =
      blockPropertyMapping[template.type as keyof BlockPropertyMapping]

    if (blockProperties) {
      return blockProperties.map((property: any) => (
        <div className="flex flex-col gap-2">
          <Label className="text-xs text-white" htmlFor={property.propertyName}>
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
      className="fixed bottom-6 left-0 flex w-full justify-center"
      style={{ zIndex: 1 }}
    >
      <div className="z-10 flex w-fit flex-row items-center justify-center gap-2 rounded-xl border border-white/20 bg-black px-4 py-2">
        {template.type && (
          <span className="flex flex-row items-center gap-2 px-2 text-sm font-normal text-white">
            {template.type}
            <span className="inline-flex rounded-full bg-white/10 px-2 py-1 text-xs">
              {template.id}
            </span>
          </span>
        )}
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
          <ChevronDown size="16" />
        </Button>

        <BlocksDesign
          handleClassNameChange={handleClassNameChange}
          classNames={classNames}
          renderPropertyButtons={renderPropertyButtons}
        >
          <Button
            onClick={(event) => event.stopPropagation()}
            className={clientBlocksButton}
          >
            <Settings size="16" />
          </Button>
        </BlocksDesign>
        {index !== 0 && (
          <Button className={clientBlocksButton} onClick={handleClone}>
            <Copy size="16" />
          </Button>
        )}
        <Button className={clientBlocksButton} onClick={handleRemove}>
          <Trash size="16" />
        </Button>
      </div>
    </div>
  )
}

export default BlockOptions
