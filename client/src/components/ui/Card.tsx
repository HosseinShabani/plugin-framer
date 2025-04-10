import React from "react";

interface CardProps {
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ title, children, footer, className = "" }) => {
  return (
    <div className={`border-framer-color-divider overflow-hidden rounded-md border ${className}`}>
      {title && (
        <div className="border-framer-color-divider border-b px-3 py-2 text-center text-sm font-bold">
          {title}
        </div>
      )}
      <div className="p-3">{children}</div>
      {footer && <div className="border-framer-color-divider border-t p-3">{footer}</div>}
    </div>
  );
};
