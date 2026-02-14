import Link from "next/link";
import Image from "next/image";
import { navLinks } from "@/data/navLinks";
import { Button } from "./ui/button";

const DHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 shadow-sm backdrop-blur-3xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-20">
        {/* Left - Logo + Brand */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-xl transition-transform duration-300 hover:scale-110 focus-visible:scale-110">
            <Image
              src="/image.png"
              alt="Puram Consultancy Logo"
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="hidden leading-tight sm:block">
            <h1 className="text-3xl font-bold text-(--color-primary)">Puram</h1>
          </div>
        </Link>

        {/* Right - Navigation + CTA Buttons */}
        <div className="flex items-center gap-10">
          {/* Nav Links */}
          <nav className="hidden space-x-8 text-base font-medium md:flex lg:text-sm">
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
          <div className="md:hidden">
            {/* Add your mobile menu / hamburger component here */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DHeader;
