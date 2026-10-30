import Link from "next/link";
import { Camera, Mail, ArrowUpRight } from "lucide-react";

const footerLinks = {
  Explore: [
    { label: "Home", href: "/" },
    { label: "Coaching", href: "/coaching" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Pricing", href: "/pricing" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Meet Your Coach", href: "/meet-your-coach" },
    { label: "FAQs", href: "/faqs" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-950 text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
        {/* Brand and description */}
        <div className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="text-3xl font-black tracking-tight"
              aria-label="FitNRI home"
            >
              Fit<span className="text-lime-400">NRI</span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-neutral-400">
              Personalised online fitness coaching for Indians living abroad.
              Build strength, improve your fitness, and create habits that fit
              your lifestyle.
            </p>

            <Link
              href="/book-consultation"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-lime-400 transition hover:text-lime-300"
            >
              Start your fitness journey
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            {/* Social and email links */}
            <div className="mt-6 flex items-center gap-4">
              <a
                href="mailto:hello@fitnri.com"
                aria-label="Email FitNRI"
                className="rounded-full border border-white/10 p-3 text-neutral-300 transition hover:border-lime-400 hover:text-lime-400"
              >
                <Mail className="h-5 w-5" />
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="rounded-full border border-white/10 p-3 text-neutral-300 transition hover:border-lime-400 hover:text-lime-400"
              >
                <Camera className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Footer navigation */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="mb-5 text-sm font-bold">{heading}</h3>

              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-400 transition hover:text-lime-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="flex flex-col gap-3 pt-6 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} FitNRI. All rights reserved.</p>
          <p>Fitness without borders.</p>
        </div>
      </div>
    </footer>
  );
}
