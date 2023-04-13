"use client"

import React, { ReactNode } from "react"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface BlockSettingsSheetProps {
  blockId: string
  onClassNamesChange: (color: string) => void
  children: ReactNode
}

const BlockSettingsSheet: React.FC<BlockSettingsSheetProps> = ({
  blockId,
  onClassNamesChange,
  children,
}) => {
  const handleClassNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onClassNamesChange(event.target.value)
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
          <input className="border" onChange={handleClassNameChange} />
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default BlockSettingsSheet
