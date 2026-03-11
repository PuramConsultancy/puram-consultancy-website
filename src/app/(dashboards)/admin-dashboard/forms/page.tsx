"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { z } from "zod";
import Form from "@/components/Form/Form";
import Input from "@/components/Form/Input";
import Field from "@/components/Form/Field";
import InputGroup from "@/components/Form/InputGroup";
import ErrorMessage from "@/components/Form/ErrorMessage";
import Button from "@/components/Button";
import { Sheet } from "@/components/drawer";
import { IoAdd, IoClose, IoSearch } from "react-icons/io5";
import { CreateFormSchema } from "@/schemas/form.schemas";
import { useCreateForm } from "@/app/api-client/forms/useCreateForm";
import { AxiosError } from "axios";
import { CustomError } from "@/app/api/helpers/handleError";
import { useRouter } from "next/navigation";

interface FormItem {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
}

const FormsPage = () => {
  const router = useRouter();
  const [isFormCreationOpen, setIsFormCreationOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [forms, setForms] = useState<FormItem[]>([
    {
      id: "1",
      title: "Survey Form",
      description: "General survey",
      createdAt: "2026-03-09",
    },
    {
      id: "2",
      title: "Feedback Form",
      description: "Product feedback",
      createdAt: "2026-03-08",
    },
  ]);

  const { mutateAsync: createForm } = useCreateForm({
    invalidateQueryKey: ["forms"],
  });

  const filteredForms = useMemo(
    () =>
      forms.filter((f) => f.title.toLowerCase().includes(search.toLowerCase())),
    [forms, search],
  );

  return (
    <section className="flex h-full flex-1 flex-col overflow-hidden">
      <div className="h-full w-full flex-1 overflow-y-auto bg-gray-100 p-5">
        <div className="flex min-h-full flex-1 flex-col rounded-2xl bg-white p-5">
          {/* Header: Search + Create */}
          <div className="flex items-center justify-between gap-3">
            <div className="bg-primary/10 flex items-center gap-2 rounded-md px-2 py-1">
              <IoSearch className="text-primary size-5" />
              <input
                placeholder="Search forms..."
                className="w-64 border-0 bg-transparent text-sm text-gray-800 placeholder:text-gray-500 focus:outline-none dark:text-white dark:placeholder:text-white/50"
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

                          // ✅ Navigate to form builder instead of staying on list
                          router.push(
                            `/admin-dashboard/forms/${form.data.id}/builder`,
                          );

                          setIsFormCreationOpen(false);
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
            <AnimatePresence>
              {filteredForms.length > 0 ? (
                filteredForms.map((form) => (
                  <motion.div
                    key={form.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="rounded-md border bg-white p-3 hover:shadow-md"
                  >
                    <h3 className="text-lg font-medium">{form.title}</h3>
                    {form.description && (
                      <p className="text-sm text-gray-600">
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
                  </motion.div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No forms found.</p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormsPage;
