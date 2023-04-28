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
import ColorPicker from "./options/colorpicker"
import Picker from "./options/picker"

interface BlocksDesignProps {
  onClassNamesChange: (newStyles: { [key: string]: string }) => void
  children: ReactNode
  defaultValues: { [key: string]: string }
}

const colorSettings = [
  {
    id: "bg-color",
    title: "Background color",
    settingPrefix: ["bg", "md:bg"],
  },
  {
    id: "text-color",
    title: "Text color",
    settingPrefix: ["text", "md:text"],
  },
]

const sizeSettings = [
  {
    id: "height",
    title: "Height",
    settingPrefix: ["h", "md:h"],
    options: tailwindSizes,
  },
  {
    id: "width",
    title: "Width",
    settingPrefix: ["w", "md:w"],
    options: tailwindSizes,
  },
  {
    id: "font-size",
    title: "Font size",
    settingPrefix: ["text", "md:text"],
    options: tailwindSizesTwo,
  },
]

const displaySettings = [
  {
    id: "display",
    title: "Display",
    settingPrefix: ["", "md:"],
    options: tailwindDisplayOptions,
  },
]

const alignmentSettings = [
  {
    id: "justify",
    title: "Justify",
    settingPrefix: ["justify", "md:justify"],
    options: tailwindAlign,
  },
  {
    id: "content",
    title: "Content",
    settingPrefix: ["content", "md:content"],
    options: tailwindAlign,
  },
  {
    id: "items",
    title: "Items",
    settingPrefix: ["items", "md:items"],
    options: tailwindAlignItems,
  },
  {
    id: "text-align",
    title: "Text align",
    settingPrefix: ["text", "md:text"],
    options: tailwindTextAlign,
  },
]

const fontWeightSettings = [
  {
    id: "font-weight",
    title: "Font weight",
    settingPrefix: ["font", "md:font"],
    options: tailwindFontWeights,
  },
]

const tailwindSpacing = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "8",
  "10",
  "12",
  "16",
  "20",
  "24",
  "32",
  "40",
  "48",
  "56",
  "64",
]

const paddingSettings = [
  {
    id: "padding",
    title: "Padding",
    settingPrefix: ["p", "md:p"],
    options: tailwindSpacing,
  },
]

const marginSettings = [
  {
    id: "margin",
    title: "Margin",
    settingPrefix: ["m", "md:m"],
    options: tailwindSpacing,
  },
]

const tailwindBorderWidths = ["0", "2", "4", "8"]

const borderSettings = [
  {
    id: "border",
    title: "Border",
    settingPrefix: ["border", "md:border"],
    options: tailwindBorderWidths,
  },
  {
    id: "border-color",
    title: "Border color",
    settingPrefix: ["border", "md:border"],
  },
]

const tailwindBorderRadius = ["0", "1", "2", "3", "4", "full"]

const borderRadiusSettings = [
  {
    id: "border-radius",
    title: "Border radius",
    settingPrefix: ["rounded", "md:rounded"],
    options: tailwindBorderRadius,
  },
]

const tailwindFlexDirections = ["row", "row-reverse", "col", "col-reverse"]

const flexDirectionSettings = [
  {
    id: "flex-direction",
    title: "Flex direction",
    settingPrefix: ["flex", "md:flex"],
    options: tailwindFlexDirections,
  },
]

const tailwindFlexWrap = ["wrap", "wrap-reverse", "nowrap"]

const flexWrapSettings = [
  {
    id: "flex-wrap",
    title: "Flex wrap",
    settingPrefix: ["flex", "md:flex"],
    options: tailwindFlexWrap,
  },
]

const tailwindFlexGrowShrink = ["0", "1"]

const flexGrowShrinkSettings = [
  {
    id: "flex-grow",
    title: "Flex grow",
    settingPrefix: ["flex-grow", "md:flex-grow"],
    options: tailwindFlexGrowShrink,
  },
  {
    id: "flex-shrink",
    title: "Flex shrink",
    settingPrefix: ["flex-shrink", "md:flex-shrink"],
    options: tailwindFlexGrowShrink,
  },
]

const tailwindGaps = [
  "0",
  "0.5",
  "1",
  "1.5",
  "2",
  "2.5",
  "3",
  "3.5",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "14",
  "16",
  "20",
  "24",
  "28",
  "32",
  "36",
  "40",
  "44",
  "48",
  "52",
  "56",
  "60",
  "64",
  "72",
  "80",
  "96",
]

const gapSettings = [
  {
    id: "gap",
    title: "Gap",
    settingPrefix: ["gap", "md:gap"],
    options: tailwindGaps,
  },
]

const BlocksDesign: React.FC<BlocksDesignProps> = ({
  onClassNamesChange,
  defaultValues,
  children,
}) => {
  const handleClassNameChange = (value: any, prefix: string = "") => {
    if (prefix) {
      // Find the current class with the same prefix and remove it
      const currentClass = Object.keys(defaultValues).find((key) =>
        key.startsWith(prefix)
      )
      if (currentClass) {
        delete defaultValues[currentClass]
      }
      // Add the new class
      onClassNamesChange({ ...defaultValues, [prefix]: value })
    } else {
      onClassNamesChange({ [value]: "" })
    }
  }

  const renderSetting = (
    setting: any,
    defaultValues: any,
    handleClassNameChange: any
  ) => {
    return setting.settingPrefix.map((prefix: any, index: any) => {
      const icon =
        index === 0 ? <Monitor size="16" /> : <Smartphone size="16" />
      if (setting.id === "bg-color" || setting.id === "text-color") {
        return (
          <ColorPicker
            key={prefix}
            prefix={prefix}
            icon={icon}
            defaultValues={defaultValues}
            handleClassNameChange={handleClassNameChange}
            options={tailwindColors}
          />
        )
      } else {
        return (
          <Picker
            key={prefix}
            prefix={prefix}
            icon={icon}
            defaultValues={defaultValues}
            handleClassNameChange={handleClassNameChange}
            options={setting.options}
          />
        )
      }
    })
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
          {[
            ...displaySettings,
            ...flexDirectionSettings,
            ...flexWrapSettings,
            ...alignmentSettings,
            ...gapSettings,
            ...sizeSettings,
            ...paddingSettings,
            ...marginSettings,
            ...colorSettings,
            ...fontWeightSettings,
            ...borderSettings,
            ...borderRadiusSettings,
            ...flexGrowShrinkSettings,
          ].map((setting) => (
            <AccordionItem key={setting.id} value={setting.id}>
              <AccordionTrigger>{setting.title}</AccordionTrigger>
              <AccordionContent>
                {renderSetting(setting, defaultValues, handleClassNameChange)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </SheetContent>
    </Sheet>
  )
}

export default BlocksDesign
