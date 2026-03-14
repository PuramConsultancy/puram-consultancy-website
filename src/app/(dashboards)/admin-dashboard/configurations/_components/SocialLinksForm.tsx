"use client";

import { useEffect, useState } from "react";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoYoutube,
  IoLogoLinkedin,
  IoCheckmarkOutline,
  IoSaveOutline,
} from "react-icons/io5";
import { SiTiktok } from "react-icons/si";
import { SiteConfig } from "@/app/api-client/config/useGetConfig";
import { useUpdateConfig } from "@/app/api-client/config/useUpdateConfig";

const SOCIAL_FIELDS = [
  {
    key: "facebook" as const,
    label: "Facebook",
    icon: IoLogoFacebook,
    color: "text-blue-600",
    placeholder: "https://facebook.com/yourpage",
  },
  {
    key: "instagram" as const,
    label: "Instagram",
    icon: IoLogoInstagram,
    color: "text-pink-500",
    placeholder: "https://instagram.com/yourhandle",
  },
  {
    key: "youtube" as const,
    label: "YouTube",
    icon: IoLogoYoutube,
    color: "text-red-500",
    placeholder: "https://youtube.com/@yourchannel",
  },
  {
    key: "linkedin" as const,
    label: "LinkedIn",
    icon: IoLogoLinkedin,
    color: "text-blue-700",
    placeholder: "https://linkedin.com/company/yourcompany",
  },
  {
    key: "tiktok" as const,
    label: "TikTok",
    icon: SiTiktok,
    color: "text-gray-800",
    placeholder: "https://tiktok.com/@yourhandle",
  },
];

const SocialLinksForm = ({ config }: { config: SiteConfig }) => {
  const [form, setForm] = useState({
    facebook: "",
    instagram: "",
    youtube: "",
    linkedin: "",
    tiktok: "",
  });
  const [saved, setSaved] = useState(false);
  const { mutateAsync: updateConfig, isPending } = useUpdateConfig();

  useEffect(() => {
    setForm({
      facebook: config.facebook,
      instagram: config.instagram,
      youtube: config.youtube,
      linkedin: config.linkedin,
      tiktok: config.tiktok,
    });
  }, [config]);

  const handleSave = async () => {
    await updateConfig(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex flex-col gap-4">
      {SOCIAL_FIELDS.map(({ key, label, icon: Icon, color, placeholder }) => (
        <div key={key}>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500">
            {label}
          </label>
          <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 focus-within:border-[var(--color-primary)]/40 focus-within:ring-2 focus-within:ring-[var(--color-primary)]/10">
            <Icon className={`size-4 shrink-0 ${color}`} />
            <input
              type="url"
              value={form[key]}
              onChange={(e) =>
                setForm((p) => ({ ...p, [key]: e.target.value }))
              }
              placeholder={placeholder}
              className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
            />
          </div>
        </div>
      ))}

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
            <><IoCheckmarkOutline className="size-4" />Saved!</>
          ) : (
            <><IoSaveOutline className="size-4" />{isPending ? "Saving…" : "Save Links"}</>
          )}
        </button>
      </div>
    </div>
  );
};

export default SocialLinksForm;