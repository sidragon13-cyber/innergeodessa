import type {
  DimensionRuleCondition,
  ReportRuleDefinition,
} from "../../rules";

const NON_BALANCED_BANDS = [
  "borderline",
  "moderate",
  "strong",
  "very-strong",
] as const;

const INTJ_COMBINATION_I18N: Record<
  string,
  { title: string; content: string }
> = {
  "intj-combination-private-architecture": {
    title: "内部整合与长期架构",
    content:
      "较强的 I 与 N 偏好可能支持高度集中的内部整合，以及对未来系统模式的持续关注。你可以在不依赖持续外部加工的情况下形成较完整的架构。风险在于，现实证据和协作者可能直到模型已经发展得较成熟之后才真正进入过程。应安排较早的挑战节点，分享关键假设而不仅是最终结论，并明确哪些运营事实一旦出现就足以改变未来方向。",
  },
  "intj-combination-structured-strategy": {
    title: "未来架构与审慎结构",
    content:
      "较强的 N 与 J 偏好可能把长期系统模型与明确的顺序、依赖关系和决策收敛结合起来，使复杂工作能够在短期压力下持续推进。但同样的组合也可能使既定架构更难接受矛盾细节或后续学习。应对战略进行版本化管理，明确每个结构性选择依赖哪些假设，并在实施开始之前就设定复盘触发条件，使未来调整不会被体验成失败。",
  },
  "intj-combination-perfection-risk": {
    title: "精确、标准与完美主义",
    content:
      "较强的 T 与 J 偏好可能支持明确标准、高质量要求和严谨设计。但在压力下，质量也可能逐渐变成一个不断移动的门槛，从而拖延公开、授权或发布。需要区分哪些缺陷会真正损害结果，哪些问题可以通过实际使用获得更好的信息。发布一个范围受控的版本，收集现实证据，并把后续修改视为严谨架构的一部分，而不是原有思考能力不足的证明。",
  },
  "intj-combination-contextual-collaboration": {
    title: "灵活协作与决策标准",
    content:
      "EI 与 TF 处于临界或平衡状态，意味着社交加工方式和决策标准可能随着信任、角色、风险程度和专业经验而变化。你可能在一种情境中独立工作，在另一种情境中通过对话共同构建架构，也可能在非个人化标准与相关方后果之间切换。应有意识地利用这种范围，为具体问题设计真正需要的证据交流，而不是强迫自己符合孤立或纯分析型 INTJ 的刻板形象。",
  },
  "intj-combination-evidence-led-adaptation": {
    title: "以证据推动架构修正",
    content:
      "SN 与 JP 处于临界或平衡状态，可能使你能够在未来架构、当前事实、结构化承诺和迭代式修正之间灵活移动。长期目标可以保持一致，而具体方法则随着证据发展而改变。应把这种灵活性明确化：说明哪些原则保持稳定、当前处于哪个版本、还有哪些异常没有解释，以及下一次复盘日期，使调整成为模型增强的一部分，而不是看起来像任意改变。",
  },
  "intj-combination-provisional-profile": {
    title: "暂定且混合的 INTJ 模式",
    content:
      "三个或更多低置信度维度意味着 INTJ 结果应被视为高度暂定。相邻偏好可能同样容易被调用，现实行为也可能随着文化、角色、压力、专业经验和信任程度发生明显变化。报告仍然可以作为一组有价值的假设，但如果对独处、预见、逻辑或结构作出过于确定的判断，就已经超出了证据本身。应把解释与重复出现的真实情境进行比较，并主动保留那些不符合战略型刻板印象的例子。",
  },
  "intj-combination-outward-strategy": {
    title: "外显战略与协调结构",
    content:
      "偏向 E 与 J 的结果可能产生比传统内向型刻板印象更明显的协调、讨论和决策结构。你可能与他人共同建立模型，并在优先级明确之后主动推动执行。这并不会否定 INTJ 结果。仍然需要保护足够的个人整合时间来检查假设，同时避免公开而果断的表现阻止专业人员用现实证据挑战整个架构。",
  },
  "intj-combination-values-architecture": {
    title: "融合价值与正当性的长期设计",
    content:
      "偏向 N 与 F 的结果可能把未来系统思考与对价值观、正当性及相关方体验的更强关注结合起来。系统架构可能不仅以效率衡量成功，也会考虑人的长期可持续性。这并不会否定 INTJ 分类。应让真正受到影响的人参与检验关键假设，明确谁承担转型成本，并在技术表现之外同步衡量信任与实际采用程度。",
  },
};

