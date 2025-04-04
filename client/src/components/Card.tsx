import React from "react";

interface CardProps {
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  children,
  footer,
  className = "",
}) => {
  return (
    <div
      className={`border border-[#E6E6E6] rounded-md overflow-hidden ${className}`}
    >
      {title && (
        <div className="border-b border-[#E6E6E6] px-3 py-2 font-medium bg-[#F8F8F8]">
          {title}
        </div>
      )}
      <div className="p-3">{children}</div>
      {footer && (
        <div className="border-t border-[#E6E6E6] p-3 bg-[#F8F8F8]">
          {footer}
        </div>
      )}
    </div>
  );
};

interface ColorSwatchProps {
  color: string;
  label?: string;
}

export const ColorSwatch: React.FC<ColorSwatchProps> = ({ color, label }) => {
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-6 h-6 rounded border border-[#E6E6E6]"
        style={{ backgroundColor: color }}
      />
      {label && <span className="text-xs">{label}</span>}
    </div>
  );
};
