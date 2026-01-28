import { useController, UseFormReturn } from "react-hook-form";

import { SelectInputType } from "@/types/input-types";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "@/utils/cn";

type Props = {
  input: SelectInputType;
  form: UseFormReturn<any>;
};
const SelectInput = ({ form, input }: Props) => {
  const { defaultValue, ...props } = input.props || {};
  const { field, fieldState } = useController({
    name: input.name,
    control: form.control,
    defaultValue: defaultValue,
    rules: input?.rules,
  });

  return (
    <Field className="gap-1" data-invalid={fieldState.invalid}>
      {input?.label && (
        <FieldLabel className="text-framer-text-secondary pb-1 text-xs font-medium">
          {input.label}
        </FieldLabel>
      )}
      <Select name={field.name} value={field.value} onValueChange={field.onChange}>
        <SelectTrigger
          aria-invalid={fieldState.invalid}
          className={cn(
            "text-framer-text !h-12 w-full cursor-pointer text-sm font-medium",
            input.props?.className
          )}
          {...props}
        >
          <SelectValue placeholder={input.placeholder || ""} />
        </SelectTrigger>
        <SelectContent position="popper" className="bg-framer-bg-tertiary text-framer-text">
          <SelectGroup>
            {input.options?.map((option, i) => (
              <SelectItem disabled={option.disabled} key={i} value={option.value}>
                {option.title}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {fieldState.invalid && <FieldError className="mr-4 text-xs" errors={[fieldState.error]} />}
      {input.description && (
        <FieldDescription className="text-framer-text-tertiary text-xs font-medium">
          {input.description}
        </FieldDescription>
      )}
    </Field>
  );
};

export default SelectInput;
