import { Fraunces, Inter } from "next/font/google";
import Nav from "@/components/Nav.jsx";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-fraunces",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
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
        <Nav />
        <main className="mx-auto max-w-4xl px-6 py-12">{children}</main>
      </body>
    </html>
  );
}
