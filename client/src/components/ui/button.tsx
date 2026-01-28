import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center px-4 gap-2 cursor-pointer whitespace-nowrap rounded-full text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 disabled:bg-framer-bg-secondary disabled:text-framer-text-secondary [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        contained: "",
        outline: "",
        text: "",
      },
      color: {
        default: "",
        primary: "",
        secondary: "",
        destructive: "",
        gray: "",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
      size: {
        default: "h-[34px] text-sm font-semibold",
        sm: "h-8  text-xs font-medium",
        lg: "h-12  text-base font-semibold",
        icon: "p-0 size-[34px]",
        "icon-sm": "p-0 size-6",
      },
    },
    defaultVariants: {
      variant: "contained",
      size: "default",
      color: "primary",
      fullWidth: false,
    },

    compoundVariants: [
      // contained
      {
        variant: "contained",
        color: "primary",
        className: "bg-primary text-primary-foreground hover:bg-primary-900 ",
      },
      {
        variant: "contained",
        color: "gray",
        className: "bg-framer-bg-tertiary text-framer-text hover:brightness-75 ",
      },

      // text
      {
        variant: "text",
        color: "default",
        className: "text-framer-text hover:text-framer-text-secondary hover:bg-framer-bg-secondary",
      },
      {
        variant: "text",
        color: "gray",
        className: " hover:bg-framer-bg-tertiary",
      },

      // outline
      {
        variant: "outline",
        color: "destructive",
        className:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
      },
      {
        variant: "outline",
        color: "secondary",
        className: "bg-secondary/10 border border-secondary text-secondary hover:bg-secondary/30",
      },
      {
        variant: "outline",
        color: "gray",
        className:
          "bg-framer-bg-tertiary text-framer-text/65 hover:brightness-75 border border-framer-text-tertiary/50 ",
      },
    ],
  }
);

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
  };

function Button({
  className,
  variant,
  size,
  color,
  fullWidth,
  disabled,
  children,
  asChild = false,
  loading = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, color, fullWidth, className }))}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg
          className="size-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        children
      )}
    </Comp>
  );
}

export { Button, buttonVariants };
