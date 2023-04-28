import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const Picker = ({
  prefix,
  icon,
  defaultValues,
  handleClassNameChange,
  options,
}: any) => {
  return (
    <div className="relative flex w-full flex-row items-start gap-4">
      <Label className="relative top-2 text-sm">{icon}</Label>
      <RadioGroup
        defaultValue={defaultValues}
        onValueChange={(event) => handleClassNameChange(event, prefix)}
        className="flex w-full snap-x gap-4 overflow-x-auto pb-4"
      >
        {options.map((option: any) => {
          return (
            <div key={option} className={`snap-center`}>
              <div className="mt-2 flex items-center space-x-2 whitespace-nowrap">
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option}>{option}</Label>
              </div>
            </div>
          )
        })}
      </RadioGroup>
    </div>
  )
}

export default Picker
