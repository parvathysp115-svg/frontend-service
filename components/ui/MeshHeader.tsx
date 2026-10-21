"use client";

import React from "react";
import { MapPin, Settings, Share2 } from "lucide-react";
import { CandidateProfileResponse } from "../../services/types";

interface MeshHeaderProps {
  candidate: CandidateProfileResponse;
  onSettingsClick?: () => void;
  onShareClick?: () => void;
}

export const MeshHeader: React.FC<MeshHeaderProps> = ({
  candidate,
  onSettingsClick,
  onShareClick,
}) => {
  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Mesh Gradient Banner with soft radial blur */}
      <div className="relative w-full h-44 overflow-hidden rounded-b-[2.5rem] bg-gradient-to-tr from-[#FF9A7B] via-[#E879F9] to-[#38BDF8]">
        {/* Soft radial overlay glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.3)_0%,_transparent_70%)] backdrop-blur-[2px]" />
        
        {/* Decorative soft circles */}
        <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-white/20 blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-[#CEF238]/30 blur-2xl" />

        {/* Top action icons */}
        <div className="absolute top-4 inset-x-5 flex items-center justify-between z-10">
          <div className="text-white/90 text-xs font-bold tracking-wide uppercase px-3 py-1 bg-black/20 backdrop-blur-md rounded-full">
            Fineed Talent Pass
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onShareClick}
              className="w-9 h-9 rounded-full bg-white/25 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/40 active:scale-95 transition-all shadow-sm"
              title="Share Profile"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onSettingsClick}
              className="w-9 h-9 rounded-full bg-white/25 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/40 active:scale-95 transition-all shadow-sm"
              title="Profile Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Centered Circular Portrait Avatar */}
      <div className="relative -mt-16 flex flex-col items-center z-10">
        <div className="relative w-28 h-28 rounded-full p-1.5 bg-white shadow-xl ring-4 ring-brand-lime">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
            alt={candidate.full_name}
            className="w-full h-full object-cover rounded-full"
          />
          {/* Active Status Badge */}
          <span className="absolute bottom-1 right-2 w-5 h-5 bg-[#CEF238] border-2 border-white rounded-full flex items-center justify-center shadow-sm">
            <span className="w-2 h-2 rounded-full bg-brand-dark animate-pulse" />
          </span>
        </div>

        {/* Candidate Info */}
        <div className="mt-3 text-center px-4">
          <h1 className="text-2xl font-extrabold text-brand-dark tracking-tight">
            {candidate.full_name}
          </h1>
          <p className="text-sm font-semibold text-brand-muted mt-0.5">
            {candidate.target_role || "Senior Product Designer"}
          </p>

          <div className="mt-2 flex items-center justify-center gap-1.5 text-xs font-semibold text-brand-dark/70">
            <MapPin className="w-3.5 h-3.5 text-brand-dark" />
            <span>{candidate.location || "Grenoble"}</span>
            <span className="text-gray-300">•</span>
            <span className="text-emerald-600 font-bold">Open to Offers</span>
          </div>
        </div>
      </div>
    </div>
  );
};
