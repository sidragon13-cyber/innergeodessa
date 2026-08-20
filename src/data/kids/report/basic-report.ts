import type {
  FixedReportRichBlock,
} from "@/data/report/fixed-assets/fixed-report-rich-content";

import {
  assembleK68ReportSections,
  type K68ReportLocale,
} from "./assembly";
import type {
  K68ReportFacts,
} from "./facts";
import type {
  GeneratedK68ProfessionalReport,
  K68ProfessionalReportSectionId,
} from "./generator";

const K68_BASIC_DOMAIN_ORDER = [
  "think",
  "discover",
  "build",
  "create",
  "connect",
  "move",
] as const;

type K68BasicDomainId =
  (typeof K68_BASIC_DOMAIN_ORDER)[number];

const DOMAIN_LABELS: Readonly<
  Record<
    K68BasicDomainId,
    {
      readonly en: string;
      readonly zh: string;
    }
  >
> = {
  think: {
    en: "Think",
    zh: "思考",
  },
  discover: {
    en: "Discover",
    zh: "探索",
  },
  build: {
    en: "Build",
    zh: "构建",
  },
  create: {
    en: "Create",
    zh: "创造表达",
  },
  connect: {
    en: "Connect",
    zh: "联结合作",
  },
  move: {
    en: "Move",
    zh: "行动体验",
  },
};

export interface K68BasicReportCard {
  readonly title: string;
  readonly description: string;
}

export interface K68BasicReportDimension {
  readonly id: K68BasicDomainId;
  readonly title: string;
  readonly description: string;
  readonly score: number;
  readonly rank: number;
}

export interface K68BasicReportIdentity {
  readonly title: string;
  readonly subtitle: string;
  readonly keywords: readonly string[];
}

export interface K68BasicReportInterpretationProfile {
  readonly title: string;
  readonly name: string;
  readonly description: string;
  readonly explorationTheme: {
    readonly title: string;
    readonly name: string;
    readonly description: string;
  };
}

export interface K68BasicReportOverview {
  readonly headline: string;
  readonly paragraphs: readonly string[];
  readonly summary: string;
}

export interface K68BasicReportCombinationInsight {
  readonly title: string;
  readonly paragraphs: readonly string[];
  readonly summary: string;
}

export interface K68BasicReportPremiumSection {
  readonly id: string;
  readonly title: string;
  readonly description: string;
}

export interface K68BasicReport {
  readonly identity:
    K68BasicReportIdentity;

  readonly interpretationProfile:
    K68BasicReportInterpretationProfile;

  readonly overview:
    K68BasicReportOverview;

  readonly combinationInsight:
    K68BasicReportCombinationInsight;

  readonly coreSignals:
    readonly K68BasicReportCard[];

  readonly dimensions:
    readonly K68BasicReportDimension[];

  readonly engagementPatterns:
    readonly K68BasicReportCard[];

  readonly parentObservation:
    readonly K68BasicReportCard[];

  readonly explorationDirections:
    readonly K68BasicReportCard[];

  readonly premiumPreview: {
    readonly headline: string;
    readonly introduction: string;
    readonly sections:
      readonly K68BasicReportPremiumSection[];
  };
}

interface BuildK68BasicReportInput {
  readonly facts: K68ReportFacts;
  readonly report:
    GeneratedK68ProfessionalReport;
  readonly locale:
    K68ReportLocale;
}

function localize(
  locale: K68ReportLocale,
  zh: string,
  en: string,
): string {
  return locale === "zh"
    ? zh
    : en;
}

function normalizeScore(
  value: number | undefined,
): number {
  if (
    typeof value !== "number" ||
    !Number.isFinite(value)
  ) {
    return 0;
  }

  return Math.max(
    0,
    Math.min(100, value),
  );
}

