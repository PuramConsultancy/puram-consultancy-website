import { Question, QuestionType, Section, uid } from "@/app/(dashboards)/admin-dashboard/forms/[id]/builder/types";
import { useState } from "react";

export function useSections() {
  const [sections, setSections] = useState<Section[]>([]);

  const addSection = () =>
    setSections((prev) => [
      ...prev,
      { id: uid(), title: "", order: prev.length, questions: [] },
    ]);

  const updateSectionTitle = (id: string, title: string) =>
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, title } : s)));

  const deleteSection = (id: string) =>
    setSections((prev) => prev.filter((s) => s.id !== id));

  const addQuestion = (sectionId: string) =>
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              questions: [
                ...s.questions,
                {
                  id: uid(),
                  label: "",
                  type: "TEXT" as QuestionType,
                  required: false,
                  order: s.questions.length,
                  options: [],
                },
              ],
            }
          : s,
      ),
    );

  const updateQuestion = (sectionId: string, updated: Question) =>
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              questions: s.questions.map((q) =>
                q.id === updated.id ? updated : q,
              ),
            }
          : s,
      ),
    );

  const deleteQuestion = (sectionId: string, questionId: string) =>
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              questions: s.questions.filter((q) => q.id !== questionId),
            }
          : s,
      ),
    );

  const reorderQuestions = (sectionId: string, questions: Question[]) =>
    setSections((prev) =>
      prev.map((s) => (s.id === sectionId ? { ...s, questions } : s)),
    );

  return {
    sections,
    setSections,
    addSection,
    updateSectionTitle,
    deleteSection,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    reorderQuestions,
  };
}
