import { useController, UseFormReturn } from "react-hook-form";

import { SwitchInputType } from "@/types/input-types";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Switch } from "../ui/switch";

type Props = {
  input: SwitchInputType;
  form: UseFormReturn<any>;
};
const SwitchInput = ({ form, input }: Props) => {
  const { field, fieldState } = useController({
    name: input.name,
    control: form.control,
    defaultValue: input.props?.defaultChecked,
    rules: input?.rules,
  });

  return (
    <Field className="gap-1" data-invalid={fieldState.invalid}>
      {input?.label && (
        <FieldLabel className="text-framer-text-secondary pb-1 text-xs font-medium">
          {input.label}
        </FieldLabel>
      )}
      <div className="flex">
        <Switch
          id={field.name}
          checked={field.value}
          onCheckedChange={field.onChange}
          aria-invalid={fieldState.invalid}
          {...input.props}
        />
      </div>
      {fieldState.invalid && <FieldError className="mr-4 text-xs" errors={[fieldState.error]} />}
      {input.description && (
        <FieldDescription className="text-framer-text-tertiary text-xs font-medium">
          {input.description}
        </FieldDescription>
      )}
    </Field>
  );
};

export default SwitchInput;
