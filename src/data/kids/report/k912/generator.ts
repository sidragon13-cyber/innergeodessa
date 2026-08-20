import { K912_COMBINATION_PACKS, K912_DOMAIN_PACKS } from "./content";
import { K912_MASTER_TEMPLATE, K912_SECTION_TITLES } from "./content/master-template";
import { K912_INTERPRETATION_BOUNDARIES } from "./rules/interpretation-boundaries";
import { resolveK912Combination } from "./rules/combination-resolver";
import { K912_DOMAIN_LABELS, type K912FacetEvidence, type K912LocalizedText, type K912ReportFacts } from "./types";

export const K912_PROFESSIONAL_REPORT_VERSION = "K912-PROFESSIONAL-REPORT-V1" as const;
export const K912_REPORT_SECTION_IDS = [
  "report-identity", "parent-child-executive-summary", "six-domain-interest-profile", "current-interest-structure",
  "highlighted-interest-drivers", "behaviour-evidence", "interest-combination", "broader-interest-context",
  "exploration-environments", "what-to-explore-next", "parent-child-observation-plan", "methodology-interpretation-boundaries",
] as const;
export type K912ReportSectionId = (typeof K912_REPORT_SECTION_IDS)[number];

export type K912ReportBlockKind =
  | "paragraph"
  | "heading"
  | "bullet-list"
  | "callout"
  | "evidence"
  | "project"
  | "reflection"
  | "observation"
  | "boundary";

export interface GeneratedK912ReportBlock {
  readonly id: string;
  readonly kind: K912ReportBlockKind;
  readonly title?: K912LocalizedText;
  readonly paragraphs?: readonly K912LocalizedText[];
  readonly items?: readonly K912LocalizedText[];
}

export interface GeneratedK912Section {
  readonly id: K912ReportSectionId;
  readonly title: K912LocalizedText;

  /**
   * Legacy paragraph output.
   * Retained temporarily while K912 Final Assembly migrates
   * to structured professional-report blocks.
   */
  readonly paragraphs: readonly K912LocalizedText[];

  /**
   * Final Professional Report structure.
   * Allows authored content to preserve headings, lists,
   * evidence, projects, reflections and boundaries.
   */
  readonly blocks?: readonly GeneratedK912ReportBlock[];
}
export interface GeneratedK912ProfessionalReport {
  readonly reportVersion: typeof K912_PROFESSIONAL_REPORT_VERSION;
  readonly facts: K912ReportFacts;
  readonly combination: ReturnType<typeof resolveK912Combination>;
  readonly evidence: readonly K912FacetEvidence[];
  readonly sections: readonly GeneratedK912Section[];
}

const join = (en: string, zh: string): K912LocalizedText => ({ en, zh });

