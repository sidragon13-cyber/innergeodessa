import type {
  K68ReportFacts,
} from "../facts";

import {
  K68_REPORT_DOMAINS,
  type K68ReportDomainId,
} from "../types";

export const K68_PRIMARY_COMBINATION_KEYS = [
  "think-discover",
  "think-build",
  "think-create",
  "think-connect",
  "think-move",
  "discover-build",
  "discover-create",
  "discover-connect",
  "discover-move",
  "build-create",
  "build-connect",
  "build-move",
  "create-connect",
  "create-move",
  "connect-move",
] as const;

export type K68PrimaryCombinationKey =
  (typeof K68_PRIMARY_COMBINATION_KEYS)[number];

export interface K68PrimaryCombination {
  readonly key: K68PrimaryCombinationKey;
  readonly domains: readonly [
    K68ReportDomainId,
    K68ReportDomainId,
  ];
}

const DOMAIN_POSITION =
  new Map<K68ReportDomainId, number>(
    K68_REPORT_DOMAINS.map(
      (domain, index) => [
        domain,
        index,
      ],
    ),
  );

const COMBINATION_KEY_SET =
  new Set<string>(
    K68_PRIMARY_COMBINATION_KEYS,
  );

export function resolveK68PrimaryCombination(
  facts: K68ReportFacts,
): K68PrimaryCombination {
  const first = facts.ranking[0];
  const second = facts.ranking[1];

  if (!first || !second) {
    throw new Error(
      "K68 Professional Report requires at least two ranked domains.",
    );
  }

  const firstPosition =
    DOMAIN_POSITION.get(first);

  const secondPosition =
    DOMAIN_POSITION.get(second);

  if (
    firstPosition === undefined ||
    secondPosition === undefined
  ) {
    throw new Error(
      "K68 Professional Report ranking contains an unsupported domain.",
    );
  }

  const domains: readonly [
    K68ReportDomainId,
    K68ReportDomainId,
  ] =
    firstPosition < secondPosition
      ? [first, second]
      : [second, first];

  const key =
    `${domains[0]}-${domains[1]}`;

  if (!COMBINATION_KEY_SET.has(key)) {
    throw new Error(
      `Unsupported K68 Professional Report combination: ${key}`,
    );
  }

  return {
    key:
      key as K68PrimaryCombinationKey,
    domains,
  };
}
