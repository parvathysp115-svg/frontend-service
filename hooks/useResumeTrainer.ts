import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "../services/api";
import { ResumeOptimizationResponse, CareerRoadmapResponse } from "../services/types";

export function useResumeTrainer(candidateId?: string, targetRole?: string, jobId?: string) {
  const effectiveId = candidateId || "cand_fineed_9821";

  // Optimization data (ATS score, weak bullets, STAR rewrites)
  const optimizationQuery = useQuery<ResumeOptimizationResponse, Error>({
    queryKey: ["resume-optimization", effectiveId, targetRole, jobId],
    queryFn: () => apiService.trainResume(effectiveId, targetRole, jobId),
    staleTime: 1000 * 60 * 5,
  });

  // Career Roadmap & Interview Prep
  const roadmapQuery = useQuery<CareerRoadmapResponse, Error>({
    queryKey: ["coaching-roadmap", effectiveId, targetRole],
    queryFn: () => apiService.getCoachingRoadmap(effectiveId, targetRole),
    staleTime: 1000 * 60 * 10,
  });

  return {
    optimization: optimizationQuery.data,
    isLoadingOptimization: optimizationQuery.isLoading,
    roadmap: roadmapQuery.data,
    isLoadingRoadmap: roadmapQuery.isLoading,
    refetchOptimization: optimizationQuery.refetch,
  };
}
