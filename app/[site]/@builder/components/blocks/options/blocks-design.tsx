"use client"

import React, { ReactNode } from "react"
import { Monitor, Smartphone } from "lucide-react"

import {
  tailwindAlign,
  tailwindAlignItems,
  tailwindColors,
  tailwindDisplayOptions,
  tailwindFontWeights,
  tailwindSizes,
  tailwindSizesTwo,
} from "@/lib/tailwind-classes"
import { tailwindTextAlign } from "@/lib/tailwind-classes/textAlign"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import ColorPicker from "./colorpicker"
import Picker from "./picker"

interface BlocksDesignProps {
  onClassNamesChange: (newStyles: { [key: string]: string }) => void
  children: ReactNode
  defaultValues: { [key: string]: string }
}

const BlocksDesign: React.FC<BlocksDesignProps> = ({
  onClassNamesChange,
  defaultValues,
  children,
}) => {
  const handleClassNameChange = (value: any, prefix: string = "") => {
    if (prefix) {
      onClassNamesChange({ [prefix]: value })
    } else {
      onClassNamesChange({ [value]: "" })
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        className="m-2 mt-16 h-fit max-h-[60vh] w-full max-w-[360px] overflow-y-auto rounded-xl border"
        position="right"
        size="sm"
        onClick={(e) => e.stopPropagation()}
        style={{
          zIndex: 9999,
        }}
      >
        <h3>Settings for block</h3>
        <Accordion type="single" collapsible>
          <AccordionItem value="bg-color">
            <AccordionTrigger>Background color</AccordionTrigger>
            <AccordionContent>
              <ColorPicker
                prefix="bg"
                icon={<Monitor size="16" />}
                defaultValues={defaultValues}
                handleClassNameChange={handleClassNameChange}
                options={tailwindColors}
              />
              <ColorPicker
                prefix="md:bg"
                icon={<Smartphone size="16" />}
                defaultValues={defaultValues}
                handleClassNameChange={handleClassNameChange}
                options={tailwindColors}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="text-color">
            <AccordionTrigger>Text color</AccordionTrigger>
            <AccordionContent>
              <ColorPicker
                prefix="text"
                icon={<Monitor size="16" />}
                defaultValues={defaultValues}
                handleClassNameChange={handleClassNameChange}
                options={tailwindColors}
              />
              <ColorPicker
                prefix="md:text"
                icon={<Smartphone size="16" />}
                defaultValues={defaultValues}
                handleClassNameChange={handleClassNameChange}
                options={tailwindColors}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="height">
            <AccordionTrigger>Height</AccordionTrigger>
            <AccordionContent>
              <Picker
                prefix="h"
                icon={<Monitor size="16" />}
                defaultValues={defaultValues}
                handleClassNameChange={handleClassNameChange}
                options={tailwindSizes}
              />
              <Picker
                prefix="md:h"
                icon={<Smartphone size="16" />}
                defaultValues={defaultValues}
                handleClassNameChange={handleClassNameChange}
                options={tailwindSizes}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="width">
            <AccordionTrigger>Width</AccordionTrigger>
            <AccordionContent>
              <Picker
                prefix="w"
                icon={<Monitor size="16" />}
                defaultValues={defaultValues}
                handleClassNameChange={handleClassNameChange}
                options={tailwindSizes}
              />
              <Picker
                prefix="md:w"
                icon={<Smartphone size="16" />}
                defaultValues={defaultValues}
                handleClassNameChange={handleClassNameChange}
                options={tailwindSizes}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="font-size">
            <AccordionTrigger>Font size</AccordionTrigger>
            <AccordionContent>
              <Picker
                prefix="text"
                icon={<Monitor size="16" />}
                defaultValues={defaultValues}
                handleClassNameChange={handleClassNameChange}
                options={tailwindSizesTwo}
              />
              <Picker
                prefix="md:text"
                icon={<Smartphone size="16" />}
                defaultValues={defaultValues}
                handleClassNameChange={handleClassNameChange}
                options={tailwindSizesTwo}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="display">
            <AccordionTrigger>Display</AccordionTrigger>
            <AccordionContent>
              <Picker
                prefix=""
                icon={<Monitor size="16" />}
                defaultValues={defaultValues}
                handleClassNameChange={handleClassNameChange}
                options={tailwindDisplayOptions}
              />
              <Picker
                prefix="md:"
                icon={<Smartphone size="16" />}
                defaultValues={defaultValues}
                handleClassNameChange={handleClassNameChange}
                options={tailwindDisplayOptions}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="justify">
            <AccordionTrigger>Justify</AccordionTrigger>
            <AccordionContent>
              <Picker
                prefix="justify"
                icon={<Monitor size="16" />}
                defaultValues={defaultValues}
                handleClassNameChange={handleClassNameChange}
                options={tailwindAlign}
              />
              <Picker
                prefix="md:justify"
                icon={<Smartphone size="16" />}
                defaultValues={defaultValues}
                handleClassNameChange={handleClassNameChange}
                options={tailwindAlign}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="content">
            <AccordionTrigger>Content</AccordionTrigger>
            <AccordionContent>
              <Picker
                prefix="content"
                icon={<Monitor size="16" />}
                defaultValues={defaultValues}
                handleClassNameChange={handleClassNameChange}
                options={tailwindAlign}
              />
              <Picker
                prefix="md:content"
                icon={<Smartphone size="16" />}
                defaultValues={defaultValues}
                handleClassNameChange={handleClassNameChange}
                options={tailwindAlign}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="items">
            <AccordionTrigger>Items</AccordionTrigger>
            <AccordionContent>
              <Picker
                prefix="items"
                icon={<Monitor size="16" />}
                defaultValues={defaultValues}
                handleClassNameChange={handleClassNameChange}
                options={tailwindAlignItems}
              />
              <Picker
                prefix="md:items"
                icon={<Smartphone size="16" />}
                defaultValues={defaultValues}
                handleClassNameChange={handleClassNameChange}
                options={tailwindAlignItems}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="text-align">
            <AccordionTrigger>Text align</AccordionTrigger>
            <AccordionContent>
              <Picker
                prefix="text"
                icon={<Monitor size="16" />}
                defaultValues={defaultValues}
                handleClassNameChange={handleClassNameChange}
                options={tailwindTextAlign}
              />
              <Picker
                prefix="md:text"
                icon={<Smartphone size="16" />}
                defaultValues={defaultValues}
                handleClassNameChange={handleClassNameChange}
                options={tailwindTextAlign}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="font-weight">
            <AccordionTrigger>Font weight</AccordionTrigger>
            <AccordionContent>
              <Picker
                prefix="font"
                icon={<Monitor size="16" />}
                defaultValues={defaultValues}
                handleClassNameChange={handleClassNameChange}
                options={tailwindFontWeights}
              />
              <Picker
                prefix="md:font"
                icon={<Smartphone size="16" />}
                defaultValues={defaultValues}
                handleClassNameChange={handleClassNameChange}
                options={tailwindFontWeights}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </SheetContent>
    </Sheet>
  )
}

export default BlocksDesign
