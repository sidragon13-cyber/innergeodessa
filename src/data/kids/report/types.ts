/**
 * K68 Professional Report domain contract.
 *
 * This contract is intentionally form-specific.
 * It defines only the six domains used by the K68 V2
 * Professional Parent Report.
 */

export const K68_REPORT_DOMAINS = [
  "think",
  "discover",
  "build",
  "create",
  "connect",
  "move",
] as const;

export type K68ReportDomainId =
  (typeof K68_REPORT_DOMAINS)[number];
