import { useController, UseFormReturn } from "react-hook-form";

import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { cn } from "@/utils/cn";
import { TextInputType } from "@/types/input-types";

type Props = {
  input: TextInputType;
  form: UseFormReturn<any>;
};

const TextInput = ({ form, input }: Props) => {
  const { defaultValue, ...props } = input.props || {};

  const { field, fieldState } = useController({
    name: input.name,
    control: form.control,
    defaultValue,
    rules: input?.rules,
  });

  return (
    <Field className="gap-1" data-invalid={fieldState.invalid}>
      {input?.label && (
        <FieldLabel className="text-framer-text-secondary pb-1 text-xs font-medium">
          {input.label}
        </FieldLabel>
      )}

      <Input
        {...field}
        value={field.value ?? ""}
        placeholder={input?.placeholder || ""}
        aria-invalid={fieldState.invalid}
        autoComplete="off"
        {...props}
        className={cn(
          "bg-framer-bg-tertiary text-framer-text !h-12 w-full text-sm font-medium",
          input.props?.className
        )}
        onWheel={(e) => e.currentTarget.blur()}
      />

      {fieldState.invalid && <FieldError className="mr-4 text-xs" errors={[fieldState.error]} />}

      {input.description && (
        <FieldDescription className="text-framer-text-tertiary text-xs font-medium">
          {input.description}
        </FieldDescription>
      )}
    </Field>
  );
};

export default TextInput;
