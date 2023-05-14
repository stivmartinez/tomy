import React from "react"
import BlocksDesign from "@/app/[site]/@builder/components/client-blocks-render/buttons/settings"
import {
  ChevronDown,
  ChevronUp,
  Copy,
  Edit,
  Paintbrush,
  Trash,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { clientBlocksButton } from "../styles"

type BlockProperty = {
  propertyName: string
  propertyPath: (string | number)[]
  promptMessage: string
  icon: React.ComponentType<{ size: string | number }>
}

type BlockPropertyMapping = {
  [key: string]: BlockProperty[]
}

interface ClientButtonsProps {
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
    promptMessage: string
  ) => void
}

const ClientButtons: React.FC<ClientButtonsProps> = ({
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
    anchorLink: [
      {
        propertyName: "href",
        propertyPath: ["props", "href"],
        promptMessage: "Please enter the new anchorLink URL:",
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
    const blockProperties =
      blockPropertyMapping[template.type as keyof BlockPropertyMapping]

    if (blockProperties) {
      return blockProperties.map((property: any) => (
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
      className="fixed bottom-0 left-0 mb-16 flex w-full justify-center"
      style={{ zIndex: 1 }}
    >
      <div className="flex w-fit flex-row justify-center rounded-lg bg-black p-2">
        {template.type && (
          <span className="flex flex-row items-center gap-2 px-2 text-sm font-normal text-white">
            {template.type}
            <span className="inline-flex rounded-full bg-white/10 px-2 py-1 text-xs">
              {template.id}
            </span>
          </span>
        )}
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
        >
          <Button
            onClick={(event) => event.stopPropagation()}
            className={clientBlocksButton}
          >
            <Paintbrush size="12" />
          </Button>
        </BlocksDesign>
        <Button className={clientBlocksButton} onClick={handleClone}>
          <Copy size="12" />
        </Button>
        <Button className={clientBlocksButton} onClick={handleRemove}>
          <Trash size="12" />
        </Button>
        {renderPropertyButtons()}
      </div>
    </div>
  )
}

export default ClientButtons
