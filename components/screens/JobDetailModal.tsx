"use client";

import React, { useState } from "react";
import {
  X,
  MapPin,
  Building2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Send,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { useAppStore } from "../../stores/useAppStore";
import { useResumeStore } from "../../stores/useResumeStore";
import { useJobDetail } from "../../hooks/useJobDetail";
import { ScoreBadge } from "../ui/ScoreBadge";
import { PillButton } from "../ui/PillButton";
import { JobMatchCandidateItem, JobPostingResponse } from "../../services/types";

export const JobDetailModal: React.FC = () => {
  const { isJobModalOpen, setJobModalOpen, selectedJob, candidate, setTailorModalOpen } =
    useAppStore();
  const { markJobApplied, appliedJobs } = useResumeStore();

  const [hasAppliedLocally, setHasAppliedLocally] = useState(false);

  if (!isJobModalOpen || !selectedJob) return null;

  // Determine if selectedJob is JobMatchCandidateItem or JobPostingResponse
  const isCandidateItem = "overall_score" in selectedJob;
  const overallScore = isCandidateItem ? (selectedJob as JobMatchCandidateItem).overall_score : 89;
  const title = isCandidateItem
    ? (selectedJob as JobMatchCandidateItem).job_title
    : (selectedJob as JobPostingResponse).title;
  const company = selectedJob.company;
  const location = selectedJob.location || "Remote";
  const remotePolicy = selectedJob.remote_policy || "Hybrid";
  const jobId = isCandidateItem
    ? (selectedJob as JobMatchCandidateItem).job_id
    : (selectedJob as JobPostingResponse).id;

  const isAlreadyApplied = Boolean(appliedJobs[jobId] || hasAppliedLocally);

  // Breakdown metrics
  const breakdown = isCandidateItem
    ? (selectedJob as JobMatchCandidateItem).breakdown
    : {
        vector_score: 91,
        skills_score: 88,
        experience_score: 92,
        hard_constraints_score: 100,
        hard_constraints_passed: true,
      };

  const handleApplyTailored = () => {
    markJobApplied(jobId);
    setHasAppliedLocally(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.5 },
      colors: ["#CEF238", "#111827", "#38BDF8"],
    });
    setTailorModalOpen(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 320 }}
          className="relative w-full max-w-[430px] max-h-[92vh] bg-white rounded-t-[36px] sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header Bar */}
          <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-6 pt-4 pb-3 border-b border-brand-border/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-lime" />
              <span className="text-xs font-black uppercase tracking-wider text-brand-dark">
                Match Matrix 3.0
              </span>
            </div>

            <button
              onClick={() => setJobModalOpen(false)}
              className="w-9 h-9 rounded-full bg-brand-input hover:bg-gray-200 flex items-center justify-center text-brand-dark transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="px-6 py-4 overflow-y-auto flex flex-col gap-5 pb-28">
            {/* Title & Score Hero */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-extrabold text-brand-muted uppercase tracking-wider">
                  {company}
                </span>
                <h2 className="text-xl font-black text-brand-dark leading-tight mt-0.5">
                  {title}
                </h2>
                <div className="flex items-center gap-2 text-xs font-semibold text-brand-muted mt-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{location}</span>
                  <span>•</span>
                  <span className="text-brand-dark font-bold">{remotePolicy}</span>
                </div>
              </div>

              <div className="flex-shrink-0">
                <ScoreBadge score={overallScore} size="lg" />
              </div>
            </div>

            {/* Match Breakdown Matrix */}
            <div className="bg-brand-surface rounded-3xl p-5 border border-brand-border">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-extrabold text-brand-dark uppercase tracking-wider">
                  Compatibility Matrix
                </h4>
                <span className="text-[10px] font-extrabold text-brand-dark bg-brand-lime px-2 py-0.5 rounded-full">
                  FastAPI Hybrid Agent
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {/* Skills Fit 35% */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-brand-dark mb-1">
                    <span>Skills Fit (35% weight)</span>
                    <span className="font-extrabold">{Math.round(breakdown.skills_score)}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${breakdown.skills_score}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full bg-brand-lime rounded-full"
                    />
                  </div>
                </div>

                {/* Experience Fit 40% (Semantic Vector) */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-brand-dark mb-1">
                    <span>Experience Fit (40% weight)</span>
                    <span className="font-extrabold">{Math.round(breakdown.vector_score)}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${breakdown.vector_score}%` }}
                      transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                      className="h-full bg-brand-dark rounded-full"
                    />
                  </div>
                </div>

                {/* Seniority Alignment 15% */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-brand-dark mb-1">
                    <span>Seniority Alignment (15% weight)</span>
                    <span className="font-extrabold">
                      {Math.round(breakdown.experience_score)}%
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${breakdown.experience_score}%` }}
                      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                      className="h-full bg-sky-400 rounded-full"
                    />
                  </div>
                </div>

                {/* Hard Constraints 10% */}
                <div className="pt-2 flex items-center justify-between text-xs font-bold border-t border-brand-border/60">
                  <span className="flex items-center gap-1.5 text-emerald-700">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Mandatory Filters (Visa & Location)
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-900">
                    Passed 100%
                  </span>
                </div>
              </div>
            </div>

            {/* Matching & Missing Skills Tags */}
            <div className="flex flex-col gap-3">
              <div>
                <h5 className="text-xs font-extrabold text-brand-dark uppercase tracking-wider mb-2">
                  Matching Verified Skills
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {candidate.skills.slice(0, 6).map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-full text-xs font-bold bg-brand-lime/30 text-brand-dark border border-brand-lime/60 flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3 text-brand-dark" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="text-xs font-extrabold text-brand-muted uppercase tracking-wider mb-2">
                  Nice-To-Have Skills
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    Design Tokens Architecture
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    WCAG 2.1 AAA Accessibility
                  </span>
                </div>
              </div>
            </div>

            {/* Role Overview */}
            <div className="bg-white rounded-2xl p-4 border border-brand-border/70">
              <h5 className="text-xs font-extrabold text-brand-dark uppercase tracking-wider mb-1.5">
                Role Overview & Scope
              </h5>
              <p className="text-xs text-brand-muted leading-relaxed">
                As a Senior Product Designer at {company}, you will collaborate closely with
                cross-functional squads to architect mobile interaction ergonomics, scalable token
                systems, and delightful customer journeys with modern tools.
              </p>
            </div>
          </div>

          {/* Fixed Bottom CTA Drawer Footer */}
          <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md px-6 py-4 border-t border-brand-border/70 flex items-center gap-3">
            <PillButton
              variant="outline"
              size="md"
              onClick={() => setJobModalOpen(false)}
              className="flex-1"
            >
              Close
            </PillButton>

            <PillButton
              variant="lime"
              size="md"
              onClick={handleApplyTailored}
              className="flex-[2] shadow-lime-glow"
              icon={isAlreadyApplied ? <CheckCircle2 className="w-4 h-4" /> : <Sparkles className="w-4 h-4 fill-current" />}
            >
              {isAlreadyApplied ? "View Tailored Packet" : "1-Tap Tailored Apply"}
            </PillButton>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
