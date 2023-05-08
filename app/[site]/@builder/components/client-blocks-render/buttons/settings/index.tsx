"use client"

import React, { ReactNode, useState } from "react"

import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface BlocksDesignProps {
  classNames: string[]
  handleClassNameChange: any
  children: ReactNode
}

const BlocksDesign: React.FC<BlocksDesignProps> = ({
  handleClassNameChange,
  classNames,
  children,
}) => {
  const [sheetOpacity, setSheetOpacity] = useState(1)

  const handleMouseOut = () => {
    setSheetOpacity(0.5)
  }

  const handleMouseOver = () => {
    setSheetOpacity(1)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        className="m-2 mt-16 h-fit max-h-[60vh] w-full max-w-[360px] overflow-y-auto rounded-xl border"
        position="right"
        size="sm"
        onClick={(e) => e.stopPropagation()}
        onMouseOut={handleMouseOut}
        onMouseOver={handleMouseOver}
        style={{
          zIndex: 9999,
          opacity: sheetOpacity,
        }}
      >
        <Input
          id="classNames"
          defaultValue={classNames}
          onChange={(e) => handleClassNameChange(e.target.value)}
          autoComplete="off"
        />
      </SheetContent>
    </Sheet>
  )
}

export default BlocksDesign
