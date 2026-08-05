import {
  getRiasecDimensionProfile,
} from "./dimensions";
import type { RiasecResultContract } from "./result-contract";
import {
  DIMENSION_DETAILS,
} from "./report/dimension-details";
import {
  formatList,
  joinNatural,
  profileLabel,
  unique,
} from "./report/helpers";

export type CareerReportBlockType =
  | "summary"
  | "analysis"
  | "strength"
  | "risk"
  | "guidance"
  | "action";

export interface CareerReportBlock {
  id: string;
  type: CareerReportBlockType;
  title: string;
  content: string;
}

export interface CareerReportSection {
  id: string;
  order: number;
  title: string;
  description: string;
  blocks: CareerReportBlock[];
}


export function generateCareerReportSections(
  result: RiasecResultContract,
): CareerReportSection[] {
  const [primary, secondary, tertiary, fourth] = result.ranking;

  if (!primary || !secondary || !tertiary || !fourth) {
    throw new Error("RIASEC report requires a complete six-dimension ranking.");
  }

  const topThree = [primary, secondary, tertiary];
  const topProfiles = topThree.map(getRiasecDimensionProfile);
  const topDetails = topThree.map(
    (dimension) => DIMENSION_DETAILS[dimension],
  );

  const scoreGap =
    result.percentages[primary] - result.percentages[secondary];
  const thirdGap =
    result.percentages[tertiary] - result.percentages[fourth];

  const differentiation =
    scoreGap >= 20
      ? "Your first dimension is clearly differentiated from the second. It is likely to be an important and recurring source of career motivation."
      : scoreGap >= 10
        ? "Your first dimension leads by a meaningful but not absolute margin. Your career fit is likely to depend on combining the first two dimensions."
        : "Your first two dimensions are closely grouped. Treat the result as a blended pattern rather than assuming one interest must dominate every decision.";

  const breadth =
    thirdGap <= 5
      ? "The third and fourth dimensions are close. Your three-letter code is useful, but the fourth dimension may also influence role fit and should not be ignored."
      : "The separation between the third and fourth dimensions gives the three-letter code a reasonably clear boundary for initial exploration.";

  const fields = unique(topDetails.flatMap((detail) => detail.fields));
  const roles = unique(topDetails.flatMap((detail) => detail.roles));
  const skills = unique(topDetails.flatMap((detail) => detail.skills));
  const strengths = unique(
    topDetails.flatMap((detail) => detail.strengths),
  );
  const risks = unique(topDetails.flatMap((detail) => detail.risks));

  return [
    {
      id: "report-identity",
      order: 1,
      title: "Your Career Interest Report",
      description:
        "How to understand and use your RIASEC result.",
      blocks: [
        {
          id: "identity-summary",
          type: "summary",
          title: `${result.code}: your current career-interest pattern`,
          content:
            `Your result combines ${joinNatural(
              topProfiles.map(profileLabel),
            )}. The code describes the kinds of activities, problems, people, environments, and outcomes that currently attract your attention.\n\n` +
            "It is not a diagnosis, a measure of intelligence, or a rule that limits you to a short list of occupations. Use it as structured evidence for career exploration and compare it with your abilities, values, qualifications, responsibilities, opportunities, and real work experience.",
        },
      ],
    },

    {
      id: "result-profile",
      order: 2,
      title: "Result Profile",
      description:
        "A quantitative reading of your six interest dimensions.",
      blocks: [
        {
          id: "result-ranking",
          type: "analysis",
          title: "Your complete ranking",
          content: result.ranking
            .map((dimension, index) => {
              const profile = getRiasecDimensionProfile(dimension);

              return `${index + 1}. ${profile.name} (${dimension}) — ${Math.round(
                result.percentages[dimension],
              )}% · score ${result.scores[dimension]}`;
            })
            .join("\n"),
        },
        {
          id: "result-differentiation",
          type: "analysis",
          title: "How clearly differentiated is the result?",
          content: `${differentiation}\n\n${breadth}`,
        },
      ],
    },

    {
      id: "code-overview",
      order: 3,
      title: "Understanding Your RIASEC Code",
      description:
        "The role of the first, second, and third letters.",
      blocks: [
        {
          id: "code-primary",
          type: "analysis",
          title: `Primary interest: ${topProfiles[0].name}`,
          content:
            `${topProfiles[0].description}\n\n` +
            `${topDetails[0].motivations} This dimension is likely to influence which tasks initially attract you and what makes work feel naturally engaging.`,
        },
        {
          id: "code-secondary",
          type: "analysis",
          title: `Secondary interest: ${topProfiles[1].name}`,
          content:
            `${topProfiles[1].description}\n\n` +
            "The second dimension modifies the first. It often explains how you prefer to apply your strongest interest, what additional outcomes matter, or which environment allows the primary interest to remain sustainable.",
        },
        {
          id: "code-tertiary",
          type: "analysis",
          title: `Third interest: ${topProfiles[2].name}`,
          content:
            `${topProfiles[2].description}\n\n` +
            "The third dimension adds breadth. It may be less visible in every task, but it can become decisive when comparing two roles that otherwise appear equally suitable.",
        },
      ],
    },

    {
      id: "combination-analysis",
      order: 4,
      title: "Your Interest Combination",
      description:
        "How the three leading dimensions may operate together.",
      blocks: [
        {
          id: "combination-narrative",
          type: "summary",
          title: `${result.code} as an integrated pattern`,
          content:
            `Your strongest pattern combines ${topProfiles[0].shortLabel.toLowerCase()}, ${topProfiles[1].shortLabel.toLowerCase()}, and ${topProfiles[2].shortLabel.toLowerCase()} interests.\n\n` +
            `In practice, this may lead you to seek work where you can ${topDetails[0].workStyle.toLowerCase()} At the same time, you may want the role to include elements of ${topDetails[1].workStyle.toLowerCase()} The third dimension adds a preference for contexts where you can ${topDetails[2].workStyle.toLowerCase()}\n\n` +
            "The best career match will rarely be identified by job title alone. Examine whether the daily tasks and organisational environment allow this combination to operate.",
        },
        {
          id: "combination-tension",
          type: "guidance",
          title: "Manage the tensions inside the combination",
          content:
            "A blended code can contain productive tensions. One interest may favour speed while another favours evidence; one may seek flexibility while another seeks order; one may focus on people while another focuses on systems. Do not treat these tensions as contradictions. They can become a source of range when you deliberately decide which mode a situation requires.",
        },
      ],
    },

    {
      id: "work-style",
      order: 5,
      title: "Likely Work Style",
      description:
        "How you may prefer to approach tasks and responsibility.",
      blocks: topThree.map((dimension, index) => {
        const profile = getRiasecDimensionProfile(dimension);
        const detail = DIMENSION_DETAILS[dimension];

        return {
          id: `work-style-${dimension.toLowerCase()}`,
          type: "analysis",
          title: `${index + 1}. ${profile.name} contribution`,
          content: detail.workStyle,
        };
      }),
    },

    {
      id: "work-environment",
      order: 6,
      title: "Preferred Work Environment",
      description:
        "Conditions that may support motivation and sustained performance.",
      blocks: [
        {
          id: "environment-fit",
          type: "summary",
          title: "Environment fit matters as much as occupation",
          content:
            topThree
              .map((dimension) => {
                const profile = getRiasecDimensionProfile(dimension);

                return `${profile.name}: ${DIMENSION_DETAILS[dimension].environment}`;
              })
              .join("\n\n"),
        },
        {
          id: "environment-check",
          type: "guidance",
          title: "Questions to ask before accepting a role",
          content:
            "• What percentage of the week is spent on the activities that attract me?\n" +
            "• How much autonomy, structure, collaboration, and uncertainty does the role contain?\n" +
            "• What does success look like after six and twelve months?\n" +
            "• Does the organisation reward the type of contribution I want to make?\n" +
            "• Which part of the role is described attractively but appears rarely in daily work?",
        },
      ],
    },

    {
      id: "strengths",
      order: 7,
      title: "Potential Career Strengths",
      description:
        "Capabilities your interest pattern may encourage you to develop.",
      blocks: [
        {
          id: "strength-list",
          type: "strength",
          title: "Likely areas of natural engagement",
          content: formatList(strengths.slice(0, 10)),
        },
        {
          id: "strength-limitation",
          type: "guidance",
          title: "Interest is not the same as competence",
          content:
            "A high interest score increases the likelihood that you will willingly invest attention and practice, but it does not guarantee skill. Convert each possible strength into evidence: completed projects, qualifications, work samples, measurable results, feedback, or repeated performance under real constraints.",
        },
      ],
    },

    {
      id: "development-risks",
      order: 8,
      title: "Development Risks and Blind Spots",
      description:
        "Common ways a preferred style may become limiting.",
      blocks: [
        {
          id: "risk-list",
          type: "risk",
          title: "Risks to monitor",
          content: formatList(risks.slice(0, 9)),
        },
        {
          id: "risk-balance",
          type: "guidance",
          title: "Use lower-ranked dimensions as support skills",
          content:
            `Your lower-ranked dimensions are ${result.ranking
              .slice(3)
              .map((dimension) => getRiasecDimensionProfile(dimension).name)
              .join(", ")}. Lower ranking does not mean inability. These dimensions may provide balancing skills that protect the strengths of your leading code. Develop them where the work requires reliability, collaboration, communication, creativity, evidence, or implementation beyond your natural preference.`,
        },
      ],
    },

    {
      id: "career-fields",
      order: 9,
      title: "Career Fields to Explore",
      description:
        "Broad areas where your leading interests may appear.",
      blocks: [
        {
          id: "field-list",
          type: "summary",
          title: "Relevant career families",
          content: formatList(fields),
        },
        {
          id: "field-guidance",
          type: "guidance",
          title: "Explore fields before choosing titles",
          content:
            "Start with broad career families, then investigate the actual tasks inside specific roles. The same title can describe very different work across organisations. A project manager in construction, technology, education, and financial services may have four substantially different daily environments.",
        },
      ],
    },

    {
      id: "role-options",
      order: 10,
      title: "Example Roles",
      description:
        "Occupations that may contain elements of your leading interests.",
      blocks: [
        {
          id: "role-list",
          type: "summary",
          title: "Roles for structured investigation",
          content: formatList(roles.slice(0, 15)),
        },
        {
          id: "role-warning",
          type: "guidance",
          title: "These are exploration prompts, not prescriptions",
          content:
            "Do not select a career solely because it appears in this report. Check entry requirements, local labour-market demand, income ranges, working conditions, advancement pathways, automation exposure, geographic constraints, and the daily task profile.",
        },
      ],
    },

    {
      id: "skills-roadmap",
      order: 11,
      title: "Skills and Learning Roadmap",
      description:
        "Capabilities that can convert interests into employable value.",
      blocks: [
        {
          id: "skill-list",
          type: "summary",
          title: "Priority capabilities",
          content: formatList(skills),
        },
        {
          id: "skill-plan",
          type: "action",
          title: "Build proof, not only knowledge",
          content:
            "For each priority skill, create one visible proof of ability. This may be a portfolio project, analysis, design, technical build, presentation, process improvement, field report, case study, certification, or measurable work result. A smaller completed project usually creates more career evidence than a large learning plan that remains unfinished.",
        },
      ],
    },

    {
      id: "decision-framework",
      order: 12,
      title: "Career Decision Framework",
      description:
        "A structured method for comparing opportunities.",
      blocks: [
        {
          id: "decision-scorecard",
          type: "guidance",
          title: "Score each option across six factors",
          content:
            "Rate each career option from 1–5 on:\n\n" +
            "1. Interest fit — How often will the work use your leading RIASEC dimensions?\n" +
            "2. Ability fit — Do you have, or can you realistically build, the required skills?\n" +
            "3. Values fit — Does the work support outcomes that matter to you?\n" +
            "4. Environment fit — Do the pace, structure, people, and conditions suit you?\n" +
            "5. Opportunity — Is there credible demand, income potential, and progression?\n" +
            "6. Feasibility — Can you meet the time, cost, qualification, and location requirements?",
        },
      ],
    },

    {
      id: "ninety-day-plan",
      order: 13,
      title: "90-Day Career Action Plan",
      description:
        "Convert the report into evidence and decisions.",
      blocks: [
        {
          id: "days-1-30",
          type: "action",
          title: "Days 1–30: investigate",
          content:
            "Select three career fields and five roles from the report. Read at least ten real job descriptions, identify repeated requirements, and speak with two people working in relevant environments. Record which daily tasks increase or reduce your interest.",
        },
        {
          id: "days-31-60",
          type: "action",
          title: "Days 31–60: test",
          content:
            "Complete one small practical project that simulates the work. Use real tools or data where possible. Request external feedback and evaluate whether you enjoyed the actual process—not only the idea or status of the occupation.",
        },
        {
          id: "days-61-90",
          type: "action",
          title: "Days 61–90: decide and build",
          content:
            "Choose one primary direction and one secondary option. Define the next qualification, skill, portfolio proof, application target, or work experiment. Set a measurable six-month milestone and schedule a formal review using new evidence.",
        },
      ],
    },

    {
      id: "methodology",
      order: 14,
      title: "Methodology and Limitations",
      description:
        "What the assessment measures and how the report should be interpreted.",
      blocks: [
        {
          id: "methodology-scoring",
          type: "analysis",
          title: "How the result was produced",
          content:
            `The assessment contained ${Object.values(result.answered).reduce(
              (total, count) => total + count,
              0,
            )} answered items across six RIASEC dimensions. Each dimension was converted into a percentage and ranked. The first three ranked dimensions formed the ${result.code} code. Ties follow the system’s fixed dimension order to ensure deterministic scoring.`,
        },
        {
          id: "methodology-limitations",
          type: "risk",
          title: "Important limitations",
          content:
            "This report is not a clinical diagnosis, psychological treatment, aptitude test, guarantee of career success, or substitute for professional education and employment advice. Results may be influenced by current experience, language, exposure to occupations, social expectations, mood, and the user’s interpretation of each statement.",
        },
        {
          id: "methodology-review",
          type: "guidance",
          title: "Treat the result as a working hypothesis",
          content:
            "Retest only after meaningful new experience rather than repeatedly seeking a preferred code. The strongest validation comes from sustained real-world behaviour: what you choose, practise, complete, tolerate, and continue doing when the initial novelty has passed.",
        },
      ],
    },
  ];
}
