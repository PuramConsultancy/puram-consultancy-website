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

const HomePage = () => {
  return (
    <section className="mx-auto flex w-full max-w-[1720px] flex-col gap-12 py-6 sm:gap-16 sm:py-8 lg:gap-20 lg:py-10">
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
    </section>
  );
};

export default HomePage;
