import type {
  GeneratedK912ProfessionalReport,
} from "../k912/generator";

import {
  K912ContentBindingError,
  K912_1025_DOMAINS,
  resolveK912VerifiedTokens,
  type K912Domain,
  type K912VerifiedResult,
} from "./content-binding";

/**
 * K912-1025 / TASK 1N-2
 *
 * Authority: existing K912ReportFacts.
 *
 * No scoring, no fixture, no synthetic ranking.
 * This module does not approve content assets.
 */

export type K912ExistingFacts =
  GeneratedK912ProfessionalReport["facts"];

export interface K912AdaptedFacts1025 {
  readonly verified: K912VerifiedResult;
  readonly first: K912Domain;
  readonly second: K912Domain;
  readonly topGap: number;
  readonly topTied: boolean;
  readonly thirdTiedWithSecond: boolean;
  readonly thirdLevelDomains: readonly K912Domain[];
}

export function adaptK912Facts1025(
  facts: K912ExistingFacts,
): K912AdaptedFacts1025 {
  if (!facts || !facts.scores || !facts.ranking) {
    throw new K912ContentBindingError(
      "Missing authoritative K912 report facts",
    );
  }

  const ranking = [...facts.ranking] as K912Domain[];

  const scores = Object.fromEntries(
    K912_1025_DOMAINS.map(domain => [
      domain,
      facts.scores[domain],
    ]),
  ) as Record<K912Domain, number>;

  const verified: K912VerifiedResult = {
    scores,
    ranking,
  };

  // Reuse the existing verified-result validation.
  resolveK912VerifiedTokens(verified);

  const first = ranking[0];
  const second = ranking[1];

  const secondScore = scores[second];
  const thirdScore = scores[ranking[2]];

  const thirdLevelDomains = ranking.filter(
    domain => scores[domain] === thirdScore,
  );

  return {
    verified,
    first,
    second,
    topGap: scores[first] - scores[second],
    topTied: scores[first] === scores[second],
    thirdTiedWithSecond: secondScore === thirdScore,
    thirdLevelDomains,
  };
}
