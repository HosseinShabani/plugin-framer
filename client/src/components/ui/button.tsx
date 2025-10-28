import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center gap-2 justify-center whitespace-nowrap px-3 h-[34px] rounded-[59px] text-sm font-medium transition-all cursor-pointer disabled:pointer-events-none disabled:opacity-50 disabled:select-none shrink-0  outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        contained: "text-sm font-semibold",
        ghost: "",
        outlined: "",
      },

      color: {
        primary: "text-primary-400",
        gray: "",
        secondary: "text-secondary",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
      transition: {
        true: "transition-all duration-300",
        false: "",
      },
    },
    defaultVariants: {
      variant: "contained",
      color: "primary",
      fullWidth: false,
    },
    compoundVariants: [
      {
        variant: "contained",
        color: "primary",
        className: "bg-primary-400 text-white hover:bg-primary-900",
      },
      {
        variant: "contained",
        color: "gray",
        className: "bg-framer-bg-tertiary hover:brightness-75 ",
      },
      {
        variant: "outlined",
        color: "gray",
        className:
          "bg-framer-bg-tertiary text-framer-text/65 hover:brightness-75 border border-framer-text-tertiary/50 ",
      },
      {
        variant: "outlined",
        color: "secondary",
        className: "bg-secondary/20 text-secondary hover:brightness-75 border border-secondary ",
      },

      {
        variant: "ghost",
        color: "primary",
        className: " hover:bg-primary-700/40",
      },
      {
        variant: "ghost",
        color: "gray",
        className: " hover:bg-framer-bg-tertiary",
      },
    ],
  }
);

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    fullWidth?: boolean;
    rightIcon?: React.ReactNode;
    leftIcon?: React.ReactNode;
    transition?: boolean;
  };

function Button({
  className,
  variant,
  color,
  fullWidth = false,
  rightIcon,
  leftIcon,
  children,
  transition,
  ...props
}: ButtonProps) {
  const Comp = "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, color, fullWidth, transition, className }))}
      {...props}
    >
      {leftIcon && <>{leftIcon}</>}
      {children}
      {rightIcon && <>{rightIcon}</>}
    </Comp>
  );
}

export { Button, buttonVariants };
