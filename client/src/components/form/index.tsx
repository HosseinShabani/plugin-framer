import { cn } from "@/utils/cn";
import { UseFormReturn } from "react-hook-form";
import SelectInput from "./SelectInput";
import SwitchInput from "./SwitchInput";
import TextInput from "./TextInput";
import { INPUT_TYPE } from "@/types/input-types";
import ImageInput from "./ImageInput";

type Props = {
  className?: string;
  inputs: any[];
  form: UseFormReturn<any>;
};

const isDisabled = (input: any, form: UseFormReturn<any>) => {
  let disabled = false;
  if (input.disabledWhen) {
    if (input.disabledWhen.operator === "equals") {
      disabled = form.watch(input.disabledWhen.field) === input.disabledWhen.value;
    } else if (input.disabledWhen.operator === "notEquals") {
      disabled = form.watch(input.disabledWhen.field) !== input.disabledWhen.value;
    }
  }
  return disabled;
};

const FormInputs = ({ className, inputs, form }: Props) => {
  return (
    <div className={cn("grid grid-cols-1 gap-6", className)}>
      {inputs.map((input) => {
        let disabled = isDisabled(input, form);

        switch (input.type) {
          case INPUT_TYPE.SELECT:
            return (
              <SelectInput
                key={input.name}
                input={{
                  name: input.name,
                  options: input.options,
                  placeholder: input.placeholder,
                  description: input.description,
                  label: input.label,
                  props: {
                    defaultValue: input.default as string,
                    disabled,
                  },
                }}
                form={form}
              />
            );
          case INPUT_TYPE.SWITCH:
            return (
              <SwitchInput
                key={input.name}
                input={{
                  name: input.name,
                  label: input.label,
                  description: input.description,
                  props: {
                    defaultChecked: input?.default as boolean,
                    disabled,
                  },
                }}
                form={form}
              />
            );

          case INPUT_TYPE.TEXT:
            return (
              <TextInput
                key={input.name}
                input={{
                  name: input.name,
                  label: input.label,
                  description: input.description,
                  disabledWhen: input?.disabledWhen,
                  props: {
                    defaultValue: input.default as string,
                    type: "text",
                    disabled,
                  },
                  rules: input?.rules,
                }}
                form={form}
              />
            );

          case INPUT_TYPE.NUMBER:
            return (
              <TextInput
                key={input.name}
                input={{
                  name: input.name,
                  label: input.label,
                  description: input.description,
                  disabledWhen: input?.disabledWhen,
                  props: {
                    defaultValue: input.default as number | string,
                    type: "number",
                    disabled,
                  },
                  rules: input?.rules,
                }}
                form={form}
              />
            );

          case INPUT_TYPE.IMAGES:
            return <ImageInput key={input.name} input={input} form={form} />;
          default:
            break;
        }
      })}
    </div>
  );
};

export { FormInputs };
