import { NextResponse } from "next/server";
import { mockOptimizationData } from "@/services/mockData";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json().catch(() => ({}));
    return NextResponse.json({
      ...mockOptimizationData,
      candidate_id: params.id,
      target_role_evaluated: body.target_role || mockOptimizationData.target_role_evaluated,
    });
  } catch (err) {
    return NextResponse.json(mockOptimizationData);
  }
}
