"use client"

import React, { ReactNode } from "react"

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
      onClassNamesChange({ [value]: "" })
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

  const stopPropagation = (event: React.MouseEvent) => {
    event.stopPropagation()
  }

  const generateOptions = (prefix: string) => [
    { value: `${prefix}xs`, label: "XS", size: "1" },
    { value: `${prefix}sm`, label: "SM", size: "2" },
    { value: `${prefix}md`, label: "MD", size: "4" },
    { value: `${prefix}lg`, label: "LG", size: "8" },
    { value: `${prefix}xl`, label: "XL", size: "16" },
    { value: `${prefix}2xl`, label: "2XL", size: "24" },
    { value: `${prefix}3xl`, label: "3XL", size: "32" },
    { value: `${prefix}4xl`, label: "4XL", size: "48" },
    { value: `${prefix}5xl`, label: "5XL", size: "64" },
    { value: `${prefix}6xl`, label: "6XL", size: "80" },
    { value: `${prefix}7xl`, label: "7XL", size: "96" },
    { value: `${prefix}8xl`, label: "8XL", size: "112" },
    { value: `${prefix}9xl`, label: "9XL", size: "128" },
  ]

  const paddingOptions = generateOptions("p")
  const marginOptions = generateOptions("m")

  const generateRadioGroup = (
    options: { value: string; label: string; size: string }[],
    callback: (value: string) => void
  ) => {
    return (
      <RadioGroup
        defaultValue="sm"
        className="flex flex-row flex-wrap gap-4"
        onValueChange={callback}
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem value={option.size} id={option.value} />
            <Label htmlFor={option.value}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
    )
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-600 p-0 text-white"
          onClick={stopPropagation}
        >
          S
        </Button>
      </SheetTrigger>
      <SheetContent position="right" size="sm" onClick={handleClick}>
        <h3>Settings for block</h3>
        <div className="my-8 border-y py-4">
          <Label className="mb-2 text-sm">Padding</Label>
          {generateRadioGroup(paddingOptions, (value) =>
            onClassNamesChange({ p: value })
          )}
        </div>
        <div className="my-8 border-y py-4">
          <Label className="mb-2 text-sm">Margin</Label>
          {generateRadioGroup(marginOptions, (value) =>
            onClassNamesChange({ my: value })
          )}
        </div>
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
