import type {
  KidsResultContract,
} from "../result";

import {
  K68_REPORT_DOMAINS,
  type K68ReportDomainId,
} from "./types";

const K68_QUESTION_BANK_VERSION =
  "KIDS-K68-RF-V2" as const;

const K68_SCORING_VERSION =
  "KIDS-SCORING-V2" as const;

export type K68ReportResponseValue =
  | 1
  | 3
  | 5;

export interface K68ReportItemResponse {
  readonly itemId: string;
  readonly domain: K68ReportDomainId;
  readonly displayOrder: number;
  readonly rawValue: K68ReportResponseValue;
}

export interface K68ReportFacts {
  readonly resultId: string;
  readonly sessionId: string;

  readonly questionBankVersion:
    typeof K68_QUESTION_BANK_VERSION;

  readonly scoringVersion:
    typeof K68_SCORING_VERSION;

  readonly rawScores: Readonly<
    Record<K68ReportDomainId, number>
  >;

  readonly scores: Readonly<
    Record<K68ReportDomainId, number>
  >;

  readonly ranking:
    readonly K68ReportDomainId[];

  readonly itemResponses:
    readonly K68ReportItemResponse[];
}

const DOMAIN_SET =
  new Set<string>(
    K68_REPORT_DOMAINS,
  );

const DOMAIN_POSITION =
  new Map<K68ReportDomainId, number>(
    K68_REPORT_DOMAINS.map(
      (domain, index) => [
        domain,
        index,
      ],
    ),
  );

function isK68ReportDomain(
  value: unknown,
): value is K68ReportDomainId {
  return (
    typeof value === "string" &&
    DOMAIN_SET.has(value)
  );
}

function isK68ResponseValue(
  value: unknown,
): value is K68ReportResponseValue {
  return (
    value === 1 ||
    value === 3 ||
    value === 5
  );
}

function buildItemResponses(
  result: KidsResultContract,
): readonly K68ReportItemResponse[] {
  const input =
    result.itemResponses;

  if (
    !Array.isArray(input) ||
    input.length !== 30
  ) {
    throw new Error(
      "K68 Professional Report requires exactly 30 item responses.",
    );
  }

  const seenItemIds =
    new Set<string>();

  const seenOrders =
    new Set<number>();

  const itemResponses =
    input.map(
      (
        candidate,
        index,
      ): K68ReportItemResponse => {
        if (
          candidate === null ||
          typeof candidate !== "object"
        ) {
          throw new Error(
            `K68 report item response ${index + 1} is invalid.`,
          );
        }

        const value =
          candidate as Record<
            string,
            unknown
          >;

        const itemId =
          value.itemId;

        const domain =
          value.domain;

        const displayOrder =
          value.displayOrder;

        const rawValue =
          value.rawValue;

        if (
          typeof itemId !== "string" ||
          itemId.trim().length === 0
        ) {
          throw new Error(
            `K68 report item response ${index + 1} has an invalid itemId.`,
          );
        }

        if (
          !isK68ReportDomain(domain)
        ) {
          throw new Error(
            `K68 report item response ${index + 1} has an unsupported domain.`,
          );
        }

        if (
          typeof displayOrder !==
            "number" ||
          !Number.isInteger(
            displayOrder,
          ) ||
          displayOrder < 1 ||
          displayOrder > 30
        ) {
          throw new Error(
            `K68 report item response ${index + 1} has an invalid display order.`,
          );
        }

        if (
          !isK68ResponseValue(
            rawValue,
          )
        ) {
          throw new Error(
            `K68 report item response ${index + 1} has an invalid response value.`,
          );
        }

        if (
          seenItemIds.has(itemId)
        ) {
          throw new Error(
            `K68 Professional Report contains duplicate item response: ${itemId}.`,
          );
        }

        if (
          seenOrders.has(
            displayOrder,
          )
        ) {
          throw new Error(
            `K68 Professional Report contains duplicate display order: ${displayOrder}.`,
          );
        }

        seenItemIds.add(
          itemId,
        );

        seenOrders.add(
          displayOrder,
        );

        return {
          itemId,
          domain,
          displayOrder,
          rawValue,
        };
      },
    )
      .sort(
        (left, right) =>
          left.displayOrder -
          right.displayOrder,
      );

  itemResponses.forEach(
    (response, index) => {
      if (
        response.displayOrder !==
        index + 1
      ) {
        throw new Error(
          "K68 Professional Report item responses must cover display orders 1 through 30.",
        );
      }
    },
  );

  return itemResponses;
}

export function buildK68ReportFacts(
  result: KidsResultContract,
): K68ReportFacts {
  if (
    result.ageForm !== "K68"
  ) {
    throw new Error(
      "K68 Professional Report requires a K68 result.",
    );
  }

  if (
    result.questionBankVersion !==
      K68_QUESTION_BANK_VERSION ||
    result.releaseFormVersion !==
      K68_QUESTION_BANK_VERSION
  ) {
    throw new Error(
      "K68 Professional Report requires the K68 V2 question-bank contract.",
    );
  }

  if (
    result.scoringVersion !==
    K68_SCORING_VERSION
  ) {
    throw new Error(
      "K68 Professional Report requires KIDS-SCORING-V2.",
    );
  }

  if (
    !Array.isArray(
      result.domainResults,
    ) ||
    result.domainResults.length !==
      K68_REPORT_DOMAINS.length
  ) {
    throw new Error(
      "K68 Professional Report requires exactly six domain results.",
    );
  }

  const rawScores =
    {} as Record<
      K68ReportDomainId,
      number
    >;

  const scores =
    {} as Record<
      K68ReportDomainId,
      number
    >;

  const seenDomains =
    new Set<K68ReportDomainId>();

  for (
    const domainResult
    of result.domainResults
  ) {
    const domain =
      domainResult.domainId;

    if (
      !isK68ReportDomain(
        domain,
      )
    ) {
      throw new Error(
        `K68 Professional Report received an unsupported domain: ${domain}.`,
      );
    }

    if (
      seenDomains.has(domain)
    ) {
      throw new Error(
        `K68 Professional Report received duplicate domain results: ${domain}.`,
      );
    }

    if (
      !Number.isFinite(
        domainResult.rawScore,
      ) ||
      !Number.isFinite(
        domainResult.normalisedScore,
      )
    ) {
      throw new Error(
        `K68 Professional Report received invalid scores for ${domain}.`,
      );
    }

    seenDomains.add(
      domain,
    );

    rawScores[domain] =
      domainResult.rawScore;

    scores[domain] =
      domainResult.normalisedScore;
  }

  if (
    seenDomains.size !==
    K68_REPORT_DOMAINS.length
  ) {
    throw new Error(
      "K68 Professional Report requires all six report domains.",
    );
  }

  const ranking =
    [...K68_REPORT_DOMAINS]
      .sort(
        (
          left,
          right,
        ) => {
          const scoreDifference =
            scores[right] -
            scores[left];

          if (
            scoreDifference !== 0
          ) {
            return scoreDifference;
          }

          return (
            (
              DOMAIN_POSITION.get(
                left,
              ) ?? 0
            ) -
            (
              DOMAIN_POSITION.get(
                right,
              ) ?? 0
            )
          );
        },
      );

  const itemResponses =
    buildItemResponses(
      result,
    );

  return {
    resultId:
      result.resultId,
    sessionId:
      result.sessionId,
    questionBankVersion:
      K68_QUESTION_BANK_VERSION,
    scoringVersion:
      K68_SCORING_VERSION,
    rawScores,
    scores,
    ranking,
    itemResponses,
  };
}
