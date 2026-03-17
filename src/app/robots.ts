import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin-dashboard/", "/api/", "/login", "/register","/about","/contact","/blogs","/projects","/process","/services"]
      },
    ],
    sitemap: "https://www.puramconsultancy.com/sitemap.xml",
  };
}
