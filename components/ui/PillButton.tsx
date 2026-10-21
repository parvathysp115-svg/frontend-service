import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface PillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "lime" | "dark" | "outline" | "ghost" | "circle-dark" | "circle-lime" | "circle-white";
  size?: "sm" | "md" | "lg" | "icon" | "icon-lg";
  children?: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
}

export const PillButton: React.FC<PillButtonProps> = ({
  variant = "lime",
  size = "md",
  children,
  icon,
  iconPosition = "left",
  isLoading = false,
  className,
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-bold tracking-tight transition-all duration-200 active:scale-95 select-none focus:outline-none disabled:opacity-50 disabled:pointer-events-none";

  const variantStyles = {
    lime: "bg-brand-lime text-brand-dark hover:bg-brand-lime-hover shadow-lime-glow font-extrabold",
    dark: "bg-brand-dark text-white hover:bg-black font-semibold",
    outline: "border border-brand-border bg-white text-brand-dark hover:bg-brand-surface",
    ghost: "bg-transparent text-brand-muted hover:text-brand-dark hover:bg-brand-surface",
    "circle-dark": "bg-brand-dark text-white hover:bg-black rounded-full shadow-md",
    "circle-lime": "bg-brand-lime text-brand-dark hover:bg-brand-lime-hover rounded-full shadow-lime-glow",
    "circle-white": "bg-white text-brand-dark hover:bg-brand-surface rounded-full shadow-sm border border-brand-border",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-xs rounded-full gap-1.5",
    md: "px-6 py-3.5 text-sm rounded-full gap-2",
    lg: "px-8 py-4 text-base rounded-full gap-2.5",
    icon: "w-12 h-12 rounded-full p-0 flex items-center justify-center",
    "icon-lg": "w-14 h-14 rounded-full p-0 flex items-center justify-center",
  };

  return (
    <button
      className={twMerge(
        clsx(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          isLoading && "cursor-wait opacity-80",
          className
        )
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {children}
        </span>
      ) : (
        <>
          {icon && iconPosition === "left" && <span className="flex-shrink-0">{icon}</span>}
          {children && <span>{children}</span>}
          {icon && iconPosition === "right" && <span className="flex-shrink-0">{icon}</span>}
        </>
      )}
    </button>
  );
};
