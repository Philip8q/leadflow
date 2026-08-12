import Placeholder from "@/components/Placeholder.jsx";

export default function ContactPage() {
  return (
    <div className="flex flex-col gap-14">
      <h1 className="font-heading text-3xl font-semibold text-main sm:text-4xl">
        Book a call
      </h1>

      <p className="text-text/70">
        I build LeadFlow so small Kenyan real estate businesses can find
        buyers without burning $1,000 a month on Meta ads.
      </p>

      <section className="flex flex-col gap-3">
        <h2 className="font-heading text-xl font-semibold">
          Direct contact
        </h2>
        <Placeholder label="Booking link (e.g. Calendly) not wired up yet" />
      </section>
    </div>
  );
}
