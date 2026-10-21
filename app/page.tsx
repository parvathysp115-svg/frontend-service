"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppStore } from "../stores/useAppStore";
import { DeviceFrame } from "../components/ui/DeviceFrame";
import { SplashScreen } from "../components/screens/SplashScreen";
import { OnboardingScreen } from "../components/screens/OnboardingScreen";
import { AuthScreen } from "../components/screens/AuthScreen";
import { HomeScreen } from "../components/screens/HomeScreen";
import { ResumeTrainerScreen } from "../components/screens/ResumeTrainerScreen";
import { ProfileScreen } from "../components/screens/ProfileScreen";
import { JobDetailModal } from "../components/screens/JobDetailModal";
import { TailorResumeModal } from "../components/modals/TailorResumeModal";
import { EditExperienceModal } from "../components/modals/EditExperienceModal";

export default function AppShell() {
  const { currentScreen } = useAppStore();

  const renderScreen = () => {
    switch (currentScreen) {
      case "splash":
        return <SplashScreen key="splash" />;
      case "onboarding":
        return <OnboardingScreen key="onboarding" />;
      case "auth":
        return <AuthScreen key="auth" />;
      case "home":
        return <HomeScreen key="home" />;
      case "trainer":
        return <ResumeTrainerScreen key="trainer" />;
      case "profile":
        return <ProfileScreen key="profile" />;
      default:
        return <HomeScreen key="home" />;
    }
  };

  return (
    <DeviceFrame>
      <div className="relative w-full h-full min-h-[750px] bg-white flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="w-full h-full flex-1 flex flex-col"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>

        {/* Global Modals & Drawers */}
        <JobDetailModal />
        <TailorResumeModal />
        <EditExperienceModal />
      </div>
    </DeviceFrame>
  );
}
