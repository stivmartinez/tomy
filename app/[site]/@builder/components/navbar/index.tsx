"use client"

import React from "react"
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  Layers,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  Square,
  User,
  UserPlus,
  Users,
} from "lucide-react"

import { generateRandomId } from "@/lib/generateRandomId"
import blocks from "@/app/[site]/@builder/components/blocks/blocks"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const BuilderPropsNavbar = ({
  structure,
  setStructure,
  selectedBlockId,
  setSelectedBlockId,
  addBlock,
}: {
  structure: any[]
  setStructure: (structure: any[]) => void
  selectedBlockId: string | null
  setSelectedBlockId: (blockId: string | null) => void
  addBlock: (parentId: string, componentName: string) => void
}) => {
  const newBlock = {
    id: generateRandomId(),
    tag: "section",
    type: "container",
    className: "w-full min-h-[24px]",
    children: [],
  }

  function add() {
    setStructure((prevStructure: any[]) => [...prevStructure, newBlock])
  }

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
    <nav className="fixed bottom-0 left-0 w-full px-4">
      <div className="mx-auto mb-4 flex max-w-3xl flex-row justify-around rounded-2xl bg-black py-2">
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
                  onClick={add}
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
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Keyboard className="mr-2 h-4 w-4" />
                <span>Keyboard shortcuts</span>
                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Users className="mr-2 h-4 w-4" />
                <span>Team</span>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <UserPlus className="mr-2 h-4 w-4" />
                  <span>Invite users</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <Mail className="mr-2 h-4 w-4" />
                      <span>Email</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      <span>Message</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      <span>More...</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem>
                <Plus className="mr-2 h-4 w-4" />
                <span>New Team</span>
                <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Github className="mr-2 h-4 w-4" />
              <span>GitHub</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LifeBuoy className="mr-2 h-4 w-4" />
              <span>Support</span>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <Cloud className="mr-2 h-4 w-4" />
              <span>API</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}

export default React.memo(BuilderPropsNavbar)
