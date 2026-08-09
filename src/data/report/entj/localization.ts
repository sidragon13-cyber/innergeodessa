import { createPersonalityLocalizer } from "../esfp/localization-template";

export const { localizeStaticBlock, localizeRule } =
  createPersonalityLocalizer({
    type: "ENTJ",
    core: "把长期方向、系统杠杆和明确标准转化为果断的资源配置与协同行动，使复杂目标获得可执行的结构",
    domains: {
      identity: "报告定位与使用边界", overview: "战略方向与系统化执行",
      dimensions: "四个偏好维度的情境化理解", strengths: "识别杠杆、设定方向并组织复杂执行的优势",
      risks: "速度、控制、权力与人的真实经验之间的风险", core: "以长期模型和明确责任推动系统结果的核心模式",
      motivation: "自主、挑战、影响力与有意义的进展", information: "压缩复杂信息、识别轨迹与结构变量",
      decisions: "依据战略价值、证据和机会成本作出清晰取舍", communication: "直接、有结构并聚焦结论与责任的沟通",
      teamwork: "通过方向、授权和问责提升团队能力", career: "允许战略判断、复杂决策与规模化影响的工作环境",
      relationships: "在独立、坦诚、尊重与情感可见性之间建立信任", change: "通过目标、假设和阶段性证据领导转型",
      stress: "在失去控制、进展受阻或脆弱被压抑时恢复弹性", growth: "让战略力量接受反证、共享权力并保护人的能动性",
      action: "以九十天实践改善倾听、授权与证据驱动的执行", methodology: "类型解释、动态规则与负责任使用原则",
    },
    dimensions: {
      ei: "公开领导与独处战略整合之间的节奏", sn: "当前运营事实与长期模式、系统杠杆之间的重心",
      tf: "逻辑标准与价值、关系及正当性之间的权衡", jp: "明确方向和闭环与试验、修正之间的平衡",
    },
    combinations: {
      private: "独立战略与可见领导", structured: "长期模型与执行结构",
      perfection: "高标准、控制与延迟授权风险", contextual: "情境化协作与判断弹性",
      evidence: "让战略接受运营证据修正", provisional: "高度情境化的 ENTJ 模式",
      outward: "可见领导与协同推进", values: "战略效能、正当性与人的后果",
    },
    specificLabels: {
      "identity-summary": "你的完整 ENTJ 人格报告", "overview-summary": "战略方向与系统化执行",
      "dimensions-context": "理解 ENTJ 的四个维度", "days-1-30": "第 1–30 天：审视战略假设与权力影响",
      "days-31-60": "第 31–60 天：练习授权与反证对话", "days-61-90": "第 61–90 天：用证据巩固可持续执行",
      "methodology-framework": "解释框架与使用边界", "methodology-version": "版本与负责任复盘",
    },
  });
