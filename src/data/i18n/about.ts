import type {
  SupportedLocale,
} from "@/data/shared";

export type AboutPrinciple = {
  number: string;
  title: string;
  description: string;
};

export type AboutPlatformPart = {
  code: string;
  title: string;
  description: string;
  status: string;
  href?: string;
  available: boolean;
};

export type AboutFrameworkItem = {
  number: string;
  title: string;
  description: string;
};

export type AboutDictionary = {
  metadata: {
    title: string;
    description: string;
  };

  map: {
    centerLabel: string;
    identityLabel: string;
    directionLabel: string;
    growthLabel: string;
  };

  hero: {
    eyebrow: string;
    title: string;
    description: string;
    principlesLabel: string;
    principles: readonly string[];
    primaryAction: string;
    secondaryAction: string;
  };

  purpose: {
    eyebrow: string;
    title: string;
    paragraphs: readonly string[];
  };

  name: {
    eyebrow: string;
    title: string;
    disclaimer: string;
    parts: readonly {
      number: string;
      title: string;
      description: string;
    }[];
    summary: string;
  };

  approach: {
    eyebrow: string;
    title: string;
    description: string;
    principles: readonly AboutPrinciple[];
  };

  platform: {
    eyebrow: string;
    title: string;
    description: string;
    currentAreaLabel: string;
    futureAreaLabel: string;
    exploreLabel: string;
    parts: readonly AboutPlatformPart[];
  };

  profile: {
    eyebrow: string;
    title: string;
    description: string;
    status: string;
    layers: readonly string[];
  };

  framework: {
    eyebrow: string;
    title: string;
    items: readonly AboutFrameworkItem[];
    note: string;
  };

  boundaries: {
    eyebrow: string;
    title: string;
    description: string;
    items: readonly string[];
  };

  community: {
    eyebrow: string;
    title: string;
    paragraphs: readonly string[];
    status: string;
  };

  responsible: {
    eyebrow: string;
    title: string;
    description: string;
    items: readonly string[];
  };

  status: {
    eyebrow: string;
    title: string;
    description: string;
    availableTitle: string;
    availableItems: readonly string[];
    unavailableTitle: string;
    unavailableItems: readonly string[];
  };

  finalCta: {
    eyebrow: string;
    title: string;
    description: string;
    personalityAction: string;
    careerAction: string;
    zodiacAction: string;
  };
};

export const aboutDictionaries: Record<
  SupportedLocale,
  AboutDictionary
