import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full px-2 py-0.5 text-[10px] font-medium w-fit whitespace-nowrap shrink-0 gap-1 transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        contained: "",
      },
      color: {
        primary: "",
        secondary: "",
        gray: "",
      },
    },
    defaultVariants: {
      variant: "contained",
      color: "primary",
    },

    compoundVariants: [
      {
        variant: "contained",
        color: "primary",
        className: " bg-primary text-primary-foreground",
      },
      {
        variant: "contained",
        color: "secondary",
        className: "bg-secondary text-secondary-foreground",
      },
      {
        variant: "contained",
        color: "gray",
        className: "bg-framer-text-tertiary text-framer-text-reversed ",
      },
    ],
  }
);

function Badge({
  className,
  variant,
  color,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, color }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
