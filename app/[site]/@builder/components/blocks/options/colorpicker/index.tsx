import { Label } from "@/components/ui/label"

const ColorPicker = ({
  prefix,
  icon,
  defaultValues,
  handleClassNameChange,
  options,
}: any) => {
  return (
    <div className="relative flex w-full flex-row items-start gap-4">
      <Label className="relative top-2 text-sm">{icon}</Label>
      <div className="flex w-full snap-x gap-2 overflow-x-auto pb-4 pt-1">
        {Object.keys(options).map((colorGroup) =>
          options[colorGroup].map((colorClass: any) => (
            <div key={colorClass} className={`snap-center`}>
              <button
                // eslint-disable-next-line tailwindcss/classnames-order
                className={`bg-${colorClass} flex h-6 w-6 rounded-md ${
                  defaultValues[prefix] === colorClass
                    ? "ring-2 ring-offset-2 ring-slate-500"
                    : ""
                }`}
                onClick={() => handleClassNameChange(colorClass, prefix)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ColorPicker
