"use client"

import React, { ReactNode } from "react"
import { Monitor, Smartphone } from "lucide-react"

import { tailwindColors } from "@/lib/tailwindColors"
import { tailwindDisplayOptions } from "@/lib/tailwindDisplayOptions"
import { tailwindSizes } from "@/lib/tailwindSizes"
import { tailwindSizesTwo } from "@/lib/tailwindSizesTwo"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../../../components/ui/accordion"
import { Label } from "../../../../../../components/ui/label"
import { RadioGroup, RadioGroupItem } from "../../../../../../components/ui/radio-group"

interface BlocksDesignProps {
  onClassNamesChange: (newStyles: { [key: string]: string }) => void
  onStylesChange: (newStyles: { [key: string]: string | number }) => void
  children: ReactNode
  defaultValues: { [key: string]: string }
}

const BlocksDesign: React.FC<BlocksDesignProps> = ({
  onClassNamesChange,
  onStylesChange,
  defaultValues,
  children,
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
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        className="m-2 mt-16 h-fit max-h-[60vh] w-full max-w-[360px] overflow-y-auto rounded-xl border"
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
                <Label className="relative top-2 text-sm">
                  <Monitor size="16" />
                </Label>
                <div className="flex w-full snap-x gap-2 overflow-x-auto pb-4 pt-1">
                  {Object.keys(tailwindColors).map((colorGroup) =>
                    tailwindColors[colorGroup].map((colorClass) => (
                      <div key={colorClass} className={`snap-center`}>
                        <button
                          // eslint-disable-next-line tailwindcss/classnames-order
                          className={`flex h-6 w-6 rounded-md bg-${colorClass} ${
                            defaultValues["bg"] === colorClass
                              ? "ring-2 ring-offset-2 ring-slate-500"
                              : ""
                          }`}
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
                <Label className="relative top-2 text-sm">
                  <Smartphone size="16" />
                </Label>
                <div className="flex w-full snap-x gap-2 overflow-x-auto pb-4 pt-1">
                  {Object.keys(tailwindColors).map((colorGroup) =>
                    tailwindColors[colorGroup].map((colorClass) => (
                      <div key={colorClass} className={`snap-center`}>
                        <button
                          // eslint-disable-next-line tailwindcss/classnames-order
                          className={`flex h-6 w-6 rounded-md bg-${colorClass} ${
                            defaultValues["md:bg"] === colorClass
                              ? "ring-2 ring-offset-2 ring-slate-500"
                              : ""
                          }`}
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
                <Label className="relative top-2 text-sm">
                  <Monitor size="16" />
                </Label>
                <div className="flex w-full snap-x gap-2 overflow-x-auto pb-4 pt-1">
                  {Object.keys(tailwindColors).map((colorGroup) =>
                    tailwindColors[colorGroup].map((colorClass) => (
                      <div key={colorClass} className={`snap-center`}>
                        <button
                          // eslint-disable-next-line tailwindcss/classnames-order
                          className={`flex h-6 w-6 rounded-md bg-${colorClass} ${
                            defaultValues["text"] === colorClass
                              ? "ring-2 ring-offset-2 ring-slate-500"
                              : ""
                          }`}
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
                <Label className="relative top-2 text-sm">
                  <Smartphone size="16" />
                </Label>
                <div className="flex w-full snap-x gap-2 overflow-x-auto pb-4 pt-1">
                  {Object.keys(tailwindColors).map((colorGroup) =>
                    tailwindColors[colorGroup].map((colorClass) => (
                      <div key={colorClass} className={`snap-center`}>
                        <button
                          // eslint-disable-next-line tailwindcss/classnames-order
                          className={`flex h-6 w-6 rounded-md bg-${colorClass} ${
                            defaultValues["md:text"] === colorClass
                              ? "ring-2 ring-offset-2 ring-slate-500"
                              : ""
                          }`}
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
          <AccordionItem value="item-3">
            <AccordionTrigger>Height</AccordionTrigger>
            <AccordionContent>
              <div className="relative flex w-full flex-row items-start gap-4">
                <Label className="relative top-2 text-sm">
                  <Monitor size="16" />
                </Label>
                <RadioGroup
                  onValueChange={(event) => handleClassNameChange(event, "h")}
                  className="flex w-full snap-x gap-4 overflow-x-auto pb-4"
                  defaultValue={defaultValues["h"]}
                >
                  {tailwindSizes.map((height) => (
                    <div key={height} className={`snap-center`}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={height} id={height} />
                        <Label htmlFor={height}>{height}</Label>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div className="relative flex w-full flex-row items-start gap-4">
                <Label className="relative top-2 text-sm">
                  <Smartphone size="16" />
                </Label>
                <RadioGroup
                  defaultValue={defaultValues["md:bg"]}
                  onValueChange={(event) =>
                    handleClassNameChange(event, "md:h")
                  }
                  className="flex w-full snap-x gap-4 overflow-x-auto pb-4"
                >
                  {tailwindSizes.map((height) => (
                    <div key={height} className={`snap-center`}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={height} id={height} />
                        <Label htmlFor={height}>{height}</Label>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Width</AccordionTrigger>
            <AccordionContent>
              <div className="relative flex w-full flex-row items-start gap-4">
                <Label className="relative top-2 text-sm">
                  <Monitor size="16" />
                </Label>
                <RadioGroup
                  defaultValue={defaultValues["w"]}
                  onValueChange={(event) => handleClassNameChange(event, "w")}
                  className="flex w-full snap-x gap-4 overflow-x-auto pb-4"
                >
                  {tailwindSizes.map((height) => (
                    <div key={height} className={`snap-center`}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={height} id={height} />
                        <Label htmlFor={height}>{height}</Label>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div className="relative flex w-full flex-row items-start gap-4">
                <Label className="relative top-2 text-sm">
                  <Smartphone size="16" />
                </Label>
                <RadioGroup
                  defaultValue={defaultValues["md:w"]}
                  onValueChange={(event) =>
                    handleClassNameChange(event, "md:w")
                  }
                  className="flex w-full snap-x gap-4 overflow-x-auto pb-4"
                >
                  {tailwindSizes.map((height) => (
                    <div key={height} className={`snap-center`}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={height} id={height} />
                        <Label htmlFor={height}>{height}</Label>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>Font size</AccordionTrigger>
            <AccordionContent>
              <div className="relative flex w-full flex-row items-start gap-4">
                <Label className="relative top-2 text-sm">
                  <Monitor size="16" />
                </Label>
                <RadioGroup
                  defaultValue={defaultValues["text"]}
                  onValueChange={(event) =>
                    handleClassNameChange(event, "text")
                  }
                  className="flex w-full snap-x gap-4 overflow-x-auto pb-4"
                >
                  {tailwindSizesTwo.map((height) => (
                    <div key={height} className={`snap-center`}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={height} id={height} />
                        <Label htmlFor={height}>{height}</Label>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div className="relative flex w-full flex-row items-start gap-4">
                <Label className="relative top-2 text-sm">
                  <Smartphone size="16" />
                </Label>
                <RadioGroup
                  defaultValue={defaultValues["md:text"]}
                  onValueChange={(event) =>
                    handleClassNameChange(event, "md:text")
                  }
                  className="flex w-full snap-x gap-4 overflow-x-auto pb-4"
                >
                  {tailwindSizesTwo.map((height) => (
                    <div key={height} className={`snap-center`}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={height} id={height} />
                        <Label htmlFor={height}>{height}</Label>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger>Display</AccordionTrigger>
            <AccordionContent>
              <div className="relative flex w-full flex-row items-start gap-4">
                <Label className="relative top-2 text-sm">
                  <Monitor size="16" />
                </Label>
                <RadioGroup
                  defaultValue={defaultValues["display"]}
                  onValueChange={(event) => handleClassNameChange(event)}
                  className="flex w-full snap-x gap-4 overflow-x-auto pb-4"
                >
                  {tailwindDisplayOptions.map((displayOption) => (
                    <div key={displayOption} className={`snap-center`}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={displayOption}
                          id={displayOption}
                        />
                        <Label
                          htmlFor={displayOption}
                          className="whitespace-nowrap"
                        >
                          {displayOption}
                        </Label>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div className="relative flex w-full flex-row items-start gap-4">
                <Label className="relative top-2 text-sm">
                  <Smartphone size="16" />
                </Label>
                <RadioGroup
                  defaultValue={defaultValues["md:display"]}
                  onValueChange={(event) => handleClassNameChange(event, "md:")}
                  className="flex w-full snap-x gap-4 overflow-x-auto pb-4"
                >
                  {tailwindDisplayOptions.map((displayOption) => (
                    <div key={`md:${displayOption}`} className={`snap-center`}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={`md:${displayOption}`}
                          id={`md:${displayOption}`}
                        />
                        <Label
                          htmlFor={`md:${displayOption}`}
                          className="whitespace-nowrap"
                        >
                          {displayOption}
                        </Label>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-7">
            <AccordionTrigger>Text Align</AccordionTrigger>
            <AccordionContent>
              <div className="relative flex w-full flex-row items-start gap-4">
                <Label className="relative top-2 text-sm">
                  <Monitor size="16" />
                </Label>
                <RadioGroup
                  defaultValue={defaultValues["text"]}
                  onValueChange={(event) =>
                    handleClassNameChange(event, "text")
                  }
                  className="flex w-full snap-x gap-4 overflow-x-auto pb-4"
                >
                  {["left", "center", "right", "justify"].map((align) => (
                    <div key={align} className={`snap-center`}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={align} id={align} />
                        <Label htmlFor={align}>{align}</Label>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div className="relative flex w-full flex-row items-start gap-4">
                <Label className="relative top-2 text-sm">
                  <Smartphone size="16" />
                </Label>
                <RadioGroup
                  defaultValue={defaultValues["md:text"]}
                  onValueChange={(event) =>
                    handleClassNameChange(event, "md:text")
                  }
                  className="flex w-full snap-x gap-4 overflow-x-auto pb-4"
                >
                  {["left", "center", "right", "justify"].map((align) => (
                    <div key={align} className={`snap-center`}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={`text-${align}`}
                          id={`md:text-${align}`}
                        />
                        <Label htmlFor={`md:text-${align}`}>{align}</Label>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </SheetContent>
    </Sheet>
  )
}

export default BlocksDesign
