import {
  CandidateProfileResponse,
  JobPostingResponse,
  JobMatchCandidateItem,
  ResumeOptimizationResponse,
  CareerRoadmapResponse,
  CoverLetterResponse,
} from "./types";

export const mockCandidate: CandidateProfileResponse = {
  id: "cand_fineed_9821",
  full_name: "Sarah Laurent",
  email: "sarah.laurent@fineed.ai",
  phone: "+33 6 42 98 11 02",
  location: "Grenoble",
  visa_status: "EU Citizen / Full Work Authorization",
  target_role: "Senior Product Designer",
  years_of_experience: 5.5,
  skills: [
    "Figma",
    "React",
    "Python",
    "Design Systems",
    "Mobile UX",
    "Prototyping",
    "User Research",
    "Tailwind CSS",
    "Wireframing",
    "A/B Testing",
  ],
  work_history: [
    {
      title: "Senior UX/UI Designer",
      company: "Luminary Labs",
      location: "Grenoble, France (Hybrid)",
      start_date: "Mar 2022",
      end_date: "Present",
      duration_months: 32,
      responsibilities: [
        "Led cross-functional design sprints for flagship B2B enterprise analytics suite.",
        "Architected multi-brand design tokens bridging Figma variables with Tailwind CSS components.",
      ],
      achievements: [
        "Reduced user onboarding drop-off by 28% through redesigned progressive disclosure flows.",
        "Delivered unified UI component library adopted by 24 frontend engineers across 4 squads.",
      ],
      technologies_used: ["Figma", "Design Tokens", "React", "Tailwind CSS", "Zeroheight"],
    },
    {
      title: "Product Designer",
      company: "Apex Tech Innovations",
      location: "Lyon, France",
      start_date: "Sep 2019",
      end_date: "Feb 2022",
      duration_months: 29,
      responsibilities: [
        "Designed end-to-end iOS and Android experiences for fintech consumer app.",
        "Conducted weekly moderated user testing sessions and usability benchmark metrics.",
      ],
      achievements: [
        "Grew mobile daily active users (DAU) from 120k to 650k with frictionless biometric authentication.",
        "Engineered rapid interactive prototypes that accelerated executive approval cycles by 3x.",
      ],
      technologies_used: ["Figma", "Protopie", "iOS Human Interface", "Material Design", "Jira"],
    },
  ],
  education: [
    {
      degree: "Master of Science in Human-Computer Interaction",
      institution: "Grenoble Institute of Technology (Grenoble INP)",
      graduation_year: "2019",
      gpa: "3.9 / 4.0",
    },
  ],
  certifications: [
    "Nielsen Norman Group UX Master Certified",
    "Enterprise Design Thinking Practitioner (IBM)",
  ],
  created_at: "2026-08-15T09:30:00Z",
  updated_at: "2026-10-21T14:10:00Z",
};

export const mockRecommendedMatches: JobMatchCandidateItem[] = [
  {
    job_id: "job_airbnb_01",
    job_title: "Senior Product Designer",
    company: "Airbnb",
    location: "Grenoble / Remote",
    remote_policy: "Hybrid (2 days/mo)",
    overall_score: 94,
    min_salary: 6800,
    max_salary: 8500,
    salary_currency: "EUR",
    featured_image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    breakdown: {
      vector_score: 96.2,
      skills_score: 92.5,
      experience_score: 95.0,
      hard_constraints_score: 100.0,
      hard_constraints_passed: true,
    },
    matching_skills: ["Figma", "Design Systems", "Mobile UX", "User Research", "Prototyping"],
    missing_must_have_skills: [],
    missing_nice_to_have_skills: ["Design Tokens Architecture", "WCAG 2.1 AAA Accessibility"],
    recommendation_summary:
      "Exceptional compatibility. Candidate portfolio and mobile design systems match Airbnb's guest experience team requirements with 94% confidence.",
  },
  {
    job_id: "job_linear_02",
    job_title: "Lead UX Architect",
    company: "Linear",
    location: "Paris / Remote",
    remote_policy: "Full Remote",
    overall_score: 91,
    min_salary: 7500,
    max_salary: 9200,
    salary_currency: "EUR",
    featured_image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    breakdown: {
      vector_score: 93.0,
      skills_score: 89.0,
      experience_score: 92.0,
      hard_constraints_score: 100.0,
      hard_constraints_passed: true,
    },
    matching_skills: ["Figma", "React", "Mobile UX", "Prototyping", "Design Systems"],
    missing_must_have_skills: ["Keyboard-first Navigation"],
    missing_nice_to_have_skills: ["WebGL Micro-interactions"],
    recommendation_summary:
      "High velocity fit. Strong systems thinking aligns directly with Linear's precision engineering culture.",
  },
  {
    job_id: "job_stripe_03",
    job_title: "Design Systems Engineer",
    company: "Stripe",
    location: "Dublin / Hybrid",
    remote_policy: "Hybrid",
    overall_score: 88,
    min_salary: 8000,
    max_salary: 10500,
    salary_currency: "EUR",
    featured_image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
    breakdown: {
      vector_score: 89.5,
      skills_score: 86.0,
      experience_score: 88.0,
      hard_constraints_score: 100.0,
      hard_constraints_passed: true,
    },
    matching_skills: ["React", "Tailwind CSS", "Figma", "Design Systems"],
    missing_must_have_skills: ["TypeScript Generics"],
    missing_nice_to_have_skills: ["Storybook Testing Matrix"],
    recommendation_summary:
      "Strong candidate for bridging design and frontend implementation on the Stripe Checkout team.",
  },
];

