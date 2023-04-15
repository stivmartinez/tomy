"use client"

import React, { ReactNode } from "react"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface BlockSettingsSheetProps {
  blockId: string
  onClassNamesChange: (newStyles: { [key: string]: string }) => void
  onStylesChange: (newStyles: { [key: string]: string | number }) => void
  children: ReactNode
}

const BlockSettingsSheet: React.FC<BlockSettingsSheetProps> = ({
  blockId,
  onClassNamesChange,
  onStylesChange,
  children,
}) => {
  const handleClassNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    prefix: string = "",
    suffix: string = "",
    useBrackets: boolean = false
  ) => {
    const value = useBrackets
      ? `[${event.target.value}${suffix}]`
      : `${event.target.value}${suffix}`
    if (prefix) {
      onClassNamesChange({ [prefix]: value })
    } else {
      onClassNamesChange({ [value]: "" });
    }
  }

  const handleStyleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    styleProp: string
  ) => {
    onStylesChange({ [styleProp]: event.target.value + "px" })
  }

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation()
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent position="right" size="sm" onClick={handleClick}>
        <h3>Settings for block {blockId}</h3>
        <div>
          <input
            className="border"
            onChange={(event) => handleClassNameChange(event)}
          />
          <input
            type="range"
            min="0"
            max="1000"
            className="slider"
            onChange={(event) => handleClassNameChange(event, "h", "px", true)}
          />
          <input
            type="range"
            min="0"
            max="1000"
            className="slider"
            onChange={(event) =>
              handleClassNameChange(event, "max-w", "px", true)
            }
          />
          <input
            type="range"
            min="0"
            max="1000"
            className="slider"
            onChange={(event) => handleStyleChange(event, "height")}
          />
          <input
            type="range"
            min="0"
            max="1000"
            className="slider"
            onChange={(event) => handleStyleChange(event, "width")}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default BlockSettingsSheet
