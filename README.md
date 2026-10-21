# Fineed — AI Resume Training & Job Matching Mobile Frontend

A pixel-accurate, mobile-first frontend client for the **Fineed** AI Resume Training and Job Matching platform that connects to our FastAPI backend (`/api/v1/...`).

Built with **Next.js 14/15 App Router** configured as a mobile-first PWA with an interactive mobile simulator viewport (iPhone 16 Pro styling, Dynamic Island, status bar, and edge-to-edge toggle).

---

## 🎨 UI/UX Design System & Token Specifications

| Design Element | Visual Token | Component Implementation |
|---|---|---|
| **Primary Accent** | `#CEF238` (Vibrant Lime) | Splash screen background, CTA buttons, active highlights, match scores, edit actions |
| **Dark Controls** | `#111827` / `#000000` (Onyx) | Advance arrow button, filter buttons, primary headlines, floating bottom navigation |
| **Neutral Backgrounds** | `#FFFFFF` / `#F8F9FA` | Screen surfaces, container cards, drawer backgrounds |
| **Input Fields** | `#F3F4F6` with `#9CA3AF` placeholder | Fully rounded pill inputs with left-aligned icons (Name, Email, Phone, Password) |
| **Dividers & Borders** | `#E5E7EB` (1px subtle border) | Card outlines, tab separators, timeline dividers |
| **Profile Mesh Banner** | `linear-gradient(135deg, #FF9A7B 0%, #E879F9 50%, #38BDF8 100%)` | Radial blur container behind centered circular avatar with lime ring |
| **Typography** | `Plus Jakarta Sans` / `Inter` | Bold display headlines (`text-2xl` - `text-3xl font-black`) with slate subtext |
| **Geometry** | Fully rounded pills (`rounded-full`) & squircles (`rounded-3xl`) | Pill inputs, CTA buttons, circular action icons (`w-12 h-12`) |

---

## 📱 Screen Inventory & Features

### Screen 1: Splash & Onboarding Flow
- **Splash Screen**: Animated `#CEF238` brand lime splash featuring the bold **Fineed** wordmark, micro-badge, and tap-to-advance transition.
- **3-Step Carousel**:
  1. *"Find your dream job now Here"* (Proprietary multi-dimensional hybrid matching agent)
  2. *"Easy To Apply on Mobile App"* (1-tap apply with agent-optimized STAR bullets)
  3. *"Over 4,000 Jobs waiting For you"* (Direct recruiter opportunities)
- **Controls**: 3-dot active pagination indicators, bottom-left **Skip** action, and bottom-right circular black arrow button (`#111827`) to advance.

### Screen 2: Authentication ("We Say Hello!")
- **Mode Toggle**: Clean pill segmented control switching between **Sign In** and **Sign Up**.
- **Form Inputs**: Pill inputs (`#F3F4F6`) with embedded left icons for Name, Email, Phone, and Password (with visibility toggle). Validated via **React Hook Form + Zod**.
- **Primary CTA**: Full-width `#CEF238` button (*"Log In"* / *"Create Account"*).
- **Social Logins**: Circular action buttons for Google, Instagram, and X/Twitter.

### Screen 3: Home & Job Feed
- **Top App Bar**: Grid menu button, centered Fineed title, and circular candidate avatar ring.
- **Search Bar**: Pill-shaped input with live filter and dark filter button (`#111827`).
- **AI Coach Banner**: Quick callout showing ATS score and 1-tap jump to the AI Coach Studio.
- **Recommended Jobs Carousel**: Horizontal swipeable cards displaying workspace photography, company, role title, salary tag (`$50 - $75 / Mo`), and compatibility score badge (`94% Match`).
- **Recently Posted & Applied**: Vertical list of job items showing company logo squares, role titles ("Mid-level UX Designer"), company name, and status badges ("Applied" or "New").
- **Floating Bottom Nav**: 5-tab floating bar with icons for Home, Explore, AI Coach, Alerts, and Profile with spring animated lime indicator.

### Screen 4: Resume Training & AI Coach Studio (Core Agent Screen)
- **Upload Zone**: Drag-and-drop or file upload supporting PDF/DOCX/TXT connecting to `POST /api/v1/resumes/upload`.
- **ATS Radial Gauge**: Visual circular SVG progress ring dynamically reflecting resume strength (87% baseline, boosting up to 99% upon accepting rewrites).
- **STAR Rewriter Diff View**: Interactive card displaying:
  - *Before (Weak Bullet)*: Passive phrasing and missing metrics with critique badge.
  - *After (Agent-Optimized STAR Bullet)*: Quantified metrics, active verbs, and business ROI.
  - *1-Tap Accept Rewrite*: Live ATS points increment with particle confetti!
- **Skill Gaps & Keywords**: High-value keywords extracted by `optimization_agent` (e.g. Design Tokens Architecture, WCAG 2.1 AAA Accessibility).
- **Learning Roadmap**: Multi-phase milestones with recommended resources and proof-of-work projects.

### Screen 5: Job Match Detail & Compatibility Drawer
- **Drawer Bottom Sheet**: Smooth slide-up sheet with close gesture.
- **Match Breakdown Matrix**:
  - *Skills Fit* (35% weight)
  - *Experience Fit* (40% weight - semantic vector score)
  - *Seniority Alignment* (15% weight)
  - *Mandatory Filters / Visa* (10% weight - 100% Passed)
- **1-Tap Tailored Apply**: Triggers backend tailored application modal with custom cover letter and adapted bullet points.

### Screen 6: Profile & Experience Management
- **Mesh Header Banner**: Vibrant radial peach-to-blue gradient behind a circular portrait avatar, candidate name (*Sarah Laurent*), title (*Senior Product Designer*), and location pin (*Grenoble*).
- **About & Core Skills**: Bio card and skill badges with brand icons (Figma, React, Python, Design Systems).
- **Work Experience Timeline**: Company, role, duration, achievements list, and edit pencil button linking directly to the inline editor modal.
- **Inline Experience Modal**: Real-time form allowing candidates to update role titles, dates, and accomplishments.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 14/15 App Router (Configured as Mobile-First PWA)
- **Styling**: Tailwind CSS v3 with custom `#CEF238`, `#111827`, and `#F8F9FA` tokens
- **State Management**: TanStack Query (React Query v5) + Zustand
- **Animations**: Framer Motion for swipe cards, bottom sheets, and spring transitions
- **Form Handling**: React Hook Form + Zod schema validation matching FastAPI Pydantic schemas
- **Icons**: Lucide Icons
- **Visual Delight**: Canvas Confetti for resume optimization milestones

---

## 🚀 Getting Started

### 1. Start the Frontend Client
```bash
npm run dev
```
The client runs on [http://localhost:3000](http://localhost:3000) using high-speed Turbopack.

### 2. Connect to the FastAPI Backend
By default, the client automatically proxies to `http://localhost:8000/api/v1/`. If the backend is running, live data is used; otherwise, rich interactive mock data is seamlessly rendered with a live connection status pill in the top controller bar.
