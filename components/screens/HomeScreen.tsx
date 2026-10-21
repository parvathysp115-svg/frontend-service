"use client";

import React, { useState } from "react";
import { LayoutGrid, Search, SlidersHorizontal, MapPin, Building2, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useAppStore } from "../../stores/useAppStore";
import { useResumeStore } from "../../stores/useResumeStore";
import { useJobMatches } from "../../hooks/useJobMatches";
import { ScoreBadge } from "../ui/ScoreBadge";
import { BottomNav } from "../ui/BottomNav";
import { JobMatchCandidateItem, JobPostingResponse } from "../../services/types";

export const HomeScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { candidate, setSelectedJob, setJobModalOpen, setScreen, setTab } = useAppStore();
  const { appliedJobs } = useResumeStore();
  const { recommendedMatches, recentJobs, isLoadingMatches } = useJobMatches(candidate.id);

  const filteredMatches = recommendedMatches.filter(
    (job) =>
      job.job_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRecent = recentJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenJob = (job: JobMatchCandidateItem | JobPostingResponse) => {
    setSelectedJob(job);
    setJobModalOpen(true);
  };

  return (
    <div className="relative w-full h-full min-h-[750px] bg-brand-surface flex flex-col justify-between pb-24 overflow-y-auto select-none">
      {/* Top App Bar */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-6 pt-3 pb-3 border-b border-brand-border/60 flex items-center justify-between">
        <button
          onClick={() => setTab("search")}
          className="w-10 h-10 rounded-full bg-brand-input hover:bg-gray-200 flex items-center justify-center text-brand-dark transition-colors"
          title="Menu"
        >
          <LayoutGrid className="w-5 h-5" />
        </button>

        <div className="text-center">
          <h2 className="text-base font-extrabold text-brand-dark tracking-tight">Fineed</h2>
          <p className="text-[10px] font-semibold text-brand-muted">Job & Career Feed</p>
        </div>

        <button
          onClick={() => setTab("profile")}
          className="relative w-10 h-10 rounded-full ring-2 ring-brand-lime p-0.5 overflow-hidden transition-transform active:scale-95 shadow-sm"
          title="Open Profile"
        >
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
            alt={candidate.full_name}
            className="w-full h-full object-cover rounded-full"
          />
        </button>
      </div>

      <div className="px-6 py-4 flex flex-col gap-5">
        {/* Search Bar + Dark Filter Button (#111827) */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 bg-white rounded-full shadow-card border border-brand-border/80 flex items-center px-4 py-3">
            <Search className="w-4 h-4 text-brand-muted mr-2.5 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search design, engineering..."
              className="w-full bg-transparent text-sm font-semibold text-brand-dark placeholder:text-[#9CA3AF] focus:outline-none"
            />
          </div>

          <button
            onClick={() => setTab("coach")}
            className="w-12 h-12 rounded-full bg-brand-dark text-white flex items-center justify-center shadow-md hover:bg-black active:scale-95 transition-all flex-shrink-0"
            title="AI Coach Studio"
          >
            <SlidersHorizontal className="w-4 h-4 text-brand-lime" />
          </button>
        </div>

        {/* AI Resume Training Coach Callout Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-brand-dark text-white p-4 rounded-3xl shadow-xl border border-white/10 flex items-center justify-between overflow-hidden relative"
        >
          <div className="relative z-10">
            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-brand-lime text-brand-dark mb-1">
              AI Coach Agent
            </span>
            <h3 className="text-sm font-extrabold text-white">Optimize Your Resume</h3>
            <p className="text-[11px] text-gray-300 mt-0.5">
              STAR rewrite ready • 87% ATS Score
            </p>
          </div>
          <button
            onClick={() => setTab("coach")}
            className="relative z-10 px-3.5 py-2 rounded-full bg-brand-lime text-brand-dark text-xs font-black hover:bg-brand-lime-hover shadow-lime-glow transition-all"
          >
            Train Now
          </button>
          {/* Subtle background glow */}
          <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-brand-lime/20 blur-xl" />
        </motion.div>

        {/* Recommended Jobs Carousel Header */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <h3 className="text-lg font-black text-brand-dark tracking-tight">
              Recommended Jobs
            </h3>
            <p className="text-xs font-medium text-brand-muted">
              Ranked by Matching Agent 3.0
            </p>
          </div>
          <button
            onClick={() => setTab("search")}
            className="text-xs font-bold text-brand-dark hover:underline"
          >
            See All ({recommendedMatches.length})
          </button>
        </div>

        {/* Recommended Jobs Horizontal Carousel */}
        <div className="-mx-6 px-6 flex gap-4 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory">
          {filteredMatches.map((job) => (
            <motion.div
              key={job.job_id}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOpenJob(job)}
              className="min-w-[270px] sm:min-w-[290px] snap-start bg-white rounded-3xl p-4 shadow-card border border-brand-border/70 flex flex-col justify-between cursor-pointer hover:shadow-lg transition-all relative overflow-hidden group"
            >
              {/* Workspace Photography Banner */}
              <div className="relative w-full h-32 rounded-2xl overflow-hidden mb-3 bg-gray-100">
                <img
                  src={
                    job.featured_image ||
                    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
                  }
                  alt={job.job_title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2.5 left-2.5">
                  <ScoreBadge score={job.overall_score} size="sm" />
                </div>
                <div className="absolute bottom-2 right-2 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold">
                  {job.remote_policy}
                </div>
              </div>

              {/* Job Info */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-brand-muted uppercase tracking-wider">
                    {job.company}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-brand-muted group-hover:text-brand-dark group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <h4 className="text-base font-black text-brand-dark mt-1 line-clamp-1">
                  {job.job_title}
                </h4>

                <div className="flex items-center gap-1 text-xs text-brand-muted mt-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  <span className="truncate">{job.location}</span>
                </div>
              </div>

              {/* Salary & Match Footer */}
              <div className="mt-3 pt-3 border-t border-brand-border/60 flex items-center justify-between">
                <div>
                  <span className="text-xs font-black text-brand-dark">
                    €{job.min_salary ? Math.round(job.min_salary / 100) : "68"} - €
                    {job.max_salary ? Math.round(job.max_salary / 100) : "85"}
                  </span>
                  <span className="text-[10px] font-medium text-brand-muted ml-1">/ Mo</span>
                </div>

                <span className="text-[11px] font-extrabold text-brand-dark bg-brand-lime px-2.5 py-1 rounded-full">
                  Apply
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recently Posted & Applied Jobs */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-black text-brand-dark tracking-tight">
              Recently Posted & Applied
            </h3>
            <span className="text-xs font-bold text-brand-muted">Latest Vacancies</span>
          </div>

          <div className="flex flex-col gap-3">
            {filteredRecent.map((job) => {
              const isApplied = Boolean(appliedJobs[job.id] || job.badge === "Applied");

              return (
                <div
                  key={job.id}
                  onClick={() => handleOpenJob(job)}
                  className="bg-white rounded-2xl p-3.5 shadow-card border border-brand-border/70 flex items-center justify-between cursor-pointer hover:border-brand-dark/20 active:scale-[0.99] transition-all"
                >
                  <div className="flex items-center gap-3">
                    {/* Company Logo Square */}
                    <div className="w-12 h-12 rounded-2xl overflow-hidden bg-brand-input flex items-center justify-center flex-shrink-0 border border-brand-border">
                      {job.logo_url ? (
                        <img
                          src={job.logo_url}
                          alt={job.company}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Building2 className="w-5 h-5 text-brand-dark" />
                      )}
                    </div>

                    <div>
                      <h4 className="text-sm font-extrabold text-brand-dark leading-snug">
                        {job.title}
                      </h4>
                      <p className="text-xs text-brand-muted font-medium mt-0.5">
                        {job.company} • {job.location?.split("/")[0] || "Remote"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span
                      className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        isApplied
                          ? "bg-brand-dark text-brand-lime"
                          : "bg-brand-lime text-brand-dark"
                      }`}
                    >
                      {isApplied ? "Applied" : "New"}
                    </span>
                    <span className="text-[10px] font-bold text-brand-muted">
                      €{job.min_salary ? Math.round(job.min_salary / 100) : "65"} / Mo
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating Bottom Navigation Bar */}
      <BottomNav />
    </div>
  );
};
