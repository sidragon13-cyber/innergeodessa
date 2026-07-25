import type {
  AssessmentQuestion,
  AssessmentQuestionId,
} from "../schema";
import { personalityQuestionBank } from "./questions";

export interface PersonalityQuestionSourceMapping {
  questionId: AssessmentQuestionId;
  sourceItemId: string;
}

export interface PersonalitySourceMappingValidationIssue {
  path: string;
  message: string;
}

export interface PersonalitySourceMappingValidationResult {
  valid: boolean;
  issues: PersonalitySourceMappingValidationIssue[];
}

export const personalityQuestionSourceMappings = Object.freeze([
  Object.freeze({
    questionId: "personality-001",
    sourceItemId: "P-EI-PROCESS-001",
  }),
  Object.freeze({
    questionId: "personality-002",
    sourceItemId: "P-SN-EVIDENCE-001",
  }),
  Object.freeze({
    questionId: "personality-003",
    sourceItemId: "P-TF-EVALUATION-001",
  }),
  Object.freeze({
    questionId: "personality-004",
    sourceItemId: "P-JP-PLANNING-001",
  }),
  Object.freeze({
    questionId: "personality-005",
    sourceItemId: "P-EI-ENERGY-003",
  }),
  Object.freeze({
    questionId: "personality-006",
    sourceItemId: "P-EI-STIMULATION-002",
  }),
  Object.freeze({
    questionId: "personality-007",
    sourceItemId: "P-SN-DETAIL-005",
  }),
  Object.freeze({
    questionId: "personality-008",
    sourceItemId: "P-SN-APPLICATION-001",
  }),
  Object.freeze({
    questionId: "personality-009",
    sourceItemId: "P-TF-DECISION-004",
  }),
  Object.freeze({
    questionId: "personality-010",
    sourceItemId: "P-TF-FEEDBACK-001",
  }),
  Object.freeze({
    questionId: "personality-011",
    sourceItemId: "P-JP-PLANNING-006",
  }),
  Object.freeze({
    questionId: "personality-012",
    sourceItemId: "P-JP-CLOSURE-001",
  }),
  Object.freeze({
    questionId: "personality-013",
    sourceItemId: "P-EI-INITIATION-005",
  }),
  Object.freeze({
    questionId: "personality-014",
    sourceItemId: "P-EI-BREADTH-002",
  }),
  Object.freeze({
    questionId: "personality-015",
    sourceItemId: "P-EI-EXPRESSION-003",
  }),
  Object.freeze({
    questionId: "personality-016",
    sourceItemId: "P-SN-CONNECTION-004",
  }),
  Object.freeze({
    questionId: "personality-017",
    sourceItemId: "P-SN-TIME-001",
  }),
  Object.freeze({
    questionId: "personality-018",
    sourceItemId: "P-SN-CHANGE-006",
  }),
  Object.freeze({
    questionId: "personality-019",
    sourceItemId: "P-TF-CONFLICT-006",
  }),
  Object.freeze({
    questionId: "personality-020",
    sourceItemId: "P-TF-COMMUNICATION-001",
  }),
  Object.freeze({
    questionId: "personality-021",
    sourceItemId: "P-TF-COMMUNICATION-004",
  }),
  Object.freeze({
    questionId: "personality-022",
    sourceItemId: "P-JP-SCHEDULING-006",
  }),
  Object.freeze({
    questionId: "personality-023",
    sourceItemId: "P-JP-ADAPTABILITY-001",
  }),
  Object.freeze({
    questionId: "personality-024",
    sourceItemId: "P-JP-TASKFLOW-006",
  }),
Object.freeze({
    questionId: "personality-025",
    sourceItemId: "P-EI-PROCESS-007",
  }),
  Object.freeze({
    questionId: "personality-026",
    sourceItemId: "P-SN-DETAIL-007",
  }),
  Object.freeze({
    questionId: "personality-027",
    sourceItemId: "P-TF-CONSISTENCY-007",
  }),
  Object.freeze({
    questionId: "personality-028",
    sourceItemId: "P-JP-PLANNING-007",
  }),
  Object.freeze({
    questionId: "personality-029",
    sourceItemId: "P-EI-ENERGY-008",
  }),
  Object.freeze({
    questionId: "personality-030",
    sourceItemId: "P-SN-POSSIBILITY-008",
  }),
  Object.freeze({
    questionId: "personality-031",
    sourceItemId: "P-TF-CONTEXT-008",
  }),
  Object.freeze({
    questionId: "personality-032",
    sourceItemId: "P-JP-OPENNESS-008",
  }),
  Object.freeze({
    questionId: "personality-033",
    sourceItemId: "P-EI-INITIATION-009",
  }),
  Object.freeze({
    questionId: "personality-034",
    sourceItemId: "P-SN-EXAMPLE-009",
  }),
  Object.freeze({
    questionId: "personality-035",
    sourceItemId: "P-TF-ANALYSIS-009",
  }),
  Object.freeze({
    questionId: "personality-036",
    sourceItemId: "P-JP-TASKFLOW-009",
  }),
  Object.freeze({
    questionId: "personality-037",
    sourceItemId: "P-EI-OBSERVATION-010",
  }),
  Object.freeze({
    questionId: "personality-038",
    sourceItemId: "P-SN-MEANING-010",
  }),
  Object.freeze({
    questionId: "personality-039",
    sourceItemId: "P-TF-FEEDBACK-010",
  }),
  Object.freeze({
    questionId: "personality-040",
    sourceItemId: "P-JP-ADAPTABILITY-010",
  }),
  Object.freeze({
    questionId: "personality-041",
    sourceItemId: "P-EI-INITIATION-011",
  }),
  Object.freeze({
    questionId: "personality-042",
    sourceItemId: "P-SN-EVIDENCE-011",
  }),
  Object.freeze({
    questionId: "personality-043",
    sourceItemId: "P-TF-REASONING-011",
  }),
  Object.freeze({
    questionId: "personality-044",
    sourceItemId: "P-JP-DEADLINE-011",
  }),
  Object.freeze({
    questionId: "personality-045",
    sourceItemId: "P-EI-DEPTH-012",
  }),
  Object.freeze({
    questionId: "personality-046",
    sourceItemId: "P-SN-INTERPRETATION-012",
  }),
  Object.freeze({
    questionId: "personality-047",
    sourceItemId: "P-TF-CIRCUMSTANCE-012",
  }),
  Object.freeze({
    questionId: "personality-048",
    sourceItemId: "P-JP-FLEXIBILITY-012",
  }),
  Object.freeze({
    questionId: "personality-049",
    sourceItemId: "P-EI-SHARING-013",
  }),
  Object.freeze({
    questionId: "personality-050",
    sourceItemId: "P-SN-PROCEDURE-013",
  }),
  Object.freeze({
    questionId: "personality-051",
    sourceItemId: "P-TF-EXPLANATION-013",
  }),
  Object.freeze({
    questionId: "personality-052",
    sourceItemId: "P-JP-OUTCOME-013",
  }),
  Object.freeze({
    questionId: "personality-053",
    sourceItemId: "P-EI-REFLECTION-014",
  }),
  Object.freeze({
    questionId: "personality-054",
    sourceItemId: "P-SN-POSSIBILITY-014",
  }),
  Object.freeze({
    questionId: "personality-055",
    sourceItemId: "P-TF-HARMONY-014",
  }),
  Object.freeze({
    questionId: "personality-056",
    sourceItemId: "P-JP-FLEXIBILITY-014",
  }),
  Object.freeze({
    questionId: "personality-057",
    sourceItemId: "P-EI-RESPONSE-015",
  }),
  Object.freeze({
    questionId: "personality-058",
    sourceItemId: "P-SN-MEMORY-015",
  }),
  Object.freeze({
    questionId: "personality-059",
    sourceItemId: "P-TF-EVIDENCE-015",
  }),
  Object.freeze({
    questionId: "personality-060",
    sourceItemId: "P-JP-TRACKING-015",
  }),
  Object.freeze({
    questionId: "personality-061",
    sourceItemId: "P-EI-ENERGY-016",
  }),
  Object.freeze({
    questionId: "personality-062",
    sourceItemId: "P-SN-PATTERN-016",
  }),
  Object.freeze({
    questionId: "personality-063",
    sourceItemId: "P-TF-EMPATHY-016",
  }),
  Object.freeze({
    questionId: "personality-064",
    sourceItemId: "P-JP-EMERGENCE-016",
  }),
  Object.freeze({
    questionId: "personality-065",
    sourceItemId: "P-EI-STIMULATION-017",
  }),
  Object.freeze({
    questionId: "personality-066",
    sourceItemId: "P-SN-OBSERVATION-017",
  }),
  Object.freeze({
    questionId: "personality-067",
    sourceItemId: "P-TF-STANDARD-017",
  }),
  Object.freeze({
    questionId: "personality-068",
    sourceItemId: "P-JP-DEADLINE-017",
  }),
  Object.freeze({
    questionId: "personality-069",
    sourceItemId: "P-EI-SELECTIVITY-018",
  }),
  Object.freeze({
    questionId: "personality-070",
    sourceItemId: "P-SN-FUTURE-018",
  }),
  Object.freeze({
    questionId: "personality-071",
    sourceItemId: "P-TF-COMPASSION-018",
  }),
  Object.freeze({
    questionId: "personality-072",
    sourceItemId: "P-JP-SPONTANEITY-018",
  }),
] as const satisfies readonly PersonalityQuestionSourceMapping[]);

