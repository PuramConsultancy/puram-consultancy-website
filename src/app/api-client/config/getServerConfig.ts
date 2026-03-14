import { SiteConfig } from "./useGetConfig";

export async function getServerConfig(): Promise<SiteConfig> {
  const DEFAULT: SiteConfig = {
    companyName: "Puram Consultancy",
    email: "",
    phone: "",
    address: "",
    facebook: "",
    instagram: "",
    tiktok: "",
    youtube: "",
    linkedin: "",
  };

  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/config`, {
      cache: "no-store", // ← always fresh, no 60s cache delay
    });

    if (!res.ok) return DEFAULT;

    const data = await res.json();
    return { ...DEFAULT, ...data.data };
  } catch {
    return DEFAULT;
  }
}
