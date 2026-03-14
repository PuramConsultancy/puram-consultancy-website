"use client";

import Button from "@/components/Button";
import { SidebarWrapper } from "@/components/sidebarWrapper";
import Image from "next/image";
import { useAuthActions } from "@/store/authStore";
import { useSidebar, useSidebarActions } from "@/store/sidebarStore";
import { CustomSlottedComponent } from "@/types/type-utils";
import { cn } from "@/utilities/cn";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ComponentProps, ReactNode } from "react";
import {
  IoChevronForward,
  IoLogOut,
  IoSettings,
  IoTrendingUpOutline,
  IoListOutline,
  IoCalendarOutline,
} from "react-icons/io5";
import { FaHome } from "react-icons/fa";

const Sidebar = () => {
  const router = useRouter();
  const { isSidebarExpanded } = useSidebar();
  const { setIsSidebarExpanded, setIsSidebarVisible } = useSidebarActions();
  const { logout } = useAuthActions();

  return (
    <SidebarWrapper className="md:-ml-1.5">
      <div className="relative flex h-full flex-1 flex-col overflow-visible">
        {/* sidebar expand button (for desktop) */}
        <AnimatePresence>
          {!isSidebarExpanded && (
            <motion.div
              initial={false}
              animate={{ filter: "blur(0px)", opacity: 1 }}
              exit={{ filter: "blur(10px)", opacity: 0 }}
              className="absolute top-[1.2rem] -right-3 z-9999 hidden md:block"
            >
              <Button
                onClick={() => setIsSidebarExpanded((pv) => !pv)}
                variant={"ghost"}
                noise={false}
                border={false}
                className="flex items-center justify-center rounded-xl bg-(--color-secondary) p-1.5 text-white shadow-md transition-all duration-200 hover:bg-(--color-secondary)/80 md:p-1.5"
              >
                <IoChevronForward className="size-3.5" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        {/* sidebar expand button (for desktop) */}

        <header className="sticky top-0 z-999 flex items-center justify-between overflow-x-hidden p-3 px-5 pt-3 pb-0">
          {/* logo */}
          <div className="flex items-center justify-start gap-3 lg:w-min">
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-xl bg-white p-1.5 shadow-md">
              <Image
                src="/image.png"
                alt="Puram Consultancy Logo"
                fill
                className="object-contain p-1"
                priority
              />
            </div>

            {isSidebarExpanded && (
              <h2 className="text-lg font-semibold tracking-wide whitespace-nowrap text-white">
                Puram
              </h2>
            )}
          </div>
          {/* logo */}

          {/* sidebar contract button (for desktop) */}
          <AnimatePresence>
            {isSidebarExpanded && (
              <motion.div
                initial={"visible"}
                animate={"visible"}
                exit={"hidden"}
                variants={{
                  visible: {
                    filter: "blur(0px)",
                    opacity: 1,
                  },
                  hidden: {
                    filter: "blur(10px)",
                    opacity: 0,
                  },
                }}
                className="hidden md:block"
              >
                <Button
                  onClick={() => setIsSidebarExpanded((pv) => !pv)}
                  variant={"ghost"}
                  noise={false}
                  border={false}
                  className={"flex p-0 md:p-0"}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-8 text-(--color-secondary)"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M3.172 4.172C2 5.343 2 7.229 2 11v2c0 3.771 0 5.657 1.172 6.828S6.229 21 10 21h4.25V3H10C6.229 3 4.343 3 3.172 4.172M15.75 3.006v17.988c2.636-.027 4.104-.191 5.078-1.166C22 18.657 22 16.771 22 13v-2c0-3.771 0-5.657-1.172-6.828-.974-.975-2.442-1.139-5.078-1.166"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
          {/* sidebar contract button (for desktop) */}

          {/* sidebar hide button (for mobile) */}
          <Button
            onClick={() => setIsSidebarVisible((pv) => !pv)}
            variant={"ghost"}
            noise={false}
            border={false}
            className={"flex p-0 md:hidden md:p-0"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-8 text-(--color-secondary)"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3.172 4.172C2 5.343 2 7.229 2 11v2c0 3.771 0 5.657 1.172 6.828S6.229 21 10 21h4.25V3H10C6.229 3 4.343 3 3.172 4.172M15.75 3.006v17.988c2.636-.027 4.104-.191 5.078-1.166C22 18.657 22 16.771 22 13v-2c0-3.771 0-5.657-1.172-6.828-.974-.975-2.442-1.139-5.078-1.166"
                clipRule="evenodd"
              />
            </svg>
          </Button>
          {/* sidebar hide button (for mobile) */}
        </header>

        <div className="scrollbar mt-10 w-full flex-1 overflow-x-hidden overflow-y-auto px-5">
          <div className="flex w-full flex-col space-y-0.5">
            <Title>Controls</Title>

            <NavLink
              href="/"
              Icon={() => (
                <div
                  className="rounded-xl p-2 text-white shadow-md transition-transform duration-200 hover:scale-110 hover:shadow-xl"
                  style={{ backgroundColor: "var(--color-secondary)" }}
                >
                  <FaHome className="h-5 w-5" />
                </div>
              )}
            >
              {() => <p>Home</p>}
            </NavLink>

            <NavLink
              href="/admin-dashboard"
              exact
              Icon={() => (
                <div
                  className="rounded-xl p-2 text-white shadow-md transition-transform duration-200 hover:scale-110 hover:shadow-xl"
                  style={{ backgroundColor: "var(--color-secondary)" }}
                >
                  <IoTrendingUpOutline className="h-5 w-5" />
                </div>
              )}
            >
              {() => <p>Dashboard</p>}
            </NavLink>

            <NavLink
              href="/admin-dashboard/submissions"
              Icon={() => (
                <div
                  className="rounded-xl p-2 text-white shadow-md transition-transform duration-200 hover:scale-110 hover:shadow-xl"
                  style={{ backgroundColor: "var(--color-secondary)" }}
                >
                  <IoListOutline className="h-5 w-5" />
                </div>
              )}
            >
              {() => <p>Submissions</p>}
            </NavLink>
            <NavLink
              href="/admin-dashboard/bookings"
              Icon={() => (
                <div
                  className="rounded-xl p-2 text-white shadow-md transition-transform duration-200 hover:scale-110 hover:shadow-xl"
                  style={{ backgroundColor: "var(--color-secondary)" }}
                >
                  <IoCalendarOutline className="h-5 w-5" />
                </div>
              )}
            >
              {() => <p>Bookings</p>}
            </NavLink>
          </div>
        </div>

        <div className="w-full space-y-0.5 px-5 pt-3">
          <Title>other</Title>

          <NavLink
            href={"/admin-dashboard/configurations"}
            Icon={() => (
              <div className="rounded-xl bg-(--color-secondary) p-2 text-white shadow-md">
                <IoSettings className="size-5" />
              </div>
            )}
          >
            {() => <p>Configurations</p>}
          </NavLink>
          <NavButton
            onClick={() => {
              logout();
              router.push("/login");
            }}
            Icon={() => (
              <div className="rounded-xl bg-(--color-secondary) p-2 text-white shadow-md">
                <IoLogOut className="size-5" />
              </div>
            )}
          >
            {() => <p>Logout</p>}
          </NavButton>
        </div>
      </div>
    </SidebarWrapper>
  );
};

interface INavlink extends Omit<ComponentProps<typeof Link>, "children"> {
  Icon?: CustomSlottedComponent<"div", { isActive: boolean }>;
  children: ({ isActive }: { isActive: boolean }) => ReactNode;
  disableActive?: boolean;
  exact?: boolean;
}
const NavLink = ({
  onClick,
  href,
  Icon,
  disableActive = false,
  exact = false,
  children,
}: INavlink) => {
  const { isSidebarExpanded } = useSidebar();
  const path = usePathname();
  const isActive = disableActive
    ? false
    : exact
      ? path === href.toString()
      : path.includes(href.toString());

  return (
    <Link
      onClick={onClick}
      href={href}
      className={cn(
        "-mx-3 flex shrink-0 cursor-pointer items-center justify-start rounded-xl p-3 py-2 text-sm font-medium whitespace-nowrap text-white transition-all duration-150",
        {
          "border-l-2 border-(--color-secondary) bg-(--color-secondary)/20":
            isActive,
        },
        { "hover:bg-white/10": !isActive },
        { "gap-2": isSidebarExpanded },
      )}
    >
      {Icon && <Icon isActive={isActive} />}

      {isSidebarExpanded && children({ isActive })}
    </Link>
  );
};

interface INavButton extends Omit<ComponentProps<"div">, "children"> {
  Icon?: CustomSlottedComponent<"div", { isActive: boolean }>;
  children: ({ isActive }: { isActive: boolean }) => ReactNode;
}
const NavButton = ({ onClick, Icon, children }: INavButton) => {
  const { isSidebarExpanded } = useSidebar();

  return (
    <div
      onClick={onClick}
      className={cn(
        "-mx-3 flex shrink-0 cursor-pointer items-center justify-start rounded-xl p-3 py-2 text-sm font-medium whitespace-nowrap text-white transition-all duration-150 hover:bg-white/10",
        { "gap-2": isSidebarExpanded },
      )}
    >
      {Icon && <Icon isActive={false} />}

      {isSidebarExpanded && children({ isActive: false })}
    </div>
  );
};

interface ITitle extends ComponentProps<"p"> {}
const Title = ({ className, children, ...rest }: ITitle) => {
  return (
    <p
      className={cn(
        "mb-2 truncate text-[0.65rem] font-semibold tracking-wider text-white/50 uppercase",
        className,
      )}
      {...rest}
    >
      {children}
    </p>
  );
};

export default Sidebar;
