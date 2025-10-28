import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const badgeVariants = cva(
  "flex h-4 w-fit items-center justify-center rounded-full px-1 text-[10px] font-medium text-white",
  {
    variants: {
      color: {
        primary: "bg-primary-400",
        secondary: "bg-secondary",
        default: "bg-framer-text-tertiary/30 text-framer-text",
      },
    },
    defaultVariants: {
      color: "default",
    },
  }
);

export type BadgeProps = React.ComponentProps<"div"> &
  VariantProps<typeof badgeVariants> & {
    text: string;
  };

const Badge = ({ text, color }: BadgeProps) => {
  return <div className={cn(badgeVariants({ color }))}>{text}</div>;
};
export { Badge, badgeVariants };
