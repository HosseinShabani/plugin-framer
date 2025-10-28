import * as React from "react";
import { cn } from "@/utils/cn";

export interface SwitchProps extends Omit<React.ComponentProps<"button">, "onChange"> {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  helperText?: string;
  error?: boolean;
  errorText?: string;
  fullWidth?: boolean;
  disabled?: boolean;
}

export const SwitchInput = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className,
      checked,
      onChange,
      label,
      helperText,
      error = false,
      errorText,
      fullWidth = false,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const toggle = () => {
      if (disabled) return;
      onChange?.(!checked);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    };

    return (
      <div className={cn("flex flex-col gap-1", fullWidth && "w-full")}>
        {label && <div className="text-framer-text mb-0.5 text-xs font-medium">{label}</div>}
        <div className={cn("flex items-center", fullWidth && "w-full")}>
          <button
            ref={ref}
            type="button"
            role="switch"
            aria-checked={checked}
            aria-disabled={disabled}
            disabled={disabled}
            onClick={toggle}
            onKeyDown={handleKeyDown}
            className={cn(
              "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border transition-all",
              "focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none",
              checked
                ? "bg-primary-400 border-primary-400"
                : "bg-framer-bg-tertiary border-framer-text-tertiary/50",
              disabled && "pointer-events-none opacity-50",
              error && "border-red-500 ring-0",
              className
            )}
            {...props}
          >
            <span
              className={cn(
                "pointer-events-none my-auto block size-5 rounded-full bg-white shadow transition-transform",
                checked ? "translate-x-[22px]" : "translate-x-[2px]"
              )}
            />
          </button>
        </div>
        {(helperText || (error && errorText)) && (
          <span className={cn("text-[10px]", error ? "text-red-500" : "text-framer-text-tertiary")}>
            {error ? errorText : helperText}
          </span>
        )}
      </div>
    );
  }
);

SwitchInput.displayName = "SwitchInput";

export { SwitchInput as Switch };
