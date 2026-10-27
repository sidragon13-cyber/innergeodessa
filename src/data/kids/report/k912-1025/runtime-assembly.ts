import {
  assembleK912Chapters1025,
} from "./chapter-assembly";

import type {
  GeneratedK912ProfessionalReport,
} from "../k912/generator";

import {
  adaptK912Facts1025,
} from "./facts-adapter";

import {
  bindK912Content1025,
  renderK912VerifiedSlots1025,
  resolveK912GapCode,
  K912ContentBindingError,
  type K912Domain,
} from "./content-binding";

const GROUPS: Readonly<Record<string, string>> = {
  "think-discover": "01",
  "think-build": "02",
  "think-create": "03",
  "think-connect": "04",
  "think-move": "05",
  "discover-build": "06",
  "discover-create": "07",
  "discover-connect": "08",
  "discover-move": "09",
  "build-create": "10",
  "build-connect": "11",
  "build-move": "12",
  "create-connect": "13",
  "create-move": "14",
  "connect-move": "15",
};

function assembleWithContent(
  facts: GeneratedK912ProfessionalReport["facts"],
  bindContent: typeof bindK912Content1025,
) {
  const adapted = adaptK912Facts1025(facts);

  const pair = [adapted.first, adapted.second] as const;
  const pairKey = [...pair].sort((a, b) => {
    const order: K912Domain[] = [
      "think", "discover", "build",
      "create", "connect", "move",
    ];
    return order.indexOf(a) - order.indexOf(b);
  }).join("-");

  const group = GROUPS[pairKey];

  if (!group) {
    throw new K912ContentBindingError(
      "Unknown K912 Top2 combination",
    );
  }

  const gapCode = resolveK912GapCode(adapted.topGap);

  const content = bindContent({
    group,
    gap: adapted.topGap,
    gapCode,
  });

  const slots = renderK912VerifiedSlots1025(
    content.slots,
    adapted.verified,
    { gapCode },
    pair,
  );

  const chapters = assembleK912Chapters1025(
    content.fixed70,
    slots,
  );

  return {
    chapters,
    contentVersion: "K912-1025" as const,
    group,
    gapCode,
    facts: adapted,
    fixed: content.fixed70,
    slots,
  };
}

// Formal callers always retain the original approval gate.
export function assembleK912Content1025(
  facts: GeneratedK912ProfessionalReport["facts"],
) {
  return assembleWithContent(facts, bindK912Content1025);
}

// Explicit development QA injection; never available to production callers.
export function assembleK912DevelopmentQA1025(
  facts: GeneratedK912ProfessionalReport["facts"],
  loadReviewContent: typeof bindK912Content1025,
) {
  if (process.env.NODE_ENV !== "development") {
    throw new K912ContentBindingError("K912 development QA unavailable outside development");
  }
  return assembleWithContent(facts, loadReviewContent);
}
