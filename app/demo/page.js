import Link from "next/link";
import SettingsForm from "@/components/SettingsForm.jsx";

export default function DemoPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-text/60">
        <Link href="/" className="hover:text-main">Home</Link>
        <span>/</span>
        <span className="text-text font-medium">Alert Settings & Triage</span>
      </nav>

      <div className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-semibold text-main sm:text-4xl">
          Lead Alert & Routing Preferences
        </h1>
        <p className="text-text/80 max-w-2xl text-base leading-relaxed">
          Configure how LeadFlow notifies your sales team when high-value prospects complete qualification. Set score thresholds to filter out tire-kickers and route instant alerts only for ready-to-transact buyers.
        </p>
      </div>

      {/* Connected AI Chat Callout Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-main/20 bg-main/5 p-5">
        <div>
          <h2 className="font-heading text-lg font-semibold text-main">
            Test the Inbound AI Intake Agent
          </h2>
          <p className="text-sm text-text/80">
            See how prospective buyers are engaged, qualified, and scored before these alert rules trigger.
          </p>
        </div>
        <Link
          href="/demo/lead-chat"
          className="inline-flex shrink-0 items-center justify-center rounded-md bg-main px-4 py-2 text-sm font-medium text-bg hover:opacity-90 focus-visible:outline-2 focus-visible:outline-main focus-visible:outline-offset-2"
        >
          Open AI Lead Chat →
        </Link>
      </div>

      {/* Settings Form Container */}
      <div className="max-w-xl rounded-xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 border-b border-black/10 pb-4">
          <h3 className="font-heading text-lg font-semibold text-text">
            Notification Rules
          </h3>
          <p className="text-xs text-text/60 mt-1">
            Changes take effect immediately for all inbound qualification events.
          </p>
        </div>
        <SettingsForm />
      </div>
    </div>
  );
}
