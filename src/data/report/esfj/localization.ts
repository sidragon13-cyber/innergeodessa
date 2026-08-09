import { createPersonalityLocalizer } from "../esfp/localization-template";

export const { localizeStaticBlock, localizeRule } =
  createPersonalityLocalizer({
    type: "ESFJ",
    core: "通过细致关注、实际支持和可靠协调，让人们感到被看见，并让共同生活与工作保持稳定连贯",
    domains: {
      identity: "报告定位与使用边界", overview: "关系关怀与实际协调",
      dimensions: "四个偏好维度的情境化理解", strengths: "察觉需要、建立归属并落实支持的优势",
      risks: "认可需要、过度负责与个人边界之间的风险", core: "把关怀转化为可见行动与群体连续性的核心模式",
      motivation: "归属、互惠、可靠贡献与明确期待", information: "通过具体细节、既有经验与人际反应理解情境",
      decisions: "兼顾共同价值、个人需要与实际可行性的决定", communication: "温暖、具体并重视回应与关系修复的沟通",
      teamwork: "通过照顾参与条件、角色协调与认可贡献支持团队", career: "重视合作、服务质量与稳定贡献的工作环境",
      relationships: "以持续关心、共同责任和直接表达维系亲密关系", change: "在保留信任与连续性的同时逐步适应变化",
      stress: "在关系紧张、付出失衡或期待不清时恢复稳定", growth: "让关怀与选择、容量、边界和互惠保持一致",
      action: "以九十天实践强化直接沟通、分担责任与自我照顾", methodology: "类型解释、动态规则与负责任使用原则",
    },
    dimensions: {
      ei: "外部关系投入与独处恢复、反思之间的节奏", sn: "具体需要和既有经验与未来模式之间的重心",
      tf: "关系价值与客观标准、系统后果之间的权衡", jp: "稳定安排与灵活回应不同需要之间的平衡",
    },
    combinations: {
      private: "安静关怀与可见协调", structured: "实际支持与可靠结构",
      perfection: "服务标准、认可与过度负责风险", contextual: "情境化关系投入与判断弹性",
      evidence: "以真实反馈修正照顾方式", provisional: "高度情境化的 ESFJ 模式",
      outward: "可见关怀与群体协调", values: "共同价值、实际需要与正当边界",
    },
    specificLabels: {
      "identity-summary": "你的完整 ESFJ 人格报告", "overview-summary": "关系关怀与实际协调",
      "dimensions-context": "理解 ESFJ 的四个维度", "days-1-30": "第 1–30 天：观察关怀与责任模式",
      "days-31-60": "第 31–60 天：练习直接需要与共同分担", "days-61-90": "第 61–90 天：巩固互惠和可持续支持",
      "methodology-framework": "解释框架与使用边界", "methodology-version": "版本与负责任复盘",
    },
  });
