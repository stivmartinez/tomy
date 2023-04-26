"use client"

import React, { ReactNode } from "react"
import { Monitor, Settings, Smartphone } from "lucide-react"

import { tailwindColors } from "@/lib/tailwindColors"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion"
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

  const stopPropagation = (event: React.MouseEvent) => {
    event.stopPropagation()
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
        className="m-2 mt-16 h-fit max-h-[60vh] overflow-y-auto rounded-xl border"
        position="right"
        size="sm"
        onClick={stopPropagation}
        style={{
          zIndex: 9999,
        }}
      >
        <h3>Settings for block</h3>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Background color</AccordionTrigger>
            <AccordionContent>
              <div className="relative flex w-full flex-row items-start gap-4">
                <Label className="relative top-1 text-sm">
                  <Monitor size="16" />
                </Label>
                <div className="flex w-full snap-x gap-2 overflow-x-auto pb-4">
                  {Object.keys(tailwindColors).map((colorGroup) =>
                    tailwindColors[colorGroup].map((colorClass) => (
                      <div key={colorClass} className={`snap-center`}>
                        <button
                          // eslint-disable-next-line tailwindcss/classnames-order
                          className={`flex h-6 w-6 rounded-md bg-${colorClass}`}
                          onClick={() =>
                            handleClassNameChange(colorClass, "bg", "")
                          }
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="relative flex w-full flex-row items-start gap-4">
                <Label className="relative top-1 text-sm">
                  <Smartphone size="16" />
                </Label>
                <div className="flex w-full snap-x gap-2 overflow-x-auto pb-4">
                  {Object.keys(tailwindColors).map((colorGroup) =>
                    tailwindColors[colorGroup].map((colorClass) => (
                      <div key={colorClass} className={`snap-center`}>
                        <button
                          // eslint-disable-next-line tailwindcss/classnames-order
                          className={`flex h-6 w-6 rounded-md bg-${colorClass}`}
                          onClick={() =>
                            handleClassNameChange(colorClass, "md:bg", "")
                          }
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Text color</AccordionTrigger>
            <AccordionContent>
              <div className="relative flex w-full flex-row items-start gap-4">
                <Label className="relative top-1 text-sm">
                  <Monitor size="16" />
                </Label>
                <div className="flex w-full snap-x gap-2 overflow-x-auto pb-4">
                  {Object.keys(tailwindColors).map((colorGroup) =>
                    tailwindColors[colorGroup].map((colorClass) => (
                      <div key={colorClass} className={`snap-center`}>
                        <button
                          // eslint-disable-next-line tailwindcss/classnames-order
                          className={`flex h-6 w-6 rounded-md bg-${colorClass}`}
                          onClick={() =>
                            handleClassNameChange(colorClass, "text", "")
                          }
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="relative flex w-full flex-row items-start gap-4">
                <Label className="relative top-1 text-sm">
                  <Smartphone size="16" />
                </Label>
                <div className="flex w-full snap-x gap-2 overflow-x-auto pb-4">
                  {Object.keys(tailwindColors).map((colorGroup) =>
                    tailwindColors[colorGroup].map((colorClass) => (
                      <div key={colorClass} className={`snap-center`}>
                        <button
                          // eslint-disable-next-line tailwindcss/classnames-order
                          className={`flex h-6 w-6 rounded-md bg-${colorClass}`}
                          onClick={() =>
                            handleClassNameChange(colorClass, "md:text", "")
                          }
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
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
