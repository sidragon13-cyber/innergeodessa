import type { ReportContentBlockType } from "../types";

export interface PersonalityLocalizationConfig {
  type: string;
  core: string;
  domains: Record<string, string>;
  dimensions: Record<"ei" | "sn" | "tf" | "jp", string>;
  combinations: Record<string, string>;
  specificLabels?: Record<string, string>;
}

const ROLE_LABEL: Record<ReportContentBlockType, string> = {
  summary: "核心概览",
  analysis: "深入分析",
  evidence: "证据与校准",
  strength: "优势发挥",
  risk: "潜在风险",
  guidance: "实践建议",
  example: "情境示例",
  reflection: "反思问题",
  action: "行动练习",
};

const ROLE_GUIDANCE: Record<ReportContentBlockType, string> = {
  summary: "这一概览用于识别反复出现的倾向，而不是给个人贴上固定标签。",
  analysis: "重点是分辨这种倾向在不同角色、关系与精力状态下如何变化。",
  evidence: "请把主观感受与后续结果、他人体验和可观察事实放在一起检验。",
  strength: "当行动尊重现实条件、他人能动性与共同责任时，这项优势最有价值。",
  risk: "风险通常来自优势被过度使用，而非人格本身存在缺陷。",
  guidance: "把建议缩小为可观察、可复盘且符合现实能力的具体实验。",
  example: "情境示例用于帮助迁移理解，不代表同一类型的每个人都会如此行动。",
  reflection: "可询问自己：这是经过证据检验的选择，还是熟悉偏好的自动反应？",
  action: "先明确一个可完成结果、所需边界与复盘时间，再投入行动。",
};

const BAND_LABEL: Record<string, string> = {
  low: "较低",
  moderate: "中等",
  strong: "明显",
  "very-strong": "非常明显",
  borderline: "临界",
  balanced: "完全平衡",
};

export function createPersonalityLocalizer(
  config: PersonalityLocalizationConfig,
) {
  function localizeStaticBlock(
    id: string,
    type: ReportContentBlockType,
  ): { title: string; content: string } {
    const focus = config.domains[domainFromId(id)] ?? config.domains.overview;
    const specific = Object.entries(config.specificLabels ?? {}).find(
      ([fragment]) => id.includes(fragment),
    )?.[1];

    return {
      title: specific ?? `${focus}｜${ROLE_LABEL[type]}`,
      content: `${config.type} 在“${focus}”方面，常见的成熟表现是${config.core}。${ROLE_GUIDANCE[type]}请以长期行为、具体情境和可信反馈为准，并把不符合之处视为修正理解的重要证据。`,
    };
  }

  function localizeRule(id: string): { title: string; content: string } {
    const dimensionMatch = id.match(
      /-(ei|sn|tf|jp)-(i|e|s|n|t|f|j|p|balanced)(?:-(borderline|moderate|strong|very-strong))?$/,
    );

    if (dimensionMatch) {
      const [, rawDimension, preference, rawBand] = dimensionMatch;
      const dimension = rawDimension as keyof typeof config.dimensions;
      const band = rawBand ?? "balanced";
      const preferenceLabel = preference === "balanced"
        ? "双向偏好"
        : `${preference.toUpperCase()} 偏好`;

      return {
        title: `${dimension.toUpperCase()}｜${preferenceLabel}·${BAND_LABEL[band]}倾向`,
        content: `这一结果会调整 ${config.type} 在${config.dimensions[dimension]}上的典型表现。${BAND_LABEL[band]}倾向表示当前方式较为熟悉，但不代表能力高低或固定行为。请保留${config.core}的价值，同时主动使用相邻偏好检查证据、关系影响、现实边界与长期后果。`,
      };
    }

    if (id.includes("confidence-average")) {
      const band = id.includes("very-strong")
        ? "very-strong"
        : id.split("-").at(-1) ?? "moderate";
      return {
        title: `整体置信度｜${BAND_LABEL[band] ?? "情境化理解"}`,
        content: `整体置信度说明 ${config.type} 偏好模式在当前测量中的清晰程度，并不衡量智力、成熟度或专业能力。置信度较低时，应更多比较不同角色与情境；置信度较高时，也要留意熟悉偏好是否因过度使用而遮蔽反证、相邻偏好和他人的经验。`,
      };
    }

    if (id.includes("balanced-count")) {
      return {
        title: "平衡维度与情境弹性",
        content: `一个或多个平衡维度意味着 ${config.type} 的外在表现可能随关系、任务、文化与精力而明显变化。这不会削弱结果，而是提醒你不要把类型描述当作固定身份；应观察哪些条件让不同偏好自然出现，并优先相信反复出现的真实行为。`,
      };
    }

    const combinationTitle = Object.entries(config.combinations).find(
      ([fragment]) => id.includes(fragment),
    )?.[1] ?? `${config.type} 偏好组合的动态解释`;

    return {
      title: combinationTitle,
      content: `${config.type} 的这一组合模式把${config.core}与另一组偏好条件连接起来。它可能形成独特优势，也可能放大过度使用时的盲点。请根据规则所描述的实际条件，明确受影响的人、可观察证据、完成标准与复盘节点，再决定这一解释是否适合当前情境。`,
    };
  }

  return { localizeStaticBlock, localizeRule };

  function domainFromId(id: string): string {
    for (const key of Object.keys(config.domains)) {
      if (id.includes(`-${key}-`) || id.includes(`-${key}`)) return key;
    }
    if (id.includes("relationship")) return "relationships";
    if (id.includes("decision") || id.includes("judgement")) return "decisions";
    if (id.includes("communication") || id.includes("coordination")) return "communication";
    if (id.includes("teamwork") || id.includes("leadership")) return "teamwork";
    if (id.includes("career") || id.includes("work")) return "career";
    return "overview";
  }
}
