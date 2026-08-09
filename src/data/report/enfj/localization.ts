import { createPersonalityLocalizer } from "../esfp/localization-template";

export const { localizeStaticBlock, localizeRule } =
  createPersonalityLocalizer({
    type: "ENFJ",
    core: "把对人际线索与群体需要的洞察转化为有方向的沟通、发展支持和共同愿景，帮助人们形成连接并采取行动",
    domains: {
      identity: "报告定位与使用边界", overview: "人际洞察与有目的的引导",
      dimensions: "四个偏好维度的情境化理解", strengths: "理解他人、凝聚意义并促进发展的优势",
      risks: "过度负责、替他人定义成长与忽略自身需要的风险", core: "通过关系理解和共同愿景推动发展的核心模式",
      motivation: "有意义的影响、连接、互惠与共同进步", information: "整合人际信号、价值张力与未来影响",
      decisions: "兼顾共同价值、人的发展与现实系统后果的决定", communication: "温暖、有方向并能把复杂意义说清楚的沟通",
      teamwork: "通过信任、愿景和能力发展提升团队协作", career: "允许人本影响、协作领导与长期发展的工作环境",
      relationships: "以深度理解、直接需要和相互能动性维系关系", change: "通过共同意义、参与和清晰过渡支持改变",
      stress: "在关系负荷、责任扩张或愿景受挫时恢复边界", growth: "让引导尊重同意、证据、界限和他人的选择权",
      action: "以九十天实践增强倾听、授权与可持续影响", methodology: "类型解释、动态规则与负责任使用原则",
    },
    dimensions: {
      ei: "公开引导与独处反思、意义整合之间的节奏", sn: "当前具体需要与长期模式、发展愿景之间的重心",
      tf: "人本价值与逻辑标准、系统约束之间的权衡", jp: "明确发展方向与开放参与、及时修正之间的平衡",
    },
    combinations: {
      private: "内在洞察与公开引导", structured: "共同愿景与可靠发展结构",
      perfection: "理想标准、拯救倾向与过度控制风险", contextual: "情境化连接与判断弹性",
      evidence: "让人际洞察接受反馈检验", provisional: "高度情境化的 ENFJ 模式",
      outward: "可见引导与群体动员", values: "共同价值、人的尊严与现实后果",
    },
    specificLabels: {
      "identity-summary": "你的完整 ENFJ 人格报告", "overview-summary": "人际洞察与有目的的引导",
      "dimensions-context": "理解 ENFJ 的四个维度", "days-1-30": "第 1–30 天：观察引导与责任模式",
      "days-31-60": "第 31–60 天：练习同意、授权与直接需要", "days-61-90": "第 61–90 天：以反馈巩固共同发展",
      "methodology-framework": "解释框架与使用边界", "methodology-version": "版本与负责任复盘",
    },
  });
