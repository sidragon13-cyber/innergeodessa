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
      "esfj-identity-summary",
      "summary",
      "Your Complete ESFJ Report",
      "This complete report expands the free ESFJ result into a contextual analysis of interpersonal direction, decision-making, coordination, relationships, work, stress, and development. It treats the type code as a working hypothesis about preferred ways of organising attention and action—not as a fixed identity, measure of ability, or guarantee of coordination skill. Use the sections that fit to sharpen self-observation, and treat mismatches as useful evidence about role, culture, experience, trust, stress, or balanced dimensions.",
    ),
  ],
  "personality-overview": [
    block(
      "esfj-overview-summary",
      "summary",
      "Practical Care and Community Coordination",
      "An ESFJ pattern often combines outward interpersonal attention, awareness of concrete needs, values-guided judgement, and organised community action. The person may notice who needs practical support, connect individual contribution with shared routines, and create enough structure for community members to participate reliably. These preferences can support community coordination, but they do not guarantee empathy, consent, or effectiveness. Listening, boundaries, expertise, ethics, and culture determine how the pattern is expressed.",
    ),
  ],
  "dimension-results": [
    block(
      "esfj-dimensions-context",
      "analysis",
      "Reading the Four Dimensions",
      "An ESFJ result combines preferences across EI, SN, TF, and JP, but the four letters do not all carry equal weight for every person. Confidence and balance can substantially change the visible pattern: a balanced EI result may look less outwardly forceful, a lower-confidence TF result may place more visible emphasis on relationships, and a flexible JP result may resist rigid closure. The dynamic interpretations below qualify the type-level shared understanding. Read low-confidence or balanced dimensions cautiously and compare them with behaviour across role, culture, trust, experience, and stress.",
      [
        {
          id: "esfj-ei-strength",
          source: "dimension",
          dimensions: ["EI"],
        },
        {
          id: "esfj-sn-boundary",
          source: "dimension",
          dimensions: ["SN"],
        },
        {
          id: "esfj-tf-boundary",
          source: "dimension",
          dimensions: ["TF"],
        },
        {
          id: "esfj-jp-boundary",
          source: "dimension",
          dimensions: ["JP"],
        },
        {
          id: "esfj-overall-confidence",
          source: "confidence",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
  ],
  "key-strengths": [
    block(
      "esfj-strengths-bridge",
      "summary",
      "Strengths in Context",
      "Likely ESFJ strengths include building trust, articulating shared contribution, recognising practical readiness, coordinating practical participation, and sustaining collective movement through change. The pattern may be useful when a community needs both human connection and clear direction. These are preferences, not automatic abilities. Their value depends on listening, credibility, cultural humility, boundaries, and willingness to let other community members define their own goals. Later sections distinguish encouragement from pressure and care from over-responsibility.",
    ),
  ],
  "growth-risks": [
    block(
      "esfj-risks-bridge",
      "guidance",
      "Growth Through Calibrated Coordination",
      "Development may involve asking before helping, tolerating disagreement without treating it as interpersonal failure, delegating ownership instead of carrying the community's emotional climate, and making room for quiet or less expressive practical participation. Other risks include overwork, indirect resentment, and identifying worth with being needed or appreciated. These are not fixed flaws. The following sections convert them into observable signals and practices that preserve warmth and shared contribution while improving consent, boundaries, and sustainability.",
    ),
  ],
  "core-personality-pattern": [
    block(
      "esfj-core-summary",
      "summary",
      "Practical Care and Shared Reliability",
      "An ESFJ pattern often links awareness of immediate community needs with a clear picture of how community members can contribute together. The person may translate care into useful information, dependable routines, welcoming agreements, and coordinated action. Effective use makes support visible while preserving consent, difference, and local ownership. The retained dynamic slots below examine that interaction and qualify it when dimensions are balanced or confidence is low.",
      [
        {
          id: "esfj-combination-care-structure",
          source: "combination",
          dimensions: ["SN", "TF", "JP"],
        },
        {
          id: "esfj-balanced-dimensions",
          source: "confidence",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
    block(
      "esfj-core-analysis",
      "analysis",
      "Turning Care Into Practical Coordination",
      "The central pattern is not simply being helpful; it is organising concrete conditions that let community members participate and commitments hold. An ESFJ may notice an unmet need, clarify who can contribute, establish a routine, and check whether support is actually useful. This can reduce social ambiguity and connect separate efforts into dependable community practice. Its effectiveness increases when recipients can decline, local knowledge changes the plan, and responsibility does not silently concentrate in one person.",
    ),
    block(
      "esfj-core-strength",
      "strength",
      "Coordinating Belonging and Contribution",
      "A developed ESFJ expression can hold a shared contribution while helping different community members understand how their contributions connect. The person may translate between perspectives, surface interpersonal constraints, and create agreements that let specialists participate without losing collective direction. This is strongest when coordination expands voice and local ownership rather than making the community dependent on one source of encouragement or interpretation.",
    ),
    block(
      "esfj-core-risk",
      "risk",
      "When Practical Care Becomes Social Pressure",
      "Attention to shared needs can become pressure when the ESFJ assumes that established support, participation, or agreement is best for everyone. A person who declines may be read as ungrateful or disengaged, and a familiar routine may continue after needs have changed. Care remains practical when preferences are checked directly, opting out is safe, and continuity is revised according to current experience rather than social expectation.",
    ),
    block(
      "esfj-core-reflection",
      "reflection",
      "Is Support Building Agency?",
      "Review one person or community you currently support closely. Is your involvement requested and useful, or has anticipating needs become the default because uncertainty feels uncomfortable? What question, boundary, or transfer of ownership would let others define their next step? Ask whose voice is quiet and whether your encouragement leaves real room to decline. The aim is care that strengthens agency rather than care that becomes necessary for movement.",
    ),
  ],
  "motivation-and-needs": [
    block(
      "esfj-motivation-summary",
      "summary",
      "Progress, Impact, and Responsibility",
      "ESFJs may feel energised by practical, meaningful progress, reciprocal relationships, and responsibility for outcomes that matter to a community. Motivation often increases when people know what support they can rely on and how their contribution fits a shared commitment. Maintaining a dependable routine may be as satisfying as achieving the immediate result because it creates continuity and trust. These preferences can appear differently across roles and cultures; not every ESFJ seeks formal status, competition, or public coordination.",
    ),
    block(
      "esfj-motivation-analysis",
      "analysis",
      "Connection With Practical Meaningful Contribution",
      "ESFJ motivation may rise when relationships, contribution, and visible development reinforce one another. The person often wants enough influence to improve how community members work together and enough feedback to know that effort helps. Frustration can rise when responsibility for cohesion is implied but authority and boundaries remain unclear. A healthy environment pairs shared contribution with reciprocal care, explicit ownership, honest disagreement, and recognition that does not depend on constant availability.",
    ),
    block(
      "esfj-motivation-strength",
      "strength",
      "Building What Can Scale",
      "A useful strength is the willingness to invest beyond the immediate task by strengthening a routine, remembering commitments, and helping people develop the capability required for future needs. The ESFJ may tolerate complexity when it protects a significant shared result and can sustain effort through setbacks when progress remains visible. This becomes more valuable when measures include service quality, participation, owner confidence, and long-term workload—not only speed, output, or appreciation.",
    ),
    block(
      "esfj-motivation-risk",
      "risk",
      "Being Needed as Identity",
      "Usefulness, appreciation, and interpersonal influence can become too closely tied to self-worth. Another person's independence, disagreement, or preference for space may then feel like rejection rather than ordinary agency. This can produce overwork, unsolicited support, or difficulty naming personal needs. The risk is not generosity; it is losing access to rest, mutuality, and shared values that remain meaningful when no one currently needs guidance.",
    ),
    block(
      "esfj-motivation-guidance",
      "guidance",
      "Make Care Visible and Shared",
      "For one recurring community or team responsibility, list the practical need, agreed service standard, current contributors, and work that remains invisible. Ask recipients which support is useful rather than assuming continuity means satisfaction. Assign ownership and a review date for each recurring task, including one responsibility you usually absorb. Care becomes sustainable when people can rely on the arrangement without relying on one person's unspoken memory and availability.",
    ),
  ],
  "information-processing": [
    block(
      "esfj-information-summary",
      "summary",
      "Patterns, Leverage, and Upcoming Needs Consequences",
      "An ESFJ pattern often attends to systems, trajectories, leverage points, and the upcoming needs consequences of present choices. Information becomes useful when it clarifies what matters most, which constraints are structural, and where coordinated action can change the outcome. The person may move quickly from a broad pattern to an executable direction. This can create interpersonal coherence, provided abstraction remains connected to operational facts, dissenting evidence, and the experience of community members closest to implementation.",
    ),
    block(
      "esfj-information-analysis",
      "analysis",
      "Turning Conceptualion Into a Plan",
      "The person may synthesise separate signals into a model of how the system works, then translate that model into priorities, sequencing, ownership, and measures. This movement from abstraction to action can be valuable when others see fragments but lack an organising frame. The danger is treating a compelling model as complete. Interpersonal insight should generate testable assumptions, not immunity from correction, and the development plan should identify where reality can invalidate the theory.",
    ),
    block(
      "esfj-information-strength",
      "strength",
      "Finding the High-Leverage Question",
      "A strong expression can separate symptoms from causes and identify the question that changes several downstream decisions. Instead of optimising each problem independently, the ESFJ may redesign incentives, information flow, authority, or resource allocation. This systems perspective can prevent repeated local fixes. Its practical test is whether the proposed leverage point improves real outcomes without transferring hidden costs to another team, community, or upcoming needs period.",
    ),
    block(
      "esfj-information-risk",
      "risk",
      "The Detail That Challenges the Strategy",
      "Once a direction feels coherent, operational detail may be dismissed as secondary or delegated before its interpersonal significance is understood. Contradictory data can sound like narrow thinking, while implementation concerns may be labelled resistance. This creates risk when one exception reveals a faulty assumption, legal constraint, adoption barrier, or capacity limit. A strategy is not weakened by grounded evidence; it becomes credible when it can absorb and respond to it.",
    ),
    block(
      "esfj-information-guidance",
      "guidance",
      "Create a Contradiction Channel",
      "Before finalising a strategy, state the three assumptions on which it depends and assign someone to test each one. Invite operational experts to identify a detail that could change the direction, not merely improve delivery. Ask what evidence would make you revise or stop. Preserve a short decision record connecting the interpersonal model to observed facts. This keeps challenge focused and prevents confidence, hierarchy, or speed from closing inquiry too early.",
    ),
  ],
  "decision-making": [
    block(
      "esfj-decisions-summary",
      "summary",
      "Objective Criteria and Decision Ownership",
      "ESFJs may prefer decisions based on explicit objectives, evidence, trade-offs, standards, and likely consequences. A clear choice can release relationships and prevent ambiguity from becoming passive delay. The person may also be willing to own an unpopular decision when the rationale is defensible. Care does not mean lack of emotion: emotional, cultural, and community information can be relevant evidence because it affects risk, adoption, trust, and the quality of implementation.",
    ),
    block(
      "esfj-decisions-analysis",
      "analysis",
      "Making Trade-Offs Visible",
      "The pattern often seeks the criterion that should govern the choice: interpersonal value, cost, quality, risk, timing, or reversibility. Naming the criterion makes disagreement more productive because community members can challenge assumptions rather than defend preferences indirectly. Mature decision ownership also identifies who bears the cost, what uncertainty remains, and when the choice will be reviewed. Clarity is strongest when it exposes trade-offs instead of presenting the conclusion as inevitable.",
    ),
    block(
      "esfj-decisions-strength",
      "strength",
      "Decisiveness Under Complexity",
      "When information is incomplete but action is necessary, an ESFJ may define the acceptable risk, choose a direction, and establish checkpoints for correction. This can prevent teams from confusing more discussion with better judgement. The strength is not certainty; it is accountable movement under uncertainty. It works best when the decision remains reversible where possible and when community members know what new evidence will trigger adaptation.",
    ),
    block(
      "esfj-decisions-risk",
      "risk",
      "Efficiency Without Adoption",
      "A technically efficient option can fail if the community members expected to implement it do not understand the reasoning, lack capability, or experience unaddressed consequences. The ESFJ may dismiss these responses as emotional resistance and communicate the conclusion before consultation has produced useful evidence. This confuses agreement with adoption and care with completeness. Human impact belongs in the decision model because ignored context eventually appears as delay, error, turnover, or loss of trust.",
    ),
    block(
      "esfj-decisions-guidance",
      "guidance",
      "A Four-Part Interpersonal Decision Record",
      "For a consequential choice, record the shared contribution, community members affected, competing shared values, and evidence that would justify review. Identify who participated and what changed because of their input, including dissent that remains unresolved. State which parts require coordination and which remain individually chosen. This preserves movement without turning harmony into assumed agreement or allowing interpersonal comfort to hide a substantive trade-off.",
    ),
  ],
  "communication": [
    block(
      "esfj-communication-summary",
      "summary",
      "Direct, Concise, and Outcome-Oriented",
      "ESFJs may prefer communication that identifies the issue, decision, owner, and next step without unnecessary ambiguity. Directness can reduce confusion and make responsibility visible; it is not the same as aggression. Tone, timing, status, and culture still shape how a message is received. Effective communication pairs clarity with enough reasoning and listening for others to contribute information, challenge assumptions, and understand what is expected.",
    ),
    block(
      "esfj-communication-analysis",
      "analysis",
      "Conclusions Can Outrun Context",
      "Once the ESFJ has synthesised a problem, the conclusion may feel more obvious than it does to everyone else. Communication can therefore jump from observation to directive while omitting the reasoning, alternatives considered, and uncertainty that shaped the choice. Listeners may experience this as arbitrary or overly forceful even when the intent is efficiency. Providing a concise care chain increases both challenge quality and commitment to development.",
    ),
    block(
      "esfj-communication-risk",
      "risk",
      "Pace, Tone, and Unequal Air Time",
      "Fast processing and confidence can unintentionally narrow practical participation. The ESFJ may interrupt, answer the question before quieter contributors enter, or treat exploratory discussion as lack of preparation. Under pressure, direct language can become overly directive and disagreement may be framed as an development problem. The cost is not only interpersonal: valuable local knowledge disappears when community members expect that challenge will be rushed, publicly defeated, or ignored.",
    ),
    block(
      "esfj-communication-guidance",
      "guidance",
      "Name Contribution, Then Open Practical Participation",
      "Use a compact sequence: shared context, contribution, current proposal, uncertainty, invitation. Explain what needs coordination and why, then ask what would make practical participation safer or more effective. In meetings, leave space before responding, invite someone who has not spoken without putting them on display, and summarise dissent fairly. For feedback, describe observable behaviour and consequence while leaving motive open to clarification.",
    ),
    block(
      "esfj-communication-reflection",
      "reflection",
      "Was Warmth Mistaken for Agreement?",
      "Review a recent community conversation. Did community members have a clear way to disagree, decline, or ask for time, or did your enthusiasm make alignment feel socially expected? Ask what participants actually chose rather than whether the atmosphere felt positive. Notice where encouragement expanded contribution and where it reduced honest difference. Interpersonal clarity makes belonging compatible with dissent.",
    ),
  ],
  "teamwork-and-leadership": [
    block(
      "esfj-teamwork-summary",
      "summary",
      "Direction, Accountability, and Capability",
      "ESFJs may contribute to teams by welcoming participation, clarifying practical roles, coordinating shared routines, and noticing when someone lacks information or support. They can be comfortable initiating contact and maintaining commitments that might otherwise be overlooked. Community coordination, however, is learned rather than guaranteed by type. Its quality depends on judgement, consent, cultural awareness, and the ability to share ownership—not on becoming responsible for every person or task.",
    ),
    block(
      "esfj-teamwork-analysis",
      "analysis",
      "Designing Accountability",
      "A useful ESFJ contribution is making the operating model explicit: what success means, who owns which outcome, where decisions sit, and how dependencies will be resolved. Clear accountability can reduce politics and duplicated effort. It should also give community members sufficient authority, information, and relationships to fulfil their responsibilities. Accountability without agency becomes blame; agency without feedback becomes drift. Effective coordination designs both and revises the system when results reveal a structural problem.",
    ),
    block(
      "esfj-teamwork-strength",
      "strength",
      "Mobilising Complex Work",
      "The ESFJ may be effective at bringing specialists, relationships, timelines, and decisions into one coherent programme. By identifying critical paths and resolving competing demands, the person can help a team move from disconnected activity to shared development. The coordination strength is greatest when experts retain ownership of their craft and can challenge the coordinating view. Alignment should make contribution easier, not reduce every role to following instructions.",
    ),
    block(
      "esfj-teamwork-risk",
      "risk",
      "Coordination That Keeps Invisible Ownership",
      "A task may appear delegated while the ESFJ still remembers every detail, prompts each handoff, repairs missed steps, and protects others from consequences. The group receives help but does not gain reliable ownership, while the coordinator becomes overloaded. Make the task, standard, owner, and follow-up date visible to everyone; then let the owner notice and resolve ordinary gaps before stepping in.",
    ),
    block(
      "esfj-teamwork-guidance",
      "guidance",
      "Delegate Outcomes and Build Judgement",
      "Define the practical need, available resources, decision rights, and review points, then let the owner choose the method. Ask what support would be useful before providing it. When a commitment slips, explore clarity, capacity, confidence, competing duties, and the surrounding routine before taking over. Give feedback that strengthens independent judgement. Coordination can be expressed through hospitality, facilitation, dependable follow-up, or formal authority; care need not become control.",
    ),
  ],
  "career-environment": [
    block(
      "esfj-career-summary",
      "summary",
      "Career Environments for Interpersonal Responsibility",
      "An ESFJ may be energised by environments that combine dependable relationships, practical responsibility, visible contribution, and the opportunity to improve how people receive support. Work can feel meaningful when interpersonal awareness connects to real coordination and follow-through rather than remaining advisory or symbolic. Fit still depends on interests, qualifications, values, team culture, life stage, and the specific role. Personality preferences do not determine competence or prescribe a career.",
    ),
    block(
      "esfj-career-analysis",
      "analysis",
      "Conditions That Support Interpersonal Contribution",
      "Helpful conditions may include a credible shared mission, collaborative colleagues, visible human impact, clear roles, and authority to improve practical participation or development. The ESFJ may value work that connects individual growth with collective outcomes. Constraint is not inherently demotivating when responsibilities and shared values are clear. Greater frustration is likely where care is performative, conflict is avoided, or emotional labour remains invisible and unbounded.",
    ),
    block(
      "esfj-career-example",
      "example",
      "Possible Fields, Not Prescriptions",
      "Examples can include education, coaching, organisational development, healthcare coordination, community programmes, communications, community members operations, counselling-related fields with proper qualification, public service, facilitation, or mission-led management. Each field contains roles with very different cultures and demands. These are illustrations, not predictions. Fit depends on expertise, shared values, qualifications, workload, boundaries, colleagues, and the kind of human impact the person wants.",
    ),
    block(
      "esfj-career-risk",
      "risk",
      "Success That Requires Chronic Over-Overreach",
      "Risk rises in roles where authority and accountability are mismatched, weak systems require constant personal intervention, or urgency has become the permanent operating model. The ESFJ may respond by working longer, centralising decisions, and becoming indispensable to a dysfunctional process. Environments that reward only visible results can intensify achievement-based identity while hiding ethical, interpersonal, or health costs. A demanding role is not automatically practical if it prevents delegation, learning, and recovery.",
    ),
    block(
      "esfj-career-guidance",
      "guidance",
      "Career Decision Criteria",
      "Evaluate a role through evidence: What decisions can you make? Which outcomes are genuinely yours? How are strategy, development, community impact, and ethics measured? Can competent disagreement influence direction? Does the organisation develop community members or rely on heroic individuals? What boundaries protect sustained performance? Compare job titles with actual authority, incentives, coordination behaviour, and resource conditions. Choose the environment, not just the apparent scale or status of the challenge.",
    ),
  ],
  "relationship-dynamics": [
    block(
      "esfj-relationships-summary",
      "summary",
      "Loyalty, Respect, and Shared Direction",
      "ESFJs may value loyalty, emotional responsiveness, mutual growth, direct communication, and the ability to make shared plans. Commitment may be expressed by taking another person's development seriously, protecting agreed priorities, and investing in collective wellbeing. This can create a strong partnership when responsibility is negotiated rather than assumed. Relationship style varies with culture, attachment, trust, and experience; an interpersonal preference does not guarantee emotional accuracy or remove the need for reciprocal care.",
    ),
    block(
      "esfj-relationships-analysis",
      "analysis",
      "Respect Includes Independent Agency",
      "The ESFJ may approach partnership as two capable community members coordinating priorities and solving difficulties openly. Shared direction can be stabilising, but respect also requires room for different pacing, emotional processes, and definitions of a good outcome. Another person's hesitation may contain information rather than weakness, and their choice need not be optimised to be legitimate. Closeness grows when influence is mutual and neither person becomes a project managed by the other.",
    ),
    block(
      "esfj-relationships-strength",
      "strength",
      "Direct Commitment and Problem Ownership",
      "A useful strength is willingness to name difficult issues, make concrete commitments, and work toward a shared upcoming needs rather than relying on vague intention. The ESFJ may bring courage, planning, and practical problem-solving during uncertainty. Directness supports trust when it remains respectful and when emotional experience is heard before solutions are imposed. Sometimes the most responsible contribution is presence and understanding rather than immediate correction.",
    ),
    block(
      "esfj-relationships-risk",
      "risk",
      "Turning Connection Into Responsibility",
      "When discomfort appears, the ESFJ may move quickly to restore understanding, encourage disclosure, or organise a repair. Support can arrive before the other person has chosen it, and distance may be treated as a problem to solve. Under stress, warmth can become pressure and shared hopes can become expectations. The risk is allowing the wish for connection to override consent, timing, and another person's right to process differently.",
    ),
    block(
      "esfj-relationships-guidance",
      "guidance",
      "Ask Before Guiding",
      "When someone brings a difficulty, ask whether they want company, reflection, advice, advocacy, or practical action. Reflect the concern before connecting it to readiness or contribution. For shared commitments, name what each person owns and what remains freely chosen. A relationship is not less caring because the other person declines help, changes slowly, or needs a form of support different from the one you naturally offer.",
    ),
  ],
  "change-and-adaptation": [
    block(
      "esfj-change-summary",
      "summary",
      "From Change Idea to Adoption",
      "ESFJs may be comfortable initiating change, challenging inefficient assumptions, and redesigning systems around a clearer upcoming needs state. The person may quickly connect an idea to governance, relationships, sequencing, and measurable outcomes. The dynamic interpretation below can qualify this pattern when SN or JP preferences are balanced or lower-confidence. Effective change coordination includes adoption: the result is not complete when the plan is approved, but when community members can use, sustain, and improve it.",
      [
        {
          id: "esfj-combination-change-flexibility",
          source: "combination",
          dimensions: ["SN", "JP"],
        },
      ],
    ),
    block(
      "esfj-change-analysis",
      "analysis",
      "Architecture and Momentum",
      "The ESFJ may define the case for change, target operating model, ownership, and implementation path with confidence. This can create momentum where a community has remained trapped in diffuse dissatisfaction. The plan becomes stronger when it distinguishes what must be decided centrally from what should be designed locally. Communitys who help shape implementation are more likely to surface constraints, build capability, and retain ownership after the initiating leader moves on.",
    ),
    block(
      "esfj-change-strength",
      "strength",
      "Moving Beyond the Status Quo",
      "A useful strength is willingness to question arrangements that persist mainly through habit, politics, or fragmented ownership. The person may frame an alternative upcoming needs, align relationships, and make the decisions required to test it. This can reduce the hidden cost of prolonged indecision. Change becomes responsible when ambition is paired with staged evidence, explicit risk ownership, and attention to who gains, who carries the transition cost, and who needs new capability.",
    ),
    block(
      "esfj-change-risk",
      "risk",
      "Pace Without Adoption",
      "Once convinced, the ESFJ may treat further consultation as avoidable delay and assume that a strong rationale should produce immediate commitment. Timelines can reflect conceptual clarity rather than training, capacity, or behavioural change. Resistance may then be met with tighter overreach, which reduces honest reporting and reinforces dependence. Premature certainty also makes it harder to distinguish poor adoption from a flawed design. Speed matters, but only when the system can learn while moving.",
    ),
    block(
      "esfj-change-guidance",
      "guidance",
      "Design Change as Shared Development",
      "Define the collective contribution, community members affected, practical participation choices, safeguards, and review points before scaling. Invite local owners to adapt the route and identify which communities may bear hidden emotional or practical costs. Track trust, capability, use, unintended effects, and dissent—not only visible enthusiasm. Ask what evidence would justify slowing, redesigning, or stopping so interpersonal momentum remains accountable to lived experience.",
    ),
  ],
  "stress-and-recovery": [
    block(
      "esfj-stress-summary",
      "summary",
      "Stress Through Escalating Overreach",
      "Under sustained responsibility, an ESFJ may respond by increasing effort, centralising decisions, narrowing discussion, and pushing harder for closure. Visible productivity can continue while patience, listening, and recovery decline. Because competence is often part of the person's self-concept, slowing down may feel more threatening than continuing. Early recognition matters: behaviour changes under stress, and a more directive pattern is not the whole personality.",
    ),
    block(
      "esfj-stress-analysis",
      "analysis",
      "When Care Expands Into Constant Monitoring",
      "A possible sequence is rising need, more checking, longer availability, irritation when help is declined, and increasing responsibility for the community's mood. Others may share less difficulty because they do not want to create more work or invite intervention. This produces a loop: useful information becomes less visible, the ESFJ anticipates more, and personal involvement seems increasingly necessary. The sense of duty can continue after the immediate need has passed.",
    ),
    block(
      "esfj-stress-evidence",
      "evidence",
      "Early Warning Signs to Track",
      "Useful signals may include interrupting more often, rewriting delegated work, treating questions as resistance, extending working hours without review, skipping recovery, becoming unusually contemptuous of slower contributors, or feeling that only personal supervision prevents failure. Physical tension, sleep disruption, and inability to enjoy unstructured time may also matter. Track change from the individual's normal pattern rather than assuming every ESFJ responds identically.",
    ),
    block(
      "esfj-stress-risk",
      "risk",
      "When Competence Blocks Recovery",
      "Rest may be postponed until every problem is resolved, even though coordination work continuously produces new problems. Recovery can then be judged as inefficient or deserved only after exceptional performance. Continuing in a narrowed state increases error, weakens emotional judgement, and teaches the system to depend on unsustainable effort. The person may also resist support because accepting it feels inconsistent with being capable, responsible, or in overreach.",
    ),
    block(
      "esfj-stress-guidance",
      "guidance",
      "Restore Capacity Before Offering More",
      "Identify which practical commitments genuinely require your presence and release responsibility for the rest. Establish an availability boundary, reduce social demands, and restore sleep, food, movement, or quiet before organising another person's experience. Tell a trusted person what support you need without immediately returning to the helper role. This section supports reflection and planning; it is not medical advice or a substitute for qualified mental or physical healthcare.",
    ),
  ],
  "growth-roadmap": [
    block(
      "esfj-growth-summary",
      "summary",
      "Sustainable, Calibrated Coordination",
      "Growth for an ESFJ does not require becoming less warm, contributionful, or direct. It involves matching involvement to actual responsibility, transferring real ownership, listening for evidence that arrives through emotion or context, and separating support from control over another person's development. The dynamic slot below examines boundary risk as over-ownership and interpersonal overreach. Development should expand available choices rather than impose a new ideal of coordination performance.",
      [
        {
          id: "esfj-combination-boundary-risk",
          source: "combination",
          dimensions: ["TF", "JP"],
        },
      ],
    ),
    block(
      "esfj-growth-analysis",
      "analysis",
      "From Personal Overreach to System Capability",
      "A useful shift is asking what the system needs instead of what you can personally force through. Sometimes decisive intervention is appropriate; at other times the durable answer is clearer authority, better information, stronger capability, or more time for adoption. The practical task is diagnosis before overreach. This preserves accountability while reducing bottlenecks and allows coordination to be expressed through design, coaching, and judgement rather than constant intervention.",
    ),
    block(
      "esfj-growth-risk",
      "risk",
      "Development as Another Performance Target",
      "The ESFJ may turn reflection into a demanding improvement programme, measure every behaviour, and judge normal inconsistency as weak development. This reproduces the same over-overreach the plan is meant to reduce. Listening, emotional awareness, and recovery cannot be mastered through force or constant optimisation. Sustainable development chooses a small number of behaviours, gathers honest feedback, and treats discomfort, relapse, and ambiguity as information rather than evidence of failure.",
    ),
    block(
      "esfj-growth-guidance",
      "guidance",
      "Priority Practices for Mutual Support",
      "Transfer one recurring community responsibility with clear authority and no hidden checking. In consequential discussions, listen until you can state the strongest contrary view accurately. Add recipient choice and practical usefulness to decision criteria. Define where your care ends and another person's ownership begins. Protect recovery that is not measured by usefulness. When urgency rises, ask whether more involvement addresses a real need or mainly reduces discomfort with uncertainty.",
    ),
    block(
      "esfj-growth-action",
      "action",
      "Observable Growth Indicators",
      "Track invitations that received an honest no, responsibilities left with their rightful owner, decisions changed by quieter contributors, and conflicts addressed without rushing to harmony. Monitor recovery boundaries and commitments that no longer depend on your emotional labour. Include qualitative evidence: whether community members bring disagreement earlier, define their own goals, and seek support by choice. Better community coordination creates agency, not dependence on one central connector.",
    ),
  ],
  "ninety-day-action-plan": [
    block(
      "esfj-action-summary",
      "summary",
      "A Sustainable Coordination System",
      "This ninety-day programme turns the report into a bounded coordination experiment. It begins with evidence about workload and overreach, moves into delegation and communication practice, and finishes by establishing a more sustainable operating system. Select measures relevant to your role and current authority. The plan is a learning structure rather than another test of competence; reduce its scope if implementation begins to compete with recovery or essential responsibilities.",
    ),
    block(
      "esfj-action-days-1-30",
      "action",
      "Days 1–30: Make Invisible Care Visible",
      "Objective: identify recurring practical and relational work that depends on your memory or availability. Actions: (1) list weekly coordination, support, and follow-up tasks with their time cost; (2) ask recipients which support remains useful; (3) identify two tasks with unclear ownership; (4) note where declining participation feels socially difficult; (5) establish a recovery baseline. Success indicators: a shared responsibility map, two current-need corrections, two ownership gaps, and one boundary communicated before overload.",
    ),
    block(
      "esfj-action-days-31-60",
      "action",
      "Days 31–60: Share Coordination Explicitly",
      "Objective: replace informal rescue with visible, distributed responsibility. Actions: (1) assign one recurring task with a clear owner, standard, and review date; (2) let the owner handle ordinary reminders and corrections; (3) ask one quieter participant what makes contribution easier; (4) remove one expectation that no longer serves a current need; (5) protect two weekly recovery boundaries. Success indicators: the task continues without private prompting, one routine changes through direct feedback, and boundaries hold for at least six weeks.",
    ),
    block(
      "esfj-action-days-61-90",
      "action",
      "Days 61–90: Sustain a Shared Care System",
      "Objective: make useful support reliable without making yourself its permanent centre. Actions: (1) document the current responsibilities and exception contacts; (2) rotate one coordination role or train a second owner; (3) schedule a monthly needs-and-workload review; (4) close one task that persists only through habit; (5) compare continuity, participation, owner confidence, and recovery with the baseline. Success indicators: shared ownership, safe opt-out, one retired obligation, and stable support during your absence.",
    ),
    block(
      "esfj-action-review",
      "reflection",
      "Day 90 Review",
      "Compare the final evidence with the first-month baseline. Review outcomes, adoption, delegated ownership, team capability, working hours, recovery, and the quality of challenge reaching you. Keep practices that improved judgement or reduced dependence on personal overreach. Stop any measure that encouraged performance theatre. Select one next-quarter focus: decision explanation, delegation depth, community ownership, interpersonal testing, or recovery. Progress means a more capable and sustainable system, not perfect compliance with the programme.",
    ),
    block(
      "esfj-action-guidance",
      "guidance",
      "Fit the Plan to Available Care Capacity",
      "Treat the phases as practical trials, not a test of generosity. If illness, workload, caregiving, or another major demand reduces capacity, keep one observation practice and postpone expansion. If shared responsibility breaks down, review clarity, consent, capability, time, and support before taking everything back. Avoid tracking that creates more coordination work than learning. Sustainable contribution includes changing the plan when its practical or relational cost exceeds its value.",
    ),
  ],
  methodology: [
    block(
      "esfj-method-summary",
      "summary",
      "Interpretation Notes",
      "This V1 report combines an ESFJ type-level interpretation with dynamic dimension, confidence, and combination rules. The static content provides a coherent working hypothesis; generated slots qualify that hypothesis using the strength and balance of EI, SN, TF, and JP results. This structure preserves canonical section and block identifiers while allowing two people with the same four-letter result to receive meaningfully different emphasis.",
    ),
    block(
      "esfj-method-analysis",
      "analysis",
      "Preferences Are Not Fixed Abilities",
      "Personality preferences describe tendencies in attention, decision criteria, and approach; they do not establish competence, shared values, coordination quality, emotional capacity, or behaviour in every setting. An ESFJ result does not automatically mean someone is a good leader, aggressive, unemotional, or suited to a particular career. Behaviour changes with role, culture, experience, trust, stress, and learned skill. Low-confidence or balanced dimensions require especially cautious interpretation and greater reliance on lived evidence.",
    ),
    block(
      "esfj-method-guidance",
      "guidance",
      "Responsible Use and Limitations",
      "Treat this report as a working hypothesis for self-reflection, conversation, and development planning. It is not a clinical diagnosis and is not medical advice. It should not be used as the sole basis for hiring, medical, legal, educational, financial, relationship, or major life decisions. Responsible use compares the interpretation with observed behaviour, considers confidence and context, invites correction, and uses qualified guidance and relevant evidence where the stakes require it.",
    ),
    block(
      "esfj-method-version",
      "evidence",
      "Version Information",
      "Report version: 1.0.0. Content version: 1.0.0. Rule version: 1.0.0. These identifiers preserve traceability as type content, dynamic dimension care, and confidence handling evolve. A generated report should retain the report, content, and rule versions used at generation time so later updates do not silently change an earlier interpretation. Versioning supports comparison and audit; it does not imply clinical precision or permanent certainty.",
    ),
  ],
};

export const ESFJ_COMPLETE_REPORT:
  CompletePersonalityReportDefinition = {
    personalityType: "ESFJ",
    version: COMPLETE_PERSONALITY_REPORT_VERSION,
    title: { en: "ESFJ Complete Personality Report" },
    sections: COMPLETE_PERSONALITY_REPORT_STANDARD.map(
      (section) => ({
        ...section,
        title: { ...section.title },
        description: { ...section.description },
        contentBlocks: CONTENT_BY_SECTION[section.id] ?? [],
      }),
    ),
  };
