"use client";

import React, { useState, useEffect } from "react";
import { Wifi, Battery, Smartphone, Maximize2, RefreshCw } from "lucide-react";
import { useAppStore, DeviceType, ScreenType } from "../../stores/useAppStore";

interface DeviceFrameProps {
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ children }) => {
  const { currentScreen, setScreen, deviceType, setDeviceType } = useAppStore();
  const [currentTime, setCurrentTime] = useState("9:41");
  const [backendStatus, setBackendStatus] = useState<"checking" | "connected" | "demo">("checking");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 30000);
    return () => clearInterval(interval);
  }, []);

  // Quick health check to backend
  useEffect(() => {
    fetch("http://localhost:8000/docs", { mode: "no-cors" })
      .then(() => setBackendStatus("connected"))
      .catch(() => setBackendStatus("demo"));
  }, []);

  const screens: { id: ScreenType; label: string }[] = [
    { id: "splash", label: "1. Splash" },
    { id: "onboarding", label: "1. Onboarding" },
    { id: "auth", label: "2. Auth" },
    { id: "home", label: "3. Home" },
    { id: "trainer", label: "4. AI Coach" },
    { id: "profile", label: "6. Profile" },
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col items-center justify-start py-6 px-3 sm:px-6 font-sans">
      {/* Top Controller Bar */}
      <header className="w-full max-w-4xl mb-6 flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 backdrop-blur-md px-5 py-3 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-brand-lime flex items-center justify-center font-black text-brand-dark text-lg shadow-lime-glow">
            F
          </div>
          <div>
            <h1 className="text-sm font-extrabold tracking-tight text-white flex items-center gap-2">
              Fineed <span className="text-brand-lime font-bold text-xs uppercase px-2 py-0.5 bg-brand-lime/10 rounded-full border border-brand-lime/30">Mobile Client</span>
            </h1>
            <p className="text-[11px] text-slate-400">
              AI Resume Training & Job Matching Platform
            </p>
          </div>
        </div>

        {/* Screen Quick-Jump Switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
          {screens.map((s) => (
            <button
              key={s.id}
              onClick={() => setScreen(s.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                currentScreen === s.id
                  ? "bg-brand-lime text-brand-dark shadow-lime-glow"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Backend & Device Mode Toggles */}
        <div className="flex items-center gap-2 text-xs">
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border font-medium ${
              backendStatus === "connected"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : "bg-amber-500/10 border-amber-500/30 text-amber-300"
            }`}
            title="FastAPI: http://localhost:8000"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                backendStatus === "connected" ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
              }`}
            />
            {backendStatus === "connected" ? "Backend Online" : "FastAPI Demo Mode"}
          </div>

          <div className="flex items-center bg-slate-800 rounded-full p-1 border border-slate-700">
            <button
              onClick={() => setDeviceType("iphone16")}
              className={`px-2 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1 ${
                deviceType === "iphone16" ? "bg-brand-lime text-brand-dark" : "text-slate-400 hover:text-white"
              }`}
              title="iPhone 16 Pro Viewport"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>iOS</span>
            </button>
            <button
              onClick={() => setDeviceType("clean")}
              className={`px-2 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1 ${
                deviceType === "clean" ? "bg-brand-lime text-brand-dark" : "text-slate-400 hover:text-white"
              }`}
              title="Edge-to-edge Viewport"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Full</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Shell Container */}
      <main
        className={`relative transition-all duration-300 ${
          deviceType === "iphone16"
            ? "w-[393px] h-[844px] sm:w-[412px] sm:h-[870px] rounded-[52px] border-[10px] border-[#25282F] shadow-[0_25px_70px_rgba(0,0,0,0.85)] ring-1 ring-white/10"
            : "w-full max-w-[430px] min-h-[850px] rounded-3xl shadow-2xl border border-slate-800"
        } bg-white text-brand-dark overflow-hidden flex flex-col`}
      >
        {/* Dynamic Island & Hardware Speaker (iPhone 16 styling) */}
        {deviceType === "iphone16" && (
          <div className="absolute top-2.5 inset-x-0 z-50 flex items-center justify-between px-7 pointer-events-none select-none">
            <span className="text-xs font-bold text-brand-dark tracking-tight">{currentTime}</span>

            {/* Dynamic Island pill */}
            <div className="w-28 h-6 bg-black rounded-full flex items-center justify-between px-2.5 pointer-events-auto shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-900 ring-1 ring-slate-800" />
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-lime animate-ping" />
                <span className="text-[9px] font-extrabold text-brand-lime">Fineed</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-brand-dark">
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-4 h-4 fill-current" />
            </div>
          </div>
        )}

        {/* Screen Viewport Wrapper */}
        <div className={`relative flex-1 w-full h-full overflow-y-auto overflow-x-hidden ${deviceType === "iphone16" ? "pt-10" : ""}`}>
          {children}
        </div>

        {/* iOS Home Indicator Bar */}
        {deviceType === "iphone16" && (
          <div className="absolute bottom-1.5 inset-x-0 flex justify-center pointer-events-none z-50">
            <div className="w-36 h-1 bg-brand-dark/25 rounded-full" />
          </div>
        )}
      </main>
    </div>
  );
};
