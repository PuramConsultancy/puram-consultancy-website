"use client";

import { useEffect, useState } from "react";
import {
  IoEyeOutline,
  IoEyeOffOutline,
  IoCheckmarkOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";
import { useUpdateAdminCredentials } from "@/app/api-client/config/useUpdateAdminCredentials";
import { useAuth } from "@/store/authStore";

const PasswordInput = ({
  label,
  value,
  onChange,
  placeholder,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
}) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold tracking-wider text-gray-500 uppercase">
        {label}
      </label>
      <div
        className={`flex items-center gap-2 rounded-xl border bg-gray-50 px-4 py-2.5 focus-within:ring-2 focus-within:ring-[var(--color-primary)]/10 ${
          error
            ? "border-rose-300 focus-within:border-rose-400"
            : "border-gray-200 focus-within:border-[var(--color-primary)]/40"
        }`}
      >
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="text-gray-400 hover:text-gray-600"
        >
          {show ? (
            <IoEyeOffOutline className="size-4" />
          ) : (
            <IoEyeOutline className="size-4" />
          )}
        </button>
      </div>
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
    </div>
  );
};

const AdminCredentialsForm = () => {
  const { user } = useAuth();
  const { mutateAsync: updateCredentials, isPending } =
    useUpdateAdminCredentials();

  const [email, setEmail] = useState(user?.email ?? "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);
  const [apiError, setApiError] = useState("");

  // ← Sync email field when Zustand user updates after save
  useEffect(() => {
    if (user?.email) setEmail(user.email);
  }, [user?.email]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!currentPassword) e.currentPassword = "Current password is required";
    if (newPassword && newPassword.length < 8)
      e.newPassword = "Password must be at least 8 characters";
    if (newPassword && newPassword !== confirmPassword)
      e.confirmPassword = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setApiError("");
    try {
      await updateCredentials({
        email: email !== user?.email ? email : undefined,
        currentPassword,
        newPassword: newPassword || undefined,
      });
      setSaved(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setSaved(false), 2500);
    } catch (err: any) {
      const msg =
        err?.response?.data?.error?.message || "Failed to update credentials";
      setApiError(msg);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Email */}
      <div>
        <label className="mb-1.5 block text-xs font-semibold tracking-wider text-gray-500 uppercase">
          Admin Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 focus:border-[var(--color-primary)]/40 focus:ring-2 focus:ring-[var(--color-primary)]/10 focus:outline-none"
        />
      </div>

      <div className="my-1 border-t border-gray-100" />
      <p className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
        Change Password
      </p>

      <PasswordInput
        label="Current Password"
        value={currentPassword}
        onChange={setCurrentPassword}
        placeholder="Enter current password"
        error={errors.currentPassword}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <PasswordInput
          label="New Password"
          value={newPassword}
          onChange={setNewPassword}
          placeholder="Leave blank to keep current"
          error={errors.newPassword}
        />
        <PasswordInput
          label="Confirm New Password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder="Repeat new password"
          error={errors.confirmPassword}
        />
      </div>

      {apiError && (
        <p className="rounded-xl bg-rose-50 px-4 py-2.5 text-xs font-medium text-rose-600">
          {apiError}
        </p>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={isPending}
          className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all disabled:opacity-50 ${
            saved
              ? "bg-emerald-500"
              : "bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-600)]"
          }`}
        >
          {saved ? (
            <>
              <IoCheckmarkOutline className="size-4" />
              Updated!
            </>
          ) : (
            <>
              <IoShieldCheckmarkOutline className="size-4" />
              {isPending ? "Updating…" : "Update Credentials"}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AdminCredentialsForm;
