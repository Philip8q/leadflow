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
  title: "LeadFlow — Philip Omondi",
  description:
    "LeadFlow: AI-driven lead generation for small Kenyan real estate businesses, without burning $1,000/month on Meta ads.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-bg font-body text-text">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-main focus:px-4 focus:py-2 focus:font-medium focus:text-bg focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <Nav />
        <main id="main-content" tabIndex={-1} className="mx-auto max-w-4xl px-6 py-12 focus:outline-none">
          {children}
        </main>
      </body>
    </html>
  );
}
