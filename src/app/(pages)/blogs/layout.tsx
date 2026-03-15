import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Blog — Business Insights & Growth Strategies",
  description:
    "Expert business insights, growth strategies, consulting tips, and industry updates from the Puram Consultancy team.",
  keywords: [
    "business blog",
    "business growth tips",
    "consulting insights",
    "business strategy articles",
    "growth strategies",
  ],
  alternates: {
    canonical: "https://www.puramconsultancy.com/blogs",
  },
  openGraph: {
    title: "Blog — Puram Consultancy",
    description:
      "Expert perspectives, industry insights, and updates from our team.",
    url: "https://www.puramconsultancy.com/blogs",
    images: [{ url: "/image.png", width: 1200, height: 630 }],
  },
};

export default function BlogsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}