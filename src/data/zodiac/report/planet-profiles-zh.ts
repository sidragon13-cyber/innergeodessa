export type ZodiacReportPointCodeZh =
  | "sun"
  | "moon"
  | "mercury"
  | "venus"
  | "mars"
  | "ascendant"
  | "descendant"
  | "midheaven"
  | "imumCoeli";

export interface ZodiacReportPointProfileZh {
  code: ZodiacReportPointCodeZh;
  name: string;
  symbol: string;
  domain: string;
  role: string;
  constructiveExpression: string;
  possibleTension: string;
  reflectionQuestions: readonly string[];
}

export const ZODIAC_REPORT_POINT_PROFILES_ZH: Readonly<
  Record<ZodiacReportPointCodeZh, ZodiacReportPointProfileZh>
> = Object.freeze({
  sun: {
    code: "sun",
    name: "太阳",
    symbol: "☉",
    domain: "核心身份与方向",
    role:
      "太阳在象征层面关联身份、生命力、目的、自我表达，以及建立连贯内在中心的过程。",
    constructiveExpression:
      "它所在的位置可能描述一个人正在有意识发展和表达的品质，以及能够增强方向感的贡献方式。",
    possibleTension:
      "当身份过度依赖认可、表现、控制或维持固定形象时，可能产生困难。",
    reflectionQuestions: ["我在哪里最有目的感并能全心投入？", "哪些自我表达是真诚的，而不是为了表演？", "什么样的贡献值得我长期投入？"],
  },
  moon: {
    code: "moon",
    name: "月亮",
    symbol: "☽",
    domain: "情绪模式与安全感",
    role:
      "月亮在象征层面关联情绪反应、本能、记忆、舒适、归属，以及支持心理安全的条件。",
    constructiveExpression:
      "它所在的位置可能描述情绪经验的处理方式，以及哪些照顾、日常或连接能够恢复稳定。",
    possibleTension:
      "当保护习惯变得自动、间接、回避、过度依赖或脱离当前处境时，可能产生困难。",
    reflectionQuestions: ["什么能帮助我恢复情绪稳定？", "哪些习惯属于当下，哪些来自过去经验？", "我是否能直接表达情绪需求？"],
  },
  mercury: {
    code: "mercury",
    name: "水星",
    symbol: "☿",
    domain: "思考与沟通",
    role:
      "水星在象征层面关联感知、语言、推理、学习、信息交换，以及在观念之间建立联系的方式。",
    constructiveExpression:
      "它所在的位置可能描述收集信息、解释观念、进行比较，以及决定注意力重点的偏好。",
    possibleTension:
      "过度思考、倾听不完整、过于确定、注意力分散，或沟通方式不适合受众时，可能产生困难。",
    reflectionQuestions: ["我怎样学习最有效？", "什么常常妨碍他人理解我的推理？", "在哪些地方更清楚的沟通能减少摩擦？"],
  },
  venus: {
    code: "venus",
    name: "金星",
    symbol: "♀",
    domain: "价值与关系",
    role:
      "金星在象征层面关联吸引、价值观、和谐、审美、愉悦、互惠，以及识别何为值得的方式。",
    constructiveExpression:
      "它所在的位置可能描述偏好的连接、欣赏、合作、美感与价值交换方式。",
    possibleTension:
      "回避必要冲突、理想化、依赖外部认可、标准不清，或混淆吸引力与相容性时，可能产生困难。",
    reflectionQuestions: ["一段关系要可持续，必须具备哪些价值？", "我如何表达欣赏？", "我在哪里为了和谐牺牲了诚实？"],
  },
  mars: {
    code: "mars",
    name: "火星",
    symbol: "♂",
    domain: "行动与动力",
    role:
      "火星在象征层面关联驱动力、主张、投入、勇气、冲突反应、边界，以及追求目标的方式。",
    constructiveExpression:
      "它所在的位置可能描述能量如何被调动、障碍如何被面对，以及哪些条件支持果断行动。",
    possibleTension:
      "冲动、压抑愤怒、投入不稳定、不必要的对抗，或缺少战略方向的行动可能带来困难。",
    reflectionQuestions: ["什么能可靠地启动我的动力？", "进展受阻时我会怎样回应？", "我在哪里需要更清晰的边界或更有纪律的行动？"],
  },
  ascendant: {
    code: "ascendant",
    name: "上升点",
    symbol: "ASC",
    domain: "处世方式与取向",
    role:
      "上升点是黄道在东方地平线上升起的位置，在象征层面关联最初的处世方式、外在呈现、取向与接触生活的方式。",
    constructiveExpression:
      "它所在的星座可能描述一个人进入新情境并与周围环境建立实际互动的风格。",
    possibleTension:
      "当外在呈现变得防御、过度适应、僵化，或与更深层的需求和意图脱节时，可能产生困难。",
    reflectionQuestions: ["我通常怎样进入陌生情境？", "我无意中会留下怎样的第一印象？", "我的外在方式在哪些地方支持或遮蔽了深层重点？"],
  },
  descendant: {
    code: "descendant",
    name: "下降点",
    symbol: "DSC",
    domain: "伙伴关系与相遇",
    role:
      "下降点与上升点相对，在象征层面关联伙伴关系、相遇、投射，以及通过他人认识到的品质。",
    constructiveExpression:
      "它所在的星座可能描述合作中寻找的品质，或通过与不同观点持续互动而发展的品质。",
    possibleTension:
      "当尚未发展的品质所对应的责任被完全放在伴侣、同事或对手身上时，可能产生困难。",
    reflectionQuestions: ["我反复在他人身上寻找哪些品质？", "困难的关系揭示了我哪些发展任务？", "伙伴关系如何同时容纳互惠与清晰边界？"],
  },
  midheaven: {
    code: "midheaven",
    name: "中天",
    symbol: "MC",
    domain: "公共方向与贡献",
    role:
      "中天是星盘上方的子午线点，在象征层面关联公共方向、贡献、可见度、责任和长期发展。",
    constructiveExpression:
      "它所在的星座可能描述支持有意义贡献的品质，以及能力或公共责任随时间发展的方式。",
    possibleTension:
      "当公众形象、成就或外部期待与个人价值和可持续能力脱节时，可能产生困难。",
    reflectionQuestions: ["什么样的贡献值得长期自律？", "除地位之外，我如何定义成功？", "为承担更大责任，我需要发展哪些能力？"],
  },
  imumCoeli: {
    code: "imumCoeli",
    name: "天底",
    symbol: "IC",
    domain: "根基与私人生活",
    role:
      "天底与中天相对，在象征层面关联根源、私人根基、归属、内在稳定，以及发展所依赖的基础。",
    constructiveExpression:
      "它所在的星座可能描述与恢复、隐私、家庭、归属和维持稳定内在基础有关的品质。",
    possibleTension:
      "为了外在成就忽略私人需求，或未经审视地重复继承而来的模式，可能带来困难。",
    reflectionQuestions: ["什么能创造真正的归属感？", "哪些私人条件支持可持续的公共投入？", "哪些继承而来的假设需要审视，而不是重复？"],
  },
});

export function getZodiacReportPointProfileZh(
  code: ZodiacReportPointCodeZh,
): ZodiacReportPointProfileZh {
  return ZODIAC_REPORT_POINT_PROFILES_ZH[code];
}
