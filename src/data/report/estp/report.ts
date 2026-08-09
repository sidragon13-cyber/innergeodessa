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
      "estp-identity-summary",
      "summary",
      "Your Complete ESTP Report",
      "This complete report expands the free ESTP result into a contextual analysis of tactical direction, decision-making, coordination, relationships, work, stress, and development. It treats the type code as a working hypothesis about preferred ways of organising attention and action—not as a fixed identity, measure of ability, or guarantee of coordination skill. Use the sections that fit to sharpen self-observation, and treat mismatches as useful operating evidence about role, culture, experience, trust, stress, or balanced dimensions.",
    ),
  ],
  "personality-overview": [
    block(
      "estp-overview-summary",
      "summary",
      "An Tactical, Organising Pattern",
      "An ESTP pattern often combines clear tactical direction with a preference for clear decisions, coordinated resources, measurable responsibility, and purposeful action. The ESTP negotiator may readily identify what a system is trying to achieve, where effort is being lost, and who needs ownership to move work forward. These preferences can support coordination, but they do not automatically create good judgement or effective coordination. Skill, ethics, listening, domain knowledge, and the surrounding culture determine how the pattern is expressed.",
    ),
  ],
  "dimension-results": [
    block(
      "estp-dimensions-context",
      "analysis",
      "Reading the Four Dimensions",
      "An ESTP result combines preferences across EI, SN, TF, and JP, but the four letters do not all carry equal weight for every person. Confidence and balance can substantially change the visible pattern: a balanced EI result may look less outwardly forceful, a lower-confidence TF result may place more visible emphasis on relationships, and a flexible JP result may resist rigid closure. The dynamic interpretations below qualify the type-level narrative. Read low-confidence or balanced dimensions cautiously and compare them with behaviour across role, culture, trust, experience, and stress.",
      [
        {
          id: "estp-ei-strength",
          source: "dimension",
          dimensions: ["EI"],
        },
        {
          id: "estp-sn-boundary",
          source: "dimension",
          dimensions: ["SN"],
        },
        {
          id: "estp-tf-boundary",
          source: "dimension",
          dimensions: ["TF"],
        },
        {
          id: "estp-jp-boundary",
          source: "dimension",
          dimensions: ["JP"],
        },
        {
          id: "estp-overall-confidence",
          source: "confidence",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
  ],
  "key-strengths": [
    block(
      "estp-strengths-bridge",
      "summary",
      "Strengths in Context",
      "Likely ESTP strengths include tactical clarity, systems thinking, decision ownership, coordination of colleagues and resources, and sustained movement from intention to measurable result. The pattern may be especially useful when complexity requires priorities, real-time criteria, visible accountability, and a coherent clear tactical direction. These are preferences, not automatic abilities. Their value depends on knowledge, credibility, emotional judgement, and the willingness to adapt. Later sections distinguish effective use from overuse, such as replacing coordination with control or speed with premature certainty.",
    ),
  ],
  "growth-risks": [
    block(
      "estp-risks-bridge",
      "guidance",
      "Growth Through Calibrated Coordination",
      "Tactical development may involve slowing decisions long enough to hear contradictory operating evidence, delegating responsibility instead of retaining control, explaining reasoning before announcing conclusions, and treating stakeholder adoption as part of action rather than an obstacle to it. Other risks include impatience with weak follow-through, overwork, and identifying personal worth too closely with achievement or competence. These are not fixed flaws. The following sections convert them into specific questions, observable signals, and practical experiments that preserve ambition while improving judgement and sustainability.",
    ),
  ],
  "core-personality-pattern": [
    block(
      "estp-core-summary",
      "summary",
      "Tactical Direction and Adaptive Action",
      "An ESTP pattern often links a view of working direction with objective decision criteria and a preference for organised action. The ESTP negotiator may translate an ambitious opportunity outcome into priorities, real-time criteria, ownership, and coordinated action, then challenge arrangements that no longer serve the goal. Effective use balances tactical adaptation with stakeholder responsibility and the realities of human implementation. The retained dynamic slots below examine that interaction and qualify it when dimensions are balanced or confidence is low.",
      [
        {
          id: "estp-combination-care-adaptation",
          source: "combination",
          dimensions: ["SN", "TF", "JP"],
        },
        {
          id: "estp-balanced-dimensions",
          source: "confidence",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
    block(
      "estp-core-analysis",
      "analysis",
      "From Direction to Operating System",
      "The central pattern is not simply having goals; it is organising conditions that make goals executable. An ESTP may define the opportunity outcome, identify leverage points, establish decision rights, allocate resources, and create measures that reveal whether the system is working. This tactical engagement can reduce ambiguity and connect separate efforts into one direction. Its effectiveness increases when assumptions remain testable, local knowledge can challenge the plan, and colleagues understand both the reasoning and their decision authority to act.",
    ),
    block(
      "estp-core-strength",
      "strength",
      "Coordinating Complexity",
      "A well-developed expression can hold a near-term and durable objective while coordinating many moving parts. The ESTP negotiator may clarify dependencies, resolve competing priorities, and make decisions that allow specialists to contribute without losing the overall direction. Directness can help surface constraints early, while real-time criteria make progress visible. This is strongest when coordination creates autonomy for others rather than dependence on one central decision-maker, and when the system learns instead of merely complying.",
    ),
    block(
      "estp-core-risk",
      "risk",
      "When Direction Becomes Control",
      "The same drive for coherence can become excessive control when uncertainty, slower discussion, or a different working style is treated as operating evidence of weak action. The ESTP may assume decisions that belong elsewhere, prescribe methods instead of outcomes, or correct work before others can learn from it. Short-term speed then reduces ownership and hides information from quieter contributors. Control is calibrated when it protects a genuine risk; it is overused when it mainly relieves the leader's discomfort with ambiguity.",
    ),
    block(
      "estp-core-reflection",
      "reflection",
      "Is the System Building Capability?",
      "Review one area you currently direct closely. Is your involvement required by risk, expertise, or visible accountability, or has it become the default because taking over feels faster? What opportunity outcome, boundary, and review point could replace instructions about every step? Test in action: whose operating evidence is missing and what decision can move closer to the ESTP negotiator doing the work. The responsive aim is not less responsibility; it is responsibility designed so that judgement and capability grow throughout the system.",
    ),
  ],
  "motivation-and-needs": [
    block(
      "estp-motivation-summary",
      "summary",
      "Progress, Impact, and Responsibility",
      "ESTPs may feel energised by meaningful progress, autonomy, competent action, and responsibility for outcomes that matter. Motivation often increases when a difficult objective can be converted into a workable operating plan and when decision authority is proportionate to visible accountability. Building an effective system may be as satisfying as achieving the immediate result because it creates durable leverage. These preferences can appear differently across roles and cultures; not every ESTP seeks formal status, competition, or public coordination.",
    ),
    block(
      "estp-motivation-analysis",
      "analysis",
      "Autonomy With Consequence",
      "Autonomy is often most motivating when it is connected to real consequence rather than freedom without purpose. The ESTP negotiator may want room to set direction, make trade-offs, and improve the system, while accepting clear measures and ownership for the result. Frustration can rise when responsibility is high but decision authority is unclear, or when repeated discussion does not lead to action. A healthy environment pairs freedom with tactical feedback, transparent constraints, and visible accountability that applies consistently.",
    ),
    block(
      "estp-motivation-strength",
      "strength",
      "Building What Can Scale",
      "A useful strength is the willingness to invest beyond the immediate task by clarifying a operating plan, strengthening a process, or developing capability that improves future performance. The ESTP may tolerate complexity when it serves a significant result and can sustain effort through setbacks when progress remains measurable. This becomes more valuable when measures include quality, adoption, and immediate consequences—not only speed, output, or visible wins.",
    ),
    block(
      "estp-motivation-risk",
      "risk",
      "When Usefulness Becomes Self-Worth",
      "Being the dependable organiser can become too closely tied to personal worth. A delayed opportunity, unclear mandate, or necessary pause may then feel like a failure of responsibility rather than information about capacity and conditions. This tactical engagement can produce overwork, premature intervention, or reluctance to expose uncertainty. The action risk is not commitment itself; it is losing contact with relationships, recovery, and values that still matter when visible output slows.",
    ),
    block(
      "estp-motivation-guidance",
      "guidance",
      "Define Success Broadly",
      "For one major commitment, distinguish the desired impact from the proof of personal competence. Define success using several measures: opportunity outcome, stakeholder adoption, capability built in others, ethical quality, learning, and sustainable effort. Identify what remains valuable if the original target changes. Schedule periods with no optimisation objective and notice any urge to turn recovery into another performance measure. Ambition becomes more durable when identity has more than one source of meaning.",
    ),
  ],
  "information-processing": [
    block(
      "estp-information-summary",
      "summary",
      "Patterns, Leverage, and Future Consequences",
      "An ESTP pattern often attends to systems, trajectories, leverage points, and the future consequences of present choices. Information becomes useful when it clarifies what matters most, which constraints are structural, and where coordinated action can change the opportunity outcome. The ESTP negotiator may move quickly from a broad pattern to an executable direction. This tactical engagement can create tactical coherence, provided abstraction remains connected to tactical facts, dissenting operating evidence, and the experience of colleagues closest to implementation.",
    ),
    block(
      "estp-information-analysis",
      "analysis",
      "Turning Conceptualion Into a Plan",
      "The ESTP negotiator may synthesise separate signals into a model of how the system works, then translate that model into priorities, sequencing, ownership, and measures. This movement from abstraction to action can be valuable when others see fragments but lack an organising frame. The danger is treating a compelling model as complete. Tactical insight should generate testable assumptions, not immunity from correction, and the action plan should identify where reality can invalidate the theory.",
    ),
    block(
      "estp-information-strength",
      "strength",
      "Finding the High-Leverage Question",
      "A strong expression can separate symptoms from causes and identify the question that changes several downstream decisions. Instead of optimising each problem independently, the ESTP may redesign incentives, information flow, decision authority, or resource allocation. This systems perspective can prevent repeated local fixes. Its practical test is whether the proposed leverage point improves real outcomes without transferring hidden costs to another team, stakeholder, or future period.",
    ),
    block(
      "estp-information-risk",
      "risk",
      "The Detail That Challenges the Operating Plan",
      "Once a direction feels coherent, tactical detail may be dismissed as secondary or delegated before its tactical significance is understood. Contradictory data can sound like narrow thinking, while implementation concerns may be labelled resistance. This creates risk when one exception reveals a faulty assumption, legal constraint, adoption barrier, or capacity limit. A operating plan is not weakened by grounded operating evidence; it becomes credible when it can absorb and respond to it.",
    ),
    block(
      "estp-information-guidance",
      "guidance",
      "Create a Contradiction Channel",
      "Before finalising a operating plan, state the three assumptions on which it depends and assign someone to test each one. Invite tactical experts to identify a detail that could change the direction, not merely improve opportunity. Test in action: what operating evidence would make you revise or stop. Preserve a short decision record connecting the tactical model to observed facts. This responsive action keeps challenge focused and prevents confidence, hierarchy, or speed from closing inquiry too early.",
    ),
  ],
  "decision-making": [
    block(
      "estp-decisions-summary",
      "summary",
      "Objective Criteria and Decision Ownership",
      "ESTPs may prefer decisions based on explicit objectives, operating evidence, trade-offs, real-time criteria, and likely consequences. A clear choice can release resources and prevent ambiguity from becoming passive delay. The ESTP negotiator may also be willing to own an unpopular decision when the rationale is defensible. Logic does not mean lack of emotion: emotional, cultural, and stakeholder information can be relevant operating evidence because it affects risk, adoption, trust, and the quality of implementation.",
    ),
    block(
      "estp-decisions-analysis",
      "analysis",
      "Making Trade-Offs Visible",
      "The pattern often seeks the criterion that should govern the choice: tactical value, cost, quality, risk, timing, or reversibility. Naming the criterion makes disagreement more productive because colleagues can challenge assumptions rather than defend preferences indirectly. Mature decision ownership also identifies who bears the cost, what uncertainty remains, and when the choice will be reviewed. Clarity is strongest when it exposes trade-offs instead of presenting the conclusion as inevitable.",
    ),
    block(
      "estp-decisions-strength",
      "strength",
      "Decisiveness Under Complexity",
      "When information is incomplete but action is necessary, an ESTP may define the acceptable risk, choose a direction, and establish checkpoints for correction. This tactical engagement can prevent teams from confusing more discussion with better judgement. The strength is not certainty; it is responsive movement under uncertainty. It works best when the decision remains reversible where possible and when colleagues know what new operating evidence will trigger adaptation.",
    ),
    block(
      "estp-decisions-risk",
      "risk",
      "Efficiency Without Adoption",
      "A technically efficient option can fail if the colleagues expected to implement it do not understand the reasoning, lack capability, or experience unaddressed consequences. The ESTP may dismiss these responses as emotional resistance and communicate the conclusion before consultation has produced useful operating evidence. This confuses agreement with adoption and logic with completeness. Human impact belongs in the decision model because ignored context eventually appears as delay, error, turnover, or loss of trust.",
    ),
    block(
      "estp-decisions-guidance",
      "guidance",
      "A Four-Part Decision Record",
      "For a consequential choice, record four elements: the intended opportunity outcome, the governing criteria, the strongest contrary operating evidence, and the adoption conditions. Identify who was consulted and what changed because of their input. State which parts are decided, which remain open, and the review trigger. This preserves speed without forcing premature certainty and helps others understand the reasoning rather than receiving only a finished conclusion.",
    ),
  ],
  "communication": [
    block(
      "estp-communication-summary",
      "summary",
      "Direct, Concise, and Opportunity Outcome-Oriented",
      "ESTPs may prefer communication that identifies the issue, decision, owner, and next step without unnecessary ambiguity. Directness can reduce confusion and make responsibility visible; it is not the same as aggression. Tone, timing, status, and culture still shape how a message is received. Effective communication pairs clarity with enough reasoning and listening for others to contribute information, challenge assumptions, and understand what is expected.",
    ),
    block(
      "estp-communication-analysis",
      "analysis",
      "Conclusions Can Outrun Context",
      "Once the ESTP has synthesised a problem, the conclusion may feel more obvious than it does to everyone else. Communication can therefore jump from observation to directive while omitting the reasoning, alternatives considered, and uncertainty that shaped the choice. Listeners may experience this as arbitrary or overly forceful even when the intent is efficiency. Providing a concise logic chain increases both challenge quality and commitment to action.",
    ),
    block(
      "estp-communication-risk",
      "risk",
      "Pace, Tone, and Unequal Air Time",
      "Fast processing and confidence can unintentionally narrow participation. The ESTP may interrupt, answer the question before quieter contributors enter, or treat exploratory discussion as lack of preparation. Under pressure, direct language can become overly directive and disagreement may be framed as an action problem. The cost is not only relational: valuable local knowledge disappears when colleagues expect that challenge will be rushed, publicly defeated, or ignored.",
    ),
    block(
      "estp-communication-guidance",
      "guidance",
      "State Direction, Then Open the Operating Evidence",
      "Use a compact sequence: context, conclusion, reasoning, uncertainty, invitation. Explain what has been decided and why, then name the specific operating evidence that could improve or alter the plan. In meetings, pause before responding, ask one person who has not spoken, and summarise the strongest objection fairly. For tactical feedback, separate directness from intensity: describe observable behaviour and consequence without questioning competence or motive.",
    ),
    block(
      "estp-communication-reflection",
      "reflection",
      "Could Others Act Without Guessing?",
      "Review a recent instruction or operating update. Could a capable colleague identify the required result, relevant standard, decision boundary, and escalation point, or did they have to infer them? Test in action: what they understood rather than only whether they agreed. Notice where speed improved opportunity and where it reduced ownership. The responsive aim is precise coordination that lets others exercise judgement instead of waiting for correction.",
    ),
  ],
  "teamwork-and-leadership": [
    block(
      "estp-teamwork-summary",
      "summary",
      "Direction, Visible Accountability, and Capability",
      "ESTPs may contribute to teams by setting direction, clarifying ownership, coordinating dependencies, and maintaining attention on measurable outcomes. They can be comfortable initiating action and addressing performance gaps that others avoid. Coordination, however, is learned rather than guaranteed by type. Its quality depends on judgement, trust, ethics, listening, and the ability to develop capability in others—not on occupying the most visible position or making every decision personally.",
    ),
    block(
      "estp-teamwork-analysis",
      "analysis",
      "Designing Visible Accountability",
      "A useful ESTP contribution is making the operating model explicit: what success means, who owns which opportunity outcome, where decisions sit, and how dependencies will be resolved. Clear visible accountability can reduce politics and duplicated effort. It should also give colleagues sufficient decision authority, information, and resources to fulfil their responsibilities. Visible Accountability without agency becomes blame; agency without tactical feedback becomes drift. Effective coordination designs both and revises the system when results reveal a structural problem.",
    ),
    block(
      "estp-teamwork-strength",
      "strength",
      "Mobilising Complex Work",
      "The ESTP may be effective at bringing specialists, resources, timelines, and decisions into one coherent programme. By identifying critical paths and resolving competing demands, the ESTP negotiator can help a team move from disconnected activity to shared action. The coordination strength is greatest when experts retain ownership of their craft and can challenge the coordinating view. Alignment should make contribution easier, not reduce every role to following instructions.",
    ),
    block(
      "estp-teamwork-risk",
      "risk",
      "Delegation That Is Really Retained Control",
      "Delegation can fail when the opportunity outcome is assigned but every method, intermediate decision, and correction remains controlled by the leader. The ESTP may take work back at the first sign of delay because personal intervention appears faster. Over time, the team waits for approval, quieter contributors stop offering alternatives, and the leader becomes a bottleneck. The resulting overload can then seem to confirm the belief that nobody else is ready.",
    ),
    block(
      "estp-teamwork-guidance",
      "guidance",
      "Delegate Opportunity Opportunity Outcomes and Build Judgement",
      "Define the result, constraints, decision rights, resources, and review points, then allow the owner to choose the method. Test in action: what support would increase success before prescribing it. When work falls short, diagnose whether the cause is capability, clarity, capacity, motivation, or system design. Give tactical feedback that strengthens future judgement. Leadership can be expressed through facilitation, expertise, cross-team alignment, or formal decision authority; directness need not become dominance.",
    ),
  ],
  "career-environment": [
    block(
      "estp-career-summary",
      "summary",
      "Career Environments for Tactical Responsibility",
      "An ESTP may be energised by environments that combine autonomy, complexity, measurable responsibility, and the opportunity to improve a system. Work can feel meaningful when tactical thinking connects to real decisions and implementation rather than remaining advisory or symbolic. Fit still depends on interests, qualifications, values, team culture, life stage, and the specific role. Personality preferences do not determine competence or prescribe a career.",
    ),
    block(
      "estp-career-analysis",
      "analysis",
      "Conditions That Support Contribution",
      "Helpful conditions may include meaningful decision authority, clear decision rights, capable colleagues, access to consequential information, and real-time criteria that connect effort to outcomes. The ESTP negotiator may value room to challenge inefficient assumptions and coordinate across boundaries. Constraint is not inherently demotivating when its rationale is credible. Greater frustration is likely where visible accountability is ambiguous, decisions are repeatedly avoided, or politics matters more than transparent performance and responsible implementation.",
    ),
    block(
      "estp-career-example",
      "example",
      "Possible Fields, Not Prescriptions",
      "Examples can include operations coordination, entrepreneurship, consulting, product coordination, programme management, finance, law, engineering management, organisational transformation, policy implementation, and business development. Each field also contains roles with very different cultures and demands. These are illustrations, not prescriptions or predictions. Actual fit depends on expertise, values, interests, qualifications, autonomy, workload, colleagues, and whether the role's responsibilities align with the ESTP negotiator's desired impact.",
    ),
    block(
      "estp-career-risk",
      "risk",
      "Success That Requires Chronic Over-Control",
      "Risk rises in roles where decision authority and visible accountability are mismatched, weak systems require constant personal intervention, or urgency has become the permanent operating model. The ESTP may respond by working longer, centralising decisions, and becoming indispensable to a dysfunctional process. Environments that reward only visible results can intensify achievement-based identity while hiding ethical, relational, or health costs. A demanding role is not automatically developmental if it prevents delegation, learning, and recovery.",
    ),
    block(
      "estp-career-guidance",
      "guidance",
      "Career Decision Criteria",
      "Evaluate a role through operating evidence: What decisions can you make? Which outcomes are genuinely yours? How are operating plan, action, stakeholder impact, and ethics measured? Can competent disagreement shape direction? Does the organisation develop colleagues or rely on heroic individuals? What boundaries protect sustained performance? Compare job titles with actual decision authority, incentives, coordination behaviour, and resource conditions. Choose the environment, not just the apparent scale or status of the challenge.",
    ),
  ],
  "relationship-dynamics": [
    block(
      "estp-relationships-summary",
      "summary",
      "Loyalty, Respect, and Shared Direction",
      "ESTPs may value loyalty, intellectual respect, independence, direct communication, and the ability to make shared plans. Commitment may be expressed by taking problems seriously, protecting agreed priorities, and investing in another person's ambitions. This tactical engagement can create a strong partnership when responsibility is negotiated rather than assumed. Relationship style varies with culture, attachment, trust, and experience; a logical preference does not reduce emotional depth or the need for care.",
    ),
    block(
      "estp-relationships-analysis",
      "analysis",
      "Respect Includes Independent Agency",
      "The ESTP may approach partnership as two capable colleagues coordinating priorities and solving difficulties openly. Shared direction can be stabilising, but respect also requires room for different pacing, emotional processes, and definitions of a good opportunity outcome. Another person's hesitation may contain information rather than weakness, and their choice need not be optimised to be legitimate. Closeness grows when responsibility is mutual and neither person becomes a project managed by the other.",
    ),
    block(
      "estp-relationships-strength",
      "strength",
      "Direct Commitment and Problem Ownership",
      "A useful strength is willingness to name difficult issues, make concrete commitments, and work toward a shared future rather than relying on vague intention. The ESTP may bring courage, negotiation, and practical problem-solving during uncertainty. Directness supports trust when it remains respectful and when emotional experience is heard before solutions are imposed. Sometimes the most responsible contribution is presence and understanding rather than immediate correction.",
    ),
    block(
      "estp-relationships-risk",
      "risk",
      "Turning Connection Into Optimisation",
      "When discomfort appears, the ESTP negotiator may move too quickly to diagnose, decide, and solve. Advice can arrive before the other person feels understood, and a negotiated difference may be treated as an inefficient obstacle. Under stress, confidence can become pressure and shared plans can become unilateral expectations. The action risk is not directness itself; it is allowing the drive for resolution to override consent, emotional timing, and the relationship's need for mutual responsibility.",
    ),
    block(
      "estp-relationships-guidance",
      "guidance",
      "Clarify the Kind of Support Required",
      "When someone raises a difficulty, ask whether they need attention, joint diagnosis, practical help, or a decision. Reflect the concern before assigning a next step. For shared commitments, make responsibilities explicit while preserving what each person can choose. Treat emotional impact as relevant relationship information rather than demanding an immediate tactical justification. Some conversations strengthen trust before they produce a measurable result.",
    ),
  ],
  "change-and-adaptation": [
    block(
      "estp-change-summary",
      "summary",
      "From Change Idea to Adoption",
      "ESTPs may be comfortable initiating change, challenging inefficient assumptions, and redesigning systems around a clearer future state. The ESTP negotiator may quickly connect an idea to governance, resources, sequencing, and measurable outcomes. The dynamic interpretation below can qualify this pattern when SN or JP preferences are balanced or lower-confidence. Effective change coordination includes adoption: the result is not complete when the plan is approved, but when colleagues can use, sustain, and improve it.",
      [
        {
          id: "estp-combination-change-flexibility",
          source: "combination",
          dimensions: ["SN", "JP"],
        },
      ],
    ),
    block(
      "estp-change-analysis",
      "analysis",
      "Operating Adaptation and Momentum",
      "The ESTP may define the case for change, target operating model, ownership, and implementation path with confidence. This tactical engagement can create momentum where a group has remained trapped in diffuse dissatisfaction. The plan becomes stronger when it distinguishes what must be decided centrally from what should be designed locally. Stakeholders who help shape implementation are more likely to surface constraints, build capability, and retain ownership after the initiating leader moves on.",
    ),
    block(
      "estp-change-strength",
      "strength",
      "Moving Beyond the Status Quo",
      "A useful strength is willingness to question arrangements that persist mainly through habit, politics, or fragmented ownership. The ESTP negotiator may frame an alternative future, align resources, and make the decisions required to test it. This tactical engagement can reduce the hidden cost of prolonged indecision. Change becomes responsible when ambition is paired with staged operating evidence, explicit risk ownership, and attention to who gains, who carries the transition cost, and who needs new capability.",
    ),
    block(
      "estp-change-risk",
      "risk",
      "Pace Without Adoption",
      "Once convinced, the ESTP may treat further consultation as avoidable delay and assume that a strong rationale should produce immediate commitment. Timelines can reflect conceptual clarity rather than training, capacity, or behavioural change. Resistance may then be met with tighter control, which reduces honest reporting and reinforces dependence. Premature certainty also makes it harder to distinguish poor adoption from a flawed design. Speed matters, but only when the system can learn while moving.",
    ),
    block(
      "estp-change-guidance",
      "guidance",
      "Design Change as a Testable System",
      "Define the opportunity outcome, assumptions, minimum safeguards, adoption measures, and decision points before scaling. Run a bounded experiment where possible and give local owners decision authority to adapt within clear constraints. Track use, quality, unintended effects, and capability—not just opportunity milestones. Test in action: what operating evidence would justify accelerating, redesigning, or stopping. This preserves decisive movement while preventing confidence from becoming a substitute for learning.",
    ),
  ],
  "stress-and-recovery": [
    block(
      "estp-stress-summary",
      "summary",
      "Stress Through Escalating Control",
      "Under sustained responsibility, an ESTP may respond by increasing effort, centralising decisions, narrowing discussion, and pushing harder for closure. Visible productivity can continue while patience, listening, and recovery decline. Because competence is often part of the ESTP negotiator's self-concept, slowing down may feel more threatening than continuing. Early recognition matters: behaviour changes under stress, and a more directive pattern is not the whole personality.",
    ),
    block(
      "estp-stress-analysis",
      "analysis",
      "The Escalation Sequence",
      "A possible sequence is rising stakes, reduced delegation, longer working hours, impatience with explanation, and increasingly directive communication. The ESTP negotiator may interpret every delay as operating evidence that closer supervision is required, while colleagues share less uncertainty because challenge feels costly. This creates a tactical feedback loop: less information reaches the leader, judgement narrows, and more personal control appears necessary. Difficulty disengaging can continue after the immediate demand has passed.",
    ),
    block(
      "estp-stress-evidence",
      "evidence",
      "Early Warning Signs to Track",
      "Useful signals may include interrupting more often, rewriting delegated work, treating questions as resistance, extending working hours without review, skipping recovery, becoming unusually contemptuous of slower contributors, or feeling that only personal supervision prevents failure. Physical tension, sleep disruption, and inability to enjoy unstructured time may also matter. Track change from the individual's normal pattern rather than assuming every ESTP responds identically.",
    ),
    block(
      "estp-stress-risk",
      "risk",
      "When Competence Blocks Recovery",
      "Rest may be postponed until every problem is resolved, even though coordination work continuously produces new problems. Recovery can then be judged as inefficient or deserved only after exceptional performance. Continuing in a narrowed state increases error, weakens emotional judgement, and teaches the system to depend on unsustainable effort. The ESTP negotiator may also resist support because accepting it feels inconsistent with being capable, responsible, or in control.",
    ),
    block(
      "estp-stress-guidance",
      "guidance",
      "Reduce Decision Authority Load and Restore Range",
      "Identify the few decisions that genuinely require your decision authority and transfer or pause the rest. Establish a shutdown boundary, reduce stimulation, and use physical recovery before attempting another optimisation plan. Test in action: a trusted person to challenge your current assumptions and notice whether you can hear the answer without immediately solving it. This section supports reflection and negotiation; it is not medical advice or a substitute for qualified mental or physical healthcare.",
    ),
  ],
  "growth-roadmap": [
    block(
      "estp-growth-summary",
      "summary",
      "Sustainable, Calibrated Coordination",
      "Growth for an ESTP does not require becoming less ambitious, logical, or direct. It involves matching control to actual risk, delegating real decision authority, listening for operating evidence that arrives through emotion or context, and separating personal responsibility from organisational responsibility. The dynamic slot below examines boundary risk as over-ownership and excessive control. Development should expand available choices rather than impose a new ideal of coordination performance.",
      [
        {
          id: "estp-combination-boundary-risk",
          source: "combination",
          dimensions: ["TF", "JP"],
        },
      ],
    ),
    block(
      "estp-growth-analysis",
      "analysis",
      "From Fast Intervention to Better Options",
      "A useful shift is asking what the situation makes possible instead of what can be forced through immediately. Direct intervention may be appropriate; at other times the stronger move is a clearer negotiation boundary, better live information, or room for another person to respond. The developmental task is tactical diagnosis before action. This preserves momentum while reducing avoidable escalation and lets influence operate through timing, questions, and trade-offs rather than constant intervention.",
    ),
    block(
      "estp-growth-risk",
      "risk",
      "Development as Another Performance Target",
      "The ESTP may turn reflection into a demanding improvement programme, measure every behaviour, and judge normal inconsistency as weak action. This reproduces the same over-control the plan is meant to reduce. Listening, emotional awareness, and recovery cannot be mastered through force or constant optimisation. Sustainable development chooses a small number of behaviours, gathers honest tactical feedback, and treats discomfort, relapse, and ambiguity as information rather than operating evidence of failure.",
    ),
    block(
      "estp-growth-guidance",
      "guidance",
      "Priority Development Practices",
      "Delegate one complete opportunity outcome with explicit decision rights. In consequential discussions, listen until you can state the strongest contrary view accurately. Add stakeholder adoption and human impact to decision criteria. Define where your responsibility ends and where another owner must decide. Protect recurring recovery that has no productivity measure. When urgency rises, ask whether tighter control addresses the actual risk or only reduces your discomfort with uncertainty.",
    ),
    block(
      "estp-growth-action",
      "action",
      "Measurable Growth Indicators",
      "Track the number of outcomes delegated without taking back the method, decisions changed by consultation, and meetings where a quieter contributor materially influenced direction. Monitor working hours, recovery boundaries, adoption measures, and responsibilities with a named owner other than you. Include qualitative operating evidence: whether colleagues bring risks earlier, explain disagreements more freely, and show stronger independent judgement. Better coordination is not simply more output from the same central person.",
    ),
  ],
  "ninety-day-action-plan": [
    block(
      "estp-action-summary",
      "summary",
      "A Sustainable Coordination System",
      "This ninety-day programme turns the report into a bounded coordination experiment. It begins with operating evidence about workload and control, moves into delegation and communication practice, and finishes by establishing a more sustainable operating system. Select measures relevant to your role and current decision authority. The plan is a learning adaptation rather than another test of competence; reduce its scope if implementation begins to compete with recovery or essential responsibilities.",
    ),
    block(
      "estp-action-days-1-30",
      "action",
      "Days 1–30: Observe the Live System",
      "Objective: replace assumptions about an immediate opportunity with direct operating evidence. Actions: (1) choose one active situation with a measurable result; (2) observe the people, constraints, timing, and current workarounds before intervening; (3) ask two local participants what would make action easier or riskier; (4) record one impulse to act before the decision boundary was clear; (5) define success, safeguards, and a stop condition. Success indicators: a shared situation map, two verified constraints, and one bounded tactical trial.",
    ),
    block(
      "estp-action-days-31-60",
      "action",
      "Days 31–60: Act, Debrief, and Adjust",
      "Objective: use short action cycles without confusing speed with correct judgement. Actions: (1) run the tactical trial with a named local owner; (2) hold a brief debrief after each cycle using result, unintended effect, and next constraint; (3) ask a quieter participant for evidence before proposing the adjustment; (4) leave the method with the owner inside agreed safeguards; (5) protect two weekly recovery boundaries. Success indicators: faster feedback, one decision changed by local evidence, and continued ownership without repeated intervention.",
    ),
    block(
      "estp-action-days-61-90",
      "action",
      "Days 61–90: Convert Response Into Capability",
      "Objective: retain the useful tactical practice without making constant intervention necessary. Actions: (1) document the cues, decision boundary, safeguards, and escalation point; (2) ask another owner to run the response without you; (3) review whether speed, quality, stakeholder impact, and workload improved; (4) retire one action that created motion without value; (5) choose whether to standardise, adapt, or stop. Success indicators: independent response, a shorter evidence cycle, one removed low-value action, and recovery that does not depend on the opportunity disappearing.",
    ),
    block(
      "estp-action-review",
      "reflection",
      "Day 90 Review",
      "Compare the final operating evidence with the first-month baseline. Review outcomes, adoption, delegated ownership, team capability, working hours, recovery, and the quality of challenge reaching you. Keep practices that improved judgement or reduced dependence on personal control. Stop any measure that encouraged performance theatre. Select one next-quarter focus: decision explanation, delegation depth, stakeholder ownership, tactical testing, or recovery. Progress means a more capable and sustainable system, not perfect compliance with the programme.",
    ),
    block(
      "estp-action-guidance",
      "guidance",
      "Keep the Experiment Proportionate",
      "Treat the phases as tactical trials, not a performance target. If illness, workload, caregiving, or another major demand reduces capacity, keep one observation practice and pause expansion. If a shared action stalls, check clarity, incentives, authority, timing, and support before taking over. Avoid measurement that creates more administration than feedback. Sustainable responsiveness includes ending an experiment when real-time evidence shows that its cost exceeds the opportunity.",
    ),
  ],
  methodology: [
    block(
      "estp-method-summary",
      "summary",
      "Interpretation Notes",
      "This V1 report combines an ESTP type-level interpretation with dynamic dimension, confidence, and combination rules. The static content provides a coherent working hypothesis; generated slots qualify that hypothesis using the strength and balance of EI, SN, TF, and JP results. This adaptation preserves canonical section and block identifiers while allowing two colleagues with the same four-letter result to receive meaningfully different emphasis.",
    ),
    block(
      "estp-method-analysis",
      "analysis",
      "Preferences Are Not Fixed Abilities",
      "Personality preferences describe tendencies in attention, decision criteria, and approach; they do not establish competence, values, coordination quality, emotional capacity, or behaviour in every setting. An ESTP result does not automatically mean someone is a good leader, aggressive, unemotional, or suited to a particular career. Behaviour changes with role, culture, experience, trust, stress, and learned skill. Low-confidence or balanced dimensions require especially cautious interpretation and greater reliance on lived operating evidence.",
    ),
    block(
      "estp-method-guidance",
      "guidance",
      "Responsible Use and Limitations",
      "Treat this report as a working hypothesis for self-reflection, conversation, and development negotiation. It is not a clinical diagnosis and is not medical advice. It should not be used as the sole basis for hiring, medical, legal, educational, financial, relationship, or major life decisions. Responsible use compares the interpretation with observed behaviour, considers confidence and context, invites correction, and uses qualified guidance and relevant operating evidence where the stakes require it.",
    ),
    block(
      "estp-method-version",
      "evidence",
      "Version Information",
      "Report version: 1.0.0. Content version: 1.0.0. Rule version: 1.0.0. These identifiers preserve traceability as type content, dynamic dimension logic, and confidence handling evolve. A generated report should retain the report, content, and rule versions used at generation time so later updates do not silently change an earlier interpretation. Versioning supports comparison and audit; it does not imply clinical precision or permanent certainty.",
    ),
  ],
};

export const ESTP_COMPLETE_REPORT:
  CompletePersonalityReportDefinition = {
    personalityType: "ESTP",
    version: COMPLETE_PERSONALITY_REPORT_VERSION,
    title: { en: "ESTP Complete Personality Report" },
    sections: COMPLETE_PERSONALITY_REPORT_STANDARD.map(
      (section) => ({
        ...section,
        title: { ...section.title },
        description: { ...section.description },
        contentBlocks: CONTENT_BY_SECTION[section.id] ?? [],
      }),
    ),
  };