export const mockRecentJobs: JobPostingResponse[] = [
  {
    id: "rec_job_01",
    title: "Mid-level UX Designer",
    company: "Spotify",
    description:
      "Craft immersive audio recommendation surfaces and personalized listener journeys across mobile, tablet, and connected devices.",
    requirements:
      "3+ years experience with high-fidelity interaction design, user research, and cross-platform design systems.",
    location: "Stockholm / Remote",
    remote_policy: "Hybrid",
    min_salary: 5200,
    max_salary: 6800,
    salary_currency: "EUR",
    min_years_experience: 3.0,
    required_skills: ["Figma", "Mobile UX", "User Research", "Prototyping"],
    preferred_skills: ["Audio UX", "Design Systems"],
    visa_sponsorship: true,
    is_active: true,
    created_at: "2026-10-20T11:00:00Z",
    updated_at: "2026-10-20T11:00:00Z",
    badge: "Applied",
    applied_at: "Yesterday at 15:42",
    logo_url: "https://images.unsplash.com/photo-1614680376593-902f749f7ffc?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: "rec_job_02",
    title: "Product Design Lead",
    company: "Figma",
    description:
      "Drive next-generation collaborative authoring tools and AI-assisted layout features inside the world's favorite canvas.",
    requirements:
      "5+ years crafting deeply interactive web apps, canvas ergonomics, and vector manipulation workflows.",
    location: "London / Remote",
    remote_policy: "Remote",
    min_salary: 8800,
    max_salary: 11000,
    salary_currency: "GBP",
    min_years_experience: 5.0,
    required_skills: ["Figma", "Design Systems", "Interaction Design", "Prototyping"],
    preferred_skills: ["Canvas / WebGL", "AI UX"],
    visa_sponsorship: true,
    is_active: true,
    created_at: "2026-10-21T08:30:00Z",
    updated_at: "2026-10-21T08:30:00Z",
    badge: "New",
    logo_url: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: "rec_job_03",
    title: "Design System Specialist",
    company: "Notion",
    description:
      "Expand Notion's component foundation across modular blocks, dark mode themes, and ultra-accessible color tokens.",
    requirements:
      "Proven track record creating atomic component libraries in Figma and pairing with production React components.",
    location: "Dublin / Hybrid",
    remote_policy: "Hybrid",
    min_salary: 6200,
    max_salary: 7900,
    salary_currency: "EUR",
    min_years_experience: 4.0,
    required_skills: ["Design Systems", "Figma", "React", "Accessibility"],
    preferred_skills: ["CSS Modules", "Tailwind CSS"],
    visa_sponsorship: true,
    is_active: true,
    created_at: "2026-10-19T14:15:00Z",
    updated_at: "2026-10-19T14:15:00Z",
    badge: "New",
    logo_url: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: "rec_job_04",
    title: "Senior Frontend Designer",
    company: "Supabase",
    description:
      "Bridge engineering and product design by translating database administration workflows into stunning, delightful cloud interfaces.",
    requirements:
      "Strong proficiency with React, Tailwind CSS, high-fidelity mockups, and micro-interactions.",
    location: "Global Remote",
    remote_policy: "Remote",
    min_salary: 7000,
    max_salary: 9500,
    salary_currency: "USD",
    min_years_experience: 4.5,
    required_skills: ["React", "Tailwind CSS", "Figma", "TypeScript"],
    preferred_skills: ["SQL UI", "Next.js"],
    visa_sponsorship: true,
    is_active: true,
    created_at: "2026-10-18T10:00:00Z",
    updated_at: "2026-10-18T10:00:00Z",
    badge: "Applied",
    applied_at: "3 days ago",
    logo_url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=120&q=80",
  },
];