export function getSourceItemIdByQuestionId(
  questionId: AssessmentQuestionId,
): string | undefined {
  return personalityQuestionSourceMappings.find(
    (mapping) => mapping.questionId === questionId,
  )?.sourceItemId;
}

export function getQuestionIdBySourceItemId(
  sourceItemId: string,
): AssessmentQuestionId | undefined {
  const normalizedSourceItemId = sourceItemId.trim();

  if (!normalizedSourceItemId) {
    return undefined;
  }

  return personalityQuestionSourceMappings.find(
    (mapping) =>
      mapping.sourceItemId === normalizedSourceItemId,
  )?.questionId;
}

export function validatePersonalityQuestionSourceMappings(
  mappings: readonly PersonalityQuestionSourceMapping[] =
    personalityQuestionSourceMappings,
  questions: readonly AssessmentQuestion[] =
    personalityQuestionBank,
): PersonalitySourceMappingValidationResult {
  const issues: PersonalitySourceMappingValidationIssue[] = [];
  const questionIds = new Set<string>();
  const sourceItemIds = new Set<string>();
  const bankQuestionIds = new Set<AssessmentQuestionId>(
    questions.map(({ id }) => id),
  );

  if (mappings.length === 0) {
    addIssue(
      issues,
      "mappings",
      "mappings must contain at least one source mapping.",
    );
  }

  mappings.forEach((mapping, index) => {
    validateMappingFields(mapping, index, issues);
    validateMappingUniqueness(
      mapping,
      index,
      questionIds,
      sourceItemIds,
      issues,
    );

    if (
      mapping.questionId.trim() &&
      !bankQuestionIds.has(mapping.questionId)
    ) {
      const path = `mappings[${index}].questionId`;
      addIssue(
        issues,
        path,
        `${path} must reference a question in personalityQuestionBank.`,
      );
    }
  });

  validateQuestionBankCoverage(questions, questionIds, issues);

  return {
    valid: issues.length === 0,
    issues,
  };
}

