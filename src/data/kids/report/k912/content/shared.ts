import { K912_DOMAIN_LABELS, type K912CombinationPack, type K912DomainPack, type K912DomainProfessionalContent, type K912LocalizedText, type K912ReportDomainId } from "../types";
import {
  K912_PROFESSIONAL_EN_COMBINATION_ASSETS,
  K912_PROFESSIONAL_EN_DOMAIN_ASSETS,
} from "../fixed-assets/generated-k912-professional-en-assets";

import { K912_INTERPRETATION_BOUNDARIES } from "../rules/interpretation-boundaries";

export function text(en: string, zh: string): K912LocalizedText { return { en, zh }; }

const withZh = (value: K912LocalizedText, zh?: string): K912LocalizedText =>
  zh ? { en: value.en, zh } : value;

const withEn = (value: K912LocalizedText, en?: string): K912LocalizedText =>
  en ? { en, zh: value.zh } : value;

const withOverrides = (
  value: K912LocalizedText,
  en?: string,
  zh?: string,
): K912LocalizedText =>
  withZh(withEn(value, en), zh);

interface K912DomainAuthoredZh {
  readonly interpretation?: string;
  readonly interestDrivers?: string;
  readonly behaviouralMeaning?: string;
  readonly quickExploration?: string;
  readonly miniProject?: string;
  readonly deeperExploration?: string;
  readonly childReflection?: string;
  readonly parentObservation?: string;
  readonly scientificBoundary?: string;
}

interface K912DomainProfessionalZh {
  readonly coreDefinition?: string;
  readonly facetCoverage?: string;
  readonly typicalExpression?: string;
  readonly engagementConditions?: string;
  readonly lowerEngagementConditions?: string;
  readonly commonMisreads?: string;
  readonly explorationGuidance?: string;
  readonly quickExploration?: string;
  readonly miniProject?: string;
  readonly deeperExploration?: string;
  readonly parentObservation?: string;
  readonly childReflection?: string;
  readonly interpretationBoundary?: string;
}

type K912DomainPackInput =
  Omit<K912DomainPack, "scientificBoundary" | "professional"> & {
    readonly authoredZh?: K912DomainAuthoredZh;
    readonly professionalZh?: K912DomainProfessionalZh;
  };

export function createDomainPack(input: K912DomainPackInput): K912DomainPack {
  const {
    authoredZh,
    professionalZh,
    ...base
  } = input;

  const englishProfessional = K912_PROFESSIONAL_EN_DOMAIN_ASSETS[base.domain];

  /*
   * The compact fields intentionally remain compact.
   * Full authored Primary content belongs to professional,
   * preventing the Professional Report from being flattened
   * into the Basic Report field model.
   */
  const professionalBase: K912DomainProfessionalContent = {
    coreDefinition: base.interpretation,

    facetCoverage: text(
      "Seven facets provide breadth inside this interest domain. They are evidence dimensions, not child sub-types.",
      "七个兴趣侧面用于保证这一方向的内容与证据覆盖广度，它们不是儿童子类型。",
    ),

    typicalExpression: base.behaviouralMeaning,

    engagementConditions: base.interestDrivers,

    lowerEngagementConditions: text(
      "Interest may be less visible when the activity provides little room for the processes represented by this domain.",
      "当活动缺少这一兴趣方向真正需要的参与空间时，兴趣表现可能暂时降低。",
    ),

    commonMisreads: K912_INTERPRETATION_BOUNDARIES,

    explorationGuidance: text(
      `${base.quickExploration.en} ${base.miniProject.en} ${base.deeperExploration.en}`,
      `${base.quickExploration.zh} ${base.miniProject.zh} ${base.deeperExploration.zh}`,
    ),

    quickExploration: base.quickExploration,
    miniProject: base.miniProject,
    deeperExploration: base.deeperExploration,

    parentObservation: base.parentObservation,
    childReflection: base.childReflection,

    interpretationBoundary: K912_INTERPRETATION_BOUNDARIES,
  };

  return {
    ...base,

    /*
     * Legacy compact report fields.
     * authoredZh remains accepted for compatibility, but
     * no longer expands compact fields into long B01-B10 copy.
     */
    interpretation: base.interpretation,
    interestDrivers: base.interestDrivers,
    behaviouralMeaning: base.behaviouralMeaning,
    quickExploration: base.quickExploration,
    miniProject: base.miniProject,
    deeperExploration: base.deeperExploration,
    childReflection: base.childReflection,
    parentObservation: base.parentObservation,
    scientificBoundary: K912_INTERPRETATION_BOUNDARIES,

    professional: {
      coreDefinition: withOverrides(
        professionalBase.coreDefinition,
        englishProfessional.coreDefinition,
        professionalZh?.coreDefinition ?? authoredZh?.interpretation,
      ),

      facetCoverage: withOverrides(
        professionalBase.facetCoverage,
        englishProfessional.facetCoverage,
        professionalZh?.facetCoverage,
      ),

      typicalExpression: withOverrides(
        professionalBase.typicalExpression,
        englishProfessional.typicalExpression,
        professionalZh?.typicalExpression ?? authoredZh?.behaviouralMeaning,
      ),

      engagementConditions: withOverrides(
        professionalBase.engagementConditions,
        englishProfessional.engagementConditions,
        professionalZh?.engagementConditions,
      ),

      lowerEngagementConditions: withOverrides(
        professionalBase.lowerEngagementConditions,
        englishProfessional.lowerEngagementConditions,
        professionalZh?.lowerEngagementConditions,
      ),

      commonMisreads: withOverrides(
        professionalBase.commonMisreads,
        englishProfessional.commonMisreads,
        professionalZh?.commonMisreads,
      ),

      explorationGuidance: withOverrides(
        professionalBase.explorationGuidance,
        englishProfessional.explorationGuidance,
        professionalZh?.explorationGuidance,
      ),

      quickExploration: withOverrides(
        professionalBase.quickExploration,
        englishProfessional.quickExploration,
        professionalZh?.quickExploration ?? authoredZh?.quickExploration,
      ),

      miniProject: withOverrides(
        professionalBase.miniProject,
        englishProfessional.miniProject,
        professionalZh?.miniProject ?? authoredZh?.miniProject,
      ),

      deeperExploration: withOverrides(
        professionalBase.deeperExploration,
        englishProfessional.deeperExploration,
        professionalZh?.deeperExploration ?? authoredZh?.deeperExploration,
      ),

      parentObservation: withOverrides(
        professionalBase.parentObservation,
        englishProfessional.parentObservation,
        professionalZh?.parentObservation ?? authoredZh?.parentObservation,
      ),

      childReflection: withOverrides(
        professionalBase.childReflection,
        englishProfessional.childReflection,
        professionalZh?.childReflection ?? authoredZh?.childReflection,
      ),

      interpretationBoundary: withOverrides(
        professionalBase.interpretationBoundary,
        englishProfessional.interpretationBoundary,
        professionalZh?.interpretationBoundary ?? authoredZh?.scientificBoundary,
      ),
    },
  };
}

