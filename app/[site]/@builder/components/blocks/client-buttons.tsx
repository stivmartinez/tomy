import React from "react"
import BlocksDesign from "@/app/[site]/@builder/components/blocks/options/blocks-design"
import { ArrowDown, ArrowUp, Copy, Edit, Paintbrush, Trash } from "lucide-react"

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
  handleTextUpdate,
}: any) => {
  const extractDefaultValues = (classNames: string) => {
    const classesArray = classNames.split(" ")
    const defaultValues: { [key: string]: string } = {}

    classesArray.forEach((className) => {
      if (className.startsWith("bg-"))
        defaultValues["bg"] = className.substring(3)
      else if (
        className.startsWith("text-") &&
        !className.startsWith("textSize-")
      )
        defaultValues["text"] = className.substring(5)
      else if (className.startsWith("h-"))
        defaultValues["h"] = className.substring(2)
      else if (className.startsWith("w-"))
        defaultValues["w"] = className.substring(2)
      else if (className.startsWith("textSize-"))
        defaultValues["textSize"] = className.substring(9)
      else if (
        className.startsWith("block") ||
        className.startsWith("inline-block")
      )
        defaultValues["display"] = className
      else if (
        className.startsWith("text-left") ||
        className.startsWith("text-center") ||
        className.startsWith("text-right")
      )
        defaultValues["textAlign"] = className
    })

    return defaultValues
  }

  return (
    <div
      className="fixed right-0 top-0 flex w-fit flex-row items-center gap-1 rounded-bl-xl bg-slate-900 p-2"
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
        onClick={(e) => {
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
        onClick={(e) => {
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
        <Button className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 p-0 text-white focus:ring-0 data-[state=open]:bg-blue-700">
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
      {["paragraph", "heading", "list", "listItem"].includes(template.type) && (
        <Button
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-500 p-0 text-white focus:ring-0 data-[state=open]:bg-slate-700"
          onClick={(event) => {
            event.stopPropagation()
            handleTextUpdate()
          }}
        >
          <Edit size="12" />
        </Button>
      )}
    </div>
  )
}

export default ClientButtons
