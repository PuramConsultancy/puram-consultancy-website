import CaseStudySection from "@/components/home/CaseStudySection";
import ConsultationCtaSection from "@/components/home/ConsultationCtaSection";
import FounderCredibilitySection from "@/components/home/FounderCredibilitySection";
import FrameworkSection from "@/components/home/FrameworkSection";
import HomeHeroSection from "@/components/home/HomeHeroSection";
import PositioningSection from "@/components/home/PositioningSection";
import ProblemSection from "@/components/home/ProblemSection";
import ServicesSection from "@/components/home/ServicesSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import TrustedBySection from "@/components/home/TrustedBySection";
import WhyPuramSection from "@/components/home/WhyPuramSection";
import FormsSection from "@/components/home/Formssection";
import { useGetPublicForms } from "../api-client/forms/useGetPublicForms";
import HeroFormsSection from "@/components/home/HeroFormSection";

const HomePage = async () => {
  const forms = await useGetPublicForms();

  return (
    <section className="mx-auto flex w-full max-w-430 flex-col gap-12 py-6 sm:gap-16 sm:py-8 lg:gap-20 lg:py-10">
      <HeroFormsSection forms={forms} />
      <TrustedBySection />
      <ProblemSection />
      <PositioningSection />
      <FrameworkSection />
      <ServicesSection />
      <WhyPuramSection />
      <TestimonialSection />
      <CaseStudySection />
      <ConsultationCtaSection />
      <FounderCredibilitySection />
    </section>
  );
};

export default HomePage;
