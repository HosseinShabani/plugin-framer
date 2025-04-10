import React from "react";

type ButtonVariant = "primary" | "secondary"| "tertiary";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-framer-tint-dark text-framer-text-reversed ",
  secondary: "bg-framer-tint-dimmed",
  tertiary: "bg-framer-bg-secondary",
};
const baseClasses =
  "flex items-center justify-center gap-2 text-sm px-4 py-2 rounded font-medium transition-all ";

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  isLoading = false,
  icon,
  fullWidth = false,
  disabled,
  className = "",
  ...props
}) => {
  const classes = [
    baseClasses,
    variantClasses[variant],
    fullWidth ? "w-full" : "",
    isLoading ? "opacity-70 cursor-not-allowed" : "cursor-pointer",
    className,
  ]
    .join(" ")
    .trim();

  return (
    <button className={classes} disabled={disabled || isLoading} {...props}>
      {isLoading ? (
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : icon ? (
        <span className="mr-1">{icon}</span>
      ) : null}
      {children}
    </button>
  );
};
