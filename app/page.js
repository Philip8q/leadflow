import Link from "next/link";
import Placeholder from "@/components/Placeholder.jsx";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16">
      <section className="flex flex-col gap-6">
        <h1 className="font-heading text-4xl font-semibold text-main sm:text-5xl">
          I build LeadFlow so small Kenyan real estate businesses can find
          buyers without burning $1,000 a month on Meta ads.
        </h1>
        <Link
          href="/contact"
          className="w-fit rounded-md bg-main px-5 py-3 font-body font-medium text-bg hover:opacity-90"
        >
          Book a call
        </Link>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-heading text-2xl font-semibold">
          Featured case: LeadFlow
        </h2>
        <p className="text-text/70">
          The lead notification settings that started it all — built and
          tested with AI as a working development partner.
        </p>
        <Link href="/case-study" className="w-fit text-main underline">
          Read the case study
        </Link>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-heading text-2xl font-semibold">Proof</h2>
        <Placeholder label="Proof strip (screenshots, GitHub history)" />
      </section>

      <section className="flex flex-col gap-4 border-t border-black/10 pt-10 text-center">
        <p className="text-text/70">
          Ready to see LeadFlow in action?
        </p>
        <Link
          href="/contact"
          className="mx-auto w-fit rounded-md bg-main px-5 py-3 font-body font-medium text-bg hover:opacity-90"
        >
          Book a call
        </Link>
      </section>
    </div>
  );
}
