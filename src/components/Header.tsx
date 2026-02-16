"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { navLinks } from "@/data/navLinks";
import { Button } from "./ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 shadow-sm backdrop-blur-3xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-20">
        {/* Left - Logo + Brand */}
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

        {/* Right - Navigation + CTA Buttons */}
        <div className="flex items-center gap-10">
          {/* Nav Links */}
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="group relative text-gray-800 transition-colors duration-300 hover:text-(--color-secondary)"
              >
                {link.name}
                {/* Center-origin underline animation */}
                <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-center scale-x-0 bg-(--color-secondary) transition-transform duration-300 group-hover:scale-x-100"></span>
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden items-center gap-3 md:flex">
            {/* Login - secondary */}
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer transition-colors duration-300 ease-in-out hover:bg-gray-100"
            >
              Login
            </Button>

            {/* Sign Up - primary CTA */}
            <Button
              variant="default"
              size="sm"
              className="cursor-pointer bg-(--color-secondary) text-white transition-colors duration-300 ease-in-out hover:bg-(--color-secondary-500)"
            >
              Sign Up
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation menu"
            className="flex h-10 w-10 items-center justify-center rounded-md text-(--color-primary) transition-colors duration-300 hover:bg-slate-100 md:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span className="sr-only">Menu</span>
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 bg-current transition-transform duration-300 ${
                  isMenuOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] h-0.5 w-5 bg-current transition-opacity duration-300 ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-0.5 w-5 bg-current transition-transform duration-300 ${
                  isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`overflow-hidden border-t border-slate-200/70 bg-white/95 backdrop-blur-md transition-[max-height] duration-300 md:hidden ${
          isMenuOpen ? "max-h-[36rem]" : "max-h-0 border-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="rounded-md px-2 py-2 text-sm font-medium text-gray-800 transition-colors duration-300 hover:bg-slate-100 hover:text-(--color-secondary)"
            >
              {link.name}
            </Link>
          ))}

          <div className="mt-2 flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 cursor-pointer transition-colors duration-300 ease-in-out hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Button>

            <Button
              variant="default"
              size="sm"
              className="flex-1 cursor-pointer bg-(--color-secondary) text-white transition-colors duration-300 ease-in-out hover:bg-(--color-secondary-500)"
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