function getBlockText(
  block: FixedReportRichBlock,
): readonly string[] {
  switch (block.type) {
    case "paragraph":
    case "blockquote":
      return block.text.trim()
        ? [block.text.trim()]
        : [];

    case "unordered-list":
    case "ordered-list":
      return block.items
        .map((item) => item.trim())
        .filter(Boolean);

    case "table":
      return block.rows
        .flatMap((row) =>
          row
            .map((cell) =>
              cell.trim(),
            )
            .filter(Boolean),
        );

    case "heading":
    case "divider":
      return [];
  }
}

function readableTexts(
  blocks:
    readonly FixedReportRichBlock[],
): readonly string[] {
  return blocks
    .flatMap(getBlockText)
    .map((value) =>
      value
        .replace(/\s+/g, " ")
        .trim(),
    )
    .filter(Boolean);
}

function cardsFromBlocks(
  blocks:
    readonly FixedReportRichBlock[],
  limit: number,
): readonly K68BasicReportCard[] {
  const cards:
    K68BasicReportCard[] = [];

  let currentTitle = "";

  for (const block of blocks) {
    if (cards.length >= limit) {
      break;
    }

    if (block.type === "heading") {
      currentTitle =
        block.text.trim();
      continue;
    }

    const texts =
      getBlockText(block);

    for (const text of texts) {
      if (cards.length >= limit) {
        break;
      }

      const cleanText =
        text
          .replace(/\s+/g, " ")
          .trim();

      if (!cleanText) {
        continue;
      }

      if (currentTitle) {
        cards.push({
          title: currentTitle,
          description: cleanText,
        });

        currentTitle = "";
        continue;
      }

      if (
        cards.length > 0 &&
        cards[
          cards.length - 1
        ]?.description === ""
      ) {
        continue;
      }

      cards.push({
        title: "",
        description: cleanText,
      });
    }
  }

  return cards;
}

function substantiveCardsFromBlocks(
  blocks:
    readonly FixedReportRichBlock[],
  limit: number,
  minimumLength = 35,
): readonly K68BasicReportCard[] {
  const cards:
    K68BasicReportCard[] = [];

  let currentTitle = "";
  let buffer:
    string[] = [];

  function flushBuffer() {
    const description =
      buffer
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();

    buffer = [];

    if (!description) {
      return;
    }

    if (
      description.length <
        minimumLength &&
      cards.length > 0
    ) {
      const previous =
        cards[
          cards.length - 1
        ];

      if (previous) {
        cards[
          cards.length - 1
        ] = {
          ...previous,
          description:
            `${previous.description} ${description}`
              .replace(
                /\s+/g,
                " ",
              )
              .trim(),
        };
      }

      return;
    }

    cards.push({
      title:
        currentTitle,
      description,
    });
  }

  for (const block of blocks) {
    if (
      cards.length >= limit
    ) {
      break;
    }

    if (
      block.type === "heading"
    ) {
      flushBuffer();

      currentTitle =
        block.text.trim();

      continue;
    }

    if (
      block.type === "divider"
    ) {
      flushBuffer();
      currentTitle = "";
      continue;
    }

    for (
      const text of
      getBlockText(block)
    ) {
      const cleanText =
        text
          .replace(
            /\s+/g,
            " ",
          )
          .trim();

      if (!cleanText) {
        continue;
      }

      buffer.push(
        cleanText,
      );

      const accumulated =
        buffer
          .join(" ")
          .trim();

      if (
        accumulated.length >=
        minimumLength
      ) {
        flushBuffer();

        if (
          cards.length >=
          limit
        ) {
          break;
        }
      }
    }
  }

  flushBuffer();

  return cards
    .filter(
      (card) =>
        card.description
          .trim()
          .length >=
        minimumLength,
    )
    .slice(
      0,
      limit,
    );
}

function mergeUniqueCards(
  groups:
    readonly (
      readonly K68BasicReportCard[]
    )[],
  limit: number,
): readonly K68BasicReportCard[] {
  const result:
    K68BasicReportCard[] = [];

  const seen =
    new Set<string>();

  for (const group of groups) {
    for (const card of group) {
      const key =
        card.description
          .replace(
            /\s+/g,
            " ",
          )
          .trim();

      if (
        !key ||
        seen.has(key)
      ) {
        continue;
      }

      seen.add(key);
      result.push(card);

      if (
        result.length >= limit
      ) {
        return result;
      }
    }
  }

  return result;
}

