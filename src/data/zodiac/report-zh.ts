import type {
  AstrologyResultContract,
  ZodiacPosition,
} from "./result-contract";
import {
  getZodiacReportPointProfileZh,
  type ZodiacReportPointCodeZh,
} from "./report/planet-profiles-zh";
import {
  getZodiacSignProfileZh,
} from "./report/sign-profiles-zh";
import type {
  ZodiacReportBlock,
  ZodiacReportSection,
} from "./report/types";

function formatPositionZh(
  position: ZodiacPosition,
): string {
  return `${getZodiacSignProfileZh(position.sign).name} ${position.degree}° ${position.minute}′ ${position.second}″`;
}

function formatListZh(
  items: readonly string[],
): string {
  return items.map((item) => `• ${item}`).join("\n");
}

function uniqueZh(
  items: readonly string[],
): string[] {
  return [...new Set(items)];
}

function positionSummaryZh(
  label: string,
  position: ZodiacPosition,
): string {
  const sign = getZodiacSignProfileZh(position.sign);

  return `${label}位于${formatPositionZh(position)}。${sign.name}是${sign.modality}${sign.element}星座。${sign.orientation}`;
}

function createPointBlocksZh(
  code:
    | "sun"
    | "moon"
    | "mercury"
    | "venus"
    | "mars"
    | "ascendant",
  position: ZodiacPosition,
): ZodiacReportBlock[] {
  const point = getZodiacReportPointProfileZh(code);
  const sign = getZodiacSignProfileZh(position.sign);

  return [
    {
      id: `${code}-position`,
      type: "summary",
      title: `${sign.name}${point.name}`,
      content: `${positionSummaryZh(point.name, position)}\n\n${point.role}`,
    },
    {
      id: `${code}-constructive`,
      type: "strength",
      title: "潜在的建设性表达",
      content: `${sign.constructiveExpression}\n\n${point.constructiveExpression}\n\n${formatListZh(sign.strengths)}`,
    },
    {
      id: `${code}-tension`,
      type: "risk",
      title: "值得留意的潜在张力",
      content: `${sign.possibleTension}\n\n${point.possibleTension}\n\n${formatListZh(sign.risks)}`,
    },
    {
      id: `${code}-growth`,
      type: "guidance",
      title: "发展方向",
      content: `${sign.growthDirection}\n\n${formatListZh(point.reflectionQuestions)}`,
    },
  ];
}

function createAngleBlockZh(
  code: Extract<
    ZodiacReportPointCodeZh,
    "ascendant" | "descendant" | "midheaven" | "imumCoeli"
  >,
  position: ZodiacPosition,
): ZodiacReportBlock {
  const point = getZodiacReportPointProfileZh(code);
  const sign = getZodiacSignProfileZh(position.sign);

  return {
    id: `angle-${code}`,
    type: "analysis",
    title: `${sign.name}${point.name}`,
    content:
      `${positionSummaryZh(point.name, position)}\n\n` +
      `${point.role}\n\n` +
      `${sign.constructiveExpression}\n\n` +
      `反思问题：\n${formatListZh(point.reflectionQuestions)}`,
  };
}

