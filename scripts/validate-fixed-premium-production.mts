import {
  readFileSync,
} from "node:fs";

import {
  build,
} from "esbuild";

import {
  GET as getFixedPremiumReport,
} from "../src/app/api/account/personality-report/[sessionId]/route";

import {
  isFixedPersonalityReportDelivery,
} from "../src/data/report/fixed-assets/fixed-report-client";

const PAGE_PATH =
  "src/app/personality/report/[sessionId]/page.tsx";

const API_PATH =
  "src/app/api/account/personality-report/[sessionId]/route.ts";

const DOCUMENT_PATH =
  "src/app/personality/report/[sessionId]/fixed-report-document.tsx";

const PREVIEW_PATH =
  "src/app/api/dev/personality-report-preview/[sessionId]/route.ts";

const CLIENT_PATH =
  "src/data/report/fixed-assets/fixed-report-client.ts";

const RICH_RENDERER_PATH =
  "src/components/report/fixed-report-rich-content.tsx";

function readSource(
  path: string,
): string {
  return readFileSync(
    path,
    "utf8",
  );
}

function assert(
  condition: unknown,
  message: string,
): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

console.log(
  "===== FIXED PREMIUM PRODUCTION VALIDATOR =====",
);
console.log();

const pageSource =
  readSource(PAGE_PATH);

const apiSource =
  readSource(API_PATH);

const documentSource =
  readSource(DOCUMENT_PATH);

const previewSource =
  readSource(PREVIEW_PATH);

const clientSource =
  readSource(CLIENT_PATH);

const richRendererSource =
  readSource(
    RICH_RENDERER_PATH,
  );

/* ============================================================
 * 1. Active production page boundary
 * ============================================================
 */

assert(
  pageSource.includes(
    "fetchFixedPersonalityReport",
  ),
  "Active report page must fetch the protected fixed report delivery.",
);

assert(
  pageSource.includes(
    "FixedReportDocument",
  ),
  "Active report page must render FixedReportDocument.",
);

assert(
  pageSource.includes(
    "/api/dev/personality-report-preview/",
  ),
  "Local preview must load through the fixed preview API.",
);

assert(
  !pageSource.includes(
    "legacy-preview-report",
  ) &&
    !pageSource.includes(
      "LegacyPreviewReport",
    ),
  "Active report page must not reference the legacy preview module.",
);

for (const forbidden of [
  "generatePersonalityReport",
  "createReportDimensions",
  "fetchPersonalityResult",
  "/api/account/report-access/personality/",
  "GeneratedPersonalityReportResult",
]) {
  assert(
    !pageSource.includes(
      forbidden,
    ),
    `Active production report page must not contain legacy dependency: ${forbidden}`,
  );
}

console.log(
  "PASS — active Premium page uses protected fixed-report delivery",
);

console.log(
  "PASS — active Premium page contains no direct legacy generator/result/access flow",
);

/* ============================================================
 * 2. Protected server API boundary
 * ============================================================
 */

assert(
  apiSource.includes(
    "/api/account/report-access/personality/",
  ),
  "Protected API must verify existing personality report entitlement.",
);

assert(
  apiSource.includes(
    "/api/sessions/",
  ) &&
    apiSource.includes(
      "/result",
    ),
  "Protected API must load persisted result only after access verification.",
);

assert(
  apiSource.includes(
    "buildFixedPersonalityReportPayload",
  ),
  "Protected API must build exactly one fixed personality report payload.",
);

assert(
  apiSource.includes(
    "private, no-store, max-age=0",
  ),
  "Protected Premium API must enforce private no-store caching.",
);

assert(
  apiSource.includes(
    '"report-locked"',
  ) &&
    apiSource.includes(
      '"authentication-required"',
    ) &&
    apiSource.includes(
      '"resource-not-found"',
    ),
  "Protected API must expose machine-readable access states.",
);

console.log(
  "PASS — protected API retains auth / ownership / entitlement gate",
);

console.log(
  "PASS — protected API retains no-store delivery contract",
);

