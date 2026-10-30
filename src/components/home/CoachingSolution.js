import { Dumbbell, FileText, Leaf, Users } from "lucide-react";

const solutions = [
  {
    icon: Dumbbell,
    title: "Live Personal Training",
    description: "16 sessions per month with your coach",
  },
  {
    icon: FileText,
    title: "Customised Workout Plans",
    description: "Designed for your goals and available equipment",
  },
  {
    icon: Leaf,
    title: "Indian-Diet-Friendly Nutrition",
    description: "Realistic guidance with the foods you enjoy",
  },
  {
    icon: Users,
    title: "Ongoing Support & Accountability",
    description: "Regular check-ins, progress tracking and expert advice",
  },
];

export default function CoachingSolution() {
  return (
    <section
      id="coaching"
      className="relative scroll-mt-20 overflow-hidden bg-[#07130f] px-5 py-12 text-white sm:px-8 lg:py-14"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1600&q=80')",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#07130f] via-[#07130f]/95 to-[#07130f]/70" />

      <div className="relative mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-2 lg:items-center">
        {/* Left: Heading and description */}
        <div>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-lime-400">
            Our solution
          </p>

          <h2 className="max-w-lg text-3xl font-black leading-tight tracking-tight sm:text-4xl">
            Personalised Coaching
            <br />
            Built for NRIs
          </h2>

          <p className="mt-4 max-w-lg text-sm leading-6 text-white/70">
            We combine expert coaching, flexible online training and practical
            nutrition guidance tailored to Indian lifestyles abroad, so you can
            stay fit, healthy and energised wherever you are.
          </p>
        </div>

        {/* Right: Coaching benefits */}
        <div className="space-y-5">
          {solutions.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="flex items-start gap-4">
                <Icon
                  size={25}
                  strokeWidth={1.7}
                  className="mt-0.5 shrink-0 text-lime-400"
                />

                <div>
                  <h3 className="text-sm font-bold sm:text-base">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-white/60 sm:text-sm">
                    {item.description}
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