export function generateZodiacReportSectionsZh(
  result: AstrologyResultContract,
): ZodiacReportSection[] {
  const sun = result.planets.sun.zodiac;
  const moon = result.planets.moon.zodiac;
  const mercury = result.planets.mercury.zodiac;
  const venus = result.planets.venus.zodiac;
  const mars = result.planets.mars.zodiac;
  const ascendant = result.angles.ascendant.zodiac;
  const descendant = result.angles.descendant.zodiac;
  const midheaven = result.angles.midheaven.zodiac;
  const imumCoeli = result.angles.imumCoeli.zodiac;

  const sunProfile = getZodiacSignProfileZh(sun.sign);
  const moonProfile = getZodiacSignProfileZh(moon.sign);
  const risingProfile = getZodiacSignProfileZh(ascendant.sign);
  const mercuryProfile = getZodiacSignProfileZh(mercury.sign);
  const venusProfile = getZodiacSignProfileZh(venus.sign);
  const marsProfile = getZodiacSignProfileZh(mars.sign);

  const coreStrengths = uniqueZh([
    ...sunProfile.strengths,
    ...moonProfile.strengths,
    ...risingProfile.strengths,
  ]);
  const coreRisks = uniqueZh([
    ...sunProfile.risks,
    ...moonProfile.risks,
    ...risingProfile.risks,
  ]);
  const relationshipThemes = uniqueZh([
    ...moonProfile.relationshipThemes,
    ...venusProfile.relationshipThemes,
    ...risingProfile.relationshipThemes,
  ]);
  const careerThemes = uniqueZh([
    ...sunProfile.careerThemes,
    ...mercuryProfile.careerThemes,
    ...marsProfile.careerThemes,
    ...getZodiacSignProfileZh(midheaven.sign).careerThemes,
  ]);

  return [
    {
      id: "report-overview",
      order: 1,
      title: "你的出生星盘报告",
      description: "了解本报告所使用的象征框架及其阅读方式。",
      blocks: [
        {
          id: "report-purpose",
          type: "summary",
          title: "结构化的象征档案",
          content:
            "本报告基于太阳、月亮、水星、金星、火星、上升点、下降点、中天和天底的星座位置计算结果。\n\n占星在这里被用作反思的象征与文化框架。它不能确立科学意义上的人格事实、诊断心理状况、预测命运，也不能取代专业建议。",
        },
        {
          id: "report-core-pattern",
          type: "analysis",
          title: `${sunProfile.name}太阳 · ${moonProfile.name}月亮 · ${risingProfile.name}上升`,
          content: `报告从三个定位点开始：太阳位于${sunProfile.name}，月亮位于${moonProfile.name}，上升点位于${risingProfile.name}。\n\n这些位置会作为不同的象征功能分别解读，而不会被合并成固定的人格标签。`,
        },
      ],
    },
    {
      id: "core-identity",
      order: 2,
      title: "核心身份概览",
      description: "中心方向、情绪需求与外在处世方式之间的关系。",
      blocks: [
        {
          id: "core-functions",
          type: "analysis",
          title: "三种不同的星盘功能",
          content:
            `太阳 — ${formatPositionZh(sun)}：中心方向与有意识的自我表达。\n\n` +
            `月亮 — ${formatPositionZh(moon)}：情绪模式与安全感需求。\n\n` +
            `上升点 — ${formatPositionZh(ascendant)}：最初的处世方式与面对环境的取向。`,
        },
        {
          id: "core-integration",
          type: "guidance",
          title: "整合，而不是简化",
          content: "这三个位置可能描述不同的需要或反应模式。有效的阅读不会把它们强行压缩为一个刻板印象，而会观察每种象征功能在何时更明显，以及它们在真实情境中彼此支持还是相互竞争。",
        },
      ],
    },
    {
      id: "sun-profile",
      order: 3,
      title: "太阳档案",
      description: "中心方向、身份认同与有目的的自我表达。",
      blocks: createPointBlocksZh("sun", sun),
    },
    {
      id: "moon-profile",
      order: 4,
      title: "月亮档案",
      description: "情绪处理、安全感、记忆与本能反应。",
      blocks: createPointBlocksZh("moon", moon),
    },
    {
      id: "rising-sign",
      order: 5,
      title: "上升星座",
      description: "进入新情境时的初始方式、外在呈现与互动取向。",
      blocks: createPointBlocksZh("ascendant", ascendant),
    },
    {
      id: "mercury-profile",
      order: 6,
      title: "水星与沟通",
      description: "思考、学习、沟通与信息处理。",
      blocks: createPointBlocksZh("mercury", mercury),
    },
    {
      id: "venus-profile",
      order: 7,
      title: "金星与关系",
      description: "价值、吸引、互惠、和谐与关系偏好。",
      blocks: createPointBlocksZh("venus", venus),
    },
    {
      id: "mars-profile",
      order: 8,
      title: "火星与动力",
      description: "行动、驱动力、主张、边界与冲突反应。",
      blocks: createPointBlocksZh("mars", mars),
    },
    {
      id: "chart-angles",
      order: 9,
      title: "星盘四轴",
      description: "连接处世方式、伙伴关系、公共方向和私人根基的四个结构点。",
      blocks: [
        createAngleBlockZh("ascendant", ascendant),
        createAngleBlockZh("descendant", descendant),
        createAngleBlockZh("midheaven", midheaven),
        createAngleBlockZh("imumCoeli", imumCoeli),
      ],
    },
    {
      id: "combined-pattern",
      order: 10,
      title: "核心组合模式",
      description: "太阳、月亮和上升点如何构成分层的象征模式。",
      blocks: [
        {
          id: "combined-elements",
          type: "summary",
          title: "元素与模式",
          content:
            `核心组合包括${sunProfile.name}（${sunProfile.element}、${sunProfile.modality}）、${moonProfile.name}（${moonProfile.element}、${moonProfile.modality}）和${risingProfile.name}（${risingProfile.element}、${risingProfile.modality}）。\n\n重复的元素可能表示更强的象征重点；不同元素并存，则可能提示需要在多种风格之间移动，而不是只依赖一种偏好。`,
        },
        {
          id: "combined-practice",
          type: "guidance",
          title: "用经验检验模式",
          content: "把报告与可观察的行为相比较。记录哪些描述持续出现、哪些只在特定环境中出现，以及哪些并不符合。把不一致视为有用证据，而不是强迫经验迎合报告。",
        },
      ],
    },
    {
      id: "potential-strengths",
      order: 11,
      title: "潜在优势",
      description: "与三个核心星座相关的建设性品质。",
      blocks: [
        {
          id: "strength-summary",
          type: "strength",
          title: "可在现实中检验的主题",
          content: formatListZh(coreStrengths.slice(0, 10)),
        },
        {
          id: "strength-evidence",
          type: "guidance",
          title: "象征潜力不等于已经具备的能力",
          content: "把每项优势主张转化为证据：已完成的工作、重复出现的行为、他人反馈、可衡量结果、可靠习惯，或在真实限制下仍能维持的决定。",
        },
      ],
    },
    {
      id: "development-risks",
      order: 12,
      title: "发展风险",
      description: "偏好风格可能失衡或形成限制的方式。",
      blocks: [
        {
          id: "risk-summary",
          type: "risk",
          title: "值得观察的模式",
          content: formatListZh(coreRisks.slice(0, 9)),
        },
        {
          id: "risk-context",
          type: "guidance",
          title: "倾向是否有用取决于情境",
          content: "象征倾向并不自动等于缺点。同一种品质在一个环境中可能有建设性，在另一个环境中则可能形成限制。需要评估时机、强度、后果，以及行为是否仍有弹性。",
        },
      ],
    },
    {
      id: "relationship-themes",
      order: 13,
      title: "关系主题",
      description: "与情绪安全、价值、吸引和伙伴关系有关的象征主题。",
      blocks: [
        {
          id: "relationship-summary",
          type: "relationship",
          title: "可供反思的主题",
          content: formatListZh(relationshipThemes),
        },
        {
          id: "relationship-guidance",
          type: "guidance",
          title: "以行为和沟通作为判断标准",
          content: "仅凭星座位置无法确认相容性。可持续关系依赖沟通、边界、可靠性、同意、共同价值、冲突修复，以及双方长期展现的真实行为。",
        },
      ],
    },
    {
      id: "career-contribution",
      order: 14,
      title: "职业与贡献",
      description: "与方向、沟通、行动和公共贡献相关的宽泛象征主题。",
      blocks: [
        {
          id: "career-theme-list",
          type: "career",
          title: "值得调查的领域与贡献方式",
          content: formatListZh(careerThemes),
        },
        {
          id: "career-warning",
          type: "guidance",
          title: "不要只依据占星选择职业",
          content: "这些主题只能作为提示。职业决定还应结合兴趣、能力、资历、价值观、劳动力市场需求、财务现实、工作条件、地域限制和直接经验进行检验。",
        },
      ],
    },
    {
      id: "reflection-plan",
      order: 15,
      title: "90天反思计划",
      description: "用生活经验检验象征主题的实用方法。",
      blocks: [
        {
          id: "days-1-30",
          type: "action",
          title: "第1–30天：观察",
          content: "选择三个报告主题，记录每个主题出现、没有出现，或以不同方式出现的情境。重点观察行为、背景、后果和反馈。",
        },
        {
          id: "days-31-60",
          type: "action",
          title: "第31–60天：实验",
          content: "选择一项建设性品质和一个风险模式，设计小型行为实验，例如更清楚地沟通、更坚定地设定边界、放慢决定、提高后续执行的一致性，或有意识地安排恢复时间。",
        },
        {
          id: "days-61-90",
          type: "action",
          title: "第61–90天：评估",
          content: "回顾证据。保留确实改善理解或行动的主题，修订或舍弃不符合经验的主题，并把有用观察转化为一个具体习惯或决策规则。",
        },
      ],
    },
    {
      id: "methodology",
      order: 16,
      title: "方法与局限",
      description: "星盘的计算方式，以及应如何理解这份报告。",
      blocks: [
        {
          id: "method-calculation",
          type: "methodology",
          title: "计算基础",
          content:
            `星盘使用当地出生时间 ${result.input.localDateTime}，并根据 ${result.input.timeZone ?? "不可用的时区"} 转换为 ${result.input.utcDateTime ?? "不可用的 UTC 时间"}。\n\n` +
            `坐标：${result.input.latitude}, ${result.input.longitude}。\n` +
            `引擎：${result.engine.name} ${result.engine.version}。\n` +
            `Ephemeris：${result.engine.ephemeris}。`,
        },
        {
          id: "method-scope",
          type: "methodology",
          title: "当前报告范围",
          content: "本版本包含太阳、月亮、水星、金星、火星、上升点、下降点、中天和天底；尚未包含宫位、主要相位、月交点、外行星、行运、合盘或预测技术。",
        },
        {
          id: "method-limitations",
          type: "risk",
          title: "重要局限",
          content: "占星不是用于判断人格、心理健康、相容性、职业适合度、未来事件或医疗结果的既定科学证据。本报告仅用于反思、文化和娱乐，不能替代合格的医疗、心理、法律、财务、教育或就业建议。",
        },
        ...(result.limitations.length > 0
          ? [
              {
                id: "calculation-limitations",
                type: "risk" as const,
                title: "核心计算返回的星盘特定限制",
                content: formatListZh(result.limitations),
              },
            ]
          : []),
      ],
    },
  ];
}