function sectionBlocks(
  sectionMap: ReadonlyMap<
    K68ProfessionalReportSectionId,
    {
      readonly id:
        K68ProfessionalReportSectionId;
      readonly blocks:
        readonly FixedReportRichBlock[];
    }
  >,
  id:
    K68ProfessionalReportSectionId,
): readonly FixedReportRichBlock[] {
  return (
    sectionMap.get(id)?.blocks ??
    []
  );
}

function titleForDomain(
  domain: K68BasicDomainId,
  locale: K68ReportLocale,
): string {
  return DOMAIN_LABELS[
    domain
  ][locale];
}

function fallbackDomainDescription(
  domain: K68BasicDomainId,
  locale: K68ReportLocale,
): string {
  const descriptions: Readonly<
    Record<
      K68BasicDomainId,
      {
        readonly zh: string;
        readonly en: string;
      }
    >
  > = {
    think: {
      zh: "更容易被原因、规律、比较和解释吸引，常希望知道事情为什么会这样，以及不同信息之间有什么联系。",
      en: "More readily drawn to causes, patterns, comparisons, and explanations, often wanting to understand why something works the way it does.",
    },
    discover: {
      zh: "更容易被新鲜信息、未知现象和继续追问吸引，遇到感兴趣的事物时往往愿意进一步寻找答案。",
      en: "More readily drawn to new information, unfamiliar phenomena, and further questions, often wanting to keep looking for answers.",
    },
    build: {
      zh: "更容易通过制作、组合、搭建和实际操作保持投入，通常喜欢看到想法逐步变成一个可以使用或观察的结果。",
      en: "More readily engaged through making, assembling, building, and hands-on work, especially when ideas become something tangible.",
    },
    create: {
      zh: "更容易通过画面、语言、故事、音乐或其他形式表达想法和感受，并在创造属于自己的内容时保持兴趣。",
      en: "More readily engaged through visual, verbal, narrative, musical, or other forms of expression and creating something personally meaningful.",
    },
    connect: {
      zh: "更容易在交流、合作、分享和共同完成事情的过程中产生兴趣，并会关注他人的反应、想法与互动。",
      en: "More readily engaged through communication, cooperation, sharing, and doing things with others while noticing people's responses and ideas.",
    },
    move: {
      zh: "更容易在身体参与、户外活动、空间移动、节奏或动态体验中保持兴趣，并通过行动直接感受环境。",
      en: "More readily engaged through physical participation, outdoor activity, spatial movement, rhythm, and dynamic experiences.",
    },
  };

  return descriptions[
    domain
  ][locale];
}