export const mockOptimizationData: ResumeOptimizationResponse = {
  candidate_id: "cand_fineed_9821",
  target_role_evaluated: "Senior Product Designer",
  ats_score: 87,
  ats_summary:
    "Strong typography and quantifiable achievements. High relevance for Lead / Senior UX positions. Identified 3 weak passive bullet points that can be rewritten with metrics to reach 96+ ATS ranking.",
  weak_bullet_points: [
    {
      original_text:
        "Responsible for improving user experience on the mobile app and increased engagement across customers.",
      role_or_context: "Apex Tech Innovations • Product Designer",
      issue_type: "PASSIVE_VOICE",
      critique:
        "Uses passive 'Responsible for' phrasing and lacks concrete numerical metrics or business conversion figures.",
    },
    {
      original_text:
        "Created wireframes and tested with users for the new dashboard to see how they reacted.",
      role_or_context: "Luminary Labs • Senior UX/UI Designer",
      issue_type: "MISSING_METRICS",
      critique:
        "Fails to specify cohort sample size, test iterations, or the percentage reduction in task completion time.",
    },
    {
      original_text:
        "Collaborated with developers to implement modern design system components.",
      role_or_context: "Luminary Labs • Senior UX/UI Designer",
      issue_type: "VAGUE_IMPACT",
      critique:
        "Doesn't highlight the scale of the design system, speed gains in development, or token adoption rate.",
    },
  ],
  star_rewrites: [
    {
      original_bullet:
        "Responsible for improving user experience on the mobile app and increased engagement across customers.",
      situation: "Fintech mobile app suffered from high drop-off during biometric authentication & KYC steps.",
      task: "Redesign the complete user onboarding funnel to maximize conversion rates and user trust.",
      action:
        "Spearheaded mobile redesign for 1.2M active users using Figma and React Native with progressive disclosure.",
      result: "Reduced checkout friction by 34% and boosted quarterly recurring conversions by €420,000.",
      rewritten_bullet:
        "Spearheaded mobile redesign for 1.2M active users using Figma and React Native, reducing checkout friction by 34% and boosting quarterly recurring conversions by €420,000.",
    },
    {
      original_bullet:
        "Created wireframes and tested with users for the new dashboard to see how they reacted.",
      situation: "Enterprise analytics users took an average of 4.2 minutes to build custom query widgets.",
      task: "Optimize information architecture and run rapid empirical usability testing across user tiers.",
      action:
        "Orchestrated 42 usability testing sessions across 3 enterprise customer cohorts, producing 18 rapid Figma prototypes.",
      result: "Cut average dashboard time-to-task by 48% and earned a System Usability Scale (SUS) score of 89/100.",
      rewritten_bullet:
        "Orchestrated 42 usability test sessions across 3 user cohorts, iterating 18 high-fidelity prototypes in Figma that lowered time-to-task by 48% and elevated SUS score to 89.",
    },
    {
      original_bullet:
        "Collaborated with developers to implement modern design system components.",
      situation: "Frontend team was duplicating UI code across 4 disconnected codebases with inconsistent styling.",
      task: "Construct a single source of truth multi-brand design system with automated token synchronization.",
      action:
        "Architected unified token architecture across Figma variables and Tailwind CSS, partnering with 24 frontend engineers.",
      result: "Accelerated sprint feature velocity by 40% and reduced UI bug tickets by 62% in the first quarter.",
      rewritten_bullet:
        "Architected unified token architecture bridging Figma variables and Tailwind CSS with 24 frontend engineers, boosting team sprint velocity by 40% and slashing UI regression bugs by 62%.",
    },
  ],
  missing_high_value_keywords: [
    "Design Tokens Architecture",
    "WCAG 2.1 AAA Accessibility",
    "Quantitative Usability Benchmarking",
    "A/B Split Test Significance",
    "Micro-interactions & Spring Physics",
  ],
  recommended_certifications: [
    "NN/g UX Master Certification",
    "Interaction Design Foundation (IxDF) Design Systems Specialist",
    "Certified Accessibility Professional (CPACC)",
  ],
  actionable_next_steps: [
    "Replace passive phrasing with active action verbs (Orchestrated, Spearheaded, Architected).",
    "Inject quantifiable ROI or time-to-task metrics in all current role bullets.",
    "Explicitly include 'WCAG 2.1 Accessibility' and 'Design Tokens' in core skill tags.",
  ],
};

