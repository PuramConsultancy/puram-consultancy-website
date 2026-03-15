import prisma from "@/lib/prisma";
import { SiteConfig } from "./useGetConfig";

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

export async function getServerConfig(): Promise<SiteConfig> {
  try {
    const records = await prisma.siteConfig.findMany();
    const config = Object.fromEntries(records.map((r) => [r.key, r.value]));
    return { ...DEFAULT, ...config };
  } catch {
    return DEFAULT;
  }
}
