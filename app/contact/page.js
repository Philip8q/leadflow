import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="flex flex-col gap-10 py-4">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-text/60">
        <Link href="/" className="hover:text-main">Home</Link>
        <span>/</span>
        <span className="text-text font-medium">Contact</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col gap-3">
        <h1 className="font-heading text-3xl font-semibold text-main sm:text-4xl">
          Get in Touch
        </h1>
        <p className="text-text/80 text-lg leading-relaxed max-w-2xl">
          Interested in deploying LeadFlow for your real estate brokerage or B2B sales pipeline? Connect with me directly.
        </p>
      </div>

      {/* Direct Contact Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-black/10 pt-8">
        <div className="rounded-xl border border-black/10 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="font-heading text-lg font-semibold text-main mb-2">
              Direct Message
            </h2>
            <p className="text-sm text-text/80 leading-relaxed">
              Submit a validated transmission through my personal engineering portal contact engine.
            </p>
          </div>
          <a
            href="https://philipomondi.netlify.app/#contact"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-main px-4 py-2.5 text-sm font-semibold text-bg hover:opacity-90 transition-opacity mt-4"
          >
            Open Contact Form →
          </a>
        </div>

        <div className="rounded-xl border border-black/10 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="font-heading text-lg font-semibold text-main mb-2">
              Test Live Qualification
            </h2>
            <p className="text-sm text-text/80 leading-relaxed">
              Experience the autonomous conversational lead intake agent before scheduling a consultation.
            </p>
          </div>
          <Link
            href="/demo/lead-chat"
            className="inline-flex items-center justify-center rounded-lg border border-black/20 bg-white px-4 py-2.5 text-sm font-medium text-text hover:bg-black/5 transition-colors mt-4"
          >
            Launch AI Chat Demo →
          </Link>
        </div>
      </section>
    </div>
  );
}
