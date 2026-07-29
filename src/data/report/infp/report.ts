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
      "infp-identity-summary",
      "summary",
      "Your Complete INFP Report",
      "This report examines an INFP preference pattern through values-led exploration, evidence, decisions, communication, work, relationships, stress, and development. It treats the type code as a hypothesis about preferred ways of organising attention—not as a fixed identity, clinical judgement, or promise of competence. Culture, experience, responsibilities, trust, and learned skills can change the visible pattern substantially. Use both recognition and mismatch to refine an account grounded in repeated behaviour.",
    ),
  ],
  "personality-overview": [
    block(
      "infp-overview-summary",
      "summary",
      "Values-Led Exploration and Authentic Expression",
      "An INFP pattern often combines inward values awareness, imaginative possibility, sensitivity to personal meaning, and openness to finding an authentic route. The person may explore how an experience aligns with deeply held convictions, then express that meaning through choices, relationships, language, or creative work. This can support originality and compassion, but authenticity still requires evidence, communication, practical action, and respect for values that differ. Intensity of conviction is not proof of universal correctness.",
    ),
  ],
  "dimension-results": [
    block(
      "infp-dimensions-context",
      "analysis",
      "Reading the Four Dimensions",
      "An INFP result combines preferences across EI, SN, TF, and JP, but strength and confidence can alter the expression considerably. A more outward EI score may make exploration collaborative, a practical SN result may begin with operational evidence, a balanced TF result can integrate stakeholder consequences, and a flexible JP result may preserve more iteration. The dynamic interpretations below qualify broad type themes. Compare them with behaviour across expertise, culture, role, trust, and pressure.",
      [
        {
          id: "infp-ei-exploration",
          source: "dimension",
          dimensions: ["EI"],
        },
        {
          id: "infp-sn-narrative",
          source: "dimension",
          dimensions: ["SN"],
        },
        {
          id: "infp-tf-convictions",
          source: "dimension",
          dimensions: ["TF"],
        },
        {
          id: "infp-jp-openness",
          source: "dimension",
          dimensions: ["JP"],
        },
        {
          id: "infp-overall-confidence",
          source: "confidence",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
  ],
  "key-strengths": [
    block(
      "infp-strengths-bridge",
      "summary",
      "Strengths in Context",
      "Likely INFP strengths include ethical imagination, authentic expression, empathy for individual experience, openness to unconventional possibilities, and willingness to protect meaning that a dominant system overlooks. These are preferences rather than guaranteed skills. Their value depends on craft, context, boundaries, practical follow-through, and willingness to translate private convictions into forms other people can understand and test. Later sections distinguish principled flexibility from avoidance and authenticity from isolation.",
    ),
  ],
  "growth-risks": [
    block(
      "infp-risks-bridge",
      "guidance",
      "Growth Through Tested Narratives",
      "Development may involve expressing needs before disengaging, choosing among several meaningful possibilities, distinguishing a value conflict from ordinary discomfort, and giving ideals a practical form before inspiration fades. Other risks include personalising impersonal constraints, avoiding structure that could protect creative work, and waiting for perfect inner certainty. These are not fixed defects. The following sections preserve authenticity and imagination while strengthening boundaries, commitment, collaboration, and sustainable expression.",
    ),
  ],
  "core-personality-pattern": [
    block(
      "infp-core-summary",
      "summary",
      "Inner Congruence and Emerging Possibility",
      "The central INFP pattern often involves sensing whether an experience feels congruent with personal values, then exploring possibilities that could express those values more honestly. Meaning may develop privately before it becomes visible as language, art, advocacy, care, or a life choice. At its best, this protects human individuality while opening alternatives to inherited expectations. The dynamic slots below qualify how exploration changes with confidence, balance, and adjacent preferences.",
      [
        {
          id: "infp-combination-narrative",
          source: "combination",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
        {
          id: "infp-balanced-dimensions",
          source: "confidence",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
    block(
      "infp-core-analysis",
      "analysis",
      "Understanding the Narrative Before Acting",
      "An INFP may first ask which mechanism best explains the observed outcome. Instead of treating each issue separately, the person examines assumptions, dependencies, information flow, and competing explanations. This can prevent superficial fixes and reveal a simpler account. It becomes limiting when exploration stays private or when present facts are forced to fit a preferred theory. A values-led narrative must remain a testable explanation of reality, not a substitute for contact with it.",
    ),
    block(
      "infp-core-strength",
      "strength",
      "Concentrated Deep Leverage",
      "A developed expression can sustain attention on a consequential objective while resisting short-term noise. The INFP may identify a small structural change that improves many downstream decisions, sequence work around dependencies, and protect resources for outcomes that take time. This values-led concentration is strongest when review points invite disconfirming evidence and when collaborators understand enough of the narrative to exercise judgement rather than merely follow instructions.",
    ),
    block(
      "infp-core-risk",
      "risk",
      "When Coherence Becomes Premature Certainty",
      "A narrative that explains many observations can begin to feel complete before critical assumptions have been tested. The INFP may discount local objections as short-term thinking or interpret disagreement as failure to understand the system. This can create elegant plans with weak adoption or hidden operational costs. Confidence should rise when the values-led narrative survives serious evidence, not simply because it has become internally consistent.",
    ),
    block(
      "infp-core-reflection",
      "analysis",
      "What Could Change the Narrative?",
      "Choose one values-led conclusion you currently hold. Which observations support it, which assumptions connect those observations, and what evidence would require revision? Who has access to facts you do not? Share the narrative before it is finished and ask for the strongest counterexample. The goal is not to surrender independent judgement, but to ensure independence produces a design that can withstand reality outside your own reasoning.",
    ),
  ],
  "motivation-and-needs": [
    block(
      "infp-motivation-summary",
      "summary",
      "Mastery, Autonomy, and Meaningful Progress",
      "INFPs may feel engaged by complex problems, room for independent judgement, opportunities to build competence, and work whose long-term consequence justifies concentrated effort. Motivation often rises when the objective is meaningful and methods are not constrained by unnecessary convention. Not every INFP wants formal authority or solitary work. The deeper need is usually control over attention and enough coherence to invest effort without constant arbitrary interruption.",
    ),
    block(
      "infp-motivation-reflection",
      "analysis",
      "Autonomy in Service of a System",
      "Independence can protect the uninterrupted thought required for difficult values-led narrative. The person may resist oversight that focuses on visible activity rather than reasoning or outcomes. Autonomy is most productive when paired with transparent constraints, review, and responsibility for consequences. Without those anchors, self-direction can become insulation from feedback. The useful question is which decisions need protected judgement and which improve through earlier collaboration.",
    ),
    block(
      "infp-motivation-strength",
      "strength",
      "Patience for Difficult Improvement",
      "When a goal matters, the INFP may tolerate a long learning curve and invest in foundations that produce little immediate recognition. This can support deep expertise, careful design, and improvements that outlast a short campaign. The strength depends on periodic contact with users, operators, or other evidence. Persistence is valuable when the direction remains sound, not when effort continues mainly because changing the narrative feels like wasted competence.",
    ),
    block(
      "infp-motivation-risk",
      "risk",
      "Understanding as Protection",
      "Values-Led mastery can become a defence against uncertainty, dependence, or visible incompleteness. The person may keep researching until help feels unnecessary, avoid a practical task whose variables are untidy, or treat an unresolved exception as a reason not to expose the narrative. Understanding remains valuable, but confidence becomes more resilient when exploration includes unfinished knowledge, shared experiments, and correction by people who know a different part of the problem.",
    ),
    block(
      "infp-motivation-guidance",
      "guidance",
      "Define Progress Beyond a Better Explanation",
      "For a major exploration, name the question the narrative must answer and the observable result that would make it useful. Separate essential logical defects from questions that can remain open. Choose a small expression that produces new evidence, then share one unresolved assumption before researching it alone. Progress includes clearer reasoning, but it also includes contact with reality, learning from use, and knowing when another refinement has lower value than a test.",
    ),
  ],
  "information-processing": [
    block(
      "infp-information-summary",
      "summary",
      "Patterns, Trajectories, and System Values",
      "An INFP pattern often attends to underlying structure, future implications, and the few variables that organise many surface events. Information becomes useful when it clarifies a trajectory or improves the internal narrative of the system. This can support values-led foresight, provided abstraction remains connected to current measurements, operational detail, and alternative explanations. Pattern recognition generates hypotheses; it does not remove the need for evidence.",
    ),
    block(
      "infp-information-reflection",
      "analysis",
      "Testing the Boundaries of a Narrative",
      "The person may organise many observations into a compact account, then examine edge cases to discover where its values fails. This can reveal hidden categories and produce more precise explanations. It can also expand indefinitely as every exception creates another branch. Record the narrative's intended scope, the anomalies that materially challenge it, and the questions that can wait. Authenticity improves when boundaries are explicit, not when one explanation attempts to absorb every possible case.",
    ),
    block(
      "infp-information-strength",
      "strength",
      "Seeing Second-Order Consequences",
      "INFPs may naturally ask what a present decision makes more likely later: which dependency grows, which incentive changes, or which capability becomes difficult to recover. This can protect a team from attractive short-term fixes. The strength becomes practical when future consequences are translated into observable indicators and when probability is communicated honestly rather than as inevitable foresight.",
    ),
    block(
      "infp-information-risk",
      "risk",
      "Filtering Out Inconvenient Reality",
      "Once the organising pattern feels clear, data that does not fit may be labelled exceptional, political, or too operational. Yet one inconvenient detail can reveal a mistaken assumption or a stakeholder cost the values-led narrative ignores. The risk is not abstraction itself; it is allowing the narrative to determine which evidence counts. Open-Endedly preserve anomalies until they are explained rather than removed from the values-led picture.",
    ),
    block(
      "infp-information-guidance",
      "guidance",
      "Maintain a Narrative and an Anomaly Log",
      "Write the current system narrative, its three most important assumptions, and the indicators expected if it is correct. Beside it, keep observations that do not fit. Review both with someone close to expression. Revise the values-led narrative when anomalies form a pattern, and record why. This protects deep coherence while ensuring that evidence can genuinely change the direction.",
    ),
  ],
  "decision-making": [
    block(
      "infp-decisions-summary",
      "summary",
      "Convictions, Consequence, and Open-Ended Commitment",
      "INFPs may prefer decisions grounded in explicit objectives, internal consistency, evidence, and long-term consequence. They often want enough time to understand the values-led narrative before committing, then may hold the chosen direction steadily. This can reduce reactive switching. Good judgement still includes human impact, reversibility, and unknowns. A logically coherent choice can fail when the convictions omit adoption, ethics, or information held by others.",
    ),
    block(
      "infp-decisions-reflection",
      "analysis",
      "Choosing Without Betraying Every Alternative",
      "The INFP may delay a decision when each option protects a different value or possible future. Keeping the choice open can preserve integrity while also leaving collaborators unable to plan and preventing any option from being tested in lived experience. Name the value that matters most in this decision, the value that will receive less protection, and one repair if that cost appears. A time-bounded commitment can express values without claiming that every competing possibility was wrong.",
    ),
    block(
      "infp-decisions-strength",
      "strength",
      "Resisting Short-Term Pressure",
      "An INFP may hold a values-led choice when immediate incentives favour convenience, status, or conformity. By connecting the decision to personal integrity and human consequence, the person can protect what might otherwise be overlooked. This strength needs reality checks so conviction does not become immunity from practical evidence. The choice should remain stable because values and experience still support it, not because revision feels inauthentic.",
    ),
    block(
      "infp-decisions-risk",
      "risk",
      "Optimising the Wrong Convictions",
      "Precise reflection can produce a poor decision when the governing convictions are incomplete. Efficiency, scalability, or logical elegance may be optimised while trust, accessibility, timing, or transition cost remains outside the narrative. Those consequences later return as expression failure. Before finalising, ask who defines success, who bears the cost, and which qualitative evidence should influence the choice.",
    ),
    block(
      "infp-decisions-guidance",
      "guidance",
      "Expose the Decision Narrative",
      "Document the question, current best narrative, decisive criterion, strongest counterexample, and evidence that would change the choice. Share the reasoning while alternatives are still genuinely available. Then distinguish the next committed action from the theories that remain open to revision. This keeps decisions testable without turning every uncertainty into delay and helps collaborators contribute evidence instead of guessing which part of the values can still move.",
    ),
  ],
  "communication": [
    block(
      "infp-communication-summary",
      "summary",
      "Concise, Open-Ended, and Selective",
      "INFPs may prefer communication that has a clear purpose, coherent reasoning, and enough substance to justify attention. They may speak selectively after internal processing rather than narrate each step. This can make contributions focused, but others cannot infer the private narrative automatically. Effective communication translates values-led narrative into context, assumptions, decisions, and invitations for evidence without requiring constant social performance.",
    ),
    block(
      "infp-communication-analysis",
      "analysis",
      "The Missing Middle of the Reasoning",
      "Because the INFP has already connected many steps internally, an explanation may move from problem to conclusion while omitting the bridge. Listeners can experience the result as abrupt or unsupported. The answer is not greater volume; it is a visible values chain. State what you observed, what it suggests, which uncertainty remains, and why the recommendation follows.",
    ),
    block(
      "infp-communication-risk",
      "risk",
      "Under-Communication and Assumed Understanding",
      "The person may delay sharing until the narrative feels sufficiently refined, then become frustrated when others lack context or raise questions already resolved privately. Silence can be interpreted as distance, agreement, or lack of interest. Under pressure, concise correction may also sound dismissive. Communicate earlier enough that others can influence the work, not merely receive the completed values-led narrative.",
    ),
    block(
      "infp-communication-guidance",
      "guidance",
      "Share the Draft Narrative",
      "Use a brief sequence: question, current explanation, strongest evidence, unresolved exception, and requested challenge. Mark the narrative as provisional while making the immediate decision explicit. When disagreeing, identify the premise, category, or inference that differs rather than only rejecting the conclusion. This gives other people an inspectable reasoning path and turns authenticity into a shared resource rather than a private standard they cannot see.",
    ),
    block(
      "infp-communication-reflection",
      "analysis",
      "What Was Visible to Others?",
      "Review a recent decision that felt obvious to you. What information did collaborators actually receive, and which connections existed only in your own narrative? Did you ask for evidence early enough to change the direction? What emotional or practical concern was relevant even if it was expressed imprecisely? Clear values-led narrative becomes influential when other people can inspect and use it.",
    ),
  ],
  "teamwork-and-leadership": [
    block(
      "infp-teamwork-summary",
      "summary",
      "Architecting Capability and Direction",
      "In teams, an INFP may contribute by clarifying the underlying problem, testing assumptions, protecting focus, and connecting ideas across domains. Leadership can be quiet and question-led rather than socially dominant. The person may prefer capable colleagues with meaningful autonomy. Effective teamwork requires making reasoning visible, learning from local expertise, and recognising that coordination is not a distraction from exploration but part of how exploration becomes useful.",
    ),
    block(
      "infp-teamwork-reflection",
      "analysis",
      "Collaboration With Room for Individual Voice",
      "The INFP may engage deeply when people can contribute without flattening their values or experience into the dominant position. This can make space for overlooked perspectives, while discomfort with forceful group process may lead the person to withhold a concern until the direction is difficult to change. State the concern as an observable consequence and the value it affects, ask who else sees the situation differently, and agree how the group will decide after each voice is heard.",
    ),
    block(
      "infp-teamwork-strength",
      "strength",
      "Designing for Independent Judgement",
      "A developed INFP can create frameworks that help others make consistent decisions without central approval. Clear principles, interfaces, and feedback loops can distribute capability while preserving coherence. This form of leadership scales better than personal control. It works when the values-led narrative includes space for local adaptation and when people understand how to challenge a rule that no longer serves the objective.",
    ),
    block(
      "infp-teamwork-risk",
      "risk",
      "Retreating From Imperfect Collaboration",
      "When meetings are inefficient or reasoning feels weak, the INFP may withdraw and solve the problem alone. This can produce a sharper immediate narrative but reduce ownership, learning, and access to operational knowledge. Repeated withdrawal also reinforces the belief that collaboration adds little value. Improve the structure of collaboration before abandoning it: narrow the question, prepare evidence, assign decision ownership, and leave defined assumptions open to challenge.",
    ),
    block(
      "infp-teamwork-guidance",
      "guidance",
      "Create a Challengeable Narrative",
      "State the values-led principles, constraints, and interfaces that guide the team. Give owners authority within those boundaries and establish review points based on evidence. Invite a designated critic to test assumptions and include operational voices before finalising standards. The aim is a system others can understand, adapt, and improve—not one that functions only when the original architect is present.",
    ),
  ],
  "career-environment": [
    block(
      "infp-career-summary",
      "summary",
      "Depth, Autonomy, and Deep Consequence",
      "INFPs may prefer work that rewards independent judgement, complex systems thinking, learning, and sustained improvement. Exploration, technology, research, design, policy, or specialised leadership can offer these conditions, but no career belongs to a type. Fit depends on interests, expertise, values, resources, and organisational reality. The relevant question is whether the work permits depth while connecting private reflection to meaningful external outcomes.",
    ),
    block(
      "infp-career-reflection",
      "analysis",
      "The Need for Protected Attention",
      "Frequent interruption and performative activity can make it difficult to build a coherent narrative of complex work. The INFP may need blocks of uninterrupted time and clear decision ownership. Total isolation is not the answer; exploration requires contact with users, colleagues, and changing evidence. A supportive environment alternates focused reflection with purposeful collaboration rather than treating either constant availability or solitary independence as ideal.",
    ),
    block(
      "infp-career-example",
      "example",
      "Work That Rewards Values-Led Depth",
      "Writing, design, counselling-related work with appropriate qualifications, education, advocacy, research, community initiatives, creative practice, or mission-led product work may reward attention to meaning and individual experience. The same job title can vary widely. Examine whether daily work supports authentic contribution, craft, ethical agency, and enough structure to turn values into sustained expression rather than relying on occupational stereotypes.",
    ),
    block(
      "infp-career-risk",
      "risk",
      "Keeping Every Career Possibility Open",
      "A rich map of possible fields can make any single role appear intellectually narrow once its routines become visible. The person may continue comparing paths, redesign a private learning plan, or wait for work that permits unrestricted exploration. Real expertise, however, develops through sustained contact with constraints and expression. Choose a domain whose questions remain meaningful, then use actual projects to discover whether the environment supports depth rather than evaluating careers only as abstract possibilities.",
    ),
    block(
      "infp-career-guidance",
      "guidance",
      "Evaluate Values-Led Fit",
      "Assess roles across problem depth, autonomy, evidence quality, learning range, expression ownership, and access to capable challenge. Ask how hypotheses are tested and whether deep work survives short-term pressure. Also identify the communication and relationship work required for influence. Choose an environment where values-led clarity matters, then build the skills that help other people understand and use it.",
    ),
  ],
  "relationship-dynamics": [
    block(
      "infp-relationships-summary",
      "summary",
      "Selective Trust and Open-Ended Commitment",
      "INFPs may invest deeply in relationships that allow honesty, emotional nuance, individual difference, and authentic self-expression. Care may appear through close listening, symbolic gestures, advocacy, or loyalty to another person's inner experience. People vary widely, and a type code cannot explain attachment or intimacy. Relationships become stronger when private feeling, boundaries, and expectations are communicated rather than assumed to be self-evident.",
    ),
    block(
      "infp-relationships-reflection",
      "analysis",
      "Internal Commitment, External Ambiguity",
      "The INFP may assume that continued presence, practical help, or careful thought clearly communicates care. Another person may need direct appreciation, emotional acknowledgement, or more frequent contact. Neither form is inherently superior. Ask how care is received rather than relying only on the form that feels most sincere to give. Translation protects authenticity while making commitment accessible.",
    ),
    block(
      "infp-relationships-strength",
      "strength",
      "Depth Without Performance",
      "A developed expression can offer steadiness, candid reflection, respect for autonomy, and willingness to engage difficult long-term problems. The INFP may avoid superficial reassurance and take another person's goals seriously. This can create trust when reflection is invited and emotion is not treated as noise. Deep connection includes being present with an experience that cannot immediately be optimised.",
    ),
    block(
      "infp-relationships-risk",
      "risk",
      "Analysing the Relationship Instead of Entering It",
      "When misunderstood or emotionally overloaded, the person may retreat into interpretation: reviewing inconsistencies, meaning-making motives, or searching for the precise explanation before speaking. This can create short-term distance from intensity but leaves the other person outside the process. A theory about the relationship may harden without direct evidence. Ask one sincere question, name the need for processing time, and agree when conversation will resume before private reflection becomes an alternative to repair.",
    ),
    block(
      "infp-relationships-guidance",
      "guidance",
      "Express the Value Without Making It a Verdict",
      "Practise naming the value that feels affected, the emotion present, and one request the other person can freely answer. In conflict, distinguish personal incongruence from a judgement about someone else's character. Ask what matters to them before deciding the difference is irreconcilable. Authenticity does not require total disclosure; it requires enough honest participation that closeness is not governed by a private moral narrative.",
    ),
  ],
  "change-and-adaptation": [
    block(
      "infp-change-summary",
      "summary",
      "Adapting the Narrative",
      "INFPs may anticipate change by meaning-making future conditions and preparing a coherent route before disruption arrives. They can support transformation when current systems no longer fit long-term needs. Adaptation becomes harder when change contradicts a deeply developed narrative or arrives without intelligible purpose. The dynamic slot below examines how adjacent preferences may make planning more iterative, practical, or collaborative.",
      [
        {
          id: "infp-combination-adaptation",
          source: "combination",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
    block(
      "infp-change-reflection",
      "analysis",
      "Revision Versus Abandoning the Vision",
      "Because values-led narratives integrate many decisions, revising one assumption can feel as though the whole values-led narrative is being destabilised. The person may defend the original direction longer than evidence warrants. Separate the underlying purpose from the current design. A narrative can change while the deeper objective remains intact, and revision often demonstrates stronger exploration than preserving a coherent but inaccurate forecast.",
    ),
    block(
      "infp-change-strength",
      "strength",
      "Preparing for Second-Order Effects",
      "The INFP may notice that a transition changes incentives, capabilities, and future options beyond the immediate expression plan. This supports more responsible sequencing and can protect resources others overlook. The strength is most useful when affected people help test the forecast. Change values-led narrative should include lived transition costs, not only the final system's values-led advantages.",
    ),
    block(
      "infp-change-risk",
      "risk",
      "Rigidity Hidden as Values-Led Consistency",
      "A reluctance to revise may be explained as protecting the long term even when evidence has changed. The person can selectively interpret setbacks as poor expression rather than a flawed assumption. This delays learning and may place growing demands on others. Define failure and review convictions before expression so adaptation does not depend on admitting the entire vision was mistaken.",
    ),
    block(
      "infp-change-guidance",
      "guidance",
      "Version the Exploration",
      "Treat the plan as a versioned narrative. Record assumptions, expected indicators, review dates, and which elements are stable versus experimental. At each review, identify what reality confirmed, contradicted, or left unresolved. Invite someone independent to challenge the interpretation. Updating a version preserves learning and direction while preventing consistency from becoming attachment to one expression.",
    ),
  ],
  "stress-and-recovery": [
    block(
      "infp-stress-summary",
      "summary",
      "Contraction, Control, and Over-Isolation",
      "Under sustained stress, an INFP may withdraw, narrow attention, intensify private planning, or become unusually critical of inefficiency and interruption. At other times the person may react through impulsive sensory activity or urgent attempts to control immediate details. Stress responses vary and are not diagnostic. The useful task is identifying the earliest loss of flexibility, communication, sleep, or perspective for this individual.",
    ),
    block(
      "infp-stress-reflection",
      "analysis",
      "When Reflection Stops Restoring",
      "Solitude can restore cognitive space, but under sustained pressure it may become repetitive narrative-building without new evidence or emotional processing. The person can feel mentally active while circling the same contradiction, opening more research paths, and postponing contact with the concrete source of strain. Recovery needs a stopping rule: reduce input, write the unresolved question down, restore physical routines, and seek one grounded observation or trusted conversation before resuming reflection.",
    ),
    block(
      "infp-stress-evidence",
      "evidence",
      "Personal Early-Warning Signals",
      "Possible signals include abandoning routines for an absorbing possibility, interpreting ordinary compromise as inauthenticity, avoiding messages that require a decision, idealising a different life, or withdrawing after a value feels unseen. These signs are individual rather than universal. Track what appears before sleep, judgement, health, or relationship quality declines. Ask a trusted person which change in follow-through or emotional availability they notice first.",
    ),
    block(
      "infp-stress-risk",
      "risk",
      "Solving Pressure With More Reflection",
      "When the problem involves grief, exhaustion, conflict, or limited control, another plan may create temporary distance without resolving the experience. The INFP may analyse causes while remaining disconnected from support or bodily needs. Values-Led thinking is still available later. Immediate recovery may require naming the feeling, reducing obligations, accepting uncertainty, or asking directly for help.",
    ),
    block(
      "infp-stress-guidance",
      "guidance",
      "Ground, Communicate, and Reduce Scope",
      "Pause one nonessential optimisation, restore sleep and movement, and choose one concrete task that can be finished without redesigning the system. Tell a trusted person that capacity is reduced and specify the support needed. Revisit values-led conclusions after recovery and new evidence. If distress is persistent or significantly affects functioning, seek appropriate professional support rather than using type language as an explanation.",
    ),
  ],
  "growth-roadmap": [
    block(
      "infp-growth-summary",
      "summary",
      "From Private Vision to Shared Capability",
      "INFP development is not about abandoning independence or deep thought. It involves making narratives challengeable, communicating before certainty, distinguishing excellence from reflection paralysis, and allowing relationship and operational evidence to shape the values-led narrative. Growth expands values-led range: the person can still protect depth while involving others early enough to improve and carry the work. The dynamic slot below highlights combinations affecting this path.",
      [
        {
          id: "infp-combination-isolation-risk",
          source: "combination",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
    block(
      "infp-growth-reflection",
      "analysis",
      "Collaboration as Narrative Testing",
      "Collaboration need not mean surrendering authenticity or accepting an unfocused group process. At its best, another person supplies observations, domain constraints, and counterexamples unavailable to one line of reasoning. The developmental task is to pose a question narrow enough for useful challenge while remaining willing to revise the premise itself. A conversation that can add detail but cannot alter the narrative is explanation, not genuine testing.",
    ),
    block(
      "infp-growth-risk",
      "risk",
      "Reflection Paralysis Disguised as Readiness",
      "The person may delay expression, commitment, or conversation until it feels fully congruent with every value and nuance. This preserves an ideal of authenticity but prevents experience from shaping the work. Reflection paralysis often magnifies possible misrepresentation while the intended contribution remains invisible. Define the essential value, choose an honest provisional form, and let real response refine what private reflection cannot complete.",
    ),
    block(
      "infp-growth-guidance",
      "guidance",
      "Practise Earlier Exposure",
      "Choose one narrative, proposal, or concern and share it at sixty-percent clarity with a trusted, relevant person. State what is stable, what is uncertain, and what feedback could change the direction. Resist solving every objection immediately; record it and review the values-led narrative later. Repeat weekly so visibility becomes part of rigorous thinking rather than a threat to it.",
    ),
    block(
      "infp-growth-action",
      "action",
      "A Monthly Assumption Review",
      "Once a month, select one values-led exploration and review what it expressed, who experienced its effects, where reality differed from imagination, and which promise remains. Identify one conviction that strengthened and one interpretation that changed. Share the revision in an authentic form. This creates practical humility while preserving the INFP's strength in personal meaning and imaginative depth.",
    ),
  ],
  "ninety-day-action-plan": [
    block(
      "infp-action-summary",
      "summary",
      "A Ninety-Day Narrative-to-Expression Practice",
      "Use the next ninety days to test whether earlier exposure improves a meaningful values-led outcome. Choose one project that requires both deep reflection and adoption by others. Preserve focused work, but make assumptions and provisional decisions visible at planned intervals. The objective is a stronger values-led narrative that other people can understand, challenge, and execute—not maximum consensus or a flawless plan.",
    ),
    block(
      "infp-action-days-1-30",
      "action",
      "Days 1–30 · Name Values and Choose a Medium",
      "Choose one idea or commitment you want to express. Write the value it serves, the people affected, the concrete outcome you hope to create, and the trade-off you are willing to accept. Ask two trusted people what is clear and what remains private or abstract. Select one small form—a conversation, draft, prototype, or contribution—that can carry the idea into shared reality.",
    ),
    block(
      "infp-action-days-31-60",
      "action",
      "Days 31–60 · Express and Observe",
      "Complete and share the selected form by a fixed date. Ask recipients what they understood, what moved them, and what practical response it enabled rather than asking only whether they liked it. Record where your intention and their experience differed. Revise once using that evidence, while protecting the central value from endless accommodation.",
    ),
    block(
      "infp-action-days-61-90",
      "action",
      "Days 61–90 · Commit and Integrate",
      "Choose one sustained practice that carries the value beyond a single expression, assign it a schedule or owner, and define what completion looks like. Invite another person to adapt the contribution without requiring exact agreement with your original meaning. Review whether the work produced the intended human or practical effect, then decide explicitly to continue, revise, or close it.",
    ),
    block(
      "infp-action-review",
      "analysis",
      "Evidence of Development",
      "Review concrete indicators: assumptions shared early, counterexamples retained, useful versions released, decisions revised from evidence, and responsibility distributed without loss of coherence. Ask collaborators whether the reasoning became easier to understand and challenge. Development is demonstrated by repeated behaviour under real conditions, not by agreement with an attractive values-led identity.",
    ),
    block(
      "infp-action-guidance",
      "guidance",
      "Protect Depth Without Returning to Isolation",
      "If collaboration becomes noisy, improve its structure rather than abandoning it. Narrow the question, request evidence in advance, and separate consultation from decision rights. If reflection paralysis delays delivery, reduce scope while preserving the critical quality standard. The plan succeeds when independent thought and external correction become parts of one reliable process.",
    ),
  ],
  methodology: [
    block(
      "infp-methodology-framework",
      "analysis",
      "How to Use This Report",
      "This report interprets an MBTI-style preference result using EI, SN, TF, and JP dimensions, confidence values, static type-level content, and matched dynamic rules. It describes tendencies for reflection. It is not a clinical diagnosis, intelligence test, capability assessment, or scientifically absolute account of personality. No section should be used alone for consequential employment, educational, relationship, financial, or health decisions.",
    ),
    block(
      "infp-methodology-variation",
      "evidence",
      "Context and Individual Variation",
      "People sharing an INFP result can differ substantially because of culture, age, expertise, responsibilities, health, values, environment, and development. Balanced or lower-confidence dimensions increase the likelihood that neighbouring preferences are similarly accessible. Give repeated lived evidence more weight than a type stereotype, and treat descriptions that do not fit as information rather than a failure to match the code.",
    ),
    block(
      "infp-methodology-dynamic",
      "analysis",
      "Dynamic Interpretation",
      "Generated reports select rule content from supplied dimension scores and confidence patterns. Applied-rule metadata records which adaptations were inserted, supporting traceability across report, content, and rule versions. Dynamic text can qualify a broad narrative, but it cannot infer motive, history, maturity, mental health, or future outcomes. Interpretation remains a reflective aid rather than an automated judgement.",
    ),
    block(
      "infp-methodology-version",
      "guidance",
      "Version and Responsible Review",
      "Report version: 1.0.0. Content version: 1.0.0. Rule version: 1.0.0. These identifiers preserve the source used to generate a result as content and rules evolve. Revisit the report when circumstances or self-understanding change, compare it with feedback and behaviour, and retain only interpretations that support accurate and responsible reflection.",
    ),
  ],
};

export const INFP_COMPLETE_REPORT:
  CompletePersonalityReportDefinition = {
    personalityType: "INFP",
    version: COMPLETE_PERSONALITY_REPORT_VERSION,
    title: { en: "INFP Complete Personality Report" },
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
