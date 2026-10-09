import { Fraunces, Inter } from "next/font/google";
import Nav from "@/components/Nav.jsx";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "LeadFlow — Autonomous Lead Qualification & Scoring",
  description:
    "Autonomous inbound lead qualification, real-time conversational streaming, and deterministic lead scoring for high-velocity sales pipelines.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-bg font-body text-text flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-main focus:px-4 focus:py-2 focus:font-medium focus:text-bg focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <Nav />
        <main id="main-content" tabIndex={-1} className="mx-auto max-w-4xl px-6 py-12 focus:outline-none flex-1 w-full">
          {children}
        </main>
        <footer className="border-t border-black/10 bg-bg mt-auto">
          <div className="mx-auto max-w-5xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-text/60">
            <span className="font-heading font-semibold text-text/80 text-sm">LeadFlow</span>
            <span>Autonomous Inbound Lead Qualification Engine</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
