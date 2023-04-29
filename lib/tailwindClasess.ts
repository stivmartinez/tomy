import defaultTheme from "tailwindcss/defaultTheme";

function safeObjectKeys(obj: object | undefined): string[] {
  if (typeof obj === 'object' && obj !== null) {
    return Object.keys(obj);
  }
  return [];
}

const tailwindZIndices = safeObjectKeys(defaultTheme.zIndex);
const tailwindBorderRadius = safeObjectKeys(defaultTheme.borderRadius);
const tailwindBackgroundColors = safeObjectKeys(defaultTheme.backgroundColor);
const tailwindFontSizes = safeObjectKeys(defaultTheme.fontSize);
const tailwindPadding = safeObjectKeys(defaultTheme.spacing);
const tailwindMargin = safeObjectKeys(defaultTheme.spacing);
const tailwindWidth = safeObjectKeys(defaultTheme.spacing);
const tailwindHeight = safeObjectKeys(defaultTheme.spacing);
const tailwindTextColor = safeObjectKeys(defaultTheme.textColor);
const tailwindFlexbox = safeObjectKeys(defaultTheme.flex);
const tailwindFontWeight = safeObjectKeys(defaultTheme.fontWeight);
const tailwindLineHeight = safeObjectKeys(defaultTheme.lineHeight);
const tailwindFontFamily = safeObjectKeys(defaultTheme.fontFamily);
const tailwindLetterSpacing = safeObjectKeys(defaultTheme.letterSpacing);
const tailwindDisplay = safeObjectKeys(defaultTheme.display);
const tailwindPosition = safeObjectKeys(defaultTheme.position);
const tailwindJustifyContent = safeObjectKeys(defaultTheme.justifyContent);
const tailwindAlignItems = safeObjectKeys(defaultTheme.alignItems);
const tailwindGridTemplateColumns = safeObjectKeys(defaultTheme.gridTemplateColumns);
const tailwindGridTemplateRows = safeObjectKeys(defaultTheme.gridTemplateRows);
const tailwindGap = safeObjectKeys(defaultTheme.spacing);
const tailwindObjectPosition = safeObjectKeys(defaultTheme.objectPosition);
const tailwindOpacity = safeObjectKeys(defaultTheme.opacity);
const tailwindPlaceholderColor = safeObjectKeys(defaultTheme.colors);
const tailwindRotate = safeObjectKeys(defaultTheme.rotate);
const tailwindScale = safeObjectKeys(defaultTheme.scale);
const tailwindSkew = safeObjectKeys(defaultTheme.skew);
const tailwindTranslate = safeObjectKeys(defaultTheme.spacing);
const tailwindBoxShadow = safeObjectKeys(defaultTheme.boxShadow);

export const rotateSettings = [
  {
    id: "rotate",
    title: "Rotate",
    settingPrefix: ["rotate-", "md:rotate-"],
    options: tailwindRotate,
  },
];

export const scaleSettings = [
  {
    id: "scale",
    title: "Scale",
    settingPrefix: ["scale-", "md:scale-"],
    options: tailwindScale,
  },
];

export const skewSettings = [
  {
    id: "skew",
    title: "Skew",
    settingPrefix: ["skew-", "md:skew-"],
    options: tailwindSkew,
  },
];

export const translateSettings = [
  {
    id: "translate",
    title: "Translate",
    settingPrefix: ["translate-", "md:translate-"],
    options: tailwindTranslate,
  },
];

export const boxShadowSettings = [
  {
    id: "box-shadow",
    title: "Box Shadow",
    settingPrefix: ["shadow-", "md:shadow-"],
    options: tailwindBoxShadow,
  },
];

export const gridTemplateRowsSettings = [
  {
    id: "grid-template-rows",
    title: "Grid Template Rows",
    settingPrefix: ["grid-rows-", "md:grid-rows-"],
    options: tailwindGridTemplateRows,
  },
];

export const gapSettings = [
  {
    id: "gap",
    title: "Gap",
    settingPrefix: ["gap-", "md:gap-"],
    options: tailwindGap,
  },
];

