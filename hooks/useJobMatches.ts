import { useQuery } from "@tanstack/react-query";
import { apiService } from "../services/api";
import { MatchResumeResponse, JobPostingResponse } from "../services/types";

export function useJobMatches(resumeId?: string) {
  const effectiveId = resumeId || "cand_fineed_9821";

  const recommendedMatchesQuery = useQuery<MatchResumeResponse, Error>({
    queryKey: ["job-matches", effectiveId],
    queryFn: () => apiService.getJobMatches(effectiveId, 10),
    staleTime: 1000 * 60 * 5,
  });

  const recentJobsQuery = useQuery<JobPostingResponse[], Error>({
    queryKey: ["recent-jobs"],
    queryFn: () => apiService.getRecentJobs(),
    staleTime: 1000 * 60 * 5,
  });

  return {
    recommendedMatches: recommendedMatchesQuery.data?.top_matches || [],
    isLoadingMatches: recommendedMatchesQuery.isLoading,
    recentJobs: recentJobsQuery.data || [],
    isLoadingRecent: recentJobsQuery.isLoading,
    refetchMatches: recommendedMatchesQuery.refetch,
  };
}
