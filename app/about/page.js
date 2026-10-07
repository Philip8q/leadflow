import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-10 py-4">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-text/60">
        <Link href="/" className="hover:text-main">Home</Link>
        <span>/</span>
        <span className="text-text font-medium">About</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col gap-3">
        <h1 className="font-heading text-3xl font-semibold text-main sm:text-4xl">
          About LeadFlow & Engineer
        </h1>
        <p className="text-text/80 text-lg leading-relaxed max-w-2xl">
          LeadFlow was designed and built by Philip Omondi as the capstone engineering project for the FlyRank AI Engineering Internship.
        </p>
      </div>

      {/* Biography & Philosophy */}
      <section className="flex flex-col gap-4 border-t border-black/10 pt-8">
        <h2 className="font-heading text-2xl font-semibold text-text">
          Engineering Posture
        </h2>
        <p className="text-text/80 leading-relaxed">
          I am a software engineer specializing in modern React / Next.js ecosystems, autonomous AI agent integration, and high-performance web graphics. My technical philosophy centers on one core principle: <em>AI accelerates execution, but engineering discipline defines quality</em>.
        </p>
        <p className="text-text/80 leading-relaxed">
          Rather than relying on generic wrapper scripts, LeadFlow was engineered from first principles with typed Zod tool boundaries, 100/100 Lighthouse accessibility standards, comprehensive Vitest test suites, and strict serverless execution budget protections.
        </p>
      </section>

      {/* Technical Portfolio & Verified Links */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-black/10 pt-8">
        <div className="rounded-xl border border-black/10 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-heading text-lg font-semibold text-main mb-2">
              Developer Portfolio
            </h3>
            <p className="text-sm text-text/80">
              Explore my full engineering portfolio featuring interactive 3D architectural studios, GLSL shaders, and design engineering labs.
            </p>
          </div>
          <a
            href="https://philipomondi.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-main hover:underline mt-4 inline-flex items-center gap-1"
          >
            Visit philipomondi.netlify.app →
          </a>
        </div>

        <div className="rounded-xl border border-black/10 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-heading text-lg font-semibold text-main mb-2">
              GitHub Repositories
            </h3>
            <p className="text-sm text-text/80">
              Review clean Conventional Commits history, Vitest unit test suites, and open-source Next.js App Router implementations.
            </p>
          </div>
          <a
            href="https://github.com/Philip8q/leadflow"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-main hover:underline mt-4 inline-flex items-center gap-1"
          >
            Inspect GitHub Codebase →
          </a>
        </div>
      </section>

      {/* Verification Badge Callout */}
      <section className="rounded-xl border border-main/20 bg-main/5 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-heading font-semibold text-main">
            FlyRank AI Engineering Graduate
          </h3>
          <p className="text-xs text-text/80 mt-1">
            Verified graduate of the intensive 10-week AI engineering and autonomous agent curriculum.
          </p>
        </div>
        <a
          href="https://internship.flyrank.ai/verify?id=FR-2026-PO&first_name=Philip"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md bg-main px-4 py-2 text-xs font-semibold text-bg hover:opacity-90 shrink-0"
        >
          Verify Credential
        </a>
      </section>
    </div>
  );
}
