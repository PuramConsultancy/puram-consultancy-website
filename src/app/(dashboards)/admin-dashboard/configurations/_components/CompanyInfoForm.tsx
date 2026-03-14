"use client";

import { useEffect, useState } from "react";
import { IoCheckmarkOutline, IoSaveOutline } from "react-icons/io5";
import { SiteConfig } from "@/app/api-client/config/useGetConfig";
import { useUpdateConfig } from "@/app/api-client/config/useUpdateConfig";

const Field = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) => (
  <div>
    <label className="mb-1.5 block text-xs font-semibold tracking-wider text-gray-500 uppercase">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-[var(--color-primary)]/40 focus:ring-2 focus:ring-[var(--color-primary)]/10 focus:outline-none"
    />
  </div>
);

const CompanyInfoForm = ({ config }: { config: SiteConfig }) => {
  const [form, setForm] = useState({
    companyName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [saved, setSaved] = useState(false);
  const { mutateAsync: updateConfig, isPending } = useUpdateConfig();

  useEffect(() => {
    setForm({
      companyName: config.companyName,
      email: config.email,
      phone: config.phone,
      address: config.address,
    });
  }, [config]);

  const handleSave = async () => {
    await updateConfig(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const set = (key: keyof typeof form) => (v: string) =>
    setForm((p) => ({ ...p, [key]: v }));

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          label="Company Name"
          value={form.companyName}
          onChange={set("companyName")}
          placeholder="Puram Consultancy"
        />
        <Field
          label="Email"
          value={form.email}
          onChange={set("email")}
          placeholder="hello@company.com"
          type="email"
        />
        <Field
          label="Phone"
          value={form.phone}
          onChange={set("phone")}
          placeholder="+94 77 123 4567"
        />
        <Field
          label="Address"
          value={form.address}
          onChange={set("address")}
          placeholder="Colombo, Sri Lanka"
        />
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={isPending}
          className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all disabled:opacity-50 ${
            saved
              ? "bg-emerald-500"
              : "bg-[var(--color-primary)] hover:bg-[var(--color-primary-600)]"
          }`}
        >
          {saved ? (
            <>
              <IoCheckmarkOutline className="size-4" />
              Saved!
            </>
          ) : (
            <>
              <IoSaveOutline className="size-4" />
              {isPending ? "Saving…" : "Save Changes"}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CompanyInfoForm;
