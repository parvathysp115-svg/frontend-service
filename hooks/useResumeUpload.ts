import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "../services/api";
import { ResumeUploadResponse } from "../services/types";
import { useAppStore } from "../stores/useAppStore";
import { useResumeStore } from "../stores/useResumeStore";

export function useResumeUpload() {
  const queryClient = useQueryClient();
  const { setCandidate } = useAppStore();
  const { setUploadedResume } = useResumeStore();

  return useMutation<ResumeUploadResponse, Error, FormData>({
    mutationFn: (formData: FormData) => apiService.uploadResume(formData),
    onSuccess: (data) => {
      if (data.profile) {
        setCandidate(data.profile);
      }
      setUploadedResume({
        id: data.candidate_id,
        fullName: data.full_name,
        parsedSkillsCount: data.parsed_skills_count,
        yearsOfExperience: data.years_of_experience,
        uploadedAt: new Date().toISOString(),
      });
      // Invalidate queries that depend on resume
      queryClient.invalidateQueries({ queryKey: ["resume-optimization", data.candidate_id] });
      queryClient.invalidateQueries({ queryKey: ["job-matches", data.candidate_id] });
    },
  });
}
