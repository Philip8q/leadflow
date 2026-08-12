import Link from "next/link";
import Placeholder from "@/components/Placeholder.jsx";

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-14">
      <h1 className="font-heading text-3xl font-semibold text-main sm:text-4xl">
        About
      </h1>

      <section className="flex flex-col gap-3">
        <h2 className="font-heading text-xl font-semibold">Bio</h2>
        <p className="text-text/70">
          Front-end engineer intern at FlyRank, based in Nairobi. n8n
          automation is prior background — front-end engineering is the
          focus now.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-heading text-xl font-semibold">Photo</h2>
        <Placeholder label="Portrait photo" />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-heading text-xl font-semibold">Proof</h2>
        <Placeholder label="GitHub repo evidence, identity kit rendering" />
      </section>

      <section className="flex flex-col gap-4 border-t border-black/10 pt-10 text-center">
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
