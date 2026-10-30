import {
  CalendarDays,
  FileText,
  Dumbbell,
  ChartNoAxesColumnIncreasing,
} from "lucide-react";

const steps = [
  {
    number: "1",
    icon: CalendarDays,
    title: "Book a Consultation",
    description: "Discuss your goals, lifestyle and current fitness level.",
  },
  {
    number: "2",
    icon: FileText,
    title: "Get Your Plan",
    description: "Receive a personalised training and nutrition plan.",
  },
  {
    number: "3",
    icon: Dumbbell,
    title: "Train Online",
    description: "Join live one-to-one sessions with your coach.",
  },
  {
    number: "4",
    icon: ChartNoAxesColumnIncreasing,
    title: "Track & Improve",
    description: "Regular reviews, progress tracking and ongoing support.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 bg-[#fafbf9] px-5 py-12 sm:px-8 lg:py-14"
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="text-center">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#75803c]">
            How it works
          </p>

          <h2 className="text-3xl font-black tracking-tight text-[#101710] sm:text-4xl">
            A Simple Process. Real Results.
          </h2>
        </div>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <article
                key={step.number}
                className="relative rounded-xl border border-black/10 bg-white p-5 shadow-sm"
              >
                <span className="absolute -top-3 left-5 flex h-7 w-7 items-center justify-center rounded-full bg-[#071b14] text-xs font-bold text-white">
                  {step.number}
                </span>

                <Icon
                  size={25}
                  strokeWidth={1.7}
                  className="mx-auto mb-4 mt-2 text-[#15251a]"
                />

                <h3 className="text-center text-sm font-bold text-[#101710]">
                  {step.title}
                </h3>

                <p className="mt-2 text-center text-xs leading-5 text-neutral-500">
                  {step.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
