import type {
  K68ReportFacts,
  K68ReportItemResponse,
} from "./facts";

import {
  K68_REPORT_DOMAINS,
  type K68ReportDomainId,
} from "./types";

import {
  resolveK68PrimaryCombination,
} from "./rules/combination-resolver";

import {
  K68_FIXED_REPORT_ASSETS,
  type K68FixedMarkdownAsset,
} from "./fixed-assets/generated-k68-report-assets";

export const K68_PROFESSIONAL_REPORT_VERSION =
  "K68-PROFESSIONAL-REPORT-V2" as const;

export const K68_PROFESSIONAL_REPORT_SECTION_IDS = [
  "report-identity",
  "parent-executive-summary",
  "six-domain-interest-map",
  "current-interest-pattern",
  "highlighted-interest-signals",
  "behavior-evidence",
  "interest-combination",
  "broader-interest-context",
  "exploration-environment",
  "what-to-explore-next",
  "parent-observation-plan",
  "methodology-and-boundaries",
] as const;

export type K68ProfessionalReportSectionId =
  (typeof K68_PROFESSIONAL_REPORT_SECTION_IDS)[number];

export interface GeneratedK68ReportSection {
  readonly id:
    K68ProfessionalReportSectionId;

  /**
   * Source-backed runtime content.
   *
   * The final page renderer can later split / format
   * the canonical Markdown without changing the
   * report-selection logic.
   */
  readonly content: string;
}

export interface GeneratedK68ProfessionalReport {
  readonly reportVersion:
    typeof K68_PROFESSIONAL_REPORT_VERSION;

  readonly resultId: string;
  readonly sessionId: string;

  readonly questionBankVersion:
    K68ReportFacts["questionBankVersion"];

  readonly scoringVersion:
    K68ReportFacts["scoringVersion"];

  readonly rawScores:
    K68ReportFacts["rawScores"];

  readonly scores:
    K68ReportFacts["scores"];

  readonly domainRanking:
    K68ReportFacts["ranking"];

  readonly primaryCombination:
    ReturnType<
      typeof resolveK68PrimaryCombination
    >;

  readonly itemResponses:
    readonly K68ReportItemResponse[];

  readonly sources: {
    readonly mother:
      K68FixedMarkdownAsset;

    readonly domains:
      Readonly<
        Record<
          K68ReportDomainId,
          K68FixedMarkdownAsset
        >
      >;

    readonly combination:
      K68FixedMarkdownAsset;
  };

  readonly sections:
    readonly GeneratedK68ReportSection[];
}

function buildDomainSources(): Readonly<
  Record<
    K68ReportDomainId,
    K68FixedMarkdownAsset
  >
> {
  return Object.fromEntries(
    K68_REPORT_DOMAINS.map(
      (domain) => [
        domain,
        K68_FIXED_REPORT_ASSETS
          .domains[domain],
      ],
    ),
  ) as Readonly<
    Record<
      K68ReportDomainId,
      K68FixedMarkdownAsset
    >
  >;
}

function joinDomainMarkdown(
  domains:
    readonly K68ReportDomainId[],
): string {
  return domains
    .map(
      (domain) =>
        K68_FIXED_REPORT_ASSETS
          .domains[domain]
          .markdown,
    )
    .join("\n\n---\n\n");
}

function buildEvidenceMarkdown(
  itemResponses:
    readonly K68ReportItemResponse[],
): string {
  return itemResponses
    .map(
      (response) =>
        [
          "-",
          response.itemId,
          `domain=${response.domain}`,
          `response=${response.rawValue}`,
          `order=${response.displayOrder}`,
        ].join(" "),
    )
    .join("\n");
}

export function generateK68ProfessionalReport(
  facts: K68ReportFacts,
): GeneratedK68ProfessionalReport {
  const primaryCombination =
    resolveK68PrimaryCombination(
      facts,
    );

  const combinationAsset =
    K68_FIXED_REPORT_ASSETS
      .combinations[
        primaryCombination.key
      ];

  const domainSources =
    buildDomainSources();

  const motherMarkdown =
    K68_FIXED_REPORT_ASSETS
      .mother
      .markdown;

  const allDomainMarkdown =
    joinDomainMarkdown(
      K68_REPORT_DOMAINS,
    );

  const leadingDomainMarkdown =
    joinDomainMarkdown(
      facts.ranking.slice(
        0,
        2,
      ),
    );

  const combinationMarkdown =
    combinationAsset.markdown;

  const evidenceMarkdown =
    buildEvidenceMarkdown(
      facts.itemResponses,
    );

  const sections:
    readonly GeneratedK68ReportSection[] =
    [
      {
        id: "report-identity",
        content: motherMarkdown,
      },
      {
        id: "parent-executive-summary",
        content: combinationMarkdown,
      },
      {
        id: "six-domain-interest-map",
        content: allDomainMarkdown,
      },
      {
        id: "current-interest-pattern",
        content: combinationMarkdown,
      },
      {
        id: "highlighted-interest-signals",
        content: leadingDomainMarkdown,
      },
      {
        id: "behavior-evidence",
        content: evidenceMarkdown,
      },
      {
        id: "interest-combination",
        content: combinationMarkdown,
      },
      {
        id: "broader-interest-context",
        content: allDomainMarkdown,
      },
      {
        id: "exploration-environment",
        content: leadingDomainMarkdown,
      },
      {
        id: "what-to-explore-next",
        content: leadingDomainMarkdown,
      },
      {
        id: "parent-observation-plan",
        content: combinationMarkdown,
      },
      {
        id: "methodology-and-boundaries",
        content: motherMarkdown,
      },
    ];

  return {
    reportVersion:
      K68_PROFESSIONAL_REPORT_VERSION,

    resultId:
      facts.resultId,

    sessionId:
      facts.sessionId,

    questionBankVersion:
      facts.questionBankVersion,

    scoringVersion:
      facts.scoringVersion,

    rawScores:
      facts.rawScores,

    scores:
      facts.scores,

    domainRanking:
      facts.ranking,

    primaryCombination,

    itemResponses:
      facts.itemResponses,

    sources: {
      mother:
        K68_FIXED_REPORT_ASSETS
          .mother,

      domains:
        domainSources,

      combination:
        combinationAsset,
    },

    sections,
  };
}
