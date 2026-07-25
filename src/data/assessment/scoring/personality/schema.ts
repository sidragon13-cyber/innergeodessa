import type {
  PersonalityDimension,
  PersonalityType,
} from "../../personality";

export type PersonalityDimensionScores = Readonly<
  Record<PersonalityDimension, number>
>;

export interface PersonalityScoreContract {
  type: PersonalityType;
  scores: PersonalityDimensionScores;
  confidence: PersonalityDimensionScores;
  answered: PersonalityDimensionScores;
  tie_rule: string;
}
