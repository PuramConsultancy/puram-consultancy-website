import Link from "next/link";

import { contactLinks } from "@/data/contactLinks";
import { resourceLinks } from "@/data/resourceLinks";
import { serviceLinks } from "@/data/serviceLinks";
import { socialLinks } from "@/data/socialLinks";

import SiteLogo from "./SiteLogo";

type FooterColumnProps = {
  title: string;
  links: Array<{ name: string; href: string }>;
  itemClassName?: string;
};

const FooterColumn = ({ title, links, itemClassName }: FooterColumnProps) => {
  return (
    <div>
      <h3 className="mb-3 text-base font-semibold text-gray-300 sm:text-lg">
        {title}
      </h3>

      <ul className="flex flex-col gap-2 text-sm">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className={itemClassName ?? "transition-colors duration-300 hover:text-gray-300"}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const legalLinks: Array<{ href: string; label: string }> = [
  {
    href: "/privacy",
    label: "Privacy Policy",
  },
  {
    href: "/terms",
    label: "Terms of Service",
  },
];

const Footer = () => {
  return (
    <footer className="bg-(--color-primary) px-4 pt-12 text-white sm:px-6 lg:px-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 pb-10 lg:flex-row lg:justify-between lg:gap-12 lg:pb-12">
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

          <div className="mt-2 flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-300 hover:scale-110 hover:border-(--color-secondary) hover:bg-(--color-secondary)"
                >
                  <Icon className="text-md" />
                </Link>
              );
            })}
          </div>
        </div>

        <div className="grid flex-1 grid-cols-1 gap-8 text-gray-400 sm:grid-cols-2 lg:grid-cols-3">
          <FooterColumn title="Resources" links={resourceLinks} />
          <FooterColumn title="Services" links={serviceLinks} />
          <FooterColumn
            title="Connect"
            links={contactLinks}
            itemClassName="break-words transition-colors duration-300 hover:text-gray-300"
          />
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center text-sm text-gray-500 md:flex-row md:text-left">
          <p>
            Copyright {new Date().getFullYear()}{" "}
            <span className="font-medium text-(--color-primary-50)">
              Puram Consultancy
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
