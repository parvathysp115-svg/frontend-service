"use client";

import React, { useState, useEffect } from "react";
import { X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "../../stores/useAppStore";
import { PillInput } from "../ui/PillInput";
import { PillButton } from "../ui/PillButton";

export const EditExperienceModal: React.FC = () => {
  const { isEditExpModalOpen, setEditExpModalOpen, editingExpIndex, candidate, updateCandidateWorkExperience } =
    useAppStore();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    start_date: "",
    end_date: "",
    achievements: "",
  });

  useEffect(() => {
    if (editingExpIndex !== null && candidate.work_history[editingExpIndex]) {
      const exp = candidate.work_history[editingExpIndex];
      setFormData({
        title: exp.title || "",
        company: exp.company || "",
        location: exp.location || "",
        start_date: exp.start_date || "",
        end_date: exp.end_date || "",
        achievements: (exp.achievements || []).join("\n"),
      });
    }
  }, [editingExpIndex, candidate]);

  if (!isEditExpModalOpen || editingExpIndex === null) return null;

  const handleSave = () => {
    const updated = {
      ...candidate.work_history[editingExpIndex],
      title: formData.title,
      company: formData.company,
      location: formData.location,
      start_date: formData.start_date,
      end_date: formData.end_date,
      achievements: formData.achievements
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    updateCandidateWorkExperience(editingExpIndex, updated);
    setEditExpModalOpen(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          className="relative w-full max-w-[400px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-brand-border"
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-brand-border/70 flex items-center justify-between bg-brand-surface">
            <div>
              <h3 className="text-sm font-black text-brand-dark">Edit Experience</h3>
              <p className="text-[10px] text-brand-muted">Update role details & accomplishments</p>
            </div>
            <button
              onClick={() => setEditExpModalOpen(false)}
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-brand-muted hover:text-brand-dark"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form */}
          <div className="p-5 flex flex-col gap-3 text-xs overflow-y-auto max-h-[65vh]">
            <PillInput
              label="Job Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Senior UX Designer"
            />

            <PillInput
              label="Company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="e.g. Acme Corp"
            />

            <PillInput
              label="Location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g. Grenoble, France"
            />

            <div className="grid grid-cols-2 gap-2">
              <PillInput
                label="Start Date"
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                placeholder="Mar 2022"
              />
              <PillInput
                label="End Date"
                value={formData.end_date}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                placeholder="Present"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-brand-dark px-2">
                Key Accomplishments (One per line)
              </label>
              <textarea
                rows={4}
                value={formData.achievements}
                onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                className="w-full bg-brand-input rounded-2xl p-3 text-xs font-medium text-brand-dark placeholder:text-[#9CA3AF] focus:outline-none focus:bg-white border border-transparent focus:border-brand-dark/20"
                placeholder="Reduced onboarding friction by 28%..."
              />
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-brand-border/70 bg-white flex items-center gap-2">
            <PillButton
              variant="outline"
              size="sm"
              onClick={() => setEditExpModalOpen(false)}
              className="flex-1"
            >
              Cancel
            </PillButton>
            <PillButton
              variant="lime"
              size="sm"
              onClick={handleSave}
              className="flex-1 shadow-lime-glow"
              icon={<Check className="w-3.5 h-3.5" />}
            >
              Save Changes
            </PillButton>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
