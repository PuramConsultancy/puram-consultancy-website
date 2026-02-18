import { FiAward, FiBarChart2, FiLayers, FiUserCheck } from "react-icons/fi";

import ReusableCard from "./ReusableCard";

const items = [
  {
    title: "Systems Over Tactics",
    description:
      "We build sustainable frameworks that work long-term, not quick fixes that fade away.",
    icon: FiLayers,
  },
  {
    title: "Proven Frameworks",
    description:
      "Battle-tested strategies that have delivered results across multiple industries.",
    icon: FiAward,
  },
  {
    title: "Measurable Results",
    description:
      "Clear ROI tracking. Transparent reporting. Data-backed decisions.",
    icon: FiBarChart2,
  },
  {
    title: "Founder-Focused",
    description:
      "We understand scaling pressure - and we solve it at the root.",
    icon: FiUserCheck,
  },
];

const WhyPuramSection = () => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-(--color-primary) sm:text-4xl lg:text-5xl">
            Why Founders Choose Puram Consultancy
          </h2>
          <p className="mx-auto mt-4 max-w-4xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Systems over tactics. Proven frameworks. Measurable outcomes.
          </p>
        </div>

        <div className="mt-14 grid gap-7 sm:mt-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {items.map((item) => (
            <ReusableCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
              className="px-3 text-center"
              iconWrapClassName="mx-auto h-20 w-20 rounded-full border-8 border-orange-50 bg-[#f8ece3]"
              titleClassName="text-2xl leading-tight sm:text-3xl"
              descriptionClassName="mx-auto mt-4 max-w-md text-base sm:text-lg"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyPuramSection;
