import React, { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface PillInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  rightAction?: React.ReactNode;
  error?: string;
  label?: string;
  isPassword?: boolean;
}

export const PillInput = forwardRef<HTMLInputElement, PillInputProps>(
  ({ icon, rightAction, error, label, isPassword = false, type = "text", className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const resolvedType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-xs font-semibold text-brand-dark px-2">{label}</label>
        )}
        <div
          className={twMerge(
            clsx(
              "relative flex items-center w-full bg-brand-input rounded-full transition-all duration-200 border border-transparent focus-within:border-brand-dark/20 focus-within:bg-white focus-within:shadow-sm",
              error && "border-red-400 bg-red-50/50"
            )
          )}
        >
          {icon && (
            <div className="pl-4 pr-1 text-brand-muted flex items-center pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            type={resolvedType}
            className={twMerge(
              clsx(
                "w-full bg-transparent py-3.5 text-sm font-medium text-brand-dark placeholder:text-[#9CA3AF] focus:outline-none",
                icon ? "pl-2" : "pl-5",
                isPassword || rightAction ? "pr-12" : "pr-5",
                className
              )
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 text-brand-muted hover:text-brand-dark transition-colors p-1"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          )}
          {rightAction && !isPassword && (
            <div className="absolute right-3 flex items-center">{rightAction}</div>
          )}
        </div>
        {error && <span className="text-xs text-red-500 font-medium px-4">{error}</span>}
      </div>
    );
  }
);

PillInput.displayName = "PillInput";
