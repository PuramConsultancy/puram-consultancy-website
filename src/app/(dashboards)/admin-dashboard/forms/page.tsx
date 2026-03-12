"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Form from "@/components/Form/Form";
import Input from "@/components/Form/Input";
import Field from "@/components/Form/Field";
import ErrorMessage from "@/components/Form/ErrorMessage";
import Button from "@/components/Button";
import { Sheet } from "@/components/drawer";
import {
  IoAdd,
  IoClose,
  IoEye,
  IoPencil,
  IoSearch,
  IoTrash,
  IoListOutline,
} from "react-icons/io5";
import { CreateFormSchema } from "@/schemas/form.schemas";
import { useCreateForm } from "@/app/api-client/forms/useCreateForm";
import { useGetForms } from "@/app/api-client/forms/useGetForms";
import { useDeleteForm } from "@/app/api-client/forms/useDeleteForm";
import { AxiosError } from "axios";
import { CustomError } from "@/app/api/helpers/handleError";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

const FormsPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isFormCreationOpen, setIsFormCreationOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { data: formsData, isLoading } = useGetForms();
  const forms = formsData?.data ?? [];

  const { mutateAsync: createForm } = useCreateForm({});
  const { mutateAsync: deleteForm } = useDeleteForm({});

  const filteredForms = useMemo(
    () =>
      forms.filter((f) => f.title.toLowerCase().includes(search.toLowerCase())),
    [forms, search],
  );

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this form?")) return;

    queryClient.setQueryData<{ success: boolean; data: typeof forms }>(
      ["forms"],
      (old) => {
        if (!old) return old;
        return { ...old, data: old.data.filter((f) => f.id !== id) };
      },
    );

    try {
      await deleteForm({ params: { id } });
    } catch {
      queryClient.invalidateQueries({ queryKey: ["forms"] });
    }

    router.refresh();
  };

  return (
    <section className="flex h-full flex-1 flex-col overflow-hidden">
      <div className="h-full w-full flex-1 overflow-y-auto bg-gray-100 p-5">
        <div className="flex min-h-full flex-1 flex-col rounded-2xl bg-white p-5">
          {/* Header */}
          <div className="flex items-center justify-between gap-3">
            <div className="bg-primary/10 flex items-center gap-2 rounded-md px-2 py-1">
              <IoSearch className="text-primary size-5" />
              <input
                placeholder="Search forms..."
                className="w-64 border-0 bg-transparent text-sm text-gray-800 placeholder:text-gray-500 focus:outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Sheet
              open={isFormCreationOpen}
              onOpenChange={setIsFormCreationOpen}
              shouldScaleBackground
              setBackgroundColorOnScale
            >
              <Sheet.Button asChild>
                <Button className="flex items-center gap-2 py-2">
                  <IoAdd className="size-5" />
                  Create Form
                </Button>
              </Sheet.Button>

              <Sheet.Content>
                <div className="flex flex-col rounded-xl bg-white p-4 md:rounded-md md:rounded-r-none">
                  <Sheet.Header className="flex items-start justify-between gap-10">
                    <div className="w-full">
                      <Sheet.Title>Create Form</Sheet.Title>
                      <Sheet.Description className="mt-1">
                        Enter form title and description to create a new form.
                      </Sheet.Description>
                    </div>
                    <Sheet.Close asChild>
                      <Button variant="secondary" className="rounded-md p-1">
                        <IoClose className="size-4" />
                      </Button>
                    </Sheet.Close>
                  </Sheet.Header>

                  <div className="mt-5 flex flex-col">
                    <Form
                      validationSchema={CreateFormSchema}
                      className="space-y-1"
                      onSubmit={async (values, methods) => {
                        try {
                          const form = await createForm({ body: values });
                          await queryClient.invalidateQueries({
                            queryKey: ["forms"],
                          });
                          setIsFormCreationOpen(false);
                          router.refresh();
                          router.push(
                            `/admin-dashboard/forms/${form.data.id}/builder`,
                          );
                        } catch (error) {
                          const err = error as AxiosError;
                          const errObject = err.response?.data as CustomError;
                          methods.setError("title", {
                            message:
                              errObject?.error?.message ||
                              "Failed to create form",
                          });
                        }
                      }}
                    >
                      {({ register, formState: { errors, isSubmitting } }) => (
                        <>
                          <Field>
                            <Input
                              placeholder="Enter form title"
                              data-invalid={errors.title?.message}
                              {...register("title")}
                            />
                            <ErrorMessage>{errors.title?.message}</ErrorMessage>
                          </Field>
                          <Field>
                            <Input
                              placeholder="Enter form description"
                              data-invalid={errors.description?.message}
                              {...register("description")}
                            />
                            <ErrorMessage>
                              {errors.description?.message}
                            </ErrorMessage>
                          </Field>
                          <Button type="submit" isLoading={isSubmitting}>
                            Create Form
                          </Button>
                        </>
                      )}
                    </Form>
                  </div>
                </div>
              </Sheet.Content>
            </Sheet>
          </div>

          {/* Forms List */}
          <div className="mt-5 flex flex-col gap-3">
            {isLoading && (
              <div className="flex flex-col gap-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-20 animate-pulse rounded-md border bg-gray-100"
                  />
                ))}
              </div>
            )}

            {!isLoading && filteredForms.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-sm font-medium text-gray-500">
                  {search ? "No forms match your search." : "No forms yet."}
                </p>
                {!search && (
                  <p className="mt-1 text-xs text-gray-400">
                    Click "Create Form" to get started.
                  </p>
                )}
              </div>
            )}

            <AnimatePresence mode="popLayout">
              {!isLoading &&
                filteredForms.map((form) => (
                  <motion.div
                    key={form.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -10, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    onClick={() =>
                      router.push(`/admin-dashboard/forms/${form.id}/builder`)
                    }
                    className="group flex cursor-pointer items-center justify-between rounded-md border bg-white p-3 transition-shadow hover:shadow-md"
                  >
                    <div className="flex-1">
                      <h3 className="text-base font-medium text-gray-800">
                        {form.title}
                      </h3>
                      {form.description && (
                        <p className="text-sm text-gray-500">
                          {form.description}
                        </p>
                      )}
                      <p className="mt-1 text-xs text-gray-400">
                        Created:{" "}
                        {new Date(form.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      {/* ✅ Submissions button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(
                            `/admin-dashboard/forms/${form.id}/submissions`,
                          );
                        }}
                        className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-400 transition-colors hover:bg-violet-50 hover:text-violet-600"
                        title="View Submissions"
                      >
                        <IoListOutline className="size-4" />
                        Submissions
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(
                            `/admin-dashboard/forms/${form.id}/preview`,
                          );
                        }}
                        className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-blue-500"
                        title="Preview"
                      >
                        <IoEye className="size-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(
                            `/admin-dashboard/forms/${form.id}/builder`,
                          );
                        }}
                        className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-green-500"
                        title="Edit"
                      >
                        <IoPencil className="size-4" />
                      </button>
                      <button
                        onClick={(e) => handleDelete(e, form.id)}
                        className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                        title="Delete"
                      >
                        <IoTrash className="size-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormsPage;
