"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  IoArrowBack,
  IoSearch,
  IoClose,
  IoPersonCircle,
  IoCalendar,
  IoCheckmarkCircle,
  IoDocumentText,
  IoChevronForward,
  IoDownload,
} from "react-icons/io5";
import {
  useGetSubmissions,
  Submission,
  FormQuestion,
} from "@/app/api-client/forms/useGetSubmissions";
import { exportFormSubmissions } from "@/app/api-client/forms/utils/exportSubmissions";

// ── Helpers ──────────────────────────────────────────────────────────────────

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const getInitials = (s: Submission) => {
  if (s.user?.firstName) {
    return `${s.user.firstName[0]}${s.user.lastName?.[0] ?? ""}`.toUpperCase();
  }
  return "G";
};

const getDisplayName = (s: Submission) => {
  if (s.user?.firstName) {
    return `${s.user.firstName} ${s.user.lastName ?? ""}`.trim();
  }
  return "Guest";
};

const AVATAR_COLORS = [
  "bg-violet-500",
  "bg-sky-500",
  "bg-emerald-500",
  "bg-rose-500",
  "bg-amber-500",
  "bg-indigo-500",
  "bg-pink-500",
  "bg-teal-500",
];

const avatarColor = (id: string) =>
  AVATAR_COLORS[
    id.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % AVATAR_COLORS.length
  ];

const flattenQuestions = (
  sections: { questions: FormQuestion[] }[],
): FormQuestion[] => sections.flatMap((s) => s.questions);

const renderAnswer = (val: unknown): string => {
  if (val === undefined || val === null || val === "") return "—";
  if (Array.isArray(val)) return val.join(", ") || "—";
  return String(val);
};

// ── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({
  label,
  value,
  color,
  icon: Icon,
}: {
  label: string;
  value: number | string;
  color: string;
  icon: React.ElementType;
}) => (
  <div className={`relative overflow-hidden rounded-2xl p-5 ${color}`}>
    <div className="pointer-events-none absolute -top-4 -right-4 size-20 rounded-full bg-white/10" />
    <Icon className="size-5 text-white/80" />
    <p className="mt-3 text-2xl font-bold text-white">{value}</p>
    <p className="mt-0.5 text-xs font-medium text-white/70">{label}</p>
  </div>
);

