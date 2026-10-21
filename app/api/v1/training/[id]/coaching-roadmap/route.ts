import { NextResponse } from "next/server";
import { mockCareerRoadmap } from "@/services/mockData";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({
    ...mockCareerRoadmap,
    candidate_id: params.id,
  });
}
