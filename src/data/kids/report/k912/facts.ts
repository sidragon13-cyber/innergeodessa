import type { KidsResultContract } from "../../result";
import { K912_FACET_BY_ITEM_ID } from "./rules/domain-evidence";
import {
  K912_REPORT_DOMAINS,
  type K912FacetEvidence,
  type K912ReportDomainId,
  type K912ReportFacts,
  type K912ReportItemResponse,
  type K912ResponseValue,
} from "./types";

const domainSet = new Set<string>(K912_REPORT_DOMAINS);
const domainPosition = new Map(K912_REPORT_DOMAINS.map((domain, index) => [domain, index]));

function isDomain(value: unknown): value is K912ReportDomainId {
  return typeof value === "string" && domainSet.has(value);
}

function isResponseValue(value: unknown): value is K912ResponseValue {
  return value === 1 || value === 2 || value === 3 || value === 4 || value === 5;
}

function finiteFact(result: KidsResultContract, key: string, fallbackKey?: string): number {
  const value = result[key] ?? (fallbackKey ? result[fallbackKey] : undefined);
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
    throw new Error(`K912 report requires persisted ${key}.`);
  }
  return value;
}

function domainList(value: unknown, name: string): readonly K912ReportDomainId[] {
  if (!Array.isArray(value) || value.some((domain) => !isDomain(domain))) {
    throw new Error(`K912 report requires valid persisted ${name}.`);
  }
  return value as readonly K912ReportDomainId[];
}

function buildEvidence(result: KidsResultContract): {
  itemResponses: readonly K912ReportItemResponse[];
  facetEvidence: readonly K912FacetEvidence[];
  evidenceByDomain: Readonly<Record<K912ReportDomainId, readonly K912FacetEvidence[]>>;
} {
  const input = result.itemResponses;
  if (!Array.isArray(input) || input.length !== 42) {
    throw new Error("K912 Professional Report requires exactly 42 persisted item responses.");
  }
  const seenItems = new Set<string>();
  const seenOrders = new Set<number>();
  const itemResponses = input.map((candidate, index): K912ReportItemResponse => {
    if (!candidate || typeof candidate !== "object") throw new Error(`K912 response ${index + 1} is invalid.`);
    const value = candidate as Record<string, unknown>;
    const itemId = value.itemId;
    const domain = value.domain;
    const displayOrder = value.displayOrder;
    const rawValue = value.rawValue;
    if (typeof itemId !== "string" || !isDomain(domain) || !Number.isInteger(displayOrder) || (displayOrder as number) < 1 || (displayOrder as number) > 42 || !isResponseValue(rawValue)) {
      throw new Error(`K912 response ${index + 1} does not match the V2 evidence contract.`);
    }
    const definition = K912_FACET_BY_ITEM_ID.get(itemId);
    if (!definition || definition.domain !== domain) throw new Error(`K912 response ${itemId} has no matching frozen facet identity.`);
    if (seenItems.has(itemId) || seenOrders.has(displayOrder as number)) throw new Error("K912 report evidence contains duplicate item identity or order.");
    seenItems.add(itemId);
    seenOrders.add(displayOrder as number);
    return { itemId, sourceItemId: itemId, domain, facetId: definition.facetId, displayOrder: displayOrder as number, rawValue };
  }).sort((a, b) => a.displayOrder - b.displayOrder);
  itemResponses.forEach((response, index) => {
    if (response.displayOrder !== index + 1) throw new Error("K912 responses must cover display orders 1 through 42.");
  });
  const facetEvidence = itemResponses.map((response): K912FacetEvidence => {
    const definition = K912_FACET_BY_ITEM_ID.get(response.itemId)!;
    return { ...definition, displayOrder: response.displayOrder, responseValue: response.rawValue };
  });
  const evidenceByDomain = Object.fromEntries(K912_REPORT_DOMAINS.map((domain) => [domain, facetEvidence.filter((item) => item.domain === domain)])) as unknown as Record<K912ReportDomainId, readonly K912FacetEvidence[]>;
  for (const domain of K912_REPORT_DOMAINS) {
    if (evidenceByDomain[domain].length !== 7) throw new Error(`K912 report requires seven facet evidence points for ${domain}.`);
  }
  return { itemResponses, facetEvidence, evidenceByDomain };
}

export function buildK912ReportFacts(result: KidsResultContract): K912ReportFacts {
  if (result.ageForm !== "K912" || result.questionBankVersion !== "KIDS-K912-RF-V2" || result.releaseFormVersion !== "KIDS-K912-RF-V2" || result.scoringVersion !== "KIDS-SCORING-V2") {
    throw new Error("K912 Professional Report requires the K912 RF-V2 / Scoring V2 result contract.");
  }
  if (!Array.isArray(result.domainResults) || result.domainResults.length !== 6) throw new Error("K912 report requires six persisted domain results.");
  const rawScores = {} as Record<K912ReportDomainId, number>;
  const scores = {} as Record<K912ReportDomainId, number>;
  const seen = new Set<K912ReportDomainId>();
  for (const row of result.domainResults) {
    if (!isDomain(row.domainId) || seen.has(row.domainId) || !Number.isFinite(row.rawScore) || row.rawScore < 7 || row.rawScore > 35 || !Number.isFinite(row.normalisedScore) || row.normalisedScore < 0 || row.normalisedScore > 100) {
      throw new Error("K912 report received invalid persisted domain scores.");
    }
    seen.add(row.domainId);
    rawScores[row.domainId] = row.rawScore;
    scores[row.domainId] = row.normalisedScore;
  }
  const ranking = domainList(result.domainRanking, "domain ranking");
  if (ranking.length !== 6 || new Set(ranking).size !== 6) throw new Error("K912 report ranking must contain each domain once.");
  const stableRanking = [...K912_REPORT_DOMAINS].sort((a, b) => scores[b] - scores[a] || domainPosition.get(a)! - domainPosition.get(b)!);
  if (ranking.some((domain, index) => domain !== stableRanking[index])) throw new Error("K912 persisted domain ranking is inconsistent with persisted scores.");
  const exactTiesInput = result.exactTies;
  if (!Array.isArray(exactTiesInput)) throw new Error("K912 report requires persisted exact ties.");
  const exactTies = exactTiesInput.map((group) => domainList(group, "exact ties")).filter((group) => group.length > 1);
  const leadingCluster = domainList(result.leadingCluster, "leading cluster");
  const highlightedDomains = domainList(result.highlightedDomains, "highlighted domains");
  const emergingSignals = domainList(result.emergingSignals ?? [], "emerging signals");
  const evidence = buildEvidence(result);
  return {
    resultId: result.resultId, sessionId: result.sessionId, ageForm: "K912",
    questionBankVersion: "KIDS-K912-RF-V2", scoringVersion: "KIDS-SCORING-V2",
    rawScores, scores, ranking, exactTies,
    firstSecondGap: finiteFact(result, "firstSecondGap"),
    secondThirdGap: finiteFact(result, "secondThirdGap"),
    thirdFourthGap: finiteFact(result, "thirdFourthGap"),
    overallSpread: finiteFact(result, "overallSpread", "highestLowestSpread"),
    clusterGap: finiteFact(result, "clusterGap"),
    leadingCluster, highlightedDomains, emergingSignals,
    patternContext: result.patternType,
    ...evidence,
  };
}
