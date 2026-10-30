"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Button from "@/components/ui/Button";

const navigationLinks = [
  { label: "Home", href: "#home" },
  { label: "Coaching", href: "#coaching" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#coach" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/95 text-white backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10"
        aria-label="Main navigation"
      >
        {/* Brand */}
        <Link
          href="/"
          className="text-2xl font-black tracking-tight"
          onClick={() => setMenuOpen(false)}
          aria-label="FitNRI home"
        >
          Fit<span className="text-lime-400">NRI</span>
          <span className="ml-2 hidden text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-400 sm:inline">
            Fitness without borders
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-7 lg:flex">
          {navigationLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-neutral-300 transition hover:text-lime-400"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Button href="/book-consultation">
            Book a Consultation
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="rounded-lg p-2 text-white hover:bg-white/10 lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile navigation */}
      {menuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-white/10 bg-neutral-950 px-5 py-5 lg:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navigationLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-neutral-200 transition hover:bg-white/5 hover:text-lime-400"
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-3">
              <Button
                href="/book-consultation"
                className="w-full"
                onClick={() => setMenuOpen(false)}
              >
                Book a Consultation
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
