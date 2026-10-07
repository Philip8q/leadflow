import Link from "next/link";

export default function CaseStudyPage() {
  return (
    <div className="flex flex-col gap-12 py-4">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-text/60">
        <Link href="/" className="hover:text-main">Home</Link>
        <span>/</span>
        <span className="text-text font-medium">Case Study</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col gap-3">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-main/20 bg-main/5 px-3 py-0.5 text-xs font-medium text-main">
          Technical Architecture Case Study
        </div>
        <h1 className="font-heading text-3xl font-semibold text-main sm:text-4xl lg:text-5xl">
          Decoupling Conversational AI from Deterministic Lead Scoring
        </h1>
        <p className="text-text/80 text-lg leading-relaxed max-w-3xl">
          How LeadFlow eliminates hallucinated qualification scores by treating streaming LLMs purely as entity extractors bound to rigid server-side execution tools.
        </p>
      </div>

      {/* Section 1: The Problem */}
      <section className="flex flex-col gap-4 border-t border-black/10 pt-8">
        <h2 className="font-heading text-2xl font-semibold text-text">
          1. The Problem: The Cost of Unstructured Inbound Friction
        </h2>
        <p className="text-text/80 leading-relaxed">
          In high-value real estate transactions, over 70% of inbound website inquiries fail to convert. Prospective buyers arrive with vague intent, unconfirmed budgets, and fragmented timelines. Sales teams spend up to 20 hours a week manually triaging inquiries, leading to delayed response times where hot buyers drop off before receiving outreach.
        </p>
        <p className="text-text/80 leading-relaxed">
          Static contact forms fail because buyers dislike lengthy dropdown surveys. Meanwhile, unconstrained conversational chatbots fail because language models consistently hallucinate numerical metrics—giving casual browsers inflated scores and downgrading ready buyers based on linguistic idiosyncrasies.
        </p>
      </section>

      {/* Section 2: Architectural Decision */}
      <section className="flex flex-col gap-4 border-t border-black/10 pt-8">
        <h2 className="font-heading text-2xl font-semibold text-text">
          2. The Core Decision: Deterministic Server-Side Tool Contracts
        </h2>
        <p className="text-text/80 leading-relaxed">
          To solve score hallucination, LeadFlow establishes a strict separation of concerns:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
          <div className="rounded-xl border border-black/10 bg-white p-5">
            <h3 className="font-heading font-semibold text-main mb-2">What the LLM Does</h3>
            <p className="text-sm text-text/80">
              Natural language dialogue, conversational rapport, polite inquiry probing, and extracting structured parameters (intent, timeline, budget certainty, contact method).
            </p>
          </div>
          <div className="rounded-xl border border-black/10 bg-white p-5">
            <h3 className="font-heading font-semibold text-main mb-2">What Deterministic Code Does</h3>
            <p className="text-sm text-text/80">
              Executes the <code className="bg-black/5 px-1 rounded font-mono text-xs">scoreLead</code> tool via Zod schemas. Calculates mathematical points, enforces business rubrics, and assigns Hot, Warm, or Cold tiers.
            </p>
          </div>
        </div>
        <p className="text-text/80 leading-relaxed">
          If the model triggers the tool prematurely with zero qualifying signal, the system throws a structured <code className="bg-black/5 px-1 rounded font-mono text-xs">ToolUserError</code> that renders a designed warning card client-side, gracefully prompting the prospect to provide additional details.
        </p>
      </section>

      {/* Section 3: Production Hardening */}
      <section className="flex flex-col gap-4 border-t border-black/10 pt-8">
        <h2 className="font-heading text-2xl font-semibold text-text">
          3. Production Hardening & Abuse Prevention
        </h2>
        <p className="text-text/80 leading-relaxed">
          Deploying an open streaming AI endpoint on public cloud infrastructure introduces significant quota exhaustion risks. LeadFlow hardens <code className="bg-black/5 px-1 rounded font-mono text-xs">app/api/chat/route.js</code> with four defensive tiers:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-sm text-text/80">
          <li><strong>Conversation Turn Limit</strong>: Caps sessions to 25 messages to eliminate runaway token loops.</li>
          <li><strong>Per-Message Length Guard</strong>: Limits user messages to 1,500 characters, blocking buffer spam.</li>
          <li><strong>Total Payload Cap</strong>: Caps total session context at 15,000 characters.</li>
          <li><strong>Serverless Timeout Protection</strong>: Configures <code className="bg-black/5 px-1 rounded font-mono text-xs">maxDuration = 30</code> seconds to protect streaming integrity on edge nodes.</li>
        </ul>
      </section>

      {/* Section 4: Live Verification CTA */}
      <section className="rounded-2xl border border-black/10 bg-white p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div>
          <h2 className="font-heading text-xl font-semibold text-text">
            Test the Architecture in Production
          </h2>
          <p className="text-sm text-text/75 mt-1">
            Interact with the streaming qualification chat or inspect our alert rules.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/demo/lead-chat"
            className="rounded-lg bg-main px-5 py-2.5 text-sm font-semibold text-bg hover:opacity-90 transition-opacity"
          >
            Launch AI Chat
          </Link>
          <Link
            href="/demo"
            className="rounded-lg border border-black/20 bg-white px-5 py-2.5 text-sm font-medium text-text hover:bg-black/5"
          >
            Alert Settings
          </Link>
        </div>
      </section>
    </div>
  );
}
