"use client";

import React, { useRef, useState } from "react";
import {
  Upload,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileText,
  ArrowRight,
  TrendingUp,
  RotateCcw,
  BookOpen,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { useAppStore } from "../../stores/useAppStore";
import { useResumeStore } from "../../stores/useResumeStore";
import { useResumeTrainer } from "../../hooks/useResumeTrainer";
import { useResumeUpload } from "../../hooks/useResumeUpload";
import { RadialGauge } from "../ui/RadialGauge";
import { BottomNav } from "../ui/BottomNav";
import { PillButton } from "../ui/PillButton";

export const ResumeTrainerScreen: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState<string | null>(null);

  const { candidate } = useAppStore();
  const {
    currentScore,
    acceptedRewrites,
    toggleAcceptRewrite,
    activeCoachTab,
    setActiveCoachTab,
    resetRewrites,
  } = useResumeStore();

  const { optimization, roadmap, isLoadingOptimization } = useResumeTrainer(candidate.id);
  const uploadMutation = useResumeUpload();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await uploadMutation.mutateAsync(formData);
      setUploadSuccessMsg(`Parsed ${res.full_name}'s resume with ${res.parsed_skills_count} skills!`);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      setTimeout(() => setUploadSuccessMsg(null), 4000);
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  const handleAcceptClick = (idx: number) => {
    toggleAcceptRewrite(idx);
    if (!acceptedRewrites[idx]) {
      confetti({
        particleCount: 40,
        spread: 45,
        origin: { y: 0.6 },
        colors: ["#CEF238", "#111827", "#38BDF8"],
      });
    }
  };

  const weakBullets = optimization?.weak_bullet_points || [];
  const starRewrites = optimization?.star_rewrites || [];
  const missingKeywords = optimization?.missing_high_value_keywords || [];
  const actionableSteps = optimization?.actionable_next_steps || [];

  return (
    <div className="relative w-full h-full min-h-[750px] bg-brand-surface flex flex-col justify-between pb-24 overflow-y-auto select-none">
      {/* Top Header */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-6 pt-3 pb-3 border-b border-brand-border/60 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-black uppercase text-brand-lime bg-brand-dark px-2.5 py-0.5 rounded-full inline-block mb-0.5">
            AI Coach Studio
          </span>
          <h2 className="text-lg font-black text-brand-dark tracking-tight">Resume Trainer</h2>
        </div>

        <button
          onClick={resetRewrites}
          className="text-xs font-bold text-brand-muted hover:text-brand-dark flex items-center gap-1 p-1.5 rounded-full hover:bg-brand-surface"
          title="Reset Rewrites"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      <div className="px-6 py-4 flex flex-col gap-5">
        {/* Upload Zone for PDF / DOCX */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="relative group cursor-pointer border-2 border-dashed border-brand-dark/20 hover:border-brand-dark bg-white rounded-3xl p-5 text-center transition-all shadow-card hover:shadow-md"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={handleFileUpload}
            className="hidden"
          />

          <div className="w-12 h-12 rounded-2xl bg-brand-lime/30 text-brand-dark flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
            <Upload className="w-6 h-6 stroke-[2.2]" />
          </div>

          <h3 className="text-sm font-extrabold text-brand-dark">
            {uploadMutation.isPending ? "Analyzing with Ingestion Agent..." : "Upload PDF or DOCX Resume"}
          </h3>
          <p className="text-xs text-brand-muted mt-0.5">
            Connects to <code className="text-brand-dark font-mono text-[11px]">POST /api/v1/resumes/upload</code>
          </p>

          {uploadSuccessMsg && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-xs font-bold text-emerald-700 bg-emerald-50 py-1.5 px-3 rounded-full border border-emerald-200 inline-block"
            >
              {uploadSuccessMsg}
            </motion.div>
          )}
        </div>

        {/* ATS Score & Compatibility Radial Gauge Card */}
        <div className="bg-white rounded-3xl p-5 shadow-card border border-brand-border/70 flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-2">
            <div>
              <span className="text-xs font-extrabold text-brand-muted uppercase tracking-wider">
                Optimization Score
              </span>
              <h4 className="text-base font-black text-brand-dark">ATS & Recruiter Fit</h4>
            </div>
            <span className="text-xs font-bold text-brand-dark bg-brand-lime px-2.5 py-1 rounded-full">
              Live Evaluation
            </span>
          </div>

          <div className="my-2">
            <RadialGauge score={currentScore} />
          </div>

          <p className="text-xs font-medium text-brand-muted text-center max-w-[280px] mt-2">
            {optimization?.ats_summary ||
              "Identified passive phrasing and missing metrics. Accept STAR rewrites to boost your rank into the top 3%."}
          </p>
        </div>

        {/* Tab Controls: STAR Diff View vs Skill Gaps vs Learning Roadmap */}
        <div className="p-1 bg-brand-input rounded-full flex items-center border border-brand-border/60">
          <button
            onClick={() => setActiveCoachTab("rewrites")}
            className={`flex-1 py-2 rounded-full text-xs font-extrabold transition-all ${
              activeCoachTab === "rewrites"
                ? "bg-white text-brand-dark shadow-sm"
                : "text-brand-muted hover:text-brand-dark"
            }`}
          >
            STAR Rewriter ({starRewrites.length})
          </button>
          <button
            onClick={() => setActiveCoachTab("gaps")}
            className={`flex-1 py-2 rounded-full text-xs font-extrabold transition-all ${
              activeCoachTab === "gaps"
                ? "bg-white text-brand-dark shadow-sm"
                : "text-brand-muted hover:text-brand-dark"
            }`}
          >
            Skill Gaps
          </button>
          <button
            onClick={() => setActiveCoachTab("roadmap")}
            className={`flex-1 py-2 rounded-full text-xs font-extrabold transition-all ${
              activeCoachTab === "roadmap"
                ? "bg-white text-brand-dark shadow-sm"
                : "text-brand-muted hover:text-brand-dark"
            }`}
          >
            Roadmap
          </button>
        </div>

        {/* Tab 1: STAR Rewriter Diff View */}
        {activeCoachTab === "rewrites" && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-brand-muted">
                Tap to accept agent-optimized bullets
              </span>
              <span className="text-[11px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                +{Object.values(acceptedRewrites).filter(Boolean).length * 4} PTS Gained
              </span>
            </div>

            {starRewrites.map((rewrite, idx) => {
              const isAccepted = Boolean(acceptedRewrites[idx]);
              const weakBullet = weakBullets[idx];

              return (
                <motion.div
                  key={idx}
                  layout
                  className={`bg-white rounded-3xl p-5 shadow-card border transition-all ${
                    isAccepted
                      ? "border-brand-lime bg-brand-lime/5 ring-2 ring-brand-lime/40"
                      : "border-brand-border/70"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-black uppercase tracking-wider text-rose-500 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-100 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {weakBullet?.issue_type?.replace("_", " ") || "WEAK BULLET"}
                    </span>
                    <span className="text-[11px] font-bold text-brand-muted">
                      {weakBullet?.role_or_context || "Work History"}
                    </span>
                  </div>

                  {/* Before Box */}
                  <div className="bg-rose-50/50 rounded-2xl p-3 border border-rose-100 mb-3">
                    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-rose-600 mb-1">
                      <span>Before (Weak Bullet)</span>
                    </div>
                    <p className="text-xs font-medium text-rose-950 leading-relaxed line-through decoration-rose-300">
                      "{rewrite.original_bullet}"
                    </p>
                    {weakBullet?.critique && (
                      <p className="text-[10px] text-rose-700 font-semibold mt-1.5 italic">
                        Critique: {weakBullet.critique}
                      </p>
                    )}
                  </div>

                  {/* After Box (Agent-Optimized STAR Bullet) */}
                  <div className="bg-emerald-50/60 rounded-2xl p-3.5 border border-emerald-200 mb-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1 text-[10px] font-black uppercase text-emerald-700">
                        <Sparkles className="w-3 h-3 fill-current" />
                        <span>Agent-Optimized STAR Bullet</span>
                      </div>
                      <span className="text-[10px] font-extrabold text-brand-dark bg-brand-lime px-2 py-0.5 rounded-full">
                        Quantified
                      </span>
                    </div>
                    <p className="text-xs font-bold text-emerald-950 leading-relaxed">
                      "{rewrite.rewritten_bullet}"
                    </p>

                    {/* STAR Breakdown Pills */}
                    <div className="grid grid-cols-2 gap-1.5 mt-2.5 pt-2 border-t border-emerald-200/60 text-[10px]">
                      <div>
                        <span className="font-extrabold text-emerald-800">Action:</span>{" "}
                        <span className="text-emerald-900">{rewrite.action.slice(0, 45)}...</span>
                      </div>
                      <div>
                        <span className="font-extrabold text-emerald-800">Result:</span>{" "}
                        <span className="text-emerald-900">{rewrite.result.slice(0, 45)}...</span>
                      </div>
                    </div>
                  </div>

                  {/* 1-Tap Accept Button */}
                  <button
                    onClick={() => handleAcceptClick(idx)}
                    className={`w-full py-3 rounded-full text-xs font-black transition-all flex items-center justify-center gap-2 ${
                      isAccepted
                        ? "bg-brand-dark text-brand-lime shadow-md"
                        : "bg-brand-lime text-brand-dark hover:bg-brand-lime-hover shadow-lime-glow"
                    }`}
                  >
                    {isAccepted ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-brand-lime fill-current" />
                        <span>Accepted in Profile (+4 ATS)</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 fill-current" />
                        <span>1-Tap Accept Rewrite</span>
                      </>
                    )}
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Skill Gaps & Extracted Keywords */}
        {activeCoachTab === "gaps" && (
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-3xl p-5 shadow-card border border-brand-border/70">
              <h4 className="text-sm font-black text-brand-dark mb-1">
                Missing High-Value Keywords
              </h4>
              <p className="text-xs text-brand-muted mb-3">
                Extracted by Optimization Agent 2.0 based on market demand.
              </p>

              <div className="flex flex-wrap gap-2">
                {missingKeywords.map((kw, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200 flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-5 shadow-card border border-brand-border/70">
              <h4 className="text-sm font-black text-brand-dark mb-1">
                Recommended Actionable Next Steps
              </h4>
              <div className="flex flex-col gap-2 mt-3">
                {actionableSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-brand-dark text-brand-lime text-[10px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-xs font-semibold text-brand-dark">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Learning Roadmap */}
        {activeCoachTab === "roadmap" && (
          <div className="flex flex-col gap-3">
            <div className="bg-brand-dark text-white p-4 rounded-3xl shadow-lg mb-1">
              <span className="text-[10px] font-black uppercase text-brand-lime">
                Target Role Milestone
              </span>
              <h4 className="text-sm font-black text-white mt-0.5">
                {roadmap?.target_role || "Staff / Principal Product Designer"}
              </h4>
              <p className="text-xs text-gray-300 mt-1">{roadmap?.gap_summary}</p>
            </div>

            {roadmap?.learning_roadmap.map((mile, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-4 shadow-card border border-brand-border/70"
              >
                <span className="text-[10px] font-extrabold text-brand-dark bg-brand-lime px-2.5 py-0.5 rounded-full">
                  {mile.week_or_phase}
                </span>
                <h5 className="text-sm font-black text-brand-dark mt-2">{mile.focus_topic}</h5>
                <p className="text-xs font-medium text-brand-muted mt-1">
                  <strong>Proof of Work:</strong> {mile.hands_on_project}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};
