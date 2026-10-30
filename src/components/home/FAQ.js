"use client";

import { useState } from "react";
import { Plus, ArrowRight } from "lucide-react";

const questions = [
  {
    question: "How do the online training sessions work?",
    answer:
      "We discuss your goals, fitness level and schedule first. Your coaching plan can then be tailored to your needs, with online sessions arranged around your agreed availability.",
  },
  {
    question: "What equipment do I need?",
    answer:
      "Your equipment requirements depend on your training plan. We can discuss the gym or home equipment available to you before planning your sessions.",
  },
  {
    question: "Can you suggest Indian meal options?",
    answer:
      "Yes. Nutrition guidance can take familiar Indian foods and your food preferences into account, helping you build a practical eating routine around your goals.",
  },
  {
    question: "How do I schedule sessions across time zones?",
    answer:
      "We will discuss your location, time zone and availability before agreeing on suitable session times.",
  },
  {
    question: "Is this suitable for beginners?",
    answer:
      "The coaching approach can be adapted to your current experience and fitness level. Discuss your goals and any limitations during your initial consultation.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section
      id="faq"
      className="scroll-mt-20 bg-[#07130f] px-5 py-12 text-white sm:px-8 lg:py-14"
    >
      <div className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        {/* Left column */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lime-400">
            Frequently asked questions
          </p>

          <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
            Got Questions?
            <br />
            We’ve Got Answers.
          </h2>

          <p className="mt-4 max-w-sm text-sm leading-6 text-white/60">
            Find out more about online coaching, training plans and how FitNRI
            can fit into your life abroad.
          </p>

          <a
            href="#faq-list"
            className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-3 text-xs font-bold text-white transition hover:border-lime-400 hover:text-lime-400"
          >
            View All FAQs
            <ArrowRight size={15} />
          </a>
        </div>

        {/* Right column: accordion */}
        <div id="faq-list" className="divide-y divide-white/10">
          {questions.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <details key={item.question} open={isOpen} className="group py-4">
                <summary
                  onClick={(event) => {
                    event.preventDefault();
                    setOpenIndex(isOpen ? -1 : index);
                  }}
                  className="flex cursor-pointer list-none items-center justify-between gap-5 text-sm font-medium sm:text-base [&::-webkit-details-marker]:hidden"
                >
                  <span>{item.question}</span>

                  <Plus
                    size={20}
                    className={`shrink-0 text-lime-400 transition-transform duration-200 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  />
                </summary>

                {isOpen && (
                  <p className="mt-3 max-w-2xl pr-6 text-xs leading-6 text-white/60 sm:text-sm">
                    {item.answer}
                  </p>
                )}
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}
