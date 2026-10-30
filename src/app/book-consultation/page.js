"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CalendarDays, CheckCircle2 } from "lucide-react";

export default function BookConsultationPage() {
  const searchParams = useSearchParams();

  const selectedPlan = searchParams.get("plan");

  const validPlans = ["Starter", "Transformation", "Premium", "Not sure"];

  const initialPlan = validPlans.includes(selectedPlan)
    ? selectedPlan
    : "Transformation";

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    country: "",
    goal: "",
    plan: initialPlan,
    date: "",
    time: "",
  });

  useEffect(() => {
    if (selectedPlan && validPlans.includes(selectedPlan)) {
      setFormData((previousData) => ({
        ...previousData,
        plan: selectedPlan,
      }));
    }
  }, [selectedPlan]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setErrorMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) {
        throw new Error(
          "API configuration is missing. Please contact support.",
        );
      }

      const response = await fetch(`${apiUrl}/consultations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          whatsapp: formData.whatsapp,
          country: formData.country,
          goal: formData.goal,
          plan: formData.plan,
          preferredDate: formData.date || undefined,
          preferredTime: formData.time || undefined,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to submit your consultation request.",
        );
      }

      setSubmitted(true);
    } catch (error) {
      console.error("Consultation submission failed:", error);

      setErrorMessage(
        error.message ||
          "Something went wrong. Please check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClass =
    "mt-1.5 w-full rounded-lg border border-white/10 bg-[#101e18] px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-lime-400";

  const labelClass = "text-sm font-medium text-white/80";

  return (
    <main className="min-h-screen bg-[#07130f] px-4 py-6 text-white sm:px-8 sm:py-8">
      <div className="mx-auto max-w-3xl">
        {submitted ? (
          <div className="mt-8 rounded-2xl border border-lime-400/20 bg-[#0b1913] p-8 text-center sm:mt-12 sm:p-12">
            <CheckCircle2 size={48} className="mx-auto mb-5 text-lime-400" />

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-lime-400">
              Request submitted
            </p>

            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Thanks, {formData.name}!
            </h1>

            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/60">
              Your consultation request has been saved successfully. We will
              review your details and confirm your consultation availability and
              time zone before finalising the appointment.
            </p>

            <Link
              href="/"
              className="mt-7 inline-flex rounded-full bg-lime-400 px-6 py-3 text-sm font-bold text-[#07130f] transition hover:bg-lime-300"
            >
              Back to homepage
            </Link>
          </div>
        ) : (
          <>
            {/* Page heading */}
            <div className="mb-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-lime-400 sm:text-xs">
                Your fitness journey starts here
              </p>

              <h1 className="mt-2 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
                Book a Free
                <span className="block text-lime-400">Consultation.</span>
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-5 text-white/60">
                Tell us about your goals, lifestyle and schedule. We will use
                this information to prepare for your initial coaching
                conversation.
              </p>
            </div>

            {/* Booking form */}
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-white/10 bg-[#0b1913] p-4 sm:p-5"
            >
              <div className="grid gap-x-5 gap-y-3 sm:grid-cols-2">
                {/* Full name */}
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Full name *
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClass}
                    maxLength={100}
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email address *
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClass}
                    maxLength={254}
                    required
                  />
                </div>

                {/* WhatsApp */}
                <div>
                  <label htmlFor="whatsapp" className={labelClass}>
                    WhatsApp number *
                  </label>

                  <input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+971 ..."
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className={inputClass}
                    maxLength={30}
                    required
                  />
                </div>

                {/* Country */}
                <div>
                  <label htmlFor="country" className={labelClass}>
                    Country where you live *
                  </label>

                  <input
                    id="country"
                    name="country"
                    type="text"
                    autoComplete="country-name"
                    placeholder="e.g. UAE"
                    value={formData.country}
                    onChange={handleChange}
                    className={inputClass}
                    maxLength={100}
                    required
                  />
                </div>

                {/* Fitness goal */}
                <div>
                  <label htmlFor="goal" className={labelClass}>
                    Primary fitness goal *
                  </label>

                  <select
                    id="goal"
                    name="goal"
                    value={formData.goal}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  >
                    <option value="" disabled>
                      Select your goal
                    </option>
                    <option value="Fat loss">Fat loss</option>
                    <option value="Muscle gain">Muscle gain</option>
                    <option value="Strength">Build strength</option>
                    <option value="General fitness">General fitness</option>
                    <option value="Body recomposition">
                      Body recomposition
                    </option>
                  </select>
                </div>

                {/* Coaching plan */}
                <div>
                  <label htmlFor="plan" className={labelClass}>
                    Preferred coaching plan *
                  </label>

                  <select
                    id="plan"
                    name="plan"
                    value={formData.plan}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  >
                    <option value="Starter">Starter — ₹15,000/month</option>
                    <option value="Transformation">
                      Transformation — ₹25,000/month
                    </option>
                    <option value="Premium">Premium — ₹30,000/month</option>
                    <option value="Not sure">Not sure yet</option>
                  </select>
                </div>

                {/* Preferred date */}
                <div>
                  <label htmlFor="date" className={labelClass}>
                    Preferred consultation date
                  </label>

                  <input
                    id="date"
                    name="date"
                    type="date"
                    min={new Date().toLocaleDateString("en-CA")}
                    value={formData.date}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                {/* Preferred time */}
                <div>
                  <label htmlFor="time" className={labelClass}>
                    Preferred time
                  </label>

                  <select
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">Select a time</option>
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Evening">Evening</option>
                  </select>
                </div>
              </div>

              {/* Appointment information */}
              <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <div className="flex items-start gap-3">
                  <CalendarDays
                    size={17}
                    className="mt-0.5 shrink-0 text-lime-400"
                  />

                  <p className="text-xs leading-5 text-white/50">
                    Your preferred date and time are requests, not confirmed
                    appointments. We will confirm availability and your time
                    zone before finalising the consultation.
                  </p>
                </div>
              </div>

              {/* API error message */}
              {errorMessage && (
                <div
                  role="alert"
                  className="mt-4 rounded-lg border border-red-400/20 bg-red-400/10 p-3 text-sm text-red-300"
                >
                  {errorMessage}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 w-full rounded-full bg-lime-400 px-6 py-3 text-sm font-bold text-[#07130f] transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting
                  ? "Submitting your request..."
                  : "Request Free Consultation"}
              </button>

              <p className="mt-3 text-center text-[11px] text-white/40">
                No payment is required to request an initial consultation.
              </p>
            </form>
          </>
        )}
      </div>
    </main>
  );
}
