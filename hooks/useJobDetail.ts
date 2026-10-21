import { useMutation, useQuery } from "@tanstack/react-query";
import { apiService } from "../services/api";
import { CoverLetterResponse } from "../services/types";

export function useJobDetail(jobId?: string, candidateId?: string) {
  const effectiveCandidateId = candidateId || "cand_fineed_9821";

  const coverLetterMutation = useMutation<
    CoverLetterResponse,
    Error,
    { targetCompany?: string; targetRole?: string }
  >({
    mutationFn: ({ targetCompany, targetRole }) =>
      apiService.generateCoverLetter(effectiveCandidateId, jobId, targetCompany, targetRole),
  });

  return {
    generateTailoredApplication: coverLetterMutation.mutateAsync,
    isGenerating: coverLetterMutation.isPending,
    tailoredData: coverLetterMutation.data,
  };
}
