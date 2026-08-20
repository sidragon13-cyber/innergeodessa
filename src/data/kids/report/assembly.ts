import {
  parseFixedReportMarkdown,
  type FixedReportRichBlock,
} from "@/data/report/fixed-assets/fixed-report-rich-content";

import {
  K68_REPORT_DOMAINS,
  type K68ReportDomainId,
} from "./types";

import type {
  GeneratedK68ProfessionalReport,
  K68ProfessionalReportSectionId,
} from "./generator";

export type K68ReportLocale =
  | "en"
  | "zh";

export interface AssembledK68ReportSection {
  readonly id:
    K68ProfessionalReportSectionId;

  readonly blocks:
    readonly FixedReportRichBlock[];
}

const DOMAIN_LABELS: Readonly<
  Record<
    K68ReportDomainId,
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

const ZH_SHARED_NUMBERED_HEADING_LABELS:
  Readonly<
    Record<
      string,
      string
    >
  > = {
    "1. Spontaneous Initiation":
      "1. 主动开始",

    "2. Willingness to Repeat":
      "2. 是否愿意重复",

    "3. Prediction Before Action":
      "3. 行动前预测",

    "4. Comparison After Action":
      "4. 行动后比较",

    "5. Question Continuation":
      "5. 是否继续产生问题",

    "6. Which Domain Leads?":
      "6. 哪个兴趣方向先出现",

    "7. Response to Unexpected Results":
      "7. 面对意外结果时的反应",

    "8. Cross-Context Persistence":
      "8. 跨情境持续性",

    "9. Adult-Prompt Dependence":
      "9. 对成人提示的依赖",

    "10. Persistence Over Time":
      "10. 随时间持续",
  };

function localiseSharedHeading(
  title: string,
  locale:
    K68ReportLocale,
): string {
  if (
    locale !== "zh"
  ) {
    return title;
  }

  return (
    ZH_SHARED_NUMBERED_HEADING_LABELS[
      title
    ] ??
    title
  );
}

function domainLabel(
  domain:
    K68ReportDomainId,
  locale:
    K68ReportLocale,
): string {
  return DOMAIN_LABELS[
    domain
  ][locale];
}

function stripInternalComments(
  markdown: string,
): string {
  return markdown
    .replace(
      /<!--[\s\S]*?-->/g,
      "",
    )
    .replace(
      /^\s*VALIDATION_SCENARIO:.*$/gim,
      "",
    )
    .replace(
      /^\s*MANUAL_VALIDATION_COMBINATION:.*$/gim,
      "",
    )
    .replace(
      /^\s*Validation Status:.*$/gim,
      "",
    )
    .replace(
      /^\s*Purpose:.*$/gim,
      "",
    );
}

function extractTopLevelSection(
  markdown: string,
  headingPrefix: string,
): string {
  const lines =
    markdown
      .replace(/\r\n?/g, "\n")
      .split("\n");

  const start =
    lines.findIndex(
      (line) =>
        line.startsWith(
          `# ${headingPrefix}`,
        ),
    );

  if (start < 0) {
    throw new Error(
      `K68 report source section not found: ${headingPrefix}`,
    );
  }

  let end =
    lines.length;

  for (
    let index =
      start + 1;
    index < lines.length;
    index += 1
  ) {
    if (
      lines[index]!
        .startsWith(
          "# ",
        )
    ) {
      end = index;
      break;
    }
  }

  return lines
    .slice(
      start + 1,
      end,
    )
    .join("\n")
    .trim();
}

function extractFragment(
  markdown: string,
  fragmentTitle: string,
): string {
  return extractTopLevelSection(
    markdown,
    fragmentTitle,
  );
}

