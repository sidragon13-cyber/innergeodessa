import {
  normalizeLocationSearchText,
  staticLocationProvider,
} from "../src/shared/location";

function assert(
  condition: unknown,
  message: string,
): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

async function expectFirstMatch(
  query: string,
  expectedCity: string,
): Promise<void> {
  const results = await staticLocationProvider.search(query);

  assert(results.length > 0, `Expected results for ${query}.`);
  assert(
    results[0]?.city === expectedCity,
    `Expected ${expectedCity} to rank first for ${query}.`,
  );
}

async function main(): Promise<void> {
  await expectFirstMatch("Joh", "Johannesburg");
  await expectFirstMatch("joburg", "Johannesburg");
  await expectFirstMatch("cape", "Cape Town");
  await expectFirstMatch("new", "New York");
  await expectFirstMatch("NeW YoRk", "New York");
  await expectFirstMatch("sing", "Singapore");

  assert(
    normalizeLocationSearchText(" São  Paulo ") === "saopaulo",
    "Normalization must ignore case, spaces, and accents.",
  );

  const johannesburg = await staticLocationProvider.findById(
    "johannesburg-za",
  );

  assert(johannesburg, "Expected Johannesburg by id.");
  assert(
    johannesburg.latitude === -26.2041 &&
      johannesburg.longitude === 28.0473 &&
      johannesburg.timeZone === "Africa/Johannesburg",
    "Johannesburg coordinates and time zone must remain unchanged.",
  );

  const locations = await staticLocationProvider.list();

  assert(
    locations.length >= 10,
    "Static provider must preserve all existing locations.",
  );
  assert(
    new Set(locations.map(({ id }) => id)).size === locations.length,
    "Location ids must be unique.",
  );

  console.log("Location search validation passed.");
  console.log(`Static locations: ${locations.length}`);
}

void main();