export const INTJ_COMBINATION_RULES:
  readonly ReportRuleDefinition[] = [
    combinationRule(
      "intj-combination-private-architecture",
      90,
      [
        dimension("EI", ["I"], ["strong", "very-strong"]),
        dimension("SN", ["N"], ["strong", "very-strong"]),
      ],
      "core-personality-pattern",
      "intj-combination-architecture",
      "Private Synthesis and Long-Range Architecture",
      "Strong I and N preferences may support concentrated internal synthesis and a strong orientation to future system patterns. The person can develop an integrated architecture without constant external processing. A risk is that evidence and collaborators enter only after the model is advanced. Schedule an early challenge point, share the assumptions rather than only the conclusion, and identify which operational observations could materially change the future direction.",
    ),
    combinationRule(
      "intj-combination-structured-strategy",
      89,
      [
        dimension("SN", ["N"], ["strong", "very-strong"]),
        dimension("JP", ["J"], ["strong", "very-strong"]),
      ],
      "core-personality-pattern",
      "intj-combination-architecture",
      "Future Architecture and Deliberate Structure",
      "Strong N and J preferences may connect a long-range system model with clear sequencing, dependencies, and closure. This can sustain complex work beyond immediate pressure. The same combination can make the chosen architecture resistant to contradictory detail or later learning. Version the strategy, specify which assumptions support each structural choice, and establish review triggers before implementation makes adaptation feel like failure.",
    ),
    combinationRule(
      "intj-combination-perfection-risk",
      88,
      [
        dimension("TF", ["T"], ["strong", "very-strong"]),
        dimension("JP", ["J"], ["strong", "very-strong"]),
      ],
      "growth-roadmap",
      "intj-combination-isolation-risk",
      "Precision, Standards, and Perfectionism",
      "Strong T and J preferences may support explicit criteria, high standards, and disciplined design. Under pressure, quality can become an endlessly moving threshold that delays exposure, delegation, or release. Define which defects would materially compromise the outcome and which can be learned from in use. Release a bounded version, collect evidence, and treat revision as part of rigorous architecture rather than proof that the original thinking lacked competence.",
    ),
    combinationRule(
      "intj-combination-contextual-collaboration",
      87,
      [
        dimension("EI", ["I", "E", "X"], [
          "borderline",
          "balanced",
        ]),
        dimension("TF", ["F", "T", "X"], [
          "borderline",
          "balanced",
        ]),
      ],
      "growth-roadmap",
      "intj-combination-isolation-risk",
      "Flexible Collaboration and Decision Criteria",
      "Borderline or balanced EI and TF results suggest that social processing and decision criteria may change with trust, role, stakes, and expertise. The person may work privately in one context, architect through dialogue in another, and shift between impersonal standards and stakeholder consequences. Use this range deliberately by designing the evidence conversation the problem requires rather than forcing a solitary or purely analytical image of INTJ work.",
    ),
    combinationRule(
      "intj-combination-evidence-led-adaptation",
      86,
      [
        dimension("SN", ["S", "N", "X"], [
          "borderline",
          "balanced",
        ]),
        dimension("JP", ["J", "P", "X"], [
          "borderline",
          "balanced",
        ]),
      ],
      "change-and-adaptation",
      "intj-combination-adaptation",
      "Architecture With Evidence-Led Revision",
      "Borderline or balanced SN and JP results may support movement between future architecture, present facts, structured commitment, and iterative revision. The person can preserve a coherent objective while allowing methods to change as evidence develops. Make the flexibility explicit: name the stable principles, current version, unresolved anomalies, and review date so adaptation strengthens the model rather than appearing as arbitrary change.",
    ),
    aggregateCombinationRule(
      "intj-combination-provisional-profile",
      85,
      "low-confidence-count",
      3,
      "change-and-adaptation",
      "intj-combination-adaptation",
      "A Provisional, Blended INTJ Profile",
      "Three or more low-confidence dimensions mean the INTJ result should be read as highly provisional. Neighbouring preferences may be similarly accessible, and behaviour can vary with culture, role, stress, expertise, and trust. The report remains a useful set of hypotheses, but firm claims about privacy, foresight, logic, or structure would exceed the evidence. Compare interpretations with repeated situations and preserve examples that contradict the strategic stereotype.",
    ),
    combinationRule(
      "intj-combination-outward-strategy",
      84,
      [
        dimension("EI", ["E"], [...NON_BALANCED_BANDS]),
        dimension("JP", ["J"], [...NON_BALANCED_BANDS]),
      ],
      "growth-roadmap",
      "intj-combination-isolation-risk",
      "Visible Strategy and Coordinated Structure",
      "E-leaning and J-leaning results may produce more visible coordination, discussion, and decision structure than an inward stereotype suggests. The person may build the model with others and mobilise execution once priorities are clear. This does not invalidate the INTJ result. Protect enough private integration to examine assumptions, and ensure visible decisiveness does not prevent specialists from challenging the architecture with evidence.",
    ),
    combinationRule(
      "intj-combination-values-architecture",
      83,
      [
        dimension("SN", ["N"], [...NON_BALANCED_BANDS]),
        dimension("TF", ["F"], [...NON_BALANCED_BANDS]),
      ],
      "change-and-adaptation",
      "intj-combination-adaptation",
      "Long-Range Design With Values and Legitimacy",
      "N-leaning and F-leaning results may combine future systems thinking with stronger attention to values, legitimacy, and stakeholder experience. The architecture may define success through human sustainability as well as efficiency. This does not invalidate the INTJ classification. Include affected people in testing assumptions, identify who carries transition costs, and measure trust and adoption alongside technical performance.",
    ),
  ];

