"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

import { navLinks } from "@/data/navLinks";

import SiteLogo from "./SiteLogo";
import { Button } from "./ui/button";

const desktopNavLinkClassName =
  "group relative text-gray-800 transition-colors duration-300 hover:text-(--color-secondary)";
const mobileNavLinkClassName =
  "rounded-md px-2 py-2 text-sm font-medium text-gray-800 transition-colors duration-300 hover:bg-slate-100 hover:text-(--color-secondary)";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-10 xl:px-14">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-xl transition-transform duration-300 hover:scale-110 focus-visible:scale-110 sm:h-12 sm:w-12">
            <Image
              src="/image.png"
              alt="Puram Consultancy Logo"
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="hidden leading-tight sm:block">
            <h1 className="text-2xl font-bold text-(--color-primary) lg:text-3xl">
              Puram
            </h1>
          </div>
        </Link>

        <div className="flex items-center gap-5 lg:gap-8">
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex lg:gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={desktopNavLinkClassName}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-center scale-x-0 bg-(--color-secondary) transition-transform duration-300 group-hover:scale-x-100"></span>
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer transition-colors duration-300 hover:bg-slate-100"
            >
              Login
            </Button>
            <Button
              variant="default"
              size="sm"
              className="cursor-pointer bg-(--color-secondary) text-white transition-colors duration-300 hover:bg-(--color-secondary-500)"
            >
              Sign Up
            </Button>
          </div>

          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            aria-label={
              isMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-(--color-primary) shadow-sm transition-colors duration-300 hover:bg-slate-100 md:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span className="sr-only">
              {isMenuOpen ? "Close menu" : "Open menu"}
            </span>
            {isMenuOpen ? (
              <FiX className="text-2xl" aria-hidden="true" />
            ) : (
              <FiMenu className="text-2xl" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`overflow-hidden border-t bg-white shadow-[0_14px_30px_rgba(2,51,65,0.08)] transition-[max-height,opacity,border-color] duration-300 ease-out md:hidden ${
          isMenuOpen
            ? "max-h-[34rem] border-slate-200/80 opacity-100"
            : "max-h-0 border-transparent opacity-0"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6 lg:px-10 xl:px-14">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={mobileNavLinkClassName}
            >
              {link.name}
            </Link>
          ))}

          <div className="mt-3 grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer border-slate-300 transition-colors duration-300 hover:bg-slate-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Button>
            <Button
              variant="default"
              size="sm"
              className="cursor-pointer bg-(--color-secondary) text-white transition-colors duration-300 hover:bg-(--color-secondary-500)"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Up
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
