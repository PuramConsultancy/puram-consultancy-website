export type QuestionType =
  | "TEXT"
  | "TEXTAREA"
  | "EMAIL"
  | "PHONE"
  | "PHONE_INTERNATIONAL"
  | "NUMBER"
  | "MULTIPLE_CHOICE"
  | "CHECKBOX"
  | "DROPDOWN"
  | "DATE"
  | "FILE";

export interface Option {
  id: string;
  label: string;
  value: string;
}

export interface Question {
  id: string;
  label: string;
  type: QuestionType;
  required: boolean;
  order: number;
  options: Option[];
}

export interface Section {
  id: string;
  title: string;
  order: number;
  questions: Question[];
}

export const QUESTION_TYPES: {
  value: QuestionType;
  label: string;
  icon: string;
}[] = [
  { value: "TEXT", label: "Short Text", icon: "T" },
  { value: "TEXTAREA", label: "Long Text", icon: "¶" },
  { value: "EMAIL", label: "Email", icon: "@" },
  { value: "PHONE", label: "Phone", icon: "☎" },
  { value: "PHONE_INTERNATIONAL", label: "Intl. Phone", icon: "🌐" },
  { value: "NUMBER", label: "Number", icon: "#" },
  { value: "MULTIPLE_CHOICE", label: "Multiple Choice", icon: "◉" },
  { value: "CHECKBOX", label: "Checkbox", icon: "☑" },
  { value: "DROPDOWN", label: "Dropdown", icon: "▾" },
  { value: "DATE", label: "Date", icon: "📅" },
  { value: "FILE", label: "File Upload", icon: "⇪" },
];

export const OPTION_TYPES: QuestionType[] = [
  "MULTIPLE_CHOICE",
  "CHECKBOX",
  "DROPDOWN",
];

export const uid = () => Math.random().toString(36).slice(2, 10);
export const isDbId = (id: string) => id.length === 24;
