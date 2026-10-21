import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          lime: "#CEF238",
          "lime-hover": "#BDE524",
          "lime-light": "#F2FDC3",
          dark: "#111827",
          black: "#000000",
          surface: "#F8F9FA",
          input: "#F3F4F6",
          border: "#E5E7EB",
          muted: "#6B7280",
          card: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "'Inter'", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        pill: "0 4px 14px 0 rgba(0, 0, 0, 0.06)",
        "lime-glow": "0 8px 24px -4px rgba(206, 242, 56, 0.45)",
        floating: "0 10px 30px -5px rgba(0, 0, 0, 0.08)",
        card: "0 2px 12px -2px rgba(0, 0, 0, 0.05)",
      },
      backgroundImage: {
        "profile-mesh": "linear-gradient(135deg, #FF9A7B 0%, #E879F9 50%, #38BDF8 100%)",
        "lime-radial": "radial-gradient(circle at 50% 20%, #E2FC6B 0%, #CEF238 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
