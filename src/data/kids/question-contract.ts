import type {
  RequiredLocalizedText,
} from "../assessment/questions/schema";

import {
  KIDS_ASSESSMENT_MODULE,
  KIDS_RELEASE_FORMS,
  type KidsDomain,
  type KidsForm,
  type KidsReleaseId,
} from "./schema";

import type {
  KidsVisualBinding,
} from "./visual-contract";

/**
 * Runtime question identity.
 *
 * Frozen editorial/source IDs are preserved separately as sourceItemId.
 * Runtime IDs are normalized into the generic assessment namespace:
 *
 *   source:  K912-BUILD-03
 *   runtime: kids-k912-build-03
 *
 * This prevents the frontend/runtime identifier from changing the
 * authoritative editorial identity used by release forms and manifests.
 */
export type KidsRuntimeQuestionId = `kids-${string}`;

export interface KidsQuestionContract {
  /**
   * Runtime-safe lowercase assessment identifier.
   */
  readonly id: KidsRuntimeQuestionId;

  /**
   * Frozen editorial/source identity from the Kids release form.
   */
  readonly sourceItemId: string;

  readonly module: typeof KIDS_ASSESSMENT_MODULE;
  readonly form: KidsForm;
  readonly releaseId: KidsReleaseId;

  /**
   * Final display/scoring order inside the frozen release form.
   */
  readonly order: number;

  readonly domain: KidsDomain;
  readonly prompt: RequiredLocalizedText;

  /**
   * Visual support is explicit.
   *
   * A question may intentionally have no illustration.
   */
  readonly visual: KidsVisualBinding;
}

/**
 * Convert a frozen editorial/source ID into a runtime-safe ID.
 *
 * The function deliberately does not reinterpret the meaning of the
 * source ID. It only normalizes case and separators.
 */
export function createKidsRuntimeQuestionId(
  sourceItemId: string,
): KidsRuntimeQuestionId {
  const normalized = sourceItemId
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (!normalized) {
    throw new Error(
      "Kids source item ID must produce a non-empty runtime identifier.",
    );
  }

  return `kids-${normalized}`;
}

export function getExpectedKidsReleaseId(
  form: KidsForm,
): KidsReleaseId {
  return KIDS_RELEASE_FORMS[form].releaseId;
}

/**
 * Validate only cross-field identity invariants.
 *
 * Full question-bank validation will be added when the frozen
 * K68/K912 release items are imported.
 */
export function validateKidsQuestionIdentity(
  question: KidsQuestionContract,
): readonly string[] {
  const issues: string[] = [];

  if (question.module !== KIDS_ASSESSMENT_MODULE) {
    issues.push(
      `module must be "${KIDS_ASSESSMENT_MODULE}".`,
    );
  }

  if (question.releaseId !== getExpectedKidsReleaseId(question.form)) {
    issues.push(
      `releaseId does not match form "${question.form}".`,
    );
  }

  if (!Number.isInteger(question.order) || question.order <= 0) {
    issues.push(
      "order must be an integer greater than 0.",
    );
  }

  const expectedRuntimeId =
    createKidsRuntimeQuestionId(question.sourceItemId);

  if (question.id !== expectedRuntimeId) {
    issues.push(
      `id must equal normalized source identity "${expectedRuntimeId}".`,
    );
  }

  if (
    question.visual.support !== "none" &&
    question.visual.assetId !== question.sourceItemId
  ) {
    issues.push(
      "visual.assetId must match sourceItemId.",
    );
  }

  return Object.freeze(issues);
}
