import type {
  ZodiacSign,
} from "../types";

export interface ZodiacSignProfileZh {
  sign: ZodiacSign;
  name: string;
  element: "火象" | "土象" | "风象" | "水象";
  modality: "基本" | "固定" | "变动";
  orientation: string;
  constructiveExpression: string;
  possibleTension: string;
  growthDirection: string;
  strengths: readonly string[];
  risks: readonly string[];
  relationshipThemes: readonly string[];
  careerThemes: readonly string[];
}

export const ZODIAC_SIGN_PROFILES_ZH: Readonly<
  Record<ZodiacSign, ZodiacSignProfileZh>
> = Object.freeze({
  aries: {
    sign: "aries",
    name: "白羊座",
    element: "火象",
    modality: "基本",
    orientation:
      "白羊座在象征层面关联开创、直接投入、自主、勇气，以及把可能性转化为行动的冲动。",
    constructiveExpression:
      "建设性表达可能体现为果断、愿意率先开始、受挫后迅速恢复，以及在陌生情境中保持信心。",
    possibleTension:
      "较快的节奏也可能变成急躁、不必要的冲突、后续执行不足，或在掌握足够背景前就采取行动。",
    growthDirection:
      "成长方向在于让主动性与时机、倾听和持续投入相结合，并觉察直接表达对他人的影响。",
    strengths: ["启动困难或不确定的工作", "需要行动时迅速回应", "为自主与清晰方向发声", "受挫后重新建立动力"],
    risks: ["信息不足时仓促行动", "把延迟理解为阻碍", "最初挑战过后失去兴趣"],
    relationshipThemes: ["直接沟通", "关系中的自主空间", "共同活动与向前推进"],
    careerThemes: ["创业与新项目", "压力环境中的领导", "竞争或行动导向的工作"],
  },
  taurus: {
    sign: "taurus",
    name: "金牛座",
    element: "土象",
    modality: "固定",
    orientation:
      "金牛座在象征层面关联稳定、现实条件、持续性、价值、资源、耐心，以及逐步建立可靠成果。",
    constructiveExpression:
      "建设性表达可能支持稳定投入、务实判断、忠诚、资源意识，以及通过重复实践持续改善。",
    possibleTension:
      "对连续性的偏好也可能变成抗拒必要改变、过度依恋舒适，或在条件已经变化后仍固守原路。",
    growthDirection:
      "成长方向在于区分健康的稳定与停滞，并在不放弃真正价值的前提下练习适应。",
    strengths: ["长期保持投入", "建立具体而可靠的价值", "不确定时保持脚踏实地", "识别品质与耐用性"],
    risks: ["把改变拖到压力无法回避", "把熟悉等同于安全", "过度抓紧资源或习惯"],
    relationshipThemes: ["可靠与忠诚", "身心安全感", "共同价值与稳定日常"],
    careerThemes: ["财务、资源与运营", "设计、工艺与材料品质", "长期资产或产品发展"],
  },
  gemini: {
    sign: "gemini",
    name: "双子座",
    element: "风象",
    modality: "变动",
    orientation:
      "双子座在象征层面关联好奇、语言、信息、连接、比较、流动，以及想法的快速交换。",
    constructiveExpression:
      "建设性表达可能支持灵活思考、沟通、快速学习、建立网络、翻译转换，以及看见问题的多个侧面。",
    possibleTension:
      "对多样性的需求也可能变成分心、浅层处理、注意力不稳定，或难以长期坚持一个方向。",
    growthDirection:
      "成长方向在于把信息转化为理解，选择值得深入的问题，并完整闭合沟通回路。",
    strengths: ["快速学习与调整", "连接人与信息", "用易懂语言解释想法", "识别不同解读"],
    risks: ["收集信息却缺少整合", "过于频繁地改变方向", "用分析或幽默回避情绪深度"],
    relationshipThemes: ["对话与思想刺激", "灵活与变化", "清楚交换期待"],
    careerThemes: ["媒体、写作与传播", "教育与信息服务", "销售、研究与网络型工作"],
  },
  cancer: {
    sign: "cancer",
    name: "巨蟹座",
    element: "水象",
    modality: "基本",
    orientation:
      "巨蟹座在象征层面关联保护、归属、情绪记忆、照顾、家庭、延续，以及对人类需求的敏感。",
    constructiveExpression:
      "建设性表达可能支持同理心、忠诚、保护性领导、社会感知，以及创造让人感到安全的环境。",
    possibleTension:
      "敏感也可能变成防御、间接沟通、过度保护，或难以区分当前情境与过去的情绪经验。",
    growthDirection:
      "成长方向在于关怀而不过度负责，直接表达需求，并建立能保护情绪容量的边界。",
    strengths: ["识别情绪与实际需要", "创造信任与归属", "保护人、历史或共享资源", "记住重要的关系背景"],
    risks: ["替他人的情绪负责", "受伤时退缩而不说明", "依附熟悉的情绪模式"],
    relationshipThemes: ["情绪安全", "照顾与相互保护", "家庭与归属"],
    careerThemes: ["照护、教育与社区工作", "服务与款待行业", "居住、食物、历史与文化传承"],
  },
  leo: {
    sign: "leo",
    name: "狮子座",
    element: "火象",
    modality: "固定",
    orientation:
      "狮子座在象征层面关联创造、可见度、自我表达、自信、温暖、领导，以及作出鲜明贡献的愿望。",
    constructiveExpression:
      "建设性表达可能支持勇气、慷慨、创意方向、忠诚、激励能力，以及为群体提供清晰的情感中心。",
    possibleTension:
      "对认可的需要也可能变成过度认同地位、难以接纳批评，或承受维持强大公众形象的压力。",
    growthDirection:
      "成长方向在于区分真诚表达与表演，并用可见度鼓励贡献，而不是持续寻求认可。",
    strengths: ["传达信念与创意方向", "鼓励他人的信心", "承担可见的责任", "围绕共同目标建立忠诚"],
    risks: ["追求认可而忽略有效反馈", "把分歧视为针对个人", "为维护自尊或声誉而过度承诺"],
    relationshipThemes: ["温暖与欣赏", "忠诚与明确表达爱意", "创意伙伴关系"],
    careerThemes: ["领导与公众工作", "创意产业与表演", "品牌、教育与受众发展"],
  },
  virgo: {
    sign: "virgo",
    name: "处女座",
    element: "土象",
    modality: "变动",
    orientation:
      "处女座在象征层面关联分析、优化、服务、实用智慧、健康、技艺、组织，以及系统改善。",
    constructiveExpression:
      "建设性表达可能支持准确、负责、诊断问题、改进流程、细致学习和提供实用服务。",
    possibleTension:
      "对缺陷的关注也可能变成过度自我批评、分析过量、害怕错误，或难以接受足够好的完成状态。",
    growthDirection:
      "成长方向在于把细节放入更大的目的，区分有用标准与完美主义，并允许持续迭代。",
    strengths: ["识别问题与不一致", "改善流程与品质", "通过细致观察学习", "提供务实可靠的支持"],
    risks: ["过度聚焦缺点", "反复打磨而延迟完成", "低估看起来轻松的工作"],
    relationshipThemes: ["实际照顾与可靠", "清楚的期待", "尊重努力与能力"],
    careerThemes: ["分析、品质与运营", "健康与服务系统", "研究、编辑与技术工艺"],
  },
  libra: {
    sign: "libra",
    name: "天秤座",
    element: "风象",
    modality: "基本",
    orientation:
      "天秤座在象征层面关联平衡、关系、协商、审美、互惠、公平，以及协调不同观点的努力。",
    constructiveExpression:
      "建设性表达可能支持外交、合作、设计意识、调解，以及建立可执行共识的能力。",
    possibleTension:
      "对多种观点的敏感也可能变成犹豫、回避冲突、依赖外部认可，或延迟设定边界。",
    growthDirection:
      "成长方向在于理解公平不等于所有人都同意，并认识到清晰决定也可以保护关系。",
    strengths: ["理解相互竞争的观点", "建立合作与共识", "识别审美与关系平衡", "得体沟通"],
    risks: ["为维持短暂和谐而回避决定", "压抑需求直到产生怨气", "过度重视外表或社会认可"],
    relationshipThemes: ["互惠与伙伴关系", "公平协商", "共同的审美或社交价值"],
    careerThemes: ["法律、外交与调解", "设计、品牌与客户工作", "合作关系与利益相关者管理"],
  },
  scorpio: {
    sign: "scorpio",
    name: "天蝎座",
    element: "水象",
    modality: "固定",
    orientation:
      "天蝎座在象征层面关联深度、隐私、转化、信任、权力、共享资源、情绪强度与深入调查。",
    constructiveExpression:
      "建设性表达可能支持韧性、策略洞察、保密、情绪勇气、危机处理和深度投入。",
    possibleTension:
      "保护性的强度也可能变成猜疑、控制、隐瞒、执着，或难以放下已经失去意义的情境。",
    growthDirection:
      "成长方向在于运用辨别力而不预设威胁，有意识地共享权力，并让信任通过证据逐步形成。",
    strengths: ["调查隐藏原因", "危机中保持专注", "处理机密或复杂事务", "投入有意义的深层转化"],
    risks: ["用过度控制保护脆弱", "把不确定理解为隐藏意图", "持续依附冲突或背叛"],
    relationshipThemes: ["信任与情绪诚实", "深度与忠诚", "共享权力与资源"],
    careerThemes: ["研究与调查", "金融、风险与共享资产", "心理、危机与转型工作"],
  },
  sagittarius: {
    sign: "sagittarius",
    name: "射手座",
    element: "火象",
    modality: "变动",
    orientation:
      "射手座在象征层面关联探索、意义、信念、学习、旅行、可能性、求真与视野扩展。",
    constructiveExpression:
      "建设性表达可能支持乐观、教学、战略视野、文化好奇、思想独立和走出熟悉边界的意愿。",
    possibleTension:
      "关注可能性也可能变成过度自信、躁动、直率过头、忽略细节，或未经检验就投入宏大观念。",
    growthDirection:
      "成长方向在于让愿景连接证据，尊重具体情境的复杂性，并把热情转化为持续实践。",
    strengths: ["看见更大的模式与未来可能", "跨文化与跨学科学习", "传达意义与方向", "承担建设性的思想风险"],
    risks: ["用有限证据过度概括", "忽略执行细节", "把自由理解为免除责任"],
    relationshipThemes: ["共同成长与探索", "诚实与思想自由", "保留个人发展空间"],
    careerThemes: ["教育、出版与传播", "旅行、国际工作与文化", "战略、法律与使命型领导"],
  },
  capricorn: {
    sign: "capricorn",
    name: "摩羯座",
    element: "土象",
    modality: "基本",
    orientation:
      "摩羯座在象征层面关联结构、责任、纪律、权威、时间、成就，以及建立持久成果。",
    constructiveExpression:
      "建设性表达可能支持耐心、战略规划、承担责任、现实抱负，以及持续朝长期目标工作。",
    possibleTension:
      "对能力的强调也可能变成过度压力、情绪克制、悲观、过劳，或把自我认同绑定于地位和产出。",
    growthDirection:
      "成长方向在于允许他人支持，在完成前承认进展，并让成功的定义包含健康与关系。",
    strengths: ["规划长期目标", "在限制下承担责任", "建立系统与机构", "策略性使用有限资源"],
    risks: ["把个人价值等同于成就", "承担本应共享的责任", "无限推迟满足感"],
    relationshipThemes: ["可靠与承诺", "尊重与共同负责", "长期规划"],
    careerThemes: ["管理与机构领导", "财务、治理与战略", "工程、运营与长期发展"],
  },
  aquarius: {
    sign: "aquarius",
    name: "水瓶座",
    element: "风象",
    modality: "固定",
    orientation:
      "水瓶座在象征层面关联系统、独立、创新、群体、未来可能、社会模式，以及挑战既有假设的观念。",
    constructiveExpression:
      "建设性表达可能支持原创、系统思考、思想独立、社区愿景，以及质疑过时结构的意愿。",
    possibleTension:
      "对客观性的偏好也可能变成情感疏离、为反对而反对、观念僵化，或重原则而轻具体的人。",
    growthDirection:
      "成长方向在于让创新回应真实需要，把情绪信息纳入分析，并愿意修正非传统观点。",
    strengths: ["识别社会与技术模式", "发展非常规解决方案", "独立于群体压力思考", "连接观念与集体目标"],
    risks: ["脱离眼前的人类需求", "只因传统而拒绝有用传统", "把不同当作正确的证明"],
    relationshipThemes: ["友谊与思想平等", "连接中的独立", "共同理想与社区"],
    careerThemes: ["技术、科学与系统", "社会创新与网络", "研究、政策与未来战略"],
  },
  pisces: {
    sign: "pisces",
    name: "双鱼座",
    element: "水象",
    modality: "变动",
    orientation:
      "双鱼座在象征层面关联想象、同理、综合、精神性、艺术、开放性、慈悲和对细微经验的敏感。",
    constructiveExpression:
      "建设性表达可能支持创造力、情绪理解、象征思维、慈悲、适应力，以及连接看似分离经验的能力。",
    possibleTension:
      "开放性也可能变成边界不清、逃避、理想化、混乱、情绪过载，或难以把直觉落实为行动。",
    growthDirection:
      "成长方向在于为想象力提供结构，用证据检验直觉，并以清晰承诺和边界保护敏感。",
    strengths: ["理解情绪与象征意义", "创造富有想象或关怀的回应", "适应复杂的人际情境", "把不同经验连接为整体"],
    risks: ["吸收他人的情绪状态", "回避困难的实际决定", "理想化人、项目或可能性"],
    relationshipThemes: ["慈悲与情绪共鸣", "想象与共同意义", "照顾中的清晰边界"],
    careerThemes: ["艺术、音乐、影视与叙事", "照护、疗愈与社会支持", "精神、文化与人道工作"],
  },
});

export function getZodiacSignProfileZh(
  sign: ZodiacSign,
): ZodiacSignProfileZh {
  return ZODIAC_SIGN_PROFILES_ZH[sign];
}
