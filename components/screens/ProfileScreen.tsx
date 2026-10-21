"use client";

import React from "react";
import {
  MapPin,
  Pencil,
  Briefcase,
  GraduationCap,
  Award,
  Sparkles,
  ExternalLink,
  Code2,
  Layers,
  Palette,
  Terminal,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAppStore } from "../../stores/useAppStore";
import { MeshHeader } from "../ui/MeshHeader";
import { BottomNav } from "../ui/BottomNav";

export const ProfileScreen: React.FC = () => {
  const { candidate, setEditExpModalOpen, setTab } = useAppStore();

  const getSkillIcon = (skill: string) => {
    const s = skill.toLowerCase();
    if (s.includes("figma") || s.includes("design"))
      return <Palette className="w-3.5 h-3.5 text-purple-600" />;
    if (s.includes("react") || s.includes("front"))
      return <Code2 className="w-3.5 h-3.5 text-sky-500" />;
    if (s.includes("python"))
      return <Terminal className="w-3.5 h-3.5 text-emerald-600" />;
    return <Layers className="w-3.5 h-3.5 text-brand-dark" />;
  };

  return (
    <div className="relative w-full h-full min-h-[750px] bg-brand-surface flex flex-col justify-between pb-24 overflow-y-auto select-none">
      {/* Vibrant Radial Mesh Gradient Header Banner */}
      <MeshHeader
        candidate={candidate}
        onSettingsClick={() => alert("Candidate Preferences: Email notifications & AI Coach auto-apply enabled.")}
        onShareClick={() => alert("Fineed Profile link copied to clipboard!")}
      />

      <div className="px-6 py-5 flex flex-col gap-5">
        {/* About Bio Card */}
        <div className="bg-white rounded-3xl p-5 shadow-card border border-brand-border/70">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-black text-brand-dark uppercase tracking-wider">
              About & Core Focus
            </h3>
            <span className="text-[10px] font-extrabold text-brand-dark bg-brand-lime px-2 py-0.5 rounded-full">
              5.5 Yrs Exp
            </span>
          </div>

          <p className="text-xs font-medium text-brand-muted leading-relaxed">
            Senior Product Designer passionate about high-impact mobile UX, interaction ergonomics,
            and scalable design systems. Experienced partnering with fast-moving engineering teams to
            ship measurable business growth.
          </p>
        </div>

        {/* Skills Section with Brand Icons */}
        <div className="bg-white rounded-3xl p-5 shadow-card border border-brand-border/70">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-black text-brand-dark uppercase tracking-wider">
              Core Skills & Tools
            </h3>
            <span className="text-xs font-bold text-brand-muted">
              {candidate.skills.length} Extracted
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {candidate.skills.map((skill, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-brand-surface border border-brand-border text-brand-dark shadow-xs"
              >
                {getSkillIcon(skill)}
                <span>{skill}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Work Experience Timeline */}
        <div className="bg-white rounded-3xl p-5 shadow-card border border-brand-border/70">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-black text-brand-dark uppercase tracking-wider">
                Work Experience
              </h3>
              <p className="text-xs font-medium text-brand-muted">Validated Career Timeline</p>
            </div>
            <button
              onClick={() => setTab("coach")}
              className="text-xs font-extrabold text-brand-dark bg-brand-lime px-3 py-1 rounded-full shadow-sm hover:bg-brand-lime-hover transition-all"
            >
              Train via AI Coach
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {candidate.work_history.map((exp, idx) => (
              <div
                key={idx}
                className="relative pl-6 pb-4 border-l-2 border-brand-border last:border-l-0 last:pb-0"
              >
                {/* Timeline Node Dot */}
                <span className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-brand-dark ring-4 ring-brand-lime" />

                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-black text-brand-dark leading-snug">
                      {exp.title}
                    </h4>
                    <p className="text-xs font-bold text-brand-muted mt-0.5">
                      {exp.company} • {exp.location || "Hybrid"}
                    </p>
                    <span className="inline-block mt-1 text-[10px] font-semibold text-gray-500 bg-brand-input px-2 py-0.5 rounded-full">
                      {exp.start_date} — {exp.end_date}
                    </span>
                  </div>

                  {/* Edit Pencil Button Linking to Inline/Modal Edit */}
                  <button
                    onClick={() => setEditExpModalOpen(true, idx)}
                    className="w-8 h-8 rounded-full bg-brand-input hover:bg-brand-lime hover:text-brand-dark flex items-center justify-center text-brand-dark transition-all shadow-xs"
                    title="Edit Experience"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Achievements Preview */}
                <div className="mt-2.5 flex flex-col gap-1.5">
                  {exp.achievements.map((ach, aIdx) => (
                    <p
                      key={aIdx}
                      className="text-xs font-medium text-brand-dark/80 bg-brand-surface p-2 rounded-xl border border-brand-border/60"
                    >
                      • {ach}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Certifications */}
        <div className="bg-white rounded-3xl p-5 shadow-card border border-brand-border/70">
          <h3 className="text-sm font-black text-brand-dark uppercase tracking-wider mb-3">
            Education & Certifications
          </h3>

          <div className="flex flex-col gap-3">
            {candidate.education.map((edu, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-brand-input flex items-center justify-center text-brand-dark flex-shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-brand-dark">{edu.degree}</h4>
                  <p className="text-xs text-brand-muted">{edu.institution}</p>
                  <span className="text-[10px] text-gray-400">Class of {edu.graduation_year}</span>
                </div>
              </div>
            ))}

            {candidate.certifications.map((cert, idx) => (
              <div key={idx} className="flex items-start gap-3 pt-2 border-t border-brand-border/60">
                <div className="w-10 h-10 rounded-2xl bg-brand-lime/30 flex items-center justify-center text-brand-dark flex-shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-brand-dark">{cert}</h4>
                  <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">
                    Verified Credential
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};
