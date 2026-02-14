"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

type HeaderNavLink = {
  label: string;
  href: string;
};

const headerLinks: HeaderNavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Process", href: "/process" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActiveRoute = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-200",
        isScrolled
          ? "border-[rgb(2_51_65_/_0.12)] bg-[rgb(255_255_255_/_0.95)] shadow-[0_8px_24px_rgba(2,51,65,0.08)] backdrop-blur supports-[backdrop-filter]:bg-[rgb(255_255_255_/_0.85)]"
          : "border-transparent bg-[rgb(255_255_255_/_0.9)]",
      )}
      style={{ fontFamily: '"Gill Sans MT", "Gill Sans", Calibri, Arial, sans-serif' }}
    >
      {/* Typography sample: AA BB CC DD EE FF GG HH II JJ KK LL MM NN OO PP QQ RR SS TT UU VV WW XX YY ZZ */}
      <div className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between md:hidden">
          <Link
            href="/"
            className="text-2xl font-semibold tracking-tight text-[var(--color-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)] focus-visible:ring-offset-2"
          >
            Puram
          </Link>

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[rgb(2_51_65_/_0.2)] text-[var(--color-primary)] transition-colors hover:bg-[rgb(2_51_65_/_0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)] focus-visible:ring-offset-2"
                aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-navigation"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {isMenuOpen ? (
                    <path d="M18 6L6 18M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="border-[rgb(2_51_65_/_0.16)] bg-white p-6"
              style={{ fontFamily: '"Gill Sans MT", "Gill Sans", Calibri, Arial, sans-serif' }}
            >
              <nav id="mobile-navigation" aria-label="Mobile Navigation" className="mt-8">
                <ul className="space-y-2">
                  {headerLinks.map((link) => {
                    const active = isActiveRoute(link.href);
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className={cn(
                            "block rounded-md px-3 py-2 text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)] focus-visible:ring-offset-2",
                            active
                              ? "bg-[var(--color-primary)] text-white"
                              : "text-[var(--color-primary)] hover:bg-[rgb(2_51_65_/_0.08)]",
                          )}
                          aria-current={active ? "page" : undefined}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="mt-8 flex items-center gap-3">
                <Link
                  href="/login"
                  className="inline-flex rounded-md px-4 py-2 text-sm font-semibold text-[var(--color-primary)] transition-colors hover:bg-[rgb(2_51_65_/_0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)] focus-visible:ring-offset-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex rounded-md bg-[var(--color-secondary)] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[var(--color-secondary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)] focus-visible:ring-offset-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden items-center gap-4 md:grid md:grid-cols-[1fr_auto_1fr]">
          <div className="justify-self-start">
            <Link
              href="/"
              className="text-3xl font-semibold tracking-tight text-[var(--color-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)] focus-visible:ring-offset-2"
            >
              Puram
            </Link>
          </div>

          <nav
            aria-label="Primary Navigation"
            className="justify-self-center rounded-full border border-[rgb(2_51_65_/_0.14)] bg-white px-3 py-1 shadow-[0_2px_10px_rgba(2,51,65,0.08)]"
          >
            <ul className="flex items-center gap-1">
              {headerLinks.map((link) => {
                const active = isActiveRoute(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "rounded-full px-4 py-2 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)] focus-visible:ring-offset-2",
                        active
                          ? "bg-[var(--color-primary)] text-white"
                          : "text-[var(--color-primary)] hover:bg-[rgb(2_51_65_/_0.08)]",
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center justify-self-end gap-3">
            <Link
              href="/login"
              className="rounded-md px-4 py-2 text-base font-semibold text-[var(--color-primary)] transition-colors hover:bg-[rgb(2_51_65_/_0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)] focus-visible:ring-offset-2"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="rounded-md bg-[var(--color-secondary)] px-5 py-2 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[var(--color-secondary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)] focus-visible:ring-offset-2"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