/* ============================================================
 * 3. Fixed document / rich renderer boundary
 * ============================================================
 */

for (const required of [
  "FixedReportRichContent",
  "SharedReportHeader",
  "SharedReportTableOfContents",
  "SharedReportSection",
  "SharedReportNavigation",
  "ReportShell",
  "PrintReportButton",
]) {
  assert(
    documentSource.includes(
      required,
    ),
    `FixedReportDocument must retain ${required}.`,
  );
}

for (const forbidden of [
  "GeneratedPersonalityReportResult",
  "generatePersonalityReport",
  "appliedRuleCount",
  "ruleVersion",
  "assessmentContext",
  "dynamicSlots",
  "relative-profile",
]) {
  assert(
    !documentSource.includes(
      forbidden,
    ),
    `FixedReportDocument must not depend on legacy concept: ${forbidden}`,
  );
}

assert(
  richRendererSource.includes(
    "FixedReportRichBlock",
  ),
  "Rich renderer must consume serializable rich blocks.",
);

assert(
  !/\bdangerouslySetInnerHTML\s*=/.test(
    richRendererSource,
  ),
  "Rich renderer must never use dangerouslySetInnerHTML.",
);

console.log(
  "PASS — FixedReportDocument reuses shared report shell / TOC / sections / navigation / print",
);

console.log(
  "PASS — fixed document excludes legacy rule/personalization metadata",
);

console.log(
  "PASS — rich renderer remains HTML-injection safe",
);

/* ============================================================
 * 4. Local Fixed Preview isolation
 * ============================================================
 */

assert(
  previewSource.includes(
    "buildFixedPersonalityReportPayload",
  ) &&
    previewSource.includes(
      "createReportDimensions",
    ),
  "Local preview API must build the same fixed report payload as production.",
);

assert(
  previewSource.includes(
    '"127.0.0.1"',
  ) &&
    previewSource.includes(
      '"localhost"',
    ) &&
    previewSource.includes(
      "preview-unavailable",
    ),
  "Local preview API must retain an explicit localhost-only runtime boundary.",
);

assert(
  previewSource.includes(
    'sessionId.startsWith(',
  ) &&
    previewSource.includes(
      '"preview-"',
    ) &&
    previewSource.includes(
      'questionBankVersion !==',
    ) &&
    previewSource.includes(
      '"preview"',
    ),
  "Local preview API must accept only explicit preview sessions and preview fixtures.",
);

assert(
  !previewSource.includes(
    "generatePersonalityReport",
  ) &&
    !previewSource.includes(
      "ReportDocument",
    ),
  "Local fixed preview API must not depend on the legacy report generator/document.",
);

assert(
  !clientSource.includes(
    "generated-report-markdown",
  ) &&
    !clientSource.includes(
      "fixed-report-resolver",
    ),
  "Client delivery contract must not import server report assets.",
);

console.log(
  "PASS — local preview uses the fixed report builder behind a localhost-only server boundary",
);

/* ============================================================
 * 5. Runtime protected-delivery behavior
 * ============================================================
 */

const SESSION_ID =
  "fixed-premium-validator-session";

const originalFetch =
  globalThis.fetch;

function json(
  value: unknown,
  status = 200,
): Response {
  return new Response(
    JSON.stringify(
      value,
    ),
    {
      status,
      headers: {
        "Content-Type":
          "application/json",
      },
    },
  );
}

const unlockedAccess = {
  module: "personality",
  resourceId: SESSION_ID,
  authenticated: true,
  emailVerified: true,
  ownsResource: true,
  entitlementStatus:
    "unlocked",
  canViewFullReport: true,
  canPrint: true,
  canDownloadPdf: true,
};

