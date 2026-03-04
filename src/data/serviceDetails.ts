const serviceContentByName = {
  "Brand Creation": {
    heading: "Brand Creation and Product Launch",
    shortDescription:
      "For early-stage founders ready to enter the market with clarity and traction.",
    fullDescription:
      "We help you define positioning, messaging, and launch strategy so your brand enters the market with confidence and commercial clarity. Instead of guessing what will resonate, we build a brand foundation tied to audience pain points, buying behavior, and real market demand.",
    outcomes: [
      "Clear positioning and value proposition",
      "Launch messaging and offer structure that converts",
      "Go-to-market roadmap for first-stage traction",
    ],
  },
  "Business Systems": {
    heading: "Business Systems and Automation",
    shortDescription:
      "Remove operational chaos and build repeatable execution infrastructure.",
    fullDescription:
      "When operations rely on founder memory and manual follow-ups, growth stalls. We design practical systems across CRM, automations, delivery workflows, and tracking dashboards so your team executes consistently without bottlenecks.",
    outcomes: [
      "Automated workflows across key business functions",
      "Reduced manual effort and fewer operational errors",
      "Performance visibility through structured reporting",
    ],
  },
  "Market Strategy": {
    heading: "Market Research and Product Identification",
    shortDescription:
      "Validate demand before you commit major time and budget.",
    fullDescription:
      "We run focused market research to identify profitable customer segments, competitive whitespace, and product-market fit signals. This helps you avoid expensive assumptions and choose growth opportunities with higher probability of success.",
    outcomes: [
      "Audience clarity and stronger market segmentation",
      "Opportunity mapping for high-potential niches",
      "Sharper offer-market alignment before scaling",
    ],
  },
  "Growth Strategy": {
    heading: "Digital Marketing and Growth Strategy",
    shortDescription:
      "Build predictable acquisition systems with measurable ROI.",
    fullDescription:
      "We architect full-funnel growth systems across paid, organic, and conversion pathways. The focus is not random campaign activity - it is consistent acquisition, better conversion economics, and clear attribution so decisions are driven by evidence.",
    outcomes: [
      "Channel strategy tied to CAC, LTV, and payback goals",
      "Funnel improvements for stronger conversion rates",
      "Data-driven optimization loops for sustainable growth",
    ],
  },
  "Scaling Consulting": {
    heading: "10X Scaling and Business Consulting",
    shortDescription:
      "Break revenue ceilings with structure, systems, and strategic leadership.",
    fullDescription:
      "Scaling is rarely limited by effort; it is limited by structure. We help growth-stage businesses redesign strategy, team cadence, execution priorities, and operating systems so expansion happens with control rather than chaos.",
    outcomes: [
      "Operational structure built for scale-stage complexity",
      "Faster decision cycles with clearer strategic priorities",
      "Sustainable growth model with stronger execution discipline",
    ],
  },
} as const;

const serviceSlugFromHref = (href: string) => {
  const lastSegment = href.split("/").filter(Boolean).pop();
  return lastSegment ?? "";
};

export { serviceContentByName, serviceSlugFromHref };
