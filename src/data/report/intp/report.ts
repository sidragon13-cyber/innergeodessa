import {
  COMPLETE_PERSONALITY_REPORT_STANDARD,
  COMPLETE_PERSONALITY_REPORT_VERSION,
} from "../report-standard";
import type {
  CompletePersonalityReportDefinition,
  ReportContentBlock,
  ReportDynamicSlot,
} from "../types";
import { localizeIntpBlock } from "./localization";

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
  const localized = localizeIntpBlock(id);

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
      "intp-identity-summary",
      "summary",
      "Your Complete INTP Report",
      "This report examines an INTP preference pattern through conceptual inquiry, evidence, decisions, communication, work, relationships, stress, and development. It treats the type code as a hypothesis about preferred ways of organising attention—not as a fixed identity, clinical judgement, or promise of competence. Culture, experience, responsibilities, trust, and learned skills can change the visible pattern substantially. Use both recognition and mismatch to refine an account grounded in repeated behaviour.",
    ),
  ],
  "personality-overview": [
    block(
      "intp-overview-summary",
      "summary",
      "Conceptual Precision and Open-Ended Inquiry",
      "An INTP pattern often combines conceptual curiosity, independent analysis, precise internal criteria, and openness to revising an explanation. The person may build models of how a system works, examine contradictions, and keep alternative interpretations available until the underlying logic becomes clearer. This can support unusual depth and originality, but useful inquiry still requires current evidence, communication, application, and revision. A compelling explanation is not proof of certainty, superiority, or inevitable correctness.",
    ),
  ],
  "dimension-results": [
    block(
      "intp-dimensions-context",
      "analysis",
      "Reading the Four Dimensions",
      "An INTP result combines preferences across EI, SN, TF, and JP, but strength and confidence can alter the expression considerably. A more outward EI score may make inquiry collaborative, a practical SN result may begin with operational evidence, a balanced TF result can integrate stakeholder consequences, and a flexible JP result may preserve more iteration. The dynamic interpretations below qualify broad type themes. Compare them with behaviour across expertise, culture, role, trust, and pressure.",
      [
        {
          id: "intp-ei-inquiry",
          source: "dimension",
          dimensions: ["EI"],
        },
        {
          id: "intp-sn-model",
          source: "dimension",
          dimensions: ["SN"],
        },
        {
          id: "intp-tf-criteria",
          source: "dimension",
          dimensions: ["TF"],
        },
        {
          id: "intp-jp-openness",
          source: "dimension",
          dimensions: ["JP"],
        },
        {
          id: "intp-overall-confidence",
          source: "confidence",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
  ],
  "key-strengths": [
    block(
      "intp-strengths-bridge",
      "summary",
      "Strengths in Context",
      "Likely INTP strengths include conceptual modelling, independent learning, precise distinction, contradiction detection, and willingness to question an inherited explanation. The pattern can be useful when complex work requires clarity beneath surface assumptions. These are preferences rather than guaranteed skills. Their value depends on domain knowledge, practical testing, intellectual humility, and the ability to make private reasoning available to others. Later sections separate useful independence from isolation and rigorous inquiry from analysis paralysis.",
    ),
  ],
  "growth-risks": [
    block(
      "intp-risks-bridge",
      "guidance",
      "Growth Through Tested Models",
      "Development may involve exposing assumptions earlier, communicating an unfinished model, distinguishing useful precision from analysis paralysis, and converting a broad question into a bounded experiment. Other risks include solving too much alone, withdrawing when collaboration is imprecise, and treating continued exploration as evidence that action must wait. These are not fixed defects. The following sections translate them into practical review points that preserve intellectual independence while improving adaptability, trust, and application.",
    ),
  ],
  "core-personality-pattern": [
    block(
      "intp-core-summary",
      "summary",
      "Internal Vision and System Coherence",
      "The central INTP pattern often involves building an internal explanation, testing its consistency, and reopening it when an anomaly exposes a weak assumption. The person may look beyond current symptoms to identify the mechanism producing them, then compare several ways the model could be tested or improved. At its best, this creates patient understanding rather than reactive certainty. The dynamic slots below qualify how inquiry changes with confidence, balance, and access to adjacent preferences.",
      [
        {
          id: "intp-combination-model",
          source: "combination",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
        {
          id: "intp-balanced-dimensions",
          source: "confidence",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
    block(
      "intp-core-analysis",
      "analysis",
      "Understanding the Model Before Acting",
      "An INTP may first ask which mechanism best explains the observed outcome. Instead of treating each issue separately, the person examines assumptions, dependencies, information flow, and competing explanations. This can prevent superficial fixes and reveal a simpler account. It becomes limiting when inquiry stays private or when present facts are forced to fit a preferred theory. A conceptual model must remain a testable explanation of reality, not a substitute for contact with it.",
    ),
    block(
      "intp-core-strength",
      "strength",
      "Concentrated Deep Leverage",
      "A developed expression can sustain attention on a consequential objective while resisting short-term noise. The INTP may identify a small structural change that improves many downstream decisions, sequence work around dependencies, and protect resources for outcomes that take time. This conceptual concentration is strongest when review points invite disconfirming evidence and when collaborators understand enough of the model to exercise judgement rather than merely follow instructions.",
    ),
    block(
      "intp-core-risk",
      "risk",
      "When Coherence Becomes Premature Certainty",
      "A model that explains many observations can begin to feel complete before critical assumptions have been tested. The INTP may discount local objections as short-term thinking or interpret disagreement as failure to understand the system. This can create elegant plans with weak adoption or hidden operational costs. Confidence should rise when the conceptual model survives serious evidence, not simply because it has become internally consistent.",
    ),
    block(
      "intp-core-reflection",
      "reflection",
      "What Could Change the Model?",
      "Choose one conceptual conclusion you currently hold. Which observations support it, which assumptions connect those observations, and what evidence would require revision? Who has access to facts you do not? Share the model before it is finished and ask for the strongest counterexample. The goal is not to surrender independent judgement, but to ensure independence produces a design that can withstand reality outside your own reasoning.",
    ),
  ],
  "motivation-and-needs": [
    block(
      "intp-motivation-summary",
      "summary",
      "Mastery, Autonomy, and Meaningful Progress",
      "INTPs may feel engaged by complex problems, room for independent judgement, opportunities to build competence, and work whose long-term consequence justifies concentrated effort. Motivation often rises when the objective is meaningful and methods are not constrained by unnecessary convention. Not every INTP wants formal authority or solitary work. The deeper need is usually control over attention and enough coherence to invest effort without constant arbitrary interruption.",
    ),
    block(
      "intp-motivation-analysis",
      "analysis",
      "Autonomy in Service of a System",
      "Independence can protect the uninterrupted thought required for difficult conceptual model. The person may resist oversight that focuses on visible activity rather than reasoning or outcomes. Autonomy is most productive when paired with transparent constraints, review, and responsibility for consequences. Without those anchors, self-direction can become insulation from feedback. The useful question is which decisions need protected judgement and which improve through earlier collaboration.",
    ),
    block(
      "intp-motivation-strength",
      "strength",
      "Patience for Difficult Understanding",
      "When a question matters, the INTP may tolerate a long learning curve and keep refining distinctions that produce little immediate recognition. This can support deep expertise, original explanation, and solutions built on sound concepts rather than surface convention. The strength depends on testing the model against observations and making the reasoning usable to other people. Persistence is valuable while inquiry continues to improve understanding, not when analysis continues mainly because choosing a testable next step feels premature.",
    ),
    block(
      "intp-motivation-risk",
      "risk",
      "Understanding as Protection",
      "Conceptual mastery can become a defence against uncertainty, dependence, or visible incompleteness. The person may keep researching until help feels unnecessary, avoid a practical task whose variables are untidy, or treat an unresolved exception as a reason not to expose the model. Understanding remains valuable, but confidence becomes more resilient when inquiry includes unfinished knowledge, shared experiments, and correction by people who know a different part of the problem.",
    ),
    block(
      "intp-motivation-guidance",
      "guidance",
      "Define Progress Beyond a Better Explanation",
      "For a major inquiry, name the question the model must answer and the observable result that would make it useful. Separate essential logical defects from questions that can remain open. Choose a small application that produces new evidence, then share one unresolved assumption before researching it alone. Progress includes clearer reasoning, but it also includes contact with reality, learning from use, and knowing when another refinement has lower value than a test.",
    ),
  ],
  "information-processing": [
    block(
      "intp-information-summary",
      "summary",
      "Patterns, Trajectories, and System Logic",
      "An INTP pattern often attends to underlying structure, future implications, and the few variables that organise many surface events. Information becomes useful when it clarifies a trajectory or improves the internal model of the system. This can support conceptual foresight, provided abstraction remains connected to current measurements, operational detail, and alternative explanations. Pattern recognition generates hypotheses; it does not remove the need for evidence.",
    ),
    block(
      "intp-information-analysis",
      "analysis",
      "Testing the Boundaries of a Model",
      "The person may organise many observations into a compact account, then examine edge cases to discover where its logic fails. This can reveal hidden categories and produce more precise explanations. It can also expand indefinitely as every exception creates another branch. Record the model's intended scope, the anomalies that materially challenge it, and the questions that can wait. Precision improves when boundaries are explicit, not when one explanation attempts to absorb every possible case.",
    ),
    block(
      "intp-information-strength",
      "strength",
      "Seeing Second-Order Consequences",
      "INTPs may naturally ask what a present decision makes more likely later: which dependency grows, which incentive changes, or which capability becomes difficult to recover. This can protect a team from attractive short-term fixes. The strength becomes practical when future consequences are translated into observable indicators and when probability is communicated honestly rather than as inevitable foresight.",
    ),
    block(
      "intp-information-risk",
      "risk",
      "Filtering Out Inconvenient Reality",
      "Once the organising pattern feels clear, data that does not fit may be labelled exceptional, political, or too operational. Yet one inconvenient detail can reveal a mistaken assumption or a stakeholder cost the conceptual model ignores. The risk is not abstraction itself; it is allowing the model to determine which evidence counts. Open-Endedly preserve anomalies until they are explained rather than removed from the conceptual picture.",
    ),
    block(
      "intp-information-guidance",
      "guidance",
      "Maintain a Model and an Anomaly Log",
      "Write the current system model, its three most important assumptions, and the indicators expected if it is correct. Beside it, keep observations that do not fit. Review both with someone close to application. Revise the conceptual model when anomalies form a pattern, and record why. This protects deep coherence while ensuring that evidence can genuinely change the direction.",
    ),
  ],
  "decision-making": [
    block(
      "intp-decisions-summary",
      "summary",
      "Criteria, Consequence, and Open-Ended Commitment",
      "INTPs may prefer decisions grounded in explicit objectives, internal consistency, evidence, and long-term consequence. They often want enough time to understand the conceptual model before committing, then may hold the chosen direction steadily. This can reduce reactive switching. Good judgement still includes human impact, reversibility, and unknowns. A logically coherent choice can fail when the criteria omit adoption, ethics, or information held by others.",
    ),
    block(
      "intp-decisions-analysis",
      "analysis",
      "Provisional Convergence",
      "The person may compare alternatives internally without feeling that the analysis has reached a naturally final point. A decision can therefore remain provisional long after enough evidence exists for the next reversible step. This protects against careless closure but hides the current best judgement from collaborators. State which option is strongest now, what uncertainty remains, and which consequence would justify reopening it. A bounded commitment can coexist with intellectual revision.",
    ),
    block(
      "intp-decisions-strength",
      "strength",
      "Resisting Short-Term Pressure",
      "An INTP may hold a necessary deep choice when immediate incentives favour convenience or appearance. By connecting the decision to system consequences, the person can protect investment, standards, or future capability. This strength needs review triggers so perseverance does not become rigidity. The decision should remain stable because evidence still supports it, not because changing course would challenge the identity of the strategist.",
    ),
    block(
      "intp-decisions-risk",
      "risk",
      "Optimising the Wrong Criteria",
      "Precise analysis can produce a poor decision when the governing criteria are incomplete. Efficiency, scalability, or logical elegance may be optimised while trust, accessibility, timing, or transition cost remains outside the model. Those consequences later return as application failure. Before finalising, ask who defines success, who bears the cost, and which qualitative evidence should influence the choice.",
    ),
    block(
      "intp-decisions-guidance",
      "guidance",
      "Expose the Decision Model",
      "Document the question, current best model, decisive criterion, strongest counterexample, and evidence that would change the choice. Share the reasoning while alternatives are still genuinely available. Then distinguish the next committed action from the theories that remain open to revision. This keeps decisions testable without turning every uncertainty into delay and helps collaborators contribute evidence instead of guessing which part of the logic can still move.",
    ),
  ],
  "communication": [
    block(
      "intp-communication-summary",
      "summary",
      "Concise, Open-Ended, and Selective",
      "INTPs may prefer communication that has a clear purpose, coherent reasoning, and enough substance to justify attention. They may speak selectively after internal processing rather than narrate each step. This can make contributions focused, but others cannot infer the private model automatically. Effective communication translates conceptual model into context, assumptions, decisions, and invitations for evidence without requiring constant social performance.",
    ),
    block(
      "intp-communication-analysis",
      "analysis",
      "The Missing Middle of the Reasoning",
      "Because the INTP has already connected many steps internally, an explanation may move from problem to conclusion while omitting the bridge. Listeners can experience the result as abrupt or unsupported. The answer is not greater volume; it is a visible logic chain. State what you observed, what it suggests, which uncertainty remains, and why the recommendation follows.",
    ),
    block(
      "intp-communication-risk",
      "risk",
      "Under-Communication and Assumed Understanding",
      "The person may delay sharing until the model feels sufficiently refined, then become frustrated when others lack context or raise questions already resolved privately. Silence can be interpreted as distance, agreement, or lack of interest. Under pressure, concise correction may also sound dismissive. Communicate earlier enough that others can influence the work, not merely receive the completed conceptual model.",
    ),
    block(
      "intp-communication-guidance",
      "guidance",
      "Share the Draft Model",
      "Use a brief sequence: question, current explanation, strongest evidence, unresolved exception, and requested challenge. Mark the model as provisional while making the immediate decision explicit. When disagreeing, identify the premise, category, or inference that differs rather than only rejecting the conclusion. This gives other people an inspectable reasoning path and turns precision into a shared resource rather than a private standard they cannot see.",
    ),
    block(
      "intp-communication-reflection",
      "reflection",
      "What Was Visible to Others?",
      "Review a recent decision that felt obvious to you. What information did collaborators actually receive, and which connections existed only in your own model? Did you ask for evidence early enough to change the direction? What emotional or practical concern was relevant even if it was expressed imprecisely? Clear conceptual model becomes influential when other people can inspect and use it.",
    ),
  ],
  "teamwork-and-leadership": [
    block(
      "intp-teamwork-summary",
      "summary",
      "Architecting Capability and Direction",
      "In teams, an INTP may contribute by clarifying the underlying problem, testing assumptions, protecting focus, and connecting ideas across domains. Leadership can be quiet and question-led rather than socially dominant. The person may prefer capable colleagues with meaningful autonomy. Effective teamwork requires making reasoning visible, learning from local expertise, and recognising that coordination is not a distraction from inquiry but part of how inquiry becomes useful.",
    ),
    block(
      "intp-teamwork-analysis",
      "analysis",
      "Collaboration Through Questions",
      "The INTP may engage deeply when collaborators bring a difficult question, contradictory evidence, or a model worth testing, while routine coordination can feel less compelling. This selectivity protects concentration but may leave others unsure when input is wanted or whether a provisional idea is open to challenge. Name the question under examination, invite competing explanations before private analysis hardens, and end the discussion with the next experiment or decision owner.",
    ),
    block(
      "intp-teamwork-strength",
      "strength",
      "Designing for Independent Judgement",
      "A developed INTP can create frameworks that help others make consistent decisions without central approval. Clear principles, interfaces, and feedback loops can distribute capability while preserving coherence. This form of leadership scales better than personal control. It works when the conceptual model includes space for local adaptation and when people understand how to challenge a rule that no longer serves the objective.",
    ),
    block(
      "intp-teamwork-risk",
      "risk",
      "Retreating From Imperfect Collaboration",
      "When meetings are inefficient or reasoning feels weak, the INTP may withdraw and solve the problem alone. This can produce a sharper immediate model but reduce ownership, learning, and access to operational knowledge. Repeated withdrawal also reinforces the belief that collaboration adds little value. Improve the structure of collaboration before abandoning it: narrow the question, prepare evidence, assign decision ownership, and leave defined assumptions open to challenge.",
    ),
    block(
      "intp-teamwork-guidance",
      "guidance",
      "Create a Challengeable Model",
      "State the conceptual principles, constraints, and interfaces that guide the team. Give owners authority within those boundaries and establish review points based on evidence. Invite a designated critic to test assumptions and include operational voices before finalising standards. The aim is a system others can understand, adapt, and improve—not one that functions only when the original architect is present.",
    ),
  ],
  "career-environment": [
    block(
      "intp-career-summary",
      "summary",
      "Depth, Autonomy, and Deep Consequence",
      "INTPs may prefer work that rewards independent judgement, complex systems thinking, learning, and sustained improvement. Inquiry, technology, research, design, policy, or specialised leadership can offer these conditions, but no career belongs to a type. Fit depends on interests, expertise, values, resources, and organisational reality. The relevant question is whether the work permits depth while connecting private analysis to meaningful external outcomes.",
    ),
    block(
      "intp-career-analysis",
      "analysis",
      "The Need for Protected Attention",
      "Frequent interruption and performative activity can make it difficult to build a coherent model of complex work. The INTP may need blocks of uninterrupted time and clear decision ownership. Total isolation is not the answer; inquiry requires contact with users, colleagues, and changing evidence. A supportive environment alternates focused analysis with purposeful collaboration rather than treating either constant availability or solitary independence as ideal.",
    ),
    block(
      "intp-career-example",
      "example",
      "Work That Rewards Conceptual Depth",
      "Systems design, research, product discovery, scientific modelling, policy analysis, or specialised technical work may reward the ability to connect principles and consequences. The same job title can vary widely. Examine whether the daily work includes genuine problem ownership, access to evidence, room to question assumptions, and responsibility for application rather than relying on occupational stereotypes.",
    ),
    block(
      "intp-career-risk",
      "risk",
      "Keeping Every Career Possibility Open",
      "A rich map of possible fields can make any single role appear intellectually narrow once its routines become visible. The person may continue comparing paths, redesign a private learning plan, or wait for work that permits unrestricted inquiry. Real expertise, however, develops through sustained contact with constraints and application. Choose a domain whose questions remain meaningful, then use actual projects to discover whether the environment supports depth rather than evaluating careers only as abstract possibilities.",
    ),
    block(
      "intp-career-guidance",
      "guidance",
      "Evaluate Conceptual Fit",
      "Assess roles across problem depth, autonomy, evidence quality, learning range, application ownership, and access to capable challenge. Ask how hypotheses are tested and whether deep work survives short-term pressure. Also identify the communication and relationship work required for influence. Choose an environment where conceptual clarity matters, then build the skills that help other people understand and use it.",
    ),
  ],
  "relationship-dynamics": [
    block(
      "intp-relationships-summary",
      "summary",
      "Selective Trust and Open-Ended Commitment",
      "INTPs may invest deeply in a relatively small number of relationships, valuing honesty, intellectual respect, reliability, and space for independent thought. Care may be expressed through problem solving, planning, or sustained commitment rather than frequent emotional narration. People vary widely, and a type code cannot explain attachment or intimacy. Relationships become stronger when private loyalty is made visible in forms the other person can recognise.",
    ),
    block(
      "intp-relationships-analysis",
      "analysis",
      "Internal Commitment, External Ambiguity",
      "The INTP may assume that continued presence, practical help, or careful thought clearly communicates care. Another person may need direct appreciation, emotional acknowledgement, or more frequent contact. Neither form is inherently superior. Ask how care is received rather than relying only on the form that feels most sincere to give. Translation protects authenticity while making commitment accessible.",
    ),
    block(
      "intp-relationships-strength",
      "strength",
      "Depth Without Performance",
      "A developed expression can offer steadiness, candid reflection, respect for autonomy, and willingness to engage difficult long-term problems. The INTP may avoid superficial reassurance and take another person's goals seriously. This can create trust when analysis is invited and emotion is not treated as noise. Deep connection includes being present with an experience that cannot immediately be optimised.",
    ),
    block(
      "intp-relationships-risk",
      "risk",
      "Analysing the Relationship Instead of Entering It",
      "When misunderstood or emotionally overloaded, the person may retreat into interpretation: reviewing inconsistencies, modelling motives, or searching for the precise explanation before speaking. This can create short-term distance from intensity but leaves the other person outside the process. A theory about the relationship may harden without direct evidence. Ask one sincere question, name the need for processing time, and agree when conversation will resume before private analysis becomes an alternative to repair.",
    ),
    block(
      "intp-relationships-guidance",
      "guidance",
      "Make the Inner Position Visible",
      "Practise naming one observation, one feeling or concern, and one request before explaining the full theory. In conflict, treat the other person's account as evidence that can alter your interpretation, not merely another claim to classify. Agree on how much processing space is needed and when reconnection will happen. The aim is not constant disclosure; it is enough visible participation that trust does not depend on decoding silence or intellectualised care.",
    ),
  ],
  "change-and-adaptation": [
    block(
      "intp-change-summary",
      "summary",
      "Adapting the Model",
      "INTPs may anticipate change by modelling future conditions and preparing a coherent route before disruption arrives. They can support transformation when current systems no longer fit long-term needs. Adaptation becomes harder when change contradicts a deeply developed model or arrives without intelligible purpose. The dynamic slot below examines how adjacent preferences may make planning more iterative, practical, or collaborative.",
      [
        {
          id: "intp-combination-adaptation",
          source: "combination",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
    block(
      "intp-change-analysis",
      "analysis",
      "Revision Versus Abandoning the Vision",
      "Because conceptual models integrate many decisions, revising one assumption can feel as though the whole conceptual model is being destabilised. The person may defend the original direction longer than evidence warrants. Separate the underlying purpose from the current design. A model can change while the deeper objective remains intact, and revision often demonstrates stronger inquiry than preserving a coherent but inaccurate forecast.",
    ),
    block(
      "intp-change-strength",
      "strength",
      "Preparing for Second-Order Effects",
      "The INTP may notice that a transition changes incentives, capabilities, and future options beyond the immediate application plan. This supports more responsible sequencing and can protect resources others overlook. The strength is most useful when affected people help test the forecast. Change conceptual model should include lived transition costs, not only the final system's conceptual advantages.",
    ),
    block(
      "intp-change-risk",
      "risk",
      "Rigidity Hidden as Conceptual Consistency",
      "A reluctance to revise may be explained as protecting the long term even when evidence has changed. The person can selectively interpret setbacks as poor application rather than a flawed assumption. This delays learning and may place growing demands on others. Define failure and review criteria before application so adaptation does not depend on admitting the entire vision was mistaken.",
    ),
    block(
      "intp-change-guidance",
      "guidance",
      "Version the Inquiry",
      "Treat the plan as a versioned model. Record assumptions, expected indicators, review dates, and which elements are stable versus experimental. At each review, identify what reality confirmed, contradicted, or left unresolved. Invite someone independent to challenge the interpretation. Updating a version preserves learning and direction while preventing consistency from becoming attachment to one application.",
    ),
  ],
  "stress-and-recovery": [
    block(
      "intp-stress-summary",
      "summary",
      "Contraction, Control, and Over-Isolation",
      "Under sustained stress, an INTP may withdraw, narrow attention, intensify private planning, or become unusually critical of inefficiency and interruption. At other times the person may react through impulsive sensory activity or urgent attempts to control immediate details. Stress responses vary and are not diagnostic. The useful task is identifying the earliest loss of flexibility, communication, sleep, or perspective for this individual.",
    ),
    block(
      "intp-stress-analysis",
      "analysis",
      "When Analysis Stops Restoring",
      "Solitude can restore cognitive space, but under sustained pressure it may become repetitive model-building without new evidence or emotional processing. The person can feel mentally active while circling the same contradiction, opening more research paths, and postponing contact with the concrete source of strain. Recovery needs a stopping rule: reduce input, write the unresolved question down, restore physical routines, and seek one grounded observation or trusted conversation before resuming analysis.",
    ),
    block(
      "intp-stress-evidence",
      "evidence",
      "Personal Early-Warning Signals",
      "Possible signals include opening many research threads without closing any, correcting minor distinctions more sharply, abandoning practical routines, losing patience with imprecise language, or withdrawing because conversation feels cognitively expensive. These signs are individual rather than universal. Track what appears before sleep, judgement, health, or relationship quality declines. Ask a trusted person which shift they notice first, since internal activity can conceal the degree of external depletion.",
    ),
    block(
      "intp-stress-risk",
      "risk",
      "Solving Pressure With More Analysis",
      "When the problem involves grief, exhaustion, conflict, or limited control, another plan may create temporary distance without resolving the experience. The INTP may analyse causes while remaining disconnected from support or bodily needs. Conceptual thinking is still available later. Immediate recovery may require naming the feeling, reducing obligations, accepting uncertainty, or asking directly for help.",
    ),
    block(
      "intp-stress-guidance",
      "guidance",
      "Ground, Communicate, and Reduce Scope",
      "Pause one nonessential optimisation, restore sleep and movement, and choose one concrete task that can be finished without redesigning the system. Tell a trusted person that capacity is reduced and specify the support needed. Revisit conceptual conclusions after recovery and new evidence. If distress is persistent or significantly affects functioning, seek appropriate professional support rather than using type language as an explanation.",
    ),
  ],
  "growth-roadmap": [
    block(
      "intp-growth-summary",
      "summary",
      "From Private Vision to Shared Capability",
      "INTP development is not about abandoning independence or deep thought. It involves making models challengeable, communicating before certainty, distinguishing excellence from analysis paralysis, and allowing relationship and operational evidence to shape the conceptual model. Growth expands conceptual range: the person can still protect depth while involving others early enough to improve and carry the work. The dynamic slot below highlights combinations affecting this path.",
      [
        {
          id: "intp-combination-isolation-risk",
          source: "combination",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
    block(
      "intp-growth-analysis",
      "analysis",
      "Collaboration as Model Testing",
      "Collaboration need not mean surrendering precision or accepting an unfocused group process. At its best, another person supplies observations, domain constraints, and counterexamples unavailable to one line of reasoning. The developmental task is to pose a question narrow enough for useful challenge while remaining willing to revise the premise itself. A conversation that can add detail but cannot alter the model is explanation, not genuine testing.",
    ),
    block(
      "intp-growth-risk",
      "risk",
      "Analysis Paralysis Disguised as Readiness",
      "The person may delay release, delegation, or conversation until the work meets a private standard that keeps moving. This preserves control but prevents feedback from improving the actual outcome. Analysis Paralysis often focuses attention on defects that are intellectually visible rather than consequences that matter most. Define the required quality level, the cost of delay, and the evidence only real use can provide.",
    ),
    block(
      "intp-growth-guidance",
      "guidance",
      "Practise Earlier Exposure",
      "Choose one model, proposal, or concern and share it at sixty-percent clarity with a trusted, relevant person. State what is stable, what is uncertain, and what feedback could change the direction. Resist solving every objection immediately; record it and review the conceptual model later. Repeat weekly so visibility becomes part of rigorous thinking rather than a threat to it.",
    ),
    block(
      "intp-growth-action",
      "action",
      "A Monthly Assumption Review",
      "Once a month, select one important inquiry and review its assumptions, anomalies, stakeholder effects, and application evidence. Identify one belief that strengthened and one that weakened. Communicate any revision and credit the evidence source. This creates a visible practice of intellectual humility while preserving the INTP's strength in coherent deep design.",
    ),
  ],
  "ninety-day-action-plan": [
    block(
      "intp-action-summary",
      "summary",
      "A Ninety-Day Model-to-Application Practice",
      "Use the next ninety days to test whether earlier exposure improves a meaningful conceptual outcome. Choose one project that requires both deep analysis and adoption by others. Preserve focused work, but make assumptions and provisional decisions visible at planned intervals. The objective is a stronger conceptual model that other people can understand, challenge, and execute—not maximum consensus or a flawless plan.",
    ),
    block(
      "intp-action-days-1-30",
      "action",
      "Days 1–30 · Frame and Compare",
      "Choose one unresolved question with practical consequence. Write the current explanation, its assumptions, the strongest alternative, and the evidence that would distinguish them. Ask two people with different expertise to challenge the distinctions rather than simply endorse the conclusion. Select one reversible test and set a date for deciding what the result changes.",
    ),
    block(
      "intp-action-days-31-60",
      "action",
      "Days 31–60 · Test and Explain",
      "Run the selected test and keep observations separate from interpretation. After each focused analysis period, explain the current model to someone who must use, test, or decide from it. Record where the explanation becomes unclear and which evidence changes a distinction. Deliver one bounded output—a prototype, recommendation, or documented model—before every open question is resolved.",
    ),
    block(
      "intp-action-days-61-90",
      "action",
      "Days 61–90 · Decide and Transfer",
      "State the best-supported conclusion, the uncertainty that remains, and the next condition that would reopen the question. Give another person enough rationale and evidence to apply or challenge the model without depending on your private analysis. Evaluate whether the work improved a real decision or outcome, then archive unresolved questions separately so intellectual openness does not prevent closure.",
    ),
    block(
      "intp-action-review",
      "reflection",
      "Evidence of Development",
      "Review concrete indicators: assumptions shared early, counterexamples retained, useful versions released, decisions revised from evidence, and responsibility distributed without loss of coherence. Ask collaborators whether the reasoning became easier to understand and challenge. Development is demonstrated by repeated behaviour under real conditions, not by agreement with an attractive conceptual identity.",
    ),
    block(
      "intp-action-guidance",
      "guidance",
      "Protect Depth Without Returning to Isolation",
      "If collaboration becomes noisy, improve its structure rather than abandoning it. Narrow the question, request evidence in advance, and separate consultation from decision rights. If analysis paralysis delays delivery, reduce scope while preserving the critical quality standard. The plan succeeds when independent thought and external correction become parts of one reliable process.",
    ),
  ],
  methodology: [
    block(
      "intp-methodology-framework",
      "analysis",
      "How to Use This Report",
      "This report interprets an MBTI-style preference result using EI, SN, TF, and JP dimensions, confidence values, static type-level content, and matched dynamic rules. It describes tendencies for reflection. It is not a clinical diagnosis, intelligence test, capability assessment, or scientifically absolute account of personality. No section should be used alone for consequential employment, educational, relationship, financial, or health decisions.",
    ),
    block(
      "intp-methodology-variation",
      "evidence",
      "Context and Individual Variation",
      "People sharing an INTP result can differ substantially because of culture, age, expertise, responsibilities, health, values, environment, and development. Balanced or lower-confidence dimensions increase the likelihood that neighbouring preferences are similarly accessible. Give repeated lived evidence more weight than a type stereotype, and treat descriptions that do not fit as information rather than a failure to match the code.",
    ),
    block(
      "intp-methodology-dynamic",
      "analysis",
      "Dynamic Interpretation",
      "Generated reports select rule content from supplied dimension scores and confidence patterns. Applied-rule metadata records which adaptations were inserted, supporting traceability across report, content, and rule versions. Dynamic text can qualify a broad narrative, but it cannot infer motive, history, maturity, mental health, or future outcomes. Interpretation remains a reflective aid rather than an automated judgement.",
    ),
    block(
      "intp-methodology-version",
      "guidance",
      "Version and Responsible Review",
      "Report version: 1.0.0. Content version: 1.0.0. Rule version: 1.0.0. These identifiers preserve the source used to generate a result as content and rules evolve. Revisit the report when circumstances or self-understanding change, compare it with feedback and behaviour, and retain only interpretations that support accurate and responsible reflection.",
    ),
  ],
};

export const INTP_COMPLETE_REPORT:
  CompletePersonalityReportDefinition = {
    personalityType: "INTP",
    version: COMPLETE_PERSONALITY_REPORT_VERSION,
    title: { en: "INTP Complete Personality Report", zh: "INTP 完整人格报告" },
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
