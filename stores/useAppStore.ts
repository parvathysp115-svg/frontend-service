import { create } from "zustand";
import { CandidateProfileResponse, JobMatchCandidateItem, JobPostingResponse } from "../services/types";
import { mockCandidate } from "../services/mockData";

export type ScreenType = "splash" | "onboarding" | "auth" | "home" | "trainer" | "profile";
export type TabType = "home" | "search" | "coach" | "notifications" | "profile";
export type DeviceType = "iphone16" | "android" | "clean";

interface AppState {
  currentScreen: ScreenType;
  currentTab: TabType;
  deviceType: DeviceType;
  isAuthenticated: boolean;
  candidate: CandidateProfileResponse;
  selectedJob: JobMatchCandidateItem | JobPostingResponse | null;
  isJobModalOpen: boolean;
  isTailorModalOpen: boolean;
  isEditExpModalOpen: boolean;
  editingExpIndex: number | null;

  // Actions
  setScreen: (screen: ScreenType) => void;
  setTab: (tab: TabType) => void;
  setDeviceType: (device: DeviceType) => void;
  setIsAuthenticated: (auth: boolean) => void;
  setCandidate: (candidate: CandidateProfileResponse) => void;
  setSelectedJob: (job: JobMatchCandidateItem | JobPostingResponse | null) => void;
  setJobModalOpen: (open: boolean) => void;
  setTailorModalOpen: (open: boolean) => void;
  setEditExpModalOpen: (open: boolean, expIndex?: number | null) => void;
  updateCandidateWorkExperience: (index: number, updatedItem: any) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentScreen: "splash",
  currentTab: "home",
  deviceType: "iphone16",
  isAuthenticated: true,
  candidate: mockCandidate,
  selectedJob: null,
  isJobModalOpen: false,
  isTailorModalOpen: false,
  isEditExpModalOpen: false,
  editingExpIndex: null,

  setScreen: (screen) => set({ currentScreen: screen }),
  setTab: (tab) => {
    set({ currentTab: tab });
    if (tab === "home") set({ currentScreen: "home" });
    else if (tab === "coach") set({ currentScreen: "trainer" });
    else if (tab === "profile") set({ currentScreen: "profile" });
  },
  setDeviceType: (deviceType) => set({ deviceType }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setCandidate: (candidate) => set({ candidate }),
  setSelectedJob: (selectedJob) => set({ selectedJob }),
  setJobModalOpen: (isJobModalOpen) => set({ isJobModalOpen }),
  setTailorModalOpen: (isTailorModalOpen) => set({ isTailorModalOpen }),
  setEditExpModalOpen: (isEditExpModalOpen, editingExpIndex = null) =>
    set({ isEditExpModalOpen, editingExpIndex }),
  updateCandidateWorkExperience: (index, updatedItem) =>
    set((state) => {
      const nextHistory = [...state.candidate.work_history];
      if (index >= 0 && index < nextHistory.length) {
        nextHistory[index] = { ...nextHistory[index], ...updatedItem };
      }
      return {
        candidate: {
          ...state.candidate,
          work_history: nextHistory,
        },
      };
    }),
}));
