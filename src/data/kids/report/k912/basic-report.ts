import {
  assembleK912ReportSections,
  type AssembledK912ReportSection,
} from "./assembly";
import { K912_DOMAIN_PACKS } from "./content";
import type { GeneratedK912ProfessionalReport } from "./generator";
import {
  K912_DOMAIN_LABELS,
  type K912ReportFacts,
  type K912ReportLocale,
} from "./types";

export interface K912BasicReportCard {
  readonly title: string;
  readonly description: string;
}

export interface K912BasicReportDimension {
  readonly id: keyof K912ReportFacts["scores"];
  readonly title: string;
  readonly description: string;
  readonly score: number;
  readonly rank: number;
}

export interface K912BasicReport {
  readonly facts: K912ReportFacts;

  readonly identity: {
    readonly title: string;
    readonly subtitle: string;
    readonly keywords: readonly string[];
  };

  readonly interpretationProfile: {
    readonly title: string;
    readonly name: string;
    readonly description: string;
    readonly explorationTheme: {
      readonly title: string;
      readonly name: string;
      readonly description: string;
    };
  };

  readonly overview: {
    readonly headline: string;
    readonly paragraphs: readonly string[];
    readonly summary: string;
  };

  readonly combinationInsight: {
    readonly title: string;
    readonly paragraphs: readonly string[];
    readonly summary: string;
  };

  readonly coreSignals: readonly K912BasicReportCard[];

  readonly dimensions: readonly K912BasicReportDimension[];

  readonly engagementPatterns: readonly K912BasicReportCard[];

  readonly parentObservation: readonly K912BasicReportCard[];

  readonly explorationDirections: readonly K912BasicReportCard[];

  readonly premiumPreview: {
    readonly headline: string;
    readonly introduction: string;
    readonly sections: readonly {
      readonly id: string;
      readonly title: string;
      readonly description: string;
    }[];
  };
}

const localize = (
  locale: K912ReportLocale,
  zh: string,
  en: string,
): string => (locale === "zh" ? zh : en);

function resolveSection(
  sections: readonly AssembledK912ReportSection[],
  id: string,
  fallbackIndex: number,
): AssembledK912ReportSection | undefined {
  return (
    sections.find((section) => section.id === id) ??
    sections[fallbackIndex]
  );
}

function sectionTexts(
  section: AssembledK912ReportSection | undefined,
): readonly string[] {
  if (!section) return [];

  return [
    ...section.paragraphs,
    ...section.blocks.flatMap((block) => [
      ...block.paragraphs,
      ...block.items,
    ]),
  ]
    .map((value) => value.trim())
    .filter(Boolean);
}

function cardsFromSection(
  section: AssembledK912ReportSection | undefined,
  limit: number,
): readonly K912BasicReportCard[] {
  if (!section) return [];

  const blockCards = section.blocks
    .map((block) => {
      const description = [
        ...block.paragraphs,
        ...block.items,
      ]
        .map((value) => value.trim())
        .filter(Boolean)
        .join(" ");

      return {
        title: block.title?.trim() ?? "",
        description,
      };
    })
    .filter((card) => card.description.length > 0)
    .slice(0, limit);

  if (blockCards.length > 0) {
    return blockCards;
  }

  return section.paragraphs
    .map((paragraph) => ({
      title: "",
      description: paragraph.trim(),
    }))
    .filter((card) => card.description.length > 0)
    .slice(0, limit);
}

function mergeCards(
  groups: readonly (readonly K912BasicReportCard[])[],
  limit: number,
): readonly K912BasicReportCard[] {
  const result: K912BasicReportCard[] = [];
  const seen = new Set<string>();

  for (const group of groups) {
    for (const card of group) {
      const key = `${card.title}\n${card.description}`;

      if (seen.has(key)) continue;

      seen.add(key);
      result.push(card);

      if (result.length >= limit) {
        return result;
      }
    }
  }

  return result;
}