function extractDomainDescription(
  blocks: readonly FixedReportRichBlock[],
  domain: K68BasicDomainId,
  locale: K68ReportLocale,
): string {
  const labels = [
    DOMAIN_LABELS[domain].zh,
    DOMAIN_LABELS[domain].en,
  ];

  let matchedHeading = false;

  for (const block of blocks) {
    if (block.type === "heading") {
      const heading =
        block.text
          .replace(/[*_`]/g, "")
          .trim()
          .toLowerCase();

      const isDomainHeading =
        labels.some(
          (label) =>
            heading.includes(
              label.toLowerCase(),
            ),
        );

      if (isDomainHeading) {
        matchedHeading = true;
        continue;
      }

      if (matchedHeading) {
        break;
      }

      continue;
    }

    if (!matchedHeading) {
      continue;
    }

    const candidate =
      getBlockText(block)
        .map((value) =>
          value
            .replace(/\s+/g, " ")
            .trim(),
        )
        .find(
          (value) =>
            value.length >= 20,
        );

    if (candidate) {
      return candidate;
    }
  }

  return fallbackDomainDescription(
    domain,
    locale,
  );
}

function buildDimensions(
  facts: K68ReportFacts,
  locale: K68ReportLocale,
  dimensionBlocks:
    readonly FixedReportRichBlock[],
): readonly K68BasicReportDimension[] {
  const ranked =
    K68_BASIC_DOMAIN_ORDER
      .map((domain) => ({
        id: domain,
        score:
          normalizeScore(
            facts.scores[domain],
          ),
      }))
      .sort(
        (left, right) => {
          const scoreDifference =
            right.score -
            left.score;

          if (
            scoreDifference !== 0
          ) {
            return scoreDifference;
          }

          return (
            K68_BASIC_DOMAIN_ORDER.indexOf(
              left.id,
            ) -
            K68_BASIC_DOMAIN_ORDER.indexOf(
              right.id,
            )
          );
        },
      );

  const rankMap =
    new Map<
      K68BasicDomainId,
      number
    >(
      ranked.map(
        (entry, index) => [
          entry.id,
          index + 1,
        ],
      ),
    );

  return K68_BASIC_DOMAIN_ORDER.map(
    (domain) => ({
      id: domain,
      title:
        titleForDomain(
          domain,
          locale,
        ),
      description:
        extractDomainDescription(
          dimensionBlocks,
          domain,
          locale,
        ),
      score:
        normalizeScore(
          facts.scores[domain],
        ),
      rank:
        rankMap.get(domain) ?? 6,
    }),
  );
}

function premiumSectionTitle(
  id:
    K68ProfessionalReportSectionId,
  locale:
    K68ReportLocale,
): string {
  const titles: Partial<
    Record<
      K68ProfessionalReportSectionId,
      {
        readonly zh: string;
        readonly en: string;
      }
    >
  > = {
    "behavior-evidence": {
      zh: "行为证据",
      en: "Behaviour Evidence",
    },
    "six-domain-interest-map": {
      zh: "完整六维结构",
      en: "Full Six-Domain Structure",
    },
    "interest-combination": {
      zh: "兴趣组合",
      en: "Interest Combination",
    },
    "exploration-environment": {
      zh: "探索环境",
      en: "Exploration Environment",
    },
    "current-interest-pattern": {
      zh: "参与方式",
      en: "Engagement Pattern",
    },
    "parent-observation-plan": {
      zh: "家长观察计划",
      en: "Parent Observation Plan",
    },
    "what-to-explore-next": {
      zh: "下一步探索",
      en: "What to Explore Next",
    },
    "methodology-and-boundaries": {
      zh: "方法与边界",
      en: "Methodology & Boundaries",
    },
  };

  const entry =
    titles[id];

  return entry
    ? entry[locale]
    : id;
}

export function buildK68BasicReport({
  facts,
  report,
  locale,
}: BuildK68BasicReportInput): K68BasicReport {
  const sections =
    assembleK68ReportSections(
      report,
      locale,
    );

  const sectionMap =
    new Map(
      sections.map(
        (section) => [
          section.id,
          section,
        ],
      ),
    );

  const sixDomainBlocks =
    sectionBlocks(
      sectionMap,
      "six-domain-interest-map",
    );

  const dimensions =
    buildDimensions(
      facts,
      locale,
      sixDomainBlocks,
    );

  const rankedDimensions =
    [...dimensions].sort(
      (left, right) =>
        left.rank - right.rank,
    );

  const primary =
    rankedDimensions[0];

  const secondary =
    rankedDimensions[1];

  const combinationTitle =
    primary && secondary
      ? `${primary.title} + ${secondary.title}`
      : localize(
          locale,
          "当前兴趣方向",
          "Current Interest Direction",
        );

  const overviewBlocks =
    sectionBlocks(
      sectionMap,
      "parent-executive-summary",
    );

  /*
   * The professional executive summary begins with
   * a score table. The basic-report Overview must
   * interpret the result, not repeat table cells as
   * narrative text.
   *
   * Therefore only paragraph / blockquote narrative
   * content enters this section.
   */
  const overviewNarrativeTexts =
    overviewBlocks
      .flatMap(
        (block) => {
          if (
            block.type !== "paragraph" &&
            block.type !== "blockquote"
          ) {
            return [];
          }

          const value =
            block.text
              .replace(/\\s+/g, " ")
              .trim();

          return value
            ? [value]
            : [];
        },
      );

  const primaryOverviewText =
    overviewNarrativeTexts
      .slice(0, 3)
      .join(" ")
      .replace(/\\s+/g, " ")
      .trim();

  const meaningOverviewText =
    overviewNarrativeTexts
      .slice(3)
      .join(" ")
      .replace(/\\s+/g, " ")
      .trim();

  const overviewHeadline =
    localize(
      locale,
      `孩子目前更容易在「${combinationTitle}」相关活动中产生持续兴趣。`,
      `The child currently shows stronger and more sustained interest around ${combinationTitle}.`,
    );

  const overviewParagraphs =
    [
      primaryOverviewText ||
        localize(
          locale,
          `「${combinationTitle}」是这次测评中目前最值得继续观察的兴趣组合。`,
          `${combinationTitle} is the interest combination currently most worth continuing to observe.`,
        ),

      meaningOverviewText ||
        localize(
          locale,
          "真正值得关注的不是两个分数本身，而是这些兴趣过程是否会在真实活动中反复共同出现。",
          "What matters is not the two scores themselves, but whether these interest processes repeatedly appear together in real activities.",
        ),
    ];

  const overviewSummary =
    localize(
      locale,
      "这份结果更适合用来决定下一步可以给孩子提供什么体验、观察哪些行为，而不是把孩子固定在某一种兴趣标签或能力判断里。",
      "Use this result to decide what experiences to offer next and what behaviours to observe, rather than fixing the child into an interest label or ability judgement.",
    );

  const combinationTexts =
    readableTexts(
      sectionBlocks(
        sectionMap,
        "interest-combination",
      ),
    );

  const combinationParagraphs =
    combinationTexts
      .slice(0, 3);

  const combinationSummary =
    combinationTexts[3] ??
    combinationTexts[
      combinationTexts.length - 1
    ] ??
    localize(
      locale,
      "这个组合描述的是当前更容易共同出现的兴趣方向，应通过后续真实活动和重复观察继续验证，而不是作为固定标签。",
      "This combination describes interests that currently tend to appear together and should be explored through real activities and repeated observation rather than treated as a fixed label.",
    );

  const highlightedSignalCards =
    substantiveCardsFromBlocks(
      sectionBlocks(
        sectionMap,
        "highlighted-interest-signals",
      ),
      4,
      35,
    );

  const engagementSignalCards =
    substantiveCardsFromBlocks(
      sectionBlocks(
        sectionMap,
        "exploration-environment",
      ),
      4,
      35,
    );

  const coreSignals =
    mergeUniqueCards(
      [
        highlightedSignalCards,
        engagementSignalCards,
      ],
      4,
    );

  const engagementPatterns =
    substantiveCardsFromBlocks(
      sectionBlocks(
        sectionMap,
        "exploration-environment",
      ),
      4,
      30,
    );

  const parentObservation =
    substantiveCardsFromBlocks(
      sectionBlocks(
        sectionMap,
        "parent-observation-plan",
      ),
      4,
      30,
    );

  const nextExplorationCards =
    substantiveCardsFromBlocks(
      sectionBlocks(
        sectionMap,
        "what-to-explore-next",
      ),
      2,
      30,
    );

  const explorationEnvironmentCards =
    substantiveCardsFromBlocks(
      sectionBlocks(
        sectionMap,
        "exploration-environment",
      ),
      6,
      30,
    );

  const explorationDirections =
    mergeUniqueCards(
      [
        nextExplorationCards.map(
          (card) => ({
            ...card,
            title:
              card.title ||
              localize(
                locale,
                "先从短而真实的活动开始",
                "Start with short, real activities",
              ),
          }),
        ),
        explorationEnvironmentCards,
      ],
      4,
    );

  const premiumSectionIds:
    readonly K68ProfessionalReportSectionId[] =
      [
        "behavior-evidence",
        "six-domain-interest-map",
        "interest-combination",
        "exploration-environment",
        "current-interest-pattern",
        "parent-observation-plan",
        "what-to-explore-next",
        "methodology-and-boundaries",
      ];

  const premiumSections =
    premiumSectionIds.map(
      (id) => {
        const texts =
          readableTexts(
            sectionBlocks(
              sectionMap,
              id,
            ),
          );

        return {
          id,
          title:
            premiumSectionTitle(
              id,
              locale,
            ),
          description:
            texts[0] ??
            localize(
              locale,
              "完整报告中提供进一步解释。",
              "Explored in greater depth in the full report.",
            ),
        };
      },
    );

  const keywordDomains =
    rankedDimensions
      .slice(0, 4)
      .map(
        (dimension) =>
          dimension.title,
      );

  return {
    identity: {
      title:
        combinationTitle,
      subtitle:
        localize(
          locale,
          "孩子当前的主要兴趣组合",
          "Current Primary Interest Combination",
        ),
      keywords:
        keywordDomains,
    },

    interpretationProfile: {
      title:
        localize(
          locale,
          "兴趣解释路径",
          "Interest Profile",
        ),
      name:
        localize(
          locale,
          "Current Interest Profile｜当前兴趣画像",
          "Current Interest Profile",
        ),
      description:
        localize(
          locale,
          "用于组织当前兴趣结果的解释方式，不代表能力、天赋或发展等级。",
          "This profile organizes how the current interest result is interpreted; it is not a level of ability, talent, or development.",
        ),
      explorationTheme: {
        title:
          localize(
            locale,
            "探索主题",
            "Exploration Theme",
          ),
        name:
          localize(
            locale,
            "Explore & Observe｜探索与观察",
            "Explore & Observe",
          ),
        description:
          localize(
            locale,
            "通过真实活动和重复观察，确认哪些兴趣会持续出现。",
            "Use real activities and repeated observation to see which interests continue to appear.",
          ),
      },
    },

    overview: {
      headline:
        overviewHeadline,
      paragraphs:
        overviewParagraphs,
      summary:
        overviewSummary,
    },

    combinationInsight: {
      title:
        combinationTitle,
      paragraphs:
        combinationParagraphs.length >= 2
          ? combinationParagraphs
          : [
              localize(
                locale,
                `${combinationTitle} 同时出现时，孩子可能既愿意接触新的信息和现象，也愿意继续追问原因、规律和不同信息之间的联系。`,
                `When ${combinationTitle} appears together, the child may be interested both in encountering new information and in continuing to ask about causes, patterns, and connections.`,
              ),
              localize(
                locale,
                "这种组合更值得通过不同类型的真实活动继续观察：孩子是否会主动开始、是否愿意重复，以及兴趣是否会从发现进一步发展到理解。",
                "This combination is best explored through varied real activities: whether the child starts voluntarily, repeats the activity, and moves from discovering something toward understanding it.",
              ),
            ],
      summary:
        combinationSummary,
    },

    coreSignals,

    dimensions,

    engagementPatterns,

    parentObservation,

    explorationDirections,

    premiumPreview: {
      headline:
        localize(
          locale,
          "继续深入理解孩子的兴趣结构。",
          "Understand the child's interest structure in greater depth.",
        ),
      introduction:
        localize(
          locale,
          "完整专业报告进一步连接行为证据、六维兴趣结构、兴趣组合、探索环境与家长观察计划。",
          "The full professional report connects behavioural evidence, the six-domain interest structure, interest combinations, exploration environments, and the parent observation plan.",
        ),
      sections:
        premiumSections,
    },
  };
}
