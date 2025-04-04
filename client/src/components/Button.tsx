import React from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

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
  const baseClasses =
    "framer-button flex items-center justify-center gap-2 text-sm px-4 py-2 rounded font-medium transition-all";

  const variantClasses = {
    primary: "framer-button-primary",
    secondary: "framer-button-secondary",
    ghost: "framer-button-ghost",
  };

  const classes = [
    baseClasses,
    variantClasses[variant],
    fullWidth ? "w-full" : "",
    isLoading ? "opacity-70 cursor-not-allowed" : "",
    className,
  ]
    .join(" ")
    .trim();

  return (
    <button className={classes} disabled={disabled || isLoading} {...props}>
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : icon ? (
        <span className="mr-1">{icon}</span>
      ) : null}
      {children}
    </button>
  );
};
