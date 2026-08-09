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
      "infj-identity-summary",
      "summary",
      "Your Complete INFJ Report",
      "This report examines an INFJ preference pattern through insightful meaning-making, evidence, decisions, communication, work, relationships, stress, and development. It treats the type code as a hypothesis about preferred ways of organising attention—not as a fixed identity, clinical judgement, or promise of competence. Culture, experience, responsibilities, trust, and learned skills can change the visible pattern substantially. Use both recognition and mismatch to refine an account grounded in repeated behaviour.",
    ),
  ],
  "personality-overview": [
    block(
      "infj-overview-summary",
      "summary",
      "Insightful Meaning-Making and Purposeful Guidance",
      "An INFJ pattern often combines inward reflection, pattern-based insight, values awareness, and a preference for purposeful direction. The person may connect subtle interpersonal or cultural signals into a larger account of what matters, then guide change toward greater coherence and human development. This can support depth and foresight, but helpful guidance still requires present evidence, consent, communication, and revision. A compelling interpretation is not proof that another person's motives or future are fully known.",
    ),
  ],
  "dimension-results": [
    block(
      "infj-dimensions-context",
      "analysis",
      "Reading the Four Dimensions",
      "An INFJ result combines preferences across EI, SN, TF, and JP, but strength and confidence can alter the expression considerably. A more outward EI score may make guidance collaborative, a practical SN result may begin with operational evidence, a balanced TF result can integrate stakeholder consequences, and a flexible JP result may preserve more iteration. The dynamic interpretations below qualify broad type themes. Compare them with behaviour across expertise, culture, role, trust, and pressure.",
      [
        {
          id: "infj-ei-guidance",
          source: "dimension",
          dimensions: ["EI"],
        },
        {
          id: "infj-sn-meaning",
          source: "dimension",
          dimensions: ["SN"],
        },
        {
          id: "infj-tf-values",
          source: "dimension",
          dimensions: ["TF"],
        },
        {
          id: "infj-jp-structure",
          source: "dimension",
          dimensions: ["JP"],
        },
        {
          id: "infj-overall-confidence",
          source: "confidence",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
  ],
  "key-strengths": [
    block(
      "infj-strengths-bridge",
      "summary",
      "Strengths in Context",
      "Likely INFJ strengths include integrative meaning-making, attentive listening, long-range purpose, ethical reflection, and the ability to articulate a direction that connects people with values. The pattern can be useful when complex change requires both an underlying narrative and sensitivity to human consequence. These are preferences rather than guaranteed skills. Their value depends on knowledge, boundaries, humility, and willingness to test private interpretations through dialogue.",
    ),
  ],
  "growth-risks": [
    block(
      "infj-risks-bridge",
      "guidance",
      "Growth Through Tested Meaning Framework",
      "Development may involve checking interpretations before acting on them, communicating needs before resentment accumulates, distinguishing committed care from over-responsibility, and allowing other people to define their own growth. Other risks include avoiding necessary conflict, withdrawing after relational disappointment, and confusing a coherent sense of purpose with certainty about the right path. These are not fixed defects. The following sections preserve insight and care while strengthening boundaries, adaptability, and shared agency.",
    ),
  ],
  "core-personality-pattern": [
    block(
      "infj-core-summary",
      "summary",
      "Internal Vision and System Coherence",
      "The central INFJ pattern often involves synthesising patterns into an inward sense of meaning, then translating that understanding into purposeful guidance or quiet advocacy. The person may look beyond a visible conflict to the unmet need, value tension, or narrative shaping it. At its best, this supports humane long-term change. The dynamic slots below qualify how insight and guidance change with confidence, balance, and access to adjacent preferences.",
      [
        {
          id: "infj-combination-meaning",
          source: "combination",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
        {
          id: "infj-balanced-dimensions",
          source: "confidence",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
    block(
      "infj-core-analysis",
      "analysis",
      "Building the Meaning Framework Before the Activity",
      "An INFJ may first ask which underlying meaning, unmet need, or value tension connects several visible events. Instead of treating each interaction separately, the person develops an interpretation of the wider pattern and its human consequences. This can guide compassionate change. It becomes limiting when the interpretation stays private or present facts are forced to fit it. A meaning framework must remain open to dialogue, not replace contact with lived experience.",
    ),
    block(
      "infj-core-strength",
      "strength",
      "Concentrated Long-Range Leverage",
      "A developed expression can sustain attention on a consequential objective while resisting short-term noise. The INFJ may identify a small structural change that improves many downstream decisions, sequence work around dependencies, and protect resources for outcomes that take time. This purposeful concentration is strongest when review points invite disconfirming evidence and when collaborators understand enough of the model to exercise judgement rather than merely follow instructions.",
    ),
    block(
      "infj-core-risk",
      "risk",
      "When Coherence Becomes Premature Certainty",
      "A model that explains many observations can begin to feel complete before critical assumptions have been tested. The INFJ may discount local objections as short-term thinking or interpret disagreement as failure to understand the system. This can create elegant plans with weak adoption or hidden operational costs. Confidence should rise when the meaning framework survives serious evidence, not simply because it has become internally consistent.",
    ),
    block(
      "infj-core-reflection",
      "reflection",
      "What Could Change the Model?",
      "Choose one purposeful conclusion you currently hold. Which observations support it, which assumptions connect those observations, and what evidence would require revision? Who has access to facts you do not? Share the model before it is finished and ask for the strongest counterexample. The goal is not to surrender independent judgement, but to ensure independence produces a design that can withstand reality outside your own reasoning.",
    ),
  ],
  "motivation-and-needs": [
    block(
      "infj-motivation-summary",
      "summary",
      "Mastery, Autonomy, and Meaningful Progress",
      "INFJs may feel engaged by complex problems, room for independent judgement, opportunities to build competence, and work whose long-term consequence justifies concentrated effort. Motivation often rises when the objective is meaningful and methods are not constrained by unnecessary convention. Not every INFJ wants formal authority or solitary work. The deeper need is usually control over attention and enough coherence to invest effort without constant arbitrary interruption.",
    ),
    block(
      "infj-motivation-analysis",
      "analysis",
      "Autonomy in Service of a System",
      "Independence can protect the uninterrupted thought required for difficult meaning framework. The person may resist oversight that focuses on visible activity rather than reasoning or outcomes. Autonomy is most productive when paired with transparent constraints, review, and responsibility for consequences. Without those anchors, self-direction can become insulation from feedback. The useful question is which decisions need protected judgement and which improve through earlier collaboration.",
    ),
    block(
      "infj-motivation-strength",
      "strength",
      "Patience for Purposeful Development",
      "When a purpose matters, the INFJ may sustain attention through slow learning, uncertain recognition, and the relational work required for durable change. This can support thoughtful guidance and development that respects both long-term meaning and individual experience. Persistence remains useful when affected people can question the interpretation and show whether it helps. Commitment becomes less constructive when preserving the original purpose narrative matters more than consent, evidence, or changing needs.",
    ),
    block(
      "infj-motivation-risk",
      "risk",
      "Purpose as Protection",
      "A strong sense of purpose can become protection against uncertainty or ordinary personal need. The INFJ may keep serving a meaningful outcome while overlooking fatigue, disappointment, or the wish to be supported. Contribution remains valuable, but identity becomes more resilient when worth is not earned through insight or usefulness. Allow purpose to include rest, reciprocal care, unfinished understanding, and goals chosen by other people rather than silently carried for them.",
    ),
    block(
      "infj-motivation-guidance",
      "guidance",
      "Define Progress Through Shared Meaning",
      "For a meaningful commitment, name the value being served and ask affected people what improvement would look like in their experience. Add boundaries for time, responsibility, and consent. Distinguish the contribution only you can make from work others must own. Share one interpretation while it is still provisional. This connects purpose to lived consequence and prevents a private ideal from replacing dialogue about what people actually need.",
    ),
  ],
  "information-processing": [
    block(
      "infj-information-summary",
      "summary",
      "Patterns, Trajectories, and System Coherence",
      "An INFJ pattern often attends to underlying structure, future implications, and the few variables that organise many surface events. Information becomes useful when it clarifies a trajectory or improves the internal model of the system. This can support purposeful foresight, provided abstraction remains connected to current measurements, operational detail, and alternative explanations. Pattern recognition generates hypotheses; it does not remove the need for evidence.",
    ),
    block(
      "infj-information-analysis",
      "analysis",
      "Connecting Signals Into Meaning",
      "The person may combine tone, history, values, and future implications into a compact interpretation of what a situation means. This can reveal themes that isolated facts miss and help others understand a difficult transition. Synthesis also risks assigning coherence too early. Record the observations separately from the story connecting them, ask whose perspective is absent, and identify evidence that would support a different interpretation.",
    ),
    block(
      "infj-information-strength",
      "strength",
      "Seeing Second-Order Consequences",
      "INFJs may naturally ask what a present decision makes more likely later: which dependency grows, which incentive changes, or which capability becomes difficult to recover. This can protect a team from attractive short-term fixes. The strength becomes practical when future consequences are translated into observable indicators and when probability is communicated honestly rather than as inevitable foresight.",
    ),
    block(
      "infj-information-risk",
      "risk",
      "Filtering Out Inconvenient Reality",
      "Once the organising pattern feels clear, data that does not fit may be labelled exceptional, political, or too operational. Yet one inconvenient detail can reveal a mistaken assumption or a stakeholder cost the meaning framework ignores. The risk is not abstraction itself; it is allowing the model to determine which evidence counts. Deliberately preserve anomalies until they are explained rather than removed from the purposeful picture.",
    ),
    block(
      "infj-information-guidance",
      "guidance",
      "Maintain a Model and an Anomaly Log",
      "Write the current system model, its three most important assumptions, and the indicators expected if it is correct. Beside it, keep observations that do not fit. Review both with someone close to implementation. Revise the meaning framework when anomalies form a pattern, and record why. This protects long-range coherence while ensuring that evidence can genuinely change the direction.",
    ),
  ],
  "decision-making": [
    block(
      "infj-decisions-summary",
      "summary",
      "Values and Consequences, Consequence, and Deliberate Commitment",
      "INFJs may prefer decisions grounded in explicit objectives, internal consistency, evidence, and long-term consequence. They often want enough time to understand the meaning framework before committing, then may hold the chosen direction steadily. This can reduce reactive switching. Good judgement still includes human impact, reversibility, and unknowns. A coherenceally coherent choice can fail when the values and consequences omit adoption, ethics, or information held by others.",
    ),
    block(
      "infj-decisions-analysis",
      "analysis",
      "Private Convergence",
      "The person may compare alternatives internally and communicate only after a preferred direction has emerged. This protects concentration but hides the decision process from collaborators, who may receive a conclusion without the evidence or trade-offs behind it. Earlier visibility does not require endless consensus. Sharing the values and consequences and uncertainty allows others to improve the model before the cost of change becomes high.",
    ),
    block(
      "infj-decisions-strength",
      "strength",
      "Resisting Short-Term Pressure",
      "An INFJ may hold a purpose-led choice when immediate incentives favour convenience, image, or avoidance. By connecting the decision to human consequence and long-term meaning, the person can protect an ethical commitment through pressure. This strength needs review points so conviction does not become certainty about other people's needs. The choice should remain stable because evidence and values still support it, not because revision feels like betrayal of purpose.",
    ),
    block(
      "infj-decisions-risk",
      "risk",
      "Optimising the Wrong Values and Consequences",
      "Precise analysis can produce a poor decision when the governing values and consequences are incomplete. Efficiency, scalability, or coherenceal elegance may be optimised while trust, accessibility, timing, or transition cost remains outside the model. Those consequences later return as implementation failure. Before finalising, ask who defines success, who bears the cost, and which qualitative evidence should influence the choice.",
    ),
    block(
      "infj-decisions-guidance",
      "guidance",
      "Expose the Decision Meaning Framework",
      "Document the objective, values and consequences, assumptions, strongest alternative, and evidence that would trigger review. Share this before the final choice with people who hold different information. Specify what is decided and what remains adjustable. This preserves independent judgement while making the reasoning testable, reducing surprise, and helping collaborators implement the choice with understanding rather than compliance.",
    ),
  ],
  "communication": [
    block(
      "infj-communication-summary",
      "summary",
      "Concise, Structured, and Selective",
      "INFJs may prefer communication that has a clear purpose, coherent reasoning, and enough substance to justify attention. They may speak selectively after internal processing rather than narrate each step. This can make contributions focused, but others cannot infer the private model automatically. Effective communication translates meaning framework into context, assumptions, decisions, and invitations for evidence without requiring constant social performance.",
    ),
    block(
      "infj-communication-analysis",
      "analysis",
      "The Missing Middle of the Reasoning",
      "Because the INFJ has already connected many steps internally, an explanation may move from problem to conclusion while omitting the bridge. Listeners can experience the result as abrupt or unsupported. The answer is not greater volume; it is a visible coherence chain. State what you observed, what it suggests, which uncertainty remains, and why the recommendation follows.",
    ),
    block(
      "infj-communication-risk",
      "risk",
      "Under-Communication and Assumed Understanding",
      "The person may delay sharing until the model feels sufficiently refined, then become frustrated when others lack context or raise questions already resolved privately. Silence can be interpreted as distance, agreement, or lack of interest. Under pressure, concise correction may also sound dismissive. Communicate earlier enough that others can influence the work, not merely receive the completed meaning framework.",
    ),
    block(
      "infj-communication-guidance",
      "guidance",
      "Share the Interpretation as a Question",
      "Use a brief sequence: what you noticed, the meaning you currently infer, the value at stake, and what you may be missing. Present the interpretation as a question rather than privileged insight into another person. When disagreeing, name both the substantive concern and the relationship you want to preserve. This makes depth collaborative and gives others room to correct the narrative without first defending their motives.",
    ),
    block(
      "infj-communication-reflection",
      "reflection",
      "What Was Visible to Others?",
      "Review a recent decision that felt obvious to you. What information did collaborators actually receive, and which connections existed only in your own model? Did you ask for evidence early enough to change the direction? What emotional or practical concern was relevant even if it was expressed imprecisely? Clear meaning framework becomes influential when other people can inspect and use it.",
    ),
  ],
  "teamwork-and-leadership": [
    block(
      "infj-teamwork-summary",
      "summary",
      "Architecting Capability and Direction",
      "In teams, an INFJ may contribute by clarifying shared meaning, noticing unspoken tensions, protecting a humane long-term purpose, and helping people connect present work with future consequence. Leadership can be quiet and insight-led rather than socially dominant. Effective teamwork requires checking interpretations, learning from local experience, and recognising that coordination and boundaries are part of how purposeful guidance becomes trustworthy.",
    ),
    block(
      "infj-teamwork-analysis",
      "analysis",
      "Purposeful, Relational Collaboration",
      "The INFJ may contribute most fully when a group has a meaningful purpose and enough trust for honest interpretation, while superficial participation can feel draining. Sensitivity to unspoken dynamics may help the group notice exclusion or misalignment, but it can also tempt the person to infer needs without checking them. Ask participants what support and responsibility they actually want, make the shared purpose explicit, and separate empathic observation from conclusions that others must be free to correct.",
    ),
    block(
      "infj-teamwork-strength",
      "strength",
      "Designing for Independent Judgement",
      "A developed INFJ can create frameworks that help others make consistent decisions without central approval. Clear principles, interfaces, and feedback loops can distribute capability while preserving coherence. This form of leadership scales better than personal control. It works when the meaning framework includes space for local adaptation and when people understand how to challenge a rule that no longer serves the objective.",
    ),
    block(
      "infj-teamwork-risk",
      "risk",
      "Retreating From Imperfect Collaboration",
      "When meetings are inefficient or reasoning feels weak, the INFJ may withdraw and solve the problem alone. This can produce a better immediate design but reduce ownership, learning, and access to operational knowledge. Repeated withdrawal also reinforces the belief that collaboration adds little value. Improve the structure of collaboration before abandoning it: narrow the question, prepare evidence, and assign decisions deliberately.",
    ),
    block(
      "infj-teamwork-guidance",
      "guidance",
      "Create a Challengeable Meaning Framework",
      "State the purposeful principles, constraints, and interfaces that guide the team. Give owners authority within those boundaries and establish review points based on evidence. Invite a designated critic to test assumptions and include operational voices before finalising standards. The aim is a system others can understand, adapt, and improve—not one that functions only when the original architect is present.",
    ),
  ],
  "career-environment": [
    block(
      "infj-career-summary",
      "summary",
      "Depth, Autonomy, and Long-Range Consequence",
      "INFJs may prefer work that rewards independent judgement, complex systems thinking, learning, and sustained improvement. Guidance, technology, research, design, policy, or specialised leadership can offer these conditions, but no career belongs to a type. Fit depends on interests, expertise, values, resources, and organisational reality. The relevant question is whether the work permits depth while connecting private analysis to meaningful external outcomes.",
    ),
    block(
      "infj-career-analysis",
      "analysis",
      "The Need for Protected Attention",
      "Frequent interruption and performative activity can make it difficult to build a coherent model of complex work. The INFJ may need blocks of uninterrupted time and clear decision ownership. Total isolation is not the answer; guidance requires contact with users, colleagues, and changing evidence. A supportive environment alternates focused analysis with purposeful collaboration rather than treating either constant availability or solitary independence as ideal.",
    ),
    block(
      "infj-career-example",
      "example",
      "Work That Rewards Meaning Framework",
      "Systems design, research guidance, product meaning framework, organisational redesign, policy analysis, or long-range planning may reward the ability to connect principles and consequences. The same job title can vary widely. Examine whether the daily work includes genuine problem ownership, access to evidence, authority to improve structures, and responsibility through implementation rather than relying on occupational stereotypes.",
    ),
    block(
      "infj-career-risk",
      "risk",
      "Waiting for Perfect Alignment",
      "A strong wish for meaningful work can make ordinary compromise feel like betrayal, while an imagined vocation appears more coherent than any real institution. The INFJ may postpone contribution until role, culture, values, and impact align completely. Development often means creating humane influence inside imperfect conditions. Distinguish genuine ethical conflict from the ambiguity, administration, disagreement, and maintenance that accompany sustained service.",
    ),
    block(
      "infj-career-guidance",
      "guidance",
      "Evaluate Purposeful Fit",
      "Assess roles across problem depth, autonomy, evidence quality, time horizon, implementation ownership, and access to capable challenge. Ask how decisions are reviewed and whether long-range work survives short-term pressure. Also identify the communication and relationship work required for influence. Choose an environment where meaning framework matters, then build the skills that help other people understand and adopt it.",
    ),
  ],
  "relationship-dynamics": [
    block(
      "infj-relationships-summary",
      "summary",
      "Selective Trust and Deliberate Commitment",
      "INFJs may invest deeply in a relatively small number of relationships, valuing honesty, mutual growth, emotional meaning, reliability, and space for reflection. Care may be expressed through attentive understanding, thoughtful guidance, or sustained commitment. People vary widely, and a type code cannot explain attachment or intimacy. Relationships become stronger when private loyalty, expectations, and limits are made visible in forms the other person can recognise.",
    ),
    block(
      "infj-relationships-analysis",
      "analysis",
      "Internal Commitment, External Ambiguity",
      "The INFJ may assume that continued presence, practical help, or careful thought clearly communicates care. Another person may need direct appreciation, emotional acknowledgement, or more frequent contact. Neither form is inherently superior. Ask how care is received rather than relying only on the form that feels most sincere to give. Translation protects authenticity while making commitment accessible.",
    ),
    block(
      "infj-relationships-strength",
      "strength",
      "Depth Without Performance",
      "A developed expression can offer steadiness, candid reflection, respect for autonomy, and willingness to engage difficult long-term problems. The INFJ may avoid superficial reassurance and take another person's goals seriously. This can create trust when analysis is invited and emotion is not treated as noise. Deep connection includes being present with an experience that cannot immediately be optimised.",
    ),
    block(
      "infj-relationships-risk",
      "risk",
      "Withdrawing After Unspoken Disappointment",
      "When care is not recognised or a value feels violated, the INFJ may retreat and complete the relational story in private. This protects against immediate conflict but leaves the other person unaware of expectations they never heard. Insight becomes isolation when it removes the possibility of clarification or repair. Name the specific event, its effect, and the need for space before deciding what the relationship means.",
    ),
    block(
      "infj-relationships-guidance",
      "guidance",
      "Make Care, Limits, and Needs Visible",
      "Practise naming one appreciation, one limit, and one direct request before offering guidance. In conflict, explain what you observed and ask how the other person understands it before inferring motive. Agree on how space and reconnection will work. These actions do not require constant disclosure; they make care reciprocal and prevent trust from depending on whether someone can decode a quiet change in tone.",
    ),
  ],
  "change-and-adaptation": [
    block(
      "infj-change-summary",
      "summary",
      "Adapting the Meaning Framework",
      "INFJs may anticipate change by modelling future conditions and preparing a coherent route before disruption arrives. They can support transformation when current systems no longer fit long-term needs. Adaptation becomes harder when change contradicts a deeply developed model or arrives without intelligible purpose. The dynamic slot below examines how adjacent preferences may make planning more iterative, practical, or collaborative.",
      [
        {
          id: "infj-combination-adaptation",
          source: "combination",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
    block(
      "infj-change-analysis",
      "analysis",
      "Revision Versus Abandoning the Vision",
      "Because purposeful models integrate many decisions, revising one assumption can feel as though the whole meaning framework is being destabilised. The person may defend the original direction longer than evidence warrants. Separate the underlying purpose from the current design. A model can change while the deeper objective remains intact, and revision often demonstrates stronger guidance than preserving a coherent but inaccurate forecast.",
    ),
    block(
      "infj-change-strength",
      "strength",
      "Preparing for Second-Order Effects",
      "The INFJ may notice that a transition changes incentives, capabilities, and future options beyond the immediate implementation plan. This supports more responsible sequencing and can protect resources others overlook. The strength is most useful when affected people help test the forecast. Change meaning framework should include lived transition costs, not only the final system's conceptual advantages.",
    ),
    block(
      "infj-change-risk",
      "risk",
      "Rigidity Hidden as Purposeful Consistency",
      "A reluctance to revise may be explained as protecting the long term even when evidence has changed. The person can selectively interpret setbacks as poor execution rather than a flawed assumption. This delays learning and may place growing demands on others. Define failure and review values and consequences before implementation so adaptation does not depend on admitting the entire vision was mistaken.",
    ),
    block(
      "infj-change-guidance",
      "guidance",
      "Revisit the Meaning Without Abandoning the Value",
      "Separate the enduring value from the current interpretation of how to serve it. Record assumptions, expected human consequences, review dates, and signs that another route may be more helpful. At each review, ask affected people what improved and what became harder. Revising the guidance can preserve purpose while preventing loyalty to one narrative from overriding experience, consent, or changing context.",
    ),
  ],
  "stress-and-recovery": [
    block(
      "infj-stress-summary",
      "summary",
      "Contraction, Control, and Over-Isolation",
      "Under sustained stress, an INFJ may withdraw, narrow attention, intensify private planning, or become unusually critical of inefficiency and interruption. At other times the person may react through impulsive sensory activity or urgent attempts to control immediate details. Stress responses vary and are not diagnostic. The useful task is identifying the earliest loss of flexibility, communication, sleep, or perspective for this individual.",
    ),
    block(
      "infj-stress-analysis",
      "analysis",
      "When Reflection Becomes Emotional Seclusion",
      "Private time can restore clarity, but prolonged withdrawal may recycle the same relational interpretation without new evidence or emotional contact. The INFJ can feel reflective while rehearsing what others should have understood. Recovery needs a boundary: enough solitude to reduce input, followed by physical grounding, one honest conversation, and a return to what was actually said or done rather than only what it seemed to mean.",
    ),
    block(
      "infj-stress-evidence",
      "evidence",
      "Personal Early-Warning Signals",
      "Possible signals include quietly cancelling contact, becoming unusually certain about another person's motives, absorbing more responsibility, losing patience with superficial conversation, or neglecting physical routines while trying to restore meaning. These signs are individual rather than universal. Track what appears before sleep, judgement, health, or relationship quality declines, and ask trusted people which change in warmth or availability they notice first.",
    ),
    block(
      "infj-stress-risk",
      "risk",
      "Solving Pressure With More Meaning Framework",
      "When the problem involves grief, exhaustion, conflict, or limited control, another plan may create temporary distance without resolving the experience. The INFJ may analyse causes while remaining disconnected from support or bodily needs. Purposeful thinking is still available later. Immediate recovery may require naming the feeling, reducing obligations, accepting uncertainty, or asking directly for help.",
    ),
    block(
      "infj-stress-guidance",
      "guidance",
      "Ground, Communicate, and Reduce Scope",
      "Pause one nonessential optimisation, restore sleep and movement, and choose one concrete task that can be finished without redesigning the system. Tell a trusted person that capacity is reduced and specify the support needed. Revisit purposeful conclusions after recovery and new evidence. If distress is persistent or significantly affects functioning, seek appropriate professional support rather than using type language as an explanation.",
    ),
  ],
  "growth-roadmap": [
    block(
      "infj-growth-summary",
      "summary",
      "From Private Vision to Shared Capability",
      "INFJ development is not about abandoning independence or long-range thought. It involves making models challengeable, communicating before certainty, distinguishing excellence from idealised responsibility, and allowing relationship and operational evidence to shape the meaning framework. Growth expands purposeful range: the person can still protect depth while involving others early enough to improve and carry the work. The dynamic slot below highlights combinations affecting this path.",
      [
        {
          id: "infj-combination-isolation-risk",
          source: "combination",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
    block(
      "infj-growth-analysis",
      "analysis",
      "Collaboration as Shared Interpretation",
      "Collaboration need not dilute purpose or reduce a nuanced issue to consensus. At its best, it adds lived perspectives, ethical tensions, and practical constraints unavailable to one interpreter. The developmental task is protecting reflective depth while allowing other people to alter both the narrative and the route. Consultation that asks for agreement but cannot change the guidance is persuasion, not shared meaning-making.",
    ),
    block(
      "infj-growth-risk",
      "risk",
      "Idealised Responsibility Disguised as Readiness",
      "The person may delay a conversation, boundary, or request until it can be expressed with perfect care. This protects an ideal of harmony but prevents real feedback and shared responsibility. Idealised responsibility often focuses attention on every possible emotional consequence while personal needs remain unspoken. Define what respectful honesty requires, accept that disappointment is not automatically harm, and let dialogue provide evidence unavailable to private anticipation.",
    ),
    block(
      "infj-growth-guidance",
      "guidance",
      "Practise Earlier Exposure",
      "Choose one model, proposal, or concern and share it at sixty-percent clarity with a trusted, relevant person. State what is stable, what is uncertain, and what feedback could change the direction. Resist solving every objection immediately; record it and review the meaning framework later. Repeat weekly so visibility becomes part of rigorous thinking rather than a threat to it.",
    ),
    block(
      "infj-growth-action",
      "action",
      "A Monthly Assumption Review",
      "Once a month, select one important interpretation or guidance commitment and review its assumptions, missing voices, relational effects, and lived evidence. Identify one belief that strengthened and one that weakened. Communicate any revision and credit the person or experience that changed it. This creates visible interpretive humility while preserving the INFJ's strength in purposeful long-range meaning.",
    ),
  ],
  "ninety-day-action-plan": [
    block(
      "infj-action-summary",
      "summary",
      "A Ninety-Day Shared-Meaning Framework Practice",
      "Use the next ninety days to test whether earlier exposure improves a meaningful purposeful outcome. Choose one project that requires both deep analysis and adoption by others. Preserve focused work, but make assumptions and provisional decisions visible at planned intervals. The objective is a stronger meaning framework that other people can understand, challenge, and execute—not maximum consensus or a flawless plan.",
    ),
    block(
      "infj-action-days-1-30",
      "action",
      "Days 1–30 · Observe and Check Meaning",
      "Choose one purpose-led commitment. Write the value, observations, interpretation, people affected, and assumptions about what they need. Ask two people with different perspectives what the situation means to them and what your account misses. Define one boundary that prevents over-responsibility and one observable sign that the guidance is genuinely helpful rather than merely well intended.",
    ),
    block(
      "infj-action-days-31-60",
      "action",
      "Days 31–60 · Practise and Invite Correction",
      "Apply one piece of guidance in a bounded setting with explicit consent and clear responsibility. Ask the people affected what felt useful, presumptive, unclear, or difficult to sustain. Track when private interpretation matched their experience and when direct feedback changed it. Adjust the guidance and the boundary before expanding the commitment.",
    ),
    block(
      "infj-action-days-61-90",
      "action",
      "Days 61–90 · Share Ownership and Review",
      "Transfer one meaningful decision or support responsibility to the person or group it affects, with agreed boundaries and a review date. Document the purpose and lessons without turning them into a fixed account of another person's needs. Evaluate whether agency, trust, and the intended outcome improved, then revise or end the approach according to observed impact rather than personal investment in being helpful.",
    ),
    block(
      "infj-action-review",
      "reflection",
      "Evidence of Development",
      "Review concrete indicators: assumptions shared early, counterexamples retained, useful versions released, decisions revised from evidence, and responsibility distributed without loss of coherence. Ask collaborators whether the reasoning became easier to understand and challenge. Development is demonstrated by repeated behaviour under real conditions, not by agreement with an attractive purposeful identity.",
    ),
    block(
      "infj-action-guidance",
      "guidance",
      "Protect Depth Without Returning to Isolation",
      "If collaboration becomes noisy, improve its structure rather than abandoning it. Narrow the question, request evidence in advance, and separate consultation from decision rights. If idealised responsibility delays delivery, reduce scope while preserving the critical quality standard. The plan succeeds when independent thought and external correction become parts of one reliable process.",
    ),
  ],
  methodology: [
    block(
      "infj-methodology-framework",
      "analysis",
      "How to Use This Report",
      "This report interprets an MBTI-style preference result using EI, SN, TF, and JP dimensions, confidence values, static type-level content, and matched dynamic rules. It describes tendencies for reflection. It is not a clinical diagnosis, intelligence test, capability assessment, or scientifically absolute account of personality. No section should be used alone for consequential employment, educational, relationship, financial, or health decisions.",
    ),
    block(
      "infj-methodology-variation",
      "evidence",
      "Context and Individual Variation",
      "People sharing an INFJ result can differ substantially because of culture, age, expertise, responsibilities, health, values, environment, and development. Balanced or lower-confidence dimensions increase the likelihood that neighbouring preferences are similarly accessible. Give repeated lived evidence more weight than a type stereotype, and treat descriptions that do not fit as information rather than a failure to match the code.",
    ),
    block(
      "infj-methodology-dynamic",
      "analysis",
      "Dynamic Interpretation",
      "Generated reports select rule content from supplied dimension scores and confidence patterns. Applied-rule metadata records which adaptations were inserted, supporting traceability across report, content, and rule versions. Dynamic text can qualify a broad narrative, but it cannot infer motive, history, maturity, mental health, or future outcomes. Interpretation remains a reflective aid rather than an automated judgement.",
    ),
    block(
      "infj-methodology-version",
      "guidance",
      "Version and Responsible Review",
      "Report version: 1.0.0. Content version: 1.0.0. Rule version: 1.0.0. These identifiers preserve the source used to generate a result as content and rules evolve. Revisit the report when circumstances or self-understanding change, compare it with feedback and behaviour, and retain only interpretations that support accurate and responsible reflection.",
    ),
  ],
};

export const INFJ_COMPLETE_REPORT:
  CompletePersonalityReportDefinition = {
    personalityType: "INFJ",
    version: COMPLETE_PERSONALITY_REPORT_VERSION,
    title: { en: "INFJ Complete Personality Report" },
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
