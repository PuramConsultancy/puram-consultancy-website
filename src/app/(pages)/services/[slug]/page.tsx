import { redirect } from "next/navigation";

import { serviceLinks } from "@/data/serviceLinks";
import { serviceSlugFromHref } from "@/data/serviceDetails";

type ServiceSlugPageParams = {
  slug: string;
};

type ServiceSlugPageProps = {
  params: Promise<ServiceSlugPageParams>;
};

const isKnownServiceSlug = (slug: string) =>
  serviceLinks.some((service) => serviceSlugFromHref(service.href) === slug);

const ServiceSlugPage = async ({ params }: ServiceSlugPageProps) => {
  const { slug } = await params;

  if (!isKnownServiceSlug(slug)) {
    redirect("/services");
  }

  redirect(`/services#${slug}`);
};

export default ServiceSlugPage;
