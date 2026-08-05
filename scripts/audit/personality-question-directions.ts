import {
  personalityQuestionBank,
} from "../../src/data/assessment";

const DIMENSION_POLES = {
  EI: ["E", "I"],
  SN: ["S", "N"],
  TF: ["T", "F"],
  JP: ["J", "P"],
} as const;

for (const question of personalityQuestionBank) {
  const poles =
    DIMENSION_POLES[
      question.dimension as keyof typeof DIMENSION_POLES
    ];

  if (!poles) {
    throw new Error(
      `Unsupported dimension: ${question.dimension}`,
    );
  }

  const [firstPole, secondPole] = poles;

  const highScorePole = question.reverseScored
    ? secondPole
    : firstPole;

  const lowScorePole = question.reverseScored
    ? firstPole
    : secondPole;

  process.stdout.write(
    [
      question.id,
      question.dimension,
      `reverse=${question.reverseScored}`,
      `low→${lowScorePole}`,
      `high→${highScorePole}`,
      question.prompt.zh,
      question.prompt.en,
    ].join(" | ") + "\n",
  );
}