> = {
  en: {
    metadata: {
      title: "About InnerGeo | Self-Exploration and Growth",
      description:
        "Learn how InnerGeo brings personality, career interests, symbolic identity, reflection, and future community experiences into one thoughtful self-exploration platform.",
    },

    map: {
      centerLabel: "Inner layers",
      identityLabel: "Identity",
      directionLabel: "Direction",
      growthLabel: "Growth",
    },

    hero: {
      eyebrow: "About InnerGeo",
      title:
        "Understanding yourself is not a final answer. It is a lifelong practice.",
      description:
        "InnerGeo brings together structured assessments, reflective tools, symbolic stories, and future community experiences to help people explore who they are, what draws them forward, and how they may continue growing.",
      principlesLabel: "Platform principles",
      principles: [
        "Self-exploration, not diagnosis",
        "Multiple perspectives",
        "Evidence and context",
        "Lifelong development",
      ],
      primaryAction: "Explore the Platform",
      secondaryAction: "Explore Personality",
    },

    purpose: {
      eyebrow: "Why we exist",
      title: "Connect discovery with what comes next",
      paragraphs: [
        "Many people receive isolated labels but little guidance on what to do with them. Personality tests, career tools, interests, values, and identity experiences often sit apart from one another.",
        "A result may feel useful for a moment without becoming part of practical reflection or development. Meanwhile, people continue changing through education, work, relationships, environment, and personal choices.",
        "InnerGeo aims to connect discovery with reflection, possible direction, and continued growth. Better self-understanding should support better questions—not close down possibilities.",
      ],
    },

    name: {
      eyebrow: "The meaning behind the name",
      title: "Inner · Geo",
      disclaimer:
        "This is the platform's intended symbolic meaning, not a dictionary definition or historical etymology.",
      parts: [
        {
          number: "01",
          title: "Inner",
          description:
            "The internal world: identity, interests, values, patterns, questions, and potential.",
        },
        {
          number: "02",
          title: "Geo",
          description:
            "Earth, grounding, place, layers, and the environments that shape people.",
        },
        {
          number: "03",
          title: "InnerGeo",
          description:
            "A grounded map of the inner self—connecting personal identity with real-life context, direction, and growth.",
        },
      ],
      summary:
        "InnerGeo represents exploring the layers within oneself while remaining grounded in real life.",
    },

    approach: {
      eyebrow: "Our approach",
      title: "Principles for responsible self-exploration",
      description:
        "A calm, useful platform needs room for context, contradiction, uncertainty, and change.",
      principles: [
        {
          number: "01",
          title: "Explore from multiple perspectives",
          description:
            "No single test, sign, result, or label can fully explain a person.",
        },
        {
          number: "02",
          title: "Use results as starting points",
          description:
            "Results should generate questions, observations, and experiments rather than final verdicts.",
        },
        {
          number: "03",
          title: "Separate preference from ability",
          description:
            "What you enjoy, what you can do, and which opportunities exist may overlap without being identical.",
        },
        {
          number: "04",
          title: "Leave room for change",
          description:
            "People develop over time and should never feel trapped by an old result.",
        },
        {
          number: "05",
          title: "Connect insight with action",
          description:
            "Useful self-understanding should support decisions, learning, communication, and development.",
        },
        {
          number: "06",
          title: "Respect uncertainty",
          description:
            "Responsible exploration acknowledges limitations and avoids false precision.",
        },
      ],
    },

    platform: {
      eyebrow: "The platform parts",
      title: "Several lenses, clearly separated",
      description:
        "Current introduction pages are distinct from future interactive features. Each status below reflects what is available now.",
      currentAreaLabel: "Current area",
      futureAreaLabel: "Future area",
      exploreLabel: "Explore",
      parts: [
        {
          code: "P",
          title: "Personality",
          description:
            "Explore patterns in attention, decision-making, energy, communication, and personal preferences.",
          status: "Introduction and assessment available",
          href: "/personality",
          available: true,
        },
        {
          code: "C",
          title: "Career Interests",
          description:
            "Explore activities, environments, and problems that hold your interest through six RIASEC dimensions.",
          status: "Introduction and assessment available",
          href: "/career",
          available: true,
        },
        {
          code: "Z",
          title: "Zodiac Identity",
          description:
            "Explore cultural symbolism, identity themes, stories, and reflective questions without deterministic claims.",
          status: "Introduction and interactive chart available",
          href: "/zodiac",
          available: true,
        },
        {
          code: "V",
          title: "Values",
          description:
            "Understand the principles and priorities that influence decisions.",
          status: "Future concept",
          available: false,
        },
        {
          code: "S",
          title: "Strengths",
          description:
            "Reflect on recurring capabilities, resources, and ways of contributing.",
          status: "Future concept",
          available: false,
        },
        {
          code: "L",
          title: "Learning Style",
          description:
            "Explore preferred ways of absorbing, practising, and applying knowledge without rigid categories.",
          status: "Future concept",
          available: false,
        },
      ],
    },

    profile: {
      eyebrow: "Future product direction",
      title: "From separate results to one evolving profile",
      description:
        "Future profile layers may support comparison and reflection. Contradictions can be useful, behaviour can shift across environments, and every profile should remain open to change. Users should control how they interpret their results.",
      status:
        "Integrated profiles and saved observations are not yet available.",
      layers: [
        "Personality preferences",
        "Career-interest pattern",
        "Values",
        "Strengths",
        "Learning preferences",
        "Communication patterns",
        "Personal goals",
        "Growth reflections",
        "Symbolic identity themes",
        "Saved observations and prompts",
      ],
    },

    framework: {
      eyebrow: "A practical rhythm",
      title: "Discovery, direction, and growth",
      items: [
        {
          number: "01",
          title: "Discover",
          description:
            "Recognise patterns, interests, preferences, values, questions, and possible strengths.",
        },
        {
          number: "02",
          title: "Understand",
          description:
            "Compare results with lived experience, context, feedback, and real-world evidence.",
        },
        {
          number: "03",
          title: "Grow",
          description:
            "Choose experiments, learning paths, conversations, rest, and reconsideration that help test possible directions.",
        },
      ],
      note:
        "Growth does not require constant productivity. Rest, reconsideration, and changing direction are valid parts of the process.",
    },

    boundaries: {
      eyebrow: "Clear boundaries",
      title: "What InnerGeo will not do",
      description:
        "Trust begins with being direct about what a self-exploration platform cannot responsibly claim.",
      items: [
        "Diagnose mental-health or medical conditions",
        "Replace qualified professional advice",
        "Guarantee career or relationship outcomes",
        "Predict future events",
        "Determine who should be hired, promoted, accepted, or rejected",
        "Reduce a person to a fixed label",
        "Present symbolic content as scientific fact",
        "Claim certainty where evidence is limited",
      ],
    },

    community: {
      eyebrow: "Future community vision",
      title: "Shared experiences, not automatic compatibility",
      paragraphs: [
        "Future connections may bring together people with similar preferences, interests, goals, values, zodiac signs, or development challenges.",
        "Community could support comparing experiences, discussing interpretations, sharing resources, supporting projects, and learning from similarities and differences. Matching labels alone would never guarantee meaningful compatibility.",
      ],
      status:
        "Community accounts, profiles, comments, chat, groups, and messaging are not yet available.",
    },

    responsible: {
      eyebrow: "Responsible design",
      title: "Principles for features still to come",
      description:
        "These are design intentions, not claims of certifications, audits, or systems that have already been implemented.",
      items: [
        "Transparent limitations",
        "Understandable result explanations",
        "No false precision",
        "No manipulative urgency",
        "No deterministic predictions",
        "Accessible and readable interfaces",
        "User control over personal information",
        "Careful handling of sensitive reflections",
        "Clear boundaries around professional advice",
        "Continued review as the platform develops",
      ],
    },

    status: {
      eyebrow: "Current platform status",
      title: "Being built in clear stages",
      description:
        "InnerGeo is being built in stages. The current site already provides the three core exploration experiences while accounts, saved profiles, and community systems remain in later phases.",
      availableTitle: "Available now",
      availableItems: [
        "Bilingual homepage",
        "Personality assessment and result",
        "Career Interest assessment and result",
        "Zodiac chart and report",
        "Printable detailed reports",
      ],
      unavailableTitle: "Not yet available",
      unavailableItems: [
        "Accounts and saved profiles",
        "Community features",
        "Integrated identity profiles",
        "Commercial subscription features",
      ],
    },

    finalCta: {
      eyebrow: "Room to change",
      title: "You are more than one result, one role, or one story.",
      description:
        "InnerGeo is being built as a place to explore those layers with curiosity, context, and room to change.",
      personalityAction: "Explore Personality",
      careerAction: "Explore Career Interests",
      zodiacAction: "Explore Zodiac Identity",
    },
  },

  zh: {
    metadata: {
      title: "关于 InnerGeo｜自我探索与成长",
      description:
        "了解 InnerGeo 如何将人格、职业兴趣、象征身份、个人反思与未来社区体验整合为一个审慎的自我探索平台。",
    },

    map: {
      centerLabel: "内在层次",
      identityLabel: "身份",
      directionLabel: "方向",
      growthLabel: "成长",
    },

    hero: {
      eyebrow: "关于 InnerGeo",
      title: "理解自己不是一个最终答案，而是一生持续进行的练习。",
      description:
        "InnerGeo 将结构化测评、反思工具、象征故事与未来社区体验结合起来，帮助人们探索自己是谁、什么在吸引自己向前，以及未来可以如何继续成长。",
      principlesLabel: "平台原则",
      principles: [
        "自我探索，而不是医学诊断",
        "从多个角度理解自己",
        "重视证据与现实情境",
        "接受持续成长与变化",
      ],
      primaryAction: "探索平台",
      secondaryAction: "探索人格类型",
    },

    purpose: {
      eyebrow: "我们为何建立这个平台",
      title: "把自我发现与下一步行动连接起来",
      paragraphs: [
        "许多人得到了一些孤立的标签，却很少得到如何理解和使用这些结果的指导。人格测评、职业工具、兴趣、价值观与身份体验往往彼此分离。",
        "一项结果可能短暂地让人觉得有用，却没有真正进入长期反思和成长过程。与此同时，人也会随着教育、工作、关系、环境和个人选择持续变化。",
        "InnerGeo 希望把自我发现与反思、可能的发展方向和持续成长连接起来。更好的自我理解应该帮助人提出更好的问题，而不是关闭未来的可能性。",
      ],
    },

    name: {
      eyebrow: "名称背后的含义",
      title: "Inner · Geo",
      disclaimer:
        "这是平台所赋予的象征含义，并不是字典定义或历史词源解释。",
      parts: [
        {
          number: "01",
          title: "Inner",
          description:
            "代表内在世界，包括身份、兴趣、价值观、行为模式、问题与潜力。",
        },
        {
          number: "02",
          title: "Geo",
          description:
            "代表大地、稳定、位置、层次，以及塑造一个人的现实环境。",
        },
        {
          number: "03",
          title: "InnerGeo",
          description:
            "代表一张立足现实的内在地图，把个人身份、现实情境、发展方向与持续成长连接起来。",
        },
      ],
      summary:
        "InnerGeo 象征着在现实生活中保持脚踏实地，同时持续探索自己的内在层次。",
    },

    approach: {
      eyebrow: "我们的方法",
      title: "负责任地进行自我探索",
      description:
        "一个平静而有价值的平台，需要为情境、矛盾、不确定性和变化保留空间。",
      principles: [
        {
          number: "01",
          title: "从多个角度探索",
          description:
            "任何单一测评、星座、结果或标签，都无法完整解释一个人。",
        },
        {
          number: "02",
          title: "把结果作为起点",
          description:
            "结果应该带来问题、观察与实践，而不是成为最终结论。",
        },
        {
          number: "03",
          title: "区分偏好与能力",
          description:
            "喜欢什么、能够做什么以及现实中有哪些机会，可能有交集，但并不完全相同。",
        },
        {
          number: "04",
          title: "为变化保留空间",
          description:
            "人会随着时间成长，不应该被过去的一次结果永久限制。",
        },
        {
          number: "05",
          title: "把理解转化为行动",
          description:
            "有效的自我理解应该支持决策、学习、沟通与个人发展。",
        },
        {
          number: "06",
          title: "尊重不确定性",
          description:
            "负责任的探索需要承认局限，避免制造虚假的精确感。",
        },
      ],
    },

    platform: {
      eyebrow: "平台组成",
      title: "多个视角，彼此清晰区分",
      description:
        "当前已开放的体验与未来功能会保持清晰区分。下方状态反映目前真实可用的内容。",
      currentAreaLabel: "当前区域",
      futureAreaLabel: "未来区域",
      exploreLabel: "探索",
      parts: [
        {
          code: "P",
          title: "人格类型",
          description:
            "探索注意方式、决策倾向、能量来源、沟通方式与个人偏好。",
          status: "介绍、测评与结果已开放",
          href: "/personality",
          available: true,
        },
        {
          code: "C",
          title: "职业兴趣",
          description:
            "通过六个 RIASEC 维度探索更能吸引你的活动、环境与问题类型。",
          status: "介绍、测评与结果已开放",
          href: "/career",
          available: true,
        },
        {
          code: "Z",
          title: "星座身份",
          description:
            "在避免决定论的前提下，探索文化象征、身份主题、故事与反思问题。",
          status: "介绍与互动星盘已开放",
          href: "/zodiac",
          available: true,
        },
        {
          code: "V",
          title: "价值观",
          description:
            "理解影响个人决策的原则、重点与优先顺序。",
          status: "未来概念",
          available: false,
        },
        {
          code: "S",
          title: "优势",
          description:
            "反思反复出现的能力、资源与个人贡献方式。",
          status: "未来概念",
          available: false,
        },
        {
          code: "L",
          title: "学习方式",
          description:
            "探索吸收、练习和应用知识时的偏好，同时避免僵化分类。",
          status: "未来概念",
          available: false,
        },
      ],
    },

    profile: {
      eyebrow: "未来产品方向",
      title: "从独立结果走向持续发展的个人档案",
      description:
        "未来的档案层可以帮助用户进行比较与反思。不同结果之间的矛盾也可能有价值，行为会随环境变化，每一份档案都应该始终保留调整空间。用户应当掌握如何解释自己结果的主动权。",
      status: "综合档案与观察保存功能目前尚未开放。",
      layers: [
        "人格偏好",
        "职业兴趣模式",
        "价值观",
        "优势",
        "学习偏好",
        "沟通模式",
        "个人目标",
        "成长反思",
        "象征身份主题",
        "已保存的观察与提示",
      ],
    },

    framework: {
      eyebrow: "一种可持续的节奏",
      title: "发现、理解与成长",
      items: [
        {
          number: "01",
          title: "发现",
          description:
            "识别自己的模式、兴趣、偏好、价值观、问题与潜在优势。",
        },
        {
          number: "02",
          title: "理解",
          description:
            "把测评结果与真实经历、现实情境、反馈和实际证据进行比较。",
        },
        {
          number: "03",
          title: "成长",
          description:
            "通过实践、学习路径、交流、休息与重新考虑，验证可能的发展方向。",
        },
      ],
      note:
        "成长并不意味着持续保持高效率。休息、重新思考和改变方向同样是有效过程的一部分。",
    },

    boundaries: {
      eyebrow: "清晰边界",
      title: "InnerGeo 不会做什么",
      description:
        "信任始于清楚说明一个自我探索平台不能负责任地作出哪些承诺。",
      items: [
        "诊断心理健康或医学状况",
        "取代合格专业人士的建议",
        "保证职业或关系结果",
        "预测未来事件",
        "决定谁应该被录用、晋升、接纳或拒绝",
        "把一个人简化为固定标签",
        "把象征性内容包装为科学事实",
        "在证据有限时宣称确定性",
      ],
    },

    community: {
      eyebrow: "未来社区愿景",
      title: "分享经历，而不是自动判断匹配度",
      paragraphs: [
        "未来的连接功能可能帮助拥有相似偏好、兴趣、目标、价值观、星座或成长挑战的人彼此认识。",
        "社区可以支持比较经历、讨论解释、分享资源、支持项目，并从相似与不同之处相互学习。仅仅拥有相同标签，永远不能保证真正的适配关系。",
      ],
      status:
        "社区账户、个人档案、评论、聊天、群组与私信功能目前尚未开放。",
    },

    responsible: {
      eyebrow: "负责任的设计",
      title: "为未来功能设定清晰原则",
      description:
        "这些内容是设计原则，并不代表相关认证、审计或系统已经完成。",
      items: [
        "透明说明局限",
        "提供易于理解的结果解释",
        "避免虚假精确",
        "避免操纵性紧迫感",
        "避免决定论式预测",
        "保持界面可访问和易阅读",
        "让用户控制个人信息",
        "谨慎处理敏感反思内容",
        "清楚界定专业建议边界",
        "随着平台发展持续复查",
      ],
    },

    status: {
      eyebrow: "当前平台状态",
      title: "按照清晰阶段持续建设",
      description:
        "InnerGeo 正在分阶段建设。当前网站已经提供三项核心探索体验，而账户、档案保存与社区系统仍处于后续阶段。",
      availableTitle: "当前已开放",
      availableItems: [
        "中英文首页",
        "人格测评与结果",
        "职业兴趣测评与结果",
        "个人星盘与报告",
        "可打印的详细报告",
      ],
      unavailableTitle: "尚未开放",
      unavailableItems: [
        "用户账户与档案保存",
        "社区功能",
        "综合身份档案",
        "商业订阅功能",
      ],
    },

    finalCta: {
      eyebrow: "为变化保留空间",
      title: "你不只是一个结果、一种角色或一个故事。",
      description:
        "InnerGeo 希望成为一个让人带着好奇、现实情境与变化空间探索自己不同层次的平台。",
      personalityAction: "探索人格类型",
      careerAction: "探索职业兴趣",
      zodiacAction: "探索星座身份",
    },
  },
};

export function getAboutDictionary(
  locale: SupportedLocale,
): AboutDictionary {
  return aboutDictionaries[locale];
}
