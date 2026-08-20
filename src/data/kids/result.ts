export interface KidsDomainResult {
  domainId: string;
  rawScore: number;
  normalisedScore: number;
  exactTie?: boolean;
  highlighted?: boolean;

  [key: string]: unknown;
}

export interface KidsResultContract {
  resultId: string;
  sessionId: string;
  module: "kids";
  status: "completed" | string;
  completedAt?: string | null;
  calculatedAt?: string | null;

  ageForm: "K68" | "K912";
  questionBankVersion: string;
  releaseFormVersion: string;
  scoringVersion: string;

  patternType: string;

  leadingCluster: string[];
  highlightedDomains: string[];
  emergingSignals?: string[];

  domainRawScores?: Record<string, number>;
  domainNormalisedScores?: Record<string, number>;
  domainNormalizedScores?: Record<string, number>;

  domainRanking?: string[];
  exactTies?: unknown[];
  domainResults: KidsDomainResult[];

  [key: string]: unknown;
}

type KidsResultResponse =
  | KidsResultContract
  | {
      error?: string;
    };

export async function fetchKidsResult(
  sessionId: string,
): Promise<KidsResultContract> {
  const response = await fetch(
    `/api/sessions/${encodeURIComponent(sessionId)}/result`,
    {
      cache: "no-store",
    },
  );

  const payload: KidsResultResponse =
    await response.json();

  if (
    !response.ok ||
    !("module" in payload) ||
    payload.module !== "kids"
  ) {
    const backendError =
      "error" in payload &&
      typeof payload.error === "string"
        ? payload.error
        : undefined;

    throw new Error(
      backendError ??
        "Unable to load the Kids Interest Discovery result.",
    );
  }

  let expectedScoringVersion: string;
  let expectedDomainCount: number;

  if (
    payload.ageForm === "K68" &&
    payload.questionBankVersion === "KIDS-K68-RF-V2" &&
    payload.releaseFormVersion === "KIDS-K68-RF-V2"
  ) {
    expectedScoringVersion = "KIDS-SCORING-V2";
    expectedDomainCount = 6;
  } else if (
    payload.ageForm === "K68" &&
    payload.questionBankVersion === "KIDS-K68-RF-V1" &&
    payload.releaseFormVersion === "KIDS-K68-RF-V1"
  ) {
    // Historical K68 V1 results remain readable.
    expectedScoringVersion = "KIDS-SCORING-V1";
    expectedDomainCount = 8;
  } else if (
    payload.ageForm === "K912" &&
    payload.questionBankVersion === "KIDS-K912-RF-V2" &&
    payload.releaseFormVersion === "KIDS-K912-RF-V2"
  ) {
    expectedScoringVersion = "KIDS-SCORING-V2";
    expectedDomainCount = 6;
  } else if (
    payload.ageForm === "K912" &&
    payload.questionBankVersion === "KIDS-K912-RF-V1" &&
    payload.releaseFormVersion === "KIDS-K912-RF-V1"
  ) {
    // Historical K912 V1 results remain readable.
    expectedScoringVersion = "KIDS-SCORING-V1";
    expectedDomainCount = 8;
  } else {
    throw new Error(
      "The Kids result does not match a supported release contract.",
    );
  }

  const domainResultsValid =
    Array.isArray(payload.domainResults) &&
    payload.domainResults.length === expectedDomainCount &&
    payload.domainResults.every(
      (domain) =>
        domain !== null &&
        typeof domain === "object" &&
        typeof domain.domainId === "string" &&
        typeof domain.rawScore === "number" &&
        typeof domain.normalisedScore === "number",
    );

  if (
    payload.scoringVersion !== expectedScoringVersion ||
    !domainResultsValid
  ) {
    throw new Error(
      "The Kids result does not match the current scoring contract.",
    );
  }

  return payload;
}
