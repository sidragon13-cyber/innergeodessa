import type {
  RiasecDimensionProfile,
} from "../dimensions";

export function joinNatural(items: string[]): string {
  if (items.length === 0) {
    return "";
  }

  if (items.length === 1) {
    return items[0] ?? "";
  }

  return `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;
}

export function profileLabel(profile: RiasecDimensionProfile): string {
  return `${profile.name} (${profile.code})`;
}

export function formatList(items: readonly string[]): string {
  return items.map((item) => `• ${item}`).join("\n");
}

export function unique(items: readonly string[]): string[] {
  return [...new Set(items)];
}
