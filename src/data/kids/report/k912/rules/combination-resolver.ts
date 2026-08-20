import type { K912ReportFacts, K912ReportDomainId } from "../types";
import { K912_REPORT_DOMAINS } from "../types";

export const K912_COMBINATION_KEYS = [
  "think-discover", "think-build", "think-create", "think-connect", "think-move",
  "discover-build", "discover-create", "discover-connect", "discover-move",
  "build-create", "build-connect", "build-move", "create-connect", "create-move", "connect-move",
] as const;
export type K912CombinationKey = (typeof K912_COMBINATION_KEYS)[number];
const positions = new Map(K912_REPORT_DOMAINS.map((domain, index) => [domain, index]));
const legal = new Set<string>(K912_COMBINATION_KEYS);

export interface K912Combination {
  readonly key: K912CombinationKey;
  readonly domains: readonly [K912ReportDomainId, K912ReportDomainId];
  readonly primary: K912ReportDomainId;
  readonly secondary: K912ReportDomainId;
}

export function resolveK912Combination(facts: K912ReportFacts): K912Combination {
  const first = facts.ranking[0];
  const second = facts.ranking[1];
  if (!first || !second || first === second) throw new Error("K912 report requires two distinct ranked domains.");
  const domains = (positions.get(first)! < positions.get(second)! ? [first, second] : [second, first]) as readonly [K912ReportDomainId, K912ReportDomainId];
  const key = `${domains[0]}-${domains[1]}`;
  if (!legal.has(key)) throw new Error(`Unsupported K912 combination: ${key}`);
  return {
    key: key as K912CombinationKey,
    domains,
    primary: first,
    secondary: second,
  };
}
