type ColorShades = string[]

type TailwindColors = {
  [colorName: string]: ColorShades;
}

const colorNames = [
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'fuchsia',
  'purple',
  'pink',
  'rose',
];

const createColorShades = (colorName: any) => {
  return Array.from({ length: 10 }, (_, i) => `${colorName}-${(i + 1) * 100}`);
};

const tailwindColors = colorNames.reduce<TailwindColors>((acc, colorName) => {
  acc[colorName] = createColorShades(colorName);
  return acc;
}, {});

export { tailwindColors }
