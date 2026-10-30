import { BriefcaseBusiness, Plane, Users, Star } from "lucide-react";

const audiences = [
  {
    icon: BriefcaseBusiness,
    label: "Working Professionals",
  },
  {
    icon: Plane,
    label: "Frequent Travellers",
  },
  {
    icon: Users,
    label: "Individuals Who Prefer Indian Food",
  },
  {
    icon: Star,
    label: "Anyone Who Wants a Healthier, Stronger You",
  },
];

export default function WhoWeHelp() {
  return (
    <section className="bg-white px-5 py-11 text-[#101710] sm:px-8 lg:py-14">
      <div className="mx-auto grid max-w-[1240px] items-center gap-8 lg:grid-cols-[1fr_1.3fr]">
        {/* Left: Heading and description */}
        <div>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#75803c]">
            Who it's for
          </p>

          <h2 className="max-w-md text-3xl font-black leading-tight tracking-tight">
            Designed for Indian Professionals Abroad
          </h2>

          <p className="mt-4 max-w-lg text-sm leading-6 text-neutral-600">
            Wherever you are in the UAE, UK, USA, Canada or elsewhere, our
            coaching is built for Indians who want to stay fit, healthy and
            perform at their best.
          </p>
        </div>

        {/* Right: Audience categories */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {audiences.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.label} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f3f5f1]">
                  <Icon size={23} className="text-[#1a281d]" />
                </div>

                <p className="mx-auto mt-3 max-w-[125px] text-xs font-semibold leading-5">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