function validateMappingFields(
  mapping: PersonalityQuestionSourceMapping,
  index: number,
  issues: PersonalitySourceMappingValidationIssue[],
): void {
  const path = `mappings[${index}]`;

  if (!mapping.questionId.trim()) {
    addIssue(
      issues,
      `${path}.questionId`,
      `${path}.questionId must not be empty.`,
    );
  }

  if (!mapping.sourceItemId.trim()) {
    addIssue(
      issues,
      `${path}.sourceItemId`,
      `${path}.sourceItemId must not be empty.`,
    );
  }
}

function validateMappingUniqueness(
  mapping: PersonalityQuestionSourceMapping,
  index: number,
  questionIds: Set<string>,
  sourceItemIds: Set<string>,
  issues: PersonalitySourceMappingValidationIssue[],
): void {
  const path = `mappings[${index}]`;

  validateUniqueValue(
    mapping.questionId,
    `${path}.questionId`,
    questionIds,
    issues,
  );
  validateUniqueValue(
    mapping.sourceItemId,
    `${path}.sourceItemId`,
    sourceItemIds,
    issues,
  );
}

function validateUniqueValue(
  value: string,
  path: string,
  seenValues: Set<string>,
  issues: PersonalitySourceMappingValidationIssue[],
): void {
  if (seenValues.has(value)) {
    addIssue(
      issues,
      path,
      `${path} must be unique; received duplicate "${value}".`,
    );
    return;
  }

  seenValues.add(value);
}

function validateQuestionBankCoverage(
  questions: readonly AssessmentQuestion[],
  mappedQuestionIds: ReadonlySet<string>,
  issues: PersonalitySourceMappingValidationIssue[],
): void {
  questions.forEach((question, index) => {
    if (mappedQuestionIds.has(question.id)) {
      return;
    }

    const path = `personalityQuestionBank[${index}].id`;
    addIssue(
      issues,
      path,
      `${path} must have a source mapping.`,
    );
  });
}

function addIssue(
  issues: PersonalitySourceMappingValidationIssue[],
  path: string,
  message: string,
): void {
  issues.push({ path, message });
}
