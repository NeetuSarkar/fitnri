"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Clock3,
  CheckCircle2,
  LogOut,
  LoaderCircle,
  Dumbbell,
  RefreshCw,
  ShieldCheck,
  Mail,
  Phone,
  Calendar,
  Search,
  X,
  Save,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const STATUSES = ["pending", "confirmed", "completed", "cancelled"];

const STATUS_STYLES = {
  pending: "border-amber-400/20 bg-amber-400/10 text-amber-300",
  confirmed: "border-blue-400/20 bg-blue-400/10 text-blue-300",
  completed: "border-lime-400/20 bg-lime-400/10 text-lime-300",
  cancelled: "border-red-400/20 bg-red-400/10 text-red-300",
};

function formatDate(value) {
  if (!value) return "Not specified";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Not specified";

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatStatus(status) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export default function AdminDashboardPage() {
  const router = useRouter();

  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState("");

  const [consultations, setConsultations] = useState([]);
  const [loadingConsultations, setLoadingConsultations] = useState(false);
  const [consultationError, setConsultationError] = useState("");
  const [updatingId, setUpdatingId] = useState("");

  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [notesDraft, setNotesDraft] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);
  const [notesMessage, setNotesMessage] = useState("");

  // Fetch consultations from the protected backend API.
  const loadConsultations = useCallback(async () => {
    setLoadingConsultations(true);
    setConsultationError("");

    try {
      const response = await fetch(`${API_URL}/consultations`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      if (response.status === 401 || response.status === 403) {
        router.replace("/admin/login");
        return;
      }

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to load consultations.");
      }

      setConsultations(
        Array.isArray(data.consultations) ? data.consultations : [],
      );
    } catch (err) {
      setConsultationError(err.message || "Unable to connect to the backend.");
    } finally {
      setLoadingConsultations(false);
    }
  }, [router]);

  // Verify the admin session before displaying protected data.
  useEffect(() => {
    let active = true;

    const verifySession = async () => {
      try {
        const response = await fetch(`${API_URL}/admin/me`, {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        if (!response.ok) {
          router.replace("/admin/login");
          return;
        }

        const data = await response.json();

        if (!data.success || !data.admin) {
          router.replace("/admin/login");
          return;
        }

        if (active) {
          setAdmin(data.admin);
        }
      } catch {
        if (active) {
          setError("Unable to connect to the server. Check your backend.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    verifySession();

    return () => {
      active = false;
    };
  }, [router]);

  // Load consultations after the admin session is verified.
  useEffect(() => {
    if (admin) {
      loadConsultations();
    }
  }, [admin, loadConsultations]);

  // Log out the current admin.
  const handleLogout = async () => {
    setLoggingOut(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/admin/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Unable to log out.");
      }

      router.replace("/admin/login");
    } catch (err) {
      setError(err.message || "Logout failed. Please try again.");
      setLoggingOut(false);
    }
  };

  // Update consultation status in MongoDB.
  const handleStatusChange = async (consultationId, status) => {
    setUpdatingId(consultationId);
    setConsultationError("");

    try {
      const response = await fetch(
        `${API_URL}/consultations/${consultationId}/status`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        },
      );

      if (response.status === 401 || response.status === 403) {
        router.replace("/admin/login");
        return;
      }

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to update consultation status.",
        );
      }

      setConsultations((previous) =>
        previous.map((consultation) =>
          consultation._id === consultationId
            ? {
                ...consultation,
                status: data.consultation.status,
              }
            : consultation,
        ),
      );

      setSelectedConsultation((previous) =>
        previous && previous._id === consultationId
          ? {
              ...previous,
              status: data.consultation.status,
            }
          : previous,
      );
    } catch (err) {
      setConsultationError(
        err.message || "Unable to update consultation status.",
      );
    } finally {
      setUpdatingId("");
    }
  };

  // Save follow-up notes using the protected backend endpoint.
  const handleSaveNotes = async () => {
    if (!selectedConsultation?._id) return;

    setSavingNotes(true);
    setNotesMessage("");
    setConsultationError("");

    try {
      const response = await fetch(
        `${API_URL}/consultations/${selectedConsultation._id}/notes`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            followUpNotes: notesDraft,
          }),
        },
      );

      if (response.status === 401 || response.status === 403) {
        router.replace("/admin/login");
        return;
      }

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to save follow-up notes.");
      }

      const savedConsultation = data.consultation;

      setConsultations((previous) =>
        previous.map((consultation) =>
          consultation._id === savedConsultation._id
            ? {
                ...consultation,
                followUpNotes: savedConsultation.followUpNotes,
              }
            : consultation,
        ),
      );

      setSelectedConsultation((previous) =>
        previous
          ? {
              ...previous,
              followUpNotes: savedConsultation.followUpNotes,
            }
          : previous,
      );

      setNotesMessage("Follow-up notes saved successfully.");
    } catch (err) {
      setNotesMessage(err.message || "Unable to save follow-up notes.");
    } finally {
      setSavingNotes(false);
    }
  };

  // Search by name, email, WhatsApp number, or country.
  const filteredConsultations = consultations.filter((item) => {
    const matchesStatus = filter === "all" || item.status === filter;

    const query = searchTerm.trim().toLowerCase();

    const matchesSearch =
      !query ||
      [item.fullName, item.email, item.whatsapp, item.country].some((value) =>
        String(value || "")
          .toLowerCase()
          .includes(query),
      );

    return matchesStatus && matchesSearch;
  });

  const stats = [
    {
      label: "Total Enquiries",
      value: consultations.length,
      description: "All consultation requests",
      icon: Users,
    },
    {
      label: "Pending",
      value: consultations.filter((item) => item.status === "pending").length,
      description: "Awaiting follow-up",
      icon: Clock3,
    },
    {
      label: "Confirmed",
      value: consultations.filter((item) => item.status === "confirmed").length,
      description: "Consultations confirmed",
      icon: CheckCircle2,
    },
    {
      label: "Completed",
      value: consultations.filter((item) => item.status === "completed").length,
      description: "Completed consultations",
      icon: CalendarDays,
    },
  ];

  // Loading screen.
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#07130f] text-white">
        <div className="flex items-center gap-3 text-sm text-gray-400">
          <LoaderCircle className="animate-spin text-lime-400" size={22} />
          Verifying admin session...
        </div>
      </main>
    );
  }

  // Do not display protected dashboard content without an admin session.
  if (!admin) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#07130f] px-5 text-white">
        <div className="text-center">
          <p className="text-gray-300">
            {error || "Redirecting to admin login..."}
          </p>

          {error && (
            <button
              onClick={() => window.location.reload()}
              className="mt-5 rounded-xl bg-lime-400 px-5 py-3 font-semibold text-black"
            >
              Try again
            </button>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#07130f] text-white">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-black/10 p-6 md:flex md:flex-col">
          <a href="/" className="mb-12 text-2xl font-bold tracking-tight">
            Fit<span className="text-lime-400">NRI</span>
          </a>

          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            Workspace
          </p>

          <div className="flex items-center gap-3 rounded-xl border border-lime-400/20 bg-lime-400/10 px-4 py-3 text-lime-300">
            <LayoutDashboard size={19} />
            <span className="text-sm font-medium">Dashboard</span>
          </div>

          <button
            onClick={() =>
              document
                .getElementById("consultations")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="mt-3 flex items-center gap-3 rounded-xl px-4 py-3 text-gray-400 transition hover:bg-white/5 hover:text-white"
          >
            <Users size={19} />
            <span className="text-sm">Consultations</span>
          </button>

          <div className="mt-auto rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="mb-3 flex items-center gap-2 text-lime-400">
              <ShieldCheck size={18} />
              <span className="text-sm font-semibold">Secure access</span>
            </div>

            <p className="text-xs leading-5 text-gray-500">
              Your admin workspace is protected by backend authentication.
            </p>
          </div>
        </aside>

        {/* Main content */}
        <section className="min-w-0 flex-1">
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-5 py-5 sm:px-8 lg:px-10">
            <div>
              <p className="text-sm text-gray-400">FitNRI / Workspace</p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                Dashboard
              </h1>
            </div>

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:border-red-400/40 hover:text-red-300 disabled:opacity-50"
            >
              {loggingOut ? (
                <LoaderCircle size={17} className="animate-spin" />
              ) : (
                <LogOut size={17} />
              )}

              {loggingOut ? "Logging out..." : "Log out"}
            </button>
          </header>

          <div className="px-5 py-8 sm:px-8 lg:px-10">
            {error && (
              <div
                role="alert"
                className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300"
              >
                {error}
              </div>
            )}

            {/* Welcome banner */}
            <div className="mb-8 rounded-2xl border border-lime-400/20 bg-gradient-to-r from-lime-400/10 to-transparent p-6 sm:p-8">
              <p className="mb-2 text-sm font-medium text-lime-300">
                ADMIN WORKSPACE
              </p>

              <h2 className="text-2xl font-bold sm:text-3xl">Welcome back!</h2>

              <p className="mt-3 break-all text-sm text-gray-400">
                Signed in as {admin.email}
              </p>
            </div>

            {/* Statistics */}
            <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                  >
                    <div className="mb-5 flex items-center justify-between">
                      <span className="text-sm text-gray-400">
                        {stat.label}
                      </span>

                      <Icon size={20} className="text-lime-400" />
                    </div>

                    <p className="text-3xl font-bold">
                      {loadingConsultations ? "—" : stat.value}
                    </p>

                    <p className="mt-2 text-xs text-gray-500">
                      {stat.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Consultation management */}
            <section
              id="consultations"
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 p-5 sm:p-6">
                <div>
                  <h3 className="text-lg font-semibold">
                    Recent consultations
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Search enquiries, review details, and manage follow-ups.
                  </p>
                </div>

                <button
                  onClick={loadConsultations}
                  disabled={loadingConsultations}
                  className="flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm text-gray-300 transition hover:border-lime-400/40 hover:text-lime-300 disabled:opacity-50"
                >
                  <RefreshCw
                    size={15}
                    className={loadingConsultations ? "animate-spin" : ""}
                  />
                  Refresh
                </button>
              </div>

              {/* Search */}
              <div className="border-b border-white/10 p-4">
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3 focus-within:border-lime-400/50">
                  <Search size={18} className="shrink-0 text-gray-500" />

                  <input
                    type="search"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search by name, email, WhatsApp, or country..."
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
                    aria-label="Search consultations"
                  />

                  {searchTerm && (
                    <button
                      type="button"
                      onClick={() => setSearchTerm("")}
                      className="text-xs text-gray-400 hover:text-lime-300"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <p className="mt-2 text-xs text-gray-500">
                  Showing {filteredConsultations.length} of{" "}
                  {consultations.length} consultations
                </p>
              </div>

              {/* Status filters */}
              <div className="flex flex-wrap gap-2 border-b border-white/10 p-4">
                {["all", ...STATUSES].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`rounded-lg px-3 py-2 text-xs font-medium transition ${
                      filter === status
                        ? "bg-lime-400 text-black"
                        : "border border-white/10 text-gray-400 hover:text-white"
                    }`}
                  >
                    {status === "all" ? "All" : formatStatus(status)}
                  </button>
                ))}
              </div>

              {consultationError && (
                <div
                  role="alert"
                  className="m-5 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300"
                >
                  {consultationError}
                </div>
              )}

              {loadingConsultations && consultations.length === 0 ? (
                <div className="flex items-center justify-center gap-3 px-6 py-12 text-sm text-gray-400">
                  <LoaderCircle
                    className="animate-spin text-lime-400"
                    size={20}
                  />
                  Loading consultations...
                </div>
              ) : filteredConsultations.length === 0 ? (
                <div className="flex flex-col items-center px-6 py-12 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-400/10 text-lime-400">
                    <Dumbbell size={26} />
                  </div>

                  <h4 className="text-base font-semibold">
                    {consultations.length === 0
                      ? "No consultations yet"
                      : "No matching consultations"}
                  </h4>

                  <p className="mt-2 max-w-md text-sm leading-6 text-gray-400">
                    {consultations.length === 0
                      ? "New booking requests will appear here when clients submit your consultation form."
                      : "Try changing your search or selecting another status filter."}
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-white/10">
                  {filteredConsultations.map((item) => (
                    <article
                      key={item._id}
                      className="p-5 transition hover:bg-white/[0.02] sm:p-6"
                    >
                      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-3">
                            <h4 className="text-base font-semibold">
                              {item.fullName || "Unnamed client"}
                            </h4>

                            <span
                              className={`rounded-full border px-2.5 py-1 text-xs font-medium ${
                                STATUS_STYLES[item.status] ||
                                "border-white/10 text-gray-300"
                              }`}
                            >
                              {formatStatus(item.status || "pending")}
                            </span>

                            <button
                              type="button"
                              onClick={() => {
                                setSelectedConsultation(item);
                                setNotesDraft(item.followUpNotes || "");
                                setNotesMessage("");
                              }}
                              className="rounded-lg border border-lime-400/30 px-3 py-1.5 text-xs font-medium text-lime-300 transition hover:bg-lime-400/10"
                            >
                              View details
                            </button>
                          </div>

                          <div className="mt-4 grid gap-3 text-sm text-gray-400 sm:grid-cols-2">
                            <p className="flex min-w-0 items-center gap-2 break-all">
                              <Mail
                                size={15}
                                className="shrink-0 text-lime-400"
                              />
                              {item.email || "No email"}
                            </p>

                            <p className="flex items-center gap-2 break-all">
                              <Phone
                                size={15}
                                className="shrink-0 text-lime-400"
                              />
                              {item.whatsapp || "No WhatsApp number"}
                            </p>

                            <p className="flex items-center gap-2">
                              <Calendar
                                size={15}
                                className="shrink-0 text-lime-400"
                              />
                              {formatDate(item.preferredDate)}
                            </p>

                            <p className="flex items-center gap-2">
                              <Clock3
                                size={15}
                                className="shrink-0 text-lime-400"
                              />
                              {item.preferredTime || "Time not specified"}
                            </p>
                          </div>

                          <div className="mt-4 flex flex-wrap gap-2">
                            {item.plan && (
                              <span className="rounded-lg bg-white/5 px-3 py-1.5 text-xs text-gray-300">
                                Plan: {item.plan}
                              </span>
                            )}

                            {item.country && (
                              <span className="rounded-lg bg-white/5 px-3 py-1.5 text-xs text-gray-300">
                                Country: {item.country}
                              </span>
                            )}
                          </div>

                          {item.goal && (
                            <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-400">
                              <span className="font-medium text-gray-300">
                                Goal:{" "}
                              </span>
                              {item.goal}
                            </p>
                          )}

                          <p className="mt-4 text-xs text-gray-600">
                            Received: {formatDate(item.createdAt)}
                          </p>
                        </div>

                        {/* Status update */}
                        <div className="w-full xl:w-48">
                          <label
                            htmlFor={`status-${item._id}`}
                            className="mb-2 block text-xs font-medium text-gray-400"
                          >
                            Update status
                          </label>

                          <select
                            id={`status-${item._id}`}
                            value={item.status || "pending"}
                            disabled={updatingId === item._id}
                            onChange={(event) =>
                              handleStatusChange(item._id, event.target.value)
                            }
                            className="w-full rounded-xl border border-white/10 bg-[#0b1c15] px-3 py-3 text-sm text-white outline-none focus:border-lime-400/60 disabled:opacity-50"
                          >
                            {STATUSES.map((status) => (
                              <option key={status} value={status}>
                                {formatStatus(status)}
                              </option>
                            ))}
                          </select>

                          {updatingId === item._id && (
                            <p className="mt-2 flex items-center gap-2 text-xs text-lime-300">
                              <LoaderCircle
                                size={13}
                                className="animate-spin"
                              />
                              Updating...
                            </p>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>

            <p className="mt-8 text-center text-xs text-gray-600">
              FitNRI Admin Portal · Private workspace
            </p>
          </div>
        </section>
      </div>

      {/* Consultation details modal */}
      {selectedConsultation && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !savingNotes) {
              setSelectedConsultation(null);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="consultation-details-title"
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#0b1c15] shadow-2xl"
          >
            <header className="sticky top-0 flex items-center justify-between border-b border-white/10 bg-[#0b1c15] p-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-lime-400">
                  Consultation details
                </p>

                <h2
                  id="consultation-details-title"
                  className="mt-2 text-xl font-bold"
                >
                  {selectedConsultation.fullName}
                </h2>
              </div>

              <button
                type="button"
                disabled={savingNotes}
                onClick={() => setSelectedConsultation(null)}
                className="rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white disabled:opacity-50"
                aria-label="Close consultation details"
              >
                <X size={20} />
              </button>
            </header>

            <div className="space-y-6 p-5">
              {/* Full booking details */}
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["Email", selectedConsultation.email],
                  ["WhatsApp", selectedConsultation.whatsapp],
                  ["Country", selectedConsultation.country],
                  ["Coaching plan", selectedConsultation.plan],
                  [
                    "Preferred date",
                    formatDate(selectedConsultation.preferredDate),
                  ],
                  ["Preferred time", selectedConsultation.preferredTime],
                  ["Submitted", formatDate(selectedConsultation.createdAt)],
                  [
                    "Status",
                    formatStatus(selectedConsultation.status || "pending"),
                  ],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <p className="text-xs text-gray-500">{label}</p>

                    <p className="mt-2 break-words text-sm text-gray-200">
                      {value || "Not provided"}
                    </p>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="mb-2 text-sm font-semibold">Fitness goal</h3>

                <p className="whitespace-pre-wrap rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-gray-300">
                  {selectedConsultation.goal || "No fitness goal provided."}
                </p>
              </div>

              {/* Follow-up notes editor */}
              <div>
                <label
                  htmlFor="follow-up-notes"
                  className="mb-2 block text-sm font-semibold"
                >
                  Follow-up notes
                </label>

                <p className="mb-3 text-xs leading-5 text-gray-500">
                  Record contact attempts, client questions, and the next
                  follow-up action.
                </p>

                <textarea
                  id="follow-up-notes"
                  value={notesDraft}
                  onChange={(event) => {
                    setNotesDraft(event.target.value);
                    setNotesMessage("");
                  }}
                  maxLength={3000}
                  rows={5}
                  placeholder="Example: Contacted via WhatsApp. Interested in the Transformation plan. Follow up on Monday."
                  className="w-full resize-y rounded-xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-white outline-none placeholder:text-gray-600 focus:border-lime-400/50"
                />

                <p className="mt-2 text-right text-xs text-gray-500">
                  {notesDraft.length}/3000 characters
                </p>

                {notesMessage && (
                  <p
                    role="status"
                    className={`mt-3 text-sm ${
                      notesMessage.includes("successfully")
                        ? "text-lime-300"
                        : "text-red-300"
                    }`}
                  >
                    {notesMessage}
                  </p>
                )}

                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={handleSaveNotes}
                    disabled={savingNotes || notesDraft.length > 3000}
                    className="flex items-center gap-2 rounded-xl bg-lime-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {savingNotes ? (
                      <LoaderCircle size={16} className="animate-spin" />
                    ) : (
                      <Save size={16} />
                    )}

                    {savingNotes ? "Saving..." : "Save follow-up notes"}
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
