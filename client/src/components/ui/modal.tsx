import { ReactNode, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { createPortal } from "react-dom";
import { cn } from "@/utils/cn";

interface DropdownProps {
  children: ReactNode;
  show: boolean;
  onClose: () => void;
  contentClassName?: string;
}

export default function Modal({ children, onClose, show, contentClassName }: DropdownProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (show) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [show]);

  const contentVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.15, ease: "easeIn" },
    },
  };

  return (
    <>
      {show &&
        typeof window !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {show && (
              <>
                {/* Overlay */}
                <motion.div
                  key="modal-overlay"
                  className="fixed inset-0 z-[900] bg-black/80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                {/* Modal Content */}
                <motion.div
                  key="modal-content"
                  ref={modalRef}
                  className={cn(
                    "fixed top-1/2 left-1/2 z-[1000] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg bg-[var(--framer-color-bg-secondary)] shadow-lg",
                    contentClassName
                  )}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={contentVariants}
                >
                  {children}
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
