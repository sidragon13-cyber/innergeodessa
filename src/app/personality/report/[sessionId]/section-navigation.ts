export function createReportSectionAnchor(
  order: number,
  identifier: string,
): string {
  const safeOrder = Number.isFinite(order)
    ? Math.max(0, Math.trunc(order))
    : 0;
  const slug = identifier
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `report-section-${String(safeOrder).padStart(2, "0")}-${slug || "section"}`;
}
