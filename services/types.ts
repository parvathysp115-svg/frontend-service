// TypeScript types matching FastAPI Pydantic schemas 1:1

export interface WorkExperienceItem {
  title: string;
  company: string;
  location?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  duration_months?: number | null;
  responsibilities: string[];
  achievements: string[];
  technologies_used: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  graduation_year?: string | null;
  gpa?: string | null;
}

export interface CandidateProfileCreate {
  full_name: string;
  email?: string | null;
  phone?: string | null;
  location?: string | null;
  visa_status?: string | null;
  target_role?: string | null;
  years_of_experience: number;
  skills: string[];
  work_history: WorkExperienceItem[];
  education: EducationItem[];
  certifications: string[];
  raw_text?: string | null;
}

export interface CandidateProfileResponse {
  id: string;
  full_name: string;
  email?: string | null;
  phone?: string | null;
  location?: string | null;
  visa_status?: string | null;
  target_role?: string | null;
  years_of_experience: number;
  skills: string[];
  work_history: WorkExperienceItem[];
  education: EducationItem[];
  certifications: string[];
  created_at: string;
  updated_at: string;
}

export interface ResumeUploadResponse {
  message: string;
  candidate_id: string;
  full_name: string;
  parsed_skills_count: number;
  years_of_experience: number;
  embedding_indexed: boolean;
  profile: CandidateProfileResponse;
}

export interface JobPostingResponse {
  id: string;
  title: string;
  company: string;
  description: string;
  requirements: string;
  location?: string | null;
  remote_policy: string;
  min_salary?: number | null;
  max_salary?: number | null;
  salary_currency: string;
  min_years_experience: number;
  required_skills: string[];
  preferred_skills: string[];
  visa_sponsorship: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  // UI presentation extras
  logo_url?: string;
  featured_image?: string;
  badge?: "Applied" | "New" | "Featured" | null;
  applied_at?: string;
}

export interface MatchBreakdown {
  vector_score: number; // 40% weight
  skills_score: number; // 35% weight
  experience_score: number; // 15% weight
  hard_constraints_score: number; // 10% weight
  hard_constraints_passed: boolean;
}

export interface JobMatchCandidateItem {
  job_id: string;
  job_title: string;
  company: string;
  location?: string | null;
  remote_policy: string;
  overall_score: number;
  breakdown: MatchBreakdown;
  matching_skills: string[];
  missing_must_have_skills: string[];
  missing_nice_to_have_skills: string[];
  recommendation_summary: string;
  min_salary?: number;
  max_salary?: number;
  salary_currency?: string;
  featured_image?: string;
}

export interface MatchResumeResponse {
  candidate_id: string;
  candidate_name: string;
  total_jobs_evaluated: number;
  top_matches: JobMatchCandidateItem[];
}

export interface WeakBulletPoint {
  original_text: string;
  role_or_context: string;
  issue_type: "PASSIVE_VOICE" | "MISSING_METRICS" | "VAGUE_IMPACT" | string;
  critique: string;
}

export interface STARBulletRewrite {
  original_bullet: string;
  situation: string;
  task: string;
  action: string;
  result: string;
  rewritten_bullet: string;
}

export interface ResumeOptimizationResponse {
  candidate_id: string;
  target_role_evaluated: string;
  ats_score: number;
  ats_summary: string;
  weak_bullet_points: WeakBulletPoint[];
  star_rewrites: STARBulletRewrite[];
  missing_high_value_keywords: string[];
  recommended_certifications: string[];
  actionable_next_steps: string[];
}

export interface RoadmapMilestone {
  week_or_phase: string;
  focus_topic: string;
  learning_resources: string[];
  hands_on_project: string;
  expected_outcome: string;
}

export interface InterviewPrepPointer {
  category: "System Design" | "Algorithmic/Coding" | "Behavioral/STAR" | string;
  question: string;
  key_points_to_cover: string[];
  sample_answer_outline: string;
}

export interface CareerRoadmapResponse {
  candidate_id: string;
  target_role: string;
  gap_summary: string;
  learning_roadmap: RoadmapMilestone[];
  interview_prep_pointers: InterviewPrepPointer[];
}

export interface CoverLetterResponse {
  candidate_id: string;
  target_company: string;
  target_role: string;
  cover_letter_markdown: string;
  key_selling_points_highlighted: string[];
}
