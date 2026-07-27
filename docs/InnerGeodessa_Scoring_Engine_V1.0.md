# InnerGeodessa Scoring Engine V1.0

## Raw scoring

Likert:
1 Strongly Disagree
2 Disagree
3 Neutral
4 Agree
5 Strongly Agree

For positively keyed items:
Score = raw

For opposite keyed pole:
Score = 6 - raw

## Dimension calculation

EI = E total - I total
SN = S total - N total
TF = T total - F total
JP = J total - P total

Positive value = first pole.
Negative value = second pole.

## Type generation

E/I
+
S/N
+
T/F
+
J/P

↓

One of 16 personality types.

## Confidence Index

confidence = absolute(dimension difference) / maximum possible difference

Report:
- Type
- Four dimension scores
- Confidence for each dimension
- Short interpretation

Psychometric statistics (alpha, omega, CFA, IRT, DIF) are calculated from pilot datasets and are NOT used for individual scoring.
