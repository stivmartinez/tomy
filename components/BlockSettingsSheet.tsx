"use client"

import React, { ReactNode } from "react"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface BlockSettingsSheetProps {
  blockId: string
  onClassNamesChange: (newStyles: { [key: string]: string }) => void
  children: ReactNode
}

const BlockSettingsSheet: React.FC<BlockSettingsSheetProps> = ({
  blockId,
  onClassNamesChange,
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
    onClassNamesChange({ [prefix]: value })
  }

  // Add handleClick function
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
            onChange={(event) => handleClassNameChange(event, "custom")}
          />
          <input
            type="range"
            min="0"
            max="1000"
            className="slider"
            onChange={(event) =>
              handleClassNameChange(event, "h", "px", true)
            }
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
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default BlockSettingsSheet
