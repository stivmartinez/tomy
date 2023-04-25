"use client"

import React, { ReactNode } from "react"
import { Monitor, Settings, Smartphone } from "lucide-react"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"

interface BlockSettingsSheetProps {
  onClassNamesChange: (newStyles: { [key: string]: string }) => void
  onStylesChange: (newStyles: { [key: string]: string | number }) => void
  children: ReactNode
}

const BlockSettingsSheet: React.FC<BlockSettingsSheetProps> = ({
  onClassNamesChange,
  onStylesChange,
}) => {
  const handleClassNameChange = (
    event: React.ChangeEvent<HTMLInputElement> | string,
    prefix: string = "",
    suffix: string = "",
    useBrackets: boolean = false
  ) => {
    const e = event?.target ? event?.target.value : event
    const suf = suffix ? suffix : ""
    const value = useBrackets ? `[${e}${suf}]` : `${e}${suf}`
    if (prefix) {
      onClassNamesChange({ [prefix]: value })
    } else {
      onClassNamesChange({ [value]: "" })
    }
  }

  const handleStyleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    styleProp: string
  ) => {
    onStylesChange({ [styleProp]: event.target.value + "px" })
  }

  const stopPropagation = (event: React.MouseEvent) => {
    event.stopPropagation()
  }

  const StopPropagationWrapper = ({ children }) => {
    const handleClick = (event: React.MouseEvent) => {
      event.stopPropagation()
    }

    return <div onClick={handleClick}>{children}</div>
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-500 p-0 text-white"
          onClick={stopPropagation}
        >
          <Settings size="12" />
        </Button>
      </SheetTrigger>
      <SheetContent
        position="right"
        size="sm"
        onClick={stopPropagation}
        style={{
          zIndex: 9999,
        }}
      >
        <h3>Settings for block</h3>
        <div className="my-4 flex flex-col gap-2">
          <Label className="text-sm">Background color</Label>
          <div className="flex w-full flex-row items-center gap-4">
            <div className="flex w-full flex-row items-center gap-4">
              <Label className="text-sm">
                <Monitor size="16" />
              </Label>
              <RadioGroup
                onValueChange={(event) => handleClassNameChange(event, "bg")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="slate-100" id="slate-100" />
                  <Label htmlFor="slate-100 flex flex-row items-center">
                    <span className="inline-flex h-4 w-32 rounded-full border bg-slate-100"></span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="slate-300" id="slate-300" />
                  <Label htmlFor="slate-300 flex flex-row items-center">
                    <span className="inline-flex h-4 w-32 rounded-full border bg-slate-300"></span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="slate-600" id="slate-600" />
                  <Label htmlFor="slate-600 flex flex-row items-center">
                    <span className="inline-flex h-4 w-32 rounded-full border bg-slate-600"></span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="slate-900" id="slate-900" />
                  <Label htmlFor="slate-900 flex flex-row items-center">
                    <span className="inline-flex h-4 w-32 rounded-full border bg-slate-900"></span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
        <div className="my-4 flex flex-col gap-2">
          <Label className="text-sm">Height</Label>
          <div className="flex w-full flex-row items-center gap-4">
            <div className="flex w-full flex-row items-center gap-4">
              <Label className="text-sm">
                <Monitor size="16" />
              </Label>
              <RadioGroup
                onValueChange={(event) => handleClassNameChange(event, "h")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0" id="0" />
                  <Label htmlFor="0">h-0</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="56" id="56" />
                  <Label htmlFor="56">h-56</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="80" id="80" />
                  <Label htmlFor="80">h-80</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="screen" id="screen" />
                  <Label htmlFor="screen">h-screen</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="flex w-full flex-row items-center gap-4">
              <Label className="text-sm">
                <Smartphone size="16" />
              </Label>
              <RadioGroup
                onValueChange={(event) => handleClassNameChange(event, "md:h")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0" id="0" />
                  <Label htmlFor="0">h-0</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="56" id="56" />
                  <Label htmlFor="56">h-56</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="80" id="80" />
                  <Label htmlFor="80">h-80</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="screen" id="screen" />
                  <Label htmlFor="screen">h-screen</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default BlockSettingsSheet
