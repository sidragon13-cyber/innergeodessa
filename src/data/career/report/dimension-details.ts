import type {
  RiasecDimension,
} from "../types";

export type DimensionDetail = {
  motivations: string;
  workStyle: string;
  environment: string;
  strengths: string[];
  risks: string[];
  skills: string[];
  fields: string[];
  roles: string[];
};

export const DIMENSION_DETAILS: Record<RiasecDimension, DimensionDetail> = {
  R: {
    motivations:
      "Visible progress, practical problem-solving, direct contact with tools or physical systems, and results that can be inspected in the real world.",
    workStyle:
      "You may prefer learning by doing, testing ideas against physical reality, repairing or improving systems, and working with clear operational constraints.",
    environment:
      "Practical settings with tangible outputs, access to equipment or field activity, clear safety standards, and enough independence to solve concrete problems.",
    strengths: [
      "Turning abstract plans into workable physical outcomes",
      "Understanding tools, equipment, processes, and spatial relationships",
      "Remaining grounded when a problem requires direct action",
      "Learning through observation, practice, and technical feedback",
    ],
    risks: [
      "Dismissing communication or theory before understanding its practical value",
      "Becoming under-stimulated in work dominated by meetings and abstraction",
      "Focusing on immediate repair without investigating recurring system causes",
    ],
    skills: [
      "Technical literacy",
      "Safety and quality control",
      "Equipment or field methods",
      "Operational troubleshooting",
      "Project execution",
    ],
    fields: [
      "Engineering and technical operations",
      "Construction and infrastructure",
      "Environmental fieldwork",
      "Manufacturing and maintenance",
      "Agriculture and natural resources",
    ],
    roles: [
      "Engineering technician",
      "Field operations specialist",
      "Environmental field officer",
      "Construction project coordinator",
      "Technical service specialist",
      "Quality and maintenance planner",
    ],
  },

  I: {
    motivations:
      "Complex questions, evidence, data, independent investigation, intellectual challenge, and the opportunity to understand why a system behaves as it does.",
    workStyle:
      "You may naturally define a problem, gather evidence, compare explanations, identify patterns, and delay conclusions until the available information is strong enough.",
    environment:
      "Evidence-led organisations with access to information, protected concentration time, high standards of reasoning, and permission to question weak assumptions.",
    strengths: [
      "Breaking complex problems into testable questions",
      "Working carefully with data, evidence, and competing explanations",
      "Recognising patterns and structural causes",
      "Learning independently and building deep expertise",
    ],
    risks: [
      "Continuing analysis after enough information exists to act",
      "Under-communicating conclusions that feel obvious internally",
      "Preferring intellectually interesting questions over urgent practical needs",
    ],
    skills: [
      "Research design",
      "Data analysis",
      "Critical reasoning",
      "Scientific communication",
      "Modelling and problem definition",
    ],
    fields: [
      "Science and research",
      "Data and analytics",
      "Technology and systems",
      "Health and laboratory sciences",
      "Environmental and geospatial analysis",
    ],
    roles: [
      "Research analyst",
      "Data analyst",
      "Environmental scientist",
      "Geospatial analyst",
      "Business intelligence analyst",
      "Research and development specialist",
    ],
  },

  A: {
    motivations:
      "Original expression, imagination, design, storytelling, experimentation, and the freedom to find a distinctive way of communicating or creating value.",
    workStyle:
      "You may generate alternatives, connect ideas across domains, notice aesthetic or emotional qualities, and resist methods that remove all room for interpretation.",
    environment:
      "Flexible and idea-rich settings where originality is valued, unnecessary conformity is limited, and concepts can be tested through visible creative work.",
    strengths: [
      "Generating original concepts and alternative approaches",
      "Communicating through design, language, image, narrative, or experience",
      "Recognising meaning, tone, and aesthetic coherence",
      "Adapting when a problem has no single correct solution",
    ],
    risks: [
      "Losing momentum when execution becomes repetitive",
      "Rejecting useful structure because it feels restrictive",
      "Developing ideas without testing whether an audience needs them",
    ],
    skills: [
      "Design thinking",
      "Creative production",
      "Storytelling",
      "Visual communication",
      "Concept development",
    ],
    fields: [
      "Design and creative industries",
      "Media and communications",
      "Brand and content strategy",
      "Architecture and spatial design",
      "Digital product experience",
    ],
    roles: [
      "Brand strategist",
      "Content designer",
      "Creative producer",
      "UX or product designer",
      "Writer or editor",
      "Visual communication specialist",
    ],
  },

  S: {
    motivations:
      "Helping people develop, teaching, guiding, improving wellbeing, building trust, and seeing another person gain confidence or capability.",
    workStyle:
      "You may pay close attention to people’s needs, explain information patiently, build cooperation, and judge success partly through human development.",
    environment:
      "Collaborative and respectful settings where relationships matter, service has visible meaning, and emotional labour is recognised rather than treated as unlimited.",
    strengths: [
      "Building trust and psychological safety",
      "Explaining, teaching, coaching, and supporting development",
      "Understanding stakeholder needs and interpersonal dynamics",
      "Connecting individual concerns with wider group goals",
    ],
    risks: [
      "Taking responsibility for outcomes that belong to other people",
      "Avoiding necessary boundaries to preserve harmony",
      "Becoming depleted in roles with constant emotional demand",
    ],
    skills: [
      "Teaching and facilitation",
      "Stakeholder communication",
      "Coaching",
      "Conflict navigation",
      "Service design",
    ],
    fields: [
      "Education and training",
      "Health and community services",
      "Human resources",
      "Customer success",
      "Social development",
    ],
    roles: [
      "Learning and development specialist",
      "Teacher or trainer",
      "Customer success manager",
      "Community programme coordinator",
      "Human resources adviser",
      "Career development practitioner",
    ],
  },

  E: {
    motivations:
      "Influence, initiative, commercial opportunity, leadership, negotiation, decision-making, and converting an idea into coordinated action.",
    workStyle:
      "You may naturally set direction, mobilise people and resources, communicate a persuasive case, and make decisions under incomplete information.",
    environment:
      "Fast-moving settings with visible ownership, meaningful decision authority, measurable outcomes, commercial or strategic challenge, and room to initiate.",
    strengths: [
      "Turning opportunities into organised action",
      "Persuading, negotiating, and building stakeholder commitment",
      "Making decisions and taking responsibility for outcomes",
      "Connecting resources, people, and objectives",
    ],
    risks: [
      "Moving faster than evidence or implementation capacity allows",
      "Overvaluing visible influence and undervaluing quiet expertise",
      "Taking on too many initiatives because opportunity is energising",
    ],
    skills: [
      "Leadership",
      "Negotiation",
      "Commercial analysis",
      "Strategic communication",
      "Business development",
    ],
    fields: [
      "Business and entrepreneurship",
      "Management and leadership",
      "Sales and commercial strategy",
      "Consulting",
      "Public affairs and organisational development",
    ],
    roles: [
      "Business development manager",
      "Entrepreneur",
      "Management consultant",
      "Commercial strategist",
      "Product manager",
      "Partnerships manager",
    ],
  },

  C: {
    motivations:
      "Order, accuracy, reliable information, planning, well-designed procedures, and systems that allow work to be repeated consistently.",
    workStyle:
      "You may organise information, monitor details, establish procedures, identify inconsistencies, and create structures that reduce avoidable error.",
    environment:
      "Stable and accountable settings with clear standards, dependable information, defined responsibilities, and permission to improve inefficient processes.",
    strengths: [
      "Organising complex information accurately",
      "Building dependable procedures and controls",
      "Tracking commitments, records, and operational details",
      "Creating consistency across repeated work",
    ],
    risks: [
      "Maintaining a process after its original purpose has disappeared",
      "Becoming uncomfortable when experimentation requires temporary ambiguity",
      "Focusing on local accuracy while missing a changing strategic context",
    ],
    skills: [
      "Process design",
      "Financial and administrative literacy",
      "Quality assurance",
      "Project coordination",
      "Information management",
    ],
    fields: [
      "Finance and accounting",
      "Operations and administration",
      "Compliance and governance",
      "Project management",
      "Information and records management",
    ],
    roles: [
      "Operations analyst",
      "Project coordinator",
      "Compliance specialist",
      "Financial analyst",
      "Quality assurance specialist",
      "Business process analyst",
    ],
  },
};
