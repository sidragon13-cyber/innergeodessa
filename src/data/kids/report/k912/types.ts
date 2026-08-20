export const K912_REPORT_DOMAINS = [
  "think", "discover", "build", "create", "connect", "move",
] as const;

export type K912ReportDomainId = (typeof K912_REPORT_DOMAINS)[number];
export type K912ReportLocale = "en" | "zh";
export type K912ResponseValue = 1 | 2 | 3 | 4 | 5;

export interface K912LocalizedText {
  readonly en: string;
  readonly zh: string;
}

export const K912_DOMAIN_LABELS: Readonly<Record<K912ReportDomainId, K912LocalizedText>> = {
  think: { en: "Think", zh: "思考" },
  discover: { en: "Discover", zh: "探索" },
  build: { en: "Build", zh: "构建" },
  create: { en: "Create", zh: "创造" },
  connect: { en: "Connect", zh: "联结" },
  move: { en: "Move", zh: "行动" },
};

export interface K912FacetDefinition {
  readonly itemId: string;
  readonly facetId: string;
  readonly domain: K912ReportDomainId;
  readonly facet: K912LocalizedText;
  readonly prompt: K912LocalizedText;
}

export interface K912FacetEvidence extends K912FacetDefinition {
  readonly displayOrder: number;
  readonly responseValue: K912ResponseValue;
}

export interface K912ReportItemResponse {
  readonly itemId: string;
  readonly sourceItemId: string;
  readonly domain: K912ReportDomainId;
  readonly facetId: string;
  readonly displayOrder: number;
  readonly rawValue: K912ResponseValue;
}

export interface K912ReportFacts {
  readonly resultId: string;
  readonly sessionId: string;
  readonly ageForm: "K912";
  readonly questionBankVersion: "KIDS-K912-RF-V2";
  readonly scoringVersion: "KIDS-SCORING-V2";
  readonly rawScores: Readonly<Record<K912ReportDomainId, number>>;
  readonly scores: Readonly<Record<K912ReportDomainId, number>>;
  readonly ranking: readonly K912ReportDomainId[];
  readonly exactTies: readonly (readonly K912ReportDomainId[])[];
  readonly firstSecondGap: number;
  readonly secondThirdGap: number;
  readonly thirdFourthGap: number;
  readonly overallSpread: number;
  readonly clusterGap: number;
  readonly leadingCluster: readonly K912ReportDomainId[];
  readonly highlightedDomains: readonly K912ReportDomainId[];
  readonly emergingSignals: readonly K912ReportDomainId[];
  readonly patternContext: string;
  readonly itemResponses: readonly K912ReportItemResponse[];
  readonly facetEvidence: readonly K912FacetEvidence[];
  readonly evidenceByDomain: Readonly<Record<K912ReportDomainId, readonly K912FacetEvidence[]>>;
}

export interface K912DomainProfessionalContent {
  /** B01 */
  readonly coreDefinition: K912LocalizedText;

  /** B02 */
  readonly facetCoverage: K912LocalizedText;

  /** B03 */
  readonly typicalExpression: K912LocalizedText;

  /** B04 */
  readonly engagementConditions: K912LocalizedText;

  /** B05 */
  readonly lowerEngagementConditions: K912LocalizedText;

  /** B06 */
  readonly commonMisreads: K912LocalizedText;

  /** B07 */
  readonly explorationGuidance: K912LocalizedText;
  readonly quickExploration: K912LocalizedText;
  readonly miniProject: K912LocalizedText;
  readonly deeperExploration: K912LocalizedText;

  /** B08 */
  readonly parentObservation: K912LocalizedText;

  /** B09 */
  readonly childReflection: K912LocalizedText;

  /** B10 */
  readonly interpretationBoundary: K912LocalizedText;
}

export interface K912DomainPack {
  readonly domain: K912ReportDomainId;

  /*
   * Compact fields retained for Basic Report and other
   * concise result surfaces.
   */
  readonly interpretation: K912LocalizedText;
  readonly interestDrivers: K912LocalizedText;
  readonly behaviouralMeaning: K912LocalizedText;
  readonly explorationEnvironment: K912LocalizedText;
  readonly quickExploration: K912LocalizedText;
  readonly miniProject: K912LocalizedText;
  readonly deeperExploration: K912LocalizedText;
  readonly childReflection: K912LocalizedText;
  readonly parentObservation: K912LocalizedText;
  readonly scientificBoundary: K912LocalizedText;

  /*
   * Full authored Primary content used only by the
   * K912 Professional Report.
   */
  readonly professional: K912DomainProfessionalContent;
}

export interface K912CombinationPack {
  readonly key: string;
  readonly domains: readonly [K912ReportDomainId, K912ReportDomainId];
  readonly combinationSummary: K912LocalizedText;
  readonly whyThisCombinationMatters: K912LocalizedText;
  readonly interestDrivers: K912LocalizedText;
  readonly behaviourPattern: K912LocalizedText;
  readonly developmentDirection: K912LocalizedText;
  readonly suitableEnvironment: K912LocalizedText;
  readonly projectSuggestions: K912LocalizedText;
  readonly childReflection: K912LocalizedText;
  readonly parentObservation: K912LocalizedText;
  readonly interpretationBoundary: K912LocalizedText;
}
