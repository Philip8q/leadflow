import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16 py-4">
      {/* Hero Section */}
      <section className="flex flex-col gap-6 text-left sm:text-left">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-main/20 bg-main/5 px-3.5 py-1 text-xs font-medium text-main">
          <span>Production AI Agent</span>
          <span>•</span>
          <span>Next.js 16 + Vercel AI SDK</span>
        </div>

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
            className="inline-flex items-center justify-center rounded-lg border border-black/20 bg-white px-6 py-3.5 font-body font-medium text-text hover:bg-black/5 transition-colors focus-visible:outline-2 focus-visible:outline-main focus-visible:outline-offset-2"
          >
            Configure Alert Settings
          </Link>
        </div>
      </section>

      {/* Feature Capabilities Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-black/10">
        <div className="flex flex-col gap-3 rounded-xl border border-black/10 bg-white p-6 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-main/10 flex items-center justify-center font-heading font-bold text-main">
            01
          </div>
          <h3 className="font-heading text-xl font-semibold text-text">
            Autonomous Intake
          </h3>
          <p className="text-sm text-text/80 leading-relaxed">
            Multi-turn streaming dialogues powered by the Vercel AI SDK. Gently uncovers timeline, location, property type, budget, and contact channels.
          </p>
          <Link href="/demo/lead-chat" className="text-xs font-semibold text-main hover:underline mt-auto pt-2">
            Try conversation →
          </Link>
        </div>

        <div className="flex flex-col gap-3 rounded-xl border border-black/10 bg-white p-6 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-main/10 flex items-center justify-center font-heading font-bold text-main">
            02
          </div>
          <h3 className="font-heading text-xl font-semibold text-text">
            Deterministic Scoring
          </h3>
          <p className="text-sm text-text/80 leading-relaxed">
            Calls a typed server-side <code className="bg-black/5 px-1 py-0.5 rounded text-xs font-mono">scoreLead</code> tool. Eliminates LLM math hallucinations and categorizes leads into Hot (75+), Warm, or Cold tiers.
          </p>
          <Link href="/case-study" className="text-xs font-semibold text-main hover:underline mt-auto pt-2">
            Read architecture →
          </Link>
        </div>

        <div className="flex flex-col gap-3 rounded-xl border border-black/10 bg-white p-6 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-main/10 flex items-center justify-center font-heading font-bold text-main">
            03
          </div>
          <h3 className="font-heading text-xl font-semibold text-text">
            Instant Alert Routing
          </h3>
          <p className="text-sm text-text/80 leading-relaxed">
            Customizable notification preferences and threshold alerts ensure your brokers are instantly dispatched only to high-value prospects.
          </p>
          <Link href="/demo" className="text-xs font-semibold text-main hover:underline mt-auto pt-2">
            View alert rules →
          </Link>
        </div>
      </section>

      {/* Live Interactive Callout Banner */}
      <section className="rounded-2xl border border-main/20 bg-gradient-to-br from-main/10 via-main/5 to-transparent p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2 max-w-xl">
          <h2 className="font-heading text-2xl font-semibold text-main">
            Experience the Live Qualification Widget
          </h2>
          <p className="text-sm text-text/80">
            Talk to the agent as a buyer or tenant. Watch token streaming, inspect dynamic lead score cards, and test abuse prevention filters in real time.
          </p>
        </div>
        <Link
          href="/demo/lead-chat"
          className="inline-flex shrink-0 items-center justify-center rounded-lg bg-main px-6 py-3 font-body font-semibold text-bg shadow hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-main focus-visible:outline-offset-2"
        >
          Open Chat Demo →
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
            className="text-sm font-semibold text-main hover:underline"
          >
            Read Full Case Study →
          </Link>
        </div>
      </section>
    </div>
  );
}
