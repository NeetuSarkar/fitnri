import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden bg-[#111a15] px-5 py-14 text-white sm:px-8 lg:py-16"
    >
      {/* Background image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-cover bg-center opacity-55"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1800&q=85')",
        }}
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#07130f]/95 via-[#07130f]/70 to-[#07130f]/30" />

      <div className="relative mx-auto max-w-[1240px]">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-lime-400">
          Take the first step
        </p>

        <h2 className="mt-4 max-w-xl text-4xl font-black leading-tight tracking-tight sm:text-5xl">
          A Healthier, Stronger You Starts Today.
        </h2>

        <p className="mt-4 max-w-md text-sm leading-6 text-white/75">
          Book a free consultation and let's discuss your fitness goals.
        </p>

        {/* CTA buttons */}
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="/book-consultation"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-lime-400 px-5 py-3 text-xs font-bold text-neutral-950 transition hover:bg-lime-300"
          >
            Book a Free Consultation
            <ArrowRight size={15} />
          </a>

          <a
            href="#pricing"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/30 px-5 py-3 text-xs font-bold text-white transition hover:border-lime-400 hover:text-lime-300"
          >
            View Coaching Plans
            <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
