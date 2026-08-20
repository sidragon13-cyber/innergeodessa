import {
  KIDS_FORMS,
  KIDS_RELEASE_FORMS,
  type KidsForm,
  type KidsReleaseId,
} from "./schema";

import {
  validateKidsQuestionIdentity,
  type KidsQuestionContract,
} from "./question-contract";

import {
  K68_PRESENTATION_ORDER_SHA256,
  K68_QUESTION_COUNT,
  K68_QUESTION_DATA_SHA256,
  K68_RELEASE_ID,
  K912_PRESENTATION_ORDER_SHA256,
  K912_QUESTION_COUNT,
  K912_QUESTION_DATA_SHA256,
  K912_RELEASE_ID,
  k68Questions,
  k912Questions,
} from "./questions";

export interface KidsQuestionFormDefinition {
  readonly form: KidsForm;
  readonly releaseId: KidsReleaseId;
  readonly questionCount: number;
  readonly presentationOrderSha256: string;
  readonly questionDataSha256: string;
  readonly questions: readonly KidsQuestionContract[];
}

export const KIDS_QUESTION_FORM_REGISTRY = {
  k68: {
    form: "k68",
    releaseId: K68_RELEASE_ID,
    questionCount: K68_QUESTION_COUNT,
    presentationOrderSha256:
      K68_PRESENTATION_ORDER_SHA256,
    questionDataSha256:
      K68_QUESTION_DATA_SHA256,
    questions: k68Questions,
  },

  k912: {
    form: "k912",
    releaseId: K912_RELEASE_ID,
    questionCount: K912_QUESTION_COUNT,
    presentationOrderSha256:
      K912_PRESENTATION_ORDER_SHA256,
    questionDataSha256:
      K912_QUESTION_DATA_SHA256,
    questions: k912Questions,
  },
} as const satisfies Readonly<
  Record<KidsForm, KidsQuestionFormDefinition>
>;

export interface KidsQuestionFormRegistryValidationResult {
  readonly valid: boolean;
  readonly issues: readonly string[];
}

export function getKidsQuestionFormDefinition(
  form: KidsForm,
): KidsQuestionFormDefinition {
  return KIDS_QUESTION_FORM_REGISTRY[form];
}

export function getKidsQuestionsForForm(
  form: KidsForm,
): readonly KidsQuestionContract[] {
  return getKidsQuestionFormDefinition(form).questions;
}

export function validateKidsQuestionFormRegistry():
  KidsQuestionFormRegistryValidationResult {
  const issues: string[] = [];

  for (const form of KIDS_FORMS) {
    const definition =
      KIDS_QUESTION_FORM_REGISTRY[form];

    const releaseConfig =
      KIDS_RELEASE_FORMS[form];

    if (definition.form !== form) {
      issues.push(
        `${form}: registry form identity mismatch.`,
      );
    }

    if (
      definition.releaseId !==
      releaseConfig.releaseId
    ) {
      issues.push(
        `${form}: releaseId does not match release-form config.`,
      );
    }

    if (
      definition.questionCount !==
      definition.questions.length
    ) {
      issues.push(
        `${form}: questionCount does not match question array length.`,
      );
    }

    if (
      definition.questionCount !==
      releaseConfig.scoredItemCount
    ) {
      issues.push(
        `${form}: question count does not match frozen release count.`,
      );
    }

    if (
      !/^[0-9a-f]{64}$/.test(
        definition.presentationOrderSha256,
      )
    ) {
      issues.push(
        `${form}: invalid presentation-order SHA256.`,
      );
    }

    if (
      !/^[0-9a-f]{64}$/.test(
        definition.questionDataSha256,
      )
    ) {
      issues.push(
        `${form}: invalid question-data SHA256.`,
      );
    }

    const expectedOrders =
      Array.from(
        {
          length:
            definition.questions.length,
        },
        (_, index) => index + 1,
      );

    const actualOrders =
      definition.questions.map(
        (question) => question.order,
      );

    if (
      actualOrders.length !==
        expectedOrders.length ||
      actualOrders.some(
        (order, index) =>
          order !== expectedOrders[index],
      )
    ) {
      issues.push(
        `${form}: question order must be sequential from 1.`,
      );
    }

    const runtimeIds = new Set<string>();
    const sourceIds = new Set<string>();

    const domainCounts =
      new Map<string, number>();

    for (
      const question
      of definition.questions
    ) {
      if (question.form !== form) {
        issues.push(
          `${form}: ${question.sourceItemId} has wrong form.`,
        );
      }

      if (
        question.releaseId !==
        definition.releaseId
      ) {
        issues.push(
          `${form}: ${question.sourceItemId} has wrong releaseId.`,
        );
      }

      if (runtimeIds.has(question.id)) {
        issues.push(
          `${form}: duplicate runtime ID ${question.id}.`,
        );
      }

      runtimeIds.add(question.id);

      if (
        sourceIds.has(
          question.sourceItemId,
        )
      ) {
        issues.push(
          `${form}: duplicate source Item ID ${question.sourceItemId}.`,
        );
      }

      sourceIds.add(
        question.sourceItemId,
      );

      domainCounts.set(
        question.domain,
        (
          domainCounts.get(
            question.domain,
          ) ?? 0
        ) + 1,
      );

      const identityIssues =
        validateKidsQuestionIdentity(
          question,
        );

      for (
        const identityIssue
        of identityIssues
      ) {
        issues.push(
          `${form}: ${question.sourceItemId}: ${identityIssue}`,
        );
      }
    }

    const expectedDomainCount =
      releaseConfig.scoredItemCount /
      releaseConfig.scoredItemsPerDomain;

    if (
      domainCounts.size !==
      expectedDomainCount
    ) {
      issues.push(
        `${form}: expected exactly ${expectedDomainCount} domains.`,
      );
    }

    for (
      const [
        domain,
        count,
      ]
      of domainCounts
    ) {
      if (
        count !==
        releaseConfig.scoredItemsPerDomain
      ) {
        issues.push(
          `${form}: domain ${domain} has ${count} items; ` +
          `expected ${releaseConfig.scoredItemsPerDomain}.`,
        );
      }
    }
  }

  return {
    valid: issues.length === 0,
    issues: Object.freeze(issues),
  };
}
