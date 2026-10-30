import { ArrowRight } from "lucide-react";

const challenges = [
  {
    title: "Busy work schedules",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=500&q=80",
  },
  {
    title: "Unhealthy food options",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80",
  },
  {
    title: "Lack of guidance",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=500&q=80",
  },
  {
    title: "Frequent travel",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=500&q=80",
  },
];

export default function Challenges() {
  return (
    <section
      id="challenges"
      className="bg-[#fafbf9] px-5 py-10 sm:px-8 lg:py-12"
    >
      <div className="mx-auto grid max-w-[1240px] items-center gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        {/* Left: Section heading */}
        <div>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#75803c]">
            The challenge
          </p>

          <h2 className="max-w-sm text-3xl font-black leading-tight tracking-tight text-[#101710] sm:text-4xl">
            Staying Fit Abroad
            <br />
            Is Not Easy
          </h2>

          <p className="mt-4 max-w-md text-sm leading-6 text-neutral-600">
            Busy work schedules, long commutes, new food environments and lack
            of accountability can make it hard to stay consistent with fitness
            while living abroad.
          </p>

          <div className="mt-5">
            <a
              href="#coaching"
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-lime-400 px-5 py-2 text-xs font-bold text-neutral-950 transition hover:bg-lime-300"
            >
              See How We Help
              <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* Right: Four image cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {challenges.map((item) => (
            <article
              key={item.title}
              className="overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm"
            >
              <div
                className="h-32 bg-cover bg-center sm:h-36"
                style={{
                  backgroundImage: `url('${item.image}')`,
                }}
                role="img"
                aria-label={item.title}
              />

              <div className="flex min-h-[65px] items-center justify-center p-3 text-center">
                <p className="text-xs font-bold leading-4 text-[#101710]">
                  {item.title}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
