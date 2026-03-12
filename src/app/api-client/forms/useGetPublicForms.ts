import { cache } from "react";
import prisma from "@/lib/prisma";

export interface PublicForm {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
}

/**
 * Server-side fetcher — calls Prisma directly.
 * React cache() dedupes parallel calls within the same render.
 * Next.js will re-run this on router.refresh() because it's a server component fetch.
 */
export const useGetPublicForms = cache(async (): Promise<PublicForm[]> => {
  try {
    const forms = await prisma.form.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, title: true, description: true, createdAt: true },
    });
    return forms.map((f) => ({
      ...f,
      description: f.description ?? undefined,
      createdAt: f.createdAt.toISOString(),
    }));
  } catch {
    return [];
  }
});
