import type { Metadata, Viewport } from "next";
import "./globals.css";
import { QueryProvider } from "./QueryProvider";

export const metadata: Metadata = {
  title: "Fineed — AI Resume Training & Job Matching",
  description: "Pixel-accurate, mobile-first frontend client for Fineed AI matching and coaching platform.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#CEF238",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-brand-lime selection:text-brand-dark">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
