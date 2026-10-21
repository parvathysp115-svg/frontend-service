"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { useAppStore } from "../../stores/useAppStore";

export const SplashScreen: React.FC = () => {
  const { setScreen } = useAppStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen("onboarding");
    }, 2400);
    return () => clearTimeout(timer);
  }, [setScreen]);

  return (
    <div
      onClick={() => setScreen("onboarding")}
      className="relative w-full h-full min-h-[750px] bg-brand-lime flex flex-col justify-between p-8 select-none cursor-pointer overflow-hidden"
    >
      {/* Background graphic elements */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/20 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-black/5 blur-xl pointer-events-none" />

      {/* Subtle top pill */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-6 flex justify-center"
      >
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-dark text-brand-lime text-xs font-black tracking-wide uppercase shadow-sm">
          <Sparkles className="w-3.5 h-3.5 fill-current" />
          AI Powered Matching
        </span>
      </motion.div>

      {/* Central Bold Fineed Branding */}
      <div className="flex flex-col items-center justify-center my-auto text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
          className="relative"
        >
          {/* Logo mark */}
          <div className="w-20 h-20 rounded-3xl bg-brand-dark flex items-center justify-center shadow-2xl mx-auto mb-5 rotate-3 hover:rotate-0 transition-transform">
            <span className="text-brand-lime font-black text-4xl tracking-tighter">Fi</span>
          </div>

          <h1 className="text-5xl font-black text-brand-dark tracking-tighter">
            Fineed
          </h1>
          <p className="mt-2 text-sm font-bold text-brand-dark/70 tracking-tight max-w-[240px] mx-auto">
            Find your dream job now with precision AI training
          </p>
        </motion.div>
      </div>

      {/* Bottom CTA / Tap prompt */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex flex-col items-center gap-3 pb-8"
      >
        <div className="flex items-center gap-2 text-xs font-extrabold text-brand-dark uppercase tracking-wider bg-black/5 px-4 py-2 rounded-full">
          <span>Tap anywhere to continue</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </motion.div>
    </div>
  );
};