export const objectPositionSettings = [
  {
    id: "object-position",
    title: "Object Position",
    settingPrefix: ["object-", "md:object-"],
    options: tailwindObjectPosition,
  },
];

export const opacitySettings = [
  {
    id: "opacity",
    title: "Opacity",
    settingPrefix: ["opacity-", "md:opacity-"],
    options: tailwindOpacity,
  },
];

export const placeholderColorSettings = [
  {
    id: "placeholder-color",
    title: "Placeholder Color",
    settingPrefix: ["placeholder-", "md:placeholder-"],
    options: tailwindPlaceholderColor,
  },
];

export const displaySettings = [
  {
    id: "display",
    title: "Display",
    settingPrefix: ["", "md:"],
    options: tailwindDisplay,
  },
];

export const positionSettings = [
  {
    id: "position",
    title: "Position",
    settingPrefix: ["", "md:"],
    options: tailwindPosition,
  },
];

export const justifyContentSettings = [
  {
    id: "justify-content",
    title: "Justify Content",
    settingPrefix: ["justify-", "md:justify-"],
    options: tailwindJustifyContent,
  },
];

export const alignItemsSettings = [
  {
    id: "align-items",
    title: "Align Items",
    settingPrefix: ["items-", "md:items-"],
    options: tailwindAlignItems,
  },
];

export const gridTemplateColumnsSettings = [
  {
    id: "grid-template-columns",
    title: "Grid Template Columns",
    settingPrefix: ["grid-cols-", "md:grid-cols-"],
    options: tailwindGridTemplateColumns,
  },
];

export const fontFamilySettings = [
  {
    id: "font-family",
    title: "Font Family",
    settingPrefix: ["font-", "md:font-"],
    options: tailwindFontFamily,
  },
];

export const letterSpacingSettings = [
  {
    id: "letter-spacing",
    title: "Letter Spacing",
    settingPrefix: ["tracking-", "md:tracking-"],
    options: tailwindLetterSpacing,
  },
];

export const zIndexSettings = [
  {
    id: "z-index",
    title: "Z-Index",
    settingPrefix: ["z-", "md:z-"],
    options: tailwindZIndices,
  },
];

export const borderRadiusSettings = [
  {
    id: "border-radius",
    title: "Border Radius",
    settingPrefix: ["rounded-", "md:rounded-"],
    options: tailwindBorderRadius,
  },
];

export const backgroundColorSettings = [
  {
    id: "background-color",
    title: "Background Color",
    settingPrefix: ["bg-", "md:bg-"],
    options: tailwindBackgroundColors,
  },
];

export const fontSizeSettings = [
  {
    id: "font-size",
    title: "Font Size",
    settingPrefix: ["text-", "md:text-"],
    options: tailwindFontSizes,
  },
];

export const paddingSettings = [
  {
    id: "padding",
    title: "Padding",
    settingPrefix: ["p-", "md:p-"],
    options: tailwindPadding,
  },
];

export const marginSettings = [
  {
    id: "margin",
    title: "Margin",
    settingPrefix: ["m-", "md:m-"],
    options: tailwindMargin,
  },
];

export const widthSettings = [
  {
    id: "width",
    title: "Width",
    settingPrefix: ["w-", "md:w-"],
    options: tailwindWidth,
  },
];

export const heightSettings = [
  {
    id: "height",
    title: "Height",
    settingPrefix: ["h-", "md:h-"],
    options: tailwindHeight,
  },
];

export const textColorSettings = [
  {
    id: "text-color",
    title: "Text Color",
    settingPrefix: ["text-", "md:text-"],
    options: tailwindTextColor,
  },
];

export const flexboxSettings = [
  {
    id: "flexbox",
    title: "Flexbox",
    settingPrefix: ["flex-", "md:flex-"],
    options: tailwindFlexbox,
  },
];

export const fontWeightSettings = [
  {
    id: "font-weight",
    title: "Font Weight",
    settingPrefix: ["font-", "md:font-"],
    options: tailwindFontWeight,
  },
];

export const lineHeightSettings = [
  {
    id: "line-height",
    title: "Line Height",
    settingPrefix: ["leading-", "md:leading-"],
    options: tailwindLineHeight,
  },
];
