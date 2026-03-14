import React from "react";
import Link from "next/link";
import { resourceLinks } from "@/data/resourceLinks";
import { serviceLinks } from "@/data/serviceLinks";
import SiteLogo from "./SiteLogo";
import { getServerConfig } from "@/app/api-client/config/getServerConfig";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoYoutube,
  IoLogoLinkedin,
  IoMail,
  IoCall,
  IoLocationOutline,
} from "react-icons/io5";
import { SiTiktok } from "react-icons/si";
import { IconType } from "react-icons";

// ── Types ─────────────────────────────────────────────────────────────────────

type FooterColumnProps = {
  title: string;
  links: Array<{ name: string; href: string }>;
  itemClassName?: string;
};

interface ContactLink {
  name: string;
  href: string;
  icon: IconType;
}

interface SocialEntry {
  key: "facebook" | "instagram" | "youtube" | "linkedin" | "tiktok";
  Icon: IconType;
  label: string;
}

// ── Footer column ─────────────────────────────────────────────────────────────

const FooterColumn = ({ title, links, itemClassName }: FooterColumnProps) => (
  <div>
    <h3 className="mb-3 text-base font-semibold text-gray-300 sm:text-lg">
      {title}
    </h3>
    <ul className="flex flex-col gap-2 text-sm">
      {links.map((link) => (
        <li key={link.name}>
          <Link
            href={link.href}
            className={
              itemClassName ??
              "transition-colors duration-300 hover:text-gray-300"
            }
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

// ── Social icons ──────────────────────────────────────────────────────────────

const SOCIAL_ICONS: SocialEntry[] = [
  { key: "facebook", Icon: IoLogoFacebook, label: "Facebook" },
  { key: "instagram", Icon: IoLogoInstagram, label: "Instagram" },
  { key: "youtube", Icon: IoLogoYoutube, label: "YouTube" },
  { key: "linkedin", Icon: IoLogoLinkedin, label: "LinkedIn" },
  { key: "tiktok", Icon: SiTiktok as IconType, label: "TikTok" },
];

// ── Legal links ───────────────────────────────────────────────────────────────

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

// ── Footer ────────────────────────────────────────────────────────────────────

const Footer = async () => {
  const config = await getServerConfig();

  // Build contact links — only include entries where admin has set a value
  const contactLinks: ContactLink[] = [];

  if (config.email) {
    contactLinks.push({
      name: config.email,
      href: `mailto:${config.email}`,
      icon: IoMail,
    });
  }
  if (config.phone) {
    contactLinks.push({
      name: config.phone,
      href: `tel:${config.phone.replace(/\s+/g, "")}`,
      icon: IoCall,
    });
  }
  if (config.address) {
    contactLinks.push({
      name: config.address,
      href: "#",
      icon: IoLocationOutline,
    });
  }

  // Only show socials admin has filled in
  const activeSocials = SOCIAL_ICONS.filter(({ key }) => !!config[key]?.trim());

  return (
    <footer className="bg-(--color-primary) px-4 pt-12 text-white sm:px-6 lg:px-10 xl:px-14">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 pb-10 lg:flex-row lg:justify-between lg:gap-12 lg:pb-12">
        {/* Brand column */}
        <div className="flex flex-1 flex-col gap-4 lg:max-w-md">
          <SiteLogo
            className="gap-4"
            logoWrapClassName="h-14 w-14 bg-white p-2"
            textClassName="text-(--color-primary-50) sm:text-3xl"
          />

          <p className="max-w-sm text-sm leading-relaxed text-gray-400 sm:max-w-md">
            We build the systems that build your business. Strategic consulting
            for the next generation of industry leaders.
          </p>

          {/* Dynamic social icons */}
          {activeSocials.length > 0 && (
            <div className="mt-2 flex items-center gap-3">
              {activeSocials.map((social) => {
                const SocialIcon = social.Icon;
                return (
                  <a
                    key={social.key}
                    href={config[social.key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-300 hover:scale-110 hover:border-(--color-secondary) hover:bg-(--color-secondary)"
                  >
                    <SocialIcon className="text-md" />
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* Links columns */}
        <div className="grid flex-1 grid-cols-1 gap-8 text-gray-400 sm:grid-cols-2 lg:grid-cols-3">
          <FooterColumn title="Resources" links={resourceLinks} />
          <FooterColumn title="Services" links={serviceLinks} />

          {/* Dynamic Connect column */}
          <div>
            <h3 className="mb-3 text-base font-semibold text-gray-300 sm:text-lg">
              Connect
            </h3>
            {contactLinks.length > 0 ? (
              <ul className="flex flex-col gap-3 text-sm">
                {contactLinks.map((contact) => {
                  const ContactIcon = contact.icon;
                  return (
                    <li key={contact.name}>
                      <a
                        href={contact.href}
                        className="group flex items-start gap-2.5 break-words text-gray-400 transition-colors duration-300 hover:text-gray-300"
                      >
                        <ContactIcon className="mt-0.5 size-3.5 shrink-0 text-gray-400 opacity-70 group-hover:opacity-100" />
                        <span>{contact.name}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-sm text-gray-600">
                No contact info added yet.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center text-sm text-gray-500 md:flex-row md:text-left">
          <p>
            Copyright {new Date().getFullYear()}{" "}
            <span className="font-medium text-(--color-primary-50)">
              {config.companyName || "Puram Consultancy"}
            </span>
            . All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition-colors duration-300 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
