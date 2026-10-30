import { Check } from "lucide-react";
import Link from "next/link";

const packages = [
  {
    name: "STARTER",
    planValue: "Starter",
    price: "15,000",
    features: [
      "8 live sessions per month",
      "Personalised workout plan",
      "Basic nutrition guidance",
      "Progress tracking",
    ],
  },
  {
    name: "TRANSFORMATION",
    planValue: "Transformation",
    price: "25,000",
    popular: true,
    features: [
      "16 live sessions per month",
      "Personalised workout plan",
      "Indian-diet-friendly nutrition",
      "Regular progress reviews",
      "Priority coach support",
    ],
  },
  {
    name: "PREMIUM",
    planValue: "Premium",
    price: "30,000",
    features: [
      "24 live sessions per month",
      "Advanced nutrition planning",
      "Lifestyle and habit coaching",
      "Priority scheduling",
      "Ongoing support",
    ],
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="scroll-mt-20 bg-[#07130f] px-5 py-14 text-white sm:px-8 lg:py-16"
    >
      <div className="mx-auto max-w-[1160px]">
        <div className="text-center">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-lime-400">
            Coaching packages
          </p>

          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            Choose the Plan That Fits Your Goals
          </h2>

          <p className="mt-3 text-sm text-white/60">
            Personalised coaching, customised workout and nutrition plans, and
            ongoing support.
          </p>
        </div>

        <div className="mt-10 grid items-stretch gap-5 lg:grid-cols-3">
          {packages.map((plan) => (
            <article
              key={plan.name}
              className={`relative flex flex-col overflow-hidden rounded-2xl border ${
                plan.popular
                  ? "border-lime-400 bg-[#17221a]"
                  : "border-white/10 bg-white/[0.055]"
              }`}
            >
              {plan.popular && (
                <div className="bg-lime-400 py-2 text-center text-[10px] font-black uppercase tracking-widest text-[#101710]">
                  Most Popular
                </div>
              )}

              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-lime-400">
                  {plan.name}
                </p>

                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black">₹{plan.price}</span>
                  <span className="text-xs text-white/60">/month</span>
                </div>

                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-2 text-xs text-white/75"
                    >
                      <Check size={15} className="shrink-0 text-lime-400" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-7">
                  <Link
                    href={`/book-consultation?plan=${plan.planValue}`}
                    className={`inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-full px-5 py-2 text-xs font-bold transition ${
                      plan.popular
                        ? "bg-lime-400 text-neutral-950 hover:bg-lime-300"
                        : "border border-white/50 text-white hover:border-lime-400 hover:text-lime-300"
                    }`}
                  >
                    {plan.popular ? "Choose This Plan" : "Get Started"}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-5 text-center text-[10px] text-white/45">
          Proposed prices for the design preview. Confirm session inclusions,
          taxes and final pricing before publishing.
        </p>
      </div>
    </section>
  );
}
