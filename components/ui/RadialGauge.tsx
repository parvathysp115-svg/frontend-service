"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface RadialGaugeProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
}

export const RadialGauge: React.FC<RadialGaugeProps> = ({
  score,
  size = 140,
  strokeWidth = 12,
  label = "ATS Score",
  sublabel = "Optimization Level",
}) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 150);
    return () => clearTimeout(timer);
  }, [score]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  const getStatusText = (val: number) => {
    if (val >= 90) return "Top 3% Candidate";
    if (val >= 80) return "High ATS Match";
    if (val >= 70) return "Good Baseline";
    return "Needs Optimization";
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        {/* SVG Gauge */}
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background track circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E5E7EB"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeLinecap="round"
          />
          {/* Animated active lime progress */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#CEF238"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            strokeLinecap="round"
            className="filter drop-shadow-[0_2px_8px_rgba(206,242,56,0.5)]"
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.span
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl font-black text-brand-dark tracking-tighter"
          >
            {score}%
          </motion.span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">
            {label}
          </span>
        </div>
      </div>

      <div className="mt-2 text-center">
        <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-brand-dark text-brand-lime">
          {getStatusText(score)}
        </span>
      </div>
    </div>
  );
};
