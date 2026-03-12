import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";
import { SurfaceCard } from "@/components/ui/surface-card";
import { IoArrowBack } from "react-icons/io5";
import DynamicForm from "../../DynamicForm";

interface FormPageProps {
  params: Promise<{ id: string }>;
}

const FormPage = async ({ params }: FormPageProps) => {
  const { id } = await params;

  return (
    <PageShell>
      <SurfaceCard as="section">
        <Link
          href="/contact/forms"
          className="mb-5 inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 transition-colors hover:text-(--color-primary)"
        >
          <IoArrowBack className="size-3.5" /> Back to all forms
        </Link>
        <DynamicForm formId={id} />
      </SurfaceCard>
    </PageShell>
  );
};

export default FormPage;