interface K912CombinationAuthoredZh {
  readonly core?: string;
  readonly interactionLogic?: string;
  readonly realWorldExpression?: string;
  readonly exploration?: string;
  readonly childReflection?: string;
  readonly parentObservation?: string;
  readonly boundary?: string;
}

export function createCombinationPack(
  domains: readonly [K912ReportDomainId, K912ReportDomainId],
  theme: K912LocalizedText,
  processes: K912LocalizedText,
  project: K912LocalizedText,
  developmentDirection: K912LocalizedText,
  childReflection: K912LocalizedText,
  parentObservation: K912LocalizedText,
  authoredZh?: K912CombinationAuthoredZh,
): K912CombinationPack {
  const [first, second] = domains;
  const enNames = `${K912_DOMAIN_LABELS[first].en} + ${K912_DOMAIN_LABELS[second].en}`;
  const zhNames = `${K912_DOMAIN_LABELS[first].zh}＋${K912_DOMAIN_LABELS[second].zh}`;

  const key = `${first}-${second}` as keyof typeof K912_PROFESSIONAL_EN_COMBINATION_ASSETS;
  const englishAuthored = K912_PROFESSIONAL_EN_COMBINATION_ASSETS[key];

  const combinationSummary = text(
    `${enNames} currently forms a visible exploration thread: ${theme.en}`,
    `${zhNames}目前形成了一条较明显的探索线索：${theme.zh}`,
  );

  const interestDrivers = text(
    `Attention may be sustained when a task lets the child ${processes.en}`,
    `当任务允许孩子${processes.zh}时，兴趣可能更容易持续。`,
  );

  const behaviourPattern = text(
    `In real tasks, look for voluntary switching between ${K912_DOMAIN_LABELS[first].en.toLowerCase()} processes and ${K912_DOMAIN_LABELS[second].en.toLowerCase()} processes, especially after difficulty or feedback.`,
    `在真实任务中，可观察孩子是否会在${K912_DOMAIN_LABELS[first].zh}过程与${K912_DOMAIN_LABELS[second].zh}过程之间主动切换，尤其是在遇到困难或收到反馈之后。`,
  );

  const projectSuggestions = text(
    `${project.en} Start with a quick trial, extend it into a one-to-two-week mini project, and continue for four-to-eight weeks only if interest remains self-sustaining.`,
    `${project.zh} 可先快速尝试，再扩展为一至两周的小项目；只有在兴趣仍能自发持续时，才继续四至八周的深入探索。`,
  );

  return {
    key,
    domains,

    combinationSummary: withOverrides(
      combinationSummary,
      englishAuthored.core,
      authoredZh?.core,
    ),

    whyThisCombinationMatters: text(
      `This pairing matters because it links two ways of becoming engaged rather than defining a fixed child type. ${processes.en}`,
      `这一组合值得关注，因为它连接了两种投入活动的方式，而不是给孩子贴上固定类型标签。${processes.zh}`,
    ),

    interestDrivers: withOverrides(
      interestDrivers,
      englishAuthored.interactionLogic,
      authoredZh?.interactionLogic,
    ),

    behaviourPattern: withOverrides(
      behaviourPattern,
      englishAuthored.realWorldExpression,
      authoredZh?.realWorldExpression,
    ),

    developmentDirection,

    suitableEnvironment: text(
      `Use project-based settings with clear resources, time to iterate, and access to peers or mentors when useful. The environment should make both parts of ${enNames} genuinely necessary.`,
      `适合采用项目式环境：资源清楚、有迭代时间，并在需要时能获得同伴或导师支持。环境应让${zhNames}两个方向都真正参与其中。`,
    ),

    projectSuggestions: withOverrides(
      projectSuggestions,
      englishAuthored.exploration,
      authoredZh?.exploration,
    ),

    childReflection: withOverrides(
      childReflection,
      englishAuthored.childReflection,
      authoredZh?.childReflection,
    ),

    parentObservation: withOverrides(
      parentObservation,
      englishAuthored.parentObservation,
      authoredZh?.parentObservation,
    ),

    interpretationBoundary: withOverrides(
      K912_INTERPRETATION_BOUNDARIES,
      englishAuthored.boundary,
      authoredZh?.boundary,
    ),
  };
}
