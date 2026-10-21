import { create } from "zustand";
import { STARBulletRewrite } from "../services/types";
import { mockOptimizationData } from "../services/mockData";

interface UploadedResumeMeta {
  id: string;
  fullName: string;
  parsedSkillsCount: number;
  yearsOfExperience: number;
  uploadedAt: string;
}

interface ResumeState {
  uploadedResume: UploadedResumeMeta | null;
  acceptedRewrites: Record<number, boolean>;
  appliedJobs: Record<string, boolean>;
  currentScore: number;
  activeCoachTab: "rewrites" | "gaps" | "roadmap";

  setUploadedResume: (meta: UploadedResumeMeta | null) => void;
  toggleAcceptRewrite: (index: number) => void;
  markJobApplied: (jobId: string) => void;
  setActiveCoachTab: (tab: "rewrites" | "gaps" | "roadmap") => void;
  resetRewrites: () => void;
}

export const useResumeStore = create<ResumeState>((set) => ({
  uploadedResume: {
    id: mockOptimizationData.candidate_id,
    fullName: "Sarah Laurent",
    parsedSkillsCount: 10,
    yearsOfExperience: 5.5,
    uploadedAt: new Date().toISOString(),
  },
  acceptedRewrites: {},
  appliedJobs: {
    rec_job_01: true,
    rec_job_04: true,
  },
  currentScore: mockOptimizationData.ats_score,
  activeCoachTab: "rewrites",

  setUploadedResume: (uploadedResume) => set({ uploadedResume }),

  toggleAcceptRewrite: (index) =>
    set((state) => {
      const isAccepted = !state.acceptedRewrites[index];
      const nextAccepted = { ...state.acceptedRewrites, [index]: isAccepted };
      // Bonus ATS points for each accepted high-impact STAR rewrite
      const baseScore = mockOptimizationData.ats_score;
      const count = Object.values(nextAccepted).filter(Boolean).length;
      const newScore = Math.min(99, baseScore + count * 4);

      return {
        acceptedRewrites: nextAccepted,
        currentScore: newScore,
      };
    }),

  markJobApplied: (jobId) =>
    set((state) => ({
      appliedJobs: { ...state.appliedJobs, [jobId]: true },
    })),

  setActiveCoachTab: (activeCoachTab) => set({ activeCoachTab }),

  resetRewrites: () =>
    set({
      acceptedRewrites: {},
      currentScore: mockOptimizationData.ats_score,
    }),
}));
