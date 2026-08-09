import {
  COMPLETE_PERSONALITY_REPORT_STANDARD,
  COMPLETE_PERSONALITY_REPORT_VERSION,
} from "../report-standard";
import type {
  CompletePersonalityReportDefinition,
  ReportContentBlock,
  ReportDynamicSlot,
} from "../types";
import { localizeIstjBlock } from "./localization";

function block(
  id: string,
  type: ReportContentBlock["type"],
  titleEn: string,
  contentEn: string,
  dynamicSlots?: ReportDynamicSlot[],
): ReportContentBlock;

function block(
  id: string,
  type: ReportContentBlock["type"],
  titleEn: string,
  contentEn: string,
  titleZh: string,
  contentZh: string,
  dynamicSlots?: ReportDynamicSlot[],
): ReportContentBlock;

function block(
  id: string,
  type: ReportContentBlock["type"],
  titleEn: string,
  contentEn: string,
  fifthArgument?: string | ReportDynamicSlot[],
  sixthArgument?: string,
  seventhArgument?: ReportDynamicSlot[],
): ReportContentBlock {
  const usesLocalizedArguments =
    typeof fifthArgument === "string";

  const titleZh = usesLocalizedArguments
    ? fifthArgument
    : undefined;

  const contentZh = usesLocalizedArguments
    ? sixthArgument
    : undefined;

  const dynamicSlots = Array.isArray(fifthArgument)
    ? fifthArgument
    : seventhArgument;

  const localized = localizeIstjBlock(id);

  return {
    id,
    type,
    title: {
      en: titleEn,
      zh: titleZh ?? localized.title,
    },
    content: {
      en: contentEn,
      zh: contentZh ?? localized.content,
    },
    ...(dynamicSlots ? { dynamicSlots } : {}),
  };
}

const CONTENT_BY_SECTION: Record<
  string,
  ReportContentBlock[]