function localiseMarkedMarkdown(
  markdown: string,
  locale:
    K68ReportLocale,
): string {
  const selectedMarker =
    locale === "zh"
      ? "ZH"
      : "EN";

  const lines =
    markdown
      .replace(/\r\n?/g, "\n")
      .split("\n");

  const output:
    string[] = [];

  let localeActive:
    boolean | null =
      null;

  let localeHeadingLevel:
    number | null =
      null;

  for (
    const line
    of lines
  ) {
    const trimmed =
      line.trim();

    const localeHeading =
      trimmed.match(
        /^(#{2,3})\s+(EN|ZH)(?:\s+—\s*(.*))?$/,
      );

    if (localeHeading) {
      const level =
        localeHeading[1]!
          .length;

      localeActive =
        localeHeading[2] ===
        selectedMarker;

      localeHeadingLevel =
        level;

      const localizedTitle =
        localeHeading[3]
          ?.trim();

      if (
        localeActive &&
        localizedTitle
      ) {
        output.push(
          `${"#".repeat(
            level,
          )} ${localizedTitle}`,
        );
      }

      continue;
    }

    const localeLabel =
      trimmed.match(
        /^(EN|ZH):\s*(.*)$/,
      );

    if (localeLabel) {
      localeActive =
        localeLabel[1] ===
        selectedMarker;

      localeHeadingLevel =
        null;

      const remainder =
        localeLabel[2]
          ?.trim();

      if (
        localeActive &&
        remainder
      ) {
        output.push(
          remainder,
        );
      }

      continue;
    }

    const heading =
      trimmed.match(
        /^(#{1,3})\s+(.+)$/,
      );

    if (heading) {
      const headingLevel =
        heading[1]!
          .length;

      if (
        localeHeadingLevel !==
          null &&
        headingLevel <=
          localeHeadingLevel
      ) {
        localeActive =
          null;

        localeHeadingLevel =
          null;
      } else if (
        localeHeadingLevel ===
          null
      ) {
        localeActive =
          null;
      }

      if (
        localeActive !==
        false
      ) {
        output.push(
          `${heading[1]} ${localiseSharedHeading(
            heading[2]!.trim(),
            locale,
          )}`,
        );
      }

      continue;
    }

    if (
      localeActive ===
      false
    ) {
      continue;
    }

    output.push(
      line,
    );
  }

  return output
    .join("\n")
    .trim();
}

function localiseDomainTerms(
  markdown: string,
  locale:
    K68ReportLocale,
): string {
  let resolved =
    markdown;

  for (
    const domain
    of K68_REPORT_DOMAINS
  ) {
    const en =
      DOMAIN_LABELS[
        domain
      ].en;

    const zh =
      DOMAIN_LABELS[
        domain
      ].zh;

    const replacement =
      locale === "zh"
        ? zh
        : en;

    resolved =
      resolved.replaceAll(
        `${en}｜${zh}`,
        replacement,
      );

    if (
      locale === "zh"
    ) {
      resolved =
        resolved.replace(
          new RegExp(
            `\\b${en}\\b`,
            "g",
          ),
          zh,
        );
    } else {
      resolved =
        resolved.replaceAll(
          zh,
          en,
        );
    }
  }

  return resolved;
}

function cleanLocalizedSource(
  markdown: string,
  locale:
    K68ReportLocale,
): string {
  return localiseDomainTerms(
    localiseMarkedMarkdown(
      stripInternalComments(
        markdown,
      ),
      locale,
    ),
    locale,
  )
    .replace(
      /^\s*---\s*$/gm,
      "\n---\n",
    )
    .trim();
}

function extractMotherIdentity(
  markdown: string,
  locale:
    K68ReportLocale,
): string {
  const section =
    stripInternalComments(
      extractTopLevelSection(
        markdown,
        "01｜",
      ),
    );

  const zhMarker =
    "### 这份报告回答什么问题？";

  const enMarker =
    "### What this report is designed to do";

  if (
    locale === "zh"
  ) {
    const start =
      section.indexOf(
        zhMarker,
      );

    const end =
      section.indexOf(
        enMarker,
      );

    const selected =
      start >= 0
        ? section.slice(
            start,
            end >= 0
              ? end
              : undefined,
          )
        : section;

    return localiseDomainTerms(
      selected,
      locale,
    ).trim();
  }

  const start =
    section.indexOf(
      enMarker,
    );

  const selected =
    start >= 0
      ? section.slice(
          start,
        )
      : section;

  return localiseDomainTerms(
    selected,
    locale,
  ).trim();
}

function buildScoreTable(
  report:
    GeneratedK68ProfessionalReport,
  locale:
    K68ReportLocale,
): string {
  const header =
    locale === "zh"
      ? [
          "| 兴趣方向 | 分数 |",
          "|---|---:|",
        ]
      : [
          "| Interest Domain | Score |",
          "|---|---:|",
        ];

  const rows =
    report.domainRanking.map(
      (domain) =>
        `| ${domainLabel(
          domain,
          locale,
        )} | ${Math.round(
          report.scores[
            domain
          ],
        )} |`,
    );

  return [
    ...header,
    ...rows,
  ].join("\n");
}

function buildRankingSummary(
  report:
    GeneratedK68ProfessionalReport,
  locale:
    K68ReportLocale,
): string {
  const ordered =
    report.domainRanking
      .map(
        (domain) =>
          `${domainLabel(
            domain,
            locale,
          )} ${Math.round(
            report.scores[
              domain
            ],
          )}`,
      )
      .join(
        locale === "zh"
          ? " → "
          : " → ",
      );

  if (
    locale === "zh"
  ) {
    return [
      "### 本次兴趣结构",
      "",
      "本次结果按照当前兴趣分数排序为：",
      "",
      `> **${ordered}**`,
      "",
      "这个排序描述的是本次活动偏好之间的相对位置。",
      "",
      "它不是能力排名，也不表示较低分数的方向缺少能力或发展潜力。",
    ].join("\n");
  }

  return [
    "### Current Interest Structure",
    "",
    "The current interest scores rank as follows:",
    "",
    `> **${ordered}**`,
    "",
    "This ordering describes the relative position of the current activity-interest signals.",
    "",
    "It is not an ability ranking and does not imply that lower-scoring domains lack capability or future potential.",
  ].join("\n");
}

function getDomainFragment(
  report:
    GeneratedK68ProfessionalReport,
  domain:
    K68ReportDomainId,
  fragment:
    | "Parent-Facing Summary Fragment"
    | "Highlighted Signal Fragment"
    | "Broader Context Fragment",
  locale:
    K68ReportLocale,
): string {
  return cleanLocalizedSource(
    extractFragment(
      report.sources
        .domains[
          domain
        ]
        .markdown,
      fragment,
    ),
    locale,
  );
}

function getDomainSection(
  report:
    GeneratedK68ProfessionalReport,
  domain:
    K68ReportDomainId,
  sectionPrefix:
    "D05 —"
    | "D10 —",
  locale:
    K68ReportLocale,
): string {
  return cleanLocalizedSource(
    extractTopLevelSection(
      report.sources
        .domains[
          domain
        ]
        .markdown,
      sectionPrefix,
    ),
    locale,
  );
}

function getCombinationFragment(
  report:
    GeneratedK68ProfessionalReport,
  fragment:
    | "Combination Summary Fragment"
    | "Evidence Context Fragment"
    | "Exploration Fragment"
    | "Boundary Fragment",
  locale:
    K68ReportLocale,
): string {
  return cleanLocalizedSource(
    extractFragment(
      report.sources
        .combination
        .markdown,
      fragment,
    ),
    locale,
  );
}

function getCombinationSection(
  report:
    GeneratedK68ProfessionalReport,
  sectionPrefix:
    | "C02 —"
    | "C09 —"
    | "C10 —",
  locale:
    K68ReportLocale,
): string {
  const source =
    extractTopLevelSection(
      report.sources
        .combination
        .markdown,
      sectionPrefix,
    );

  if (
    sectionPrefix ===
      "C09 —" &&
    locale === "zh"
  ) {
    const firstDivider =
      source.indexOf(
        "\n---",
      );

    const observationBody =
      firstDivider >= 0
        ? source.slice(
            firstDivider,
          )
        : source;

    const primaryDomains =
      report.primaryCombination
        .domains;

    const localizedPreamble = [
      `提供“${domainLabel(
        primaryDomains[0],
        locale,
      )} + ${domainLabel(
        primaryDomains[1],
        locale,
      )}”相关活动后，`,
      "家长应观察重复出现的行为，而不是根据一次成功回答下结论。",
    ].join("\n");

    return [
      localizedPreamble,
      "",
      cleanLocalizedSource(
        observationBody,
        locale,
      ),
    ]
      .join("\n")
      .trim();
  }

  return cleanLocalizedSource(
    source,
    locale,
  );
}

function buildSixDomainSection(
  report:
    GeneratedK68ProfessionalReport,
  locale:
    K68ReportLocale,
): string {
  const parts:
    string[] = [
      locale === "zh"
        ? "InnerGeo Kids K68 使用六个兴趣方向描述儿童当前活动偏好。"
        : "InnerGeo Kids K68 uses six interest domains to describe the child's current activity preferences.",
      "",
      buildScoreTable(
        report,
        locale,
      ),
  ];

  for (
    const domain
    of report.domainRanking
  ) {
    parts.push(
      "",
      "---",
      "",
      `### ${domainLabel(
        domain,
        locale,
      )} — ${Math.round(
        report.scores[
          domain
        ],
      )}`,
      "",
      getDomainFragment(
        report,
        domain,
        "Parent-Facing Summary Fragment",
        locale,
      ),
    );
  }

  return parts.join("\n");
}

function buildHighlightedSection(
  report:
    GeneratedK68ProfessionalReport,
  locale:
    K68ReportLocale,
): string {
  const leading =
    report.domainRanking.slice(
      0,
      2,
    );

  return leading
    .map(
      (domain) =>
        [
          `### ${domainLabel(
            domain,
            locale,
          )} — ${Math.round(
            report.scores[
              domain
            ],
          )}`,
          "",
          getDomainFragment(
            report,
            domain,
            "Highlighted Signal Fragment",
            locale,
          ),
        ].join("\n"),
    )
    .join(
      "\n\n---\n\n",
    );
}

function buildBroaderContextSection(
  report:
    GeneratedK68ProfessionalReport,
  locale:
    K68ReportLocale,
): string {
  return report.domainRanking
    .slice(
      2,
    )
    .map(
      (domain) =>
        [
          `### ${domainLabel(
            domain,
            locale,
          )} — ${Math.round(
            report.scores[
              domain
            ],
          )}`,
          "",
          getDomainFragment(
            report,
            domain,
            "Broader Context Fragment",
            locale,
          ),
        ].join("\n"),
    )
    .join(
      "\n\n---\n\n",
    );
}

function buildEvidenceSection(
  report:
    GeneratedK68ProfessionalReport,
  locale:
    K68ReportLocale,
): string {
  const rows =
    report.domainRanking.map(
      (domain) => {
        const responses =
          report.itemResponses.filter(
            (response) =>
              response.domain ===
              domain,
          );

        const rawTotal =
          responses.reduce(
            (
              total,
              response,
            ) =>
              total +
              response.rawValue,
            0,
          );

        if (
          locale === "zh"
        ) {
          return `- ${domainLabel(
            domain,
            locale,
          )}：已记录 ${responses.length} 个回答；原始总分 ${rawTotal}；标准化分数 ${Math.round(
            report.scores[
              domain
            ],
          )}`;
        }

        return `- ${domainLabel(
          domain,
          locale,
        )}: ${responses.length} responses recorded; raw total ${rawTotal}; normalised score ${Math.round(
          report.scores[
            domain
          ],
        )}`;
      },
    );

  return [
    locale === "zh"
      ? "### 本次答题证据"
      : "### Response Evidence",
    "",
    ...(locale === "zh"
      ? [
          "本节只总结本次真实答题记录，不把单个回答解释成能力或固定特征。",
        ]
      : [
          "This section summarises the recorded responses without treating any single answer as evidence of ability or a fixed trait.",
        ]),
    "",
    ...rows,
    "",
    "---",
    "",
    getCombinationFragment(
      report,
      "Evidence Context Fragment",
      locale,
    ),
  ].join("\n");
}

function buildExplorationEnvironment(
  report:
    GeneratedK68ProfessionalReport,
  locale:
    K68ReportLocale,
): string {
  return report.domainRanking
    .slice(
      0,
      2,
    )
    .map(
      (domain) =>
        [
          `### ${domainLabel(
            domain,
            locale,
          )}`,
          "",
          getDomainSection(
            report,
            domain,
            "D05 —",
            locale,
          ),
        ].join("\n"),
    )
    .join(
      "\n\n---\n\n",
    );
}

function buildMethodologySection(
  report:
    GeneratedK68ProfessionalReport,
  locale:
    K68ReportLocale,
): string {
  const leading =
    report.domainRanking.slice(
      0,
      2,
    );

  return [
    locale === "zh"
      ? "### 如何理解本报告"
      : "### How to Interpret This Report",
    "",
    locale === "zh"
      ? `本报告基于 ${report.questionBankVersion} 题库与 ${report.scoringVersion} 评分结果，以六维兴趣分数、相对排序、真实答题记录以及冻结的专业解释模块进行确定性装配。`
      : `This report is deterministically assembled from the ${report.questionBankVersion} question bank, ${report.scoringVersion} scoring results, six-domain scores, relative ranking, recorded responses, and frozen professional interpretation modules.`,
    "",
    ...leading.flatMap(
      (domain) => [
        `### ${domainLabel(
          domain,
          locale,
        )}`,
        "",
        getDomainSection(
          report,
          domain,
          "D10 —",
          locale,
        ),
        "",
      ],
    ),
    "---",
    "",
    getCombinationSection(
      report,
      "C10 —",
      locale,
    ),
  ].join("\n");
}

function toBlocks(
  markdown: string,
): readonly FixedReportRichBlock[] {
  const cleaned =
    markdown
      .replace(
        /<!--[\s\S]*?-->/g,
        "",
      )
      .replace(
        /^\s*VALIDATION_SCENARIO:.*$/gim,
        "",
      )
      .replace(
        /^\s*MANUAL_VALIDATION_COMBINATION:.*$/gim,
        "",
      )
      .replace(
        /\n{3,}/g,
        "\n\n",
      )
      .trim();

  if (
    !cleaned
  ) {
    throw new Error(
      "K68 assembled report section is empty.",
    );
  }

  return parseFixedReportMarkdown(
    cleaned,
  ).blocks;
}

export function assembleK68ReportSections(
  report:
    GeneratedK68ProfessionalReport,
  locale:
    K68ReportLocale,
): readonly AssembledK68ReportSection[] {
  const combinationSummary =
    getCombinationFragment(
      report,
      "Combination Summary Fragment",
      locale,
    );

  const combinationMeaning =
    getCombinationSection(
      report,
      "C02 —",
      locale,
    );

  const combinationBoundary =
    getCombinationFragment(
      report,
      "Boundary Fragment",
      locale,
    );

  const sections:
    readonly {
      readonly id:
        K68ProfessionalReportSectionId;

      readonly markdown:
        string;
    }[] = [
      {
        id:
          "report-identity",

        markdown:
          extractMotherIdentity(
            report.sources
              .mother
              .markdown,
            locale,
          ),
      },

      {
        id:
          "parent-executive-summary",

        markdown: [
          locale === "zh"
            ? "### 本次结果概览"
            : "### Current Result Overview",
          "",
          buildScoreTable(
            report,
            locale,
          ),
          "",
          locale === "zh"
            ? "### 当前主要兴趣组合"
            : "### Primary Interest Combination",
          "",
          combinationSummary,
        ].join("\n"),
      },

      {
        id:
          "six-domain-interest-map",

        markdown:
          buildSixDomainSection(
            report,
            locale,
          ),
      },

      {
        id:
          "current-interest-pattern",

        markdown: [
          buildRankingSummary(
            report,
            locale,
          ),
          "",
          "---",
          "",
          getCombinationFragment(
            report,
            "Evidence Context Fragment",
            locale,
          ),
        ].join("\n"),
      },

      {
        id:
          "highlighted-interest-signals",

        markdown:
          buildHighlightedSection(
            report,
            locale,
          ),
      },

      {
        id:
          "behavior-evidence",

        markdown:
          buildEvidenceSection(
            report,
            locale,
          ),
      },

      {
        id:
          "interest-combination",

        markdown: [
          combinationMeaning,
          "",
          "---",
          "",
          combinationBoundary,
        ].join("\n"),
      },

      {
        id:
          "broader-interest-context",

        markdown:
          buildBroaderContextSection(
            report,
            locale,
          ),
      },

      {
        id:
          "exploration-environment",

        markdown:
          buildExplorationEnvironment(
            report,
            locale,
          ),
      },

      {
        id:
          "what-to-explore-next",

        markdown:
          getCombinationFragment(
            report,
            "Exploration Fragment",
            locale,
          ),
      },

      {
        id:
          "parent-observation-plan",

        markdown:
          getCombinationSection(
            report,
            "C09 —",
            locale,
          ),
      },

      {
        id:
          "methodology-and-boundaries",

        markdown:
          buildMethodologySection(
            report,
            locale,
          ),
      },
    ];

  return sections.map(
    (
      section,
    ): AssembledK68ReportSection => ({
      id:
        section.id,

      blocks:
        toBlocks(
          section.markdown,
        ),
    }),
  );
}
