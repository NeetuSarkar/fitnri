import {
  ArrowRight,
  Globe,
  Monitor,
  HeartHandshake,
  TrendingUp,
  CheckCircle2,
  Clock,
} from "lucide-react";

const coachingHighlights = [
  {
    icon: Globe,
    title: "International Coaching",
    subtitle: "Experience",
  },
  {
    icon: Monitor,
    title: "Specialised in Online Training",
  },
  {
    icon: HeartHandshake,
    title: "Indian-Diet-Friendly Approach",
  },
  {
    icon: TrendingUp,
    title: "Focus on Long-Term Results",
  },
  {
    icon: CheckCircle2,
    title: "Personalised Workout Plans",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling Across Time Zones",
  },
];

export default function AboutCoach() {
  return (
    <section
      id="coach"
      className="scroll-mt-20 bg-[#07130f] px-5 py-10 text-white sm:px-8 lg:py-12"
    >
      <div className="mx-auto grid max-w-[1100px] items-center gap-7 md:grid-cols-[0.85fr_1.2fr] lg:grid-cols-[0.85fr_1.2fr_0.8fr] lg:gap-8">
        {/* LEFT: COACH PORTRAIT */}
        <div className="relative mx-auto w-full max-w-[340px]">
          <div
            role="img"
            aria-label="Personal fitness coach standing confidently in a gym"
            className="h-[260px] w-full rounded-xl bg-[#14221b] bg-cover bg-center sm:h-[300px] lg:h-[280px]"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=800&q=85')",
            }}
          />
        </div>

        {/* CENTRE: COACH INTRODUCTION */}
        <div>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-lime-400">
            Meet Your Coach
          </p>

          <h2 className="text-2xl font-black leading-tight tracking-tight sm:text-3xl">
            Guidance from Someone Who Understands Your Journey
          </h2>

          <p className="mt-3 text-xs leading-[1.6] text-white/70 sm:text-sm">
            With international experience and a deep understanding of the Indian
            lifestyle, I help professionals abroad build sustainable fitness
            habits through personalised training, practical nutrition guidance
            and consistent support.
          </p>

          <a
            href="#contact"
            className="mt-5 inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-lime-400 px-4 py-2.5 text-xs font-bold text-neutral-950 transition hover:bg-lime-300"
          >
            Learn More About My Journey
            <ArrowRight size={15} />
          </a>
        </div>

        {/* RIGHT: COACHING HIGHLIGHTS CARD */}
        <div className="rounded-xl border border-white/5 bg-[#14221b] p-4 sm:p-5">
          <div className="space-y-5">
            {coachingHighlights.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="flex items-center gap-3">
                  <Icon
                    size={18}
                    strokeWidth={1.6}
                    className="shrink-0 text-lime-400"
                  />

                  <p className="text-[10px] leading-[1.5] text-white/90 sm:text-xs">
                    {item.title}
                    {item.subtitle && (
                      <>
                        <br />
                        {item.subtitle}
                      </>
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
