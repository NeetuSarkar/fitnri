import {
  ArrowRight,
  Dumbbell,
  Leaf,
  ChartNoAxesColumnIncreasing,
  Globe,
} from "lucide-react";

const benefits = [
  {
    icon: Dumbbell,
    title: "1-to-1 Online Training",
    subtitle: "Live, personalised sessions",
  },
  {
    icon: Leaf,
    title: "Nutrition Guidance",
    subtitle: "Indian food made simple",
  },
  {
    icon: ChartNoAxesColumnIncreasing,
    title: "Track Your Progress",
    subtitle: "Real results, measurable",
  },
  {
    icon: Globe,
    title: "Global Support",
    subtitle: "Flexible time zones",
  },
];

function CTAButton({ href, children, outline = false }) {
  return (
    <a
      href={href}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-3 text-xs font-bold transition duration-300 ${
        outline
          ? "border border-white/30 text-white hover:border-lime-400 hover:text-lime-300"
          : "bg-lime-400 text-neutral-950 hover:bg-lime-300"
      }`}
    >
      {children}
      <ArrowRight size={15} />
    </a>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#07130f] text-white"
    >
      {/* Background lighting */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_35%,rgba(100,130,90,0.20),transparent_50%)]" />

      {/* Hero content */}
      <div className="relative mx-auto grid max-w-[1320px] items-center gap-4 px-5 pb-10 pt-8 sm:px-8 lg:min-h-[490px] lg:grid-cols-[0.95fr_1.05fr] lg:px-12 lg:pb-12">
        {/* Left side: headline and buttons */}
        <div className="relative z-10 max-w-xl">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-lime-400">
            Online personal training for Indians abroad
          </p>

          <h1 className="text-5xl font-black leading-[0.98] tracking-tight sm:text-6xl lg:text-[68px]">
            Stay Fit
            <br />
            <span className="text-lime-400">Anywhere</span>
            <br />
            in the World
          </h1>

          <p className="mt-5 max-w-md text-sm leading-6 text-white/65 sm:text-base">
            Personalised online fitness coaching for busy Indian professionals
            living abroad. Live training, customised workout plans,
            Indian-diet-friendly nutrition guidance and ongoing support.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <CTAButton href="/book-consultation">
              Book a Free Consultation
            </CTAButton>

            <CTAButton href="#pricing" outline>
              View Coaching Plans
            </CTAButton>
          </div>

          <div className="mt-7 flex items-center gap-3 text-xs text-white/55">
            <span className="h-2 w-2 rounded-full bg-lime-400" />
            Coaching designed around your lifestyle and time zone
          </div>
        </div>

        {/* Right side: fitness image composition */}
        <div className="relative mx-auto mt-5 h-[360px] w-full max-w-[560px] sm:h-[430px] lg:mt-0 lg:h-[470px]">
          {/* Soft glow behind the models */}
          <div className="absolute inset-8 rounded-full bg-lime-400/10 blur-3xl" />

          {/* First fitness model */}
          <div className="absolute bottom-0 left-[2%] z-10 h-[94%] w-[56%]">
            <div
              role="img"
              aria-label="Athlete training in the gym"
              className="absolute inset-0 bg-contain bg-bottom bg-no-repeat"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=800&q=85')",
              }}
            />
          </div>

          {/* Second fitness and lifestyle image */}
          <div className="absolute bottom-0 right-[2%] z-20 h-[80%] w-[43%]">
            <div
              role="img"
              aria-label="Fitness and healthy lifestyle"
              className="absolute inset-0 bg-contain bg-bottom bg-no-repeat"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=650&q=85')",
              }}
            />
          </div>

          {/* Brand message */}
          <div className="absolute right-0 top-4 z-30 hidden -rotate-3 text-right font-serif text-2xl italic leading-tight text-white/90 sm:block">
            Same
            <br />
            Roots
            <br />
            Stronger
            <br />
            You
            <div className="ml-auto mt-3 h-1 w-16 -rotate-6 bg-lime-400" />
          </div>

          {/* Decorative accent */}
          <div className="absolute bottom-8 left-[38%] z-30 h-16 w-px rotate-45 bg-lime-400/50" />
        </div>
      </div>

      {/* Benefits strip */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto grid max-w-[1320px] grid-cols-2 gap-x-5 gap-y-6 px-5 py-6 sm:px-8 md:grid-cols-4 lg:px-12">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div key={benefit.title} className="flex items-center gap-3">
                <Icon
                  size={23}
                  strokeWidth={1.7}
                  className="shrink-0 text-lime-300"
                />

                <div>
                  <p className="text-xs font-bold">{benefit.title}</p>

                  <p className="mt-1 text-[10px] text-white/50">
                    {benefit.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
