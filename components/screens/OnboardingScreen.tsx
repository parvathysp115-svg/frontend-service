"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Briefcase, Zap, Compass, CheckCircle2 } from "lucide-react";
import { useAppStore } from "../../stores/useAppStore";
import { PillButton } from "../ui/PillButton";

const slides = [
  {
    id: 1,
    title: "Find your dream job now Here",
    subtitle:
      "Explore curated high-impact opportunities tailored by our proprietary multi-dimensional matching agent.",
    icon: Briefcase,
    accent: "bg-amber-100 text-amber-900",
    badge: "AI Powered Matching",
    illustration: (
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Abstract vector illustration */}
        <div className="absolute w-52 h-52 rounded-full bg-brand-lime/40 blur-xl" />
        <div className="relative w-48 h-48 bg-white rounded-3xl shadow-xl p-5 border border-brand-border flex flex-col justify-between transform -rotate-3 hover:rotate-0 transition-transform">
          <div className="flex items-center justify-between">
            <span className="w-10 h-10 rounded-2xl bg-brand-lime flex items-center justify-center font-black text-brand-dark">
              Fi
            </span>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-brand-dark text-brand-lime">
              98% Fit
            </span>
          </div>
          <div>
            <div className="w-24 h-3 bg-brand-dark rounded-full mb-2" />
            <div className="w-36 h-2.5 bg-gray-200 rounded-full mb-1" />
            <div className="w-28 h-2 bg-gray-100 rounded-full" />
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <span className="text-xs font-black text-brand-dark">$85k - $120k</span>
            <span className="w-6 h-6 rounded-full bg-brand-dark flex items-center justify-center text-white text-xs">
              →
            </span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: "Easy To Apply on Mobile App",
    subtitle:
      "1-tap apply with agent-optimized STAR resumes, automated tailoring, and zero repetitive cover letters.",
    icon: Zap,
    accent: "bg-blue-100 text-blue-900",
    badge: "1-Tap AI Tailoring",
    illustration: (
      <div className="relative w-64 h-64 flex items-center justify-center">
        <div className="absolute w-52 h-52 rounded-full bg-purple-200 blur-xl" />
        <div className="relative w-52 h-44 bg-white rounded-3xl shadow-xl p-5 border border-brand-border flex flex-col justify-between transform rotate-2 hover:rotate-0 transition-transform">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-brand-dark">STAR Rewriter</p>
              <p className="text-[10px] text-brand-muted">Metrics & Active Voice</p>
            </div>
          </div>
          <div className="bg-brand-surface p-2.5 rounded-2xl border border-brand-border">
            <p className="text-[11px] font-medium text-brand-dark leading-snug">
              "Spearheaded redesign for 1.2M users, lifting conversion by 34%."
            </p>
          </div>
          <div className="flex justify-end">
            <span className="text-[10px] font-black uppercase text-brand-dark bg-brand-lime px-3 py-1 rounded-full">
              Accepted
            </span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: "Over 4,000 Jobs waiting For you",
    subtitle:
      "Top tech companies and innovative startups actively seeking high-caliber design and engineering talent.",
    icon: Compass,
    accent: "bg-emerald-100 text-emerald-900",
    badge: "Direct Recruiter Inbox",
    illustration: (
      <div className="relative w-64 h-64 flex items-center justify-center">
        <div className="absolute w-52 h-52 rounded-full bg-brand-lime/30 blur-xl" />
        <div className="relative flex flex-col gap-2.5">
          <div className="w-52 bg-white rounded-2xl shadow-lg p-3 border border-brand-border flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-500 text-white font-bold flex items-center justify-center text-xs">
              Ab
            </div>
            <div className="flex-1">
              <p className="text-xs font-extrabold text-brand-dark">Airbnb</p>
              <p className="text-[10px] text-brand-muted">Senior Product Designer</p>
            </div>
            <span className="text-[10px] font-extrabold text-brand-dark bg-brand-lime px-2 py-0.5 rounded-full">
              94%
            </span>
          </div>
          <div className="w-52 bg-white rounded-2xl shadow-lg p-3 border border-brand-border flex items-center gap-3 ml-4">
            <div className="w-9 h-9 rounded-xl bg-brand-dark text-brand-lime font-bold flex items-center justify-center text-xs">
              Ln
            </div>
            <div className="flex-1">
              <p className="text-xs font-extrabold text-brand-dark">Linear</p>
              <p className="text-[10px] text-brand-muted">Lead UX Architect</p>
            </div>
            <span className="text-[10px] font-extrabold text-brand-dark bg-brand-lime px-2 py-0.5 rounded-full">
              91%
            </span>
          </div>
        </div>
      </div>
    ),
  },
];

export const OnboardingScreen: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { setScreen } = useAppStore();

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setScreen("auth");
    }
  };

  const handleSkip = () => {
    setScreen("auth");
  };

  const slide = slides[currentIndex];

  return (
    <div className="relative w-full h-full min-h-[750px] bg-white flex flex-col justify-between p-6 select-none">
      {/* Top Bar with Fineed Wordmark */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-xl bg-brand-lime flex items-center justify-center font-black text-brand-dark text-sm">
            Fi
          </span>
          <span className="text-lg font-black text-brand-dark tracking-tight">Fineed</span>
        </div>
        <span className="text-xs font-bold px-3 py-1 bg-brand-surface rounded-full text-brand-muted border border-brand-border">
          Step {currentIndex + 1} of 3
        </span>
      </div>

      {/* Main Illustration Area */}
      <div className="flex-1 flex flex-col items-center justify-center my-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -15 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="flex flex-col items-center text-center"
          >
            {/* Vector Illustration */}
            <div className="mb-6">{slide.illustration}</div>

            {/* Pill Tag */}
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-black tracking-wide uppercase bg-brand-dark text-brand-lime mb-3 shadow-sm">
              {slide.badge}
            </span>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl font-black text-brand-dark tracking-tight leading-tight px-4">
              {slide.title}
            </h2>

            {/* Subtitle */}
            <p className="mt-3 text-xs sm:text-sm font-medium text-brand-muted max-w-[300px] leading-relaxed">
              {slide.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Controls: Skip, 3-Dot Indicators, Circular Black Arrow Button */}
      <div className="flex items-center justify-between pt-4 pb-6 px-2 border-t border-brand-border/60">
        {/* Skip Action */}
        <button
          onClick={handleSkip}
          className="text-sm font-bold text-brand-muted hover:text-brand-dark transition-colors py-2 px-3"
        >
          Skip
        </button>

        {/* 3-Dot Active Pagination Indicators */}
        <div className="flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx ? "w-7 bg-brand-dark" : "w-2 bg-gray-200"
              }`}
            />
          ))}
        </div>

        {/* Circular Black Arrow Button (#111827) */}
        <PillButton
          variant="circle-dark"
          size="icon"
          onClick={handleNext}
          title={currentIndex === slides.length - 1 ? "Get Started" : "Next Slide"}
        >
          <ArrowRight className="w-5 h-5 text-white" />
        </PillButton>
      </div>
    </div>
  );
};