const persistedResult = {
  sessionId: SESSION_ID,
  status: "completed",
  type: "INTJ",

  scores: {
    EI: -20,
    SN: 30,
    TF: -45,
    JP: 60,
  },

  confidence: {
    EI: 0.4,
    SN: 0.9,
    TF: 0.9,
    JP: 0.9,
  },

  answered: {
    EI: 18,
    SN: 18,
    TF: 18,
    JP: 18,
  },

  tie_rule: "neutral",

  questionBankVersion:
    "personality-v1.0.0",

  completedAt:
    "2026-08-14T20:00:00.000Z",

  calculatedAt:
    "2026-08-14T20:00:01.000Z",
};

async function invokeRoute():
  Promise<Response> {
  return getFixedPremiumReport(
    new Request(
      `http://localhost/api/account/personality-report/${SESSION_ID}?locale=zh`,
      {
        headers: {
          Cookie:
            "innergeo_session=validator",
        },
      },
    ),
    {
      params:
        Promise.resolve({
          sessionId:
            SESSION_ID,
        }),
    },
  );
}

/* Locked: result endpoint must never be called. */
{
  const calls: string[] =
    [];

  globalThis.fetch =
    async (
      input,
    ) => {
      const url =
        String(input);

      calls.push(url);

      if (
        url.includes(
          "/report-access/personality/",
        )
      ) {
        return json({
          ...unlockedAccess,
          entitlementStatus:
            null,
          canViewFullReport:
            false,
          canPrint: false,
          canDownloadPdf:
            false,
        });
      }

      throw new Error(
        "Persisted result was loaded before entitlement unlock.",
      );
    };

  const response =
    await invokeRoute();

  const body =
    await response.json() as {
      code?: string;
    };

  assert(
    response.status ===
      403 &&
      body.code ===
        "report-locked" &&
      calls.length ===
        1,
    "Locked request must stop after the entitlement gate.",
  );
}

console.log(
  "PASS — locked request cannot reach persisted result or Premium content",
);

/* Unlocked: access first, result second, one delivery returned. */
{
  const calls: string[] =
    [];

  globalThis.fetch =
    async (
      input,
    ) => {
      const url =
        String(input);

      calls.push(url);

      if (
        url.includes(
          "/report-access/personality/",
        )
      ) {
        return json(
          unlockedAccess,
        );
      }

      if (
        url.includes(
          `/api/sessions/${SESSION_ID}/result`,
        )
      ) {
        return json(
          persistedResult,
        );
      }

      return json(
        {
          detail:
            "Unexpected backend URL",
        },
        500,
      );
    };

  const response =
    await invokeRoute();

  const body: unknown =
    await response.json();

  assert(
    response.status ===
      200,
    "Unlocked fixed Premium report request must return HTTP 200.",
  );

  assert(
    isFixedPersonalityReportDelivery(
      body,
    ),
    "Unlocked response must satisfy FixedPersonalityReportDelivery.",
  );

  assert(
    body.sessionId ===
      SESSION_ID &&
      body.locale ===
        "zh" &&
      body.report
        .personalityType ===
        "INTJ" &&
      body.report.profile ===
        "B" &&
      body.report.sections
        .length ===
        13,
    "Unlocked delivery must contain the expected single INTJ Profile B fixed report.",
  );

  assert(
    calls.length ===
      2 &&
      calls[0]?.includes(
        "/report-access/personality/",
      ) &&
      calls[1]?.includes(
        `/api/sessions/${SESSION_ID}/result`,
      ),
    "Protected Premium route must check access before loading the persisted result.",
  );

  const serialized =
    JSON.stringify(body);

  assert(
    !serialized.includes(
      '"markdown"',
    ) &&
      !serialized.includes(
        '"sourcePath"',
      ) &&
      !serialized.includes(
        "{{",
      ),
    "Premium delivery must exclude raw Markdown, internal source paths, and unresolved placeholders.",
  );
}

globalThis.fetch =
  originalFetch;

console.log(
  "PASS — unlocked request returns one validated fixed-report delivery",
);

console.log(
  "PASS — access check occurs before persisted-result loading",
);

console.log(
  "PASS — delivery excludes raw Markdown / sourcePath / unresolved variables",
);

