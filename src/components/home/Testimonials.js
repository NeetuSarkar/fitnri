import { Quote } from "lucide-react";

const testimonials = [
  {
    initials: "RS",
    name: "Client Story 1",
    location: "UAE",
    quote:
      "Working abroad, it can be hard to stay consistent. Personalised coaching can help bring structure and support to your routine.",
  },
  {
    initials: "PM",
    name: "Client Story 2",
    location: "UK",
    quote:
      "Practical nutrition guidance that fits around familiar Indian foods can make healthy habits easier to maintain.",
  },
  {
    initials: "AK",
    name: "Client Story 3",
    location: "Canada",
    quote:
      "Flexible scheduling and a personalised training plan can help make fitness part of everyday life.",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="scroll-mt-20 bg-[#fafbf9] px-5 py-12 text-[#07130f] sm:px-8 lg:py-14"
    >
      <div className="mx-auto max-w-[1240px]">
        {/* Section heading */}
        <div className="text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#75803c]">
            Client stories
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            Real People. Real Progress.
          </h2>

          <p className="mt-3 text-sm leading-6 text-neutral-600">
            Here’s what some of our clients have to say about their experience.
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.initials}
              className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm"
            >
              <Quote size={27} strokeWidth={1.7} className="text-lime-500" />

              <p className="mt-3 min-h-[96px] text-sm leading-6 text-neutral-600">
                {testimonial.quote}
              </p>

              <div className="mt-5 flex items-center gap-3 border-t border-black/5 pt-5">
                {/* Avatar placeholder; replace with an approved client photo */}
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-lime-500/20 bg-[#edf3df] text-sm font-bold text-[#425b19]"
                  aria-label="Placeholder client avatar"
                >
                  {testimonial.initials}
                </div>

                <div>
                  <p className="text-sm font-bold">{testimonial.name}</p>
                  <p className="mt-1 text-xs text-neutral-500">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-5 text-center text-[10px] text-neutral-500">
          Preview content only. Replace with genuine, approved client stories
          before publishing.
        </p>
      </div>
    </section>
  );
}
