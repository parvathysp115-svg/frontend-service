import { NextResponse } from "next/server";
import { mockCandidate } from "@/services/mockData";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const rawText = formData.get("raw_text") as string | null;

    const fileName = file ? file.name : "pasted_resume.txt";

    return NextResponse.json(
      {
        message: "Resume successfully processed, structured, and vector indexed.",
        candidate_id: mockCandidate.id,
        full_name: mockCandidate.full_name,
        parsed_skills_count: mockCandidate.skills.length,
        years_of_experience: mockCandidate.years_of_experience,
        embedding_indexed: true,
        profile: mockCandidate,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ detail: "Failed to parse upload" }, { status: 500 });
  }
}
