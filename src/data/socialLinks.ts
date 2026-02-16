import { createElement, type SVGProps } from "react";

const FacebookIcon = (props: SVGProps<SVGSVGElement>) =>
  createElement(
    "svg",
    { viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", ...props },
    createElement("path", {
      d: "M13.5 21v-8.3h2.8l.4-3.2h-3.2V7.4c0-.9.3-1.5 1.6-1.5h1.7V3.1c-.8-.1-1.5-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3.2h2.6V21h2.9z",
    }),
  );

const InstagramIcon = (props: SVGProps<SVGSVGElement>) =>
  createElement(
    "svg",
    { viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", ...props },
    createElement("rect", {
      x: "3.5",
      y: "3.5",
      width: "17",
      height: "17",
      rx: "5",
      stroke: "currentColor",
      strokeWidth: "2",
    }),
    createElement("circle", {
      cx: "12",
      cy: "12",
      r: "4",
      stroke: "currentColor",
      strokeWidth: "2",
    }),
    createElement("circle", { cx: "17.2", cy: "6.8", r: "1.2", fill: "currentColor" }),
  );

const YoutubeIcon = (props: SVGProps<SVGSVGElement>) =>
  createElement(
    "svg",
    { viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", ...props },
    createElement("rect", {
      x: "3",
      y: "6",
      width: "18",
      height: "12",
      rx: "3",
      stroke: "currentColor",
      strokeWidth: "2",
    }),
    createElement("path", { d: "M10 9.5v5l5-2.5-5-2.5z", fill: "currentColor" }),
  );

const TiktokIcon = (props: SVGProps<SVGSVGElement>) =>
  createElement(
    "svg",
    { viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", ...props },
    createElement("path", {
      d: "M14 4v7.4a3.4 3.4 0 1 1-2.4-3.2V6.2a5.8 5.8 0 1 0 4.8 5.7V9.8c1 .7 2.2 1.2 3.6 1.2V8.6c-2 0-3.7-1.7-3.7-3.6H14z",
      fill: "currentColor",
    }),
  );

const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: FacebookIcon,
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: InstagramIcon,
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: YoutubeIcon,
  },
  {
    name: "TikTok",
    href: "https://tiktok.com",
    icon: TiktokIcon,
  },
];

export { socialLinks };
