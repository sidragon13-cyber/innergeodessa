# Frontend Rollout Readiness

## Current release gate

The frontend allowlist remains exactly:

- ISFJ
- ENTJ

The report page and result-page CTA use `isPhaseOnePersonalityReportType`; generator registry presence is not treated as release permission. ENTP and every other non-allowlisted type remain generator-ready but unavailable through the complete-report frontend. The implementation manifest agrees with, but does not override, the explicit allowlist.

No unsupported type is intentionally listed as available, and the report route returns the unavailable state before generating an unapproved report.

## Controlled expansion recommendation

Do not expand all remaining types at once. A suitable evidence-based order is:

1. Analysts: INTJ, INTP, ENTP.
2. Diplomats: INFJ, INFP, ENFJ, ENFP.
3. Sentinels: ISTJ, ESTJ, ESFJ.
4. Explorers: ISTP, ISFP, ESTP, ESFP.

This follows implementation maturity and leaves the newest family last. It is a planning recommendation only.

Before each release cohort:

- complete the family and cross-pair editorial backlog;
- obtain explicit product/content approval;
- validate free-result CTA, direct-route denial/allowance, persisted-result loading, print, navigation, and recipient-name behavior;
- confirm mobile and A4 output manually in supported browsers;
- update the explicit frontend allowlist and matching manifest state together;
- rerun individual, family, global, frontend, typecheck, lint, and build validation.

## Limitations

Static and generator validation do not prove that a report is suitable for public release. Authentication, payment, email, localization, clinical review, and psychometric review are outside this audit.