/* ============================================================
 * 6. Browser bundle boundary
 * ============================================================
 */

const bundleResult =
  await build({
    entryPoints: [
      PAGE_PATH,
    ],

    bundle: true,
    platform: "browser",
    format: "esm",
    splitting: true,

    external: [
      "next/*",
    ],

    outdir:
      "/tmp/innergeo-fixed-premium-validator",

    metafile: true,
    write: false,
    logLevel: "silent",
  });

const metafile =
  bundleResult.metafile;

assert(
  metafile,
  "Browser bundle metafile was not produced.",
);

const outputs =
  Object.entries(
    metafile.outputs,
  );

const pageEntry =
  outputs.find(
    ([, info]) =>
      info.entryPoint?.endsWith(
        PAGE_PATH,
      ),
  );

assert(
  pageEntry,
  "Active report page browser entry was not found.",
);

const [
  pageOutput,
  pageInfo,
] = pageEntry;

const mainInputs =
  Object.keys(
    pageInfo.inputs,
  );

const allInputs =
  Object.keys(
    metafile.inputs,
  );

const legacyMainInputs =
  mainInputs.filter(
    (file) =>
      file.includes(
        "generate-report",
      ) ||
      file.includes(
        "report/registry",
      ) ||
      file.includes(
        "personalization",
      ) ||
      file.includes(
        "relative-profile",
      ) ||
      file.includes(
        "combination-runtime",
      ),
  );

const forbiddenServerAssets =
  allInputs.filter(
    (file) =>
      file.includes(
        "generated-report-markdown",
      ) ||
      file.includes(
        "fixed-report-resolver",
      ) ||
      file.includes(
        "fixed-report-payload.ts",
      ),
  );

const legacyPreviewInputs =
  allInputs.filter(
    (file) =>
      file.includes(
        "legacy-preview-report",
      ),
  );

const previewServerInputs =
  allInputs.filter(
    (file) =>
      file.includes(
        "api/dev/personality-report-preview",
      ),
  );

assert(
  legacyMainInputs.length ===
    0,
  `Legacy generator entered the normal Premium page entry:\n${legacyMainInputs.join(
    "\n",
  )}`,
);

assert(
  forbiddenServerAssets.length ===
    0,
  `Fixed server assets entered browser chunks:\n${forbiddenServerAssets.join(
    "\n",
  )}`,
);

assert(
  legacyPreviewInputs.length ===
    0,
  `Legacy preview module entered browser chunks:\n${legacyPreviewInputs.join(
    "\n",
  )}`,
);

assert(
  previewServerInputs.length ===
    0,
  `Local fixed preview server route entered browser chunks:\n${previewServerInputs.join(
    "\n",
  )}`,
);

console.log();

console.log(
  "===== BROWSER BUNDLE CONTRACT =====",
);

console.log(
  `PAGE_ENTRY=${pageOutput}`,
);

console.log(
  `PAGE_ENTRY_INPUTS=${mainInputs.length}`,
);

console.log(
  `LEGACY_GENERATOR_INPUTS_IN_MAIN_ENTRY=${legacyMainInputs.length}`,
);

console.log(
  `SERVER_FIXED_ASSETS_IN_BROWSER=${forbiddenServerAssets.length}`,
);

console.log(
  `LEGACY_PREVIEW_INPUTS_IN_BROWSER=${legacyPreviewInputs.length}`,
);

console.log(
  `FIXED_PREVIEW_SERVER_INPUTS_IN_BROWSER=${previewServerInputs.length}`,
);

console.log();

console.log(
  "PASS — normal Premium browser entry excludes legacy generator",
);

console.log(
  "PASS — legacy preview is absent from the active browser build",
);

console.log(
  "PASS — local fixed preview server route remains server-only",
);

console.log(
  "PASS — 64-report registry never enters browser build",
);

console.log(
  "PASS — fixed server resolver/payload runtime never enters browser build",
);

console.log();

console.log(
  "===== FIXED PREMIUM PRODUCTION VALIDATOR PASS =====",
);
