import { k912Questions } from "../../../questions/k912";
import type { K912FacetDefinition, K912ReportDomainId } from "../types";

const FACET_NAMES = [
  "Pattern & Sequence", "Strategy Comparison", "Constraint Logic", "Classification & Relationships", "Planning & Sequence", "Relational Reasoning", "Prediction",
  "Cause Investigation", "Evidence Testing", "Observation Over Time", "Systems & Mechanisms", "Observation as Evidence", "Controlled Experiment", "Independent Investigation",
  "Design & Assembly", "Structural Improvement", "Materials & Function", "Parts & Structure", "Plan to Prototype", "Repair & Troubleshooting", "Test & Revise",
  "Visual Design & Style", "Creative Transformation", "Open-Ended Creation", "Multimodal Storytelling", "Imagination & Worldbuilding", "Original Approach", "Design Improvement",
  "Helping Others Understand", "Peer Support", "Shared Role Coordination", "Perspective Bridging", "Collaborative Decision", "Listening & Idea Development", "Adaptive Cooperation",
  "Active & Reactive Play", "Dynamic Activity", "Outdoor Movement", "Route & Space", "Rhythm & Movement", "Physical Challenge", "Coordinated Movement Skill",
] as const;

const FACET_NAMES_ZH = [
  "规律与顺序", "策略比较", "约束逻辑", "分类与关系", "规划与步骤", "关系推理", "预测",
  "原因调查", "证据检验", "持续观察", "系统与机制", "以观察为证据", "控制实验", "独立调查",
  "设计与组装", "结构改进", "材料与功能", "部件与结构", "从计划到原型", "修理与排错", "测试与修订",
  "视觉设计与风格", "创意转化", "开放式创作", "多媒介叙事", "想象与世界构建", "原创方法", "设计改进",
  "帮助他人理解", "同伴支持", "共同角色协调", "连接不同观点", "协作决策", "倾听并发展想法", "灵活合作",
  "主动与反应式运动", "动态活动", "户外运动", "路线与空间", "节奏与动作", "身体挑战", "协调动作技能",
] as const;

export const K912_FACET_DEFINITIONS: readonly K912FacetDefinition[] = k912Questions.map((question, index) => ({
  itemId: question.sourceItemId,
  facetId: `${question.domain}-${String((index % 7) + 1).padStart(2, "0")}`,
  domain: question.domain as K912ReportDomainId,
  facet: { en: FACET_NAMES[index]!, zh: FACET_NAMES_ZH[index]! },
  prompt: question.prompt,
}));

export const K912_FACET_BY_ITEM_ID = new Map(
  K912_FACET_DEFINITIONS.map((definition) => [definition.itemId, definition]),
);
