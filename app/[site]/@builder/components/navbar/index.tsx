"use client"

import React from "react"
import { Layers, LogOut, Plus, Save, Settings, Square } from "lucide-react"

import blocks from "@/lib/blocks"
import { generateRandomId } from "@/lib/generateRandomId"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const BuilderPropsNavbar = ({
  structure,
  setStructure,
  selectedBlockId,
  setSelectedBlockId,
  addBlock,
  saveStructure,
  resetSavedStructure,
}: {
  structure: any[]
  setStructure: (callback: (structure: any[]) => any[]) => void
  selectedBlockId: string | null
  setSelectedBlockId: (
    callback: (blockId: string | null) => string | null
  ) => void
  addBlock: (parentId: string, componentName: string) => void
  saveStructure: any
  resetSavedStructure: any
}) => {
  const renderLayerItems = (blocks: any, level = 0) => {
    return blocks.map((block: any, index: number) => (
      <React.Fragment key={block.id}>
        {block.children && block.children.length > 0 ? (
          <>
            <DropdownMenuItem
              className={`font-semibold ${
                selectedBlockId === block.id ? "text-red-500" : ""
              }`}
              style={{ marginLeft: `${level * 8}px` }}
              onClick={() => setSelectedBlockId(block.id)}
            >
              {block.type}: {block.id}
            </DropdownMenuItem>
            {renderLayerItems(block.children, level + 1)}
          </>
        ) : (
          <DropdownMenuItem
            className={selectedBlockId === block.id ? "text-red-500" : ""}
            style={{ marginLeft: `${level * 8}px` }}
            onClick={() => setSelectedBlockId(block.id)}
          >
            {block.type}: {block.id}
          </DropdownMenuItem>
        )}
      </React.Fragment>
    ))
  }

  return (
    // eslint-disable-next-line tailwindcss/enforces-negative-arbitrary-values
    <nav className="fixed bottom-0 left-[50%] -ml-[80px] mb-4 flex w-[160px] flex-row justify-around gap-2 rounded-2xl bg-black p-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="h-8 w-8 rounded-full bg-slate-700 p-0 focus:ring-0 data-[state=open]:bg-slate-700">
            <Layers size="16" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Layers</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <ScrollArea className="h-[320px] w-full">
            {renderLayerItems(structure, 0)}
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="h-8 w-8 rounded-full bg-slate-700 p-0 focus:ring-0 data-[state=open]:bg-slate-700">
            <Plus size="16" />
          </Button>
        </SheetTrigger>
        <SheetContent
          position="bottom"
          className="mb-20 flex h-auto flex-col gap-4 bg-transparent"
        >
          <div className="mx-auto flex w-fit flex-row justify-center gap-4">
            {!selectedBlockId && (
              <Button
                variant="outline"
                className="flex h-16 w-16 flex-col gap-3 rounded-2xl border-2 bg-white ring-0 focus:ring-0"
                onClick={() => {
                  {
                    setStructure((prevStructure: any[]) => [
                      ...prevStructure,
                      {
                        id: generateRandomId(),
                        tag: "section",
                        type: "container",
                        className: "w-full min-h-[24px]",
                        children: [],
                      },
                    ])
                  }
                }}
              >
                <Square size="20" />
              </Button>
            )}
            {selectedBlockId &&
              Object.keys(blocks).map((componentName) => {
                const Icon = blocks[componentName].icon
                return (
                  <Button
                    key={componentName}
                    variant="outline"
                    className="flex h-16 w-16 flex-col gap-3 rounded-2xl border-2 bg-white ring-0 focus:ring-0"
                    onClick={(event) => {
                      event.stopPropagation()
                      addBlock(String(selectedBlockId), componentName)
                    }}
                  >
                    <Icon size="20" />
                  </Button>
                )
              })}
          </div>
        </SheetContent>
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="h-8 w-8 rounded-full bg-slate-700 p-0 focus:ring-0 data-[state=open]:bg-slate-700">
            <Settings size="16" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={saveStructure}>
              <Save className="mr-2 h-4 w-4" />
              <span>Save</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={resetSavedStructure}>
              <span>Reset</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  )
}

export default React.memo(BuilderPropsNavbar)
