import { serviceLinks } from "./serviceLinks";

type ServiceDetailSection = {
  title: string;
  description?: string;
  items?: string[];
  note?: string;
  tone?: "default" | "accent";
};

type ServiceDetailPageContent = {
  heroEyebrow: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroSummary: string;
  heroHighlights?: string[];
  sections?: ServiceDetailSection[];
  cta?: {
    title: string;
    description: string;
    label: string;
    href: string;
  };
};

type ServiceContent = {
  heading: string;
  shortDescription: string;
  fullDescription: string;
  outcomes: string[];
  detailPage?: ServiceDetailPageContent;
};

const serviceContentByName = {
  "Brand Creation": {
    heading: "Brand Creation and Product Launch",
    shortDescription:
      "Build a brand people trust with positioning, messaging, and launch clarity from day one.",
    fullDescription:
      "We help businesses build brands from the inside out, aligning identity, messaging, and market positioning with long-term business goals so every launch starts with clarity instead of guesswork.",
    outcomes: [
      "Clear brand direction rooted in strategy",
      "Stronger market confidence and positioning",
      "Easier sales conversations with aligned messaging",
    ],
    detailPage: {
      heroEyebrow: "Brand Creation and Product Launch",
      heroTitle: "Build a Brand That People Trust, Not Just a Logo",
      heroSubtitle:
        "A brand is not a logo or a color palette. A brand is clarity in who you serve, what you solve, and why you exist.",
      heroSummary:
        "Puram Consultancy helps businesses build brands from the inside out so identity, messaging, and positioning all support long-term business growth.",
      heroHighlights: [
        "Brand positioning and differentiation",
        "Messaging that resonates with the right audience",
        "Launch strategy built for momentum",
      ],
      sections: [
        {
          title: "Overview",
          description:
            "Strong brands remove confusion before they try to attract attention. We build the strategic foundation that helps customers understand your value quickly and trust what you are offering.",
        },
        {
          title: "The Problem We Solve",
          description:
            "Many businesses struggle to gain traction because the market does not clearly understand what they do or why it matters.",
          items: [
            "Their brand message is unclear or inconsistent",
            "Customers do not immediately understand their value",
            "Products are launched without clear positioning",
            "Branding decisions are based on trends instead of strategy",
          ],
          note: "That usually leads to confusion, weak traction, and slower growth.",
          tone: "accent",
        },
        {
          title: "Our Approach",
          description:
            "We treat brand creation as a strategic foundation, not a design exercise. The work is built to support sales, growth, and scalability.",
          items: [
            "Deep understanding of your business vision",
            "Clear positioning in your market",
            "Messaging that resonates with the right audience",
            "A launch strategy that builds confidence and momentum",
          ],
        },
        {
          title: "What We Deliver",
          items: [
            "Brand positioning and differentiation",
            "Brand narrative and messaging framework",
            "Target audience clarity",
            "Brand tone and communication direction",
            "Product launch strategy and roadmap",
          ],
          note:
            "Visual identity execution can also be guided or supported based on your team setup.",
        },
        {
          title: "Who This Is For",
          items: [
            "Startups building a brand from scratch",
            "Businesses launching a new product or service",
            "Companies rebranding for growth or clarity",
            "Founders struggling to explain their value clearly",
          ],
        },
        {
          title: "The Outcome",
          items: [
            "Clear brand direction",
            "Stronger market confidence",
            "Easier sales conversations",
            "A brand built for long-term growth",
          ],
        },
      ],
      cta: {
        title: "Ready to shape the brand before you launch the marketing?",
        description:
          "Talk through your offer, positioning, and launch roadmap with a consultant who can turn the brand into a real growth asset.",
        label: "Talk to a Brand Consultant",
        href: "/contact#booking-form",
      },
    },
  },
  "Business Systems": {
    heading: "Business Systems and Automation",
    shortDescription:
      "Build a business that runs on systems, not stress, with practical operational clarity and automation.",
    fullDescription:
      "Puram Consultancy helps businesses design internal systems and automation so operations stay efficient, scalable, and less dependent on the founder as the business grows.",
    outcomes: [
      "Reduced manual work across core operations",
      "Clearer roles, responsibilities, and workflows",
      "A business that scales without burnout",
    ],
    detailPage: {
      heroEyebrow: "Business Systems and Automation",
      heroTitle: "Build a Business That Runs on Systems, Not Stress",
      heroSubtitle:
        "Growth without systems creates chaos. Founders become bottlenecks, teams get overwhelmed, and progress slows.",
      heroSummary:
        "Puram Consultancy helps businesses design internal systems and automation so operations remain efficient, scalable, and founder-independent.",
      heroHighlights: [
        "Process mapping and optimization",
        "Workflow and automation design",
        "Operational clarity built for scale",
      ],
      sections: [
        {
          title: "Overview",
          description:
            "As businesses grow, informal ways of working stop being enough. We build the operating structure that keeps execution clear, efficient, and sustainable as complexity increases.",
        },
        {
          title: "The Problem We Solve",
          description:
            "Without strong internal systems, growth adds stress faster than it adds leverage.",
          items: [
            "Processes break",
            "Manual work increases",
            "Founders handle everything",
            "Teams lack clarity",
          ],
          note:
            "Without systems, growth becomes exhausting instead of empowering.",
          tone: "accent",
        },
        {
          title: "Our Approach",
          description:
            "We design systems that support clarity, efficiency, and scale. The goal is practical execution, not unnecessary complexity.",
          items: [
            "Understanding how work currently flows",
            "Identifying inefficiencies and bottlenecks",
            "Designing clear, repeatable processes",
            "Introducing automation where it creates real impact",
          ],
          note: "We do not over-complicate. We build practical systems that work.",
        },
        {
          title: "What We Deliver",
          items: [
            "Process mapping and optimization",
            "SOP (Standard Operating Procedure) frameworks",
            "Workflow and automation design",
            "Tool and integration recommendations",
            "Operational clarity documentation",
          ],
        },
        {
          title: "Who This Is For",
          items: [
            "SMEs experiencing operational chaos",
            "Founder-led businesses",
            "Growing teams needing structure",
            "Businesses preparing to scale",
          ],
        },
        {
          title: "The Outcome",
          items: [
            "Reduced manual work",
            "Clear roles and responsibilities",
            "Better team performance",
            "A business that scales without burnout",
          ],
        },
      ],
      cta: {
        title: "Need systems that remove operational pressure before you scale further?",
        description:
          "Talk through your current bottlenecks, team workflows, and automation opportunities with a consultant focused on practical execution.",
        label: "Talk to a Systems Consultant",
        href: "/contact#booking-form",
      },
    },
  },
  "Market Strategy": {
    heading: "Market Research and Product Identification",
    shortDescription:
      "Build what the market actually wants through research, validation, and clear opportunity analysis.",
    fullDescription:
      "Puram Consultancy helps businesses identify real market opportunities through structured research, validation, and strategic analysis before major time and capital are committed.",
    outcomes: [
      "Reduced risk before product investment",
      "Clearer product direction backed by evidence",
      "Smarter decisions with a higher chance of market success",
    ],
    detailPage: {
      heroEyebrow: "Market Research and Product Identification",
      heroTitle: "Build What the Market Actually Wants",
      heroSubtitle:
        "Many businesses fail not because of execution, but because they build the wrong product.",
      heroSummary:
        "Puram Consultancy helps businesses identify real market opportunities through structured research, validation, and strategic analysis.",
      heroHighlights: [
        "Market research and analysis",
        "Opportunity gap identification",
        "Product recommendations and validation",
      ],
      sections: [
        {
          title: "Overview",
          description:
            "Better execution cannot rescue weak market demand. We help you make product and market decisions based on evidence, so you build toward genuine opportunity instead of assumptions.",
        },
        {
          title: "The Problem We Solve",
          description:
            "Businesses often lose time and capital because they move too quickly on ideas that have not been properly tested.",
          items: [
            "Assume demand without validation",
            "Build products based on intuition",
            "Enter crowded markets without differentiation",
            "Waste time and capital on unproven ideas",
          ],
          tone: "accent",
        },
        {
          title: "Our Approach",
          description:
            "We replace assumptions with insight and evidence. Every step is designed to reduce guesswork and improve strategic confidence.",
          items: [
            "Understanding customer problems",
            "Analyzing market demand and competition",
            "Identifying opportunity gaps",
            "Validating product-market fit",
          ],
          note:
            "This ensures decisions are grounded in reality, not guesswork.",
        },
        {
          title: "What We Deliver",
          items: [
            "Market research and analysis",
            "Customer insight reports",
            "Competitive landscape analysis",
            "Opportunity identification",
            "Product recommendations and validation",
          ],
        },
        {
          title: "Who This Is For",
          items: [
            "Entrepreneurs exploring new ideas",
            "Businesses launching new offerings",
            "Companies entering new markets",
            "Founders seeking clarity before investment",
          ],
        },
        {
          title: "The Outcome",
          items: [
            "Reduced risk",
            "Clear product direction",
            "Smarter investment decisions",
            "Higher chance of market success",
          ],
        },
      ],
      cta: {
        title: "Need clearer evidence before you commit time, budget, or team focus?",
        description:
          "Talk through your idea, market assumptions, and validation gaps with a consultant who can help you assess real opportunity.",
        label: "Talk to a Strategy Consultant",
        href: "/contact#booking-form",
      },
    },
  },
  "Growth Strategy": {
    heading: "Digital Marketing and Growth Strategy",
    shortDescription:
      "Replace scattered marketing with a structured growth system tied to measurable business outcomes.",
    fullDescription:
      "Puram Consultancy designs structured growth systems that align marketing efforts with business objectives and measurable outcomes instead of relying on disconnected campaigns.",
    outcomes: [
      "Clear growth direction across marketing efforts",
      "Better ROI on marketing spend",
      "More predictable, data-driven results",
    ],
    detailPage: {
      heroEyebrow: "Digital Marketing and Growth Strategy",
      heroTitle: "Growth Without Structure Is Just Noise",
      heroSubtitle:
        "Marketing without strategy leads to wasted spend and inconsistent results.",
      heroSummary:
        "Puram Consultancy designs structured growth systems that align marketing efforts with business objectives and measurable outcomes.",
      heroHighlights: [
        "Growth strategy and roadmap",
        "Funnels and customer journey design",
        "Performance measurement and optimization",
      ],
      sections: [
        {
          title: "Overview",
          description:
            "Growth improves when acquisition, conversion, and measurement all work together. We build structured marketing systems that support scale instead of creating more noise.",
        },
        {
          title: "The Problem We Solve",
          description:
            "Many businesses spend on marketing activity without a coherent system behind it, which makes outcomes inconsistent and hard to improve.",
          items: [
            "Marketing efforts are scattered",
            "There is no clear growth roadmap",
            "Performance is not tracked properly",
            "Results are unpredictable",
          ],
          tone: "accent",
        },
        {
          title: "Our Approach",
          description:
            "We treat growth as a system, not a campaign. The focus is on building an integrated path from attention to conversion to measurement.",
          items: [
            "Understanding your growth stage",
            "Designing funnels and customer journeys",
            "Aligning content, paid media, and analytics",
            "Measuring what actually matters",
          ],
        },
        {
          title: "What We Deliver",
          items: [
            "Growth strategy and roadmap",
            "Funnel and journey design",
            "Digital marketing structure",
            "Performance measurement framework",
            "Optimization recommendations",
          ],
        },
        {
          title: "Who This Is For",
          items: [
            "Growth-stage businesses",
            "Online brands",
            "Service-based companies",
            "Businesses ready to scale marketing responsibly",
          ],
        },
        {
          title: "The Outcome",
          items: [
            "Clear growth direction",
            "Better ROI on marketing spend",
            "Predictable results",
            "Data-driven decisions",
          ],
        },
      ],
      cta: {
        title: "Need a marketing system that is easier to manage and easier to measure?",
        description:
          "Talk through your current growth stage, funnel gaps, and performance issues with a consultant focused on structured scaling.",
        label: "Talk to a Growth Consultant",
        href: "/contact#booking-form",
      },
    },
  },
  "Scaling Consulting": {
    heading: "10X Scaling and Business Consulting",
    shortDescription:
      "Scale with clarity, not chaos, by removing bottlenecks and building the structure sustainable growth needs.",
    fullDescription:
      "Puram Consultancy works with founders and leadership teams to remove bottlenecks, redesign operations, and scale sustainably with stronger structure and clarity.",
    outcomes: [
      "Stronger leadership clarity during scale",
      "Scalable operations that support growth",
      "A business built for sustainable long-term expansion",
    ],
    detailPage: {
      heroEyebrow: "10X Scaling and Business Consulting",
      heroTitle: "Scale with Clarity, Not Chaos",
      heroSubtitle:
        "Scaling is not about doing more, it is about doing the right things better.",
      heroSummary:
        "Puram Consultancy works with founders and leadership teams to remove bottlenecks, redesign operations, and scale sustainably.",
      heroHighlights: [
        "Business diagnostics and analysis",
        "Scaling strategy and roadmap",
        "Systems and leadership consulting",
      ],
      sections: [
        {
          title: "Overview",
          description:
            "Scaling exposes structural weaknesses quickly. We help leadership teams strengthen the operating model behind growth so the business can expand with control instead of constant firefighting.",
        },
        {
          title: "The Problem We Solve",
          description:
            "As businesses scale, the same habits that once created momentum often start creating drag.",
          items: [
            "Decision-making slows",
            "Founders stay involved in everything",
            "Operations do not keep up with growth",
            "Burnout increases",
          ],
          tone: "accent",
        },
        {
          title: "Our Approach",
          description:
            "We take a founder-level, systems-driven approach to scaling. The work is designed to reveal what is constraining growth and what must change for the next stage.",
          items: [
            "Business diagnostics",
            "Identifying constraints and inefficiencies",
            "Redesigning structure and workflows",
            "Creating scalable growth roadmaps",
          ],
        },
        {
          title: "What We Deliver",
          items: [
            "Business diagnostics and analysis",
            "Scaling strategy and roadmap",
            "Systems and leadership consulting",
            "Operational restructuring guidance",
          ],
        },
        {
          title: "Who This Is For",
          items: [
            "Established SMEs",
            "Founder-led businesses",
            "Leadership teams preparing for growth",
            "Companies at a scaling crossroads",
          ],
        },
        {
          title: "The Outcome",
          items: [
            "Stronger leadership clarity",
            "Scalable operations",
            "Sustainable growth",
            "A business built for the long term",
          ],
        },
      ],
      cta: {
        title: "Need a clearer path through the next stage of growth?",
        description:
          "Book a strategy conversation to identify your scaling constraints, leadership gaps, and operational priorities before growth becomes harder to control.",
        label: "Book a Strategy Call",
        href: "/contact#booking-form",
      },
    },
  },
} as const satisfies Record<string, ServiceContent>;

const serviceSlugFromHref = (href: string) => {
  const lastSegment = href.split("/").filter(Boolean).pop();
  return lastSegment ?? "";
};

const getServiceContentBySlug = (slug: string) =>
  (() => {
    const matchedService = serviceLinks.find(
      (service) => serviceSlugFromHref(service.href) === slug,
    );

    if (!matchedService) {
      return null;
    }

    return (
      serviceContentByName[
        matchedService.name as keyof typeof serviceContentByName
      ] ?? null
    );
  })();

export {
  getServiceContentBySlug,
  serviceContentByName,
  serviceSlugFromHref,
  type ServiceContent,
  type ServiceDetailPageContent,
  type ServiceDetailSection,
};
