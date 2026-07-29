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
  title: string,
  content: string,
  dynamicSlots?: ReportDynamicSlot[],
): ReportContentBlock {
  return {
    id,
    type,
    title: { en: title },
    content: { en: content },
    ...(dynamicSlots ? { dynamicSlots } : {}),
  };
}

const CONTENT_BY_SECTION: Record<
  string,
  ReportContentBlock[]
> = {
  "report-identity": [
    block(
      "enfj-identity-summary",
      "summary",
      "Your Complete ENFJ Report",
      "This complete report expands the free ENFJ result into a contextual analysis of relational direction, decision-making, leadership, relationships, work, stress, and development. It treats the type code as a working hypothesis about preferred ways of organising attention and action—not as a fixed identity, measure of ability, or guarantee of leadership skill. Use the sections that fit to sharpen self-observation, and treat mismatches as useful evidence about role, culture, experience, trust, stress, or balanced dimensions.",
    ),
  ],
  "personality-overview": [
    block(
      "enfj-overview-summary",
      "summary",
      "Relational Leadership and Collective Development",
      "An ENFJ pattern often combines outward relational attention, long-range possibility, values-guided judgement, and organised collective action. The person may notice what helps people participate, connect individual development with a shared purpose, and create enough structure for a group to move together. These preferences can support relational leadership, but they do not guarantee empathy, consent, or effectiveness. Listening, boundaries, expertise, ethics, and culture determine how the pattern is expressed.",
    ),
  ],
  "dimension-results": [
    block(
      "enfj-dimensions-context",
      "analysis",
      "Reading the Four Dimensions",
      "An ENFJ result combines preferences across EI, SN, TF, and JP, but the four letters do not all carry equal weight for every person. Confidence and balance can substantially change the visible pattern: a balanced EI result may look less outwardly forceful, a lower-confidence TF result may place more visible emphasis on relationships, and a flexible JP result may resist rigid closure. The dynamic interpretations below qualify the type-level narrative. Read low-confidence or balanced dimensions cautiously and compare them with behaviour across role, culture, trust, experience, and stress.",
      [
        {
          id: "enfj-ei-strength",
          source: "dimension",
          dimensions: ["EI"],
        },
        {
          id: "enfj-sn-boundary",
          source: "dimension",
          dimensions: ["SN"],
        },
        {
          id: "enfj-tf-boundary",
          source: "dimension",
          dimensions: ["TF"],
        },
        {
          id: "enfj-jp-boundary",
          source: "dimension",
          dimensions: ["JP"],
        },
        {
          id: "enfj-overall-confidence",
          source: "confidence",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
  ],
  "key-strengths": [
    block(
      "enfj-strengths-bridge",
      "summary",
      "Strengths in Context",
      "Likely ENFJ strengths include building trust, articulating shared purpose, recognising developmental potential, coordinating participation, and sustaining collective movement through change. The pattern may be useful when a group needs both human connection and clear direction. These are preferences, not automatic abilities. Their value depends on listening, credibility, cultural humility, boundaries, and willingness to let other people define their own goals. Later sections distinguish encouragement from pressure and care from over-responsibility.",
    ),
  ],
  "growth-risks": [
    block(
      "enfj-risks-bridge",
      "guidance",
      "Growth Through Calibrated Leadership",
      "Development may involve asking before helping, tolerating disagreement without treating it as relational failure, delegating ownership instead of carrying the group's emotional climate, and making room for quiet or less expressive participation. Other risks include overwork, indirect resentment, and identifying worth with being needed or appreciated. These are not fixed flaws. The following sections convert them into observable signals and practices that preserve warmth and shared purpose while improving consent, boundaries, and sustainability.",
    ),
  ],
  "core-personality-pattern": [
    block(
      "enfj-core-summary",
      "summary",
      "Relational Leadership and Shared Development",
      "An ENFJ pattern often links awareness of group needs with a future-oriented picture of what people could build or become together. The person may translate that possibility into encouragement, agreements, roles, and coordinated action. Effective use makes purpose visible while preserving consent, difference, and local ownership. The retained dynamic slots below examine that interaction and qualify it when dimensions are balanced or confidence is low.",
      [
        {
          id: "enfj-combination-care-structure",
          source: "combination",
          dimensions: ["SN", "TF", "JP"],
        },
        {
          id: "enfj-balanced-dimensions",
          source: "confidence",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
    block(
      "enfj-core-analysis",
      "analysis",
      "From Direction to Operating System",
      "The central pattern is not simply having goals; it is organising conditions that make goals executable. An ENFJ may define the outcome, identify leverage points, establish decision rights, allocate relationships, and create measures that reveal whether the system is working. This can reduce ambiguity and connect separate efforts into one direction. Its effectiveness increases when assumptions remain testable, local knowledge can challenge the plan, and people understand both the reasoning and their authority to act.",
    ),
    block(
      "enfj-core-strength",
      "strength",
      "Coordinating Belonging and Contribution",
      "A developed ENFJ expression can hold a shared purpose while helping different people understand how their contributions connect. The person may translate between perspectives, surface relational constraints, and create agreements that let specialists participate without losing collective direction. This is strongest when coordination expands voice and local ownership rather than making the group dependent on one source of encouragement or interpretation.",
    ),
    block(
      "enfj-core-risk",
      "risk",
      "When Direction Becomes Overreach",
      "The same drive for coherence can become excessive overreach when uncertainty, slower discussion, or a different working style is treated as evidence of weak development. The ENFJ may assume decisions that belong elsewhere, prescribe methods instead of outcomes, or correct work before others can learn from it. Short-term speed then reduces ownership and hides information from quieter contributors. Overreach is calibrated when it protects a genuine risk; it is overused when it mainly relieves the leader's discomfort with ambiguity.",
    ),
    block(
      "enfj-core-reflection",
      "reflection",
      "Is Support Building Agency?",
      "Review one person or group you currently support closely. Is your involvement requested and useful, or has anticipating needs become the default because uncertainty feels uncomfortable? What question, boundary, or transfer of ownership would let others define their next step? Ask whose voice is quiet and whether your encouragement leaves real room to decline. The aim is care that strengthens agency rather than care that becomes necessary for movement.",
    ),
  ],
  "motivation-and-needs": [
    block(
      "enfj-motivation-summary",
      "summary",
      "Progress, Impact, and Responsibility",
      "ENFJs may feel energised by meaningful progress, autonomy, competent development, and responsibility for outcomes that matter. Motivation often increases when a difficult objective can be converted into a workable strategy and when authority is proportionate to accountability. Building an effective system may be as satisfying as achieving the immediate result because it creates durable leverage. These preferences can appear differently across roles and cultures; not every ENFJ seeks formal status, competition, or public leadership.",
    ),
    block(
      "enfj-motivation-analysis",
      "analysis",
      "Connection With Meaningful Contribution",
      "ENFJ motivation may rise when relationships, purpose, and visible development reinforce one another. The person often wants enough influence to improve how people work together and enough feedback to know that effort helps. Frustration can rise when responsibility for cohesion is implied but authority and boundaries remain unclear. A healthy environment pairs shared purpose with reciprocal care, explicit ownership, honest disagreement, and recognition that does not depend on constant availability.",
    ),
    block(
      "enfj-motivation-strength",
      "strength",
      "Building What Can Scale",
      "A useful strength is the willingness to invest beyond the immediate task by clarifying a strategy, strengthening a process, or developing capability that improves future performance. The ENFJ may tolerate complexity when it serves a significant result and can sustain effort through setbacks when progress remains measurable. This becomes more valuable when measures include quality, adoption, and long-term consequences—not only speed, output, or visible wins.",
    ),
    block(
      "enfj-motivation-risk",
      "risk",
      "Being Needed as Identity",
      "Usefulness, appreciation, and relational influence can become too closely tied to self-worth. Another person's independence, disagreement, or preference for space may then feel like rejection rather than ordinary agency. This can produce overwork, unsolicited support, or difficulty naming personal needs. The risk is not generosity; it is losing access to rest, mutuality, and values that remain meaningful when no one currently needs guidance.",
    ),
    block(
      "enfj-motivation-guidance",
      "guidance",
      "Define Success Broadly",
      "For one major commitment, distinguish the desired impact from the proof of personal competence. Define success using several measures: outcome, community adoption, capability built in others, ethical quality, learning, and sustainable effort. Identify what remains valuable if the original target changes. Schedule periods with no optimisation objective and notice any urge to turn recovery into another performance measure. Ambition becomes more durable when identity has more than one source of meaning.",
    ),
  ],
  "information-processing": [
    block(
      "enfj-information-summary",
      "summary",
      "Patterns, Leverage, and Future Consequences",
      "An ENFJ pattern often attends to systems, trajectories, leverage points, and the future consequences of present choices. Information becomes useful when it clarifies what matters most, which constraints are structural, and where coordinated action can change the outcome. The person may move quickly from a broad pattern to an executable direction. This can create relational coherence, provided abstraction remains connected to operational facts, dissenting evidence, and the experience of people closest to implementation.",
    ),
    block(
      "enfj-information-analysis",
      "analysis",
      "Turning Abstraction Into a Plan",
      "The person may synthesise separate signals into a model of how the system works, then translate that model into priorities, sequencing, ownership, and measures. This movement from abstraction to action can be valuable when others see fragments but lack an organising frame. The danger is treating a compelling model as complete. Relational insight should generate testable assumptions, not immunity from correction, and the development plan should identify where reality can invalidate the theory.",
    ),
    block(
      "enfj-information-strength",
      "strength",
      "Finding the High-Leverage Question",
      "A strong expression can separate symptoms from causes and identify the question that changes several downstream decisions. Instead of optimising each problem independently, the ENFJ may redesign incentives, information flow, authority, or resource allocation. This systems perspective can prevent repeated local fixes. Its practical test is whether the proposed leverage point improves real outcomes without transferring hidden costs to another team, community, or future period.",
    ),
    block(
      "enfj-information-risk",
      "risk",
      "The Detail That Challenges the Strategy",
      "Once a direction feels coherent, operational detail may be dismissed as secondary or delegated before its relational significance is understood. Contradictory data can sound like narrow thinking, while implementation concerns may be labelled resistance. This creates risk when one exception reveals a faulty assumption, legal constraint, adoption barrier, or capacity limit. A strategy is not weakened by grounded evidence; it becomes credible when it can absorb and respond to it.",
    ),
    block(
      "enfj-information-guidance",
      "guidance",
      "Create a Contradiction Channel",
      "Before finalising a strategy, state the three assumptions on which it depends and assign someone to test each one. Invite operational experts to identify a detail that could change the direction, not merely improve delivery. Ask what evidence would make you revise or stop. Preserve a short decision record connecting the relational model to observed facts. This keeps challenge focused and prevents confidence, hierarchy, or speed from closing inquiry too early.",
    ),
  ],
  "decision-making": [
    block(
      "enfj-decisions-summary",
      "summary",
      "Objective Criteria and Decision Ownership",
      "ENFJs may prefer decisions based on explicit objectives, evidence, trade-offs, standards, and likely consequences. A clear choice can release relationships and prevent ambiguity from becoming passive delay. The person may also be willing to own an unpopular decision when the rationale is defensible. Care does not mean lack of emotion: emotional, cultural, and community information can be relevant evidence because it affects risk, adoption, trust, and the quality of implementation.",
    ),
    block(
      "enfj-decisions-analysis",
      "analysis",
      "Making Trade-Offs Visible",
      "The pattern often seeks the criterion that should govern the choice: relational value, cost, quality, risk, timing, or reversibility. Naming the criterion makes disagreement more productive because people can challenge assumptions rather than defend preferences indirectly. Mature decision ownership also identifies who bears the cost, what uncertainty remains, and when the choice will be reviewed. Clarity is strongest when it exposes trade-offs instead of presenting the conclusion as inevitable.",
    ),
    block(
      "enfj-decisions-strength",
      "strength",
      "Decisiveness Under Complexity",
      "When information is incomplete but action is necessary, an ENFJ may define the acceptable risk, choose a direction, and establish checkpoints for correction. This can prevent teams from confusing more discussion with better judgement. The strength is not certainty; it is accountable movement under uncertainty. It works best when the decision remains reversible where possible and when people know what new evidence will trigger adaptation.",
    ),
    block(
      "enfj-decisions-risk",
      "risk",
      "Efficiency Without Adoption",
      "A technically efficient option can fail if the people expected to implement it do not understand the reasoning, lack capability, or experience unaddressed consequences. The ENFJ may dismiss these responses as emotional resistance and communicate the conclusion before consultation has produced useful evidence. This confuses agreement with adoption and care with completeness. Human impact belongs in the decision model because ignored context eventually appears as delay, error, turnover, or loss of trust.",
    ),
    block(
      "enfj-decisions-guidance",
      "guidance",
      "A Four-Part Relational Decision Record",
      "For a consequential choice, record the shared purpose, people affected, competing values, and evidence that would justify review. Identify who participated and what changed because of their input, including dissent that remains unresolved. State which parts require coordination and which remain individually chosen. This preserves movement without turning harmony into assumed agreement or allowing relational comfort to hide a substantive trade-off.",
    ),
  ],
  "communication": [
    block(
      "enfj-communication-summary",
      "summary",
      "Direct, Concise, and Outcome-Oriented",
      "ENFJs may prefer communication that identifies the issue, decision, owner, and next step without unnecessary ambiguity. Directness can reduce confusion and make responsibility visible; it is not the same as aggression. Tone, timing, status, and culture still shape how a message is received. Effective communication pairs clarity with enough reasoning and listening for others to contribute information, challenge assumptions, and understand what is expected.",
    ),
    block(
      "enfj-communication-analysis",
      "analysis",
      "Conclusions Can Outrun Context",
      "Once the ENFJ has synthesised a problem, the conclusion may feel more obvious than it does to everyone else. Communication can therefore jump from observation to directive while omitting the reasoning, alternatives considered, and uncertainty that shaped the choice. Listeners may experience this as arbitrary or overly forceful even when the intent is efficiency. Providing a concise care chain increases both challenge quality and commitment to development.",
    ),
    block(
      "enfj-communication-risk",
      "risk",
      "Pace, Tone, and Unequal Air Time",
      "Fast processing and confidence can unintentionally narrow participation. The ENFJ may interrupt, answer the question before quieter contributors enter, or treat exploratory discussion as lack of preparation. Under pressure, direct language can become overly directive and disagreement may be framed as an development problem. The cost is not only relational: valuable local knowledge disappears when people expect that challenge will be rushed, publicly defeated, or ignored.",
    ),
    block(
      "enfj-communication-guidance",
      "guidance",
      "Name Purpose, Then Open Participation",
      "Use a compact sequence: shared context, purpose, current proposal, uncertainty, invitation. Explain what needs coordination and why, then ask what would make participation safer or more effective. In meetings, leave space before responding, invite someone who has not spoken without putting them on display, and summarise dissent fairly. For feedback, describe observable behaviour and consequence while leaving motive open to clarification.",
    ),
    block(
      "enfj-communication-reflection",
      "reflection",
      "Was Warmth Mistaken for Agreement?",
      "Review a recent group conversation. Did people have a clear way to disagree, decline, or ask for time, or did your enthusiasm make alignment feel socially expected? Ask what participants actually chose rather than whether the atmosphere felt positive. Notice where encouragement expanded contribution and where it reduced honest difference. Relational clarity makes belonging compatible with dissent.",
    ),
  ],
  "teamwork-and-leadership": [
    block(
      "enfj-teamwork-summary",
      "summary",
      "Direction, Accountability, and Capability",
      "ENFJs may contribute to teams by setting direction, clarifying ownership, coordinating dependencies, and maintaining attention on measurable outcomes. They can be comfortable initiating action and addressing performance gaps that others avoid. Leadership, however, is learned rather than guaranteed by type. Its quality depends on judgement, trust, ethics, listening, and the ability to develop capability in others—not on occupying the most visible position or making every decision personally.",
    ),
    block(
      "enfj-teamwork-analysis",
      "analysis",
      "Designing Accountability",
      "A useful ENFJ contribution is making the operating model explicit: what success means, who owns which outcome, where decisions sit, and how dependencies will be resolved. Clear accountability can reduce politics and duplicated effort. It should also give people sufficient authority, information, and relationships to fulfil their responsibilities. Accountability without agency becomes blame; agency without feedback becomes drift. Effective leadership designs both and revises the system when results reveal a structural problem.",
    ),
    block(
      "enfj-teamwork-strength",
      "strength",
      "Mobilising Complex Work",
      "The ENFJ may be effective at bringing specialists, relationships, timelines, and decisions into one coherent programme. By identifying critical paths and resolving competing demands, the person can help a team move from disconnected activity to shared development. The leadership strength is greatest when experts retain ownership of their craft and can challenge the coordinating view. Alignment should make contribution easier, not reduce every role to following instructions.",
    ),
    block(
      "enfj-teamwork-risk",
      "risk",
      "Delegation That Is Really Retained Overreach",
      "Delegation can fail when the outcome is assigned but every method, intermediate decision, and correction remains overreachled by the leader. The ENFJ may take work back at the first sign of delay because personal intervention appears faster. Over time, the team waits for approval, quieter contributors stop offering alternatives, and the leader becomes a bottleneck. The resulting overload can then seem to confirm the belief that nobody else is ready.",
    ),
    block(
      "enfj-teamwork-guidance",
      "guidance",
      "Delegate Outcomes and Build Judgement",
      "Define the result, constraints, decision rights, relationships, and review points, then allow the owner to choose the method. Ask what support would increase success before prescribing it. When work falls short, diagnose whether the cause is capability, clarity, capacity, motivation, or system design. Give feedback that strengthens future judgement. Leadership can be expressed through facilitation, expertise, coordination, or formal authority; directness need not become dominance.",
    ),
  ],
  "career-environment": [
    block(
      "enfj-career-summary",
      "summary",
      "Career Environments for Relational Responsibility",
      "An ENFJ may be energised by environments that combine autonomy, complexity, measurable responsibility, and the opportunity to improve a system. Work can feel meaningful when relational thinking connects to real decisions and implementation rather than remaining advisory or symbolic. Fit still depends on interests, qualifications, values, team culture, life stage, and the specific role. Personality preferences do not determine competence or prescribe a career.",
    ),
    block(
      "enfj-career-analysis",
      "analysis",
      "Conditions That Support Relational Contribution",
      "Helpful conditions may include a credible shared mission, collaborative colleagues, visible human impact, clear roles, and authority to improve participation or development. The ENFJ may value work that connects individual growth with collective outcomes. Constraint is not inherently demotivating when responsibilities and values are clear. Greater frustration is likely where care is performative, conflict is avoided, or emotional labour remains invisible and unbounded.",
    ),
    block(
      "enfj-career-example",
      "example",
      "Possible Fields, Not Prescriptions",
      "Examples can include education, coaching, organisational development, healthcare leadership, community programmes, communications, people operations, counselling-related fields with proper qualification, public service, facilitation, or mission-led management. Each field contains roles with very different cultures and demands. These are illustrations, not predictions. Fit depends on expertise, values, qualifications, workload, boundaries, colleagues, and the kind of human impact the person wants.",
    ),
    block(
      "enfj-career-risk",
      "risk",
      "Success That Requires Chronic Over-Overreach",
      "Risk rises in roles where authority and accountability are mismatched, weak systems require constant personal intervention, or urgency has become the permanent operating model. The ENFJ may respond by working longer, centralising decisions, and becoming indispensable to a dysfunctional process. Environments that reward only visible results can intensify achievement-based identity while hiding ethical, relational, or health costs. A demanding role is not automatically developmental if it prevents delegation, learning, and recovery.",
    ),
    block(
      "enfj-career-guidance",
      "guidance",
      "Career Decision Criteria",
      "Evaluate a role through evidence: What decisions can you make? Which outcomes are genuinely yours? How are strategy, development, community impact, and ethics measured? Can competent disagreement influence direction? Does the organisation develop people or rely on heroic individuals? What boundaries protect sustained performance? Compare job titles with actual authority, incentives, leadership behaviour, and resource conditions. Choose the environment, not just the apparent scale or status of the challenge.",
    ),
  ],
  "relationship-dynamics": [
    block(
      "enfj-relationships-summary",
      "summary",
      "Loyalty, Respect, and Shared Direction",
      "ENFJs may value loyalty, emotional responsiveness, mutual growth, direct communication, and the ability to make shared plans. Commitment may be expressed by taking another person's development seriously, protecting agreed priorities, and investing in collective wellbeing. This can create a strong partnership when responsibility is negotiated rather than assumed. Relationship style varies with culture, attachment, trust, and experience; a relational preference does not guarantee emotional accuracy or remove the need for reciprocal care.",
    ),
    block(
      "enfj-relationships-analysis",
      "analysis",
      "Respect Includes Independent Agency",
      "The ENFJ may approach partnership as two capable people coordinating priorities and solving difficulties openly. Shared direction can be stabilising, but respect also requires room for different pacing, emotional processes, and definitions of a good outcome. Another person's hesitation may contain information rather than weakness, and their choice need not be optimised to be legitimate. Closeness grows when influence is mutual and neither person becomes a project managed by the other.",
    ),
    block(
      "enfj-relationships-strength",
      "strength",
      "Direct Commitment and Problem Ownership",
      "A useful strength is willingness to name difficult issues, make concrete commitments, and work toward a shared future rather than relying on vague intention. The ENFJ may bring courage, planning, and practical problem-solving during uncertainty. Directness supports trust when it remains respectful and when emotional experience is heard before solutions are imposed. Sometimes the most responsible contribution is presence and understanding rather than immediate correction.",
    ),
    block(
      "enfj-relationships-risk",
      "risk",
      "Turning Connection Into Responsibility",
      "When discomfort appears, the ENFJ may move quickly to restore understanding, encourage disclosure, or organise a repair. Support can arrive before the other person has chosen it, and distance may be treated as a problem to solve. Under stress, warmth can become pressure and shared hopes can become expectations. The risk is allowing the wish for connection to override consent, timing, and another person's right to process differently.",
    ),
    block(
      "enfj-relationships-guidance",
      "guidance",
      "Ask Before Guiding",
      "When someone brings a difficulty, ask whether they want company, reflection, advice, advocacy, or practical action. Reflect the concern before connecting it to potential or purpose. For shared commitments, name what each person owns and what remains freely chosen. A relationship is not less caring because the other person declines help, changes slowly, or needs a form of support different from the one you naturally offer.",
    ),
  ],
  "change-and-adaptation": [
    block(
      "enfj-change-summary",
      "summary",
      "From Change Idea to Adoption",
      "ENFJs may be comfortable initiating change, challenging inefficient assumptions, and redesigning systems around a clearer future state. The person may quickly connect an idea to governance, relationships, sequencing, and measurable outcomes. The dynamic interpretation below can qualify this pattern when SN or JP preferences are balanced or lower-confidence. Effective change leadership includes adoption: the result is not complete when the plan is approved, but when people can use, sustain, and improve it.",
      [
        {
          id: "enfj-combination-change-flexibility",
          source: "combination",
          dimensions: ["SN", "JP"],
        },
      ],
    ),
    block(
      "enfj-change-analysis",
      "analysis",
      "Architecture and Momentum",
      "The ENFJ may define the case for change, target operating model, ownership, and implementation path with confidence. This can create momentum where a group has remained trapped in diffuse dissatisfaction. The plan becomes stronger when it distinguishes what must be decided centrally from what should be designed locally. Communitys who help shape implementation are more likely to surface constraints, build capability, and retain ownership after the initiating leader moves on.",
    ),
    block(
      "enfj-change-strength",
      "strength",
      "Moving Beyond the Status Quo",
      "A useful strength is willingness to question arrangements that persist mainly through habit, politics, or fragmented ownership. The person may frame an alternative future, align relationships, and make the decisions required to test it. This can reduce the hidden cost of prolonged indecision. Change becomes responsible when ambition is paired with staged evidence, explicit risk ownership, and attention to who gains, who carries the transition cost, and who needs new capability.",
    ),
    block(
      "enfj-change-risk",
      "risk",
      "Pace Without Adoption",
      "Once convinced, the ENFJ may treat further consultation as avoidable delay and assume that a strong rationale should produce immediate commitment. Timelines can reflect conceptual clarity rather than training, capacity, or behavioural change. Resistance may then be met with tighter overreach, which reduces honest reporting and reinforces dependence. Premature certainty also makes it harder to distinguish poor adoption from a flawed design. Speed matters, but only when the system can learn while moving.",
    ),
    block(
      "enfj-change-guidance",
      "guidance",
      "Design Change as Shared Development",
      "Define the collective purpose, people affected, participation choices, safeguards, and review points before scaling. Invite local owners to adapt the route and identify which groups may bear hidden emotional or practical costs. Track trust, capability, use, unintended effects, and dissent—not only visible enthusiasm. Ask what evidence would justify slowing, redesigning, or stopping so relational momentum remains accountable to lived experience.",
    ),
  ],
  "stress-and-recovery": [
    block(
      "enfj-stress-summary",
      "summary",
      "Stress Through Escalating Overreach",
      "Under sustained responsibility, an ENFJ may respond by increasing effort, centralising decisions, narrowing discussion, and pushing harder for closure. Visible productivity can continue while patience, listening, and recovery decline. Because competence is often part of the person's self-concept, slowing down may feel more threatening than continuing. Early recognition matters: behaviour changes under stress, and a more directive pattern is not the whole personality.",
    ),
    block(
      "enfj-stress-analysis",
      "analysis",
      "The Escalation Sequence",
      "A possible sequence is rising stakes, reduced delegation, longer working hours, impatience with explanation, and increasingly directive communication. The person may interpret every delay as evidence that closer supervision is required, while colleagues share less uncertainty because challenge feels costly. This creates a feedback loop: less information reaches the leader, judgement narrows, and more personal overreach appears necessary. Difficulty disengaging can continue after the immediate demand has passed.",
    ),
    block(
      "enfj-stress-evidence",
      "evidence",
      "Early Warning Signs to Track",
      "Useful signals may include interrupting more often, rewriting delegated work, treating questions as resistance, extending working hours without review, skipping recovery, becoming unusually contemptuous of slower contributors, or feeling that only personal supervision prevents failure. Physical tension, sleep disruption, and inability to enjoy unstructured time may also matter. Track change from the individual's normal pattern rather than assuming every ENFJ responds identically.",
    ),
    block(
      "enfj-stress-risk",
      "risk",
      "When Competence Blocks Recovery",
      "Rest may be postponed until every problem is resolved, even though leadership work continuously produces new problems. Recovery can then be judged as inefficient or deserved only after exceptional performance. Continuing in a narrowed state increases error, weakens emotional judgement, and teaches the system to depend on unsustainable effort. The person may also resist support because accepting it feels inconsistent with being capable, responsible, or in overreach.",
    ),
    block(
      "enfj-stress-guidance",
      "guidance",
      "Reduce Relational Load and Restore Privacy",
      "Identify which conversations genuinely require your presence and release responsibility for the rest. Establish a shutdown boundary, reduce social input, and restore physical needs before trying to improve anyone's experience. Tell a trusted person what support you need without converting the exchange into their development. This section supports reflection and planning; it is not medical advice or a substitute for qualified mental or physical healthcare.",
    ),
  ],
  "growth-roadmap": [
    block(
      "enfj-growth-summary",
      "summary",
      "Sustainable, Calibrated Leadership",
      "Growth for an ENFJ does not require becoming less warm, purposeful, or direct. It involves matching involvement to actual responsibility, transferring real ownership, listening for evidence that arrives through emotion or context, and separating support from control over another person's development. The dynamic slot below examines boundary risk as over-ownership and relational overreach. Development should expand available choices rather than impose a new ideal of leadership performance.",
      [
        {
          id: "enfj-combination-boundary-risk",
          source: "combination",
          dimensions: ["TF", "JP"],
        },
      ],
    ),
    block(
      "enfj-growth-analysis",
      "analysis",
      "From Personal Overreach to System Capability",
      "A useful shift is asking what the system needs instead of what you can personally force through. Sometimes decisive intervention is appropriate; at other times the durable answer is clearer authority, better information, stronger capability, or more time for adoption. The developmental task is diagnosis before overreach. This preserves accountability while reducing bottlenecks and allows leadership to be expressed through design, coaching, and judgement rather than constant intervention.",
    ),
    block(
      "enfj-growth-risk",
      "risk",
      "Development as Another Performance Target",
      "The ENFJ may turn reflection into a demanding improvement programme, measure every behaviour, and judge normal inconsistency as weak development. This reproduces the same over-overreach the plan is meant to reduce. Listening, emotional awareness, and recovery cannot be mastered through force or constant optimisation. Sustainable development chooses a small number of behaviours, gathers honest feedback, and treats discomfort, relapse, and ambiguity as information rather than evidence of failure.",
    ),
    block(
      "enfj-growth-guidance",
      "guidance",
      "Priority Development Practices",
      "Delegate one complete outcome with explicit decision rights. In consequential discussions, listen until you can state the strongest contrary view accurately. Add community adoption and human impact to decision criteria. Define where your responsibility ends and where another owner must decide. Protect recurring recovery that has no productivity measure. When urgency rises, ask whether tighter overreach addresses the actual risk or only reduces your discomfort with uncertainty.",
    ),
    block(
      "enfj-growth-action",
      "action",
      "Observable Growth Indicators",
      "Track invitations that received an honest no, responsibilities left with their rightful owner, decisions changed by quieter contributors, and conflicts addressed without rushing to harmony. Monitor recovery boundaries and commitments that no longer depend on your emotional labour. Include qualitative evidence: whether people bring disagreement earlier, define their own goals, and seek support by choice. Better relational leadership creates agency, not dependence on one central connector.",
    ),
  ],
  "ninety-day-action-plan": [
    block(
      "enfj-action-summary",
      "summary",
      "A Sustainable Leadership System",
      "This ninety-day programme turns the report into a bounded leadership experiment. It begins with evidence about workload and overreach, moves into delegation and communication practice, and finishes by establishing a more sustainable operating system. Select measures relevant to your role and current authority. The plan is a learning structure rather than another test of competence; reduce its scope if implementation begins to compete with recovery or essential responsibilities.",
    ),
    block(
      "enfj-action-days-1-30",
      "action",
      "Days 1–30: Leadership and Workload Audit",
      "Objective: establish evidence about responsibility, overreach, and decision quality. Actions: (1) map recurring leadership and development work with its true time cost; (2) mark each overreach point as required, inherited, or preference-based; (3) identify decisions that require consultation and name the missing voices; (4) record current measures for delivery, adoption, team capability, and recovery; (5) identify work owned personally because delegation feels slower. Success indicators: a complete responsibility map, three potential transfers, two consultation gaps, and baseline measures. Review questions: Where is my authority essential? Where have I become the system?",
    ),
    block(
      "enfj-action-days-31-60",
      "action",
      "Days 31–60: Delegation, Listening, and Adoption",
      "Objective: test leadership behaviours that distribute judgement and improve implementation. Actions: (1) delegate one complete outcome with decision rights and review points; (2) use the context-conclusion-reasoning-uncertainty sequence for major decisions; (3) ask a quieter community to speak before giving your view; (4) add an adoption measure to one initiative; (5) protect two weekly recovery boundaries. Success indicators: the delegated owner retains the method, one decision changes through consultation, adoption evidence is reviewed, and recovery boundaries occur in at least six weeks. Review questions: What became stronger when I did not overreach the method?",
    ),
    block(
      "enfj-action-days-61-90",
      "action",
      "Days 61–90: Build the Sustainable System",
      "Objective: convert useful experiments into a repeatable leadership system. Actions: (1) run one relational experiment with explicit assumptions and stop criteria; (2) maintain one delegated outcome without taking back development; (3) improve one team capability through coaching, documentation, or decision access; (4) formalise workload and recovery review points; (5) compare delivery, adoption, capability, and sustainability with the baseline. Success indicators: usable evidence from the experiment, independent ownership, one demonstrated capability gain, and a documented operating rhythm. Review questions: Which results improved because responsibility became more distributed?",
    ),
    block(
      "enfj-action-review",
      "reflection",
      "Day 90 Review",
      "Compare the final evidence with the first-month baseline. Review outcomes, adoption, delegated ownership, team capability, working hours, recovery, and the quality of challenge reaching you. Keep practices that improved judgement or reduced dependence on personal overreach. Stop any measure that encouraged performance theatre. Select one next-quarter focus: decision explanation, delegation depth, community ownership, relational testing, or recovery. Progress means a more capable and sustainable system, not perfect compliance with the programme.",
    ),
    block(
      "enfj-action-guidance",
      "guidance",
      "Adjust the Plan to Real Capacity",
      "Treat the phases as a sequence of experiments, not a performance target. If illness, workload, caregiving, or another major demand reduces capacity, keep one observation practice and postpone expansion. If delegation fails, diagnose clarity, authority, capability, capacity, and support before reclaiming the work. Avoid adding metrics that create more administrative overreach than learning. Sustainable ambition includes changing the plan when current evidence shows that its cost exceeds its value.",
    ),
  ],
  methodology: [
    block(
      "enfj-method-summary",
      "summary",
      "Interpretation Notes",
      "This V1 report combines an ENFJ type-level interpretation with dynamic dimension, confidence, and combination rules. The static content provides a coherent working hypothesis; generated slots qualify that hypothesis using the strength and balance of EI, SN, TF, and JP results. This structure preserves canonical section and block identifiers while allowing two people with the same four-letter result to receive meaningfully different emphasis.",
    ),
    block(
      "enfj-method-analysis",
      "analysis",
      "Preferences Are Not Fixed Abilities",
      "Personality preferences describe tendencies in attention, decision criteria, and approach; they do not establish competence, values, leadership quality, emotional capacity, or behaviour in every setting. An ENFJ result does not automatically mean someone is a good leader, aggressive, unemotional, or suited to a particular career. Behaviour changes with role, culture, experience, trust, stress, and learned skill. Low-confidence or balanced dimensions require especially cautious interpretation and greater reliance on lived evidence.",
    ),
    block(
      "enfj-method-guidance",
      "guidance",
      "Responsible Use and Limitations",
      "Treat this report as a working hypothesis for self-reflection, conversation, and development planning. It is not a clinical diagnosis and is not medical advice. It should not be used as the sole basis for hiring, medical, legal, educational, financial, relationship, or major life decisions. Responsible use compares the interpretation with observed behaviour, considers confidence and context, invites correction, and uses qualified guidance and relevant evidence where the stakes require it.",
    ),
    block(
      "enfj-method-version",
      "evidence",
      "Version Information",
      "Report version: 1.0.0. Content version: 1.0.0. Rule version: 1.0.0. These identifiers preserve traceability as type content, dynamic dimension care, and confidence handling evolve. A generated report should retain the report, content, and rule versions used at generation time so later updates do not silently change an earlier interpretation. Versioning supports comparison and audit; it does not imply clinical precision or permanent certainty.",
    ),
  ],
};

export const ENFJ_COMPLETE_REPORT:
  CompletePersonalityReportDefinition = {
    personalityType: "ENFJ",
    version: COMPLETE_PERSONALITY_REPORT_VERSION,
    title: { en: "ENFJ Complete Personality Report" },
    sections: COMPLETE_PERSONALITY_REPORT_STANDARD.map(
      (section) => ({
        ...section,
        title: { ...section.title },
        description: { ...section.description },
        contentBlocks: CONTENT_BY_SECTION[section.id] ?? [],
      }),
    ),
  };
