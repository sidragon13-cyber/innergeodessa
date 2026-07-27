import {
  personalityProfiles,
  personalityTypeCodes,
} from "../src/data/personality";

import {
  validatePersonalityProfile,
} from "../src/data/personality/validation";

let hasErrors = false;

for (const type of personalityTypeCodes) {
  const profile = personalityProfiles[type];

  if (!profile) {
    hasErrors = true;
    console.error(`\n${type}`);
    console.error("  ✗ Profile is missing from the registry");
    continue;
  }

  const result = validatePersonalityProfile(
    profile,
    type,
  );

  console.log(`\n${type}`);

  if (result.errors.length === 0) {
    console.log("  ✓ No validation errors");
  } else {
    hasErrors = true;

    for (const error of result.errors) {
      console.error(`  ✗ ${error}`);
    }
  }

  for (const warning of result.warnings) {
    console.warn(`  ⚠ ${warning}`);
  }
}

if (hasErrors) {
  process.exitCode = 1;
} else {
  console.log("\nAll 16 personality profiles are valid.");
}
