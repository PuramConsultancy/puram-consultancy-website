// src/app/admin-dashboard/navLinks.ts
// ── Add these entries to your existing sidebar nav links array ──

import {
  IoGridOutline,
  IoDocumentTextOutline,
  IoListOutline,
  IoPeopleOutline,
  IoSettingsOutline,
} from "react-icons/io5";

export const adminNavLinks = [
  {
    label: "Dashboard",
    href: "/admin-dashboard",
    icon: IoGridOutline,
  },
  {
    label: "Forms",
    href: "/admin-dashboard/forms",
    icon: IoDocumentTextOutline,
    // Sub-links shown when route matches /admin-dashboard/forms
    children: [
      {
        label: "All Forms",
        href: "/admin-dashboard/forms",
        icon: IoDocumentTextOutline,
      },
      {
        label: "Submissions",
        href: "/admin-dashboard/forms/submissions",
        icon: IoListOutline,
        // Dynamic: links like /admin-dashboard/forms/[id]/submissions
        matchPattern: /\/admin-dashboard\/forms\/[^/]+\/submissions/,
      },
    ],
  },
  {
    label: "Users",
    href: "/admin-dashboard/users",
    icon: IoPeopleOutline,
  },
  {
    label: "Settings",
    href: "/admin-dashboard/settings",
    icon: IoSettingsOutline,
  },
];
