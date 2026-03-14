"use client";

import {
  IoShareSocialOutline,
  IoShieldCheckmarkOutline,
  IoBuildOutline
} from "react-icons/io5";
import { useGetConfig } from "@/app/api-client/config/useGetConfig";
import ConfigSection from "./_components/ConfigSection";
import CompanyInfoForm from "./_components/CompanyInfoForm";
import SocialLinksForm from "./_components/SocialLinksForm";
import AdminCredentialsForm from "./_components/AdminCredentialsForm";

const ConfigurationsPage = () => {
  const { data, isLoading, isError } = useGetConfig();
  const config = data?.data;

  if (isLoading) {
    return (
      <section className="flex h-full flex-1 flex-col overflow-hidden">
        <div className="h-full overflow-y-auto bg-gray-50 p-5">
          <div className="flex flex-col gap-4">
            <div className="h-8 w-48 animate-pulse rounded-lg bg-gray-200" />
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-64 animate-pulse rounded-2xl bg-gray-200"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError || !config) {
    return (
      <section className="flex h-full flex-1 items-center justify-center">
        <p className="text-sm text-gray-500">Failed to load configurations.</p>
      </section>
    );
  }

  return (
    <section className="flex h-full flex-1 flex-col overflow-hidden">
      <div className="h-full overflow-y-auto bg-gray-50 p-5">
        <div className="mx-auto flex max-w-3xl flex-col gap-5">
          {/* Header */}
          <div>
            <h1 className="text-lg font-semibold text-gray-800">
              Configurations
            </h1>
            <p className="mt-0.5 text-xs text-gray-400">
              Manage your site settings, social links, and admin credentials
            </p>
          </div>

          {/* Company Info */}
          <ConfigSection
            title="Company Information"
            description="Update your company name, contact email, phone and address"
            icon={<IoBuildOutline className="size-5" />}
          >
            <CompanyInfoForm config={config} />
          </ConfigSection>

          {/* Social Links */}
          <ConfigSection
            title="Social Media Links"
            description="Add or update your social media profile URLs shown on the website"
            icon={<IoShareSocialOutline className="size-5" />}
          >
            <SocialLinksForm config={config} />
          </ConfigSection>

          {/* Admin Credentials */}
          <ConfigSection
            title="Admin Credentials"
            description="Change your admin login email and password"
            icon={<IoShieldCheckmarkOutline className="size-5" />}
          >
            <AdminCredentialsForm />
          </ConfigSection>
        </div>
      </div>
    </section>
  );
};

export default ConfigurationsPage;
