import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all cursor-pointer disabled:pointer-events-none disabled:opacity-50 disabled:select-none shrink-0  outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        contained: "text-sm font-semibold",
        ghost: "",
      },
      size: {
        default: "px-3 h-[34px] rounded-[59px]",
        sm: "size-6 rounded-[59px]",
      },
      color: {
        primary: "text-primary-400",
        gray: "",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "contained",
      size: "default",
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
        variant: "ghost",
        color: "primary",
        className: " hover:bg-primary-700/40",
      },
      {
        variant: "ghost",
        color: "gray",
        className: " hover:bg-framer-bg",
      },
    ],
  }
);

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    fullWidth?: boolean;
    rightIcon?: React.ReactNode;
    leftIcon?: React.ReactNode;
  };

function Button({
  className,
  variant,
  size,
  color,
  fullWidth = false,
  rightIcon,
  leftIcon,
  children,
  ...props
}: ButtonProps) {
  const Comp = "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, color, fullWidth, className }))}
      {...props}
    >
      {leftIcon && <>{leftIcon}</>}
      {children}
      {rightIcon && <>{rightIcon}</>}
    </Comp>
  );
}

export { Button, buttonVariants };