export function generateK912ProfessionalReport(facts: K912ReportFacts): GeneratedK912ProfessionalReport {
  const combination = resolveK912Combination(facts);
  const combinationPack = K912_COMBINATION_PACKS[combination.key];
  const primaryPack = K912_DOMAIN_PACKS[combination.primary];
  const secondaryPack = K912_DOMAIN_PACKS[combination.secondary];

  const primaryProfessional = primaryPack.professional;
  const secondaryProfessional = secondaryPack.professional;

  const patternContextZh =
    ({
      "Clear Exploration Pattern": "清晰兴趣结构",
      "Broad Exploration Pattern": "广泛兴趣结构",
      "Emerging Exploration Pattern": "正在形成的兴趣结构",
      "Clustered Exploration Pattern": "多方向接近的兴趣结构",
    } as Readonly<Record<string, string>>)[facts.patternContext] ??
    facts.patternContext;
  const ranking = facts.ranking.map((domain, index) => `${index + 1}. ${K912_DOMAIN_LABELS[domain].en} ${facts.scores[domain]}`).join(" · ");
  const rankingZh = facts.ranking.map((domain, index) => `${index + 1}. ${K912_DOMAIN_LABELS[domain].zh} ${facts.scores[domain]}`).join(" · ");
  const selectedEvidence = [
    combination.primary,
    combination.secondary,
  ].flatMap((domain) =>
    [...facts.evidenceByDomain[domain]]
      .sort(
        (left, right) =>
          right.responseValue - left.responseValue ||
          left.displayOrder - right.displayOrder,
      )
      .slice(0, 2),
  );

  const behaviourEvidence = selectedEvidence.map((item) => {
    const label = K912_DOMAIN_LABELS[item.domain];

    return join(
      `${label.en} · ${item.facet.en} · ${item.responseValue}/5. This is a real item-level interest response and supports the current report interpretation without being treated as an ability judgment.`,
      `${label.zh} · ${item.facet.zh} · ${item.responseValue}/5。这个结果来自真实题目回应，为当前兴趣解释提供具体证据，但不代表能力判断。`,
    );
  });

  const backgroundInterestItems = facts.ranking
    .slice(2)
    .map((domain) =>
      join(
        `${K912_DOMAIN_LABELS[domain].en} · ${Math.round(facts.scores[domain])}: ${K912_DOMAIN_PACKS[domain].interpretation.en}`,
        `${K912_DOMAIN_LABELS[domain].zh} · ${Math.round(facts.scores[domain])}：${K912_DOMAIN_PACKS[domain].interpretation.zh}`,
      ),
    );

  const sections: readonly GeneratedK912Section[] = [
    {
      id: "report-identity",
      title: K912_SECTION_TITLES[0],
      paragraphs: [
        K912_MASTER_TEMPLATE.identity,
        K912_MASTER_TEMPLATE.purpose,
        K912_MASTER_TEMPLATE.scale,
      ],
      blocks: [
        {
          id: "report-purpose",
          kind: "callout",
          title: join(
            "How to read this report",
            "如何阅读这份报告",
          ),
          paragraphs: [
            K912_MASTER_TEMPLATE.identity,
            K912_MASTER_TEMPLATE.purpose,
          ],
        },
        {
          id: "report-scale",
          kind: "paragraph",
          title: join(
            "What the scores mean",
            "分数代表什么",
          ),
          paragraphs: [K912_MASTER_TEMPLATE.scale],
        },
      ],
    },

    {
      id: "parent-child-executive-summary",
      title: K912_SECTION_TITLES[1],
      paragraphs: [
        combinationPack.combinationSummary,
        combinationPack.whyThisCombinationMatters,
        combinationPack.childReflection,
      ],
      blocks: [
        {
          id: "executive-combination",
          kind: "callout",
          title: join(
            `${K912_DOMAIN_LABELS[combination.primary].en} + ${K912_DOMAIN_LABELS[combination.secondary].en}`,
            `${K912_DOMAIN_LABELS[combination.primary].zh}＋${K912_DOMAIN_LABELS[combination.secondary].zh}`,
          ),
          paragraphs: [combinationPack.combinationSummary],
        },
        {
          id: "executive-meaning",
          kind: "paragraph",
          title: join(
            "What is most worth noticing now",
            "现在最值得关注什么",
          ),
          paragraphs: [combinationPack.whyThisCombinationMatters],
        },
        {
          id: "executive-child-question",
          kind: "reflection",
          title: join(
            "A question for the child",
            "给孩子的问题",
          ),
          paragraphs: [combinationPack.childReflection],
        },
      ],
    },

    {
      id: "six-domain-interest-profile",
      title: K912_SECTION_TITLES[2],
      paragraphs: [
        join(ranking, rankingZh),
        join(
          "Raw scores use the persisted 7–35 domain range. Normalised scores preserve the persisted 0–100 presentation scale.",
          "原始分数采用已保存的每领域7–35分范围；标准化分数采用已保存的0–100展示范围。",
        ),
      ],
      blocks: [
        {
          id: "six-domain-ranking",
          kind: "evidence",
          title: join(
            "Current six-domain ranking",
            "当前六维兴趣排序",
          ),
          items: facts.ranking.map((domain, index) =>
            join(
              `#${index + 1} ${K912_DOMAIN_LABELS[domain].en} · ${Math.round(facts.scores[domain])} · raw ${facts.rawScores[domain]}/35`,
              `#${index + 1} ${K912_DOMAIN_LABELS[domain].zh} · ${Math.round(facts.scores[domain])} · 原始分 ${facts.rawScores[domain]}/35`,
            ),
          ),
        },
        {
          id: "six-domain-scale",
          kind: "paragraph",
          paragraphs: [
            join(
              "The six scores are read together as a current interest map. They are not six independent labels.",
              "六个分数需要作为一张当前兴趣地图共同阅读，而不是六个彼此独立的标签。",
            ),
          ],
        },
      ],
    },

    {
      id: "current-interest-structure",
      title: K912_SECTION_TITLES[3],
      paragraphs: [
        join(
          `Current pattern context: ${facts.patternContext}. First–second gap: ${facts.firstSecondGap.toFixed(1)}; second–third gap: ${facts.secondThirdGap.toFixed(1)}; overall spread: ${facts.overallSpread.toFixed(1)}.`,
          `当前模式背景：${patternContextZh}。第一与第二差距：${facts.firstSecondGap.toFixed(1)}；第二与第三差距：${facts.secondThirdGap.toFixed(1)}；整体跨度：${facts.overallSpread.toFixed(1)}。`,
        ),
        join(
          "Exact ties and the leading cluster are retained as score facts. Small differences do not establish a permanent hierarchy.",
          "完全同分与领先组均作为分数事实保留。分数差异描述的是本次兴趣结构，不建立永久层级。",
        ),
      ],
      blocks: [
        {
          id: "interest-pattern",
          kind: "callout",
          title: join(
            "Current interest structure",
            "本次兴趣结构",
          ),
          paragraphs: [
            join(
              `Pattern: ${facts.patternContext}. Primary: ${K912_DOMAIN_LABELS[combination.primary].en}. Secondary: ${K912_DOMAIN_LABELS[combination.secondary].en}.`,
              `当前结构：${patternContextZh}。第一兴趣为${K912_DOMAIN_LABELS[combination.primary].zh}，第二兴趣为${K912_DOMAIN_LABELS[combination.secondary].zh}。`,
            ),
          ],
        },
        {
          id: "interest-gaps",
          kind: "evidence",
          title: join(
            "Result structure facts",
            "结果结构数据",
          ),
          items: [
            join(
              `First–second gap: ${facts.firstSecondGap.toFixed(1)}`,
              `第一与第二差距：${facts.firstSecondGap.toFixed(1)}`,
            ),
            join(
              `Second–third gap: ${facts.secondThirdGap.toFixed(1)}`,
              `第二与第三差距：${facts.secondThirdGap.toFixed(1)}`,
            ),
            join(
              `Overall spread: ${facts.overallSpread.toFixed(1)}`,
              `六维整体跨度：${facts.overallSpread.toFixed(1)}`,
            ),
          ],
        },
      ],
    },

    {
      id: "highlighted-interest-drivers",
      title: K912_SECTION_TITLES[4],
      paragraphs: [
        primaryProfessional.coreDefinition,
        primaryProfessional.typicalExpression,
        primaryProfessional.engagementConditions,
        primaryProfessional.lowerEngagementConditions,
      ],
      blocks: [
        {
          id: "primary-definition",
          kind: "callout",
          title: join(
            `${K912_DOMAIN_LABELS[combination.primary].en} · Current Primary Interest`,
            `${K912_DOMAIN_LABELS[combination.primary].zh} · 当前主要兴趣方向`,
          ),
          paragraphs: [primaryProfessional.coreDefinition],
        },
        {
          id: "primary-real-world",
          kind: "bullet-list",
          title: join(
            "How this interest may appear in real activities",
            "这种兴趣可能怎样出现在真实活动中",
          ),
          items: [primaryProfessional.typicalExpression],
        },
        {
          id: "primary-engagement",
          kind: "bullet-list",
          title: join(
            "Conditions that may support engagement",
            "什么环境更容易激活这种兴趣",
          ),
          items: [primaryProfessional.engagementConditions],
        },
        {
          id: "primary-lower-engagement",
          kind: "bullet-list",
          title: join(
            "Conditions that may reduce visible engagement",
            "什么环境可能降低兴趣表现",
          ),
          items: [primaryProfessional.lowerEngagementConditions],
        },
      ],
    },

    {
      id: "behaviour-evidence",
      title: K912_SECTION_TITLES[5],
      paragraphs: [
        join(
          "All 42 recorded responses remain traceable in the report data. The report selects a small number of real Facet Evidence points from the current Primary and Secondary interests.",
          "全部42项真实回应仍完整保留并可以追溯。完整报告从当前主要兴趣和第二兴趣中选择少量真实Facet证据进行重点解释。",
        ),
        ...behaviourEvidence,
      ],
      blocks: [
        {
          id: "evidence-introduction",
          kind: "paragraph",
          paragraphs: [
            join(
              "Facet Evidence connects the report back to the child's real answers. These examples support interpretation but do not measure ability.",
              "Facet证据把报告重新连接到孩子的真实答题。它们用于支持兴趣解释，但不测量能力。",
            ),
          ],
        },
        {
          id: "primary-facet-coverage",
          kind: "bullet-list",
          title: join(
            "Seven-facet coverage of the primary interest",
            "主要兴趣方向的七个兴趣侧面",
          ),
          items: [primaryProfessional.facetCoverage],
        },
        {
          id: "selected-facet-evidence",
          kind: "evidence",
          title: join(
            "Selected real response evidence",
            "本次精选真实回应证据",
          ),
          items: behaviourEvidence,
        },
      ],
    },

    {
      id: "interest-combination",
      title: K912_SECTION_TITLES[6],
      paragraphs: [
        combinationPack.combinationSummary,
        combinationPack.interestDrivers,
        combinationPack.behaviourPattern,
        combinationPack.developmentDirection,
      ],
      blocks: [
        {
          id: "combination-core",
          kind: "callout",
          title: join(
            "Core combination theme",
            "组合核心主题",
          ),
          paragraphs: [combinationPack.combinationSummary],
        },
        {
          id: "combination-logic",
          kind: "paragraph",
          title: join(
            "Interaction logic",
            "互动逻辑",
          ),
          paragraphs: [combinationPack.interestDrivers],
        },
        {
          id: "combination-expression",
          kind: "bullet-list",
          title: join(
            "Real-world expression",
            "现实中的组合表现",
          ),
          items: [combinationPack.behaviourPattern],
        },
        {
          id: "combination-direction",
          kind: "paragraph",
          title: join(
            "Development direction",
            "值得继续观察的发展方向",
          ),
          paragraphs: [combinationPack.developmentDirection],
        },
      ],
    },

    {
      id: "broader-interest-context",
      title: K912_SECTION_TITLES[7],
      paragraphs: backgroundInterestItems,
      blocks: [
        {
          id: "background-context",
          kind: "paragraph",
          paragraphs: [
            join(
              "The remaining four domains are not discarded. They provide context for how broad or concentrated the current interest map is.",
              "其余四个兴趣方向并没有被排除，它们用于帮助理解当前兴趣地图是更集中还是更广泛。",
            ),
          ],
        },
        {
          id: "background-domains",
          kind: "bullet-list",
          title: join(
            "Other current interest signals",
            "其他当前兴趣信号",
          ),
          items: backgroundInterestItems,
        },
      ],
    },

    {
      id: "exploration-environments",
      title: K912_SECTION_TITLES[8],
      paragraphs: [
        combinationPack.suitableEnvironment,
        primaryPack.explorationEnvironment,
        secondaryPack.explorationEnvironment,
      ],
      blocks: [
        {
          id: "combination-environment",
          kind: "callout",
          title: join(
            "Best environment for the combination",
            "更适合这一组合的探索环境",
          ),
          paragraphs: [combinationPack.suitableEnvironment],
        },
        {
          id: "primary-environment",
          kind: "paragraph",
          title: join(
            `${K912_DOMAIN_LABELS[combination.primary].en} environment`,
            `${K912_DOMAIN_LABELS[combination.primary].zh}兴趣环境`,
          ),
          paragraphs: [primaryPack.explorationEnvironment],
        },
        {
          id: "secondary-environment",
          kind: "paragraph",
          title: join(
            `${K912_DOMAIN_LABELS[combination.secondary].en} environment`,
            `${K912_DOMAIN_LABELS[combination.secondary].zh}兴趣环境`,
          ),
          paragraphs: [secondaryPack.explorationEnvironment],
        },
      ],
    },

    {
      id: "what-to-explore-next",
      title: K912_SECTION_TITLES[9],
      paragraphs: [
        combinationPack.projectSuggestions,
        primaryProfessional.quickExploration,
        primaryProfessional.miniProject,
        primaryProfessional.deeperExploration,
      ],
      blocks: [
        {
          id: "combination-exploration",
          kind: "project",
          title: join(
            "Combination exploration",
            "组合探索建议",
          ),
          items: [combinationPack.projectSuggestions],
        },
        {
          id: "quick-exploration",
          kind: "project",
          title: join(
            "Quick Exploration",
            "快速体验",
          ),
          paragraphs: [primaryProfessional.quickExploration],
        },
        {
          id: "mini-project",
          kind: "project",
          title: join(
            "1–2 Week Mini Project",
            "1–2周短期项目",
          ),
          paragraphs: [primaryProfessional.miniProject],
        },
        {
          id: "deeper-exploration",
          kind: "project",
          title: join(
            "4–8 Week Deeper Exploration",
            "4–8周深入探索",
          ),
          paragraphs: [primaryProfessional.deeperExploration],
        },
      ],
    },

    {
      id: "parent-child-observation-plan",
      title: K912_SECTION_TITLES[10],
      paragraphs: [
        combinationPack.childReflection,
        combinationPack.parentObservation,
        primaryProfessional.childReflection,
        primaryProfessional.parentObservation,
        secondaryProfessional.childReflection,
        secondaryProfessional.parentObservation,
      ],
      blocks: [
        {
          id: "combination-child-reflection",
          kind: "reflection",
          title: join(
            "Child reflection · combination",
            "孩子自我反思 · 兴趣组合",
          ),
          items: [combinationPack.childReflection],
        },
        {
          id: "combination-parent-observation",
          kind: "observation",
          title: join(
            "Parent observation · combination",
            "家长观察 · 兴趣组合",
          ),
          items: [combinationPack.parentObservation],
        },
        {
          id: "primary-child-reflection",
          kind: "reflection",
          title: join(
            `${K912_DOMAIN_LABELS[combination.primary].en} reflection`,
            `${K912_DOMAIN_LABELS[combination.primary].zh}方向 · 孩子问题`,
          ),
          items: [primaryProfessional.childReflection],
        },
        {
          id: "primary-parent-observation",
          kind: "observation",
          title: join(
            `${K912_DOMAIN_LABELS[combination.primary].en} observation`,
            `${K912_DOMAIN_LABELS[combination.primary].zh}方向 · 家长观察`,
          ),
          items: [primaryProfessional.parentObservation],
        },
        {
          id: "secondary-child-reflection",
          kind: "reflection",
          title: join(
            `${K912_DOMAIN_LABELS[combination.secondary].en} reflection`,
            `${K912_DOMAIN_LABELS[combination.secondary].zh}方向 · 孩子问题`,
          ),
          items: [secondaryProfessional.childReflection],
        },
        {
          id: "secondary-parent-observation",
          kind: "observation",
          title: join(
            `${K912_DOMAIN_LABELS[combination.secondary].en} observation`,
            `${K912_DOMAIN_LABELS[combination.secondary].zh}方向 · 家长观察`,
          ),
          items: [secondaryProfessional.parentObservation],
        },
      ],
    },

    {
      id: "methodology-interpretation-boundaries",
      title: K912_SECTION_TITLES[11],
      paragraphs: [
        K912_MASTER_TEMPLATE.evidence,
        K912_MASTER_TEMPLATE.jointReading,
        primaryProfessional.commonMisreads,
        primaryProfessional.interpretationBoundary,
        combinationPack.interpretationBoundary,
        K912_INTERPRETATION_BOUNDARIES,
      ],
      blocks: [
        {
          id: "method-evidence",
          kind: "paragraph",
          title: join(
            "How the report is assembled",
            "报告如何形成",
          ),
          paragraphs: [
            K912_MASTER_TEMPLATE.evidence,
            K912_MASTER_TEMPLATE.jointReading,
          ],
        },
        {
          id: "primary-common-misreads",
          kind: "boundary",
          title: join(
            "Common misreads to avoid",
            "常见误读",
          ),
          paragraphs: [primaryProfessional.commonMisreads],
        },
        {
          id: "primary-boundary",
          kind: "boundary",
          title: join(
            "Primary-interest boundary",
            "主要兴趣方向的解释边界",
          ),
          paragraphs: [primaryProfessional.interpretationBoundary],
        },
        {
          id: "combination-boundary",
          kind: "boundary",
          title: join(
            "Combination boundary",
            "兴趣组合的解释边界",
          ),
          paragraphs: [combinationPack.interpretationBoundary],
        },
        {
          id: "global-boundary",
          kind: "boundary",
          title: join(
            "K912 overall boundary",
            "K912总体解释边界",
          ),
          paragraphs: [K912_INTERPRETATION_BOUNDARIES],
        },
      ],
    },
  ];

  return { reportVersion: K912_PROFESSIONAL_REPORT_VERSION, facts, combination, evidence: facts.facetEvidence, sections };
}
