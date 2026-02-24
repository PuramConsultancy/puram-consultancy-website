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
import { PageShell } from "@/components/ui/page-shell";

const HomePage = () => {
  return (
    <PageShell maxWidthClassName="max-w-[1720px]" className="gap-12 sm:gap-16 lg:gap-20">
      <HomeHeroSection />
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
    </PageShell>
  );
};

export default HomePage;
