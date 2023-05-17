"use client"

import React, { ReactNode, useState } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface BlocksDesignProps {
  classNames: string[]
  handleClassNameChange: any
  children: ReactNode
  renderPropertyButtons: any
}

const BlocksDesign: React.FC<BlocksDesignProps> = ({
  handleClassNameChange,
  classNames,
  children,
  renderPropertyButtons,
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        className="mb-24 h-auto bg-transparent px-4 py-0"
        position="bottom"
        size="sm"
        onClick={(e) => e.stopPropagation()}
        style={{ zIndex: -1 }}
      >
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 rounded-xl bg-black p-8 pt-6">
          {renderPropertyButtons()}
          <div className="flex flex-col gap-2">
            <Input
              id="classNames"
              defaultValue={classNames}
              onChange={(e) => handleClassNameChange(e.target.value)}
              autoComplete="off"
              className="h-auto border-white/0 p-0 text-right text-xs text-white/30 focus:text-white focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default BlocksDesign
