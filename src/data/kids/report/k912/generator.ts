import { THINK_DISCOVER_PARENT_OBSERVATION } from "./content/combinations/think-discover";
import { K912_COMBINATION_PACKS, K912_DOMAIN_PACKS } from "./content";
import { K912_MASTER_TEMPLATE, K912_SECTION_TITLES } from "./content/master-template";
import { K912_INTERPRETATION_BOUNDARIES } from "./rules/interpretation-boundaries";
import { resolveK912Combination } from "./rules/combination-resolver";
import { K912_DOMAIN_LABELS, type K912FacetEvidence, type K912LocalizedText, type K912ReportFacts } from "./types";

export const K912_PROFESSIONAL_REPORT_VERSION = "K912-PROFESSIONAL-REPORT-V1" as const;
export const K912_REPORT_SECTION_IDS = [
  "report-identity", "parent-child-executive-summary", "six-domain-interest-profile", "current-interest-structure",
  "highlighted-interest-drivers", "behaviour-evidence", "interest-combination", "broader-interest-context",
  "exploration-environments", "what-to-explore-next", "parent-child-observation-plan", "methodology-interpretation-boundaries",
] as const;
export type K912ReportSectionId = (typeof K912_REPORT_SECTION_IDS)[number];

export type K912ReportBlockKind =
  | "paragraph"
  | "heading"
  | "bullet-list"
  | "callout"
  | "evidence"
  | "project"
  | "reflection"
  | "observation"
  | "boundary";

export interface GeneratedK912ReportBlock {
  readonly id: string;
  readonly kind: K912ReportBlockKind;
  readonly title?: K912LocalizedText;
  readonly paragraphs?: readonly K912LocalizedText[];
  readonly items?: readonly K912LocalizedText[];
}

export interface GeneratedK912Section {
  readonly id: K912ReportSectionId;
  readonly title: K912LocalizedText;

  /**
   * Legacy paragraph output.
   * Retained temporarily while K912 Final Assembly migrates
   * to structured professional-report blocks.
   */
  readonly paragraphs: readonly K912LocalizedText[];

  /**
   * Final Professional Report structure.
   * Allows authored content to preserve headings, lists,
   * evidence, projects, reflections and boundaries.
   */
  readonly blocks?: readonly GeneratedK912ReportBlock[];
}
export interface GeneratedK912ProfessionalReport {
  readonly reportVersion: typeof K912_PROFESSIONAL_REPORT_VERSION;
  readonly facts: K912ReportFacts;
  readonly combination: ReturnType<typeof resolveK912Combination>;
  readonly evidence: readonly K912FacetEvidence[];
  readonly sections: readonly GeneratedK912Section[];
}

const join = (en: string, zh: string): K912LocalizedText => ({ en, zh });

