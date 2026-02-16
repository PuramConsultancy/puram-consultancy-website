import Image from "next/image";
import Link from "next/link";

import { resourceLinks } from "@/data/resourceLinks";
import { serviceLinks } from "@/data/serviceLinks";
import { contactLinks } from "@/data/contactLinks";
import { socialLinks } from "@/data/socialLinks";

const Footer = () => {
  return (
    <footer className="bg-(--color-primary) px-4 pt-12 text-white sm:px-6 lg:px-20">
      {/* Top Footer Content */}
      <div className="mx-auto flex max-w-7xl flex-col gap-10 pb-10 lg:flex-row lg:justify-between lg:gap-12 lg:pb-12">
        {/* Left Side: Logo + Brand + Text + Social */}
        <div className="flex flex-1 flex-col gap-4 lg:max-w-md">
          {/* Logo + Brand */}
          <Link href="/" className="group flex items-center gap-4">
            <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-white transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/image.png"
                alt="Puram Consultancy Logo"
                fill
                className="object-contain p-2"
                priority
              />
            </div>

            <h2 className="text-2xl font-bold text-(--color-primary-50) sm:text-3xl">
              Puram
            </h2>
          </Link>

          {/* Description */}
          <p className="max-w-sm text-sm leading-relaxed text-gray-400 sm:max-w-md">
            We build the systems that build your business. Strategic consulting
            for the next generation of industry leaders.
          </p>

          {/* Social Media Icons */}
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

        {/* Right Side: Footer Columns */}
        <div className="grid flex-1 grid-cols-1 gap-8 text-gray-400 sm:grid-cols-2 lg:grid-cols-3">
          {/* Column 1: Resources */}
          <div>
            <h3 className="mb-3 text-base font-semibold text-gray-300 sm:text-lg">
              Resources
            </h3>

            <ul className="flex flex-col gap-2 text-sm">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="transition-colors duration-300 hover:text-gray-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="mb-3 text-base font-semibold text-gray-300 sm:text-lg">
              Services
            </h3>

            <ul className="flex flex-col gap-2 text-sm">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="transition-colors duration-300 hover:text-gray-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Connect */}
          <div>
            <h3 className="mb-3 text-base font-semibold text-gray-300 sm:text-lg">
              Connect
            </h3>

            <ul className="flex flex-col gap-3 text-sm">
              {contactLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="break-words transition-colors duration-300 hover:text-gray-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="border-t border-white/10 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center text-sm text-gray-500 md:flex-row md:text-left">
          {/* Copyright */}
          <p>
            Copyright {new Date().getFullYear()}{" "}
            <span className="font-medium text-(--color-primary-50)">
              Puram Consultancy
            </span>
            . All rights reserved.
          </p>

          {/* Extra Links (Optional) */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link
              href="/privacy"
              className="transition-colors duration-300 hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="transition-colors duration-300 hover:text-white"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
