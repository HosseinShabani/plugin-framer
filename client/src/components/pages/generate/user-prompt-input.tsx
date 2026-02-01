import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import { useController, UseFormReturn } from "react-hook-form";
import { Field, FieldError } from "@/components/ui/field";
import { useAiModalStore } from "@/context/ai-modal";
import { useShallow } from "zustand/shallow";

type Props = {
  form: UseFormReturn<any>;
};
const UserPromptInput = ({ form }: Props) => {
  const { toggle, ai } = useAiModalStore(useShallow((state) => state));

  const { field, fieldState } = useController({
    name: ai!.prompt.name,
    control: form.control,
    rules: ai?.prompt?.rules,
  });

  return (
    <Field data-invalid={fieldState.invalid}>
      <div className="bg-framer-text-tertiary/50 relative h-[114px] w-full rounded-[14px] p-0.5 transition-all duration-200 focus-within:bg-[linear-gradient(91.83deg,rgba(248,109,190,0.49)_5.83%,rgba(156,56,236,0.49)_44.85%,rgba(83,100,231,0.49)_77.37%,rgba(230,67,46,0.49)_98.87%)]">
        <div className="bg-framer-bg-tertiary flex h-full w-full items-center rounded-[12px] px-3.5 pt-2 pb-11">
          <textarea
            ref={field.ref}
            name={field.name}
            onBlur={field.onBlur}
            disabled={field.disabled}
            aria-invalid={fieldState.invalid}
            placeholder={ai?.prompt.placeholder ||
              "e.g. A cat is sitting on a table eating fish meet. We support all languages."}
            className="scrollArea placeholder:text-framer-text-secondary/60 h-full w-full resize-none border-none outline-0"
            onChange={(e) => {
              field.onChange(e);
            }}
            value={field.value}
            rows={5}
          />

          <div className="absolute bottom-3 left-3.5">
            <Button
              variant="outline"
              type="button"
              onClick={toggle}
              color="gray"
            >
              <span>{ai?.title}</span>
              <Icon name="chevron-down" className="stroke-framer-text size-2" />
            </Button>
          </div>
        </div>
      </div>

      {fieldState.invalid && (
        <FieldError
          className="-mt-2 mr-4 text-xs"
          errors={[fieldState.error]}
        />
      )}
    </Field>
  );
};

export default UserPromptInput;