export function buildK912BasicReport({
  facts,
  report,
  locale,
}: {
  facts: K912ReportFacts;
  report: GeneratedK912ProfessionalReport;
  locale: K912ReportLocale;
}): K912BasicReport {
  if (report.facts !== facts) {
    throw new Error(
      "K912 basic and professional reports must share the same authoritative facts object.",
    );
  }

  /*
   * K68 reference architecture:
   *
   * Professional Report
   * -> assembled report sections
   * -> curated Basic Report
   *
   * K912 follows the same flow.
   */
  const sections =
    assembleK912ReportSections(report, locale);

  const executiveSection =
    resolveSection(
      sections,
      "parent-executive-summary",
      1,
    );

  const sixDomainSection =
    resolveSection(
      sections,
      "six-domain-interest-map",
      2,
    );

  const currentPatternSection =
    resolveSection(
      sections,
      "current-interest-pattern",
      3,
    );

  const primaryInterestSection =
    resolveSection(
      sections,
      "primary-interest-direction",
      4,
    );

  const behaviourEvidenceSection =
    resolveSection(
      sections,
      "behavior-evidence",
      5,
    );

  const combinationSection =
    resolveSection(
      sections,
      "interest-combination",
      6,
    );

  const broaderContextSection =
    resolveSection(
      sections,
      "broader-interest-context",
      7,
    );

  const explorationEnvironmentSection =
    resolveSection(
      sections,
      "exploration-environment",
      8,
    );

  const whatToExploreNextSection =
    resolveSection(
      sections,
      "what-to-explore-next",
      9,
    );

  const parentObservationSection =
    resolveSection(
      sections,
      "parent-observation-plan",
      10,
    );

  const methodologySection =
    resolveSection(
      sections,
      "methodology-and-boundaries",
      11,
    );

  const primary =
    report.combination.primary;

  const secondary =
    report.combination.secondary;

  const domains =
    [primary, secondary] as const;

  const combinationTitle =
    `${K912_DOMAIN_LABELS[primary][locale]} + ${K912_DOMAIN_LABELS[secondary][locale]}`;

  const executiveTexts =
    sectionTexts(executiveSection);

  const combinationTexts =
    sectionTexts(combinationSection);

  const currentPatternTexts =
    sectionTexts(currentPatternSection);

  const explorationEnvironmentTexts =
    sectionTexts(explorationEnvironmentSection);

  const methodologyTexts =
    sectionTexts(methodologySection);

  const dimensions =
    facts.ranking.map((domain, index) => {
      const localizedLabel =
        K912_DOMAIN_LABELS[domain][locale];

      const professionalBlock =
        sixDomainSection?.blocks.find(
          (block) =>
            block.id
              .toLowerCase()
              .includes(domain) ||
            block.title
              ?.toLowerCase()
              .includes(
                localizedLabel.toLowerCase(),
              ),
        );

      const professionalDescription =
        professionalBlock?.paragraphs[0] ??
        professionalBlock?.items[0];

      return {
        id: domain,
        title: localizedLabel,
        description:
          professionalDescription ??
          K912_DOMAIN_PACKS[domain]
            .interpretation[locale],
        score: facts.scores[domain],
        rank: index + 1,
      };
    });

  const primaryFallbackCards =
    domains.map((domain) => ({
      title:
        K912_DOMAIN_LABELS[domain][locale],
      description:
        K912_DOMAIN_PACKS[domain]
          .interestDrivers[locale],
    }));

  const coreSignals =
    mergeCards(
      [
        cardsFromSection(
          primaryInterestSection,
          4,
        ),
        cardsFromSection(
          broaderContextSection,
          4,
        ),
        primaryFallbackCards,
      ],
      4,
    );

  const engagementPatterns =
    mergeCards(
      [
        cardsFromSection(
          explorationEnvironmentSection,
          4,
        ),
        domains.map((domain) => ({
          title:
            K912_DOMAIN_LABELS[domain][locale],
          description:
            K912_DOMAIN_PACKS[domain]
              .behaviouralMeaning[locale],
        })),
      ],
      4,
    );

  const parentObservation =
    mergeCards(
      [
        cardsFromSection(
          parentObservationSection,
          4,
        ),
        domains.map((domain) => ({
          title:
            K912_DOMAIN_LABELS[domain][locale],
          description:
            K912_DOMAIN_PACKS[domain]
              .parentObservation[locale],
        })),
      ],
      4,
    );

  const explorationDirections =
    mergeCards(
      [
        cardsFromSection(
          whatToExploreNextSection,
          4,
        ),
        cardsFromSection(
          explorationEnvironmentSection,
          4,
        ),
      ],
      4,
    );

  const overviewParagraphs =
    executiveSection?.paragraphs
      .map((paragraph) => paragraph.trim())
      .filter(Boolean)
      .slice(0, 2) ?? [];

  const combinationParagraphs =
    combinationSection?.paragraphs
      .map((paragraph) => paragraph.trim())
      .filter(Boolean)
      .slice(0, 3) ?? [];

  const premiumSections =
    [
      behaviourEvidenceSection,
      sixDomainSection,
      combinationSection,
      explorationEnvironmentSection,
      currentPatternSection,
      parentObservationSection,
      whatToExploreNextSection,
      methodologySection,
    ]
      .filter(
        (
          section,
        ): section is AssembledK912ReportSection =>
          Boolean(section),
      )
      .map((section) => ({
        id: section.id,
        title: section.title,
        description:
          sectionTexts(section)[0] ??
          localize(
            locale,
            "完整报告中提供进一步解释。",
            "Explored in greater depth in the full report.",
          ),
      }));

  return {
    facts,

    identity: {
      title: combinationTitle,
      subtitle: localize(
        locale,
        "孩子当前的主要兴趣组合",
        "Current Primary Interest Combination",
      ),
      keywords:
        facts.ranking
          .slice(0, 4)
          .map(
            (domain) =>
              K912_DOMAIN_LABELS[domain][locale],
          ),
    },

    interpretationProfile: {
      title: localize(
        locale,
        "兴趣解释路径",
        "Interest Profile",
      ),
      name: localize(
        locale,
        "Current Interest Profile｜当前兴趣画像",
        "Current Interest Profile",
      ),
      description:
        currentPatternTexts[0] ??
        localize(
          locale,
          "用于组织当前兴趣结果的解释方式，不代表能力、天赋或发展等级。",
          "This profile organizes how the current interest result is interpreted; it is not a level of ability, talent, or development.",
        ),

      explorationTheme: {
        title: localize(
          locale,
          "探索主题",
          "Exploration Theme",
        ),
        name: localize(
          locale,
          "Explore & Observe｜探索与观察",
          "Explore & Observe",
        ),
        description:
          explorationEnvironmentTexts[0] ??
          localize(
            locale,
            "通过真实活动和重复观察，确认哪些兴趣会持续出现。",
            "Use real activities and repeated observation to see which interests continue to appear.",
          ),
      },
    },

    overview: {
      headline: localize(
        locale,
        `孩子目前更容易在「${combinationTitle}」相关活动中产生持续兴趣。`,
        `The child currently shows stronger and more sustained interest around ${combinationTitle}.`,
      ),

      paragraphs:
        overviewParagraphs.length > 0
          ? overviewParagraphs
          : executiveTexts.slice(0, 2),

      summary:
        executiveTexts[2] ??
        localize(
          locale,
          "这份结果更适合用来决定下一步可以给孩子提供什么体验、观察哪些行为，而不是把孩子固定在某一种兴趣标签或能力判断里。",
          "Use this result to decide what experiences to offer next and what behaviours to observe, rather than fixing the child into an interest label or ability judgement.",
        ),
    },

    combinationInsight: {
      title: combinationTitle,

      paragraphs:
        combinationParagraphs.length > 0
          ? combinationParagraphs
          : combinationTexts.slice(0, 3),

      summary:
        methodologyTexts[0] ??
        combinationTexts[
          combinationTexts.length - 1
        ] ??
        localize(
          locale,
          "这个组合描述的是当前更容易共同出现的兴趣方向，应通过后续真实活动和重复观察继续验证，而不是作为固定标签。",
          "This combination describes interests that currently tend to appear together and should be explored through real activities and repeated observation rather than treated as a fixed label.",
        ),
    },

    coreSignals,

    dimensions,

    engagementPatterns,

    parentObservation,

    explorationDirections,

    premiumPreview: {
      headline: localize(
        locale,
        "继续深入理解孩子的兴趣结构。",
        "Understand the child's interest structure in greater depth.",
      ),

      introduction: localize(
        locale,
        "完整专业报告进一步连接行为证据、六维兴趣结构、兴趣组合、探索环境与家长观察计划。",
        "The full professional report connects behavioural evidence, the six-domain interest structure, interest combinations, exploration environments, and the parent observation plan.",
      ),

      sections: premiumSections,
    },
  };
}
