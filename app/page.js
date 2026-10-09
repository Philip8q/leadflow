import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16 py-4">
      {/* Hero Section */}
      <section className="flex flex-col gap-6 text-left sm:text-left">
        <h1 className="font-heading text-4xl font-semibold leading-tight text-main sm:text-5xl lg:text-6xl">
          Automate Inbound Lead Qualification & Scoring.
        </h1>

        <p className="text-text/80 text-lg sm:text-xl leading-relaxed max-w-2xl font-body">
          LeadFlow engages inbound real estate and B2B prospects through natural conversational discovery, extracts intent and budget certainty, and deterministically scores every lead before your sales team spends a single minute on outreach.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
          <Link
            href="/demo/lead-chat"
            className="inline-flex items-center justify-center rounded-lg bg-main px-6 py-3.5 font-body font-semibold text-bg shadow-sm hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-main focus-visible:outline-offset-2"
          >
            Launch Live AI Qualification Demo →
          </Link>
          <Link
            href="/demo"
            className="inline-flex items-center justify-center rounded-lg border border-black/20 bg-white px-6 py-3.5 font-body font-medium text-text hover:bg-black/5 hover:border-black/30 transition-all focus-visible:outline-2 focus-visible:outline-main focus-visible:outline-offset-2"
          >
            Configure Alert Settings
          </Link>
        </div>
      </section>

      {/* Feature Capabilities Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-black/10">
        <div className="group flex flex-col gap-3 rounded-xl border border-black/10 bg-white p-6 shadow-xs hover:border-black/20 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
          <div className="w-10 h-10 rounded-lg bg-main/10 flex items-center justify-center text-main">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a.75.75 0 01-.974-.974 5.974 5.974 0 011.057-2.035C4.168 16.275 3 14.268 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
          </div>
          <h3 className="font-heading text-xl font-semibold text-text">
            Autonomous Intake
          </h3>
          <p className="text-sm text-text/80 leading-relaxed">
            Multi-turn streaming dialogues powered by the Vercel AI SDK. Gently uncovers timeline, location, property type, budget, and contact channels.
          </p>
          <Link href="/demo/lead-chat" className="text-xs font-semibold text-main hover:underline mt-auto pt-2 inline-flex items-center gap-1">
            <span>Try conversation</span>
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="group flex flex-col gap-3 rounded-xl border border-black/10 bg-white p-6 shadow-xs hover:border-black/20 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
          <div className="w-10 h-10 rounded-lg bg-main/10 flex items-center justify-center text-main">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125-1.125V4.125z" />
            </svg>
          </div>
          <h3 className="font-heading text-xl font-semibold text-text">
            Deterministic Scoring
          </h3>
          <p className="text-sm text-text/80 leading-relaxed">
            Calls a typed server-side <code className="bg-black/5 px-1 py-0.5 rounded text-xs font-mono">scoreLead</code> tool. Eliminates LLM math hallucinations and categorizes leads into Hot (75+), Warm, or Cold tiers.
          </p>
          <Link href="/case-study" className="text-xs font-semibold text-main hover:underline mt-auto pt-2 inline-flex items-center gap-1">
            <span>Read architecture</span>
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="group flex flex-col gap-3 rounded-xl border border-black/10 bg-white p-6 shadow-xs hover:border-black/20 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
          <div className="w-10 h-10 rounded-lg bg-main/10 flex items-center justify-center text-main">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
          </div>
          <h3 className="font-heading text-xl font-semibold text-text">
            Instant Alert Routing
          </h3>
          <p className="text-sm text-text/80 leading-relaxed">
            Customizable notification preferences and threshold alerts ensure your brokers are instantly dispatched only to high-value prospects.
          </p>
          <Link href="/demo" className="text-xs font-semibold text-main hover:underline mt-auto pt-2 inline-flex items-center gap-1">
            <span>View alert rules</span>
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>

      {/* Live Interactive Callout Card */}
      <section className="relative overflow-hidden rounded-2xl border border-black/10 bg-white p-8 shadow-xs before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5 before:bg-main flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2 max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-main font-body">Interactive Sandbox</span>
          <h2 className="font-heading text-2xl font-semibold text-text">
            Experience the Live Qualification Engine
          </h2>
          <p className="text-sm text-text/80 leading-relaxed">
            Test the conversational advisor as a buyer, seller, or tenant. Inspect real-time token streaming, dynamic lead score cards, and deterministic rubric evaluation.
          </p>
        </div>
        <Link
          href="/demo/lead-chat"
          className="inline-flex shrink-0 items-center justify-center rounded-lg bg-main px-6 py-3 font-body font-semibold text-bg shadow-sm hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-main focus-visible:outline-offset-2"
        >
          Launch Chat Demo →
        </Link>
      </section>

      {/* Case Study Callout */}
      <section className="flex flex-col gap-4 border-t border-black/10 pt-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-heading text-2xl font-semibold text-text">
              Engineering Architecture & Case Study
            </h2>
            <p className="text-sm text-text/75 mt-1">
              Deep dive into how we decoupled conversational entity extraction from deterministic scoring.
            </p>
          </div>
          <Link
            href="/case-study"
            className="group inline-flex items-center gap-1 text-sm font-semibold text-main hover:underline"
          >
            <span>Read Full Case Study</span>
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
