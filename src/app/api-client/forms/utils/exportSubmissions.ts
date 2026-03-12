// app/api-client/forms/utils/exportSubmissions.ts

import * as XLSX from "xlsx";
import { Submission, FormQuestion } from "../useGetSubmissions";
import { FormWithSubmissions } from "../useGetAllSubmissions";

// ── Helpers ───────────────────────────────────────────────────────────────────

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const getDisplayName = (s: Submission) => {
  if (s.user?.firstName)
    return `${s.user.firstName} ${s.user.lastName ?? ""}`.trim();
  return "Guest";
};

const renderAnswer = (val: unknown): string => {
  if (val === undefined || val === null || val === "") return "";
  if (Array.isArray(val)) return val.join(", ");
  return String(val);
};

const applyColumnWidths = (
  ws: XLSX.WorkSheet,
  rows: Record<string, string>[],
) => {
  if (!rows.length) return;
  ws["!cols"] = Object.keys(rows[0]).map((key) => ({
    wch: Math.max(key.length, ...rows.map((r) => (r[key] ?? "").length)) + 2,
  }));
};

// ── Export a single form ──────────────────────────────────────────────────────

export const exportFormSubmissions = (
  formTitle: string,
  submissions: Submission[],
  questions: FormQuestion[],
) => {
  const rows = submissions.map((s) => {
    const row: Record<string, string> = {
      "Submitter Name": getDisplayName(s),
      "Submitted At": formatDate(s.createdAt),
    };
    questions.forEach((q) => {
      row[q.label] = renderAnswer((s.data as Record<string, unknown>)[q.id]);
    });
    return row;
  });

  const ws = XLSX.utils.json_to_sheet(rows);
  applyColumnWidths(ws, rows);

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Submissions");
  XLSX.writeFile(wb, `${formTitle}-submissions.xlsx`);
};

// ── Export all forms (one sheet per form) ────────────────────────────────────

export const exportAllSubmissions = (forms: FormWithSubmissions[]) => {
  const wb = XLSX.utils.book_new();

  forms.forEach((form) => {
    const questions = form.sections.flatMap((s) => s.questions);

    const rows = form.submissions.map((s) => {
      const row: Record<string, string> = {
        "Submitter Name": getDisplayName(s),
        "Submitted At": formatDate(s.createdAt),
      };
      questions.forEach((q) => {
        row[q.label] = renderAnswer((s.data as Record<string, unknown>)[q.id]);
      });
      return row;
    });

    const sheetName = form.title.slice(0, 31);
    const ws = XLSX.utils.json_to_sheet(rows);
    applyColumnWidths(ws, rows);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  });

  XLSX.writeFile(wb, `all-submissions.xlsx`);
};
