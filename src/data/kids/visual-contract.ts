import type {
  RequiredLocalizedText,
} from "../assessment/questions/schema";

export const KIDS_VISUAL_SUPPORT_LEVELS = [
  "none",
  "required",
  "helpful",
] as const;

export type KidsVisualSupport =
  (typeof KIDS_VISUAL_SUPPORT_LEVELS)[number];

export interface KidsNoVisualBinding {
  readonly support: "none";
}

export interface KidsVisualAssetBinding {
  readonly support: "required" | "helpful";

  /**
   * Canonical visual identity.
   *
   * This should normally match the frozen source item identity
   * represented by the illustration.
   */
  readonly assetId: string;

  /**
   * Authoritative visual master retained for audit/provenance.
   *
   * Example:
   * /assets/kids/k912/helpful/K912-BUILD-03-v1.png
   */
  readonly masterPath: `/${string}`;

  /**
   * Asset used by the frontend.
   *
   * This may be the same as masterPath, or an optimized WebP path.
   */
  readonly displayPath: `/${string}`;

  /**
   * Scene description for accessibility.
   *
   * Alt text must describe the illustration without introducing
   * scoring cues, ability judgments, or a "correct" response.
   */
  readonly alt: RequiredLocalizedText;
}

export type KidsVisualBinding =
  | KidsNoVisualBinding
  | KidsVisualAssetBinding;

export function hasKidsVisualAsset(
  binding: KidsVisualBinding,
): binding is KidsVisualAssetBinding {
  return binding.support !== "none";
}
