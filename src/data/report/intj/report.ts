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
      "intj-identity-summary",
      "summary",
      "Your Complete INTJ Report",
      "This report examines an INTJ preference pattern through strategic architecture, evidence, decisions, communication, work, relationships, stress, and development. It treats the type code as a hypothesis about preferred ways of organising attention—not as a fixed identity, clinical judgement, or promise of competence. Culture, experience, responsibilities, trust, and learned skills can change the visible pattern substantially. Use both recognition and mismatch to refine an account grounded in repeated behaviour.",
    ),
  ],
  "personality-overview": [
    block(
      "intj-overview-summary",
      "summary",
      "Strategic Architecture and Deliberate Execution",
      "An INTJ pattern often combines long-range pattern recognition, independent analysis, explicit criteria, and an internal preference for coherent structure. The person may build a model of how a system could work, identify leverage points, and invest selectively in changes with durable consequence. This can support strategic depth, but sound execution still requires current evidence, communication, collaboration, and revision. A compelling internal vision is not proof of certainty, superiority, or inevitable success.",
    ),
  ],
  "dimension-results": [
    block(
      "intj-dimensions-context",
      "analysis",
      "Reading the Four Dimensions",
      "An INTJ result combines preferences across EI, SN, TF, and JP, but strength and confidence can alter the expression considerably. A more outward EI score may make strategy collaborative, a practical SN result may begin with operational evidence, a balanced TF result can integrate stakeholder consequences, and a flexible JP result may preserve more iteration. The dynamic interpretations below qualify broad type themes. Compare them with behaviour across expertise, culture, role, trust, and pressure.",
      [
        {
          id: "intj-ei-strategy",
          source: "dimension",
          dimensions: ["EI"],
        },
        {
          id: "intj-sn-architecture",
          source: "dimension",
          dimensions: ["SN"],
        },
        {
          id: "intj-tf-criteria",
          source: "dimension",
          dimensions: ["TF"],
        },
        {
          id: "intj-jp-structure",
          source: "dimension",
          dimensions: ["JP"],
        },
        {
          id: "intj-overall-confidence",
          source: "confidence",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
  ],
  "key-strengths": [
    block(
      "intj-strengths-bridge",
      "summary",
      "Strengths in Context",
      "Likely INTJ strengths include long-range systems thinking, independent learning, strategic focus, contradiction detection, and willingness to redesign an inefficient structure. The pattern can be useful when complex work requires a coherent architecture beyond immediate demands. These are preferences rather than guaranteed skills. Their value depends on domain knowledge, implementation discipline, intellectual humility, and the ability to make private reasoning available to others. Later sections separate useful independence from isolation and quality from perfectionism.",
    ),
  ],
  "growth-risks": [
    block(
      "intj-risks-bridge",
      "guidance",
      "Growth Through Tested Architecture",
      "Development may involve exposing assumptions earlier, communicating an unfinished model, distinguishing necessary quality from perfectionism, and inviting operational or relational evidence before commitment hardens. Other risks include solving too much alone, withdrawing when collaboration is inefficient, and confusing a coherent forecast with a certain future. These are not fixed defects. The following sections translate them into practical review points that preserve strategic independence while improving adaptability, trust, and execution.",
    ),
  ],
  "core-personality-pattern": [
    block(
      "intj-core-summary",
      "summary",
      "Internal Vision and System Coherence",
      "The central INTJ pattern often involves forming an internal model of future direction and organising choices around its underlying logic. The person may look beyond current symptoms to identify the architecture producing them, then select a focused route for change. At its best, this creates patient leverage rather than reactive activity. The dynamic slots below qualify how strategy changes with confidence, balance, and access to adjacent preferences.",
      [
        {
          id: "intj-combination-architecture",
          source: "combination",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
        {
          id: "intj-balanced-dimensions",
          source: "confidence",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
    block(
      "intj-core-analysis",
      "analysis",
      "Building the Architecture Before the Activity",
      "An INTJ may first ask what system would make the desired outcome repeatable. Instead of treating each issue separately, the person examines incentives, dependencies, information flow, and future consequences. This can prevent wasted effort and produce durable design. It becomes limiting when planning stays private or when present facts are forced to fit the model. Architecture must remain a testable explanation of reality, not a substitute for contact with it.",
    ),
    block(
      "intj-core-strength",
      "strength",
      "Concentrated Long-Range Leverage",
      "A developed expression can sustain attention on a consequential objective while resisting short-term noise. The INTJ may identify a small structural change that improves many downstream decisions, sequence work around dependencies, and protect resources for outcomes that take time. This strategic concentration is strongest when review points invite disconfirming evidence and when collaborators understand enough of the model to exercise judgement rather than merely follow instructions.",
    ),
    block(
      "intj-core-risk",
      "risk",
      "When Coherence Becomes Premature Certainty",
      "A model that explains many observations can begin to feel complete before critical assumptions have been tested. The INTJ may discount local objections as short-term thinking or interpret disagreement as failure to understand the system. This can create elegant plans with weak adoption or hidden operational costs. Confidence should rise when the architecture survives serious evidence, not simply because it has become internally consistent.",
    ),
    block(
      "intj-core-reflection",
      "reflection",
      "What Could Change the Model?",
      "Choose one strategic conclusion you currently hold. Which observations support it, which assumptions connect those observations, and what evidence would require revision? Who has access to facts you do not? Share the model before it is finished and ask for the strongest counterexample. The goal is not to surrender independent judgement, but to ensure independence produces a design that can withstand reality outside your own reasoning.",
    ),
  ],
  "motivation-and-needs": [
    block(
      "intj-motivation-summary",
      "summary",
      "Mastery, Autonomy, and Meaningful Progress",
      "INTJs may feel engaged by complex problems, room for independent judgement, opportunities to build competence, and work whose long-term consequence justifies concentrated effort. Motivation often rises when the objective is meaningful and methods are not constrained by unnecessary convention. Not every INTJ wants formal authority or solitary work. The deeper need is usually control over attention and enough coherence to invest effort without constant arbitrary interruption.",
    ),
    block(
      "intj-motivation-analysis",
      "analysis",
      "Autonomy in Service of a System",
      "Independence can protect the uninterrupted thought required for difficult architecture. The person may resist oversight that focuses on visible activity rather than reasoning or outcomes. Autonomy is most productive when paired with transparent constraints, review, and responsibility for consequences. Without those anchors, self-direction can become insulation from feedback. The useful question is which decisions need protected judgement and which improve through earlier collaboration.",
    ),
    block(
      "intj-motivation-strength",
      "strength",
      "Patience for Difficult Improvement",
      "When a goal matters, the INTJ may tolerate a long learning curve and invest in foundations that produce little immediate recognition. This can support deep expertise, careful design, and improvements that outlast a short campaign. The strength depends on periodic contact with users, operators, or other evidence. Persistence is valuable when the direction remains sound, not when effort continues mainly because changing the model feels like wasted competence.",
    ),
    block(
      "intj-motivation-risk",
      "risk",
      "Competence as Protection",
      "Mastery can become a defence against dependence, uncertainty, or visible error. The person may avoid asking for help until a problem is advanced, dismiss tasks where they are not immediately capable, or keep raising standards so the work never feels exposed. Competence remains valuable, but identity becomes more resilient when learning, relationship, and contribution are allowed to include unfinished knowledge and mutual reliance.",
    ),
    block(
      "intj-motivation-guidance",
      "guidance",
      "Define Progress Beyond Private Quality",
      "For a major commitment, identify the internal quality standard and the external evidence that the work helps. Add measures for learning, adoption, maintainability, and collaboration. Decide where excellence is essential and where a usable version will create better information. Share one uncertainty with a trusted colleague before solving it alone. This keeps mastery connected to consequence rather than using refinement to postpone exposure.",
    ),
  ],
  "information-processing": [
    block(
      "intj-information-summary",
      "summary",
      "Patterns, Trajectories, and System Logic",
      "An INTJ pattern often attends to underlying structure, future implications, and the few variables that organise many surface events. Information becomes useful when it clarifies a trajectory or improves the internal model of the system. This can support strategic foresight, provided abstraction remains connected to current measurements, operational detail, and alternative explanations. Pattern recognition generates hypotheses; it does not remove the need for evidence.",
    ),
    block(
      "intj-information-analysis",
      "analysis",
      "Compressing Complexity Into a Model",
      "The person may synthesise large amounts of information into a compact explanation of how parts relate and where the system is heading. A good model reduces noise and guides priorities. Compression also discards detail, including details that may reveal a different mechanism. Record which facts the model explains poorly, and distinguish observations from inferences so a clean narrative does not conceal uncertainty.",
    ),
    block(
      "intj-information-strength",
      "strength",
      "Seeing Second-Order Consequences",
      "INTJs may naturally ask what a present decision makes more likely later: which dependency grows, which incentive changes, or which capability becomes difficult to recover. This can protect a team from attractive short-term fixes. The strength becomes practical when future consequences are translated into observable indicators and when probability is communicated honestly rather than as inevitable foresight.",
    ),
    block(
      "intj-information-risk",
      "risk",
      "Filtering Out Inconvenient Reality",
      "Once the organising pattern feels clear, data that does not fit may be labelled exceptional, political, or too operational. Yet one inconvenient detail can reveal a mistaken assumption or a stakeholder cost the architecture ignores. The risk is not abstraction itself; it is allowing the model to determine which evidence counts. Deliberately preserve anomalies until they are explained rather than removed from the strategic picture.",
    ),
    block(
      "intj-information-guidance",
      "guidance",
      "Maintain a Model and an Anomaly Log",
      "Write the current system model, its three most important assumptions, and the indicators expected if it is correct. Beside it, keep observations that do not fit. Review both with someone close to implementation. Revise the architecture when anomalies form a pattern, and record why. This protects long-range coherence while ensuring that evidence can genuinely change the direction.",
    ),
  ],
  "decision-making": [
    block(
      "intj-decisions-summary",
      "summary",
      "Criteria, Consequence, and Deliberate Commitment",
      "INTJs may prefer decisions grounded in explicit objectives, internal consistency, evidence, and long-term consequence. They often want enough time to understand the architecture before committing, then may hold the chosen direction steadily. This can reduce reactive switching. Good judgement still includes human impact, reversibility, and unknowns. A logically coherent choice can fail when the criteria omit adoption, ethics, or information held by others.",
    ),
    block(
      "intj-decisions-analysis",
      "analysis",
      "Private Convergence",
      "The person may compare alternatives internally and communicate only after a preferred direction has emerged. This protects concentration but hides the decision process from collaborators, who may receive a conclusion without the evidence or trade-offs behind it. Earlier visibility does not require endless consensus. Sharing the criteria and uncertainty allows others to improve the model before the cost of change becomes high.",
    ),
    block(
      "intj-decisions-strength",
      "strength",
      "Resisting Short-Term Pressure",
      "An INTJ may hold a necessary long-range choice when immediate incentives favour convenience or appearance. By connecting the decision to system consequences, the person can protect investment, standards, or future capability. This strength needs review triggers so perseverance does not become rigidity. The decision should remain stable because evidence still supports it, not because changing course would challenge the identity of the strategist.",
    ),
    block(
      "intj-decisions-risk",
      "risk",
      "Optimising the Wrong Criteria",
      "Precise analysis can produce a poor decision when the governing criteria are incomplete. Efficiency, scalability, or logical elegance may be optimised while trust, accessibility, timing, or transition cost remains outside the model. Those consequences later return as implementation failure. Before finalising, ask who defines success, who bears the cost, and which qualitative evidence should influence the choice.",
    ),
    block(
      "intj-decisions-guidance",
      "guidance",
      "Expose the Decision Architecture",
      "Document the objective, criteria, assumptions, strongest alternative, and evidence that would trigger review. Share this before the final choice with people who hold different information. Specify what is decided and what remains adjustable. This preserves independent judgement while making the reasoning testable, reducing surprise, and helping collaborators implement the choice with understanding rather than compliance.",
    ),
  ],
  "communication": [
    block(
      "intj-communication-summary",
      "summary",
      "Concise, Structured, and Selective",
      "INTJs may prefer communication that has a clear purpose, coherent reasoning, and enough substance to justify attention. They may speak selectively after internal processing rather than narrate each step. This can make contributions focused, but others cannot infer the private model automatically. Effective communication translates architecture into context, assumptions, decisions, and invitations for evidence without requiring constant social performance.",
    ),
    block(
      "intj-communication-analysis",
      "analysis",
      "The Missing Middle of the Reasoning",
      "Because the INTJ has already connected many steps internally, an explanation may move from problem to conclusion while omitting the bridge. Listeners can experience the result as abrupt or unsupported. The answer is not greater volume; it is a visible logic chain. State what you observed, what it suggests, which uncertainty remains, and why the recommendation follows.",
    ),
    block(
      "intj-communication-risk",
      "risk",
      "Under-Communication and Assumed Understanding",
      "The person may delay sharing until the model feels sufficiently refined, then become frustrated when others lack context or raise questions already resolved privately. Silence can be interpreted as distance, agreement, or lack of interest. Under pressure, concise correction may also sound dismissive. Communicate earlier enough that others can influence the work, not merely receive the completed architecture.",
    ),
    block(
      "intj-communication-guidance",
      "guidance",
      "Share the Draft Model",
      "Use a brief structure: purpose, current model, key evidence, uncertainty, and requested input. Mark the work as a draft so feedback does not feel like a demand for premature closure. When disagreeing, explain which assumption or criterion differs instead of only stating that the conclusion is wrong. This makes precision collaborative and reduces unnecessary interpersonal interpretation.",
    ),
    block(
      "intj-communication-reflection",
      "reflection",
      "What Was Visible to Others?",
      "Review a recent decision that felt obvious to you. What information did collaborators actually receive, and which connections existed only in your own model? Did you ask for evidence early enough to change the direction? What emotional or practical concern was relevant even if it was expressed imprecisely? Clear architecture becomes influential when other people can inspect and use it.",
    ),
  ],
  "teamwork-and-leadership": [
    block(
      "intj-teamwork-summary",
      "summary",
      "Architecting Capability and Direction",
      "In teams, an INTJ may contribute by clarifying long-range direction, redesigning systems, protecting focus, and anticipating dependencies. Leadership can be quiet and architecture-led rather than socially dominant. The person may prefer capable colleagues with meaningful autonomy. Effective teamwork requires making standards and reasoning visible, learning from local expertise, and recognising that coordination is not a distraction from strategy but part of how strategy becomes real.",
    ),
    block(
      "intj-teamwork-analysis",
      "analysis",
      "Selective Collaboration",
      "The INTJ may collaborate intensely when another person contributes expertise or challenge, while finding unfocused group process draining. Selectivity can protect quality and attention. It can also exclude information that arrives through informal conversation or people whose thinking style is less concise. Design collaboration around clear questions and decision rights, but leave enough room for evidence that does not arrive in the preferred format.",
    ),
    block(
      "intj-teamwork-strength",
      "strength",
      "Designing for Independent Judgement",
      "A developed INTJ can create frameworks that help others make consistent decisions without central approval. Clear principles, interfaces, and feedback loops can distribute capability while preserving coherence. This form of leadership scales better than personal control. It works when the architecture includes space for local adaptation and when people understand how to challenge a rule that no longer serves the objective.",
    ),
    block(
      "intj-teamwork-risk",
      "risk",
      "Retreating From Imperfect Collaboration",
      "When meetings are inefficient or reasoning feels weak, the INTJ may withdraw and solve the problem alone. This can produce a better immediate design but reduce ownership, learning, and access to operational knowledge. Repeated withdrawal also reinforces the belief that collaboration adds little value. Improve the structure of collaboration before abandoning it: narrow the question, prepare evidence, and assign decisions deliberately.",
    ),
    block(
      "intj-teamwork-guidance",
      "guidance",
      "Create a Challengeable Architecture",
      "State the strategic principles, constraints, and interfaces that guide the team. Give owners authority within those boundaries and establish review points based on evidence. Invite a designated critic to test assumptions and include operational voices before finalising standards. The aim is a system others can understand, adapt, and improve—not one that functions only when the original architect is present.",
    ),
  ],
  "career-environment": [
    block(
      "intj-career-summary",
      "summary",
      "Depth, Autonomy, and Long-Range Consequence",
      "INTJs may prefer work that rewards independent judgement, complex systems thinking, learning, and sustained improvement. Strategy, technology, research, design, policy, or specialised leadership can offer these conditions, but no career belongs to a type. Fit depends on interests, expertise, values, resources, and organisational reality. The relevant question is whether the work permits depth while connecting private analysis to meaningful external outcomes.",
    ),
    block(
      "intj-career-analysis",
      "analysis",
      "The Need for Protected Attention",
      "Frequent interruption and performative activity can make it difficult to build a coherent model of complex work. The INTJ may need blocks of uninterrupted time and clear decision ownership. Total isolation is not the answer; strategy requires contact with users, colleagues, and changing evidence. A supportive environment alternates focused analysis with purposeful collaboration rather than treating either constant availability or solitary independence as ideal.",
    ),
    block(
      "intj-career-example",
      "example",
      "Work That Rewards Architecture",
      "Systems design, research strategy, product architecture, organisational redesign, policy analysis, or long-range planning may reward the ability to connect principles and consequences. The same job title can vary widely. Examine whether the daily work includes genuine problem ownership, access to evidence, authority to improve structures, and responsibility through implementation rather than relying on occupational stereotypes.",
    ),
    block(
      "intj-career-risk",
      "risk",
      "Waiting for the Perfect System",
      "High standards can make imperfect organisations feel undeserving of effort, while imagined future roles appear more coherent than any real environment. The person may postpone influence until conditions are ideal or repeatedly redesign a path without testing it. Development often requires improving a limited system from inside it. Distinguish constraints that violate core values from ordinary ambiguity, politics, and maintenance that accompany consequential work.",
    ),
    block(
      "intj-career-guidance",
      "guidance",
      "Evaluate Strategic Fit",
      "Assess roles across problem depth, autonomy, evidence quality, time horizon, implementation ownership, and access to capable challenge. Ask how decisions are reviewed and whether long-range work survives short-term pressure. Also identify the communication and relationship work required for influence. Choose an environment where architecture matters, then build the skills that help other people understand and adopt it.",
    ),
  ],
  "relationship-dynamics": [
    block(
      "intj-relationships-summary",
      "summary",
      "Selective Trust and Deliberate Commitment",
      "INTJs may invest deeply in a relatively small number of relationships, valuing honesty, intellectual respect, reliability, and space for independent thought. Care may be expressed through problem solving, planning, or sustained commitment rather than frequent emotional narration. People vary widely, and a type code cannot explain attachment or intimacy. Relationships become stronger when private loyalty is made visible in forms the other person can recognise.",
    ),
    block(
      "intj-relationships-analysis",
      "analysis",
      "Internal Commitment, External Ambiguity",
      "The INTJ may assume that continued presence, practical help, or careful thought clearly communicates care. Another person may need direct appreciation, emotional acknowledgement, or more frequent contact. Neither form is inherently superior. Ask how care is received rather than relying only on the form that feels most sincere to give. Translation protects authenticity while making commitment accessible.",
    ),
    block(
      "intj-relationships-strength",
      "strength",
      "Depth Without Performance",
      "A developed expression can offer steadiness, candid reflection, respect for autonomy, and willingness to engage difficult long-term problems. The INTJ may avoid superficial reassurance and take another person's goals seriously. This can create trust when analysis is invited and emotion is not treated as noise. Deep connection includes being present with an experience that cannot immediately be optimised.",
    ),
    block(
      "intj-relationships-risk",
      "risk",
      "Withdrawing Into Self-Sufficiency",
      "When misunderstood, disappointed, or overwhelmed, the person may retreat into private analysis and reduce communication. This protects short-term control but leaves the other person to interpret silence. A conclusion about the relationship may form internally before concerns are shared. Independence becomes isolation when it removes the possibility of repair. Communicate the need for space, its purpose, and when contact will resume.",
    ),
    block(
      "intj-relationships-guidance",
      "guidance",
      "Make the Inner Position Visible",
      "Practise naming one appreciation, one uncertainty, and one need before offering a solution. When conflict arises, explain the model you are using and ask how the other person understands the situation. Agree on how space and reconnection will work. These actions do not require constant disclosure; they provide enough information for trust to operate without guessing.",
    ),
  ],
  "change-and-adaptation": [
    block(
      "intj-change-summary",
      "summary",
      "Adapting the Architecture",
      "INTJs may anticipate change by modelling future conditions and preparing a coherent route before disruption arrives. They can support transformation when current systems no longer fit long-term needs. Adaptation becomes harder when change contradicts a deeply developed model or arrives without intelligible purpose. The dynamic slot below examines how adjacent preferences may make planning more iterative, practical, or collaborative.",
      [
        {
          id: "intj-combination-adaptation",
          source: "combination",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
    block(
      "intj-change-analysis",
      "analysis",
      "Revision Versus Abandoning the Vision",
      "Because strategic models integrate many decisions, revising one assumption can feel as though the whole architecture is being destabilised. The person may defend the original direction longer than evidence warrants. Separate the underlying purpose from the current design. A model can change while the deeper objective remains intact, and revision often demonstrates stronger strategy than preserving a coherent but inaccurate forecast.",
    ),
    block(
      "intj-change-strength",
      "strength",
      "Preparing for Second-Order Effects",
      "The INTJ may notice that a transition changes incentives, capabilities, and future options beyond the immediate implementation plan. This supports more responsible sequencing and can protect resources others overlook. The strength is most useful when affected people help test the forecast. Change architecture should include lived transition costs, not only the final system's conceptual advantages.",
    ),
    block(
      "intj-change-risk",
      "risk",
      "Rigidity Hidden as Strategic Consistency",
      "A reluctance to revise may be explained as protecting the long term even when evidence has changed. The person can selectively interpret setbacks as poor execution rather than a flawed assumption. This delays learning and may place growing demands on others. Define failure and review criteria before implementation so adaptation does not depend on admitting the entire vision was mistaken.",
    ),
    block(
      "intj-change-guidance",
      "guidance",
      "Version the Strategy",
      "Treat the plan as a versioned model. Record assumptions, expected indicators, review dates, and which elements are stable versus experimental. At each review, identify what reality confirmed, contradicted, or left unresolved. Invite someone independent to challenge the interpretation. Updating a version preserves learning and direction while preventing consistency from becoming attachment to one implementation.",
    ),
  ],
  "stress-and-recovery": [
    block(
      "intj-stress-summary",
      "summary",
      "Contraction, Control, and Over-Isolation",
      "Under sustained stress, an INTJ may withdraw, narrow attention, intensify private planning, or become unusually critical of inefficiency and interruption. At other times the person may react through impulsive sensory activity or urgent attempts to control immediate details. Stress responses vary and are not diagnostic. The useful task is identifying the earliest loss of flexibility, communication, sleep, or perspective for this individual.",
    ),
    block(
      "intj-stress-analysis",
      "analysis",
      "When Solitude Stops Restoring",
      "Private time can restore focus, but prolonged isolation may recycle the same model without new evidence or emotional processing. The person can feel productive while repeatedly refining an explanation and avoiding contact that would alter it. Recovery needs a boundary: enough solitude to reduce input, followed by grounded activity, trusted conversation, and a return to observable facts.",
    ),
    block(
      "intj-stress-evidence",
      "evidence",
      "Personal Early-Warning Signals",
      "Possible signals include cancelling contact, reworking plans without new data, becoming contemptuous of ordinary mistakes, losing tolerance for ambiguity, or neglecting physical routines while trying to solve the system mentally. These signs are individual rather than universal. Track what appears before judgement, sleep, health, or relationship quality declines, and ask trusted people what change they notice first.",
    ),
    block(
      "intj-stress-risk",
      "risk",
      "Solving Pressure With More Architecture",
      "When the problem involves grief, exhaustion, conflict, or limited control, another plan may create temporary distance without resolving the experience. The INTJ may analyse causes while remaining disconnected from support or bodily needs. Strategic thinking is still available later. Immediate recovery may require naming the feeling, reducing obligations, accepting uncertainty, or asking directly for help.",
    ),
    block(
      "intj-stress-guidance",
      "guidance",
      "Ground, Communicate, and Reduce Scope",
      "Pause one nonessential optimisation, restore sleep and movement, and choose one concrete task that can be finished without redesigning the system. Tell a trusted person that capacity is reduced and specify the support needed. Revisit strategic conclusions after recovery and new evidence. If distress is persistent or significantly affects functioning, seek appropriate professional support rather than using type language as an explanation.",
    ),
  ],
  "growth-roadmap": [
    block(
      "intj-growth-summary",
      "summary",
      "From Private Vision to Shared Capability",
      "INTJ development is not about abandoning independence or long-range thought. It involves making models challengeable, communicating before certainty, distinguishing excellence from perfectionism, and allowing relationship and operational evidence to shape the architecture. Growth expands strategic range: the person can still protect depth while involving others early enough to improve and carry the work. The dynamic slot below highlights combinations affecting this path.",
      [
        {
          id: "intj-combination-isolation-risk",
          source: "combination",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
    block(
      "intj-growth-analysis",
      "analysis",
      "Collaboration as Model Expansion",
      "Collaboration need not mean surrendering judgement or accepting unfocused process. At its best, it adds observations, constraints, and interpretations unavailable to one mind. The developmental task is designing collaboration with enough clarity to protect depth and enough openness to permit real influence. A consultation that cannot change the plan is communication, not evidence gathering.",
    ),
    block(
      "intj-growth-risk",
      "risk",
      "Perfectionism Disguised as Readiness",
      "The person may delay release, delegation, or conversation until the work meets a private standard that keeps moving. This preserves control but prevents feedback from improving the actual outcome. Perfectionism often focuses attention on defects that are intellectually visible rather than consequences that matter most. Define the required quality level, the cost of delay, and the evidence only real use can provide.",
    ),
    block(
      "intj-growth-guidance",
      "guidance",
      "Practise Earlier Exposure",
      "Choose one model, proposal, or concern and share it at sixty-percent clarity with a trusted, relevant person. State what is stable, what is uncertain, and what feedback could change the direction. Resist solving every objection immediately; record it and review the architecture later. Repeat weekly so visibility becomes part of rigorous thinking rather than a threat to it.",
    ),
    block(
      "intj-growth-action",
      "action",
      "A Monthly Assumption Review",
      "Once a month, select one important strategy and review its assumptions, anomalies, stakeholder effects, and implementation evidence. Identify one belief that strengthened and one that weakened. Communicate any revision and credit the evidence source. This creates a visible practice of intellectual humility while preserving the INTJ's strength in coherent long-range design.",
    ),
  ],
  "ninety-day-action-plan": [
    block(
      "intj-action-summary",
      "summary",
      "A Ninety-Day Shared-Architecture Practice",
      "Use the next ninety days to test whether earlier exposure improves a meaningful strategic outcome. Choose one project that requires both deep analysis and adoption by others. Preserve focused work, but make assumptions and provisional decisions visible at planned intervals. The objective is a stronger architecture that other people can understand, challenge, and execute—not maximum consensus or a flawless plan.",
    ),
    block(
      "intj-action-days-1-30",
      "action",
      "Days 1–30 · Map and Expose",
      "Write the objective, system model, key assumptions, anomalies, stakeholders, and evidence thresholds. Identify two people with different access to reality and share the draft before deciding the full route. Ask each for one counterexample and one implementation concern. Define which quality standards are essential and which can be tested through an early version.",
    ),
    block(
      "intj-action-days-31-60",
      "action",
      "Days 31–60 · Build and Test",
      "Implement the highest-leverage part of the architecture with clear interfaces and measures. Hold focused work periods, then review evidence with operators or users. Track where private predictions were accurate, incomplete, or wrong. Communicate changes to the model and release one useful version before every detail reaches the preferred standard.",
    ),
    block(
      "intj-action-days-61-90",
      "action",
      "Days 61–90 · Distribute and Integrate",
      "Transfer meaningful decision authority using principles, constraints, and review triggers rather than step-by-step control. Complete documentation and invite someone else to explain or adapt the architecture. Evaluate outcome, adoption, maintainability, and capability built in others. Revise the model based on what occurred, not only on whether the original plan was followed.",
    ),
    block(
      "intj-action-review",
      "reflection",
      "Evidence of Development",
      "Review concrete indicators: assumptions shared early, counterexamples retained, useful versions released, decisions revised from evidence, and responsibility distributed without loss of coherence. Ask collaborators whether the reasoning became easier to understand and challenge. Development is demonstrated by repeated behaviour under real conditions, not by agreement with an attractive strategic identity.",
    ),
    block(
      "intj-action-guidance",
      "guidance",
      "Protect Depth Without Returning to Isolation",
      "If collaboration becomes noisy, improve its structure rather than abandoning it. Narrow the question, request evidence in advance, and separate consultation from decision rights. If perfectionism delays delivery, reduce scope while preserving the critical quality standard. The plan succeeds when independent thought and external correction become parts of one reliable process.",
    ),
  ],
  methodology: [
    block(
      "intj-methodology-framework",
      "analysis",
      "How to Use This Report",
      "This report interprets an MBTI-style preference result using EI, SN, TF, and JP dimensions, confidence values, static type-level content, and matched dynamic rules. It describes tendencies for reflection. It is not a clinical diagnosis, intelligence test, capability assessment, or scientifically absolute account of personality. No section should be used alone for consequential employment, educational, relationship, financial, or health decisions.",
    ),
    block(
      "intj-methodology-variation",
      "evidence",
      "Context and Individual Variation",
      "People sharing an INTJ result can differ substantially because of culture, age, expertise, responsibilities, health, values, environment, and development. Balanced or lower-confidence dimensions increase the likelihood that neighbouring preferences are similarly accessible. Give repeated lived evidence more weight than a type stereotype, and treat descriptions that do not fit as information rather than a failure to match the code.",
    ),
    block(
      "intj-methodology-dynamic",
      "analysis",
      "Dynamic Interpretation",
      "Generated reports select rule content from supplied dimension scores and confidence patterns. Applied-rule metadata records which adaptations were inserted, supporting traceability across report, content, and rule versions. Dynamic text can qualify a broad narrative, but it cannot infer motive, history, maturity, mental health, or future outcomes. Interpretation remains a reflective aid rather than an automated judgement.",
    ),
    block(
      "intj-methodology-version",
      "guidance",
      "Version and Responsible Review",
      "Report version: 1.0.0. Content version: 1.0.0. Rule version: 1.0.0. These identifiers preserve the source used to generate a result as content and rules evolve. Revisit the report when circumstances or self-understanding change, compare it with feedback and behaviour, and retain only interpretations that support accurate and responsible reflection.",
    ),
  ],
};

export const INTJ_COMPLETE_REPORT:
  CompletePersonalityReportDefinition = {
    personalityType: "INTJ",
    version: COMPLETE_PERSONALITY_REPORT_VERSION,
    title: { en: "INTJ Complete Personality Report" },
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
