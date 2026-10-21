import { NextResponse } from "next/server";
import { mockCoverLetter } from "@/services/mockData";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json().catch(() => ({}));
    return NextResponse.json({
      ...mockCoverLetter,
      candidate_id: params.id,
      target_company: body.target_company || mockCoverLetter.target_company,
      target_role: body.target_role || mockCoverLetter.target_role,
    });
  } catch (err) {
    return NextResponse.json(mockCoverLetter);
  }
}
