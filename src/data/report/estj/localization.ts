import { createPersonalityLocalizer } from "../esfp/localization-template";

export const { localizeStaticBlock, localizeRule } =
  createPersonalityLocalizer({
    type: "ESTJ",
    core: "把现实目标、明确标准和责任边界转化为有秩序的执行，通过清晰分工、持续跟进和可衡量结果推动系统稳定运转",
    domains: {
      identity: "报告定位与使用边界", overview: "运营清晰度与组织执行",
      dimensions: "四个偏好维度的情境化理解", strengths: "设定标准、分配责任并持续推进的优势",
      risks: "速度、控制、责任集中与他人参与之间的风险", core: "把目标转化为结构、责任和可执行步骤的核心模式",
      motivation: "责任、自主、效率、可见进展与可靠结果", information: "通过事实、经验、流程和可衡量证据理解现实",
      decisions: "依据标准、后果、资源和责任作出清晰取舍", communication: "直接、具体并聚焦行动、责任与完成标准的沟通",
      teamwork: "通过角色清晰、可靠跟进和公开责任提升协作", career: "重视责任、秩序、结果和实际影响的工作环境",
      relationships: "在忠诚、直接表达、共同责任与情感回应之间建立信任", change: "通过明确目标、阶段计划和现实反馈管理变化",
      stress: "在失去控制、责任失衡或执行反复受阻时恢复弹性", growth: "让效率和标准同时接受反证、协作、边界与人的真实经验",
      action: "以九十天实践改善授权、倾听和证据驱动的执行", methodology: "类型解释、动态规则与负责任使用原则",
    },
    dimensions: {
      ei: "公开协调与独立整理、准备之间的节奏", sn: "当前事实、既有经验与长期模式之间的重心",
      tf: "客观标准与人的影响、价值及关系后果之间的权衡", jp: "明确结构、及时闭环与灵活修正之间的平衡",
    },
    combinations: {
      private: "安静准备与可见协调", structured: "现实目标与可靠执行结构",
      perfection: "高标准、控制与过度负责风险", contextual: "情境化协调与判断弹性",
      evidence: "让执行判断接受现实证据修正", provisional: "高度情境化的 ESTJ 模式",
      outward: "可见协调与行动推进", values: "效率、责任、正当性与人的后果",
      visible: "可见协调与行动推进", operational: "运营方向与结构化执行",
      overreach: "责任、控制与授权边界", flexible: "灵活协调与现实修正",
      adaptive: "运营方向与路径弹性", practical: "现实证据与可执行责任",
    },
    specificLabels: {
      "identity-summary": "你的完整 ESTJ 人格报告", "overview-summary": "运营清晰度与组织执行",
      "dimensions-context": "理解 ESTJ 的四个维度", "days-1-30": "第 1–30 天：观察责任与控制模式",
      "days-31-60": "第 31–60 天：练习授权、倾听与明确边界", "days-61-90": "第 61–90 天：用反馈巩固可靠执行",
      "methodology-framework": "解释框架与使用边界", "methodology-version": "版本与负责任复盘",
    },
  });