export function generateK912ProfessionalReport(facts: K912ReportFacts): GeneratedK912ProfessionalReport {
  const combination = resolveK912Combination(facts);
  const combinationPack = K912_COMBINATION_PACKS[combination.key];
  const primaryPack = K912_DOMAIN_PACKS[combination.primary];
  const secondaryPack = K912_DOMAIN_PACKS[combination.secondary];

  const primaryProfessional = primaryPack.professional;
  const secondaryProfessional = secondaryPack.professional;
  const topThreeDomains = facts.ranking.slice(0, 3);
  const thirdDomain = topThreeDomains[2];
  const thirdPack = K912_DOMAIN_PACKS[thirdDomain];
  const thirdProfessional = thirdPack.professional;
  const thirdLabel = K912_DOMAIN_LABELS[thirdDomain];

  const patternContextZh =
    ({
      "Clear Exploration Pattern": "清晰兴趣结构",
      "Broad Exploration Pattern": "广泛兴趣结构",
      "Emerging Exploration Pattern": "正在形成的兴趣结构",
      "Clustered Exploration Pattern": "多方向接近的兴趣结构",
    } as Readonly<Record<string, string>>)[facts.patternContext] ??
    facts.patternContext;
  const ranking = facts.ranking.map((domain, index) => `${index + 1}. ${K912_DOMAIN_LABELS[domain].en} ${facts.scores[domain]}`).join(" · ");
  const rankingZh = facts.ranking.map((domain, index) => `${index + 1}. ${K912_DOMAIN_LABELS[domain].zh} ${facts.scores[domain]}`).join(" · ");
  const selectedEvidence = topThreeDomains.flatMap((domain) =>
    [...facts.evidenceByDomain[domain]]
      .sort(
        (left, right) =>
          right.responseValue - left.responseValue ||
          left.displayOrder - right.displayOrder,
      )
      .slice(0, 2),
  );

  // K912 TASK 4A: choose approved guidance from selected Think evidence.
  const secondThinkFacet = selectedEvidence
    .filter((item) => item.domain === "think")[1]?.facet.zh ?? "";

  const thinkDiscoverFacetAdvice = secondThinkFacet.includes("约束")
    ? join(
        "Explore how the child approaches several rules or constraints, develops a possible solution, and checks whether it meets the conditions.",
        "可以优先尝试带有多项规则或限制条件的任务，让孩子提出可行方案，再检查是否符合条件。",
      )
    : secondThinkFacet.includes("比较")
      ? join(
          "Explore how the child compares two strategies, explains their trade-offs, and checks a chosen approach through observation.",
          "可以优先尝试比较两种解决策略，让孩子说明各自取舍，并通过观察检验选择的方案。",
        )
      : join(
          "Try an activity combining comparison of possible explanations with observation and evidence checking.",
          "可以优先尝试兼具方案比较与证据检验的活动，通过真实观察进一步了解兴趣。",
        );

  // TASK 4D-2C: Evidence-linked action for Discover + Build.
  const discoverBuildSecondFacet =
    selectedEvidence.filter((item) => item.domain === "discover")[1]?.facet.zh ?? "";

  const discoverBuildAction = discoverBuildSecondFacet.includes("持续观察")
    ? {
        project: join(
          "Use the existing model project to observe the same feature at several points in time. Record what changes and what stays the same before deciding on a modification.",
          "沿用现有模型项目，在多个时间点观察同一特征，记录哪些发生变化、哪些保持不变，再决定是否修改模型。",
        ),
        observation: join(
          "Observe whether the child voluntarily returns to collect further observations and uses changes over time to reconsider an earlier explanation.",
          "观察孩子是否愿意主动回来继续记录，并根据不同时间的变化重新考虑原先的解释。",
        ),
      }
    : discoverBuildSecondFacet.includes("证据检验")
      ? {
          project: join(
            "Use the existing model project to test one explanation. Change only one condition at a time, record the result, and discuss whether the evidence supports the explanation.",
            "沿用现有模型项目检验一个解释：每次只改变一个条件，记录测试结果，再讨论证据是否支持原先的解释。",
          ),
          observation: join(
            "Observe whether the child is willing to test a prediction, notice results that differ from expectations, and reconsider the explanation.",
            "观察孩子是否愿意检验猜测、注意与预期不同的结果，并重新考虑原先的解释。",
          ),
        }
      : {
          project: join(
            "Use the existing project to investigate one question and record observations before deciding what to change.",
            "沿用现有项目调查一个具体问题，先记录观察结果，再决定需要修改什么。",
          ),
          observation: join(
            "Observe which investigation or recording steps the child chooses to revisit voluntarily.",
            "观察孩子愿意主动重复哪些调查或记录环节。",
          ),
        };

  // TASK 4D-1: Facet-specific actions for the validated Think + Discover pilot.
  const thinkDiscoverAction = secondThinkFacet.includes("约束")
    ? {
        project: join(
          "Try a challenge with several rules. Ask the child to propose a solution, check each condition, and revise the approach if necessary.",
          "尝试一个包含多项规则的挑战：让孩子提出方案、逐项检查条件，并在不符合要求时调整方法。",
        ),
        observation: join(
          "Observe whether working through several constraints remains interesting and whether the child voluntarily checks and revises the solution.",
          "观察孩子是否愿意主动处理多项限制、逐项检查方案，并在发现不符合条件时继续调整。",
        ),
      }
    : secondThinkFacet.includes("比较")
      ? {
          project: join(
            "Present two strategies for one problem. Invite the child to compare trade-offs, choose one, and test the result.",
            "为同一问题提供两种策略，让孩子比较各自取舍、选择一种方案，并测试实际结果。",
          ),
          observation: join(
            "Observe whether comparing alternatives is enjoyable and whether the child voluntarily adjusts a strategy after feedback.",
            "观察孩子是否愿意主动比较不同方法，并在看到反馈后继续调整策略。",
          ),
        }
      : {
          project: join(
            "Try a simple reasoning-and-investigation activity and observe which step attracts the child's interest.",
            "尝试一个结合思考与调查的小任务，观察孩子更愿意参与其中哪个环节。",
          ),
          observation: join(
            "Observe which part of the activity the child voluntarily chooses, repeats, or wishes to investigate further.",
            "观察孩子主动选择、重复或希望继续调查的具体环节。",
          ),
        };

  const behaviourEvidence = selectedEvidence.map((item) => {
    const label = K912_DOMAIN_LABELS[item.domain];

    const responseMeaning = {
      1: join(
        "Little interest expressed in this activity at present.",
        "目前对这一活动表达的兴趣较低。",
      ),
      2: join(
        "A relatively low level of interest expressed at present.",
        "目前表达的兴趣相对较低。",
      ),
      3: join(
        "Interest is uncertain and worth exploring further.",
        "当前兴趣尚不明确，值得通过实际体验进一步观察。",
      ),
      4: join(
        "A positive level of interest expressed in this activity.",
        "目前对这一活动表达了较积极的兴趣。",
      ),
      5: join(
        "A strong level of interest expressed in this activity.",
        "目前对这一活动表达了较强的兴趣。",
      ),
    }[item.responseValue];

    return join(
      `${label.en} · ${item.facet.en} · ${item.responseValue}/5. Assessment item: "${item.prompt.en}". ${responseMeaning.en}`,
      `${label.zh} · ${item.facet.zh} · ${item.responseValue}/5。对应题目：“${item.prompt.zh}”。${responseMeaning.zh}`,
    );
  });

  const backgroundInterestItems = facts.ranking
    .slice(3)
    .map((domain) =>
      join(
        `${K912_DOMAIN_LABELS[domain].en} · ${Math.round(facts.scores[domain])}/100. Domain activity description, not evidence of strong current interest: ${K912_DOMAIN_PACKS[domain].interpretation.en}`,
        `${K912_DOMAIN_LABELS[domain].zh} · ${Math.round(facts.scores[domain])}/100。以下描述的是该领域包含的活动，并非孩子当前有较强兴趣的证明：${K912_DOMAIN_PACKS[domain].interpretation.zh}`,
      ),
    );

  const sections: readonly GeneratedK912Section[] = [
    {
      id: "report-identity",
      title: K912_SECTION_TITLES[0],
      paragraphs: [
        K912_MASTER_TEMPLATE.identity,
        K912_MASTER_TEMPLATE.purpose,
        K912_MASTER_TEMPLATE.scale,
      ],
      blocks: [
        {
          id: "report-purpose",
          kind: "callout",
          title: join(
            "How to read this report",
            "如何阅读这份报告",
          ),
          paragraphs: [
            K912_MASTER_TEMPLATE.identity,
            K912_MASTER_TEMPLATE.purpose,
          ],
        },
        {
          id: "report-scale",
          kind: "paragraph",
          title: join(
            "What the scores mean",
            "分数代表什么",
          ),
          paragraphs: [K912_MASTER_TEMPLATE.scale],
        },
      ],
    },

    {
      id: "parent-child-executive-summary",
      title: K912_SECTION_TITLES[1],
      paragraphs: [
        combinationPack.combinationSummary,
        combinationPack.whyThisCombinationMatters,
        join(
          `${thirdLabel.en} ranks third at ${Math.round(facts.scores[thirdDomain])}/100. This is a supplementary exploration signal, not a proven ability or permanent strength.`,
          `${thirdLabel.zh}位列本次兴趣排序第三，得分${Math.round(facts.scores[thirdDomain])}/100。这是值得通过真实活动继续观察的补充兴趣信号，不代表能力或稳定优势。`,
        ),
      ],
      blocks: [
        {
          id: "executive-combination",
          kind: "callout",
          title: join(
            `${K912_DOMAIN_LABELS[combination.primary].en} + ${K912_DOMAIN_LABELS[combination.secondary].en}`,
            `${K912_DOMAIN_LABELS[combination.primary].zh}＋${K912_DOMAIN_LABELS[combination.secondary].zh}`,
          ),
          paragraphs: [
            join(
              combination.key === "think-discover"
                ? `The current interest scores are Think ${Math.round(facts.scores.think)}/100 and Discover ${Math.round(facts.scores.discover)}/100. Selected item responses: ${selectedEvidence.map((item) => `${item.facet.en} ${item.responseValue}/5`).join("; ")}. ${thinkDiscoverFacetAdvice.en} ${facts.leadingCluster.includes("think") && facts.leadingCluster.includes("discover")
                  ? "These interests belong to the same recorded leading cluster; their ranking should not be treated as a stable preference difference."
                  : "The ranking reflects current responses, not a fixed or permanent preference."} These are interest signals, not ability findings.`
                : `The current responses highlight ${K912_DOMAIN_LABELS[combination.primary].en} and ${K912_DOMAIN_LABELS[combination.secondary].en} as leading interest areas. This report uses the six-domain results and individual item responses to explore how these interests may interact in activities.`,
              combination.key === "think-discover"
                ? `本次兴趣分数为思考${Math.round(facts.scores.think)}/100、探索${Math.round(facts.scores.discover)}/100。精选题目回应包括：${selectedEvidence.map((item) => `${item.facet.zh}${item.responseValue}/5`).join("；")}。${thinkDiscoverFacetAdvice.zh}${facts.leadingCluster.includes("think") && facts.leadingCluster.includes("discover")
                  ? "思考与探索同属本次结果中的领先兴趣组，不宜仅凭排序判断稳定偏好。"
                  : "当前排序仅反映本次兴趣回应，不代表固定或永久的兴趣偏好。"}这些结果是兴趣线索，不代表能力判断。`
                : `本次回答中，孩子当前较突出的兴趣方向为${K912_DOMAIN_LABELS[combination.primary].zh}与${K912_DOMAIN_LABELS[combination.secondary].zh}。报告将结合六领域结果与具体题目回应，进一步说明这两个方向可能如何共同影响活动选择。`,
            ),
          ],
        },
        {
          id: "executive-third-interest",
          kind: "paragraph",
          title: join(
            "Third interest · supplementary exploration",
            "第三兴趣 · 补充探索方向",
          ),
          paragraphs: [
            join(
              `${thirdLabel.en} is third at ${Math.round(facts.scores[thirdDomain])}/100. Explore whether interest persists during real activities; this result does not establish ability or lasting strength.`,
              `${thirdLabel.zh}位列第三，得分${Math.round(facts.scores[thirdDomain])}/100。应通过真实活动观察参与兴趣是否持续，不能据此认定能力或稳定优势。`,
            ),
          ],
        },
        {
          id: "executive-meaning",
          kind: "paragraph",
          title: join(
            "What is most worth noticing now",
            "现在最值得关注什么",
          ),
          paragraphs: [combinationPack.whyThisCombinationMatters],
        },
      ],
    },

    {
      id: "six-domain-interest-profile",
      title: K912_SECTION_TITLES[2],
      paragraphs: [
        join(ranking, rankingZh),
        join(
          "Raw scores use the persisted 7–35 domain range. Normalised scores preserve the persisted 0–100 presentation scale.",
          "原始分数采用已保存的每领域7–35分范围；标准化分数采用已保存的0–100展示范围。",
        ),
      ],
      blocks: [
        {
          id: "six-domain-ranking",
          kind: "evidence",
          title: join(
            "Current six-domain ranking",
            "当前六维兴趣排序",
          ),
          items: facts.ranking.map((domain, index) =>
            join(
              `#${index + 1} ${K912_DOMAIN_LABELS[domain].en} · ${Math.round(facts.scores[domain])} · raw ${facts.rawScores[domain]}/35`,
              `#${index + 1} ${K912_DOMAIN_LABELS[domain].zh} · ${Math.round(facts.scores[domain])} · 原始分 ${facts.rawScores[domain]}/35`,
            ),
          ),
        },
        {
          id: "six-domain-scale",
          kind: "paragraph",
          paragraphs: [
            join(
              "The six scores are read together as a current interest map. They are not six independent labels.",
              "六个分数需要作为一张当前兴趣地图共同阅读，而不是六个彼此独立的标签。",
            ),
          ],
        },
      ],
    },

    {
      id: "current-interest-structure",
      title: K912_SECTION_TITLES[3],
      paragraphs: [
        join(
          `Current pattern context: ${facts.patternContext}. First–second gap: ${facts.firstSecondGap.toFixed(1)}; second–third gap: ${facts.secondThirdGap.toFixed(1)}; overall spread: ${facts.overallSpread.toFixed(1)}.`,
          `当前模式背景：${patternContextZh}。第一与第二差距：${facts.firstSecondGap.toFixed(1)}；第二与第三差距：${facts.secondThirdGap.toFixed(1)}；整体跨度：${facts.overallSpread.toFixed(1)}。`,
        ),
        join(
          "Exact ties and the leading cluster are retained as score facts. Small differences do not establish a permanent hierarchy.",
          "完全同分与领先组均作为分数事实保留。分数差异描述的是本次兴趣结构，不建立永久层级。",
        ),
      ],
      blocks: [
        {
          id: "interest-pattern",
          kind: "callout",
          title: join(
            "Current interest structure",
            "本次兴趣结构",
          ),
          paragraphs: [
            join(
              `Pattern: ${facts.patternContext}. Primary: ${K912_DOMAIN_LABELS[combination.primary].en}. Secondary: ${K912_DOMAIN_LABELS[combination.secondary].en}.`,
              `当前结构：${patternContextZh}。第一兴趣为${K912_DOMAIN_LABELS[combination.primary].zh}，第二兴趣为${K912_DOMAIN_LABELS[combination.secondary].zh}。`,
            ),
          ],
        },
        {
          id: "interest-gaps",
          kind: "evidence",
          title: join(
            "Result structure facts",
            "结果结构数据",
          ),
          items: [
            join(
              `First–second gap: ${Math.round(facts.firstSecondGap)}`,
              `第一与第二差距：${Math.round(facts.firstSecondGap)}`,
            ),
            join(
              `Second–third gap: ${Math.round(facts.secondThirdGap)}`,
              `第二与第三差距：${Math.round(facts.secondThirdGap)}`,
            ),
            join(
              `Overall spread: ${Math.round(facts.overallSpread)}`,
              `六维整体跨度：${Math.round(facts.overallSpread)}`,
            ),
          ],
        },
      ],
    },

    {
      id: "highlighted-interest-drivers",
      title: K912_SECTION_TITLES[4],
      paragraphs: topThreeDomains.flatMap((domain) => {
        const professional = K912_DOMAIN_PACKS[domain].professional;
        return [
          professional.coreDefinition,
          professional.typicalExpression,
          professional.engagementConditions,
          professional.lowerEngagementConditions,
        ];
      }),
      blocks: topThreeDomains.flatMap((domain, index) => {
        const professional = K912_DOMAIN_PACKS[domain].professional;
        const label = K912_DOMAIN_LABELS[domain];
        const rank = index + 1;
        return [
          {
            id: `top-${rank}-definition`,
            kind: "callout" as const,
            title: join(
              `${label.en} · Interest #${rank}`,
              `${label.zh} · 第${rank}兴趣方向`,
            ),
            paragraphs: [professional.coreDefinition],
          },
          {
            id: `top-${rank}-real-world`,
            kind: "bullet-list" as const,
            title: join(
              `${label.en} · Real-world expressions`,
              `${label.zh} · 现实活动中的兴趣表现`,
            ),
            items: [professional.typicalExpression],
          },
          {
            id: `top-${rank}-engagement`,
            kind: "bullet-list" as const,
            title: join(
              `${label.en} · Supporting conditions`,
              `${label.zh} · 有利于参与的条件`,
            ),
            items: [professional.engagementConditions],
          },
          {
            id: `top-${rank}-lower-engagement`,
            kind: "bullet-list" as const,
            title: join(
              `${label.en} · Less supportive conditions`,
              `${label.zh} · 可能降低参与的条件`,
            ),
            items: [professional.lowerEngagementConditions],
          },
        ];
      }),
    },

    {
      id: "behaviour-evidence",
      title: K912_SECTION_TITLES[5],
      paragraphs: [
        join(
          "All 42 recorded responses remain traceable in the report data. The report selects a small number of real Facet Evidence points from the top three current interest domains.",
          "全部42项真实回应仍完整保留并可以追溯。完整报告从当前排名前三的兴趣方向中选择少量真实Facet证据进行重点解释。",
        ),
        ...behaviourEvidence,
      ],
      blocks: [
        {
          id: "evidence-introduction",
          kind: "paragraph",
          paragraphs: [
            join(
              "Facet Evidence connects the report back to the child's real answers. These examples support interpretation but do not measure ability.",
              "Facet证据把报告重新连接到孩子的真实答题。它们用于支持兴趣解释，但不测量能力。",
            ),
          ],
        },
        {
          id: "top-three-facet-coverage",
          kind: "bullet-list",
          title: join(
            "Seven-facet coverage across the top three interests",
            "前三兴趣方向的七个兴趣侧面",
          ),
          items: topThreeDomains.map((domain) => {
            const professional = K912_DOMAIN_PACKS[domain].professional;
            const label = K912_DOMAIN_LABELS[domain];
            return join(
              `${label.en}\n${professional.facetCoverage.en}`,
              `${label.zh}\n${professional.facetCoverage.zh}`,
            );
          }),
        },
        {
          id: "personalized-facet-interpretation",
          kind: "paragraph",
          title: join(
            "What the selected responses suggest",
            "精选回应说明了什么",
          ),
          paragraphs: topThreeDomains.map((domain) => {
            const evidence = selectedEvidence.filter((item) => item.domain === domain);
            const first = evidence[0];
            const second = evidence[1];
            const label = K912_DOMAIN_LABELS[domain];

            if (!first || !second) {
              throw new Error(`K912 missing selected Facet evidence for ${domain}`);
            }

            return join(
              `${label.en}: The child responded ${first.responseValue}/5 to ${first.facet.en} and ${second.responseValue}/5 to ${second.facet.en}. These are two selected current interest responses, not proof of observed behaviour or ability. Try an activity involving these processes and observe which part the child voluntarily returns to.`,
              `${label.zh}：本次对“${first.facet.zh}”的兴趣回应为${first.responseValue}/5，对“${second.facet.zh}”的兴趣回应为${second.responseValue}/5。这两项是本次精选的兴趣线索，并不代表其他侧面没有兴趣，也不能证明已经具备相应能力。可以安排包含这些过程的小任务，观察孩子更愿意主动选择、重复或继续其中哪个环节。`,
            );
          }),
        },
        {
          id: "selected-facet-evidence",
          kind: "evidence",
          title: join(
            "Selected real response evidence",
            "本次精选真实回应证据",
          ),
          items: behaviourEvidence,
        },
      ],
    },

    {
      id: "interest-combination",
      title: K912_SECTION_TITLES[6],
      paragraphs: [
        combinationPack.combinationSummary,
        combinationPack.interestDrivers,
        combinationPack.behaviourPattern,
        combinationPack.developmentDirection,
      ],
      blocks: [
        {
          id: "combination-core",
          kind: "callout",
          title: join(
            "Core combination theme",
            "组合核心主题",
          ),
          paragraphs: [combinationPack.combinationSummary],
        },
        {
          id: "combination-logic",
          kind: "paragraph",
          title: join(
            "Interaction logic",
            "互动逻辑",
          ),
          paragraphs: [combinationPack.interestDrivers],
        },
        {
          id: "combination-expression",
          kind: "bullet-list",
          title: join(
            "Real-world expression",
            "现实中的组合表现",
          ),
          items: [combinationPack.behaviourPattern],
        },
        {
          id: "combination-direction",
          kind: "paragraph",
          title: join(
            "Development direction",
            "值得继续观察的发展方向",
          ),
          paragraphs: [combinationPack.developmentDirection],
        },
      ],
    },

    {
      id: "broader-interest-context",
      title: K912_SECTION_TITLES[7],
      paragraphs: backgroundInterestItems,
      blocks: [
        {
          id: "background-context",
          kind: "paragraph",
          paragraphs: [
            join(
              "The remaining three domains are not discarded. They provide context for how broad or concentrated the current interest map is.",
              "其余三个兴趣方向并没有被排除，它们用于帮助理解当前兴趣地图是更集中还是更广泛。",
            ),
          ],
        },
        {
          id: "background-domains",
          kind: "bullet-list",
          title: join(
            "Other current interest signals",
            "其他当前兴趣信号",
          ),
          items: backgroundInterestItems,
        },
      ],
    },

    {
      id: "exploration-environments",
      title: K912_SECTION_TITLES[8],
      paragraphs: [
        combinationPack.suitableEnvironment,
        primaryPack.explorationEnvironment,
        secondaryPack.explorationEnvironment,
        thirdPack.explorationEnvironment,
      ],
      blocks: [
        {
          id: "combination-environment",
          kind: "callout",
          title: join(
            "Best environment for the combination",
            "更适合这一组合的探索环境",
          ),
          paragraphs: [combinationPack.suitableEnvironment],
        },
        {
          id: "primary-environment",
          kind: "paragraph",
          title: join(
            `${K912_DOMAIN_LABELS[combination.primary].en} environment`,
            `${K912_DOMAIN_LABELS[combination.primary].zh}兴趣环境`,
          ),
          paragraphs: [primaryPack.explorationEnvironment],
        },
        {
          id: "secondary-environment",
          kind: "paragraph",
          title: join(
            `${K912_DOMAIN_LABELS[combination.secondary].en} environment`,
            `${K912_DOMAIN_LABELS[combination.secondary].zh}兴趣环境`,
          ),
          paragraphs: [secondaryPack.explorationEnvironment],
        },
        {
          id: "third-exploration-environment",
          kind: "paragraph",
          title: join(
            `${thirdLabel.en} · Additional exploration environment`,
            `${thirdLabel.zh} · 补充探索环境`,
          ),
          paragraphs: [thirdPack.explorationEnvironment],
        },
      ],
    },

    {
      id: "what-to-explore-next",
      title: K912_SECTION_TITLES[9],
      paragraphs: [
        combinationPack.projectSuggestions,
        thirdProfessional.quickExploration,
        thirdProfessional.miniProject,
        thirdProfessional.deeperExploration,
      ],
      blocks: [
        {
          id: "combination-exploration",
          kind: "project",
          title: join(
            "Combination exploration",
            "组合探索建议",
          ),
          items: [combinationPack.projectSuggestions],
        },
        ...(combination.key === "think-discover"
          ? [{
              id: "personalized-facet-project",
              kind: "project" as const,
              title: join(
                "Personalized exploration focus",
                "本次个性化探索重点",
              ),
              items: [thinkDiscoverAction.project],
            }]
          : []),
        ...(combination.key === "discover-build"
          ? [{
              id: "personalized-facet-project",
              kind: "project" as const,
              title: join(
                "Personalized exploration focus",
                "本次个性化探索重点",
              ),
              items: [discoverBuildAction.project],
            }]
          : []),
        {
          id: "third-exploration-projects",
          kind: "project",
          title: join(
            `${thirdLabel.en} · Optional exploration`,
            `${thirdLabel.zh} · 补充探索建议`,
          ),
          items: [
            join(
              `Quick: ${thirdProfessional.quickExploration.en}`,
              `快速体验：${thirdProfessional.quickExploration.zh}`,
            ),
            join(
              `Mini: ${thirdProfessional.miniProject.en}`,
              `短期项目：${thirdProfessional.miniProject.zh}`,
            ),
            join(
              `Deep: ${thirdProfessional.deeperExploration.en}`,
              `深入探索：${thirdProfessional.deeperExploration.zh}`,
            ),
          ],
        },
      ],
    },

    {
      id: "parent-child-observation-plan",
      title: K912_SECTION_TITLES[10],
      paragraphs: [
        combinationPack.childReflection,
        combinationPack.parentObservation,
        (combination.key === "think-discover" ? THINK_DISCOVER_PARENT_OBSERVATION.primary : primaryProfessional.parentObservation),
        (combination.key === "think-discover" ? THINK_DISCOVER_PARENT_OBSERVATION.secondary : secondaryProfessional.parentObservation),
        thirdProfessional.childReflection,
        thirdProfessional.parentObservation,
      ],
      blocks: [
        {
          id: "combination-child-reflection",
          kind: "reflection",
          title: join(
            "Child reflection · combination",
            "孩子自我反思 · 兴趣组合",
          ),
          items: [combinationPack.childReflection],
        },
        {
          id: "combination-parent-observation",
          kind: "observation",
          title: join(
            "Parent observation · combination",
            "家长观察 · 兴趣组合",
          ),
          items: [combinationPack.parentObservation],
        },
        {
          id: "primary-parent-observation",
          kind: "observation",
          title: join(
            `${K912_DOMAIN_LABELS[combination.primary].en} observation`,
            `${K912_DOMAIN_LABELS[combination.primary].zh}方向 · 家长观察`,
          ),
          items: [(combination.key === "think-discover" ? THINK_DISCOVER_PARENT_OBSERVATION.primary : primaryProfessional.parentObservation)],
        },
        {
          id: "secondary-parent-observation",
          kind: "observation",
          title: join(
            `${K912_DOMAIN_LABELS[combination.secondary].en} observation`,
            `${K912_DOMAIN_LABELS[combination.secondary].zh}方向 · 家长观察`,
          ),
          items: [(combination.key === "think-discover" ? THINK_DISCOVER_PARENT_OBSERVATION.secondary : secondaryProfessional.parentObservation)],
        },
        ...(combination.key === "think-discover"
          ? [{
              id: "personalized-facet-observation",
              kind: "observation" as const,
              title: join(
                "Personalized parent observation",
                "本次个性化家长观察",
              ),
              items: [thinkDiscoverAction.observation],
            }]
          : []),
        ...(combination.key === "discover-build"
          ? [{
              id: "personalized-facet-observation",
              kind: "observation" as const,
              title: join(
                "Personalized parent observation",
                "本次个性化家长观察",
              ),
              items: [discoverBuildAction.observation],
            }]
          : []),
        {
          id: "third-child-reflection",
          kind: "reflection",
          title: join(
            `${thirdLabel.en} · Child reflection for exploration`,
            `${thirdLabel.zh} · 补充兴趣的孩子自我反思`,
          ),
          items: [thirdProfessional.childReflection],
        },
        {
          id: "third-parent-observation",
          kind: "observation",
          title: join(
            `${thirdLabel.en} · Parent observation for exploration`,
            `${thirdLabel.zh} · 补充兴趣的家长观察`,
          ),
          items: [thirdProfessional.parentObservation],
        },
      ],
    },

    {
      id: "methodology-interpretation-boundaries",
      title: K912_SECTION_TITLES[11],
      paragraphs: [
        K912_MASTER_TEMPLATE.evidence,
        K912_MASTER_TEMPLATE.jointReading,
        ...topThreeDomains.map(
          (domain) => K912_DOMAIN_PACKS[domain].professional.commonMisreads
        ),
        combinationPack.interpretationBoundary,
        K912_INTERPRETATION_BOUNDARIES,
      ],
      blocks: [
        {
          id: "method-evidence",
          kind: "paragraph",
          title: join(
            "How the report is assembled",
            "报告如何形成",
          ),
          paragraphs: [
            K912_MASTER_TEMPLATE.evidence,
            K912_MASTER_TEMPLATE.jointReading,
          ],
        },
        {
          id: "top-three-common-misreads",
          kind: "boundary",
          title: join(
            "Common misreads across the top three interests",
            "前三兴趣方向的常见误读",
          ),
          paragraphs: topThreeDomains.map(
            (domain) => K912_DOMAIN_PACKS[domain].professional.commonMisreads
          ),
        },
        {
          id: "combination-boundary",
          kind: "boundary",
          title: join(
            "Combination boundary",
            "兴趣组合的解释边界",
          ),
          paragraphs: [combinationPack.interpretationBoundary],
        },
        {
          id: "global-boundary",
          kind: "boundary",
          title: join(
            "K912 overall boundary",
            "K912总体解释边界",
          ),
          paragraphs: [K912_INTERPRETATION_BOUNDARIES],
        },
      ],
    },
  ];

  return { reportVersion: K912_PROFESSIONAL_REPORT_VERSION, facts, combination, evidence: facts.facetEvidence, sections };
}
