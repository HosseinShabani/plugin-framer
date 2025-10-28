import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/utils/cn";
import { Icon } from "./Icon";

const selectTriggerVariants = cva(
  "inline-flex items-center justify-between w-full rounded-lg text-sm font-medium transition-all cursor-pointer disabled:pointer-events-none disabled:opacity-50 disabled:select-none outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        outlined: "border",
        filled: "",
      },
      size: {
        default: "px-3 h-12",
        sm: "px-2 h-[28px] text-xs",
        lg: "px-4 h-[42px]",
      },
      color: {
        primary: "",
        gray: "",
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
    },
    defaultVariants: {
      variant: "outlined",
      size: "default",
      color: "gray",
      fullWidth: false,
    },
    compoundVariants: [
      {
        variant: "outlined",
        color: "gray",
        className:
          "bg-framer-bg-tertiary text-framer-text/85 hover:brightness-95 border-framer-text-tertiary/50",
      },
      {
        variant: "outlined",
        color: "primary",
        className:
          "bg-primary-400/10 text-primary-400 hover:bg-primary-400/20 border-primary-400/50",
      },
      {
        variant: "filled",
        color: "gray",
        className: "bg-framer-bg-tertiary text-framer-text/85 hover:brightness-95",
      },
      {
        variant: "filled",
        color: "primary",
        className: "bg-primary-400 text-white hover:bg-primary-900",
      },
    ],
  }
);

export interface SelectOption {
  value: string;
  label?: string;
  disabled?: boolean;
  item?: any;
}

export type SelectProps = Omit<React.ComponentProps<"div">, "onChange"> &
  VariantProps<typeof selectTriggerVariants> & {
    fullWidth?: boolean;
    label?: string;
    helperText?: string;
    error?: boolean;
    errorText?: string;
    leftIcon?: React.ReactNode;
    options: SelectOption[];
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
  };

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      className,
      variant,
      size,
      color,
      fullWidth = false,
      label,
      helperText,
      error = false,
      errorText,
      leftIcon,
      options,
      value,
      onChange,
      placeholder = "Select an option",
      disabled = false,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState<"bottom" | "top">("bottom");
    const triggerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((opt) => opt.value === value);
    const displayValue = selectedOption?.label || selectedOption?.item || placeholder;

    const toggleDropdown = () => {
      if (!disabled) {
        setIsOpen((prev) => !prev);
      }
    };

    const closeDropdown = () => setIsOpen(false);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeDropdown();
      }
    };

    const handleOutsideClick = (e: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node) &&
        contentRef.current &&
        !contentRef.current.contains(e.target as Node)
      ) {
        closeDropdown();
      }
    };

    useEffect(() => {
      if (isOpen) {
        // Calculate position when dropdown opens
        calculatePosition();

        // Add event listeners
        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("keydown", handleKeyDown);
      } else {
        // Remove event listeners
        document.removeEventListener("mousedown", handleOutsideClick);
        document.removeEventListener("keydown", handleKeyDown);
      }

      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [isOpen]);

    const handleSelectOption = (optionValue: string) => {
      onChange?.(optionValue);
      closeDropdown();
    };

    const calculatePosition = () => {
      if (!triggerRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - triggerRect.bottom;
      const spaceAbove = triggerRect.top;
      const dropdownHeight = 240; // max-h-[240px] from the dropdown

      // Show above if there's not enough space below and more space above
      if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
        setPosition("top");
      } else {
        setPosition("bottom");
      }
    };

    const contentVariants = {
      hidden: {
        opacity: 0,
        y: position === "top" ? 5 : -5,
        scale: 0.95,
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.2,
          ease: "easeOut",
        },
      },
      exit: {
        opacity: 0,
        y: position === "top" ? 5 : -5,
        scale: 0.95,
        transition: {
          duration: 0.15,
          ease: "easeIn",
        },
      },
    };

    return (
      <div ref={ref} className={cn("flex flex-col gap-1", fullWidth && "w-full")} {...props}>
        {label && <div className="text-framer-text mb-0.5 text-xs font-medium">{label}</div>}
        <div className="relative">
          <div
            ref={triggerRef}
            onClick={toggleDropdown}
            className={cn(
              selectTriggerVariants({
                variant,
                size,
                color,
                fullWidth,
                className,
              }),
              error && "border-red-500 focus-visible:ring-red-500/50",
              !selectedOption && "text-framer-text/50",
              isOpen && "brightness-95"
            )}
            role="button"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            tabIndex={disabled ? -1 : 0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleDropdown();
              }
            }}
          >
            {leftIcon && leftIcon}
            <span className={cn("flex-1 truncate text-left", leftIcon && "pl-2")}>
              {displayValue}
            </span>
            <Icon
              name="chevron-down"
              width={16}
              height={16}
              className={cn(
                "stroke-framer-text-secondary ml-2 size-2 transition-transform duration-200",
                isOpen && "rotate-180"
              )}
            />
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                ref={contentRef}
                className={cn(
                  "bg-framer-bg-secondary absolute left-0 z-50 w-full overflow-hidden rounded-lg shadow-[0px_4px_12px_3px] shadow-gray-600/30",
                  position === "top" ? "bottom-full mb-1" : "top-full mt-1"
                )}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={contentVariants}
                role="listbox"
              >
                <div className="scrollArea max-h-[240px] overflow-y-auto py-1">
                  {options.map((option) => (
                    <div
                      key={option.value}
                      className={cn(
                        "cursor-pointer px-3 py-2 text-sm transition-colors",
                        option.disabled
                          ? "cursor-not-allowed opacity-50"
                          : "hover:bg-framer-tint-dimmed",
                        option.value === value
                          ? "bg-framer-text/20 font-medium"
                          : "text-framer-text-secondary"
                      )}
                      onClick={() => {
                        if (!option.disabled) {
                          handleSelectOption(option.value);
                        }
                      }}
                      role="option"
                      aria-selected={option.value === value}
                      aria-disabled={option.disabled}
                    >
                      {option?.label && option.label}
                      {option?.item && option.item}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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

Select.displayName = "Select";

export { selectTriggerVariants };