> = {
  "report-identity": [
    block(
      "istj-identity-summary",
      "summary",
      "Your Complete ISTJ Report",
      "This report examines an ISTJ preference pattern through reliable operating structure, evidence, judgements, coordination, work, commitments, strain, and development. It treats the type code as a hypothesis about preferred ways of organising attention—not as a fixed identity, clinical judgement, or promise of competence. Culture, experience, responsibilities, trust, and learned skills can adjust the visible pattern substantially. Use both recognition and mismatch to refine an account grounded in repeated behaviour.",
      "你的完整 ISTJ 人格报告",
      "本报告从可靠的运行结构、证据、判断、协作、工作、承诺、压力与成长等方面分析 ISTJ 偏好模式。人格类型代码应被视为关于注意力组织方式的一种假设，而不是固定身份、临床判断或能力保证。文化、经验、责任、信任关系和后天技能都会显著改变外在表现。阅读时既要关注与你相符的部分，也要重视不相符之处，并最终以长期反复出现的真实行为来完善对自己的理解。",
    ),
  ],
  "personality-overview": [
    block(
      "istj-overview-summary",
      "summary",
      "Reliable Structure and Evidence-Based Responsibility",
      "An ISTJ pattern often combines verified precedent awareness, independent analysis, explicit criteria, and an internal preference for coherent structure. The person may build a working record of how an operation works, identify dependencies, and invest selectively in adjustments with durable consequence. This can support operational depth, but sound execution still requires current evidence, coordination, collaboration, and revision. A coherent practical account is not proof of certainty, superiority, or inevitable success.",
      "可靠结构与基于证据的责任感",
      "ISTJ 模式通常结合了对经过验证经验的重视、独立分析、明确标准，以及对一致结构的内在偏好。你可能会逐步建立一套关于实际系统如何运行的工作记录，识别其中的依赖关系，并选择性地投入到能够产生长期影响的改进之中。这有助于形成较深的运营理解，但真正可靠的执行仍然需要当前证据、协调、协作和持续修正。一个逻辑完整且实用的解释，并不等于绝对正确、更优越或必然成功。",
    ),
  ],
  "dimension-results": [
    block(
      "istj-dimensions-context",
      "analysis",
      "Reading the Four Dimensions",
      "An ISTJ result combines preferences across EI, SN, TF, and JP, but strength and confidence can alter the expression considerably. A more outward EI score may make planning collaborative, a practical SN result may reinforce attention to operational evidence, a balanced TF result can integrate stakeholder consequences, and a flexible JP result may preserve more iteration. The dynamic interpretations below qualify broad type themes. Compare them with behaviour across expertise, culture, role, trust, and pressure.",
      "理解四个人格维度",
      "ISTJ 结果由 EI、SN、TF 和 JP 四个维度共同构成，但偏好强度与置信度会显著改变具体表现。更偏外向的 EI 可能使规划过程更加协作；更务实的 SN 会强化对运营证据的关注；较平衡的 TF 能够同时纳入相关方后果；更灵活的 JP 则可能保留更多迭代空间。后续动态解释会进一步限定这些宽泛的人格主题。应把它们与自己在不同专业领域、文化、角色、信任程度和压力条件下的真实行为进行比较。",
      [
        {
          id: "istj-ei-processing",
          source: "dimension",
          dimensions: ["EI"],
        },
        {
          id: "istj-sn-procedure",
          source: "dimension",
          dimensions: ["SN"],
        },
        {
          id: "istj-tf-criteria",
          source: "dimension",
          dimensions: ["TF"],
        },
        {
          id: "istj-jp-structure",
          source: "dimension",
          dimensions: ["JP"],
        },
        {
          id: "istj-overall-confidence",
          source: "confidence",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
  ],
  "key-strengths": [
    block(
      "istj-strengths-bridge",
      "summary",
      "Strengths in Context",
      "Likely ISTJ strengths include evidence-based continuity thinking, independent learning, dependable follow-through, contradiction detection, and willingness to redesign an inefficient structure. The pattern can be useful when complex work requires a coherent procedure beyond immediate demands. These are preferences rather than guaranteed skills. Their value depends on domain knowledge, implementation discipline, intellectual humility, and the ability to make private reasoning available to others. Later sections separate useful independence from isolation and quality from overcontrol.",
      "在情境中理解优势",
      "ISTJ 可能表现出的优势包括：基于证据维持连续性的思考、独立学习、可靠执行、发现矛盾，以及愿意重新设计低效结构。当复杂工作需要建立超越短期需求的稳定流程时，这种模式尤其有价值。但这些只是偏好，并不是自动拥有的能力。它们能否真正产生价值，还取决于专业知识、执行纪律、认知谦逊，以及是否能够让别人理解原本只存在于个人内部的推理过程。后续章节会进一步区分有效的独立与孤立，以及质量要求与过度控制。",
    ),
  ],
  "growth-risks": [
    block(
      "istj-risks-bridge",
      "guidance",
      "Development Through Tested Procedure",
      "Development may involve exposing assumptions earlier, communicating an unfinished model, distinguishing necessary quality from overcontrol, and inviting operational or relational evidence before commitment hardens. Other risks include solving too much alone, withdrawing when collaboration is inefficient, and confusing a coherent expectation with a certain future. These are not fixed defects. The following sections translate them into practical review points that preserve responsible independence while improving adaptability, trust, and execution.",
      "通过可验证的流程实现成长",
      "成长可能意味着更早公开自己的关键假设，愿意交流尚未完成的模型，区分真正必要的质量要求与过度控制，并在决定完全固化之前主动引入运营或关系层面的证据。其他风险还包括过多问题都独自解决、协作效率不高时直接退出，以及把逻辑一致的预期误认为确定的未来。这些都不是固定缺陷。后续章节会把它们转化为具体复盘点，在保留负责任独立性的同时，提高适应性、信任和执行质量。",
    ),
  ],
  "core-personality-pattern": [
    block(
      "istj-core-summary",
      "summary",
      "Accumulated Evidence and Dependable Structure",
      "The central ISTJ pattern often involves comparing a present responsibility with tested experience, then organising work into a sequence that can be repeated and checked. The person may notice where a standard, handoff, or exception threatens continuity and improve the procedure before failure becomes routine. At its best, this creates dependable progress grounded in evidence rather than habit alone. The dynamic slots below qualify how structure changes with confidence, balance, and access to adjacent preferences.",
      "累积证据与可靠结构",
      "ISTJ 的核心模式通常表现为：把当前责任与经过验证的经验进行比较，然后把工作组织成可以重复、检查和持续改进的顺序。你可能很快注意到某项标准、交接环节或异常情况是否正在威胁系统连续性，并在问题成为常态之前改进流程。发展良好时，这种方式能够形成建立在证据而非单纯习惯上的可靠进展。后续动态内容会进一步说明，当置信度、维度平衡程度以及相邻偏好的可用性发生变化时，这种结构倾向会如何调整。",
      [
        {
          id: "istj-combination-procedure",
          source: "combination",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
        {
          id: "istj-balanced-dimensions",
          source: "confidence",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
    block(
      "istj-core-analysis",
      "analysis",
      "Building the Procedure Before the Activity",
      "An ISTJ may first ask what operation would make the desired outcome repeatable. Instead of treating each issue separately, the person examines incentives, dependencies, information flow, and downstream consequences. This can prevent wasted effort and produce durable design. It becomes limiting when planning stays private or when present facts are forced to fit the working record. Procedure must remain a testable explanation of reality, not a substitute for contact with it.",
      "先建立流程，再推动行动",
      "ISTJ 可能首先思考：怎样的运行方式才能让预期结果稳定重复出现。与其把每一个问题孤立处理，你更可能检查激励机制、依赖关系、信息流以及后续影响。这能够减少重复浪费，并形成更持久的设计。但如果规划长期只存在于个人内部，或者为了维持原有记录而强迫当前事实符合既定解释，这种优势就会受到限制。流程必须始终是一种可以被现实检验的解释，而不能替代与现实本身的持续接触。",
    ),
    block(
      "istj-core-strength",
      "strength",
      "Concentrated Long-Range Leverage",
      "A developed expression can sustain attention on a consequential objective while resisting short-term noise. The ISTJ may identify a small structural adjustment that improves many downstream judgements, sequence work around dependencies, and protect resources for outcomes that take time. This disciplined concentration is strongest when review points invite disconfirming evidence and when collaborators understand enough of the working record to exercise judgement rather than merely follow instructions.",
      "聚焦长期杠杆",
      "发展成熟的 ISTJ 能够把注意力持续放在真正具有重要后果的目标上，同时抵抗短期噪音。你可能发现一个很小的结构调整，却能够改善大量后续判断；也可能围绕依赖关系安排工作顺序，并为需要较长时间才能实现的成果保护资源。当复盘节点能够主动引入反证，而且协作者对整个运行逻辑有足够理解、能够独立判断而不仅仅服从指令时，这种有纪律的长期专注会发挥最大价值。",
    ),
    block(
      "istj-core-risk",
      "risk",
      "When Coherence Becomes Premature Certainty",
      "A working record that explains many observations can begin to feel complete before critical assumptions have been tested. The ISTJ may discount local objections as short-term thinking or interpret disagreement as failure to understand the operation. This can create elegant plans with weak adoption or hidden operational costs. Confidence should rise when the procedure survives serious evidence, not simply because it has become internally consistent.",
      "当一致性过早变成确定性",
      "当一套工作记录已经能够解释大量现象时，在关键假设尚未真正接受检验之前，它也可能开始显得已经足够完整。ISTJ 可能把局部反对意见理解为短期思维，或者把分歧视为他人没有理解整个运行系统。这可能形成逻辑漂亮但采用程度很低、或者隐藏大量实施成本的计划。真正的信心应该来自流程经受住严肃证据的检验，而不是仅仅因为它内部已经足够一致。",
    ),
    block(
      "istj-core-reflection",
      "reflection",
      "Does the Procedure Still Match the Evidence?",
      "Choose one recurring responsibility or standard. Which past evidence justified it, which present observations still support it, and which exceptions suggest the procedure needs revision? Ask the people who perform the work where the written process and lived reality differ. Preserve what protects reliability, but change a step when repeated evidence shows that familiarity is no longer serving the outcome.",
      "当前流程仍然符合证据吗？",
      "选择一项持续重复的责任或标准。哪些过去证据曾经证明它合理？哪些当前观察仍然支持它？又有哪些异常说明流程已经需要修正？询问真正执行这些工作的人，书面流程与实际现实之间存在哪些差异。应继续保留真正保护可靠性的部分，但当反复出现的证据说明某个熟悉步骤已经不再服务于目标时，就应该修改它。",
    ),
  ],
  "motivation-and-needs": [
    block(
      "istj-motivation-summary",
      "summary",
      "Reliability, Responsibility, and Useful Progress",
      "ISTJs may feel engaged by complex problems, room for independent judgement, opportunities to build competence, and work whose long-term consequence justifies concentrated effort. Motivation often rises when the objective is meaningful and methods are not constrained by unnecessary convention. Not every ISTJ wants formal authority or solitary work. The deeper need is usually control over attention and enough coherence to invest effort without constant arbitrary interruption.",
      "可靠性、责任与有价值的进展",
      "复杂问题、独立判断空间、建立专业能力的机会，以及值得长期投入的工作，都可能增强 ISTJ 的投入感。当目标具有实际意义，而且实现方法不受到不必要惯例限制时，动力通常会进一步提高。并不是每一个 ISTJ 都追求正式权力或完全独立的工作方式。更深层的需要往往是能够控制自己的注意力，并拥有足够清晰和稳定的工作结构，使长期投入不会不断被任意打断。",
    ),
    block(
      "istj-motivation-analysis",
      "analysis",
      "Autonomy in Service of a Operation",
      "Independence can protect the uninterrupted thought required for difficult procedure. The person may resist oversight that focuses on visible activity rather than reasoning or outcomes. Autonomy is most productive when paired with transparent constraints, review, and responsibility for consequences. Without those anchors, self-direction can become insulation from feedback. The useful question is which judgements need protected judgement and which improve through earlier collaboration.",
      "让自主性服务于系统运行",
      "独立空间能够保护复杂流程设计所需要的连续思考，因此 ISTJ 可能抵触只关注表面活动、而不关心推理过程和实际结果的监督方式。自主性只有在同时具备透明约束、复盘机制以及对结果负责时，才能发挥最大价值。如果缺少这些锚点，自主很容易变成与反馈隔离。真正需要区分的是：哪些判断确实需要受到保护的独立思考，哪些判断如果更早协作反而能够获得更好的结果。",
    ),
    block(
      "istj-motivation-strength",
      "strength",
      "Patience for Difficult Improvement",
      "When a goal matters, the ISTJ may tolerate a long learning curve and invest in foundations that produce little immediate recognition. This can support deep expertise, careful design, and improvements that outlast a short campaign. The strength depends on periodic contact with users, operators, or other evidence. Persistence is valuable when the direction remains sound, not when effort continues mainly because changing the working record feels like wasted competence.",
      "面对艰难改进的耐心",
      "当一个目标真正重要时，ISTJ 往往能够接受较长的学习周期，也愿意投入到短期内几乎得不到认可的基础工作。这可以支持深度专业能力、严谨设计，以及比短期行动更持久的改进。但这种优势仍然依赖与用户、实际执行者或其他现实证据保持周期性接触。坚持只有在方向仍然正确时才有价值；如果继续投入主要是因为修改已有工作记录让人感觉之前的专业投入被浪费，那么坚持本身就需要重新评估。",
    ),
    block(
      "istj-motivation-risk",
      "risk",
      "Competence as Protection",
      "Expertise can become a defence against dependence, uncertainty, or visible error. The person may avoid asking for help until a problem is advanced, dismiss tasks where they are not immediately capable, or keep raising standards so the work never feels exposed. Competence remains valuable, but identity becomes more resilient when learning, relationship, and contribution are allowed to include unfinished knowledge and mutual reliance.",
      "把能力变成自我保护",
      "专业能力有时会变成避免依赖、不确定性或公开犯错的一种防御。你可能直到问题已经相当严重时才愿意求助，也可能回避那些自己无法立即胜任的任务，或者不断提高标准，使工作永远处于尚未适合公开的状态。能力本身依然重要，但如果能够允许学习、关系和贡献包含尚未完成的知识以及对他人的合理依赖，个人认同会更加稳定和有韧性。",
    ),
    block(
      "istj-motivation-guidance",
      "guidance",
      "Define Progress Beyond Private Quality",
      "For a major commitment, identify the internal quality standard and the external evidence that the work helps. Add measures for learning, adoption, maintainability, and collaboration. Decide where excellence is essential and where a usable version will create better information. Share one uncertainty with a trusted colleague before solving it alone. This keeps expertise connected to consequence rather than using refinement to postpone exposure.",
      "用超越个人质量标准的方式定义进展",
      "面对一项重要任务，应同时明确内部质量标准以及能够证明工作真正产生价值的外部证据，并增加学习效果、采用程度、可维护性和协作质量等指标。区分哪些部分必须追求卓越，哪些部分先提供一个可用版本反而能获得更好的信息。在独自解决问题之前，主动向可信赖的同事分享一个不确定点。这样能够让专业能力持续与真实结果相连接，而不是用不断优化来推迟接受现实检验。",
    ),
  ],
  "information-processing": [
    block(
      "istj-information-summary",
      "summary",
      "Evidence, Precedent, and Operational Logic",
      "An ISTJ pattern often attends to underlying structure, practical implications, and the few variables that organise many surface events. Information becomes useful when it clarifies a trajectory or improves the working record of the operation. This can support operational continuity awareness, provided generalisation remains connected to current measurements, operational detail, and alternative explanations. Pattern recognition generates hypotheses; it does not remove the need for evidence.",
      "证据、经验与运营逻辑",
      "ISTJ 模式通常会关注表象背后的结构、实际影响，以及那些能够组织大量表面事件的少数关键变量。当信息能够解释发展方向，或者改善对系统运行方式的工作记录时，它就会变得更有价值。这有助于形成对运营连续性的敏感度，但前提是所有概括仍然与当前测量、实际运营细节以及其他可能解释保持连接。模式识别能够产生假设，但永远不能取代证据。",
    ),
    block(
      "istj-information-analysis",
      "analysis",
      "Compressing Complexity Into a Model",
      "The person may synthesise large amounts of information into a compact explanation of how parts relate and where the operation is heading. A good model reduces noise and guides priorities. Compression also discards detail, including details that may reveal a different mechanism. Record which facts the working record explains poorly, and distinguish observations from inferences so a clean narrative does not conceal uncertainty.",
      "把复杂信息压缩为可用模型",
      "你可能会把大量信息整合成一个相对简洁的模型，用来解释不同部分如何相互联系，以及整个系统正在朝什么方向发展。好的模型能够减少噪音并帮助确定优先级，但任何信息压缩都会舍弃一些细节，而其中可能正包含揭示不同机制的重要线索。应记录当前模型无法很好解释的事实，并明确区分直接观察与个人推断，避免一个过于整洁的叙述掩盖真实存在的不确定性。",
    ),
    block(
      "istj-information-strength",
      "strength",
      "Seeing Second-Order Consequences",
      "ISTJs may naturally ask what a present judgement makes more likely later: which dependency grows, which incentive adjustments, or which capability becomes difficult to recover. This can protect a team from attractive short-term fixes. The strength becomes practical when downstream consequences are translated into observable indicators and when probability is communicated honestly rather than as inevitable continuity awareness.",
      "识别第二层后果",
      "ISTJ 可能自然地思考：当前一个判断会让未来哪些情况更可能发生？哪些依赖关系会增强？哪些激励机制会改变？哪些能力一旦失去就很难恢复？这种思考能够保护团队避免被看起来很有吸引力的短期解决方案误导。当后续影响被转化成可以观察的指标，而且概率被如实表达而不是被描述成必然趋势时，这种优势才会真正转化为实际价值。",
    ),
    block(
      "istj-information-risk",
      "risk",
      "Filtering Out Inconvenient Reality",
      "Once the organising pattern feels clear, data that does not fit may be labelled exceptional, political, or too operational. Yet one inconvenient detail can reveal a mistaken assumption or a stakeholder cost the procedure ignores. The risk is not generalisation itself; it is allowing the working record to determine which evidence counts. Deliberately preserve exceptions until they are explained rather than removed from the operational picture.",
      "过滤掉不方便的现实",
      "一旦整体模式已经显得足够清晰，不符合模型的数据可能被标记为异常、政治因素或过于局部的运营细节。但恰恰一个令人不方便的事实，就可能揭示错误假设，或者暴露流程没有考虑到的相关方成本。真正的风险不是进行概括，而是让已有工作记录决定哪些证据才算有效。对于异常情况，应主动保留，直到能够真正解释它们，而不是为了让运营图景保持整洁而将其删除。",
    ),
    block(
      "istj-information-guidance",
      "guidance",
      "Maintain a Model and an Exception Log",
      "Write the current operating record, its three most important assumptions, and the indicators expected if it is correct. Beside it, keep observations that do not fit. Review both with someone close to implementation. Revise the procedure when exceptions form a pattern, and record why. This protects reliable continuity while ensuring that evidence can genuinely adjust the direction.",
      "同时维护模型与异常记录",
      "写下当前的运行模型、其中最重要的三个假设，以及如果模型正确应该观察到哪些指标。同时单独保留所有无法被当前模型解释的观察结果，并与真正接近实施现场的人一起定期检查这两组信息。当异常开始形成稳定模式时，就应修正流程并记录修改原因。这样既能保护系统运行的可靠连续性，也能确保现实证据真正有能力改变原有方向。",
    ),
  ],
  "decision-making": [
    block(
      "istj-judgements-summary",
      "summary",
      "Criteria, Consequence, and Deliberate Commitment",
      "ISTJs may prefer judgements grounded in explicit objectives, internal consistency, evidence, and long-term consequence. They often want enough time to understand the procedure before committing, then may hold the chosen direction steadily. This can reduce reactive switching. Good judgement still includes human impact, reversibility, and unknowns. A logically coherent choice can fail when the criteria omit adoption, ethics, or information held by others.",
    ),
    block(
      "istj-judgements-analysis",
      "analysis",
      "Private Convergence",
      "The person may compare alternatives internally and communicate only after a preferred direction has emerged. This protects concentration but hides the judgement process from collaborators, who may receive a conclusion without the evidence or trade-offs behind it. Earlier visibility does not require endless consensus. Sharing the criteria and uncertainty allows others to improve the working record before the cost of adjustment becomes high.",
    ),
    block(
      "istj-judgements-strength",
      "strength",
      "Resisting Short-Term Pressure",
      "An ISTJ may hold a necessary standard or long-term commitment when immediate incentives favour convenience or appearance. By connecting the judgement to operational consequences and tested precedent, the person can protect quality, investment, or future capability. This strength needs review triggers so perseverance does not become rigidity. The judgement should remain stable because current evidence supports it, not because changing course would make earlier responsibility feel wasted.",
    ),
    block(
      "istj-judgements-risk",
      "risk",
      "Optimising the Wrong Criteria",
      "Precise analysis can produce a poor judgement when the governing criteria are incomplete. Efficiency, scalability, or logical elegance may be optimised while trust, accessibility, timing, or transition cost remains outside the working record. Those consequences later return as implementation failure. Before finalising, ask who defines success, who bears the cost, and which qualitative evidence should influence the choice.",
    ),
    block(
      "istj-judgements-guidance",
      "guidance",
      "Make the Responsibility Trail Visible",
      "Record the obligation, verified facts, governing criteria, viable alternative, and review trigger before committing. Share that trail with people responsible for execution or affected by the outcome. Clarify what is settled, what remains adjustable, and who owns each follow-up. This preserves careful judgement while making accountability inspectable and helping others act with context rather than merely complying.",
    ),
  ],
  "communication": [
    block(
      "istj-coordination-summary",
      "summary",
      "Concise, Structured, and Selective",
      "ISTJs may prefer coordination that has a clear purpose, coherent reasoning, and enough substance to justify attention. They may speak selectively after internal processing rather than narrate each step. This can make contributions focused, but others cannot infer the private model automatically. Effective coordination translates procedure into context, assumptions, judgements, and invitations for evidence without requiring constant social performance.",
    ),
    block(
      "istj-coordination-analysis",
      "analysis",
      "The Missing Middle of the Reasoning",
      "Because the ISTJ has already connected many steps internally, an explanation may move from problem to conclusion while omitting the bridge. Listeners can experience the result as abrupt or unsupported. The answer is not greater volume; it is a visible logic chain. State what you observed, what it suggests, which uncertainty remains, and why the recommendation follows.",
    ),
    block(
      "istj-coordination-risk",
      "risk",
      "Under-Coordination and Assumed Understanding",
      "The person may delay sharing until the working record feels sufficiently refined, then become frustrated when others lack context or raise questions already resolved privately. Silence can be interpreted as distance, agreement, or lack of interest. Under pressure, concise correction may also sound dismissive. Communicate earlier enough that others can influence the work, not merely receive the completed procedure.",
    ),
    block(
      "istj-coordination-guidance",
      "guidance",
      "Share the Working Record Early",
      "Use a concise structure: obligation, known facts, current procedure, unresolved exception, and requested input. Mark provisional elements clearly so colleagues can improve them before a routine hardens. When disagreeing, name the evidence or standard that differs rather than only rejecting the conclusion. This turns precision into shared operational understanding and reduces avoidable ambiguity.",
    ),
    block(
      "istj-coordination-reflection",
      "reflection",
      "What Was Visible to Others?",
      "Review a recent judgement that felt obvious to you. What information did collaborators actually receive, and which connections existed only in your own model? Did you ask for evidence early enough to adjust the direction? What emotional or practical concern was relevant even if it was expressed imprecisely? Clear procedure becomes influential when other people can inspect and use it.",
    ),
  ],
  "teamwork-and-leadership": [
    block(
      "istj-teamwork-summary",
      "summary",
      "Designing Capability and Direction",
      "In teams, an ISTJ may contribute by clarifying standards, sequencing dependable work, preserving institutional knowledge, and noticing where a handoff threatens continuity. Leadership can be quiet and procedure-led rather than socially dominant. The person may prefer capable colleagues with clearly owned responsibilities. Effective teamwork requires making expectations and exceptions visible, learning from frontline experience, and treating coordination as part of reliability rather than an interruption to the real work.",
    ),
    block(
      "istj-teamwork-analysis",
      "analysis",
      "Selective Collaboration",
      "The ISTJ may collaborate intensely when another person contributes expertise or challenge, while finding unfocused group process draining. Selectivity can protect quality and attention. It can also exclude information that arrives through informal conversation or people whose thinking style is less concise. Design collaboration around clear questions and judgement rights, but leave enough room for evidence that does not arrive in the preferred format.",
    ),
    block(
      "istj-teamwork-strength",
      "strength",
      "Designing for Independent Judgement",
      "A developed ISTJ can create frameworks that help others make consistent judgements without central approval. Clear principles, interfaces, and feedback loops can distribute capability while preserving coherence. This form of leadership scales better than personal control. It works when the procedure includes space for local adaptation and when people understand how to challenge a rule that no longer serves the objective.",
    ),
    block(
      "istj-teamwork-risk",
      "risk",
      "Retreating From Imperfect Collaboration",
      "When meetings are inefficient or reasoning feels weak, the ISTJ may withdraw and solve the problem alone. This can produce a better immediate design but reduce ownership, learning, and access to operational knowledge. Repeated withdrawal also reinforces the belief that collaboration adds little value. Improve the structure of collaboration before abandoning it: narrow the question, prepare evidence, and assign judgements deliberately.",
    ),
    block(
      "istj-teamwork-guidance",
      "guidance",
      "Create a Challengeable Procedure",
      "State the operational principles, constraints, and interfaces that guide the team. Give owners authority within those boundaries and establish review points based on evidence. Invite a designated critic to test assumptions and include operational voices before finalising standards. The aim is a operation others can understand, adapt, and improve—not one that functions only when the original design is present.",
    ),
  ],
  "career-environment": [
    block(
      "istj-career-summary",
      "summary",
      "Depth, Autonomy, and Long-Range Consequence",
      "ISTJs may prefer work that rewards independent judgement, complex operations thinking, learning, and sustained improvement. Working Plan, technology, research, design, policy, or specialised leadership can offer these conditions, but no work setting belongs to a type. Fit depends on interests, expertise, values, resources, and organisational reality. The relevant question is whether the work permits depth while connecting private analysis to meaningful external outcomes.",
    ),
    block(
      "istj-career-analysis",
      "analysis",
      "The Need for Protected Attention",
      "Frequent interruption and shifting expectations can make it difficult to maintain accurate, dependable work. The ISTJ may need protected concentration, stable priorities, and clear ownership. Total isolation is not the answer; reliable procedure requires contact with users, colleagues, and changing evidence. A supportive environment combines focused execution with scheduled coordination rather than treating either constant availability or private control as ideal.",
    ),
    block(
      "istj-career-example",
      "example",
      "Work That Rewards Procedure",
      "Quality assurance, operations coordination, records management, compliance, logistics, technical administration, or implementation planning may reward attention to standards, evidence, and dependable follow-through. The same job title can vary widely. Examine whether the daily work includes clear responsibility, access to operational facts, authority to improve procedures, and enough continuity to learn from results rather than relying on occupational stereotypes.",
    ),
    block(
      "istj-career-risk",
      "risk",
      "Waiting for the Perfect Operation",
      "High standards can make imperfect organisations feel undeserving of effort, while imagined future roles appear more coherent than any real environment. The person may postpone influence until conditions are ideal or repeatedly redesign a path without testing it. Development often requires improving a limited operation from inside it. Distinguish constraints that violate core values from ordinary ambiguity, politics, and maintenance that accompany consequential work.",
    ),
    block(
      "istj-career-guidance",
      "guidance",
      "Evaluate Operational Fit",
      "Assess roles across responsibility clarity, evidence quality, process stability, exception handling, implementation ownership, and access to practical feedback. Ask how standards are reviewed, whether improvements can survive short-term pressure, and who maintains the system after a change. Choose an environment where dependable work matters, then build the communication and adaptation skills that keep procedure responsive to reality.",
    ),
  ],
  "relationship-dynamics": [
    block(
      "istj-commitments-summary",
      "summary",
      "Selective Trust and Deliberate Commitment",
      "ISTJs may invest deeply in a relatively small number of commitments, valuing honesty, intellectual respect, reliability, and space for independent thought. Care may be expressed through problem solving, planning, or sustained commitment rather than frequent emotional narration. People vary widely, and a type code cannot explain attachment or intimacy. Commitments become stronger when private loyalty is made visible in forms the other person can recognise.",
    ),
    block(
      "istj-commitments-analysis",
      "analysis",
      "Internal Commitment, External Ambiguity",
      "The ISTJ may assume that continued presence, practical help, or careful thought clearly communicates care. Another person may need direct appreciation, emotional acknowledgement, or more frequent contact. Neither form is inherently superior. Ask how care is received rather than relying only on the form that feels most sincere to give. Translation protects authenticity while making commitment accessible.",
    ),
    block(
      "istj-commitments-strength",
      "strength",
      "Depth Without Performance",
      "A developed expression can offer steadiness, candid reflection, respect for autonomy, and willingness to engage difficult long-term problems. The ISTJ may avoid superficial reassurance and take another person's goals seriously. This can create trust when analysis is invited and emotion is not treated as noise. Deep connection includes being present with an experience that cannot immediately be optimised.",
    ),
    block(
      "istj-commitments-risk",
      "risk",
      "Withdrawing Into Self-Sufficiency",
      "When misunderstood, disappointed, or overwhelmed, the person may retreat into private analysis and reduce coordination. This protects short-term control but leaves the other person to interpret silence. A conclusion about the relationship may form internally before concerns are shared. Independence becomes isolation when it removes the possibility of repair. Communicate the need for space, its purpose, and when contact will resume.",
    ),
    block(
      "istj-commitments-guidance",
      "guidance",
      "Make the Inner Position Visible",
      "Practise naming one appreciation, one uncertainty, and one need before offering a solution. When conflict arises, explain the working record you are using and ask how the other person understands the situation. Agree on how space and reconnection will work. These actions do not require constant disclosure; they provide enough information for trust to operate without guessing.",
    ),
  ],
  "change-and-adaptation": [
    block(
      "istj-adjustment-summary",
      "summary",
      "Adapting the Procedure",
      "ISTJs may anticipate adjustment by modelling future conditions and preparing a coherent route before disruption arrives. They can support transformation when current operations no longer fit long-term needs. Adaptation becomes harder when adjustment contradicts a deeply developed model or arrives without intelligible purpose. The dynamic slot below examines how adjacent preferences may make planning more iterative, practical, or collaborative.",
      [
        {
          id: "istj-combination-adaptation",
          source: "combination",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
    block(
      "istj-adjustment-analysis",
      "analysis",
      "Redirection Versus Abandoning the Direction",
      "Because operational working records integrate many judgements, revising one assumption can feel as though the whole procedure is being destabilised. The person may defend the original direction longer than evidence warrants. Separate the underlying purpose from the current design. A working record can change while the deeper objective remains intact, and redirection often demonstrates stronger working plans than preserving a coherent but inaccurate expectation.",
    ),
    block(
      "istj-adjustment-strength",
      "strength",
      "Preparing for Second-Order Effects",
      "The ISTJ may notice that a transition adjustments incentives, capabilities, and future options beyond the immediate implementation plan. This supports more responsible sequencing and can protect resources others overlook. The strength is most useful when affected people help test the expectation. Adjustment procedure should include lived transition costs, not only the final operation's conceptual advantages.",
    ),
    block(
      "istj-adjustment-risk",
      "risk",
      "Rigidity Hidden as Operational Consistency",
      "A reluctance to revise may be explained as protecting the long term even when evidence has adjustmentd. The person can selectively interpret setbacks as poor execution rather than a flawed assumption. This delays learning and may place growing demands on others. Define failure and review criteria before implementation so adaptation does not depend on admitting the entire direction was mistaken.",
    ),
    block(
      "istj-adjustment-guidance",
      "guidance",
      "Revise Procedures Without Losing Continuity",
      "Treat each procedure as a controlled working version. Record the evidence behind it, expected indicators, review dates, and which safeguards must remain stable. At review, identify what actual operation confirmed, contradicted, or left unresolved. Invite an informed colleague to test the interpretation. A documented revision preserves continuity and learning without turning consistency into loyalty to an outdated method.",
    ),
  ],
  "stress-and-recovery": [
    block(
      "istj-strain-summary",
      "summary",
      "Contraction, Control, and Over-Isolation",
      "Under sustained strain, an ISTJ may withdraw, narrow attention, intensify private planning, or become unusually critical of inefficiency and interruption. At other times the person may react through impulsive sensory activity or urgent attempts to control immediate details. Strain responses vary and are not diagnostic. The useful task is identifying the earliest loss of flexibility, coordination, sleep, or perspective for this individual.",
    ),
    block(
      "istj-strain-analysis",
      "analysis",
      "When Private Review Becomes Repetition",
      "Quiet time can restore concentration, but extended withdrawal may repeat the same record without fresh facts or emotional perspective. The person can appear occupied while repeatedly checking details and postponing contact that could clarify responsibility. Recovery benefits from a boundary: enough privacy to settle attention, followed by practical movement, trusted conversation, and a return to directly observable conditions.",
    ),
    block(
      "istj-strain-evidence",
      "evidence",
      "Personal Early-Warning Signals",
      "Possible signals include cancelling contact, reworking plans without new data, becoming contemptuous of ordinary mistakes, losing tolerance for ambiguity, or neglecting physical routines while trying to solve the operation mentally. These signs are individual rather than universal. Track what appears before judgement, sleep, health, or relationship quality declines, and ask trusted people what adjustment they notice first.",
    ),
    block(
      "istj-strain-risk",
      "risk",
      "Solving Pressure With More Procedure",
      "When the problem involves grief, exhaustion, conflict, or limited control, another plan may create temporary distance without resolving the experience. The ISTJ may analyse causes while remaining disconnected from support or bodily needs. Operational thinking is still available later. Immediate recovery may require naming the feeling, reducing obligations, accepting uncertainty, or asking directly for help.",
    ),
    block(
      "istj-strain-guidance",
      "guidance",
      "Ground, Communicate, and Reduce Scope",
      "Pause one nonessential optimisation, restore sleep and movement, and choose one concrete task that can be finished without redesigning the operation. Tell a trusted person that capacity is reduced and specify the support needed. Revisit operational conclusions after recovery and new evidence. If distrain is persistent or significantly affects functioning, seek appropriate professional support rather than using type language as an explanation.",
    ),
  ],
  "growth-roadmap": [
    block(
      "istj-development-summary",
      "summary",
      "From Private Direction to Shared Capability",
      "ISTJ development is not about abandoning responsibility, memory, or respect for tested structure. It involves making procedures reviewable, communicating exceptions before they become failures, distinguishing quality control from overcontrol, and allowing current operational evidence to revise precedent. Development expands range: the person can still protect reliability while involving others early enough to improve and share ownership of the work. The dynamic slot below highlights combinations affecting this path.",
      [
        {
          id: "istj-combination-isolation-risk",
          source: "combination",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
    block(
      "istj-development-analysis",
      "analysis",
      "Collaboration as Model Expansion",
      "Collaboration need not mean surrendering judgement or accepting unfocused process. At its best, it adds observations, constraints, and interpretations unavailable to one mind. The developmental task is designing collaboration with enough clarity to protect depth and enough openness to permit real influence. A consultation that cannot adjust the plan is coordination, not evidence gathering.",
    ),
    block(
      "istj-development-risk",
      "risk",
      "Overcontrol Disguised as Readiness",
      "The person may delay release, delegation, or conversation until the work meets a private standard that keeps moving. This preserves control but prevents feedback from improving the actual outcome. Overcontrol often focuses attention on defects that are intellectually visible rather than consequences that matter most. Define the required quality level, the cost of delay, and the evidence only real use can provide.",
    ),
    block(
      "istj-development-guidance",
      "guidance",
      "Practise Earlier Exposure",
      "Choose one model, proposal, or concern and share it at sixty-percent clarity with a trusted, relevant person. State what is stable, what is uncertain, and what feedback could adjust the direction. Resist solving every objection immediately; record it and review the procedure later. Repeat weekly so visibility becomes part of rigorous thinking rather than a threat to it.",
    ),
    block(
      "istj-development-action",
      "action",
      "A Monthly Assumption Review",
      "Once a month, select one important procedure and review its purpose, exceptions, stakeholder effects, and implementation evidence. Identify one standard that remains justified and one step that needs revision. Communicate the change, update the operating record, and credit the evidence source. This creates visible practical humility while preserving the ISTJ's strength in durable, dependable structure.",
    ),
  ],
  "ninety-day-action-plan": [
    block(
      "istj-action-summary",
      "summary",
      "A Ninety-Day Shared-Procedure Practice",
      "Use the next ninety days to test whether earlier exposure improves a meaningful operational outcome. Choose one project that requires both deep analysis and adoption by others. Preserve focused work, but make assumptions and provisional judgements visible at planned intervals. The objective is a stronger procedure that other people can understand, challenge, and execute—not maximum consensus or a flawless plan.",
    ),
    block(
      "istj-action-days-1-30",
      "action",
      "Days 1–30 · Map Responsibility and Evidence",
      "Choose one recurring responsibility. Document the expected result, current procedure, owners, handoffs, known exceptions, and evidence that the standard still works. Ask two people who perform or receive the work where reality differs from the record. Identify one step retained through habit and one safeguard that must not be lost. Establish baseline measures for error, delay, rework, and workload.",
    ),
    block(
      "istj-action-days-31-60",
      "action",
      "Days 31–60 · Revise and Run the Procedure",
      "Change one evidence-backed step while keeping ownership, quality criteria, and the exception route explicit. Run the revised procedure for a fixed period and record errors, workarounds, handoff failures, and user impact. Ask the owner to explain where the documentation helps or constrains judgement. Update the record after actual use rather than expecting the first revision to be final.",
    ),
    block(
      "istj-action-days-61-90",
      "action",
      "Days 61–90 · Stabilise Shared Ownership",
      "Ask another owner to run the procedure without relying on your reminders or private knowledge. Confirm the decision boundary, escalation point, and review date, then remove one redundant control. Compare reliability, workload, and exception handling with the baseline. Keep the parts that protect continuity, document why other parts changed, and schedule the next evidence review before the process becomes unquestioned habit.",
    ),
    block(
      "istj-action-review",
      "reflection",
      "Evidence of Development",
      "Review concrete indicators: assumptions shared early, counterexamples retained, useful versions released, judgements revised from evidence, and responsibility distributed without loss of coherence. Ask collaborators whether the reasoning became easier to understand and challenge. Development is demonstrated by repeated behaviour under real conditions, not by agreement with an attractive operational identity.",
    ),
    block(
      "istj-action-guidance",
      "guidance",
      "Protect Depth Without Returning to Isolation",
      "If collaboration becomes noisy, improve its structure rather than abandoning it. Narrow the question, request evidence in advance, and separate consultation from judgement rights. If overcontrol delays delivery, reduce scope while preserving the critical quality standard. The plan succeeds when independent thought and external correction become parts of one reliable process.",
    ),
  ],
  methodology: [
    block(
      "istj-methodology-framework",
      "analysis",
      "How to Use This Report",
      "This report interprets an MBTI-style preference result using EI, SN, TF, and JP dimensions, confidence values, static type-level content, and matched dynamic rules. It describes tendencies for reflection. It is not a clinical diagnosis, intelligence test, capability assessment, or scientifically absolute account of personality. No section should be used alone for consequential employment, educational, relationship, financial, or health judgements.",
    ),
    block(
      "istj-methodology-variation",
      "evidence",
      "Context and Individual Variation",
      "People sharing an ISTJ result can differ substantially because of culture, age, expertise, responsibilities, health, values, environment, and development. Balanced or lower-confidence dimensions increase the likelihood that neighbouring preferences are similarly accessible. Give repeated lived evidence more weight than a type stereotype, and treat descriptions that do not fit as information rather than a failure to match the code.",
    ),
    block(
      "istj-methodology-dynamic",
      "analysis",
      "Dynamic Interpretation",
      "Generated reports select rule content from supplied dimension scores and confidence patterns. Applied-rule metadata records which adaptations were inserted, supporting traceability across report, content, and rule versions. Dynamic text can qualify a broad narrative, but it cannot infer motive, history, maturity, mental health, or future outcomes. Interpretation remains a reflective aid rather than an automated judgement.",
    ),
    block(
      "istj-methodology-version",
      "guidance",
      "Version and Responsible Review",
      "Report version: 1.0.0. Content version: 1.0.0. Rule version: 1.0.0. These identifiers preserve the source used to generate a result as content and rules evolve. Revisit the report when circumstances or self-understanding adjustment, compare it with feedback and behaviour, and retain only interpretations that support accurate and responsible reflection.",
    ),
  ],
};

export const ISTJ_COMPLETE_REPORT:
  CompletePersonalityReportDefinition = {
    personalityType: "ISTJ",
    version: COMPLETE_PERSONALITY_REPORT_VERSION,
    title: {
      en: "ISTJ Complete Personality Report",
      zh: "ISTJ 完整人格报告",
    },
    sections: COMPLETE_PERSONALITY_REPORT_STANDARD.map(
      (section) => ({
        ...section,
        title: { ...section.title },
        description: { ...section.description },
        contentBlocks:
          CONTENT_BY_SECTION[section.id] ?? [],
      }),
    ),
  };
