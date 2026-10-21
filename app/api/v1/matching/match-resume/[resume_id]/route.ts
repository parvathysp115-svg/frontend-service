import { NextResponse } from "next/server";
import { mockCandidate, mockRecommendedMatches } from "@/services/mockData";

export async function POST(
  req: Request,
  { params }: { params: { resume_id: string } }
) {
  return NextResponse.json({
    candidate_id: params.resume_id,
    candidate_name: mockCandidate.full_name,
    total_jobs_evaluated: 48,
    top_matches: mockRecommendedMatches,
  });
}
