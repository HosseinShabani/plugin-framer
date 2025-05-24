import { cn } from "@/utils/cn";

export const DividerWithText = ({
  text,
  className,
}: {
  text: string | number;
  className?: string;
}) => (
  <div className={cn("flex w-full items-center", className)}>
    <div className="border-framer-text/20 flex-grow border-t" />
    <span className="text-framer-text-tertiary px-2 text-[10px] font-medium whitespace-nowrap">
      {text}
    </span>
    <div className="border-framer-text/20 flex-grow border-t" />
  </div>
);
