function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export default async function HealthPage() {
  const res = await fetch(`${getBaseUrl()}/api/health`, { cache: "no-store" });
  const data = await res.json();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-heading text-3xl font-semibold text-main">
        Health check
      </h1>
      <dl className="grid max-w-sm grid-cols-2 gap-y-2 rounded-lg border border-black/10 bg-white p-6 font-body">
        <dt className="text-text/60">Status</dt>
        <dd>{data.status}</dd>
        <dt className="text-text/60">Service</dt>
        <dd>{data.service}</dd>
        <dt className="text-text/60">Checked at</dt>
        <dd>{data.timestamp}</dd>
      </dl>
    </div>
  );
}
