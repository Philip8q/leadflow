import SettingsForm from "@/components/SettingsForm.jsx";

export default function DemoPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-3xl font-semibold text-main">
          Lead Notification Preferences
        </h1>
        <p className="text-text/60">
          The real, working feature from LeadFlow&apos;s FE-02 build — not a
          mockup.
        </p>
      </div>
      <div className="max-w-md rounded-lg border border-black/10 bg-white p-6">
        <SettingsForm />
      </div>
    </div>
  );
}