export const mockCareerRoadmap: CareerRoadmapResponse = {
  candidate_id: "cand_fineed_9821",
  target_role: "Staff / Principal Product Designer",
  gap_summary:
    "Candidate is already operating at a high Senior level. To transition into Staff/Principal level, focus on executive business storytelling, design token governance at scale, and AI-native interaction models.",
  learning_roadmap: [
    {
      week_or_phase: "Weeks 1-2: Design Tokens & Scaled Governance",
      focus_topic: "Automated Figma-to-Code Token CI/CD Pipeline",
      learning_resources: [
        "W3C Design Tokens Community Group Specification",
        "Nathan Curtis: Design System Architecture & Tiered Components",
      ],
      hands_on_project:
        "Build a GitHub Action that parses Figma Tokens JSON and exports multi-platform Tailwind & iOS Swift themes.",
      expected_outcome: "Proven capability to lead enterprise-grade design infrastructure.",
    },
    {
      week_or_phase: "Weeks 3-4: AI Interaction Design & Latency Ergonomics",
      focus_topic: "Designing for Non-Deterministic & Streaming Agent Interfaces",
      learning_resources: [
        "Apple HIG for Intelligence & Generative UI",
        "Google People + AI Guidebook (PAIR)",
      ],
      hands_on_project:
        "Design a multi-modal conversational mobile assistant with graceful error recovery and speculative UI updates.",
      expected_outcome: "Modern mastery of AI-native UX patterns.",
    },
  ],
  interview_prep_pointers: [
    {
      category: "System Design",
      question:
        "How would you architect a global design system that supports dark mode, brand white-labeling, and international RTL scripts?",
      key_points_to_cover: [
        "Semantic color aliasing (Global -> Alias -> Component)",
        "CSS logical properties for LTR/RTL bidirectional layout",
        "Automated visual regression testing with Playwright / Chromatic",
      ],
      sample_answer_outline:
        "Start with token hierarchy tiers, walk through governance rituals, and explain how developer handover is automated via CI.",
    },
    {
      category: "Behavioral/STAR",
      question:
        "Describe a time when engineering pushback threatened a high-priority design initiative. How did you align the team?",
      key_points_to_cover: [
        "Translating UX friction into engineering maintenance costs",
        "Proposing phased milestone compromises without sacrificing user empathy",
        "Demonstrating prototype metrics to build consensus",
      ],
      sample_answer_outline:
        "Highlight collaborative discovery sessions, pragmatic scope staging, and objective user data over personal aesthetic preferences.",
    },
  ],
};

export const mockCoverLetter: CoverLetterResponse = {
  candidate_id: "cand_fineed_9821",
  target_company: "Airbnb",
  target_role: "Senior Product Designer",
  cover_letter_markdown: `Dear Airbnb Hiring Team,

I am writing to express my enthusiasm for the Senior Product Designer role. Having admired Airbnb's uncompromising standard for craft and community-centered design, I am excited about the opportunity to bring my experience in scalable design systems, mobile ergonomics, and high-impact conversion optimization to the guest experience team.

At Luminary Labs and Apex Tech, I led mobile initiatives reaching over 1.2M active users, achieving a 34% reduction in checkout drop-off and standardizing token architecture across multi-disciplinary teams. Airbnb's dedication to making every traveler feel at home globally resonates deeply with my focus on accessible, human-centric design.

I look forward to discussing how my background in rapid prototyping, metrics-driven UX research, and component governance can contribute to Airbnb's next generation of category-defining experiences.

Warm regards,  
Sarah Laurent`,
  key_selling_points_highlighted: [
    "Scaled mobile experiences to 1.2M+ active users",
    "34% measured reduction in checkout conversion friction",
    "Pioneered cross-squad Figma token architecture adopting W3C standards",
  ],
};