function dimension(
  dimensionCode: DimensionRuleCondition["dimension"],
  preferences: NonNullable<
    DimensionRuleCondition["preferences"]
  >,
  bands: NonNullable<DimensionRuleCondition["bands"]>,
): DimensionRuleCondition {
  return {
    kind: "dimension",
    dimension: dimensionCode,
    preferences,
    bands,
  };
}

function combinationRule(
  id: string,
  priority: number,
  all: DimensionRuleCondition[],
  targetSectionId: string,
  targetSlotId: string,
  title: string,
  content: string,
): ReportRuleDefinition {
  return {
    id,
    personalityType: "INTJ",
    priority,
    conditions: [{ kind: "combination", all }],
    content: [
      {
        targetSectionId,
        targetSlotId,
        blockId: `${id}-block`,
        blockType: "analysis",
        title: {
          en: title,
          zh: INTJ_COMBINATION_I18N[id].title,
        },
        content: {
          en: content,
          zh: INTJ_COMBINATION_I18N[id].content,
        },
      },
    ],
    tags: ["combination"],
  };
}

function aggregateCombinationRule(
  id: string,
  priority: number,
  metric: "low-confidence-count",
  value: number,
  targetSectionId: string,
  targetSlotId: string,
  title: string,
  content: string,
): ReportRuleDefinition {
  return {
    id,
    personalityType: "INTJ",
    priority,
    conditions: [
      {
        kind: "aggregate",
        metric,
        operator: "gte",
        value,
      },
    ],
    content: [
      {
        targetSectionId,
        targetSlotId,
        blockId: `${id}-block`,
        blockType: "guidance",
        title: {
          en: title,
          zh: INTJ_COMBINATION_I18N[id].title,
        },
        content: {
          en: content,
          zh: INTJ_COMBINATION_I18N[id].content,
        },
      },
    ],
    tags: ["combination"],
  };
}
