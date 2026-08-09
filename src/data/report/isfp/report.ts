import {
  COMPLETE_PERSONALITY_REPORT_STANDARD,
  COMPLETE_PERSONALITY_REPORT_VERSION,
} from "../report-standard";
import type {
  CompletePersonalityReportDefinition,
  ReportContentBlock,
  ReportDynamicSlot,
} from "../types";
import { localizeIsfpBlock } from "./localization";

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
  const localized = localizeIsfpBlock(id);

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
      "isfp-identity-summary",
      "summary",
      "Your Complete ISFP Report",
      "This report examines an ISFP preference pattern through values-grounded craft, evidence, decisions, communication, work, relationships, stress, and development. It treats the type code as a hypothesis about preferred ways of organising attention—not as a fixed identity, clinical judgement, or promise of competence. Culture, experience, responsibilities, trust, and learned skills can change the visible pattern substantially. Use both recognition and mismatch to refine an account grounded in repeated behaviour.",
    ),
  ],
  "personality-overview": [
    block(
      "isfp-overview-summary",
      "summary",
      "Values-Grounded Craft and Responsive Expression",
      "An ISFP pattern often combines inward values awareness, imaginative experience, sensitivity to personal authentic contribution, and openness to finding an authentic route. The ISFP contributor may explore how an experience aligns with deeply held convictions, then express that authentic contribution through choices, relationships, language, or crafted work. This values-grounded craft can support originality and compassion, but authenticity still requires evidence, communication, practical action, and respect for values that differ. Intensity of conviction is not proof of universal correctness.",
    ),
  ],
  "dimension-results": [
    block(
      "isfp-dimensions-context",
      "analysis",
      "Reading the Four Dimensions",
      "An ISFP result combines preferences across EI, SN, TF, and JP, but strength and confidence can alter the expression considerably. A more outward EI score may make craft collaborative, a practical SN result may begin with operational evidence, a balanced TF result can integrate stakeholder consequences, and a flexible JP result may preserve more iteration. The dynamic interpretations below qualify broad type themes. Compare them with behaviour across expertise, culture, role, trust, and pressure.",
      [
        {
          id: "isfp-ei-craft",
          source: "dimension",
          dimensions: ["EI"],
        },
        {
          id: "isfp-sn-expression",
          source: "dimension",
          dimensions: ["SN"],
        },
        {
          id: "isfp-tf-convictions",
          source: "dimension",
          dimensions: ["TF"],
        },
        {
          id: "isfp-jp-openness",
          source: "dimension",
          dimensions: ["JP"],
        },
        {
          id: "isfp-overall-confidence",
          source: "confidence",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
  ],
  "key-strengths": [
    block(
      "isfp-strengths-bridge",
      "summary",
      "Strengths in Context",
      "Likely ISFP strengths include ethical sensory awareness, authentic expression, empathy for individual experience, openness to unconventional possibilities, and willingness to protect authentic contribution that a dominant system overlooks. These are preferences rather than guaranteed skills. Their value depends on craft, context, boundaries, practical follow-through, and willingness to translate private convictions into forms other people can understand and test. Later sections distinguish principled flexibility from avoidance and authenticity from isolation.",
    ),
  ],
  "growth-risks": [
    block(
      "isfp-risks-bridge",
      "guidance",
      "Growth Through Tested Expressions",
      "Authentic development may involve expressing needs before disengaging, choosing among several meaningful possibilities, distinguishing a value conflict from ordinary discomfort, and giving personal values a practical form before inspiration fades. Other risks include personalising impersonal constraints, avoiding structure that could protect crafted work, and waiting for perfect inner certainty. These are not fixed defects. The following sections preserve authenticity and sensory awareness while strengthening boundaries, commitment, collaboration, and sustainable expression.",
    ),
  ],
  "core-personality-pattern": [
    block(
      "isfp-core-summary",
      "summary",
      "Inner Congruence and Emerging Experience",
      "The central ISFP pattern often involves sensing whether an experience feels congruent with personal values, then exploring possibilities that could express those values more honestly. Authentic Contribution may develop privately before it becomes visible as language, art, advocacy, care, or a life choice. At its best, this protects human individuality while opening alternatives to inherited expectations. The dynamic slots below qualify how craft changes with confidence, balance, and adjacent preferences.",
      [
        {
          id: "isfp-combination-expression",
          source: "combination",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
        {
          id: "isfp-balanced-dimensions",
          source: "confidence",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
    block(
      "isfp-core-analysis",
      "analysis",
      "Understanding the Expression Before Acting",
      "An ISFP may first ask which mechanism best explains the observed outcome. Instead of treating each issue separately, the ISFP contributor examines assumptions, dependencies, information flow, and competing explanations. This values-grounded craft can prevent superficial fixes and reveal a simpler account. It becomes limiting when craft stays private or when present facts are forced to fit a preferred theory. A crafted response must remain a testable explanation of reality, not a substitute for contact with it.",
    ),
    block(
      "isfp-core-strength",
      "strength",
      "Concentrated Deep Leverage",
      "A developed expression can sustain attention on a consequential objective while resisting short-term noise. The ISFP may identify a small structural change that improves many downstream decisions, sequence work around dependencies, and protect resources for outcomes that take time. This values-grounded concentration is strongest when review points invite disconfirming evidence and when collaborators understand enough of the expression to exercise judgement rather than merely follow instructions.",
    ),
    block(
      "isfp-core-risk",
      "risk",
      "When Coherence Becomes Premature Certainty",
      "A expression that explains many observations can begin to feel complete before critical assumptions have been tested. The ISFP may discount local objections as short-term thinking or interpret disagreement as failure to understand the system. This values-grounded craft can create elegant plans with weak adoption or hidden operational costs. Confidence should rise when the crafted response survives serious evidence, not simply because it has become internally consistent.",
    ),
    block(
      "isfp-core-reflection",
      "analysis",
      "What Could Change the Expression?",
      "Choose one values-grounded conclusion you currently hold. Which observations support it, which assumptions connect those observations, and what evidence would require revision? Who has access to facts you do not? Share the expression before it is finished and ask for the strongest counterexample. The goal is not to surrender independent judgement, but to ensure independence produces a design that can withstand reality outside your own reasoning.",
    ),
  ],
  "motivation-and-needs": [
    block(
      "isfp-motivation-summary",
      "summary",
      "Mastery, Autonomy, and Authentic Contributionful Progress",
      "ISFPs may feel engaged by complex problems, room for independent judgement, opportunities to build competence, and work whose long-term consequence justifies concentrated effort. Motivation often rises when the objective is meaningful and methods are not constrained by unnecessary convention. Not every ISFP wants formal authority or solitary work. The deeper need is usually control over attention and enough coherence to invest effort without constant arbitrary interruption.",
    ),
    block(
      "isfp-motivation-reflection",
      "analysis",
      "Autonomy in Service of a System",
      "Independence can protect the uninterrupted thought required for difficult crafted response. The ISFP contributor may resist oversight that focuses on visible activity rather than reasoning or outcomes. Autonomy is most productive when paired with transparent constraints, review, and responsibility for consequences. Without those anchors, self-direction can become insulation from feedback. The useful question is which decisions need protected judgement and which improve through earlier collaboration.",
    ),
    block(
      "isfp-motivation-strength",
      "strength",
      "Patience for Difficult Improvement",
      "When a goal matters, the ISFP may tolerate a long learning curve and invest in foundations that produce little immediate recognition. This values-grounded craft can support deep expertise, careful design, and improvements that outlast a short campaign. The strength depends on periodic contact with users, operators, or other evidence. Persistence is valuable when the direction remains sound, not when effort continues mainly because changing the expression feels like wasted competence.",
    ),
    block(
      "isfp-motivation-risk",
      "risk",
      "Understanding as Protection",
      "Values-Grounded mastery can become a defence against uncertainty, dependence, or visible incompleteness. The ISFP contributor may keep researching until help feels unnecessary, avoid a practical task whose variables are untidy, or treat an unresolved exception as a reason not to expose the expression. Understanding remains valuable, but confidence becomes more resilient when craft includes unfinished knowledge, shared experiments, and correction by people who know a different part of the problem.",
    ),
    block(
      "isfp-motivation-guidance",
      "guidance",
      "Define Progress Beyond a Better Explanation",
      "For a major craft, name the question the expression must answer and the observable result that would make it useful. Separate essential logical defects from questions that can remain open. Choose a small expression that produces new evidence, then share one unresolved assumption before researching it alone. Progress includes clearer reasoning, but it also includes contact with reality, learning from use, and knowing when another refinement has lower value than a test.",
    ),
  ],
  "information-processing": [
    block(
      "isfp-information-summary",
      "summary",
      "Patterns, Trajectories, and System Values",
      "An ISFP pattern often attends to underlying structure, immediate context implications, and the few variables that organise many surface events. Information becomes useful when it clarifies a trajectory or improves the internal expression of the system. This values-grounded craft can support values-grounded foresight, provided abstraction remains connected to current measurements, operational detail, and alternative explanations. Pattern recognition generates hypotheses; it does not remove the need for evidence.",
    ),
    block(
      "isfp-information-reflection",
      "analysis",
      "Testing the Boundaries of a Expression",
      "The ISFP contributor may organise many observations into a compact account, then examine edge cases to discover where its values fails. This values-grounded craft can reveal hidden categories and produce more precise explanations. It can also expand indefinitely as every exception creates another branch. Record the expression's intended scope, the anomalies that materially challenge it, and the questions that can wait. Authenticity improves when boundaries are explicit, not when one explanation attempts to absorb every possible case.",
    ),
    block(
      "isfp-information-strength",
      "strength",
      "Seeing Second-Order Consequences",
      "ISFPs may naturally ask what a present decision makes more likely later: which dependency grows, which incentive changes, or which capability becomes difficult to recover. This values-grounded craft can protect a team from attractive short-term fixes. The strength becomes practical when immediate context consequences are translated into observable indicators and when probability is communicated honestly rather than as inevitable foresight.",
    ),
    block(
      "isfp-information-risk",
      "risk",
      "Filtering Out Inconvenient Reality",
      "Once the organising pattern feels clear, data that does not fit may be labelled exceptional, political, or too operational. Yet one inconvenient detail can reveal a mistaken assumption or a stakeholder cost the crafted response ignores. The values tension is not abstraction itself; it is allowing the expression to determine which evidence counts. Open-Endedly preserve anomalies until they are explained rather than removed from the values-grounded picture.",
    ),
    block(
      "isfp-information-guidance",
      "guidance",
      "Maintain a Expression and an Anomaly Log",
      "Write the current system expression, its three most important assumptions, and the indicators expected if it is correct. Beside it, keep observations that do not fit. Review both with someone close to expression. Revise the crafted response when anomalies form a pattern, and record why. This protects deep coherence while ensuring that evidence can genuinely change the direction.",
    ),
  ],
  "decision-making": [
    block(
      "isfp-decisions-summary",
      "summary",
      "Convictions, Consequence, and Open-Ended Commitment",
      "ISFPs may prefer decisions grounded in explicit objectives, internal consistency, evidence, and long-term consequence. They often want enough time to understand the crafted response before committing, then may hold the chosen direction steadily. This values-grounded craft can reduce reactive switching. Good judgement still includes human impact, reversibility, and unknowns. A logically coherent choice can fail when the convictions omit adoption, ethics, or information held by others.",
    ),
    block(
      "isfp-decisions-reflection",
      "analysis",
      "Provisional Convergence",
      "The ISFP contributor may compare alternatives internally without feeling that the reflection has reached a naturally final point. A decision can therefore remain provisional long after enough evidence exists for the next reversible step. This protects against careless closure but hides the current best judgement from collaborators. State which option is strongest now, what uncertainty remains, and which consequence would justify reopening it. A bounded commitment can coexist with intellectual revision.",
    ),
    block(
      "isfp-decisions-strength",
      "strength",
      "Resisting Short-Term Pressure",
      "An ISFP may hold a values-grounded choice when immediate incentives favour convenience, status, or conformity. By connecting the decision to personal integrity and human consequence, the ISFP contributor can protect what might otherwise be overlooked. This strength needs reality checks so conviction does not become immunity from practical evidence. The choice should remain stable because values and experience still support it, not because revision feels inauthentic.",
    ),
    block(
      "isfp-decisions-risk",
      "risk",
      "Optimising the Wrong Convictions",
      "Precise reflection can produce a poor decision when the governing convictions are incomplete. Efficiency, scalability, or logical elegance may be optimised while trust, accessibility, timing, or transition cost remains outside the expression. Those consequences later return as expression failure. Before finalising, ask who defines success, who bears the cost, and which qualitative evidence should influence the choice.",
    ),
    block(
      "isfp-decisions-guidance",
      "guidance",
      "Expose the Decision Expression",
      "Document the question, current best expression, decisive criterion, strongest counterexample, and evidence that would change the choice. Share the reasoning while alternatives are still genuinely available. Then distinguish the next committed action from the theories that remain open to revision. This responsive practice keeps decisions testable without turning every uncertainty into delay and helps collaborators contribute evidence instead of guessing which part of the values can still move.",
    ),
  ],
  "communication": [
    block(
      "isfp-communication-summary",
      "summary",
      "Concise, Open-Ended, and Selective",
      "ISFPs may prefer communication that has a clear purpose, coherent reasoning, and enough substance to justify attention. They may speak selectively after internal processing rather than narrate each step. This values-grounded craft can make contributions focused, but others cannot infer the private expression automatically. Effective communication translates crafted response into context, assumptions, decisions, and invitations for evidence without requiring constant social performance.",
    ),
    block(
      "isfp-communication-analysis",
      "analysis",
      "The Missing Middle of the Reasoning",
      "Because the ISFP has already connected many steps internally, an explanation may move from problem to conclusion while omitting the bridge. Listeners can experience the result as abrupt or unsupported. The answer is not greater volume; it is a visible values chain. State what you observed, what it suggests, which uncertainty remains, and why the recommendation follows.",
    ),
    block(
      "isfp-communication-risk",
      "risk",
      "Under-Communication and Assumed Understanding",
      "The ISFP contributor may delay sharing until the expression feels sufficiently refined, then become frustrated when others lack context or raise questions already resolved privately. Silence can be interpreted as distance, agreement, or lack of interest. Under pressure, concise correction may also sound dismissive. Communicate earlier enough that others can influence the work, not merely receive the completed crafted response.",
    ),
    block(
      "isfp-communication-guidance",
      "guidance",
      "Share the Draft Expression",
      "Use a brief sequence: question, current explanation, strongest evidence, unresolved exception, and requested challenge. Mark the expression as provisional while making the immediate decision explicit. When disagreeing, identify the premise, category, or inference that differs rather than only rejecting the conclusion. This gives other people an inspectable reasoning path and turns authenticity into a shared resource rather than a private standard they cannot see.",
    ),
    block(
      "isfp-communication-reflection",
      "analysis",
      "What Was Visible to Others?",
      "Review a recent decision that felt obvious to you. What information did collaborators actually receive, and which connections existed only in your own expression? Did you ask for evidence early enough to change the direction? What emotional or practical concern was relevant even if it was expressed imprecisely? Clear crafted response becomes influential when other people can inspect and use it.",
    ),
  ],
  "teamwork-and-leadership": [
    block(
      "isfp-teamwork-summary",
      "summary",
      "Architecting Capability and Direction",
      "In teams, an ISFP may contribute by clarifying the underlying problem, testing assumptions, protecting focus, and connecting ideas across domains. Leadership can be quiet and question-led rather than socially dominant. The ISFP contributor may prefer capable colleagues with meaningful autonomy. Effective teamwork requires making reasoning visible, learning from local expertise, and recognising that coordination is not a distraction from craft but part of how craft becomes useful.",
    ),
    block(
      "isfp-teamwork-reflection",
      "analysis",
      "Selective Collaboration",
      "The ISFP may collaborate intensely when another person contributes expertise or challenge, while finding unfocused group process draining. Selectivity can protect quality and attention. It can also exclude information that arrives through informal conversation or people whose thinking style is less concise. Design collaboration around clear questions and decision rights, but leave enough room for evidence that does not arrive in the preferred format.",
    ),
    block(
      "isfp-teamwork-strength",
      "strength",
      "Designing for Independent Judgement",
      "A developed ISFP can create frameworks that help others make consistent decisions without central approval. Clear principles, interfaces, and feedback loops can distribute capability while preserving coherence. This form of leadership scales better than personal control. It works when the crafted response includes space for local adaptation and when people understand how to challenge a rule that no longer serves the objective.",
    ),
    block(
      "isfp-teamwork-risk",
      "risk",
      "Retreating From Imperfect Collaboration",
      "When meetings are inefficient or reasoning feels weak, the ISFP may withdraw and solve the problem alone. This values-grounded craft can produce a sharper immediate expression but reduce ownership, learning, and access to operational knowledge. Repeated withdrawal also reinforces the belief that collaboration adds little value. Improve the structure of collaboration before abandoning it: narrow the question, prepare evidence, assign decision ownership, and leave defined assumptions open to challenge.",
    ),
    block(
      "isfp-teamwork-guidance",
      "guidance",
      "Create a Challengeable Expression",
      "State the values-grounded principles, constraints, and interfaces that guide the team. Give owners authority within those boundaries and establish review points based on evidence. Invite a designated critic to test assumptions and include operational voices before finalising standards. The authentic aim is a system others can understand, adapt, and improve—not one that functions only when the original architect is present.",
    ),
  ],
  "career-environment": [
    block(
      "isfp-career-summary",
      "summary",
      "Depth, Autonomy, and Deep Consequence",
      "ISFPs may prefer work that rewards independent judgement, complex systems thinking, learning, and sustained improvement. Craft, technology, research, design, policy, or specialised leadership can offer these conditions, but no career belongs to a type. Fit depends on interests, expertise, values, resources, and organisational reality. The relevant question is whether the work permits depth while connecting private reflection to meaningful external outcomes.",
    ),
    block(
      "isfp-career-reflection",
      "analysis",
      "The Need for Protected Attention",
      "Frequent interruption and performative activity can make it difficult to build a coherent expression of complex work. The ISFP may need blocks of uninterrupted time and clear decision ownership. Total isolation is not the answer; craft requires contact with users, colleagues, and changing evidence. A supportive environment alternates focused reflection with purposeful collaboration rather than treating either constant availability or solitary independence as ideal.",
    ),
    block(
      "isfp-career-example",
      "example",
      "Work That Rewards Values-Grounded Depth",
      "Writing, design, counselling-related work with appropriate qualifications, education, advocacy, research, community initiatives, crafted practice, or mission-led product work may reward attention to authentic contribution and individual experience. The same job title can vary widely. Examine whether daily work supports authentic contribution, craft, ethical agency, and enough structure to turn values into sustained expression rather than relying on occupational stereotypes.",
    ),
    block(
      "isfp-career-risk",
      "risk",
      "Keeping Every Career Experience Open",
      "A rich map of possible fields can make any single role appear intellectually narrow once its routines become visible. The ISFP contributor may continue comparing paths, redesign a private learning plan, or wait for work that permits unrestricted craft. Real expertise, however, develops through sustained contact with constraints and expression. Choose a domain whose questions remain meaningful, then use actual projects to discover whether the environment supports depth rather than evaluating careers only as abstract possibilities.",
    ),
    block(
      "isfp-career-guidance",
      "guidance",
      "Evaluate Values-Grounded Fit",
      "Assess roles across problem depth, autonomy, evidence quality, learning range, expression ownership, and access to capable challenge. Notice and ask how hypotheses are tested and whether deep work survives short-term pressure. Also identify the communication and relationship work required for influence. Choose an environment where values-grounded clarity matters, then build the skills that help other people understand and use it.",
    ),
  ],
  "relationship-dynamics": [
    block(
      "isfp-relationships-summary",
      "summary",
      "Selective Trust and Open-Ended Commitment",
      "ISFPs may invest deeply in relationships that allow honesty, emotional nuance, individual difference, and authentic self-expression. Care may appear through close listening, symbolic gestures, advocacy, or loyalty to another person's inner experience. People vary widely, and a type code cannot explain attachment or intimacy. Relationships become stronger when private feeling, boundaries, and expectations are communicated rather than assumed to be self-evident.",
    ),
    block(
      "isfp-relationships-reflection",
      "analysis",
      "Internal Commitment, External Ambiguity",
      "The ISFP may assume that continued presence, practical help, or careful thought clearly communicates care. Another person may need direct appreciation, emotional acknowledgement, or more frequent contact. Neither form is inherently superior. Notice and ask how care is received rather than relying only on the form that feels most sincere to give. Translation protects authenticity while making commitment accessible.",
    ),
    block(
      "isfp-relationships-strength",
      "strength",
      "Depth Without Performance",
      "A developed expression can offer steadiness, candid reflection, respect for autonomy, and willingness to engage difficult long-term problems. The ISFP may avoid superficial reassurance and take another person's goals seriously. This values-grounded craft can create trust when reflection is invited and emotion is not treated as noise. Deep connection includes being present with an experience that cannot immediately be optimised.",
    ),
    block(
      "isfp-relationships-risk",
      "risk",
      "Analysing the Relationship Instead of Entering It",
      "When misunderstood or emotionally overloaded, the ISFP contributor may retreat into interpretation: reviewing inconsistencies, authentic contribution-making motives, or searching for the precise explanation before speaking. This values-grounded craft can create short-term distance from intensity but leaves the other person outside the process. A theory about the relationship may harden without direct evidence. Notice and ask one sincere question, name the need for processing time, and agree when conversation will resume before private reflection becomes an alternative to repair.",
    ),
    block(
      "isfp-relationships-guidance",
      "guidance",
      "Express the Value Without Making It a Verdict",
      "Practise naming the value that feels affected, the emotion present, and one request the other person can freely answer. In conflict, distinguish personal incongruence from a judgement about someone else's character. Notice and ask what matters to them before deciding the difference is irreconcilable. Authenticity does not require total disclosure; it requires enough honest participation that closeness is not governed by a private moral expression.",
    ),
  ],
  "change-and-adaptation": [
    block(
      "isfp-change-summary",
      "summary",
      "Adapting the Expression",
      "ISFPs may anticipate change by authentic contribution-making immediate context conditions and preparing a coherent route before disruption arrives. They can support transformation when current systems no longer fit long-term needs. Adaptation becomes harder when change contradicts a deeply developed expression or arrives without intelligible purpose. The dynamic slot below examines how adjacent preferences may make planning more iterative, practical, or collaborative.",
      [
        {
          id: "isfp-combination-adaptation",
          source: "combination",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
    block(
      "isfp-change-reflection",
      "analysis",
      "Revision Versus Abandoning the Vision",
      "Because crafted responses integrate many decisions, revising one assumption can feel as though the whole crafted response is being destabilised. The ISFP contributor may defend the original direction longer than evidence warrants. Separate the underlying purpose from the current design. A expression can change while the deeper objective remains intact, and revision often demonstrates stronger craft than preserving a coherent but inaccurate forecast.",
    ),
    block(
      "isfp-change-strength",
      "strength",
      "Preparing for Second-Order Effects",
      "The ISFP may notice that a transition changes incentives, capabilities, and immediate context options beyond the immediate expression plan. This supports more responsible sequencing and can protect resources others overlook. The strength is most useful when affected people help test the forecast. Change crafted response should include lived transition costs, not only the final system's values-grounded advantages.",
    ),
    block(
      "isfp-change-risk",
      "risk",
      "Rigidity Hidden as Values-Grounded Consistency",
      "A reluctance to revise may be explained as protecting the long term even when evidence has changed. The ISFP contributor can selectively interpret setbacks as poor expression rather than a flawed assumption. This delays learning and may place growing demands on others. Define failure and review convictions before expression so adaptation does not depend on admitting the entire vision was mistaken.",
    ),
    block(
      "isfp-change-guidance",
      "guidance",
      "Version the Craft",
      "Treat the plan as a versioned expression. Record assumptions, expected indicators, review dates, and which elements are stable versus experimental. At each review, identify what reality confirmed, contradicted, or left unresolved. Invite someone independent to challenge the interpretation. Updating a version preserves learning and direction while preventing consistency from becoming attachment to one expression.",
    ),
  ],
  "stress-and-recovery": [
    block(
      "isfp-stress-summary",
      "summary",
      "Contraction, Control, and Over-Isolation",
      "Under sustained stress, an ISFP may withdraw, narrow attention, intensify private planning, or become unusually critical of inefficiency and interruption. At other times the ISFP contributor may react through impulsive sensory activity or urgent attempts to control immediate details. Stress responses vary and are not diagnostic. The useful task is identifying the earliest loss of flexibility, communication, sleep, or perspective for this individual.",
    ),
    block(
      "isfp-stress-reflection",
      "analysis",
      "When Reflection Stops Restoring",
      "Solitude can restore cognitive space, but under sustained pressure it may become repetitive expression-building without new evidence or emotional processing. The ISFP contributor can feel mentally active while circling the same contradiction, opening more research paths, and postponing contact with the concrete source of strain. Recovery needs a stopping rule: reduce input, write the unresolved question down, restore physical routines, and seek one grounded observation or trusted conversation before resuming reflection.",
    ),
    block(
      "isfp-stress-evidence",
      "evidence",
      "Personal Early-Warning Signals",
      "Possible signals include abandoning routines for an absorbing experience, interpreting ordinary compromise as inauthenticity, avoiding messages that require a decision, idealising a different life, or withdrawing after a value feels unseen. These signs are individual rather than universal. Track what appears before sleep, judgement, health, or relationship quality declines. Notice and ask a trusted person which change in follow-through or emotional availability they notice first.",
    ),
    block(
      "isfp-stress-risk",
      "risk",
      "Solving Pressure With More Reflection",
      "When the problem involves grief, exhaustion, conflict, or limited control, another plan may create temporary distance without resolving the experience. The ISFP may analyse causes while remaining disconnected from support or bodily needs. Values-Grounded thinking is still available later. Immediate recovery may require naming the feeling, reducing obligations, accepting uncertainty, or asking directly for help.",
    ),
    block(
      "isfp-stress-guidance",
      "guidance",
      "Ground, Communicate, and Reduce Scope",
      "Pause one nonessential optimisation, restore sleep and movement, and choose one concrete task that can be finished without redesigning the system. Tell a trusted person that capacity is reduced and specify the support needed. Revisit values-grounded conclusions after recovery and new evidence. If distress is persistent or significantly affects functioning, seek appropriate professional support rather than using type language as an explanation.",
    ),
  ],
  "growth-roadmap": [
    block(
      "isfp-growth-summary",
      "summary",
      "From Private Vision to Shared Capability",
      "ISFP development is not about abandoning independence or deep thought. It involves making expressions challengeable, communicating before certainty, distinguishing excellence from reflection paralysis, and allowing relationship and operational evidence to shape the crafted response. Growth expands values-grounded range: the ISFP contributor can still protect depth while involving others early enough to improve and carry the work. The dynamic slot below highlights combinations affecting this path.",
      [
        {
          id: "isfp-combination-isolation-risk",
          source: "combination",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
    block(
      "isfp-growth-reflection",
      "analysis",
      "Collaboration as Expression Testing",
      "Collaboration need not mean surrendering authenticity or accepting an unfocused group process. At its best, another person supplies observations, domain constraints, and counterexamples unavailable to one line of reasoning. The developmental task is to pose a question narrow enough for useful challenge while remaining willing to revise the premise itself. A conversation that can add detail but cannot alter the expression is explanation, not genuine testing.",
    ),
    block(
      "isfp-growth-risk",
      "risk",
      "Reflection Paralysis Disguised as Readiness",
      "The ISFP contributor may delay expression, commitment, or conversation until it feels fully congruent with every value and nuance. This preserves an ideal of authenticity but prevents experience from shaping the work. Reflection paralysis often magnifies possible misrepresentation while the intended contribution remains invisible. Define the essential value, choose an honest provisional form, and let real response refine what private reflection cannot complete.",
    ),
    block(
      "isfp-growth-guidance",
      "guidance",
      "Practise Earlier Exposure",
      "Choose one expression, proposal, or concern and share it at sixty-percent clarity with a trusted, relevant person. State what is stable, what is uncertain, and what feedback could change the direction. Resist solving every objection immediately; record it and review the crafted response later. Repeat weekly so visibility becomes part of rigorous thinking rather than a threat to it.",
    ),
    block(
      "isfp-growth-action",
      "action",
      "A Monthly Craft-and-Impact Review",
      "Once a month, select one piece of work, care, or expression and review the value it served, the sensory or practical choices you made, and how another person actually experienced its effects. Identify one choice that strengthened the expression and one assumption that changed through feedback. Complete any remaining promise, then make one visible revision. This protects personal integrity while keeping craft connected to lived impact.",
    ),
  ],
  "ninety-day-action-plan": [
    block(
      "isfp-action-summary",
      "summary",
      "A Ninety-Day Expression-to-Expression Practice",
      "Use the next ninety days to test whether earlier exposure improves a meaningful values-grounded outcome. Choose one project that requires both deep reflection and adoption by others. Preserve focused work, but make assumptions and provisional decisions visible at planned intervals. The objective is a stronger crafted response that other people can understand, challenge, and execute—not maximum consensus or a flawless plan.",
    ),
    block(
      "isfp-action-days-1-30",
      "action",
      "Days 1–30 · Choose a Value and Make a First Form",
      "Choose one value you want to express through a concrete piece of work, care, design, or personal practice. Define the intended experience, the people affected, the materials or constraints, and the smallest form you can complete. Share an early version with two trusted people and ask what they actually notice rather than whether it matches your intention. Set one boundary that protects the work from endless private refinement.",
    ),
    block(
      "isfp-action-days-31-60",
      "action",
      "Days 31–60 · Refine Through Direct Feedback",
      "Continue the work in protected sessions and complete one version by a fixed date. Ask recipients how the form affected their experience, which detail carried the value, and where intention was not visible. Revise one practical or sensory element using that evidence without surrendering the central value to every preference. Record what you chose to keep and why.",
    ),
    block(
      "isfp-action-days-61-90",
      "action",
      "Days 61–90 · Complete and Integrate",
      "Finish the work, fulfil its related promises, and make it available in the setting for which it was created. Invite another person to use, interpret, or adapt it without requiring them to reproduce your private meaning. Review whether the contribution remained congruent with the value and created the intended practical experience. Choose explicitly whether to continue the practice, develop a second version, or close it.",
    ),
    block(
      "isfp-action-review",
      "analysis",
      "Evidence of Development",
      "Review concrete indicators: assumptions shared early, counterexamples retained, useful versions released, decisions revised from evidence, and responsibility distributed without loss of coherence. Notice and ask collaborators whether the reasoning became easier to understand and challenge. Development is demonstrated by repeated behaviour under real conditions, not by agreement with an attractive values-grounded identity.",
    ),
    block(
      "isfp-action-guidance",
      "guidance",
      "Protect Craft Without Hiding It",
      "If collaboration becomes noisy, narrow the invitation rather than abandoning it. Share one work-in-progress piece, name the value it is meant to express, and request concrete response instead of general approval. If private refinement delays contribution, reduce scope while preserving the essential quality. The plan succeeds when personal integrity and lived audience response become parts of one responsive craft practice.",
    ),
  ],
  methodology: [
    block(
      "isfp-methodology-framework",
      "analysis",
      "How to Use This Report",
      "This report interprets an MBTI-style preference result using EI, SN, TF, and JP dimensions, confidence values, static type-level content, and matched dynamic rules. It describes tendencies for reflection. It is not a clinical diagnosis, intelligence test, capability assessment, or scientifically absolute account of personality. No section should be used alone for consequential employment, educational, relationship, financial, or health decisions.",
    ),
    block(
      "isfp-methodology-variation",
      "evidence",
      "Context and Individual Variation",
      "People sharing an ISFP result can differ substantially because of culture, age, expertise, responsibilities, health, values, environment, and development. Balanced or lower-confidence dimensions increase the likelihood that neighbouring preferences are similarly accessible. Give repeated lived evidence more weight than a type stereotype, and treat descriptions that do not fit as information rather than a failure to match the code.",
    ),
    block(
      "isfp-methodology-dynamic",
      "analysis",
      "Dynamic Interpretation",
      "Generated reports select rule content from supplied dimension scores and confidence patterns. Applied-rule metadata records which adaptations were inserted, supporting traceability across report, content, and rule versions. Dynamic text can qualify a broad expression, but it cannot infer motive, history, maturity, mental health, or immediate context outcomes. Interpretation remains a reflective aid rather than an automated judgement.",
    ),
    block(
      "isfp-methodology-version",
      "guidance",
      "Version and Responsible Review",
      "Report version: 1.0.0. Content version: 1.0.0. Rule version: 1.0.0. These identifiers preserve the source used to generate a result as content and rules evolve. Revisit the report when circumstances or self-understanding change, compare it with feedback and behaviour, and retain only interpretations that support accurate and responsible reflection.",
    ),
  ],
};

export const ISFP_COMPLETE_REPORT:
  CompletePersonalityReportDefinition = {
    personalityType: "ISFP",
    version: COMPLETE_PERSONALITY_REPORT_VERSION,
    title: { en: "ISFP Complete Personality Report", zh: "ISFP 完整人格报告" },
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
