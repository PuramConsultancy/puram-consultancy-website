import { redirect } from "next/navigation";

import { serviceLinks } from "@/data/serviceLinks";
import { serviceSlugFromHref } from "@/data/serviceDetails";

type ServiceSlugPageProps = {
  params: Promise<{ slug: string }>;
};

const ServiceSlugPage = async ({ params }: ServiceSlugPageProps) => {
  const { slug } = await params;

  const isKnownSlug = serviceLinks.some(
    (service) => serviceSlugFromHref(service.href) === slug,
  );

  if (!isKnownSlug) {
    redirect("/services");
  }

  redirect(`/services#${slug}`);
};

export default ServiceSlugPage;
