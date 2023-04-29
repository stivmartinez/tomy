"use client"

import React, { ReactNode, useState } from "react"
import { Monitor, Smartphone } from "lucide-react"

import { tailwindColors } from "@/lib/tailwind-classes"
import {
  alignItemsSettings,
  backgroundColorSettings,
  borderRadiusSettings,
  boxShadowSettings,
  displaySettings,
  flexboxSettings,
  fontFamilySettings,
  fontSizeSettings,
  fontWeightSettings,
  gapSettings,
  gridTemplateColumnsSettings,
  gridTemplateRowsSettings,
  heightSettings,
  justifyContentSettings,
  letterSpacingSettings,
  lineHeightSettings,
  marginSettings,
  objectPositionSettings,
  opacitySettings,
  paddingSettings,
  placeholderColorSettings,
  positionSettings,
  rotateSettings,
  scaleSettings,
  skewSettings,
  textColorSettings,
  translateSettings,
  widthSettings,
  zIndexSettings,
} from "@/lib/tailwindClasess"
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

  const findDefaultValues = (
    classNames: string[],
    settingPrefixes: string[]
  ) => {
    const defaultValues: { desktop: string; mobile: string } = {
      desktop: "",
      mobile: "",
    }

    if (!Array.isArray(classNames)) {
      console.warn("Expected classNames to be an array.")
      return defaultValues
    }

    settingPrefixes.forEach((prefix, index) => {
      const value = classNames.find((className) => className.startsWith(prefix))
      if (index === 0) {
        defaultValues.desktop = value ? value.replace(prefix, "") : ""
      } else {
        defaultValues.mobile = value ? value.replace(prefix, "") : ""
      }
    })

    return defaultValues
  }

  const renderSetting = (
    setting: any,
    classNames: any,
    handleClassNameChange: any
  ) => {
    const defaultValues = findDefaultValues(classNames, setting.settingPrefix)

    return setting.settingPrefix.map((prefix: any, index: any) => {
      const icon =
        index === 0 ? <Monitor size="16" /> : <Smartphone size="16" />
      if (setting.id === "bg-color" || setting.id === "text-color") {
        return (
          <ColorPicker
            key={prefix}
            prefix={prefix}
            icon={icon}
            defaultValues={
              index === 0 ? defaultValues.desktop : defaultValues.mobile
            }
            handleClassNameChange={(value) =>
              handleClassNameChange(value, prefix)
            }
            options={tailwindColors}
          />
        )
      } else {
        return (
          <Picker
            key={prefix}
            prefix={prefix}
            icon={icon}
            defaultValues={
              index === 0 ? defaultValues.desktop : defaultValues.mobile
            }
            handleClassNameChange={(value) =>
              handleClassNameChange(value, prefix)
            }
            options={setting.options}
          />
        )
      }
    })
  }

  const allSettings = [
    ...rotateSettings,
    ...scaleSettings,
    ...skewSettings,
    ...translateSettings,
    ...boxShadowSettings,
    ...gridTemplateRowsSettings,
    ...gapSettings,
    ...gridTemplateColumnsSettings,
    ...objectPositionSettings,
    ...opacitySettings,
    ...placeholderColorSettings,
    ...displaySettings,
    ...positionSettings,
    ...justifyContentSettings,
    ...alignItemsSettings,
    ...fontFamilySettings,
    ...letterSpacingSettings,
    ...fontSizeSettings,
    ...fontWeightSettings,
    ...lineHeightSettings,
    ...textColorSettings,
    ...zIndexSettings,
    ...borderRadiusSettings,
    ...backgroundColorSettings,
    ...paddingSettings,
    ...marginSettings,
    ...widthSettings,
    ...heightSettings,
    ...flexboxSettings,
  ]

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
        <h3>Settings for block</h3>
        <Accordion type="single" collapsible>
          {allSettings.map((setting) => (
            <AccordionItem key={setting.id} value={setting.id}>
              <AccordionTrigger>{setting.title}</AccordionTrigger>
              <AccordionContent>
                {renderSetting(setting, classNames, handleClassNameChange)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </SheetContent>
    </Sheet>
  )
}

export default BlocksDesign
