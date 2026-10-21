import React from "react";
import { Sparkles } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface ScoreBadgeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  className?: string;
}

export const ScoreBadge: React.FC<ScoreBadgeProps> = ({
  score,
  size = "md",
  showIcon = true,
  className,
}) => {
  const isHigh = score >= 90;
  const isGood = score >= 80 && score < 90;

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs font-bold gap-1",
    md: "px-3 py-1 text-xs font-extrabold gap-1.5",
    lg: "px-4 py-1.5 text-sm font-extrabold gap-2",
  };

  return (
    <div
      className={twMerge(
        clsx(
          "inline-flex items-center rounded-full tracking-tight backdrop-blur-md shadow-sm transition-transform select-none",
          isHigh
            ? "bg-brand-lime text-brand-dark shadow-lime-glow"
            : isGood
            ? "bg-emerald-100 text-emerald-900 border border-emerald-200"
            : "bg-amber-100 text-amber-900 border border-amber-200",
          sizeClasses[size],
          className
        )
      )}
    >
      {showIcon && <Sparkles className="w-3.5 h-3.5 fill-current" />}
      <span>{Math.round(score)}% Match</span>
    </div>
  );
};
