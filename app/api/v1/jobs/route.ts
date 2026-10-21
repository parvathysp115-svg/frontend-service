import { NextResponse } from "next/server";
import { mockRecentJobs } from "@/services/mockData";

export async function GET() {
  return NextResponse.json(mockRecentJobs);
}
