import Link from "next/link";
import Placeholder from "@/components/Placeholder.jsx";

export default function CaseStudyPage() {
  return (
    <div className="flex flex-col gap-14">
      <h1 className="font-heading text-3xl font-semibold text-main sm:text-4xl">
        LeadFlow Case Study
      </h1>

      <section className="flex flex-col gap-3">
        <h2 className="font-heading text-xl font-semibold">The problem</h2>
        <Placeholder label="The ad-war framing" />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-heading text-xl font-semibold">
          What I did and decided
        </h2>
        <Placeholder label="Vague-vs-precise prompting story" />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-heading text-xl font-semibold">Real evidence</h2>
        <Placeholder label="Embedded screenshots" />
        <p className="text-sm text-text/60">
          See the working feature now:{" "}
          <Link href="/demo" className="text-main underline">
            live settings form demo
          </Link>
          .
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-heading text-xl font-semibold">
          What came of it
        </h2>
        <Placeholder label="The lesson, stated plainly" />
      </section>

      <section className="flex flex-col gap-4 border-t border-black/10 pt-10 text-center">
        <Link
          href="/contact"
          className="mx-auto w-fit rounded-md bg-main px-5 py-3 font-body font-medium text-bg hover:opacity-90"
        >
          Book a call to see it
        </Link>
      </section>
    </div>
  );
}
