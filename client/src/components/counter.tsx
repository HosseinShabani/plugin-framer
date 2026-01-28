import { cn } from "@/utils/cn";
import { Icon } from "./icon";

interface CounterProps {
  max?: number;
  min?: number;
  count: number;
  onChange: (count: number) => void;
}

export const Counter = ({ max = 10, min = 1, count, onChange }: CounterProps) => {
  return (
    <div className="border-framer-text-tertiary/50 flex h-12 min-w-[116px] items-center justify-between rounded-[59px] border px-6 select-none">
      <Icon
        onClick={() => onChange(Math.max(min, count - 1))}
        name="minus"
        className={cn(
          "stroke-framer-text-tertiary hover:stroke-framer-text-tertiary/50 size-4 cursor-pointer transition-all duration-300",
          count === min && "pointer-events-none cursor-not-allowed opacity-50"
        )}
      />
      <span className="text-framer-text-secondary text-base font-semibold">{count}</span>
      <Icon
        onClick={() => onChange(Math.min(max, count + 1))}
        name="add"
        className={cn(
          "stroke-framer-text-tertiary hover:stroke-framer-text-tertiary/50 size-4 cursor-pointer transition-all duration-300",
          count === max && "pointer-events-none cursor-not-allowed opacity-50"
        )}
      />
    </div>
  );
};
