import React, { useState, useRef, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { createPortal } from "react-dom";
import { cn } from "@/utils/cn";
import { Button, ButtonProps } from "./button";

interface DropdownProps {
  trigger: ReactNode | ((isOpen: boolean) => ReactNode);
  children: ReactNode | ((toggleDropdown: () => void) => ReactNode);
  align?: "left" | "right" | "center";
  side?: "top" | "bottom";
  offset?: number;
  className?: string;
  contentClassName?: string;
}

export function Dropdown({
  trigger,
  children,
  align = "left",
  side = "bottom",
  offset = 4,
  className = "",
  contentClassName = "",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const closeDropdown = () => setIsOpen(false);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeDropdown();
    }
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node) &&
      contentRef.current &&
      !contentRef.current.contains(e.target as Node)
    ) {
      closeDropdown();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Calculate dropdown content position
  const getDropdownContentStyle = () => {
    if (!triggerRef.current) return {};

    const triggerRect = triggerRef.current.getBoundingClientRect();

    let left = 0;
    if (align === "left") {
      left = triggerRect.left;
    } else if (align === "right") {
      left = triggerRect.right;
    } else if (align === "center") {
      left = triggerRect.left + triggerRect.width / 2;
    }

    // Position based on the side prop
    return {
      position: "fixed" as const,
      // If side is top, position above the trigger element with offset
      ...(side === "bottom"
        ? { top: triggerRect.bottom + window.scrollY + offset }
        : {
            bottom: window.innerHeight - triggerRect.top + window.scrollY + offset,
          }),
      // left: 35,
      left: align === "right" ? "auto" : left + window.scrollX,
      // right: 35,
      right: align === "right" ? window.innerWidth - left - window.scrollX : "auto",

      zIndex: 1000,
    };
  };

  // Animation variants for the dropdown content
  const contentVariants = {
    hidden: {
      opacity: 0,
      y: side === "bottom" ? -5 : 5,
      x: align === "center" ? "-50%" : "0",
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: align === "center" ? "-50%" : "0",
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: side === "bottom" ? -5 : 5,
      x: align === "center" ? "-50%" : "0",
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: "easeIn",
      },
    },
  };

  return (
    <div ref={dropdownRef} className={cn("relative inline-block", className)}>
      <div
        ref={triggerRef}
        onClick={toggleDropdown}
        className="h-full cursor-pointer"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {typeof trigger === "function" ? trigger(isOpen) : trigger}
      </div>

      {isOpen &&
        typeof window !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <>
                <motion.div
                  key="dropdown-content"
                  ref={contentRef}
                  className={cn(
                    "overflow-hidden rounded-lg bg-[var(--framer-color-bg-secondary)] shadow-lg",
                    contentClassName
                  )}
                  style={getDropdownContentStyle()}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={contentVariants}
                >
                  {typeof children === "function" ? children(toggleDropdown) : children}
                </motion.div>
                <motion.div
                  key="dropdown-overlay"
                  className="absolute inset-0 z-[900] bg-black/40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}

// Optional export for dropdown items to keep styling consistent
export function DropdownItem({
  children,
  onClick,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <div
      className={`flex cursor-pointer items-center gap-1 !px-4 !py-2 text-xs font-medium text-[var(--framer-color-text-secondary)] hover:bg-[var(--framer-color-bg-tertiary)] ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export const DropdownTriggerButton: React.FC<
  ButtonProps & {
    isOpen?: boolean;
  }
> = ({ children, isOpen, className, ...props }) => {
  return (
    <Button
      variant="contained"
      color="gray"
      {...props}
      className={cn(className, isOpen ? "relative z-[9999] brightness-90" : "")}
    >
      {children}
    </Button>
  );
};
