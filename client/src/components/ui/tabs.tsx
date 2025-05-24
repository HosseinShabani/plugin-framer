import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/utils/cn";

type TabsProps = {
  className?: string;
  tabs: {
    label: string;
    content: React.ReactNode;
  }[];
};

export default function Tabs({ className, tabs }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={cn("mx-auto max-w-md", className)}>
      <div className="bg-framer-bg flex w-full gap-2 rounded-lg p-1">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={cn(
              "w-full cursor-pointer rounded-md px-4 py-2 font-medium transition-all focus:outline-none",
              i === activeTab
                ? "bg-framer-bg-tertiary text-framer-text"
                : "text-framer-text-tertiary bg-transparent"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-1.5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {tabs[activeTab].content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
