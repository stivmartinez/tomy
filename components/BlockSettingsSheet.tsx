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
        <Button variant="outline">
          <Settings />
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