// ── Detail Drawer ─────────────────────────────────────────────────────────────
const SubmissionDrawer = ({
  submission,
  questions,
  onClose,
}: {
  submission: Submission | null;
  questions: FormQuestion[];
  onClose: () => void;
}) => (
  <AnimatePresence>
    {submission && (
      <>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
        />

        {/* Panel */}
        <motion.aside
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 260 }}
          className="fixed top-0 right-0 z-50 flex h-full w-full max-w-lg flex-col bg-white shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <div className="flex items-center gap-3">
              <div
                className={`flex size-10 items-center justify-center rounded-xl text-sm font-bold text-white ${avatarColor(submission.id)}`}
              >
                {getInitials(submission)}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {getDisplayName(submission)}
                </p>
                {submission.user?.email && (
                  <p className="text-xs text-gray-400">
                    {submission.user.email}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            >
              <IoClose className="size-5" />
            </button>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-4 border-b border-gray-100 px-6 py-3">
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <IoCalendar className="size-3.5" />
              {formatDate(submission.createdAt)}
            </div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
              <IoCheckmarkCircle className="size-3.5" />
              Submitted
            </div>
          </div>

          {/* Answers */}
          <div className="flex-1 overflow-y-auto px-6 py-5">
            <p className="mb-4 text-xs font-bold tracking-widest text-gray-400 uppercase">
              Responses
            </p>
            <div className="flex flex-col gap-4">
              {questions.map((q, i) => {
                const answer = renderAnswer(
                  (submission.data as Record<string, unknown>)[q.id],
                );
                return (
                  <motion.div
                    key={q.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="rounded-xl border border-gray-100 bg-gray-50 p-4"
                  >
                    <p className="text-xs font-semibold text-gray-400">
                      {q.label}
                    </p>
                    <p className="mt-1.5 text-sm font-medium break-words text-gray-800">
                      {answer}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 px-6 py-4">
            <p className="text-[10px] text-gray-300">
              Submission ID: {submission.id}
            </p>
          </div>
        </motion.aside>
      </>
    )}
  </AnimatePresence>
);

// ── Main Page ─────────────────────────────────────────────────────────────────
const SubmissionsPage = () => {
  const params = useParams();
  const router = useRouter();
  const formId = params.id as string;

  const { data, isLoading, isError } = useGetSubmissions(formId);
  const form = data?.data?.form;
  const submissions = data?.data?.submissions ?? [];
  const questions = useMemo(
    () => flattenQuestions(form?.sections ?? []),
    [form],
  );

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Submission | null>(null);

  const filtered = useMemo(
    () =>
      submissions.filter((s) => {
        const name = getDisplayName(s).toLowerCase();
        const email = s.user?.email?.toLowerCase() ?? "";
        const q = search.toLowerCase();
        return name.includes(q) || email.includes(q);
      }),
    [submissions, search],
  );

  // ── Loading ──
  if (isLoading) {
    return (
      <section className="flex h-full flex-1 flex-col overflow-hidden">
        <div className="h-full overflow-y-auto bg-gray-50 p-5">
          <div className="flex flex-col gap-4">
            <div className="h-8 w-48 animate-pulse rounded-lg bg-gray-200" />
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-24 animate-pulse rounded-2xl bg-gray-200"
                />
              ))}
            </div>
            <div className="h-96 animate-pulse rounded-2xl bg-gray-200" />
          </div>
        </div>
      </section>
    );
  }

  // ── Error ──
  if (isError || !form) {
    return (
      <section className="flex h-full flex-1 items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-gray-500">Failed to load submissions.</p>
          <button
            onClick={() => router.back()}
            className="mt-3 text-sm font-medium text-violet-600 hover:underline"
          >
            Go back
          </button>
        </div>
      </section>
    );
  }

  const todayCount = submissions.filter(
    (s) => new Date(s.createdAt).toDateString() === new Date().toDateString(),
  ).length;

  const guestCount = submissions.filter((s) => !s.userId).length;

  return (
    <>
      <section className="flex h-full flex-1 flex-col overflow-hidden">
        <div className="h-full overflow-y-auto bg-gray-50 p-5">
          <div className="flex flex-col gap-5">
            {/* ── Back + Title ── */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-1.5 text-sm font-medium text-gray-400 transition-colors hover:text-gray-700"
              >
                <IoArrowBack className="size-4" />
                Back
              </button>
              <span className="text-gray-300">/</span>
              <div className="flex items-center gap-2">
                <div className="flex size-7 items-center justify-center rounded-lg bg-violet-100">
                  <IoDocumentText className="size-4 text-violet-600" />
                </div>
                <h1 className="text-sm font-semibold text-gray-700">
                  {form.title}
                </h1>
              </div>
            </div>

            {/* ── Stat cards ── */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <StatCard
                label="Total Submissions"
                value={submissions.length}
                color="bg-gradient-to-br from-violet-500 to-violet-700"
                icon={IoDocumentText}
              />
              <StatCard
                label="Today"
                value={todayCount}
                color="bg-gradient-to-br from-sky-500 to-sky-700"
                icon={IoCalendar}
              />
              <StatCard
                label="Guest Submissions"
                value={guestCount}
                color="bg-gradient-to-br from-emerald-500 to-emerald-700"
                icon={IoPersonCircle}
              />
            </div>

            {/* ── Table card ── */}
            <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
              {/* Table header */}
              <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-5 py-4">
                <div className="flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-2 ring-1 ring-gray-200">
                  <IoSearch className="size-4 text-gray-400" />
                  <input
                    placeholder="Search by name or email…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-52 bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
                  />
                  {search && (
                    <button onClick={() => setSearch("")}>
                      <IoClose className="size-3.5 text-gray-400 hover:text-gray-600" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-600">
                    {filtered.length} result{filtered.length !== 1 ? "s" : ""}
                  </span>

                  <button
                    onClick={() =>
                      exportFormSubmissions(form.title, submissions, questions)
                    }
                    disabled={submissions.length === 0}
                    className="flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600 transition-colors hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <IoDownload className="size-3.5" />
                    Export Excel
                  </button>
                </div>
              </div>

              {/* Empty state */}
              {filtered.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-gray-100">
                    <IoDocumentText className="size-7 text-gray-300" />
                  </div>
                  <p className="mt-4 text-sm font-medium text-gray-500">
                    {search
                      ? "No submissions match your search."
                      : "No submissions yet."}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    Submissions will appear here once users fill out the form.
                  </p>
                </div>
              )}

              {/* Table */}
              {filtered.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50/60">
                        <th className="px-5 py-3 text-left text-xs font-semibold tracking-wider text-gray-400 uppercase">
                          Submitter
                        </th>
                        {questions.slice(0, 3).map((q) => (
                          <th
                            key={q.id}
                            className="px-5 py-3 text-left text-xs font-semibold tracking-wider text-gray-400 uppercase"
                          >
                            {q.label.length > 20
                              ? q.label.slice(0, 20) + "…"
                              : q.label}
                          </th>
                        ))}
                        <th className="px-5 py-3 text-left text-xs font-semibold tracking-wider text-gray-400 uppercase">
                          Date
                        </th>
                        <th className="px-5 py-3 text-left text-xs font-semibold tracking-wider text-gray-400 uppercase">
                          Status
                        </th>
                        <th className="w-10 px-5 py-3" />
                      </tr>
                    </thead>
                    <tbody>
                      <AnimatePresence>
                        {filtered.map((submission, i) => (
                          <motion.tr
                            key={submission.id}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.03 }}
                            onClick={() => setSelected(submission)}
                            className="group cursor-pointer border-b border-gray-50 transition-colors last:border-0 hover:bg-violet-50/40"
                          >
                            {/* Submitter */}
                            <td className="px-5 py-3.5">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`flex size-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold text-white ${avatarColor(submission.id)}`}
                                >
                                  {getInitials(submission)}
                                </div>
                                <div>
                                  <p className="font-medium text-gray-800">
                                    {getDisplayName(submission)}
                                  </p>
                                  {submission.user?.email && (
                                    <p className="text-xs text-gray-400">
                                      {submission.user.email}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </td>

                            {/* First 3 question answers */}
                            {questions.slice(0, 3).map((q) => (
                              <td
                                key={q.id}
                                className="max-w-[160px] truncate px-5 py-3.5 text-gray-600"
                              >
                                {renderAnswer(
                                  (submission.data as Record<string, unknown>)[
                                    q.id
                                  ],
                                )}
                              </td>
                            ))}

                            {/* Date */}
                            <td className="px-5 py-3.5 text-xs whitespace-nowrap text-gray-400">
                              {formatDate(submission.createdAt)}
                            </td>

                            {/* Status badge */}
                            <td className="px-5 py-3.5">
                              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                                <span className="size-1.5 rounded-full bg-emerald-500" />
                                Submitted
                              </span>
                            </td>

                            {/* Chevron */}
                            <td className="px-5 py-3.5">
                              <IoChevronForward className="size-4 text-gray-300 transition-colors group-hover:text-violet-500" />
                            </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Detail drawer */}
      <SubmissionDrawer
        submission={selected}
        questions={questions}
        onClose={() => setSelected(null)}
      />
    </>
  );
};

export default SubmissionsPage;
