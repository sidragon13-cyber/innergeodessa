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
      "entj-identity-summary",
      "summary",
      "Your Report",
      "This complete report interprets an ENTJ preference pattern as a starting point for reflection. It uses the current report, content, and rule version identifiers so later generated results can remain traceable. The type code describes a pattern of preferences; it does not define the whole person or set limits on ability.",
    ),
  ],
  "personality-overview": [
    block(
      "entj-overview-summary",
      "summary",
      "A Considerate, Practical Pattern",
      "The existing free profile introduces a pattern of attentive observation, practical care, reliability, and continuity. This report builds on that foundation without replacing it. The deeper sections examine when those tendencies are useful, when they may become costly, and how an individual can adapt them to context.",
    ),
  ],
  "dimension-results": [
    block(
      "entj-dimensions-context",
      "analysis",
      "Reading the Four Dimensions",
      "An ENTJ result combines preferences across EI, SN, TF, and JP. The strength and confidence of each result may change how recognisable the overall pattern feels. Later report generation can insert dimension-specific interpretation here, including balanced dimensions that warrant especially cautious language.",
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
      "The free profile identifies practical support, trust building, careful organisation, service awareness, patient follow-through, and continuity as likely strengths. Their value depends on context, choice, skill, and available capacity. Premium sections examine how to use them without allowing dependable contribution to become invisible or unlimited.",
    ),
  ],
  "growth-risks": [
    block(
      "entj-risks-bridge",
      "guidance",
      "Growth Without Self-Erasure",
      "The free growth risks point toward early expression of needs, realistic capacity checks, constructive disagreement, supported change, visible contribution, and specific use of feedback. These are development possibilities rather than fixed weaknesses. The following sections turn them into contextual questions and practical experiments.",
    ),
  ],
  "core-personality-pattern": [
    block(
      "entj-core-summary",
      "summary",
      "Care Patterns",
      "An ENTJ preference pattern may combine attentive observation with memory for personal and practical details. Care is often expressed through dependable action: remembering what matters, maintaining continuity, and completing work that supports another person's daily experience. This can create a quiet form of trust because help is specific and follow-through is visible in outcomes, even when the contributor is not.",
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
      "Observation, Memory, and Continuity",
      "This pattern is more likely to notice deviations from what has previously kept people or systems functioning. A remembered preference, missed step, or subtle change in tone can become useful contextual evidence. When combined with a desire for completion, those observations support continuity: promises are tracked, routines are protected, and practical gaps are closed before they become disruptive.",
    ),
    block(
      "entj-core-strength",
      "strength",
      "Dependability That Humanises Systems",
      "A practical strength of this pattern is the ability to make structures feel personally responsive. An ENTJ may translate concern into a prepared document, a timely reminder, a comfortable environment, or a carefully completed handover. These actions can increase safety and belonging because other people experience care through consistent details rather than through intention alone.",
    ),
    block(
      "entj-core-risk",
      "risk",
      "Becoming Invisible Behind Responsibility",
      "Repeatedly stepping in can make responsibility accumulate around the most dependable person. Others may see a smoothly functioning system without seeing the attention that sustains it. The cost can be fatigue, reduced choice, or an identity organised mainly around being needed. Genuine care is chosen with awareness and capacity; automatic duty is performed because refusal feels unsafe, disloyal, or disappointing.",
    ),
    block(
      "entj-core-reflection",
      "reflection",
      "Care or Automatic Duty?",
      "Before accepting a responsibility, ask: Did I choose this, or did I assume nobody else would do it? Is the support genuinely mine to provide? What would a smaller, shared, or time-limited commitment look like? This distinction protects the quality of care by connecting it to consent, realistic energy, and mutual responsibility.",
    ),
  ],
  "motivation-and-needs": [
    block(
      "entj-motivation-summary",
      "summary",
      "Responsibility, Stability, and Being Useful",
      "ENTJs may feel engaged when their contribution is useful, reliable, and connected to people or communities they trust. Meaningful responsibility can provide a clear place in a system, while stability makes it easier to invest attention over time. Appreciation matters not because every contribution needs praise, but because acknowledgement confirms that effort is visible and reciprocal.",
    ),
    block(
      "entj-motivation-analysis",
      "analysis",
      "Belonging Through Dependable Contribution",
      "Reliability may become a language of belonging: keeping a promise demonstrates loyalty, and being entrusted with practical responsibility signals inclusion. This can be deeply motivating when expectations are clear and relationships are trustworthy. It is less sustainable when belonging seems conditional on constant availability or when changing a commitment is interpreted as letting people down.",
    ),
    block(
      "entj-motivation-strength",
      "strength",
      "Steady Investment in What Matters",
      "When responsibility is meaningful and bounded, this pattern can sustain patient effort after initial enthusiasm fades. The person may preserve knowledge, relationships, and service standards that would otherwise fragment. Their motivation often strengthens when they can see who benefits, understand what good work requires, and trust that colleagues will honour their own commitments.",
    ),
    block(
      "entj-motivation-risk",
      "risk",
      "External Appreciation as a Measure of Worth",
      "If appreciation becomes the main evidence of value, a quiet response from others may feel like rejection or proof that more effort is required. This can lead to over-delivery, indirect bids for recognition, or disappointment that remains unspoken. The underlying need is legitimate; the risk lies in outsourcing self-evaluation to people who may be inattentive, busy, or accustomed to receiving help.",
    ),
    block(
      "entj-motivation-guidance",
      "guidance",
      "Build More Than One Source of Meaning",
      "Name the needs beneath a commitment: usefulness, connection, stability, mastery, appreciation, or trust. Then identify which can be met internally, which require a direct conversation, and which depend on a healthier environment. Track contribution using outcomes and personal values, not only other people's gratitude. Ask periodically whether the responsibility remains meaningful, fairly shared, and compatible with current capacity.",
    ),
  ],
  "information-processing": [
    block(
      "entj-information-summary",
      "summary",
      "Practical Memory and Context",
      "This pattern often gives close attention to concrete details, previous experience, and the circumstances surrounding an event. Information becomes meaningful through comparison: what happened before, what changed, and which practical conditions affected the outcome. This may produce nuanced awareness of people, routines, and local realities that broad theories can miss.",
    ),
    block(
      "entj-information-analysis",
      "analysis",
      "Pattern Recognition Through Comparison",
      "Rather than beginning with an abstract possibility, an ENTJ may build understanding from remembered examples and observable evidence. A new situation is compared with prior cases to identify continuity and difference. This approach can reveal small risk signals and implementation details, especially when the person has enough experience and when memory is checked against current facts.",
    ),
    block(
      "entj-information-strength",
      "strength",
      "Context That Improves Practical Judgement",
      "Contextual awareness helps prevent one-size-fits-all solutions. The person may remember that a process failed under a particular constraint, that a client needs information in a specific form, or that a team performs better with a stable handover. Such evidence supports realistic planning and preserves useful knowledge that is rarely captured in formal instructions.",
    ),
    block(
      "entj-information-risk",
      "risk",
      "When Novelty Outruns Reference Points",
      "Highly abstract language, rapid pivots, or proposals with few concrete examples may be harder to evaluate quickly. Caution can increase when consequences for people and operations are unclear. Depending on context, this may look like resistance even when the real need is for usable evidence, implementation detail, or time to construct a reliable mental model.",
    ),
    block(
      "entj-information-guidance",
      "guidance",
      "Explore Possibilities Safely",
      "Translate an unfamiliar idea into a small example, prototype, scenario, or reversible trial. Ask what assumption is genuinely new and what resembles previous experience. Compare at least two alternatives rather than only the proposed option and the status quo. Set a review point with observable evidence so exploration does not require blind commitment and caution does not become indefinite delay.",
    ),
  ],
  "decision-making": [
    block(
      "entj-decisions-summary",
      "summary",
      "Human Impact and Dependable Decisions",
      "ENTJ decisions may weigh effects on people, existing obligations, practical consequences, and continuity. A good decision often feels both considerate and workable: it protects important relationships while preserving the routines or resources that make follow-through possible. This orientation can improve implementation because the decision includes people who will live with its consequences.",
    ),
    block(
      "entj-decisions-analysis",
      "analysis",
      "Obligations Shape the Choice",
      "Commitments already made may carry significant weight. The person may ask who is relying on the outcome, what disruption a change could cause, and whether a decision can be delivered responsibly. This can support ethical consistency, but it may also make old obligations feel permanent even after conditions, priorities, or personal capacity have changed.",
    ),
    block(
      "entj-decisions-strength",
      "strength",
      "Practical Consequence Awareness",
      "This pattern can identify downstream effects that a purely conceptual decision overlooks: training time, emotional impact, handover quality, accessibility, or workload transferred to someone else. By connecting values to practical delivery, an ENTJ may help a group choose an option that is not only appealing in principle but also humane and sustainable in use.",
    ),
    block(
      "entj-decisions-risk",
      "risk",
      "Conflict Avoidance and Delayed Preference",
      "When disagreement feels likely to damage trust, personal preferences may be postponed until every other concern has been accommodated. The eventual decision can then exceed capacity or conceal important information. Avoiding early tension may create later resentment, inconsistent follow-through, or a sudden refusal that surprises people who believed agreement was genuine.",
    ),
    block(
      "entj-decisions-guidance",
      "guidance",
      "A Three-Lens Decision Check",
      "Before committing, review three lenses. Others: who is affected, and what do they actually need rather than what might please them? Evidence: what facts, precedents, and uncertainties support each option? Self-capacity: what time, energy, values, and limits must be included? State a provisional preference before solving every concern, then revise it openly as better information emerges.",
    ),
  ],
  "communication": [
    block(
      "entj-communication-summary",
      "summary",
      "Communication Needs",
      "An ENTJ may communicate care through thoughtful listening, remembered detail, and practical support. Calm, respectful conversation often makes it easier to process meaning and respond carefully. The person may prefer to consider wording before raising a concern, particularly when the relationship matters or when a direct statement could be experienced as unnecessarily harsh.",
    ),
    block(
      "entj-communication-analysis",
      "analysis",
      "Indirect Signals and Practical Messages",
      "Preferences may first appear through hints, extra effort, softened language, or an attempt to fix the problem without discussing it. These signals can be considerate, but they rely on others noticing what has not been said. In teams or relationships with different communication styles, practical support may be appreciated while the underlying need remains unknown.",
    ),
    block(
      "entj-communication-risk",
      "risk",
      "Dissatisfaction That Arrives Late",
      "If discomfort is repeatedly contained to preserve harmony, resentment can accumulate beneath continued helpfulness. The person may become quieter, more irritable, or less flexible before naming the issue. By the time it is discussed, the emotional history is larger than the visible event, making a calm adjustment harder for everyone involved.",
    ),
    block(
      "entj-communication-guidance",
      "guidance",
      "A Clear Request Framework",
      "Use four parts: observation, impact, need, and request. For example: 'The handover arrived after the deadline; I had to cancel planned work; I need predictable preparation time; can we agree on a noon cutoff or reassign the final check?' Deliver feedback with specific behaviour and consequence. Receive feedback by separating intent, action, and result before deciding what to change.",
    ),
    block(
      "entj-communication-reflection",
      "reflection",
      "Say It While It Is Still Small",
      "Identify one concern currently expressed only through extra effort or hints. What is the smallest accurate sentence that would make your position visible? Choose a calm time, make one concrete request, and allow the other person to respond without immediately withdrawing it. Afterwards, review whether directness damaged trust or actually gave the relationship better information.",
    ),
  ],
  "teamwork-and-leadership": [
    block(
      "entj-teamwork-summary",
      "summary",
      "Quiet Coordination and Trust",
      "ENTJs may support teams through preparation, reliable coordination, and memory for decisions, preferences, and unfinished work. Their influence is often embedded in continuity rather than display. People may trust them because commitments are tracked and practical support arrives when needed, even when this contribution is not formally described as leadership.",
    ),
    block(
      "entj-teamwork-analysis",
      "analysis",
      "Service-Based Leadership",
      "Leadership may take the form of making expectations clear, ensuring people have resources, preserving useful knowledge, and noticing who is excluded or overloaded. This can create psychological and operational stability. It is leadership through stewardship: the system works because attention is directed toward both task requirements and the lived experience of the team.",
    ),
    block(
      "entj-teamwork-strength",
      "strength",
      "Team Memory and Prepared Follow-Through",
      "A strong practical memory can protect teams from repeating avoidable mistakes. The person may retain why a decision was made, which stakeholder needs follow-up, or where a routine breaks under pressure. Preparation then turns that knowledge into agendas, checklists, handovers, and reminders that allow others to perform more reliably.",
    ),
    block(
      "entj-teamwork-risk",
      "risk",
      "Invisible Labour and Delegation Difficulty",
      "Informal responsibility can expand because doing the task personally feels faster or safer than explaining it. Over time, colleagues may underestimate the work, fail to build capability, or assume the ENTJ prefers to own it. The result can be overload paired with frustration that nobody volunteers for responsibilities they cannot see.",
    ),
    block(
      "entj-teamwork-guidance",
      "guidance",
      "Lead Without Copying Aggressive Styles",
      "Make coordination visible: name ownership, deadlines, dependencies, and decision rights. Delegate outcomes with context and a review point rather than silently correcting every detail. Report operational risks early and document contributions factually. Leadership development does not require becoming forceful or performative; it requires making judgement, standards, boundaries, and expectations available to others.",
    ),
  ],
  "career-environment": [
    block(
      "entj-career-summary",
      "summary",
      "Career Environments",
      "An ENTJ may thrive in structured but humane environments where responsibilities are defined, contribution is practical, and relationships develop through continuity. Useful work is easier to sustain when service quality matters, expectations are credible, and careful follow-through is recognised rather than treated as an unlimited resource.",
    ),
    block(
      "entj-career-analysis",
      "analysis",
      "Conditions That Support Contribution",
      "Helpful conditions may include stable priorities, clear ownership, accessible procedures, respectful collaboration, and enough time to understand the people affected by a process. Some change is compatible with this pattern, especially when leaders explain context, stage implementation, and invite practical feedback. Structure is supportive when it clarifies work, not when it prevents reasonable judgement.",
    ),
    block(
      "entj-career-example",
      "example",
      "Possible Fields, Not Prescriptions",
      "Service, operations, health, education, administration, client support, quality, coordination, and research support can contain roles that use attentiveness and continuity. These fields are examples rather than guarantees. Actual fit depends on skills, interests, values, qualifications, team culture, workload, autonomy, and the specific design of a role—not on personality type alone.",
    ),
    block(
      "entj-career-risk",
      "risk",
      "Warning Signs in an Unsuitable Environment",
      "Risk rises where priorities change without explanation, emotional labour is expected but unsupported, dependable staff receive endless extra work, or speed consistently overrides care and accuracy. Other warnings include ambiguous authority, public conflict as a default management style, chronic understaffing, and cultures that praise sacrifice while ignoring recovery and fair distribution.",
    ),
    block(
      "entj-career-guidance",
      "guidance",
      "Career Decision Criteria",
      "Evaluate a role through five questions: Is responsibility clear? Does the work produce a practical outcome you value? Are care, quality, and continuity supported by real resources? Can concerns be raised safely? Is contribution recognised through feedback, development, compensation, or shared responsibility? Compare evidence from interviews, observation, and current employees rather than relying only on job titles.",
    ),
  ],
  "relationship-dynamics": [
    block(
      "entj-relationships-summary",
      "summary",
      "Relationship Reciprocity",
      "ENTJs may build closeness through loyalty, remembered details, practical care, and efforts that create emotional safety. They often notice what makes another person comfortable and may express commitment by being available during ordinary demands. These behaviours can deepen trust when care moves in both directions and when needs are spoken rather than assumed.",
    ),
    block(
      "entj-relationships-analysis",
      "analysis",
      "Care Carries Expectations",
      "Practical giving is rarely meaningless. It may communicate 'you matter', 'I remember', or 'we can rely on each other'. Problems arise when the hoped-for reciprocity remains unspoken. Another person may appreciate the help without understanding that acknowledgment, initiative, or similar effort is expected in return.",
    ),
    block(
      "entj-relationships-strength",
      "strength",
      "Creating Safety Through Continuity",
      "Remembering preferences, keeping confidences, and following through can make relationships feel secure. This pattern may be especially valuable during illness, transition, or routine strain because support is grounded in what is actually needed. Loyalty becomes healthiest when it includes truthful feedback and allows both people to change.",
    ),
    block(
      "entj-relationships-risk",
      "risk",
      "Over-Giving and Unspoken Contracts",
      "Difficulty asking directly can lead to giving more in the hope that the need will be noticed. If the response is limited, disappointment may be interpreted as lack of care. Continued over-giving can obscure consent and capacity, while the other person remains unaware that a relational contract has formed.",
    ),
    block(
      "entj-relationships-guidance",
      "guidance",
      "Make Mutual Responsibility Visible",
      "Name what support means to you, ask what it means to the other person, and negotiate rather than infer. Use boundaries that describe your action: 'I can help for an hour' or 'I need advance notice.' Invite the other person to initiate, repair, and plan. Reciprocity need not be identical, but both people should carry visible responsibility for the relationship.",
    ),
  ],
  "change-and-adaptation": [
    block(
      "entj-change-summary",
      "summary",
      "Change Support",
      "An ENTJ may approach change by asking for context, preparation, and clarity about human and practical consequences. Concern is not necessarily simple stubbornness; it may reflect awareness of dependencies, accumulated knowledge, and people who will absorb implementation costs. This perspective can improve change when it is included early rather than dismissed.",
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
      "Preserving Continuity During Transition",
      "A staged transition allows essential routines, relationships, and knowledge to remain available while new methods are tested. The person may adapt more readily when they understand why change is needed, what remains stable, who is responsible, and how problems will be corrected. Preparation turns uncertainty into a sequence of manageable commitments.",
    ),
    block(
      "entj-change-strength",
      "strength",
      "Risk Awareness That Protects Implementation",
      "This pattern can identify practical failure points: missing training, unclear handovers, unrealistic timelines, or stakeholders whose needs were not considered. Such caution is constructive when it is expressed as testable questions and paired with alternatives. It helps a group distinguish an exciting proposal from a change that people can actually sustain.",
    ),
    block(
      "entj-change-risk",
      "risk",
      "Evidence-Based Caution or Fear-Based Delay?",
      "Caution becomes costly when no amount of information feels sufficient, when past difficulty is treated as proof that a new approach cannot work, or when avoiding discomfort becomes the hidden objective. Fear-based delay protects short-term familiarity but may increase long-term disruption by postponing learning and reducing available options.",
    ),
    block(
      "entj-change-guidance",
      "guidance",
      "Use Reversible Experiments",
      "Define what must be protected, then test one limited change with clear support, measures, and a review date. Record expected benefits and specific risks before the trial so both can be evaluated fairly. Ask what evidence would justify continuing, adapting, or stopping. This creates safety through learning rather than requiring certainty before movement.",
    ),
  ],
  "stress-and-recovery": [
    block(
      "entj-stress-summary",
      "summary",
      "Stress Signals",
      "Stress may develop quietly when duties accumulate faster than they are questioned or shared. An ENTJ can continue meeting visible obligations while internal flexibility and energy decline. Early recognition matters because the outward appearance of reliability may delay support until overload is already affecting mood, judgement, or health.",
    ),
    block(
      "entj-stress-analysis",
      "analysis",
      "The Silent Overload Sequence",
      "A possible sequence is increased responsibility, reduced personal time, reluctance to disappoint others, and continued effort without clear acknowledgment. The person may then withdraw, become unusually irritable, ruminate about past mistakes, or feel deeply unappreciated. Familiar routines can become rigid because any additional uncertainty feels impossible to absorb.",
    ),
    block(
      "entj-stress-evidence",
      "evidence",
      "Early Warning Signs to Track",
      "Useful signals may include saying yes before checking capacity, replaying small errors, losing patience with ordinary requests, avoiding messages, resenting help that was never requested, or feeling that only personal supervision prevents failure. A change from the individual's normal pattern matters more than whether every listed sign is present.",
    ),
    block(
      "entj-stress-risk",
      "risk",
      "When Duty Blocks Recovery",
      "Recovery can be postponed because rest appears irresponsible while tasks remain unfinished. Yet continuing at reduced capacity may increase mistakes and dependency on the same person. Feeling unappreciated can also make support difficult to accept if help arrives only after a crisis or does not match the care previously given.",
    ),
    block(
      "entj-stress-guidance",
      "guidance",
      "Reduce Load Before Optimising",
      "Start by reducing or redistributing responsibility, clarifying the next essential task, and creating protected rest. Ask one trusted person for specific support rather than waiting to be noticed. Delay nonessential commitments and restore flexibility gradually. This section supports reflection and planning; it is not medical advice or a substitute for qualified mental or physical healthcare.",
    ),
  ],
  "growth-roadmap": [
    block(
      "entj-growth-summary",
      "summary",
      "Boundary Practice",
      "Growth for an ENTJ does not require becoming less caring. It involves making care more deliberate, visible, and sustainable. Key themes include direct needs, manageable disagreement, exploration of alternatives, prioritisation, delegation, and a broader sense of identity than usefulness alone.",
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
      "From Automatic Help to Chosen Contribution",
      "A useful development shift is inserting a pause between noticing a need and taking responsibility for it. The pause allows questions about ownership, priority, energy, and alternatives. This does not remove generosity; it directs generosity toward commitments that are freely chosen and realistically maintained.",
    ),
    block(
      "entj-growth-risk",
      "risk",
      "Development That Becomes Another Duty",
      "Growth plans can reproduce the same over-responsibility they are meant to solve. Trying to set perfect boundaries, communicate flawlessly, delegate everything, and explore every alternative at once may create a new standard of self-criticism. Sustainable change uses small experiments and treats discomfort as information rather than failure.",
    ),
    block(
      "entj-growth-guidance",
      "guidance",
      "Priority Development Practices",
      "Practise one direct need each week, tolerate one respectful disagreement without immediate repair, and generate one alternative before defaulting to precedent. Rank commitments by consequence rather than familiarity. Delegate a complete outcome with a review point. Protect recurring energy for activity that has value even when nobody else benefits.",
    ),
    block(
      "entj-growth-action",
      "action",
      "Measurable Growth Indicators",
      "Track the percentage of requests answered after a capacity check, the number of responsibilities with named co-owners, and how often a need is stated before resentment appears. Other indicators include protected recovery time, experiments with unfamiliar options, and a monthly description of identity using qualities beyond being useful, reliable, or needed.",
    ),
  ],
  "ninety-day-action-plan": [
    block(
      "entj-action-summary",
      "summary",
      "Sustainable Service",
      "This plan turns insight into three manageable phases. It focuses first on awareness, then on communication practice, and finally on a sustainable pattern of contribution and adaptation. Choose actions that fit current capacity; consistency with a small plan is more useful than completing every suggestion.",
    ),
    block(
      "entj-action-days-1-30",
      "action",
      "Days 1–30: Awareness and Capacity Audit",
      "Objective: understand where responsibility and energy are currently going. Actions: (1) list recurring commitments and their true time cost; (2) mark each as chosen, negotiated, or assumed; (3) record energy before and after five common tasks; (4) identify two invisible responsibilities; (5) pause before new commitments. Success indicators: a complete capacity map, three lower-priority tasks identified, and at least five delayed yes/no responses. Review questions: Which duties are genuinely mine? Where does usefulness replace choice?",
    ),
    block(
      "entj-action-days-31-60",
      "action",
      "Days 31–60: Boundary and Communication Practice",
      "Objective: make needs and limits visible while they are still manageable. Actions: (1) use the observation-impact-need-request framework once each week; (2) set one time or scope boundary; (3) ask directly for one form of support; (4) allow one respectful disagreement without over-explaining; (5) document one contribution factually. Success indicators: four clear requests, two renegotiated commitments, and less reliance on hints. Review questions: What response did directness actually produce? Which wording felt both honest and respectful?",
    ),
    block(
      "entj-action-days-61-90",
      "action",
      "Days 61–90: Sustainable Contribution and Adaptation",
      "Objective: create a repeatable pattern of shared responsibility and safe experimentation. Actions: (1) delegate one outcome with a review point; (2) run one reversible change experiment; (3) protect a weekly recovery block; (4) decline or reduce one misaligned request; (5) review commitments with a trusted person. Success indicators: one responsibility remains delegated, recovery time occurs in three of four weeks, and the experiment produces usable evidence. Review questions: What became more sustainable? What support or structure should continue?",
    ),
    block(
      "entj-action-review",
      "reflection",
      "Day 90 Review",
      "Compare current capacity, resentment, recovery, and direct communication with the first-month baseline. Keep the practices that reduced hidden work or increased honest choice. Adjust any action that became performative or burdensome. Select one next-quarter focus: clearer ownership, broader exploration, relationship reciprocity, or recovery. Progress is demonstrated by a more sustainable pattern, not by perfect compliance with the plan.",
    ),
    block(
      "entj-action-guidance",
      "guidance",
      "Adjust the Plan to Real Capacity",
      "Treat the phases as a sequence, not a performance target. If illness, caregiving, workload, or another major demand reduces capacity, keep one small awareness practice and postpone expansion. If an action repeatedly fails, reduce its frequency or ask what support is missing. Do not turn boundary practice into another obligation that must be completed for other people's approval.",
    ),
  ],
  methodology: [
    block(
      "entj-method-summary",
      "summary",
      "Interpretation Notes",
      "This V1 report combines a personality type definition with a structure prepared for later dynamic dimension and confidence analysis. Type-level content provides a coherent hypothesis; future rule-generated slots can qualify it using the strength, balance, and combination of assessment dimensions without changing canonical section IDs.",
    ),
    block(
      "entj-method-analysis",
      "analysis",
      "Preferences Are Not Fixed Abilities",
      "Personality preferences describe tendencies in attention, decision-making, and approach. They do not establish competence, values, behaviour in every setting, or a permanent identity. Results may vary with context, language, stress, experience, culture, and response style. Low-confidence or closely balanced dimensions require especially cautious interpretation and greater reliance on lived evidence.",
    ),
    block(
      "entj-method-guidance",
      "guidance",
      "Responsible Use and Limitations",
      "The report supports self-reflection, conversation, and development planning. It is not a clinical diagnosis and is not medical advice. It should not be used as the sole basis for hiring, medical, legal, educational, financial, relationship, or major life decisions. Important decisions require relevant evidence, qualified guidance where appropriate, and consideration of the person's actual circumstances.",
    ),
    block(
      "entj-method-version",
      "evidence",
      "Version Information",
      "Report version: 1.0.0. Content version: 1.0.0. Rule version: 1.0.0. Version identifiers support traceability as report content and dynamic interpretation rules evolve. A generated report should retain the versions used at generation time so later updates do not silently alter the meaning of an earlier result.",
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
