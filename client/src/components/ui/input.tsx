import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const inputVariants = cva(
  "inline-flex items-center px-3 bg-framer-bg-tertiary text-framer-text/85 hover:brightness-95 border-framer-text-tertiary/50 focus-within:border-framer-text h-12 w-full border rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 disabled:select-none outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
    },
    defaultVariants: {
      fullWidth: false,
    },
  }
);

export type InputProps = React.ComponentProps<"input"> &
  VariantProps<typeof inputVariants> & {
    fullWidth?: boolean;
    label?: string;
    helperText?: string;
    error?: boolean;
    errorText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
  };

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      fullWidth = false,
      label,
      helperText,
      error = false,
      errorText,
      leftIcon,
      rightIcon,
      ...props
    },
    ref
  ) => {
    const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
      // Prevent number input from changing value on scroll
      if (props.type === "number") {
        e.currentTarget.blur();
      }
    };

    return (
      <div className={cn("flex flex-col gap-1", fullWidth && "w-full")}>
        {label && <div className="text-framer-text text-xs font-medium">{label}</div>}
        <div className="relative">
          <div
            className={cn(
              inputVariants({ fullWidth, className }),
              error && "border-red-500 focus-visible:ring-red-500/50",
              leftIcon && "pl-10",
              rightIcon && "pr-10"
            )}
          >
            {leftIcon && (
              <div className="text-framer-text-tertiary absolute top-1/2 left-3 -translate-y-1/2">
                {leftIcon}
              </div>
            )}
            <input
              ref={ref}
              className={cn(
                "placeholder:text-framer-text-tertiary h-full w-full border-none bg-transparent outline-none",
                leftIcon && "pl-0",
                rightIcon && "pr-0"
              )}
              onWheel={handleWheel}
              {...props}
            />
            {rightIcon && (
              <div className="text-framer-text-tertiary absolute top-1/2 right-3 -translate-y-1/2">
                {rightIcon}
              </div>
            )}
          </div>
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

Input.displayName = "Input";

export { Input, inputVariants };
