import {
  personalityProfiles,
} from "../src/data/personality";

import {
  validatePersonalityProfile,
} from "../src/data/personality/validation";

let hasErrors = false;

for (const [type, profile] of Object.entries(
  personalityProfiles,
)) {
  if (!profile) {
    continue;
  }

  const result = validatePersonalityProfile(
    profile,
    type as typeof profile.type,
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
  console.log("\nAll available personality profiles are valid.");
}
