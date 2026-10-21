"use client";

import React from "react";
import { Home, Search, Sparkles, Bell, User } from "lucide-react";
import { motion } from "framer-motion";
import { useAppStore, TabType } from "../../stores/useAppStore";

export const BottomNav: React.FC = () => {
  const { currentTab, setTab } = useAppStore();

  const navItems: { id: TabType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: "home", label: "Home", icon: Home },
    { id: "search", label: "Explore", icon: Search },
    { id: "coach", label: "AI Coach", icon: Sparkles },
    { id: "notifications", label: "Alerts", icon: Bell },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <div className="absolute bottom-5 inset-x-4 z-40">
      <nav className="relative flex items-center justify-between px-3 py-2 bg-brand-dark/95 backdrop-blur-xl rounded-full shadow-2xl border border-white/10">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className="relative flex flex-col items-center justify-center py-1.5 px-3 rounded-full transition-all duration-200 select-none group"
            >
              {isActive && (
                <motion.div
                  layoutId="activeNavPill"
                  className="absolute inset-0 bg-brand-lime rounded-full"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}

              <div className="relative z-10 flex flex-col items-center gap-0.5">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive
                      ? "text-brand-dark stroke-[2.4] scale-110"
                      : "text-gray-400 group-hover:text-white"
                  }`}
                />
                <span
                  className={`text-[9px] font-bold tracking-tight transition-colors duration-200 ${
                    isActive ? "text-brand-dark" : "text-gray-400 group-hover:text-white"
                  }`}
                >
                  {item.label}
                </span>
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
