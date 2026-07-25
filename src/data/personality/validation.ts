import type {
  PersonalityProfile,
  PersonalityTypeCode,
} from "./types";

type SupportedLocale = "en" | "zh";

export type PersonalityValidationResult = {
  valid: boolean;
  errors: string[];
  warnings: string[];
};

export function validatePersonalityProfile(
  profile: PersonalityProfile,
  expectedType?: PersonalityTypeCode,
): PersonalityValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (expectedType && profile.type !== expectedType) {
    errors.push(
      `Registry type mismatch: expected ${expectedType}, received ${profile.type}.`,
    );
  }

  if (profile.schemaVersion !== "1.0.0") {
    errors.push(
      `Unsupported schemaVersion: ${profile.schemaVersion}.`,
    );
  }

  if (profile.overview.access !== "free") {
    errors.push("overview.access must be free.");
  }

  validateExactLength(
    profile.coreTraits,
    4,
    "coreTraits",
    errors,
  );

  validateExactLength(
    profile.strengths,
    6,
    "strengths",
    errors,
  );

  validateExactLength(
    profile.growthRisks,
    6,
    "growthRisks",
    errors,
  );

  validateExactLength(
    profile.careerGroups,
    4,
    "careerGroups",
    errors,
  );

  validateExactLength(
    profile.premiumPreview.sections,
    8,
    "premiumPreview.sections",
    errors,
  );

  validateUniqueIds(
    profile.coreTraits.map((item) => ({
      id: item.id,
      path: `coreTraits.${item.id}`,
    })),
    errors,
  );

  validateUniqueIds(
    profile.strengths.map((item) => ({
      id: item.id,
      path: `strengths.${item.id}`,
    })),
    errors,
  );

  validateUniqueIds(
    profile.growthRisks.map((item) => ({
      id: item.id,
      path: `growthRisks.${item.id}`,
    })),
    errors,
  );

  validateUniqueIds(
    profile.careerGroups.map((item) => ({
      id: item.id,
      path: `careerGroups.${item.id}`,
    })),
    errors,
  );

  validateUniqueIds(
    profile.premiumPreview.sections.map((item) => ({
      id: item.id,
      path: `premiumPreview.sections.${item.id}`,
    })),
    errors,
  );

  for (const section of profile.premiumPreview.sections) {
    if (section.access !== "premium") {
      errors.push(
        `premiumPreview.sections.${section.id}.access must be premium.`,
      );
    }
  }

  const availableLocales =
    profile.metadata.availableLocales;

  validateRequiredLocale(
    availableLocales,
    "en",
    "metadata.availableLocales",
    errors,
  );

  validateLocalizedProfileContent(
    profile,
    availableLocales,
    errors,
    warnings,
  );

  if (!profile.metadata.contentVersion.trim()) {
    errors.push("metadata.contentVersion is required.");
  }

  if (!profile.metadata.reviewed) {
    warnings.push(
      `${profile.type} is not marked as reviewed.`,
    );
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

export function assertValidPersonalityProfile(
  profile: PersonalityProfile,
  expectedType?: PersonalityTypeCode,
): void {
  const result = validatePersonalityProfile(
    profile,
    expectedType,
  );

  if (!result.valid) {
    throw new Error(
      [
        `Invalid personality profile: ${profile.type}`,
        ...result.errors.map((error) => `- ${error}`),
      ].join("\n"),
    );
  }
}

function validateLocalizedProfileContent(
  profile: PersonalityProfile,
  locales: SupportedLocale[],
  errors: string[],
  warnings: string[],
): void {
  validateLocalizedText(
    profile.identity.name,
    "identity.name",
    locales,
    errors,
  );

  validateLocalizedText(
    profile.identity.shortName,
    "identity.shortName",
    locales,
    errors,
  );

  validateLocalizedText(
    profile.identity.tagline,
    "identity.tagline",
    locales,
    errors,
  );

  validateLocalizedStringList(
    profile.identity.keywords,
    "identity.keywords",
    locales,
    errors,
  );

  validateLocalizedText(
    profile.overview.headline,
    "overview.headline",
    locales,
    errors,
  );

  validateLocalizedParagraphs(
    profile.overview.paragraphs,
    "overview.paragraphs",
    locales,
    errors,
  );

  validateLocalizedText(
    profile.overview.summary,
    "overview.summary",
    locales,
    errors,
  );

  profile.coreTraits.forEach((trait, index) => {
    const path = `coreTraits[${index}]`;

    validateId(trait.id, `${path}.id`, errors);

    validateLocalizedText(
      trait.title,
      `${path}.title`,
      locales,
      errors,
    );

    validateLocalizedText(
      trait.description,
      `${path}.description`,
      locales,
      errors,
    );
  });

  profile.strengths.forEach((strength, index) => {
    const path = `strengths[${index}]`;

    validateId(strength.id, `${path}.id`, errors);

    validateLocalizedText(
      strength.title,
      `${path}.title`,
      locales,
      errors,
    );

    validateLocalizedText(
      strength.description,
      `${path}.description`,
      locales,
      errors,
    );
  });

  profile.growthRisks.forEach((risk, index) => {
    const path = `growthRisks[${index}]`;

    validateId(risk.id, `${path}.id`, errors);

    validateLocalizedText(
      risk.title,
      `${path}.title`,
      locales,
      errors,
    );

    validateLocalizedText(
      risk.description,
      `${path}.description`,
      locales,
      errors,
    );

    validateLocalizedText(
      risk.growthAction,
      `${path}.growthAction`,
      locales,
      errors,
    );
  });

  profile.careerGroups.forEach((group, index) => {
    const path = `careerGroups[${index}]`;

    validateId(group.id, `${path}.id`, errors);

    validateLocalizedText(
      group.category,
      `${path}.category`,
      locales,
      errors,
    );

    validateLocalizedText(
      group.description,
      `${path}.description`,
      locales,
      errors,
    );

    validateLocalizedStringList(
      group.roles,
      `${path}.roles`,
      locales,
      errors,
    );

    for (const locale of locales) {
      const roles = group.roles[locale];

      if (roles && roles.length < 3) {
        warnings.push(
          `${path}.roles.${locale} contains fewer than 3 roles.`,
        );
      }
    }
  });

  validateLocalizedText(
    profile.careerNotice,
    "careerNotice",
    locales,
    errors,
  );

  validateLocalizedText(
    profile.premiumPreview.headline,
    "premiumPreview.headline",
    locales,
    errors,
  );

  validateLocalizedText(
    profile.premiumPreview.introduction,
    "premiumPreview.introduction",
    locales,
    errors,
  );

  validateLocalizedText(
    profile.premiumPreview.callToAction,
    "premiumPreview.callToAction",
    locales,
    errors,
  );

  profile.premiumPreview.sections.forEach(
    (section, index) => {
      const path = `premiumPreview.sections[${index}]`;

      validateId(section.id, `${path}.id`, errors);

      validateLocalizedText(
        section.title,
        `${path}.title`,
        locales,
        errors,
      );

      validateLocalizedText(
        section.description,
        `${path}.description`,
        locales,
        errors,
      );
    },
  );
}

function validateLocalizedText(
  value: Partial<Record<SupportedLocale, string>>,
  path: string,
  locales: SupportedLocale[],
  errors: string[],
): void {
  for (const locale of locales) {
    const content = value[locale];

    if (!content || !content.trim()) {
      errors.push(`${path}.${locale} is required.`);
    }
  }
}

function validateLocalizedStringList(
  value: Partial<Record<SupportedLocale, string[]>>,
  path: string,
  locales: SupportedLocale[],
  errors: string[],
): void {
  for (const locale of locales) {
    const items = value[locale];

    if (!items || items.length === 0) {
      errors.push(`${path}.${locale} must not be empty.`);
      continue;
    }

    items.forEach((item, index) => {
      if (!item.trim()) {
        errors.push(
          `${path}.${locale}[${index}] must not be empty.`,
        );
      }
    });
  }
}

function validateLocalizedParagraphs(
  value: Partial<Record<SupportedLocale, string[]>>,
  path: string,
  locales: SupportedLocale[],
  errors: string[],
): void {
  validateLocalizedStringList(
    value,
    path,
    locales,
    errors,
  );
}

function validateExactLength<T>(
  items: T[],
  expectedLength: number,
  path: string,
  errors: string[],
): void {
  if (items.length !== expectedLength) {
    errors.push(
      `${path} must contain exactly ${expectedLength} items; received ${items.length}.`,
    );
  }
}

function validateUniqueIds(
  items: Array<{ id: string; path: string }>,
  errors: string[],
): void {
  const locationsById = new Map<string, string[]>();

  for (const item of items) {
    const locations = locationsById.get(item.id) ?? [];
    locations.push(item.path);
    locationsById.set(item.id, locations);
  }

  for (const [id, locations] of locationsById) {
    if (locations.length > 1) {
      errors.push(
        `Duplicate id "${id}" found at: ${locations.join(", ")}.`,
      );
    }
  }
}

function validateId(
  id: string,
  path: string,
  errors: string[],
): void {
  if (!id.trim()) {
    errors.push(`${path} is required.`);
    return;
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) {
    errors.push(
      `${path} must use lowercase kebab-case; received "${id}".`,
    );
  }
}

function validateRequiredLocale(
  locales: SupportedLocale[],
  requiredLocale: SupportedLocale,
  path: string,
  errors: string[],
): void {
  if (!locales.includes(requiredLocale)) {
    errors.push(
      `${path} must include "${requiredLocale}".`,
    );
  }
}
