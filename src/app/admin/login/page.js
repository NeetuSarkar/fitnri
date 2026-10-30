"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole, Mail, ArrowRight, LoaderCircle } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to log in.");
      }

      router.replace("/admin/dashboard");
    } catch (err) {
      setError(
        err.message || "Unable to connect to the server. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#07130f] px-5 py-12 text-white">
      <div className="w-full max-w-md">
        <a
          href="/"
          className="mb-10 block text-center text-3xl font-bold tracking-tight"
        >
          Fit<span className="text-lime-400">NRI</span>
        </a>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-2xl sm:p-9">
          <div className="mb-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-400/10 text-lime-400">
              <LockKeyhole size={24} />
            </div>

            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-lime-400">
              Private access
            </p>

            <h1 className="text-3xl font-bold tracking-tight">Admin login</h1>

            <p className="mt-3 text-sm leading-6 text-gray-400">
              Sign in to manage FitNRI consultation requests.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-200"
              >
                Email address
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4 focus-within:border-lime-400/60">
                <Mail size={18} className="shrink-0 text-gray-500" />

                <input
                  id="email"
                  type="email"
                  autoComplete="username"
                  required
                  maxLength={254}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-gray-600"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-200"
              >
                Password
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4 focus-within:border-lime-400/60">
                <LockKeyhole size={18} className="shrink-0 text-gray-500" />

                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  maxLength={128}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-gray-600"
                />
              </div>
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-lime-400 px-5 py-3.5 font-semibold text-black transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <LoaderCircle size={18} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in to dashboard
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs leading-5 text-gray-500">
            Authorized administrators only.
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-gray-600">
          FitNRI Admin Portal
        </p>
      </div>
    </main>
  );
}
