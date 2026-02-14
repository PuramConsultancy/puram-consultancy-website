import {
  DiscordIcon,
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  YouTubeIcon,
} from "@/components/footer/icons";
import type { LinkItem, SocialItem } from "@/data/footer/types";

export const serviceLinks: LinkItem[] = [
  { label: "Brand Creation", href: "/services/brand-creation" },
  { label: "Business Systems", href: "/services/business-systems" },
  { label: "Market Research", href: "/services/market-research" },
  { label: "Growth Strategy", href: "/services/growth-strategy" },
  { label: "Scaling Consulting", href: "/services/scaling-consulting" },
];

export const resourceLinks: LinkItem[] = [
  { label: "Blog", href: "/blog" },
  { label: "Insights", href: "/insights" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Free Growth Audit", href: "/free-growth-audit" },
];

export const legalLinks: LinkItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Cookie Policy", href: "/cookie-policy" },
];

export const socialLinks: SocialItem[] = [
  { label: "Facebook", href: "https://www.facebook.com", icon: FacebookIcon },
  { label: "YouTube", href: "https://www.youtube.com", icon: YouTubeIcon },
  { label: "Instagram", href: "https://www.instagram.com", icon: InstagramIcon },
  { label: "TikTok", href: "https://www.tiktok.com", icon: TikTokIcon },
  { label: "Discord", href: "https://discord.com", icon: DiscordIcon },
];
