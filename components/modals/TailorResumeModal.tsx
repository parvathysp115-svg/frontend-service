"use client";

import React, { useState } from "react";
import { X, Check, Copy, Sparkles, Send, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "../../stores/useAppStore";
import { PillButton } from "../ui/PillButton";
import { mockCoverLetter } from "../../services/mockData";

export const TailorResumeModal: React.FC = () => {
  const { isTailorModalOpen, setTailorModalOpen, selectedJob, candidate } = useAppStore();
  const [copied, setCopied] = useState(false);

  if (!isTailorModalOpen) return null;

  const company = selectedJob?.company || "Target Company";
  const title = (selectedJob as any)?.job_title || (selectedJob as any)?.title || "Role";

  const handleCopy = () => {
    navigator.clipboard.writeText(mockCoverLetter.cover_letter_markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-[400px] max-h-[85vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-brand-border"
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-brand-border/70 flex items-center justify-between bg-brand-surface">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-brand-lime flex items-center justify-center text-brand-dark">
                <Sparkles className="w-4 h-4 fill-current" />
              </span>
              <div>
                <h3 className="text-sm font-black text-brand-dark">Tailored Application</h3>
                <p className="text-[10px] text-brand-muted">{company} • {title}</p>
              </div>
            </div>

            <button
              onClick={() => setTailorModalOpen(false)}
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-brand-muted hover:text-brand-dark shadow-xs"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="p-5 overflow-y-auto flex flex-col gap-4 text-xs">
            <div className="bg-brand-lime/10 border border-brand-lime/40 rounded-2xl p-3">
              <p className="font-extrabold text-brand-dark text-xs mb-1">
                ✓ AI Adaptation Complete
              </p>
              <p className="text-[11px] text-brand-dark/80">
                Extracted key requirements from {company} and re-weighted your 5.5 years of experience to prioritize design systems and conversion optimization metrics.
              </p>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">
                Highlighted Selling Points
              </span>
              <ul className="mt-1 flex flex-col gap-1">
                {mockCoverLetter.key_selling_points_highlighted.map((pt, i) => (
                  <li key={i} className="flex items-center gap-1.5 text-brand-dark font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-lime" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">
                  Custom Cover Letter
                </span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-[11px] font-bold text-brand-dark hover:underline"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <div className="bg-brand-surface rounded-2xl p-3 border border-brand-border font-sans whitespace-pre-line text-brand-dark/90 leading-relaxed max-h-48 overflow-y-auto">
                {mockCoverLetter.cover_letter_markdown}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-brand-border/70 bg-white flex items-center gap-2">
            <PillButton
              variant="outline"
              size="sm"
              onClick={() => setTailorModalOpen(false)}
              className="flex-1"
            >
              Close
            </PillButton>
            <PillButton
              variant="lime"
              size="sm"
              onClick={() => {
                alert(`Application & Tailored Resume successfully sent to ${company} recruiting team!`);
                setTailorModalOpen(false);
              }}
              className="flex-1 shadow-lime-glow"
              icon={<Send className="w-3.5 h-3.5" />}
            >
              Submit Application
            </PillButton>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
