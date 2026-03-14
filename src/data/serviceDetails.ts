type ServiceDetail = {
  heading: string;
  shortDescription: string;
  fullDescription: string;
  outcomes: string[];
  homeHeading?: string;
  homeShortDescription?: string;
  overviewTitle?: string;
  overview?: string[];
  problemTitle?: string;
  problemIntro?: string;
  problems?: string[];
  approachTitle?: string;
  approachIntro?: string;
  approachPoints?: string[];
  deliverablesTitle?: string;
  deliverables?: string[];
  audienceTitle?: string;
  audience?: string[];
  outcomeTitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

const serviceContentByName = {
  "Brand Creation": {
    heading: "Brand Creation & Product Launch",
    shortDescription:
      "Build a brand people trust with clear positioning, messaging, and launch direction.",
    fullDescription:
      "At Puram Consultancy, we help businesses build brands from the inside out so identity, messaging, and positioning align with long-term business goals.",
    homeHeading: "Brand Creation and Product Launch",
    homeShortDescription:
      "For early-stage founders ready to enter the market with clarity and traction.",
    overviewTitle: "Build a Brand That People Trust - Not Just a Logo",
    overview: [
      "A brand is not a logo or a color palette.",
      "A brand is clarity - clarity in who you serve, what you solve, and why you exist.",
      "At Puram Consultancy, we help businesses build brands from the inside out, ensuring your identity, messaging, and positioning are aligned with your long-term business goals.",
    ],
    problemTitle: "The Problem We Solve",
    problemIntro: "Many businesses struggle because:",
    problems: [
      "Their brand message is unclear or inconsistent",
      "Customers don't immediately understand their value",
      "Products are launched without a clear positioning",
      "Branding decisions are based on trends, not strategy",
      "This leads to confusion, weak traction, and slow growth.",
    ],
    approachTitle: "Our Approach",
    approachIntro:
      "We treat brand creation as a strategic foundation, not a design exercise.",
    approachPoints: [
      "Deep understanding of your business vision",
      "Clear positioning in your market",
      "Messaging that resonates with the right audience",
      "A launch strategy that builds confidence and momentum",
      "We ensure your brand supports sales, growth, and scalability.",
    ],
    deliverablesTitle: "What We Deliver",
    deliverables: [
      "Brand positioning & differentiation",
      "Brand narrative & messaging framework",
      "Target audience clarity",
      "Brand tone & communication direction",
      "Product launch strategy & roadmap",
      "Visual identity execution can be supported or guided based on your team setup.",
    ],
    audienceTitle: "Who This Is For",
    audience: [
      "Startups building a brand from scratch",
      "Businesses launching a new product or service",
      "Companies rebranding for growth or clarity",
      "Founders struggling to explain their value clearly",
    ],
    outcomeTitle: "The Outcome",
    outcomes: [
      "Clear brand direction",
      "Stronger market confidence",
      "Easier sales conversations",
      "A brand built for long-term growth",
    ],
    ctaLabel: "Talk to a Brand Consultant",
    ctaHref: "/contact#booking-form",
  },
  "Business Systems": {
    heading: "Business Systems & Automation",
    shortDescription:
      "Build internal systems and automation that keep operations efficient, scalable, and founder-independent.",
    fullDescription:
      "Puram Consultancy helps businesses design internal systems and automation so operations remain efficient, scalable, and founder-independent.",
    homeHeading: "Business Systems and Automation",
    homeShortDescription:
      "Remove operational chaos and build repeatable execution infrastructure.",
    overviewTitle: "Build a Business That Runs on Systems - Not Stress",
    overview: [
      "Growth without systems creates chaos.",
      "Founders become bottlenecks. Teams get overwhelmed. Progress slows.",
      "Puram Consultancy helps businesses design internal systems and automation so operations remain efficient, scalable, and founder-independent.",
    ],
    problemTitle: "The Problem We Solve",
    problemIntro: "As businesses grow:",
    problems: [
      "Processes break",
      "Manual work increases",
      "Founders handle everything",
      "Teams lack clarity",
      "Without systems, growth becomes exhausting instead of empowering.",
    ],
    approachTitle: "Our Approach",
    approachIntro:
      "We design systems that support clarity, efficiency, and scale.",
    approachPoints: [
      "Understanding how work currently flows",
      "Identifying inefficiencies and bottlenecks",
      "Designing clear, repeatable processes",
      "Introducing automation where it creates real impact",
      "We don't over-complicate. We build practical systems that work.",
    ],
    deliverablesTitle: "What We Deliver",
    deliverables: [
      "Process mapping & optimization",
      "SOP (Standard Operating Procedure) frameworks",
      "Workflow & automation design",
      "Tool and integration recommendations",
      "Operational clarity documentation",
    ],
    audienceTitle: "Who This Is For",
    audience: [
      "SMEs experiencing operational chaos",
      "Founder-led businesses",
      "Growing teams needing structure",
      "Businesses preparing to scale",
    ],
    outcomeTitle: "The Outcome",
    outcomes: [
      "Reduced manual work",
      "Clear roles and responsibilities",
      "Better team performance",
      "A business that scales without burnout",
    ],
    ctaLabel: "Talk to a Systems Consultant",
    ctaHref: "/contact#booking-form",
  },
  "Market Strategy": {
    heading: "Market Research & Product Identification",
    shortDescription:
      "Identify real market opportunities through structured research, validation, and strategic analysis.",
    fullDescription:
      "Puram Consultancy helps businesses identify real market opportunities through structured research, validation, and strategic analysis.",
    homeHeading: "Market Research and Product Identification",
    homeShortDescription:
      "Validate demand before you commit major time and budget.",
    overviewTitle: "Build What the Market Actually Wants",
    overview: [
      "Many businesses fail not because of execution - but because they build the wrong product.",
      "Puram Consultancy helps businesses identify real market opportunities through structured research, validation, and strategic analysis.",
    ],
    problemTitle: "The Problem We Solve",
    problemIntro: "Businesses often:",
    problems: [
      "Assume demand without validation",
      "Build products based on intuition",
      "Enter crowded markets without differentiation",
      "Waste time and capital on unproven ideas",
    ],
    approachTitle: "Our Approach",
    approachIntro:
      "We replace assumptions with insight and evidence.",
    approachPoints: [
      "Understanding customer problems",
      "Analyzing market demand and competition",
      "Identifying opportunity gaps",
      "Validating product-market fit",
      "This ensures decisions are grounded in reality, not guesswork.",
    ],
    deliverablesTitle: "What We Deliver",
    deliverables: [
      "Market research & analysis",
      "Customer insight reports",
      "Competitive landscape analysis",
      "Opportunity identification",
      "Product recommendations & validation",
    ],
    audienceTitle: "Who This Is For",
    audience: [
      "Entrepreneurs exploring new ideas",
      "Businesses launching new offerings",
      "Companies entering new markets",
      "Founders seeking clarity before investment",
    ],
    outcomeTitle: "The Outcome",
    outcomes: [
      "Reduced risk",
      "Clear product direction",
      "Smarter investment decisions",
      "Higher chance of market success",
    ],
    ctaLabel: "Talk to a Strategy Consultant",
    ctaHref: "/contact#booking-form",
  },
  "Growth Strategy": {
    heading: "Digital Marketing & Growth Strategy",
    shortDescription:
      "Design structured growth systems that align marketing efforts with business objectives and measurable outcomes.",
    fullDescription:
      "Puram Consultancy designs structured growth systems that align marketing efforts with business objectives and measurable outcomes.",
    homeHeading: "Digital Marketing and Growth Strategy",
    homeShortDescription:
      "Build predictable acquisition systems with measurable ROI.",
    overviewTitle: "Growth Without Structure Is Just Noise",
    overview: [
      "Marketing without strategy leads to wasted spend and inconsistent results.",
      "Puram Consultancy designs structured growth systems that align marketing efforts with business objectives and measurable outcomes.",
    ],
    problemTitle: "The Problem We Solve",
    problemIntro: "Businesses struggle because:",
    problems: [
      "Marketing efforts are scattered",
      "There is no clear growth roadmap",
      "Performance isn't tracked properly",
      "Results are unpredictable",
    ],
    approachTitle: "Our Approach",
    approachIntro:
      "We treat growth as a system, not a campaign.",
    approachPoints: [
      "Understanding your growth stage",
      "Designing funnels and customer journeys",
      "Aligning content, paid media, and analytics",
      "Measuring what actually matters",
    ],
    deliverablesTitle: "What We Deliver",
    deliverables: [
      "Growth strategy & roadmap",
      "Funnel and journey design",
      "Digital marketing structure",
      "Performance measurement framework",
      "Optimization recommendations",
    ],
    audienceTitle: "Who This Is For",
    audience: [
      "Growth-stage businesses",
      "Online brands",
      "Service-based companies",
      "Businesses ready to scale marketing responsibly",
    ],
    outcomeTitle: "The Outcome",
    outcomes: [
      "Clear growth direction",
      "Better ROI on marketing spend",
      "Predictable results",
      "Data-driven decisions",
    ],
    ctaLabel: "Talk to a Growth Consultant",
    ctaHref: "/contact#booking-form",
  },
  "Scaling Consulting": {
    heading: "10X Scaling & Business Consulting",
    shortDescription:
      "Work with founders and leadership teams to remove bottlenecks, redesign operations, and scale sustainably.",
    fullDescription:
      "Puram Consultancy works with founders and leadership teams to remove bottlenecks, redesign operations, and scale sustainably.",
    homeHeading: "10X Scaling and Business Consulting",
    homeShortDescription:
      "Break revenue ceilings with structure, systems, and strategic leadership.",
    overviewTitle: "Scale with Clarity, Not Chaos",
    overview: [
      "Scaling is not about doing more - it's about doing the right things better.",
      "Puram Consultancy works with founders and leadership teams to remove bottlenecks, redesign operations, and scale sustainably.",
    ],
    problemTitle: "The Problem We Solve",
    problemIntro: "As businesses scale:",
    problems: [
      "Decision-making slows",
      "Founders stay involved in everything",
      "Operations don't keep up with growth",
      "Burnout increases",
    ],
    approachTitle: "Our Approach",
    approachIntro:
      "We take a founder-level, systems-driven approach to scaling.",
    approachPoints: [
      "Business diagnostics",
      "Identifying constraints and inefficiencies",
      "Redesigning structure and workflows",
      "Creating scalable growth roadmaps",
    ],
    deliverablesTitle: "What We Deliver",
    deliverables: [
      "Business diagnostics & analysis",
      "Scaling strategy & roadmap",
      "Systems and leadership consulting",
      "Operational restructuring guidance",
    ],
    audienceTitle: "Who This Is For",
    audience: [
      "Established SMEs",
      "Founder-led businesses",
      "Leadership teams preparing for growth",
      "Companies at a scaling crossroads",
    ],
    outcomeTitle: "The Outcome",
    outcomes: [
      "Stronger leadership clarity",
      "Scalable operations",
      "Sustainable growth",
      "A business built for the long term",
    ],
    ctaLabel: "Book a Strategy Call",
    ctaHref: "/contact#booking-form",
  },
} satisfies Record<string, ServiceDetail>;

const serviceSlugFromHref = (href: string) => {
  const lastSegment = href.split("/").filter(Boolean).pop();
  return lastSegment ?? "";
};

export { serviceContentByName, serviceSlugFromHref };
