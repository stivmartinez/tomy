"use client"

import React from "react"
import { Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface BlockSettingsSheetProps {
  blockId: string
  onClassNamesChange: (color: string) => void
}

const BlockSettingsSheet: React.FC<BlockSettingsSheetProps> = ({
  blockId,
  onClassNamesChange,
}) => {
  const handleClassNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onClassNamesChange(event.target.value)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="absolute left-0 top-0 h-6 w-6 p-0">
          <Settings size="14" />
        </Button>
      </SheetTrigger>
      <SheetContent position="right" size="sm">
        <div>
          <h3>Settings for block {blockId}</h3>
          <div>
            <input className="border" onChange={handleClassNameChange} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default BlockSettingsSheet
