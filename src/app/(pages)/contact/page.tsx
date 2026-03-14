import React from "react";
import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";
import { SurfaceCard } from "@/components/ui/surface-card";
import ContactForm from "./ContactForm";
import { getServerConfig } from "@/app/api-client/config/getServerConfig";
import {
  IoDocumentText,
  IoArrowForward,
  IoMail,
  IoCall,
  IoLocationOutline,
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoYoutube,
  IoLogoLinkedin,
} from "react-icons/io5";
import { SiTiktok } from "react-icons/si";
import { IconType } from "react-icons";

// ── Social icon map ───────────────────────────────────────────────────────────
interface SocialEntry {
  key: "facebook" | "instagram" | "youtube" | "linkedin" | "tiktok";
  Icon: IconType;
  label: string;
}

const SOCIAL_ICONS: SocialEntry[] = [
  { key: "facebook", Icon: IoLogoFacebook, label: "Facebook" },
  { key: "instagram", Icon: IoLogoInstagram, label: "Instagram" },
  { key: "youtube", Icon: IoLogoYoutube, label: "YouTube" },
  { key: "linkedin", Icon: IoLogoLinkedin, label: "LinkedIn" },
  { key: "tiktok", Icon: SiTiktok as IconType, label: "TikTok" },
];

// ── Contact page ──────────────────────────────────────────────────────────────
const ContactPage = async () => {
  const config = await getServerConfig();

  // Build contact links from admin config
  interface ContactItem {
    name: string;
    href: string;
    Icon: IconType;
  }

  const contactItems: ContactItem[] = [];

  if (config.email) {
    contactItems.push({
      name: config.email,
      href: `mailto:${config.email}`,
      Icon: IoMail,
    });
  }
  if (config.phone) {
    contactItems.push({
      name: config.phone,
      href: `tel:${config.phone.replace(/\s+/g, "")}`,
      Icon: IoCall,
    });
  }
  if (config.address) {
    contactItems.push({
      name: config.address,
      href: "#",
      Icon: IoLocationOutline,
    });
  }

  // Only show socials admin has filled in
  const activeSocials = SOCIAL_ICONS.filter(({ key }) => !!config[key]?.trim());

  return (
    <PageShell>
      {/* Hero */}
      <header className="rounded-3xl bg-[var(--color-primary)] p-6 text-[var(--color-primary-50)] sm:p-8 lg:p-10">
        <p className="text-xs font-semibold tracking-[0.18em] text-[var(--color-secondary-300)] uppercase">
          Contact
        </p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl lg:text-5xl">
          Let&apos;s Talk About Your Growth Goals
        </h1>
        <p className="mt-4 max-w-4xl text-base leading-relaxed text-[var(--color-primary-100)] sm:text-lg">
          Share your business stage and current bottlenecks. We will guide you
          with the right next steps.
        </p>
      </header>

      {/* Contact cards */}
      <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Reach Us Directly */}
        <SurfaceCard as="article" hoverable>
          <h2 className="text-2xl font-semibold text-[var(--color-primary)] sm:text-3xl">
            Reach Us Directly
          </h2>
          {contactItems.length > 0 ? (
            <ul className="mt-5 space-y-3">
              {contactItems.map((item) => {
                const ItemIcon = item.Icon;
                return (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="group flex items-center gap-3 text-sm text-slate-700 transition-colors duration-300 hover:text-[var(--color-secondary)] sm:text-base"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)]/20 text-[var(--color-primary)] transition-colors group-hover:bg-[var(--color-secondary)]/20 group-hover:text-[var(--color-secondary)]">
                        <ItemIcon className="h-4 w-4" />
                      </span>
                      {item.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="mt-5 text-sm text-slate-400">
              You can update these settings from the Configuration page in the
              Admin Panel.
            </p>
          )}
        </SurfaceCard>

        {/* Follow Us */}
        <SurfaceCard as="article" tone="muted" hoverable>
          <h2 className="text-2xl font-semibold text-[var(--color-primary)] sm:text-3xl">
            Follow Us
          </h2>
          {activeSocials.length > 0 ? (
            <div className="mt-5 flex flex-wrap gap-3">
              {activeSocials.map((social) => {
                const SocialIcon = social.Icon;
                return (
                  <a
                    key={social.key}
                    href={config[social.key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-300 px-4 text-sm font-medium text-[var(--color-primary)] transition-colors duration-300 hover:border-[var(--color-secondary)] hover:text-[var(--color-secondary)]"
                  >
                    <SocialIcon className="text-base" />
                    {social.label}
                  </a>
                );
              })}
            </div>
          ) : (
            <p className="mt-5 text-sm text-slate-400">
              You can update these social links from the Configuration page in
              the Admin Panel.
            </p>
          )}
        </SurfaceCard>
      </section>

      {/* Applications CTA banner */}
      <SurfaceCard as="section">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[var(--color-primary)]">
              Applications & Inquiries
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Browse and fill out our available forms for specific inquiries.
            </p>
          </div>
          <Link
            href="/contact/forms"
            className="flex shrink-0 items-center gap-2 rounded-xl bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[var(--color-primary)/90]"
          >
            <IoDocumentText className="h-4 w-4" />
            View Forms
            <IoArrowForward className="h-4 w-4" />
          </Link>
        </div>
      </SurfaceCard>

      {/* Booking form */}
      <SurfaceCard as="section" id="booking-form-section">
        <h2 className="text-2xl font-semibold text-[var(--color-primary)] sm:text-3xl">
          Booking Form
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
          Fill in the details below and our team will reach out for your booking
          inquiry.
        </p>
        <div className="mt-6">
          <ContactForm />
        </div>
      </SurfaceCard>
    </PageShell>
  );
};

export default ContactPage;
