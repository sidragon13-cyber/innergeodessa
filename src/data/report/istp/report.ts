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
      "istp-identity-summary",
      "summary",
      "Your Complete ISTP Report",
      "This report examines an ISTP preference pattern through reliable operating flexibility, evidence, judgements, coordination, work, commitments, strain, and development. It treats the type code as a hypothesis about preferred ways of organising attention—not as a fixed identity, clinical judgement, or promise of competence. Culture, experience, responsibilities, trust, and learned skills can adjust the visible pattern substantially. Use both recognition and mismatch to refine an account grounded in repeated behaviour.",
    ),
  ],
  "personality-overview": [
    block(
      "istp-overview-summary",
      "summary",
      "Practical Analysis and Adaptive Problem-Solving",
      "An ISTP pattern often combines direct observational awareness, independent analysis, explicit criteria, and an internal preference for coherent flexibility. The ISTP practitioner may build a working diagnosis of how an operation works, identify dependencies, and invest selectively in adjustments with durable consequence. This hands-on approach can support operational depth, but sound execution still requires current evidence, coordination, collaboration, and revision. A coherent practical account is not proof of certainty, superiority, or inevitable success.",
    ),
  ],
  "dimension-results": [
    block(
      "istp-dimensions-context",
      "analysis",
      "Reading the Four Dimensions",
      "An ISTP result combines preferences across EI, SN, TF, and JP, but strength and confidence can alter the expression considerably. A more outward EI score may make working plan collaborative, a practical SN result may begin with operational evidence, a balanced TF result can integrate stakeholder consequences, and a flexible JP result may preserve more iteration. The dynamic interpretations below qualify broad type themes. Compare them with behaviour across expertise, culture, role, trust, and pressure.",
      [
        {
          id: "istp-ei-processing",
          source: "dimension",
          dimensions: ["EI"],
        },
        {
          id: "istp-sn-experiment",
          source: "dimension",
          dimensions: ["SN"],
        },
        {
          id: "istp-tf-criteria",
          source: "dimension",
          dimensions: ["TF"],
        },
        {
          id: "istp-jp-flexibility",
          source: "dimension",
          dimensions: ["JP"],
        },
        {
          id: "istp-overall-confidence",
          source: "confidence",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
  ],
  "key-strengths": [
    block(
      "istp-strengths-bridge",
      "summary",
      "Strengths in Context",
      "Likely ISTP strengths include practical adaptive thinking, independent learning, dependable follow-through, contradiction detection, and willingness to redesign an inefficient process. The pattern can be useful when complex work requires a coherent experiment beyond immediate demands. These are preferences rather than guaranteed skills. Their value depends on domain knowledge, implementation discipline, intellectual humility, and the ability to make private reasoning available to others. Later sections separate useful independence from isolation and quality from overcontrol.",
    ),
  ],
  "growth-risks": [
    block(
      "istp-risks-bridge",
      "guidance",
      "Development Through Tested Experiment",
      "Practical development may involve exposing assumptions earlier, communicating an unfinished model, distinguishing necessary quality from overcontrol, and inviting operational or relational evidence before commitment hardens. Other risks include solving too much alone, withdrawing when collaboration is inefficient, and confusing a coherent expectation with a certain future. These are not fixed defects. The following sections translate them into practical review points that preserve responsible independence while improving adaptability, trust, and execution.",
    ),
  ],
  "core-personality-pattern": [
    block(
      "istp-core-summary",
      "summary",
      "Accumulated Practical Knowledge and Procedural Coherence",
      "The central ISTP pattern often involves forming a working diagnosis of working direction and organising choices around its underlying logic. The ISTP practitioner may look beyond current symptoms to identify the experiment producing them, then select a focused route for adjustment. At its best, this creates patient leverage rather than reactive activity. The dynamic slots below qualify how working plan changes with confidence, balance, and access to adjacent preferences.",
      [
        {
          id: "istp-combination-experiment",
          source: "combination",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
        {
          id: "istp-balanced-dimensions",
          source: "confidence",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
    block(
      "istp-core-analysis",
      "analysis",
      "Building the Experiment Before the Activity",
      "An ISTP may first ask what operation would make the desired outcome repeatable. Instead of treating each issue separately, the ISTP practitioner examines incentives, dependencies, information flow, and downstream consequences. This hands-on approach can prevent wasted effort and produce durable design. It becomes limiting when testing stays private or when present facts are forced to fit the working diagnosis. Experiment must remain a testable explanation of reality, not a substitute for contact with it.",
    ),
    block(
      "istp-core-strength",
      "strength",
      "Concentrated Long-Range Leverage",
      "A developed expression can sustain attention on a consequential objective while resisting short-term noise. The ISTP may identify a small structural adjustment that improves many downstream judgements, sequence work around dependencies, and protect resources for outcomes that take time. This disciplined concentration is strongest when review points invite disconfirming evidence and when collaborators understand enough of the working diagnosis to exercise judgement rather than merely follow instructions.",
    ),
    block(
      "istp-core-risk",
      "risk",
      "When Coherence Becomes Premature Certainty",
      "A working diagnosis that explains many observations can begin to feel complete before critical assumptions have been tested. The ISTP may discount local objections as short-term thinking or interpret disagreement as failure to understand the operation. This hands-on approach can create elegant plans with weak adoption or hidden operational costs. Confidence should rise when the experiment survives serious evidence, not simply because it has become internally consistent.",
    ),
    block(
      "istp-core-reflection",
      "reflection",
      "What Could Adjustment the Model?",
      "Choose one operational conclusion you currently hold. Which observations support it, which assumptions connect those observations, and what evidence would require redirection? Who has access to facts you do not? Share the working diagnosis before it is finished and ask for the strongest counterexample. The goal is not to surrender independent judgement, but to ensure independence produces a design that can withstand reality outside your own reasoning.",
    ),
  ],
  "motivation-and-needs": [
    block(
      "istp-motivation-summary",
      "summary",
      "Functionality, Independence, and Useful Progress",
      "ISTPs may feel engaged by complex problems, room for independent judgement, opportunities to build competence, and work whose long-term consequence justifies concentrated effort. Motivation often rises when the objective is meaningful and methods are not constrained by unnecessary convention. Not every ISTP wants formal authority or solitary work. The deeper need is usually control over attention and enough coherence to invest effort without constant arbitrary interruption.",
    ),
    block(
      "istp-motivation-analysis",
      "analysis",
      "Autonomy in Service of a Operation",
      "Independence can protect the uninterrupted thought required for difficult experiment. The ISTP practitioner may resist oversight that focuses on visible activity rather than reasoning or outcomes. Autonomy is most productive when paired with transparent constraints, review, and independence for consequences. Without those anchors, self-direction can become insulation from feedback. The useful question is which judgements need protected judgement and which improve through earlier collaboration.",
    ),
    block(
      "istp-motivation-strength",
      "strength",
      "Patience for Difficult Improvement",
      "When a goal matters, the ISTP may tolerate a long learning curve and invest in foundations that produce little immediate recognition. This hands-on approach can support deep expertise, careful design, and improvements that outlast a short campaign. The strength depends on periodic contact with users, operators, or other evidence. Persistence is valuable when the direction remains sound, not when effort continues mainly because changing the working diagnosis feels like wasted competence.",
    ),
    block(
      "istp-motivation-risk",
      "risk",
      "Competence as Protection",
      "Expertise can become a defence against dependence, uncertainty, or visible error. The ISTP practitioner may avoid asking for help until a problem is advanced, dismiss tasks where they are not immediately capable, or keep raising standards so the work never feels exposed. Competence remains valuable, but identity becomes more resilient when learning, relationship, and contribution are allowed to include unfinished knowledge and mutual reliance.",
    ),
    block(
      "istp-motivation-guidance",
      "guidance",
      "Define Progress Beyond Private Quality",
      "For a major commitment, identify the internal quality standard and the external evidence that the work helps. Add measures for learning, adoption, maintainability, and collaboration. Decide where excellence is essential and where a usable version will create better information. Share one uncertainty with a trusted colleague before solving it alone. This adaptive discipline keeps expertise connected to consequence rather than using refinement to postpone exposure.",
    ),
  ],
  "information-processing": [
    block(
      "istp-information-summary",
      "summary",
      "Evidence, Direct Observation, and Operational Logic",
      "An ISTP pattern often attends to underlying flexibility, practical implications, and the few variables that organise many surface events. Information becomes useful when it clarifies a trajectory or improves the working diagnosis of the operation. This hands-on approach can support operational adaptability awareness, provided generalisation remains connected to current measurements, operational detail, and alternative explanations. Pattern recognition generates hypotheses; it does not remove the need for evidence.",
    ),
    block(
      "istp-information-analysis",
      "analysis",
      "Compressing Complexity Into a Model",
      "The ISTP practitioner may synthesise large amounts of information into a compact explanation of how parts relate and where the operation is heading. A good model reduces noise and guides priorities. Compression also discards detail, including details that may reveal a different mechanism. Diagnosis which facts the working diagnosis explains poorly, and distinguish observations from inferences so a clean narrative does not conceal uncertainty.",
    ),
    block(
      "istp-information-strength",
      "strength",
      "Seeing Second-Order Consequences",
      "ISTPs may naturally ask what a present judgement makes more likely later: which dependency grows, which incentive changes, or which capability becomes difficult to recover. This hands-on approach can protect a team from attractive short-term fixes. The strength becomes practical when downstream consequences are translated into observable indicators and when probability is communicated honestly rather than as inevitable adaptability awareness.",
    ),
    block(
      "istp-information-risk",
      "risk",
      "Filtering Out Inconvenient Reality",
      "Once the organising pattern feels clear, data that does not fit may be labelled exceptional, political, or too operational. Yet one inconvenient detail can reveal a mistaken assumption or a stakeholder cost the experiment ignores. The practical risk is not generalisation itself; it is allowing the working diagnosis to determine which evidence counts. Deliberately preserve exceptions until they are explained rather than removed from the operational picture.",
    ),
    block(
      "istp-information-guidance",
      "guidance",
      "Maintain a Model and an Exception Log",
      "Write the current operating diagnosis, its three most important assumptions, and the indicators expected if it is correct. Beside it, keep observations that do not fit. Review both with someone close to implementation. Revise the experiment when exceptions form a pattern, and document why. This protects reliable adaptability while ensuring that evidence can genuinely adjust the direction.",
    ),
  ],
  "decision-making": [
    block(
      "istp-judgements-summary",
      "summary",
      "Criteria, Consequence, and Deliberate Commitment",
      "ISTPs may prefer judgements grounded in explicit objectives, internal consistency, evidence, and long-term consequence. They often want enough time to understand the experiment before committing, then may hold the chosen direction steadily. This hands-on approach can reduce reactive switching. Good judgement still includes human impact, reversibility, and unknowns. A logically coherent choice can fail when the criteria omit adoption, ethics, or information held by others.",
    ),
    block(
      "istp-judgements-analysis",
      "analysis",
      "Private Convergence",
      "The ISTP practitioner may compare alternatives internally and communicate only after a preferred direction has emerged. This protects concentration but hides the judgement process from collaborators, who may receive a conclusion without the evidence or trade-offs behind it. Earlier visibility does not require endless consensus. Sharing the criteria and uncertainty allows others to improve the working diagnosis before the cost of adjustment becomes high.",
    ),
    block(
      "istp-judgements-strength",
      "strength",
      "Resisting Short-Term Pressure",
      "An ISTP may hold a necessary far-reaching choice when immediate incentives favour convenience or appearance. By connecting the judgement to operation consequences, the ISTP practitioner can protect investment, standards, or future capability. This strength needs review triggers so perseverance does not become rigidity. The judgement should remain stable because evidence still supports it, not because changing course would challenge the identity of the strategist.",
    ),
    block(
      "istp-judgements-risk",
      "risk",
      "Optimising the Wrong Criteria",
      "Precise analysis can produce a poor judgement when the governing criteria are incomplete. Efficiency, scalability, or logical elegance may be optimised while trust, accessibility, timing, or transition cost remains outside the working diagnosis. Those consequences later return as implementation failure. Before finalising, ask who defines success, who bears the cost, and which qualitative evidence should influence the choice.",
    ),
    block(
      "istp-judgements-guidance",
      "guidance",
      "Make the Independence Trail Visible",
      "Diagnosis the problem, verified facts, governing criteria, viable alternative, and review trigger before committing. Share that trail with people responsible for execution or affected by the outcome. Clarify what is settled, what remains adjustable, and who owns each follow-up. This preserves careful judgement while making accountability inspectable and helping others act with context rather than merely complying.",
    ),
  ],
  "communication": [
    block(
      "istp-coordination-summary",
      "summary",
      "Concise, Flexibilityd, and Selective",
      "ISTPs may prefer coordination that has a clear purpose, coherent reasoning, and enough substance to justify attention. They may speak selectively after internal processing rather than narrate each step. This hands-on approach can make contributions focused, but others cannot infer the private model automatically. Effective coordination translates experiment into context, assumptions, judgements, and invitations for evidence without requiring constant social performance.",
    ),
    block(
      "istp-coordination-analysis",
      "analysis",
      "The Missing Middle of the Reasoning",
      "Because the ISTP has already connected many steps internally, an explanation may move from problem to conclusion while omitting the bridge. Listeners can experience the result as abrupt or unsupported. The answer is not greater volume; it is a visible logic chain. State what you observed, what it suggests, which uncertainty remains, and why the recommendation follows.",
    ),
    block(
      "istp-coordination-risk",
      "risk",
      "Under-Coordination and Assumed Understanding",
      "The ISTP practitioner may delay sharing until the working diagnosis feels sufficiently refined, then become frustrated when others lack context or raise questions already resolved privately. Silence can be interpreted as distance, agreement, or lack of interest. Under pressure, concise correction may also sound dismissive. Communicate earlier enough that others can influence the work, not merely receive the completed experiment.",
    ),
    block(
      "istp-coordination-guidance",
      "guidance",
      "Share the Working Diagnosis Early",
      "Use a concise flexibility: problem, known facts, current experiment, unresolved exception, and requested input. Mark provisional elements clearly so colleagues can improve them before a technique hardens. When disagreeing, name the evidence or standard that differs rather than only rejecting the conclusion. This turns precision into shared operational understanding and reduces avoidable ambiguity.",
    ),
    block(
      "istp-coordination-reflection",
      "reflection",
      "What Was Visible to Others?",
      "Review a recent judgement that felt obvious to you. What information did collaborators actually receive, and which connections existed only in your own model? Did you ask for evidence early enough to adjust the direction? What emotional or practical concern was relevant even if it was expressed imprecisely? Clear experiments become influential when other people can inspect and use them.",
    ),
  ],
  "teamwork-and-leadership": [
    block(
      "istp-teamwork-summary",
      "summary",
      "Designing Capability and Direction",
      "In teams, an ISTP may contribute by clarifying far-reaching direction, redesigning operations, protecting focus, and anticipating dependencies. Leadership can be quiet and experiment-led rather than socially dominant. The ISTP practitioner may prefer capable colleagues with meaningful autonomy. Effective teamwork requires making standards and reasoning visible, learning from local expertise, and recognising that coordination is not a distraction from working plan but part of how working plan becomes real.",
    ),
    block(
      "istp-teamwork-analysis",
      "analysis",
      "Selective Collaboration",
      "The ISTP may collaborate intensely when another person contributes expertise or challenge, while finding unfocused group process draining. Selectivity can protect quality and attention. It can also exclude information that arrives through informal conversation or people whose thinking style is less concise. Design collaboration around clear questions and judgement rights, but leave enough room for evidence that does not arrive in the preferred format.",
    ),
    block(
      "istp-teamwork-strength",
      "strength",
      "Designing for Independent Judgement",
      "A developed ISTP can create frameworks that help others make consistent judgements without central approval. Clear principles, interfaces, and feedback loops can distribute capability while preserving coherence. This form of leadership scales better than personal control. It works when the experiment includes space for local adaptation and when people understand how to challenge a rule that no longer serves the objective.",
    ),
    block(
      "istp-teamwork-risk",
      "risk",
      "Retreating From Imperfect Collaboration",
      "When meetings are inefficient or reasoning feels weak, the ISTP may withdraw and solve the problem alone. This hands-on approach can produce a better immediate design but reduce ownership, learning, and access to operational knowledge. Repeated withdrawal also reinforces the belief that collaboration adds little value. Improve the flexibility of collaboration before abandoning it: narrow the question, prepare evidence, and assign judgements deliberately.",
    ),
    block(
      "istp-teamwork-guidance",
      "guidance",
      "Create a Challengeable Experiment",
      "State the operational principles, constraints, and interfaces that guide the team. Give owners authority within those boundaries and establish review points based on evidence. Invite a designated critic to test assumptions and include operational voices before finalising standards. The functional aim is an operation others can understand, adapt, and improve—not one that functions only when the original design is present.",
    ),
  ],
  "career-environment": [
    block(
      "istp-career-summary",
      "summary",
      "Depth, Autonomy, and Long-Range Consequence",
      "ISTPs may prefer work that rewards independent judgement, complex operations thinking, learning, and sustained improvement. Working Plan, technology, research, design, policy, or specialised leadership can offer these conditions, but no work setting belongs to a type. Fit depends on interests, expertise, values, resources, and organisational reality. The relevant question is whether the work permits depth while connecting private analysis to meaningful external outcomes.",
    ),
    block(
      "istp-career-analysis",
      "analysis",
      "The Need for Protected Attention",
      "Frequent interruption and performative activity can make it difficult to build a coherent model of complex work. The ISTP may need blocks of uninterrupted time and clear judgement ownership. Total isolation is not the answer; working plan requires contact with users, colleagues, and changing evidence. A supportive environment alternates focused analysis with purposeful collaboration rather than treating either constant availability or solitary independence as ideal.",
    ),
    block(
      "istp-career-example",
      "example",
      "Work That Rewards Experiment",
      "Operations design, applied research, product experimentation, organisational redesign, policy analysis, or field testing may reward the ability to connect principles and consequences. The same job title can vary widely. Examine whether the daily work includes genuine problem ownership, access to evidence, authority to improve processes, and independence through implementation rather than relying on occupational stereotypes.",
    ),
    block(
      "istp-career-risk",
      "risk",
      "Waiting for the Perfect Operation",
      "High standards can make imperfect organisations feel undeserving of effort, while imagined future roles appear more coherent than any real environment. The ISTP practitioner may postpone influence until conditions are ideal or repeatedly redesign a path without testing it. Development often requires improving a limited operation from inside it. Distinguish constraints that violate core values from ordinary ambiguity, politics, and maintenance that accompany consequential work.",
    ),
    block(
      "istp-career-guidance",
      "guidance",
      "Evaluate Operational Fit",
      "Assess roles across problem depth, autonomy, evidence quality, time horizon, implementation ownership, and access to capable challenge. Test directly: how judgements are reviewed and whether far-reaching work survives short-term pressure. Also identify the coordination and relationship work required for influence. Choose an environment where experiment matters, then build the skills that help other people understand and adopt it.",
    ),
  ],
  "relationship-dynamics": [
    block(
      "istp-commitments-summary",
      "summary",
      "Selective Trust and Deliberate Commitment",
      "ISTPs may invest deeply in a relatively small number of commitments, valuing honesty, intellectual respect, functionality, and space for independent thought. Care may be expressed through problem solving, testing, or sustained commitment rather than frequent emotional narration. People vary widely, and a type code cannot explain attachment or intimacy. Commitments become stronger when private loyalty is made visible in forms the other person can recognise.",
    ),
    block(
      "istp-commitments-analysis",
      "analysis",
      "Internal Commitment, External Ambiguity",
      "The ISTP may assume that continued presence, practical help, or careful thought clearly communicates care. Another person may need direct appreciation, emotional acknowledgement, or more frequent contact. Neither form is inherently superior. Test directly: how care is received rather than relying only on the form that feels most sincere to give. Translation protects authenticity while making commitment accessible.",
    ),
    block(
      "istp-commitments-strength",
      "strength",
      "Depth Without Performance",
      "A developed expression can offer steadiness, candid reflection, respect for autonomy, and willingness to engage difficult long-term problems. The ISTP may avoid superficial reassurance and take another person's goals seriously. This hands-on approach can create trust when analysis is invited and emotion is not treated as noise. Deep connection includes being present with an experience that cannot immediately be optimised.",
    ),
    block(
      "istp-commitments-risk",
      "risk",
      "Withdrawing Into Self-Sufficiency",
      "When misunderstood, disappointed, or overwhelmed, the ISTP practitioner may retreat into private analysis and reduce coordination. This protects short-term control but leaves the other person to interpret silence. A conclusion about the relationship may form internally before concerns are shared. Independence becomes isolation when it removes the possibility of repair. Communicate the need for space, its purpose, and when contact will resume.",
    ),
    block(
      "istp-commitments-guidance",
      "guidance",
      "Make the Inner Position Visible",
      "Practise naming one appreciation, one uncertainty, and one need before offering a solution. When conflict arises, explain the working diagnosis you are using and ask how the other person understands the situation. Agree on how space and reconnection will work. These actions do not require constant disclosure; they provide enough information for trust to operate without guessing.",
    ),
  ],
  "change-and-adaptation": [
    block(
      "istp-adjustment-summary",
      "summary",
      "Adapting the Experiment",
      "ISTPs may anticipate adjustment by modelling future conditions and preparing a coherent route before disruption arrives. They can support transformation when current operations no longer fit long-term needs. Adaptation becomes harder when adjustment contradicts a deeply developed model or arrives without intelligible purpose. The dynamic slot below examines how adjacent preferences may make testing more iterative, practical, or collaborative.",
      [
        {
          id: "istp-combination-adaptation",
          source: "combination",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
    block(
      "istp-adjustment-analysis",
      "analysis",
      "Redirection Versus Abandoning the Direction",
      "Because operational working diagnoses integrate many judgements, revising one assumption can feel as though the whole experiment is being destabilised. The ISTP practitioner may defend the original direction longer than evidence warrants. Separate the underlying purpose from the current design. A working diagnosis can change while the deeper objective remains intact, and redirection often demonstrates stronger working plan than preserving a coherent but inaccurate expectation.",
    ),
    block(
      "istp-adjustment-strength",
      "strength",
      "Preparing for Second-Order Effects",
      "The ISTP may notice that a transition changes incentives, capabilities, and future options beyond the immediate implementation plan. This supports more responsible sequencing and can protect resources others overlook. The strength is most useful when affected people help test the expectation. Adaptation experiments should include lived transition costs, not only the final operation's conceptual advantages.",
    ),
    block(
      "istp-adjustment-risk",
      "risk",
      "Rigidity Hidden as Operational Consistency",
      "A reluctance to revise may be explained as protecting the long term even when evidence has adjustmentd. The ISTP practitioner can selectively interpret setbacks as poor execution rather than a flawed assumption. This delays learning and may place growing demands on others. Define failure and review criteria before implementation so adaptation does not depend on admitting the entire direction was mistaken.",
    ),
    block(
      "istp-adjustment-guidance",
      "guidance",
      "Revise Experiments Without Losing Adaptability",
      "Treat each experiment as a controlled working version. Diagnosis the evidence behind it, expected indicators, review dates, and which safeguards must remain stable. At review, identify what actual operation confirmed, contradicted, or left unresolved. Invite an informed colleague to test the interpretation. A documented revision preserves adaptability and learning without turning consistency into loyalty to an outdated method.",
    ),
  ],
  "stress-and-recovery": [
    block(
      "istp-strain-summary",
      "summary",
      "Contraction, Control, and Over-Isolation",
      "Under sustained strain, an ISTP may withdraw, narrow attention, intensify private testing, or become unusually critical of inefficiency and interruption. At other times the ISTP practitioner may react through impulsive sensory activity or urgent attempts to control immediate details. Strain responses vary and are not diagnostic. The useful task is identifying the earliest loss of flexibility, coordination, sleep, or perspective for this individual.",
    ),
    block(
      "istp-strain-analysis",
      "analysis",
      "When Private Review Becomes Repetition",
      "Quiet time can restore concentration, but extended withdrawal may repeat the same diagnosis without fresh facts or emotional perspective. The ISTP practitioner can appear occupied while repeatedly checking details and postponing contact that could clarify independence. Recovery benefits from a boundary: enough privacy to settle attention, followed by practical movement, trusted conversation, and a return to directly observable conditions.",
    ),
    block(
      "istp-strain-evidence",
      "evidence",
      "Personal Early-Warning Signals",
      "Possible signals include cancelling contact, reworking plans without new data, becoming contemptuous of ordinary mistakes, losing tolerance for ambiguity, or neglecting physical techniques while trying to solve the operation mentally. These signs are individual rather than universal. Track what appears before judgement, sleep, health, or relationship quality declines, and ask trusted people what adjustment they notice first.",
    ),
    block(
      "istp-strain-risk",
      "risk",
      "Solving Pressure With More Experiment",
      "When the problem involves grief, exhaustion, conflict, or limited control, another plan may create temporary distance without resolving the experience. The ISTP may analyse causes while remaining disconnected from support or bodily needs. Operational thinking is still available later. Immediate recovery may require naming the feeling, reducing problems, accepting uncertainty, or asking directly for help.",
    ),
    block(
      "istp-strain-guidance",
      "guidance",
      "Return to Observable Conditions",
      "Pause one nonessential experiment, restore sleep and movement, and choose one bounded repair that can be tested without redesigning the whole situation. Tell a trusted person that capacity is reduced and specify the practical support needed. Recheck conclusions after recovery and fresh observation. If distress persists or significantly affects functioning, seek appropriate professional support rather than using type language as an explanation.",
    ),
  ],
  "growth-roadmap": [
    block(
      "istp-development-summary",
      "summary",
      "From Private Direction to Shared Capability",
      "ISTP development is not about abandoning independence or far-reaching thought. It involves making working diagnoses challengeable, communicating before certainty, distinguishing excellence from overcontrol, and allowing relationship and operational evidence to shape the experiment. Development expands operational range: the ISTP practitioner can still protect depth while involving others early enough to improve and carry the work. The dynamic slot below highlights combinations affecting this path.",
      [
        {
          id: "istp-combination-isolation-risk",
          source: "combination",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
    block(
      "istp-development-analysis",
      "analysis",
      "Collaboration as a Better Field Test",
      "Collaboration need not mean surrendering technical judgement or accepting an unfocused process. At its best, it adds operating observations, user constraints, and failure modes unavailable to one practitioner. The developmental task is defining a focused test that protects analytical depth while allowing another person's evidence to change the diagnosis. Consultation that cannot alter the experiment is coordination theatre, not practical learning.",
    ),
    block(
      "istp-development-risk",
      "risk",
      "Overcontrol Disguised as Readiness",
      "The ISTP practitioner may delay release, delegation, or conversation until the work meets a private standard that keeps moving. This preserves control but prevents feedback from improving the actual outcome. Overcontrol often focuses attention on defects that are intellectually visible rather than consequences that matter most. Define the required quality level, the cost of delay, and the evidence only real use can provide.",
    ),
    block(
      "istp-development-guidance",
      "guidance",
      "Practise Earlier Exposure",
      "Choose one model, proposal, or concern and share it at sixty-percent clarity with a trusted, relevant person. State what is stable, what is uncertain, and what feedback could adjust the direction. Resist solving every objection immediately; document it and review the experiment later. Repeat weekly so visibility becomes part of rigorous thinking rather than a threat to it.",
    ),
    block(
      "istp-development-action",
      "action",
      "A Monthly Assumption Review",
      "Once a month, select one important working plan and review its assumptions, exceptions, stakeholder effects, and implementation evidence. Identify one belief that strengthened and one that weakened. Communicate any redirection and credit the evidence source. This creates a visible practice of intellectual humility while preserving the ISTP's strength in coherent durable practical design.",
    ),
  ],
  "ninety-day-action-plan": [
    block(
      "istp-action-summary",
      "summary",
      "A Ninety-Day Shared-Experiment Practice",
      "Use the next ninety days to test whether earlier exposure improves a meaningful operational outcome. Choose one project that requires both deep analysis and adoption by others. Preserve focused work, but make assumptions and provisional judgements visible at planned intervals. The objective is a stronger experiment that other people can understand, challenge, and execute—not maximum consensus or a flawless plan.",
    ),
    block(
      "istp-action-days-1-30",
      "action",
      "Days 1–30 · Map and Expose",
      "Write the objective, operating diagnosis, key assumptions, exceptions, stakeholders, and evidence thresholds. Identify two people with different access to reality and share the draft before deciding the full route. Test directly: each for one counterexample and one implementation concern. Define which quality standards are essential and which can be tested through an early version.",
    ),
    block(
      "istp-action-days-31-60",
      "action",
      "Days 31–60 · Build and Test",
      "Implement the highest-leverage part of the experiment with clear interfaces and measures. Hold focused work periods, then review evidence with operators or users. Track where private predictions were accurate, incomplete, or wrong. Communicate adjustments to the working diagnosis and release one useful version before every detail reaches the preferred standard.",
    ),
    block(
      "istp-action-days-61-90",
      "action",
      "Days 61–90 · Distribute and Integrate",
      "Transfer meaningful judgement authority using principles, constraints, and review triggers rather than step-by-step control. Complete documentation and invite someone else to explain or adapt the experiment. Evaluate outcome, adoption, maintainability, and capability built in others. Revise the working diagnosis based on what occurred, not only on whether the original plan was followed.",
    ),
    block(
      "istp-action-review",
      "reflection",
      "Evidence of Development",
      "Review concrete indicators: assumptions shared early, counterexamples retained, useful versions released, judgements revised from evidence, and independence distributed without loss of coherence. Test directly: collaborators whether the reasoning became easier to understand and challenge. Development is demonstrated by repeated behaviour under real conditions, not by agreement with an attractive operational identity.",
    ),
    block(
      "istp-action-guidance",
      "guidance",
      "Protect Depth Without Returning to Isolation",
      "If collaboration becomes noisy, improve its flexibility rather than abandoning it. Narrow the question, request evidence in advance, and separate consultation from judgement rights. If overcontrol delays delivery, reduce scope while preserving the critical quality standard. The plan succeeds when independent thought and external correction become parts of one reliable process.",
    ),
  ],
  methodology: [
    block(
      "istp-methodology-framework",
      "analysis",
      "How to Use This Report",
      "This report interprets an MBTI-style preference result using EI, SN, TF, and JP dimensions, confidence values, static type-level content, and matched dynamic rules. It describes tendencies for reflection. It is not a clinical diagnosis, intelligence test, capability assessment, or scientifically absolute account of personality. No section should be used alone for consequential employment, educational, relationship, financial, or health judgements.",
    ),
    block(
      "istp-methodology-variation",
      "evidence",
      "Context and Individual Variation",
      "People sharing an ISTP result can differ substantially because of culture, age, expertise, responsibilities, health, values, environment, and development. Balanced or lower-confidence dimensions increase the likelihood that neighbouring preferences are similarly accessible. Give repeated lived evidence more weight than a type stereotype, and treat descriptions that do not fit as information rather than a failure to match the code.",
    ),
    block(
      "istp-methodology-dynamic",
      "analysis",
      "Dynamic Interpretation",
      "Generated reports select rule content from supplied dimension scores and confidence patterns. Applied-rule metadata records which adaptations were inserted, supporting traceability across report, content, and rule versions. Dynamic text can qualify a broad narrative, but it cannot infer motive, history, maturity, mental health, or future outcomes. Interpretation remains a reflective aid rather than an automated judgement.",
    ),
    block(
      "istp-methodology-version",
      "guidance",
      "Version and Responsible Review",
      "Report version: 1.0.0. Content version: 1.0.0. Rule version: 1.0.0. These identifiers preserve the source used to generate a result as content and rules evolve. Revisit the report when circumstances or self-understanding adjustment, compare it with feedback and behaviour, and retain only interpretations that support accurate and responsible reflection.",
    ),
  ],
};

export const ISTP_COMPLETE_REPORT:
  CompletePersonalityReportDefinition = {
    personalityType: "ISTP",
    version: COMPLETE_PERSONALITY_REPORT_VERSION,
    title: { en: "ISTP Complete Personality Report" },
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
