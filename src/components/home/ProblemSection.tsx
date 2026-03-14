import { SurfaceCard } from "@/components/ui/surface-card";
import {
  IoTrendingDownOutline,
  IoBarChartOutline,
  IoPersonOutline,
  IoGridOutline,
  IoTimeOutline,
  IoMapOutline,
} from "react-icons/io5";

const problems = [
  {
    icon: IoTrendingDownOutline,
    title: "Unpredictable revenue",
    description: "Month-to-month swings with no clear lever to pull.",
    tone: "danger",
  },
  {
    icon: IoBarChartOutline,
    title: "Marketing spend with no ROI",
    description: "Cash going out, clarity not coming in.",
    tone: "warning",
  },
  {
    icon: IoPersonOutline,
    title: "Founder as the bottleneck",
    description: "Every decision waits on you. Growth stalls.",
    tone: "warning",
  },
  {
    icon: IoGridOutline,
    title: "Teams stuck in manual work",
    description: "Hours spent on tasks that should take minutes.",
    tone: "danger",
  },
  {
    icon: IoTimeOutline,
    title: "Launches that underperform",
    description: "Effort invested, results disappointing.",
    tone: "danger",
  },
  {
    icon: IoMapOutline,
    title: "No clear growth strategy",
    description: "Busy doing things, but not the right things.",
    tone: "danger",
  },
] as const;

const toneClasses = {
  danger: "bg-rose-50 text-rose-500",
  warning: "bg-amber-50 text-amber-500",
};

const ProblemSection = () => {
  return (
    <SurfaceCard padding="roomy">
      <div className="mx-auto max-w-5xl">
        {/* Label */}
        <p className="text-xs font-semibold tracking-[0.15em] text-(--color-secondary) uppercase">
          The real problem
        </p>

        {/* Heading */}
        <h2 className="mt-3 text-3xl font-semibold text-(--color-primary) sm:text-4xl lg:text-5xl">
          Scaling shouldn&apos;t feel this hard
        </h2>

        {/* Subtext */}
        <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-500 sm:text-lg">
          Most businesses don&apos;t have a marketing problem. They have a{" "}
          <em>systems</em> problem — and tactics won&apos;t fix it.
        </p>

        {/* Problem cards grid */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map(({ icon: Icon, title, description, tone }) => (
            <div
              key={title}
              className="rounded-2xl border border-gray-100 bg-gray-50 p-5 transition-shadow hover:shadow-sm"
            >
              <div
                className={`flex size-8 items-center justify-center rounded-xl ${toneClasses[tone]}`}
              >
                <Icon className="size-4" />
              </div>
              <p className="mt-3 text-sm font-semibold text-(--color-primary)">
                {title}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-500">
                {description}
              </p>
            </div>
          ))}
        </div>

        {/* Conclusion callout */}
        <div className="mt-8 border-l-2 border-gray-200 pl-5">
          <p className="text-base font-semibold text-(--color-primary)">
            Sound familiar?
          </p>
          <p className="mt-1 text-sm leading-relaxed text-slate-500 sm:text-base">
            These aren&apos;t isolated issues — they&apos;re symptoms of a
            broken system. We fix the system, and the symptoms disappear.
          </p>
        </div>
      </div>
    </SurfaceCard>
  );
};

export default ProblemSection;
