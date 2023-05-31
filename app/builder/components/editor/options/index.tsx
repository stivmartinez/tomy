import React from "react"
import { blocksProperties } from "@/app/builder/constants/blocks-properties"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import { ChevronDown, ChevronUp, Copy, Trash, X } from "lucide-react"

import { useBuilderContext } from "../../../context"
import { clientBlocksButton } from "../styles"

const BuilderBlockOptions: React.FC<any> = ({
  block,
  blockPosition,
  parentBlockLength,
}: any) => {
  const { moveBlock, handlePropertyUpdate } = useBuilderContext()

  const renderPropertyButtons = () => {
    const blockProperties = blocksProperties[block.type as keyof any]

    if (blockProperties) {
      return blockProperties.map((property: any) => (
        <div className="flex flex-col items-start gap-2">
          <Label
            className="text-xs text-white/60"
            htmlFor={property.propertyName}
          >
            {property.label}
          </Label>
          <Input
            id={property.propertyName}
            key={property.propertyName}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.stopPropagation()
                handlePropertyUpdate(
                  block.id,
                  property.propertyName,
                  property.propertyPath,
                  (e.target as HTMLInputElement).value
                )
              }
            }}
            defaultValue={block[property.propertyName]}
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
          {block.type && (
            <span className="flex flex-row items-center gap-2 text-sm font-normal text-white/60">
              {block.type}
              <span className="text-xs text-white/40">{block.id}</span>
            </span>
          )}
          <div className="h-6 w-1 border-l border-white/10"></div>
          <Button
            className={`${clientBlocksButton} ${
              blockPosition === 0 ? "cursor-not-allowed opacity-50" : ""
            }`}
            onClick={(event) => {
              event.stopPropagation()
              if (blockPosition > 0) {
                moveBlock(block.id, "up")
              }
            }}
            disabled={blockPosition === 0}
          >
            <ChevronUp size="16" />
          </Button>
          <Button
            className={`${clientBlocksButton} ${
              blockPosition === parentBlockLength - 1
                ? "cursor-not-allowed opacity-50"
                : ""
            }`}
            onClick={(event) => {
              event.stopPropagation()
              if (blockPosition < parentBlockLength - 1) {
                moveBlock(block.id, "down")
              }
            }}
            disabled={blockPosition === parentBlockLength - 1}
          >
            <ChevronDown size="16" />
          </Button>
          <Button className={clientBlocksButton}>
            <Copy size="16" />
          </Button>
          <Button className={clientBlocksButton}>
            <Trash size="16" />
          </Button>

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
        </div>
      </div>
    </div>
  )
}

export default BuilderBlockOptions
