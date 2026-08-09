import {
  COMPLETE_PERSONALITY_REPORT_STANDARD,
  COMPLETE_PERSONALITY_REPORT_VERSION,
} from "../report-standard";
import type {
  CompletePersonalityReportDefinition,
  ReportContentBlock,
  ReportDynamicSlot,
} from "../types";

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

  return {
    id,
    type,
    title: {
      en: titleEn,
      ...(titleZh ? { zh: titleZh } : {}),
    },
    content: {
      en: contentEn,
      ...(contentZh ? { zh: contentZh } : {}),
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
      "entj-identity-summary",
      "summary",
      "Your Complete ENTJ Report",
      "This complete report expands the free ENTJ result into a contextual analysis of strategic direction, decision-making, leadership, relationships, work, stress, and development. It treats the type code as a working hypothesis about preferred ways of organising attention and action—not as a fixed identity, measure of ability, or guarantee of leadership skill. Use the sections that fit to sharpen self-observation, and treat mismatches as useful evidence about role, culture, experience, trust, stress, or balanced dimensions.",
    ),
  ],
  "personality-overview": [
    block(
      "entj-overview-summary",
      "summary",
      "A Strategic, Organising Pattern",
      "An ENTJ pattern often combines long-range direction with a preference for clear decisions, coordinated resources, measurable responsibility, and purposeful execution. The person may readily identify what a system is trying to achieve, where effort is being lost, and who needs ownership to move work forward. These preferences can support leadership, but they do not automatically create good judgement or effective leadership. Skill, ethics, listening, domain knowledge, and the surrounding culture determine how the pattern is expressed.",
    ),
  ],
  "dimension-results": [
    block(
      "entj-dimensions-context",
      "analysis",
      "Reading the Four Dimensions",
      "An ENTJ result combines preferences across EI, SN, TF, and JP, but the four letters do not all carry equal weight for every person. Confidence and balance can substantially change the visible pattern: a balanced EI result may look less outwardly forceful, a lower-confidence TF result may place more visible emphasis on relationships, and a flexible JP result may resist rigid closure. The dynamic interpretations below qualify the type-level narrative. Read low-confidence or balanced dimensions cautiously and compare them with behaviour across role, culture, trust, experience, and stress.",
      [
        {
          id: "entj-ei-strength",
          source: "dimension",
          dimensions: ["EI"],
        },
        {
          id: "entj-sn-boundary",
          source: "dimension",
          dimensions: ["SN"],
        },
        {
          id: "entj-tf-boundary",
          source: "dimension",
          dimensions: ["TF"],
        },
        {
          id: "entj-jp-boundary",
          source: "dimension",
          dimensions: ["JP"],
        },
        {
          id: "entj-overall-confidence",
          source: "confidence",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
  ],
  "key-strengths": [
    block(
      "entj-strengths-bridge",
      "summary",
      "Strengths in Context",
      "Likely ENTJ strengths include strategic clarity, systems thinking, decision ownership, coordination of people and resources, and sustained movement from intention to measurable result. The pattern may be especially useful when complexity requires priorities, standards, accountability, and a coherent long-range direction. These are preferences, not automatic abilities. Their value depends on knowledge, credibility, emotional judgement, and the willingness to adapt. Later sections distinguish effective use from overuse, such as replacing coordination with control or speed with premature certainty.",
    ),
  ],
  "growth-risks": [
    block(
      "entj-risks-bridge",
      "guidance",
      "Growth Through Calibrated Leadership",
      "Development may involve slowing decisions long enough to hear contradictory evidence, delegating responsibility instead of retaining control, explaining reasoning before announcing conclusions, and treating stakeholder adoption as part of execution rather than an obstacle to it. Other risks include impatience with weak follow-through, overwork, and identifying personal worth too closely with achievement or competence. These are not fixed flaws. The following sections convert them into specific questions, observable signals, and practical experiments that preserve ambition while improving judgement and sustainability.",
    ),
  ],
  "core-personality-pattern": [
    block(
      "entj-core-summary",
      "summary",
      "Strategic Direction and Structured Execution",
      "An ENTJ pattern often links a view of future direction with objective decision criteria and a preference for organised execution. The person may translate an ambitious outcome into priorities, standards, ownership, and coordinated action, then challenge arrangements that no longer serve the goal. Effective use balances strategic structure with stakeholder responsibility and the realities of human implementation. The retained dynamic slots below examine that interaction and qualify it when dimensions are balanced or confidence is low.",
      [
        {
          id: "entj-combination-care-structure",
          source: "combination",
          dimensions: ["SN", "TF", "JP"],
        },
        {
          id: "entj-balanced-dimensions",
          source: "confidence",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
    block(
      "entj-core-analysis",
      "analysis",
      "From Direction to Operating System",
      "The central pattern is not simply having goals; it is organising conditions that make goals executable. An ENTJ may define the outcome, identify leverage points, establish decision rights, allocate resources, and create measures that reveal whether the system is working. This can reduce ambiguity and connect separate efforts into one direction. Its effectiveness increases when assumptions remain testable, local knowledge can challenge the plan, and people understand both the reasoning and their authority to act.",
    ),
    block(
      "entj-core-strength",
      "strength",
      "Coordinating Complexity",
      "A well-developed expression can hold a long-range objective while coordinating many moving parts. The person may clarify dependencies, resolve competing priorities, and make decisions that allow specialists to contribute without losing the overall direction. Directness can help surface constraints early, while standards make progress visible. This is strongest when coordination creates autonomy for others rather than dependence on one central decision-maker, and when the system learns instead of merely complying.",
    ),
    block(
      "entj-core-risk",
      "risk",
      "When Direction Becomes Control",
      "The same drive for coherence can become excessive control when uncertainty, slower discussion, or a different working style is treated as evidence of weak execution. The ENTJ may assume decisions that belong elsewhere, prescribe methods instead of outcomes, or correct work before others can learn from it. Short-term speed then reduces ownership and hides information from quieter contributors. Control is calibrated when it protects a genuine risk; it is overused when it mainly relieves the leader's discomfort with ambiguity.",
    ),
    block(
      "entj-core-reflection",
      "reflection",
      "Is the System Building Capability?",
      "Review one area you currently direct closely. Is your involvement required by risk, expertise, or accountability, or has it become the default because taking over feels faster? What outcome, boundary, and review point could replace instructions about every step? Ask whose evidence is missing and what decision can move closer to the person doing the work. The aim is not less responsibility; it is responsibility designed so that judgement and capability grow throughout the system.",
    ),
  ],
  "motivation-and-needs": [
    block(
      "entj-motivation-summary",
      "summary",
      "Progress, Impact, and Responsibility",
      "ENTJs may feel energised by meaningful progress, autonomy, competent execution, and responsibility for outcomes that matter. Motivation often increases when a difficult objective can be converted into a workable strategy and when authority is proportionate to accountability. Building an effective system may be as satisfying as achieving the immediate result because it creates durable leverage. These preferences can appear differently across roles and cultures; not every ENTJ seeks formal status, competition, or public leadership.",
    ),
    block(
      "entj-motivation-analysis",
      "analysis",
      "Autonomy With Consequence",
      "Autonomy is often most motivating when it is connected to real consequence rather than freedom without purpose. The person may want room to set direction, make trade-offs, and improve the system, while accepting clear measures and ownership for the result. Frustration can rise when responsibility is high but decision authority is unclear, or when repeated discussion does not lead to action. A healthy environment pairs freedom with feedback, transparent constraints, and accountability that applies consistently.",
    ),
    block(
      "entj-motivation-strength",
      "strength",
      "Building What Can Scale",
      "A useful strength is the willingness to invest beyond the immediate task by clarifying a strategy, strengthening a process, or developing capability that improves future performance. The ENTJ may tolerate complexity when it serves a significant result and can sustain effort through setbacks when progress remains measurable. This becomes more valuable when measures include quality, adoption, and long-term consequences—not only speed, output, or visible wins.",
    ),
    block(
      "entj-motivation-risk",
      "risk",
      "Achievement as Identity",
      "Competence and achievement can become too closely tied to self-worth. A stalled project, uncertain period, or need for rest may then feel like a personal failure rather than normal information about limits and conditions. This can produce overwork, reluctance to ask for help, or a constant search for the next target. The risk is not ambition itself; it is losing access to relationships, curiosity, recovery, and values that remain meaningful when performance is temporarily invisible.",
    ),
    block(
      "entj-motivation-guidance",
      "guidance",
      "Define Success Broadly",
      "For one major commitment, distinguish the desired impact from the proof of personal competence. Define success using several measures: outcome, stakeholder adoption, capability built in others, ethical quality, learning, and sustainable effort. Identify what remains valuable if the original target changes. Schedule periods with no optimisation objective and notice any urge to turn recovery into another performance measure. Ambition becomes more durable when identity has more than one source of meaning.",
    ),
  ],
  "information-processing": [
    block(
      "entj-information-summary",
      "summary",
      "Patterns, Leverage, and Future Consequences",
      "An ENTJ pattern often attends to systems, trajectories, leverage points, and the future consequences of present choices. Information becomes useful when it clarifies what matters most, which constraints are structural, and where coordinated action can change the outcome. The person may move quickly from a broad pattern to an executable direction. This can create strategic coherence, provided abstraction remains connected to operational facts, dissenting evidence, and the experience of people closest to implementation.",
    ),
    block(
      "entj-information-analysis",
      "analysis",
      "Turning Abstraction Into a Plan",
      "The person may synthesise separate signals into a model of how the system works, then translate that model into priorities, sequencing, ownership, and measures. This movement from abstraction to action can be valuable when others see fragments but lack an organising frame. The danger is treating a compelling model as complete. Strategic insight should generate testable assumptions, not immunity from correction, and the execution plan should identify where reality can invalidate the theory.",
    ),
    block(
      "entj-information-strength",
      "strength",
      "Finding the High-Leverage Question",
      "A strong expression can separate symptoms from causes and identify the question that changes several downstream decisions. Instead of optimising each problem independently, the ENTJ may redesign incentives, information flow, authority, or resource allocation. This systems perspective can prevent repeated local fixes. Its practical test is whether the proposed leverage point improves real outcomes without transferring hidden costs to another team, stakeholder, or future period.",
    ),
    block(
      "entj-information-risk",
      "risk",
      "The Detail That Challenges the Strategy",
      "Once a direction feels coherent, operational detail may be dismissed as secondary or delegated before its strategic significance is understood. Contradictory data can sound like narrow thinking, while implementation concerns may be labelled resistance. This creates risk when one exception reveals a faulty assumption, legal constraint, adoption barrier, or capacity limit. A strategy is not weakened by grounded evidence; it becomes credible when it can absorb and respond to it.",
    ),
    block(
      "entj-information-guidance",
      "guidance",
      "Create a Contradiction Channel",
      "Before finalising a strategy, state the three assumptions on which it depends and assign someone to test each one. Invite operational experts to identify a detail that could change the direction, not merely improve delivery. Ask what evidence would make you revise or stop. Preserve a short decision record connecting the strategic model to observed facts. This keeps challenge focused and prevents confidence, hierarchy, or speed from closing inquiry too early.",
    ),
  ],
  "decision-making": [
    block(
      "entj-decisions-summary",
      "summary",
      "Objective Criteria and Decision Ownership",
      "ENTJs may prefer decisions based on explicit objectives, evidence, trade-offs, standards, and likely consequences. A clear choice can release resources and prevent ambiguity from becoming passive delay. The person may also be willing to own an unpopular decision when the rationale is defensible. Logic does not mean lack of emotion: emotional, cultural, and stakeholder information can be relevant evidence because it affects risk, adoption, trust, and the quality of implementation.",
    ),
    block(
      "entj-decisions-analysis",
      "analysis",
      "Making Trade-Offs Visible",
      "The pattern often seeks the criterion that should govern the choice: strategic value, cost, quality, risk, timing, or reversibility. Naming the criterion makes disagreement more productive because people can challenge assumptions rather than defend preferences indirectly. Mature decision ownership also identifies who bears the cost, what uncertainty remains, and when the choice will be reviewed. Clarity is strongest when it exposes trade-offs instead of presenting the conclusion as inevitable.",
    ),
    block(
      "entj-decisions-strength",
      "strength",
      "Decisiveness Under Complexity",
      "When information is incomplete but action is necessary, an ENTJ may define the acceptable risk, choose a direction, and establish checkpoints for correction. This can prevent teams from confusing more discussion with better judgement. The strength is not certainty; it is accountable movement under uncertainty. It works best when the decision remains reversible where possible and when people know what new evidence will trigger adaptation.",
    ),
    block(
      "entj-decisions-risk",
      "risk",
      "Efficiency Without Adoption",
      "A technically efficient option can fail if the people expected to implement it do not understand the reasoning, lack capability, or experience unaddressed consequences. The ENTJ may dismiss these responses as emotional resistance and communicate the conclusion before consultation has produced useful evidence. This confuses agreement with adoption and logic with completeness. Human impact belongs in the decision model because ignored context eventually appears as delay, error, turnover, or loss of trust.",
    ),
    block(
      "entj-decisions-guidance",
      "guidance",
      "A Four-Part Decision Record",
      "For a consequential choice, record four elements: the intended outcome, the governing criteria, the strongest contrary evidence, and the adoption conditions. Identify who was consulted and what changed because of their input. State which parts are decided, which remain open, and the review trigger. This preserves speed without forcing premature certainty and helps others understand the reasoning rather than receiving only a finished conclusion.",
    ),
  ],
  "communication": [
    block(
      "entj-communication-summary",
      "summary",
      "Direct, Concise, and Outcome-Oriented",
      "ENTJs may prefer communication that identifies the issue, decision, owner, and next step without unnecessary ambiguity. Directness can reduce confusion and make responsibility visible; it is not the same as aggression. Tone, timing, status, and culture still shape how a message is received. Effective communication pairs clarity with enough reasoning and listening for others to contribute information, challenge assumptions, and understand what is expected.",
    ),
    block(
      "entj-communication-analysis",
      "analysis",
      "Conclusions Can Outrun Context",
      "Once the ENTJ has synthesised a problem, the conclusion may feel more obvious than it does to everyone else. Communication can therefore jump from observation to directive while omitting the reasoning, alternatives considered, and uncertainty that shaped the choice. Listeners may experience this as arbitrary or overly forceful even when the intent is efficiency. Providing a concise logic chain increases both challenge quality and commitment to execution.",
    ),
    block(
      "entj-communication-risk",
      "risk",
      "Pace, Tone, and Unequal Air Time",
      "Fast processing and confidence can unintentionally narrow participation. The ENTJ may interrupt, answer the question before quieter contributors enter, or treat exploratory discussion as lack of preparation. Under pressure, direct language can become overly directive and disagreement may be framed as an execution problem. The cost is not only relational: valuable local knowledge disappears when people expect that challenge will be rushed, publicly defeated, or ignored.",
    ),
    block(
      "entj-communication-guidance",
      "guidance",
      "State Direction, Then Open the Evidence",
      "Use a compact sequence: context, conclusion, reasoning, uncertainty, invitation. Explain what has been decided and why, then name the specific evidence that could improve or alter the plan. In meetings, pause before responding, ask one person who has not spoken, and summarise the strongest objection fairly. For feedback, separate directness from intensity: describe observable behaviour and consequence without questioning competence or motive.",
    ),
    block(
      "entj-communication-reflection",
      "reflection",
      "What Did Others Need to Infer?",
      "Review a recent instruction or decision announcement. Could a capable person reconstruct the objective, trade-offs, and limits from what you said, or did they have to infer your reasoning? Ask someone what they heard rather than whether they agreed. Notice where your pace helped and where it reduced comprehension or contribution. The aim is not softer communication by default; it is clarity that creates informed action instead of simple compliance.",
    ),
  ],
  "teamwork-and-leadership": [
    block(
      "entj-teamwork-summary",
      "summary",
      "Direction, Accountability, and Capability",
      "ENTJs may contribute to teams by setting direction, clarifying ownership, coordinating dependencies, and maintaining attention on measurable outcomes. They can be comfortable initiating action and addressing performance gaps that others avoid. Leadership, however, is learned rather than guaranteed by type. Its quality depends on judgement, trust, ethics, listening, and the ability to develop capability in others—not on occupying the most visible position or making every decision personally.",
    ),
    block(
      "entj-teamwork-analysis",
      "analysis",
      "Designing Accountability",
      "A useful ENTJ contribution is making the operating model explicit: what success means, who owns which outcome, where decisions sit, and how dependencies will be resolved. Clear accountability can reduce politics and duplicated effort. It should also give people sufficient authority, information, and resources to fulfil their responsibilities. Accountability without agency becomes blame; agency without feedback becomes drift. Effective leadership designs both and revises the system when results reveal a structural problem.",
    ),
    block(
      "entj-teamwork-strength",
      "strength",
      "Mobilising Complex Work",
      "The ENTJ may be effective at bringing specialists, resources, timelines, and decisions into one coherent programme. By identifying critical paths and resolving competing demands, the person can help a team move from disconnected activity to shared execution. The leadership strength is greatest when experts retain ownership of their craft and can challenge the coordinating view. Alignment should make contribution easier, not reduce every role to following instructions.",
    ),
    block(
      "entj-teamwork-risk",
      "risk",
      "Delegation That Is Really Retained Control",
      "Delegation can fail when the outcome is assigned but every method, intermediate decision, and correction remains controlled by the leader. The ENTJ may take work back at the first sign of delay because personal intervention appears faster. Over time, the team waits for approval, quieter contributors stop offering alternatives, and the leader becomes a bottleneck. The resulting overload can then seem to confirm the belief that nobody else is ready.",
    ),
    block(
      "entj-teamwork-guidance",
      "guidance",
      "Delegate Outcomes and Build Judgement",
      "Define the result, constraints, decision rights, resources, and review points, then allow the owner to choose the method. Ask what support would increase success before prescribing it. When work falls short, diagnose whether the cause is capability, clarity, capacity, motivation, or system design. Give feedback that strengthens future judgement. Leadership can be expressed through facilitation, expertise, coordination, or formal authority; directness need not become dominance.",
    ),
  ],
  "career-environment": [
    block(
      "entj-career-summary",
      "summary",
      "Career Environments for Strategic Responsibility",
      "An ENTJ may be energised by environments that combine autonomy, complexity, measurable responsibility, and the opportunity to improve a system. Work can feel meaningful when strategic thinking connects to real decisions and implementation rather than remaining advisory or symbolic. Fit still depends on interests, qualifications, values, team culture, life stage, and the specific role. Personality preferences do not determine competence or prescribe a career.",
    ),
    block(
      "entj-career-analysis",
      "analysis",
      "Conditions That Support Contribution",
      "Helpful conditions may include meaningful authority, clear decision rights, capable colleagues, access to consequential information, and standards that connect effort to outcomes. The person may value room to challenge inefficient assumptions and coordinate across boundaries. Constraint is not inherently demotivating when its rationale is credible. Greater frustration is likely where accountability is ambiguous, decisions are repeatedly avoided, or politics matters more than transparent performance and responsible implementation.",
    ),
    block(
      "entj-career-example",
      "example",
      "Possible Fields, Not Prescriptions",
      "Examples can include operations leadership, entrepreneurship, consulting, product leadership, programme management, finance, law, engineering management, organisational transformation, policy implementation, and business development. Each field also contains roles with very different cultures and demands. These are illustrations, not prescriptions or predictions. Actual fit depends on expertise, values, interests, qualifications, autonomy, workload, colleagues, and whether the role's responsibilities align with the person's desired impact.",
    ),
    block(
      "entj-career-risk",
      "risk",
      "Success That Requires Chronic Over-Control",
      "Risk rises in roles where authority and accountability are mismatched, weak systems require constant personal intervention, or urgency has become the permanent operating model. The ENTJ may respond by working longer, centralising decisions, and becoming indispensable to a dysfunctional process. Environments that reward only visible results can intensify achievement-based identity while hiding ethical, relational, or health costs. A demanding role is not automatically developmental if it prevents delegation, learning, and recovery.",
    ),
    block(
      "entj-career-guidance",
      "guidance",
      "Career Decision Criteria",
      "Evaluate a role through evidence: What decisions can you make? Which outcomes are genuinely yours? How are strategy, execution, stakeholder impact, and ethics measured? Can competent disagreement influence direction? Does the organisation develop people or rely on heroic individuals? What boundaries protect sustained performance? Compare job titles with actual authority, incentives, leadership behaviour, and resource conditions. Choose the environment, not just the apparent scale or status of the challenge.",
    ),
  ],
  "relationship-dynamics": [
    block(
      "entj-relationships-summary",
      "summary",
      "Loyalty, Respect, and Shared Direction",
      "ENTJs may value loyalty, intellectual respect, independence, direct communication, and the ability to make shared plans. Commitment may be expressed by taking problems seriously, protecting agreed priorities, and investing in another person's ambitions. This can create a strong partnership when responsibility is negotiated rather than assumed. Relationship style varies with culture, attachment, trust, and experience; a logical preference does not reduce emotional depth or the need for care.",
    ),
    block(
      "entj-relationships-analysis",
      "analysis",
      "Respect Includes Independent Agency",
      "The ENTJ may approach partnership as two capable people coordinating priorities and solving difficulties openly. Shared direction can be stabilising, but respect also requires room for different pacing, emotional processes, and definitions of a good outcome. Another person's hesitation may contain information rather than weakness, and their choice need not be optimised to be legitimate. Closeness grows when influence is mutual and neither person becomes a project managed by the other.",
    ),
    block(
      "entj-relationships-strength",
      "strength",
      "Direct Commitment and Problem Ownership",
      "A useful strength is willingness to name difficult issues, make concrete commitments, and work toward a shared future rather than relying on vague intention. The ENTJ may bring courage, planning, and practical problem-solving during uncertainty. Directness supports trust when it remains respectful and when emotional experience is heard before solutions are imposed. Sometimes the most responsible contribution is presence and understanding rather than immediate correction.",
    ),
    block(
      "entj-relationships-risk",
      "risk",
      "Turning Connection Into Optimisation",
      "When discomfort appears, the person may move too quickly to diagnose, decide, and solve. Advice can arrive before the other person feels understood, and a negotiated difference may be treated as an inefficient obstacle. Under stress, confidence can become pressure and shared plans can become unilateral expectations. The risk is not directness itself; it is allowing the drive for resolution to override consent, emotional timing, and the relationship's need for mutual influence.",
    ),
    block(
      "entj-relationships-guidance",
      "guidance",
      "Ask Before Solving",
      "When someone brings a difficulty, ask whether they want understanding, exploration, advice, or action. Reflect the concern accurately before proposing a plan. For shared commitments, name the objective, each person's ownership, and what remains individually chosen. Discuss emotional impact as real information without requiring it to justify itself in operational terms. A relationship is not less effective because some conversations create understanding rather than an immediate measurable result.",
    ),
  ],
  "change-and-adaptation": [
    block(
      "entj-change-summary",
      "summary",
      "From Change Idea to Adoption",
      "ENTJs may be comfortable initiating change, challenging inefficient assumptions, and redesigning systems around a clearer future state. The person may quickly connect an idea to governance, resources, sequencing, and measurable outcomes. The dynamic interpretation below can qualify this pattern when SN or JP preferences are balanced or lower-confidence. Effective change leadership includes adoption: the result is not complete when the plan is approved, but when people can use, sustain, and improve it.",
      [
        {
          id: "entj-combination-change-flexibility",
          source: "combination",
          dimensions: ["SN", "JP"],
        },
      ],
    ),
    block(
      "entj-change-analysis",
      "analysis",
      "Architecture and Momentum",
      "The ENTJ may define the case for change, target operating model, ownership, and implementation path with confidence. This can create momentum where a group has remained trapped in diffuse dissatisfaction. The plan becomes stronger when it distinguishes what must be decided centrally from what should be designed locally. Stakeholders who help shape implementation are more likely to surface constraints, build capability, and retain ownership after the initiating leader moves on.",
    ),
    block(
      "entj-change-strength",
      "strength",
      "Moving Beyond the Status Quo",
      "A useful strength is willingness to question arrangements that persist mainly through habit, politics, or fragmented ownership. The person may frame an alternative future, align resources, and make the decisions required to test it. This can reduce the hidden cost of prolonged indecision. Change becomes responsible when ambition is paired with staged evidence, explicit risk ownership, and attention to who gains, who carries the transition cost, and who needs new capability.",
    ),
    block(
      "entj-change-risk",
      "risk",
      "Pace Without Adoption",
      "Once convinced, the ENTJ may treat further consultation as avoidable delay and assume that a strong rationale should produce immediate commitment. Timelines can reflect conceptual clarity rather than training, capacity, or behavioural change. Resistance may then be met with tighter control, which reduces honest reporting and reinforces dependence. Premature certainty also makes it harder to distinguish poor adoption from a flawed design. Speed matters, but only when the system can learn while moving.",
    ),
    block(
      "entj-change-guidance",
      "guidance",
      "Design Change as a Testable System",
      "Define the outcome, assumptions, minimum safeguards, adoption measures, and decision points before scaling. Run a bounded experiment where possible and give local owners authority to adapt within clear constraints. Track use, quality, unintended effects, and capability—not just delivery milestones. Ask what evidence would justify accelerating, redesigning, or stopping. This preserves decisive movement while preventing confidence from becoming a substitute for learning.",
    ),
  ],
  "stress-and-recovery": [
    block(
      "entj-stress-summary",
      "summary",
      "Stress Through Escalating Control",
      "Under sustained responsibility, an ENTJ may respond by increasing effort, centralising decisions, narrowing discussion, and pushing harder for closure. Visible productivity can continue while patience, listening, and recovery decline. Because competence is often part of the person's self-concept, slowing down may feel more threatening than continuing. Early recognition matters: behaviour changes under stress, and a more directive pattern is not the whole personality.",
    ),
    block(
      "entj-stress-analysis",
      "analysis",
      "The Escalation Sequence",
      "A possible sequence is rising stakes, reduced delegation, longer working hours, impatience with explanation, and increasingly directive communication. The person may interpret every delay as evidence that closer supervision is required, while colleagues share less uncertainty because challenge feels costly. This creates a feedback loop: less information reaches the leader, judgement narrows, and more personal control appears necessary. Difficulty disengaging can continue after the immediate demand has passed.",
    ),
    block(
      "entj-stress-evidence",
      "evidence",
      "Early Warning Signs to Track",
      "Useful signals may include interrupting more often, rewriting delegated work, treating questions as resistance, extending working hours without review, skipping recovery, becoming unusually contemptuous of slower contributors, or feeling that only personal supervision prevents failure. Physical tension, sleep disruption, and inability to enjoy unstructured time may also matter. Track change from the individual's normal pattern rather than assuming every ENTJ responds identically.",
    ),
    block(
      "entj-stress-risk",
      "risk",
      "When Competence Blocks Recovery",
      "Rest may be postponed until every problem is resolved, even though leadership work continuously produces new problems. Recovery can then be judged as inefficient or deserved only after exceptional performance. Continuing in a narrowed state increases error, weakens emotional judgement, and teaches the system to depend on unsustainable effort. The person may also resist support because accepting it feels inconsistent with being capable, responsible, or in control.",
    ),
    block(
      "entj-stress-guidance",
      "guidance",
      "Reduce Authority Load and Restore Range",
      "Identify the few decisions that genuinely require your authority and transfer or pause the rest. Establish a shutdown boundary, reduce stimulation, and use physical recovery before attempting another optimisation plan. Ask a trusted person to challenge your current assumptions and notice whether you can hear the answer without immediately solving it. This section supports reflection and planning; it is not medical advice or a substitute for qualified mental or physical healthcare.",
    ),
  ],
  "growth-roadmap": [
    block(
      "entj-growth-summary",
      "summary",
      "Sustainable, Calibrated Leadership",
      "Growth for an ENTJ does not require becoming less ambitious, logical, or direct. It involves matching control to actual risk, delegating real authority, listening for evidence that arrives through emotion or context, and separating personal responsibility from organisational responsibility. The dynamic slot below examines boundary risk as over-ownership and excessive control. Development should expand available choices rather than impose a new ideal of leadership performance.",
      [
        {
          id: "entj-combination-boundary-risk",
          source: "combination",
          dimensions: ["TF", "JP"],
        },
      ],
    ),
    block(
      "entj-growth-analysis",
      "analysis",
      "From Personal Control to System Capability",
      "A useful shift is asking what the system needs instead of what you can personally force through. Sometimes decisive intervention is appropriate; at other times the durable answer is clearer authority, better information, stronger capability, or more time for adoption. The developmental task is diagnosis before control. This preserves accountability while reducing bottlenecks and allows leadership to be expressed through design, coaching, and judgement rather than constant intervention.",
    ),
    block(
      "entj-growth-risk",
      "risk",
      "Development as Another Performance Target",
      "The ENTJ may turn reflection into a demanding improvement programme, measure every behaviour, and judge normal inconsistency as weak execution. This reproduces the same over-control the plan is meant to reduce. Listening, emotional awareness, and recovery cannot be mastered through force or constant optimisation. Sustainable development chooses a small number of behaviours, gathers honest feedback, and treats discomfort, relapse, and ambiguity as information rather than evidence of failure.",
    ),
    block(
      "entj-growth-guidance",
      "guidance",
      "Priority Development Practices",
      "Delegate one complete outcome with explicit decision rights. In consequential discussions, listen until you can state the strongest contrary view accurately. Add stakeholder adoption and human impact to decision criteria. Define where your responsibility ends and where another owner must decide. Protect recurring recovery that has no productivity measure. When urgency rises, ask whether tighter control addresses the actual risk or only reduces your discomfort with uncertainty.",
    ),
    block(
      "entj-growth-action",
      "action",
      "Measurable Growth Indicators",
      "Track the number of outcomes delegated without taking back the method, decisions changed by consultation, and meetings where a quieter contributor materially influenced direction. Monitor working hours, recovery boundaries, adoption measures, and responsibilities with a named owner other than you. Include qualitative evidence: whether people bring risks earlier, explain disagreements more freely, and show stronger independent judgement. Better leadership is not simply more output from the same central person.",
    ),
  ],
  "ninety-day-action-plan": [
    block(
      "entj-action-summary",
      "summary",
      "A Sustainable Leadership System",
      "This ninety-day programme turns the report into a bounded leadership experiment. It begins with evidence about workload and control, moves into delegation and communication practice, and finishes by establishing a more sustainable operating system. Select measures relevant to your role and current authority. The plan is a learning structure rather than another test of competence; reduce its scope if implementation begins to compete with recovery or essential responsibilities.",
    ),
    block(
      "entj-action-days-1-30",
      "action",
      "Days 1–30: Leadership and Workload Audit",
      "Objective: establish evidence about responsibility, control, and decision quality. Actions: (1) map recurring leadership and execution work with its true time cost; (2) mark each control point as required, inherited, or preference-based; (3) identify decisions that require consultation and name the missing voices; (4) record current measures for delivery, adoption, team capability, and recovery; (5) identify work owned personally because delegation feels slower. Success indicators: a complete responsibility map, three potential transfers, two consultation gaps, and baseline measures. Review questions: Where is my authority essential? Where have I become the system?",
    ),
    block(
      "entj-action-days-31-60",
      "action",
      "Days 31–60: Delegation, Listening, and Adoption",
      "Objective: test leadership behaviours that distribute judgement and improve implementation. Actions: (1) delegate one complete outcome with decision rights and review points; (2) use the context-conclusion-reasoning-uncertainty sequence for major decisions; (3) ask a quieter stakeholder to speak before giving your view; (4) add an adoption measure to one initiative; (5) protect two weekly recovery boundaries. Success indicators: the delegated owner retains the method, one decision changes through consultation, adoption evidence is reviewed, and recovery boundaries occur in at least six weeks. Review questions: What became stronger when I did not control the method?",
    ),
    block(
      "entj-action-days-61-90",
      "action",
      "Days 61–90: Build the Sustainable System",
      "Objective: convert useful experiments into a repeatable leadership system. Actions: (1) run one strategic experiment with explicit assumptions and stop criteria; (2) maintain one delegated outcome without taking back execution; (3) improve one team capability through coaching, documentation, or decision access; (4) formalise workload and recovery review points; (5) compare delivery, adoption, capability, and sustainability with the baseline. Success indicators: usable evidence from the experiment, independent ownership, one demonstrated capability gain, and a documented operating rhythm. Review questions: Which results improved because responsibility became more distributed?",
    ),
    block(
      "entj-action-review",
      "reflection",
      "Day 90 Review",
      "Compare the final evidence with the first-month baseline. Review outcomes, adoption, delegated ownership, team capability, working hours, recovery, and the quality of challenge reaching you. Keep practices that improved judgement or reduced dependence on personal control. Stop any measure that encouraged performance theatre. Select one next-quarter focus: decision explanation, delegation depth, stakeholder ownership, strategic testing, or recovery. Progress means a more capable and sustainable system, not perfect compliance with the programme.",
    ),
    block(
      "entj-action-guidance",
      "guidance",
      "Adjust the Plan to Real Capacity",
      "Treat the phases as a sequence of experiments, not a performance target. If illness, workload, caregiving, or another major demand reduces capacity, keep one observation practice and postpone expansion. If delegation fails, diagnose clarity, authority, capability, capacity, and support before reclaiming the work. Avoid adding metrics that create more administrative control than learning. Sustainable ambition includes changing the plan when current evidence shows that its cost exceeds its value.",
    ),
  ],
  methodology: [
    block(
      "entj-method-summary",
      "summary",
      "Interpretation Notes",
      "This V1 report combines an ENTJ type-level interpretation with dynamic dimension, confidence, and combination rules. The static content provides a coherent working hypothesis; generated slots qualify that hypothesis using the strength and balance of EI, SN, TF, and JP results. This structure preserves canonical section and block identifiers while allowing two people with the same four-letter result to receive meaningfully different emphasis.",
    ),
    block(
      "entj-method-analysis",
      "analysis",
      "Preferences Are Not Fixed Abilities",
      "Personality preferences describe tendencies in attention, decision criteria, and approach; they do not establish competence, values, leadership quality, emotional capacity, or behaviour in every setting. An ENTJ result does not automatically mean someone is a good leader, aggressive, unemotional, or suited to a particular career. Behaviour changes with role, culture, experience, trust, stress, and learned skill. Low-confidence or balanced dimensions require especially cautious interpretation and greater reliance on lived evidence.",
    ),
    block(
      "entj-method-guidance",
      "guidance",
      "Responsible Use and Limitations",
      "Treat this report as a working hypothesis for self-reflection, conversation, and development planning. It is not a clinical diagnosis and is not medical advice. It should not be used as the sole basis for hiring, medical, legal, educational, financial, relationship, or major life decisions. Responsible use compares the interpretation with observed behaviour, considers confidence and context, invites correction, and uses qualified guidance and relevant evidence where the stakes require it.",
    ),
    block(
      "entj-method-version",
      "evidence",
      "Version Information",
      "Report version: 1.0.0. Content version: 1.0.0. Rule version: 1.0.0. These identifiers preserve traceability as type content, dynamic dimension logic, and confidence handling evolve. A generated report should retain the report, content, and rule versions used at generation time so later updates do not silently change an earlier interpretation. Versioning supports comparison and audit; it does not imply clinical precision or permanent certainty.",
    ),
  ],
};

export const ENTJ_COMPLETE_REPORT:
  CompletePersonalityReportDefinition = {
    personalityType: "ENTJ",
    version: COMPLETE_PERSONALITY_REPORT_VERSION,
    title: { en: "ENTJ Complete Personality Report" },
    sections: COMPLETE_PERSONALITY_REPORT_STANDARD.map(
      (section) => ({
        ...section,
        title: { ...section.title },
        description: { ...section.description },
        contentBlocks: CONTENT_BY_SECTION[section.id] ?? [],
      }),
    ),
  };
