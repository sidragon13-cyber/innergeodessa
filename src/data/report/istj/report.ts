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
      "istj-identity-summary",
      "summary",
      "Your Complete ISTJ Report",
      "This report examines an ISTJ preference pattern through reliable operating structure, evidence, judgements, coordination, work, commitments, strain, and development. It treats the type code as a hypothesis about preferred ways of organising attention—not as a fixed identity, clinical judgement, or promise of competence. Culture, experience, responsibilities, trust, and learned skills can adjust the visible pattern substantially. Use both recognition and mismatch to refine an account grounded in repeated behaviour.",
    ),
  ],
  "personality-overview": [
    block(
      "istj-overview-summary",
      "summary",
      "Reliable Structure and Evidence-Based Responsibility",
      "An ISTJ pattern often combines verified precedent awareness, independent analysis, explicit criteria, and an internal preference for coherent structure. The person may build a working record of how an operation works, identify dependencies, and invest selectively in adjustments with durable consequence. This can support operational depth, but sound execution still requires current evidence, coordination, collaboration, and revision. A coherent practical account is not proof of certainty, superiority, or inevitable success.",
    ),
  ],
  "dimension-results": [
    block(
      "istj-dimensions-context",
      "analysis",
      "Reading the Four Dimensions",
      "An ISTJ result combines preferences across EI, SN, TF, and JP, but strength and confidence can alter the expression considerably. A more outward EI score may make planning collaborative, a practical SN result may reinforce attention to operational evidence, a balanced TF result can integrate stakeholder consequences, and a flexible JP result may preserve more iteration. The dynamic interpretations below qualify broad type themes. Compare them with behaviour across expertise, culture, role, trust, and pressure.",
      [
        {
          id: "istj-ei-processing",
          source: "dimension",
          dimensions: ["EI"],
        },
        {
          id: "istj-sn-procedure",
          source: "dimension",
          dimensions: ["SN"],
        },
        {
          id: "istj-tf-criteria",
          source: "dimension",
          dimensions: ["TF"],
        },
        {
          id: "istj-jp-structure",
          source: "dimension",
          dimensions: ["JP"],
        },
        {
          id: "istj-overall-confidence",
          source: "confidence",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
  ],
  "key-strengths": [
    block(
      "istj-strengths-bridge",
      "summary",
      "Strengths in Context",
      "Likely ISTJ strengths include evidence-based continuity thinking, independent learning, dependable follow-through, contradiction detection, and willingness to redesign an inefficient structure. The pattern can be useful when complex work requires a coherent procedure beyond immediate demands. These are preferences rather than guaranteed skills. Their value depends on domain knowledge, implementation discipline, intellectual humility, and the ability to make private reasoning available to others. Later sections separate useful independence from isolation and quality from overcontrol.",
    ),
  ],
  "growth-risks": [
    block(
      "istj-risks-bridge",
      "guidance",
      "Development Through Tested Procedure",
      "Development may involve exposing assumptions earlier, communicating an unfinished model, distinguishing necessary quality from overcontrol, and inviting operational or relational evidence before commitment hardens. Other risks include solving too much alone, withdrawing when collaboration is inefficient, and confusing a coherent expectation with a certain future. These are not fixed defects. The following sections translate them into practical review points that preserve responsible independence while improving adaptability, trust, and execution.",
    ),
  ],
  "core-personality-pattern": [
    block(
      "istj-core-summary",
      "summary",
      "Accumulated Evidence and Dependable Structure",
      "The central ISTJ pattern often involves comparing a present responsibility with tested experience, then organising work into a sequence that can be repeated and checked. The person may notice where a standard, handoff, or exception threatens continuity and improve the procedure before failure becomes routine. At its best, this creates dependable progress grounded in evidence rather than habit alone. The dynamic slots below qualify how structure changes with confidence, balance, and access to adjacent preferences.",
      [
        {
          id: "istj-combination-procedure",
          source: "combination",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
        {
          id: "istj-balanced-dimensions",
          source: "confidence",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
    block(
      "istj-core-analysis",
      "analysis",
      "Building the Procedure Before the Activity",
      "An ISTJ may first ask what operation would make the desired outcome repeatable. Instead of treating each issue separately, the person examines incentives, dependencies, information flow, and downstream consequences. This can prevent wasted effort and produce durable design. It becomes limiting when planning stays private or when present facts are forced to fit the working record. Procedure must remain a testable explanation of reality, not a substitute for contact with it.",
    ),
    block(
      "istj-core-strength",
      "strength",
      "Concentrated Long-Range Leverage",
      "A developed expression can sustain attention on a consequential objective while resisting short-term noise. The ISTJ may identify a small structural adjustment that improves many downstream judgements, sequence work around dependencies, and protect resources for outcomes that take time. This disciplined concentration is strongest when review points invite disconfirming evidence and when collaborators understand enough of the working record to exercise judgement rather than merely follow instructions.",
    ),
    block(
      "istj-core-risk",
      "risk",
      "When Coherence Becomes Premature Certainty",
      "A working record that explains many observations can begin to feel complete before critical assumptions have been tested. The ISTJ may discount local objections as short-term thinking or interpret disagreement as failure to understand the operation. This can create elegant plans with weak adoption or hidden operational costs. Confidence should rise when the procedure survives serious evidence, not simply because it has become internally consistent.",
    ),
    block(
      "istj-core-reflection",
      "reflection",
      "Does the Procedure Still Match the Evidence?",
      "Choose one recurring responsibility or standard. Which past evidence justified it, which present observations still support it, and which exceptions suggest the procedure needs revision? Ask the people who perform the work where the written process and lived reality differ. Preserve what protects reliability, but change a step when repeated evidence shows that familiarity is no longer serving the outcome.",
    ),
  ],
  "motivation-and-needs": [
    block(
      "istj-motivation-summary",
      "summary",
      "Reliability, Responsibility, and Useful Progress",
      "ISTJs may feel engaged by complex problems, room for independent judgement, opportunities to build competence, and work whose long-term consequence justifies concentrated effort. Motivation often rises when the objective is meaningful and methods are not constrained by unnecessary convention. Not every ISTJ wants formal authority or solitary work. The deeper need is usually control over attention and enough coherence to invest effort without constant arbitrary interruption.",
    ),
    block(
      "istj-motivation-analysis",
      "analysis",
      "Autonomy in Service of a Operation",
      "Independence can protect the uninterrupted thought required for difficult procedure. The person may resist oversight that focuses on visible activity rather than reasoning or outcomes. Autonomy is most productive when paired with transparent constraints, review, and responsibility for consequences. Without those anchors, self-direction can become insulation from feedback. The useful question is which judgements need protected judgement and which improve through earlier collaboration.",
    ),
    block(
      "istj-motivation-strength",
      "strength",
      "Patience for Difficult Improvement",
      "When a goal matters, the ISTJ may tolerate a long learning curve and invest in foundations that produce little immediate recognition. This can support deep expertise, careful design, and improvements that outlast a short campaign. The strength depends on periodic contact with users, operators, or other evidence. Persistence is valuable when the direction remains sound, not when effort continues mainly because changing the working record feels like wasted competence.",
    ),
    block(
      "istj-motivation-risk",
      "risk",
      "Competence as Protection",
      "Expertise can become a defence against dependence, uncertainty, or visible error. The person may avoid asking for help until a problem is advanced, dismiss tasks where they are not immediately capable, or keep raising standards so the work never feels exposed. Competence remains valuable, but identity becomes more resilient when learning, relationship, and contribution are allowed to include unfinished knowledge and mutual reliance.",
    ),
    block(
      "istj-motivation-guidance",
      "guidance",
      "Define Progress Beyond Private Quality",
      "For a major commitment, identify the internal quality standard and the external evidence that the work helps. Add measures for learning, adoption, maintainability, and collaboration. Decide where excellence is essential and where a usable version will create better information. Share one uncertainty with a trusted colleague before solving it alone. This keeps expertise connected to consequence rather than using refinement to postpone exposure.",
    ),
  ],
  "information-processing": [
    block(
      "istj-information-summary",
      "summary",
      "Evidence, Precedent, and Operational Logic",
      "An ISTJ pattern often attends to underlying structure, practical implications, and the few variables that organise many surface events. Information becomes useful when it clarifies a trajectory or improves the working record of the operation. This can support operational continuity awareness, provided generalisation remains connected to current measurements, operational detail, and alternative explanations. Pattern recognition generates hypotheses; it does not remove the need for evidence.",
    ),
    block(
      "istj-information-analysis",
      "analysis",
      "Compressing Complexity Into a Model",
      "The person may synthesise large amounts of information into a compact explanation of how parts relate and where the operation is heading. A good model reduces noise and guides priorities. Compression also discards detail, including details that may reveal a different mechanism. Record which facts the working record explains poorly, and distinguish observations from inferences so a clean narrative does not conceal uncertainty.",
    ),
    block(
      "istj-information-strength",
      "strength",
      "Seeing Second-Order Consequences",
      "ISTJs may naturally ask what a present judgement makes more likely later: which dependency grows, which incentive adjustments, or which capability becomes difficult to recover. This can protect a team from attractive short-term fixes. The strength becomes practical when downstream consequences are translated into observable indicators and when probability is communicated honestly rather than as inevitable continuity awareness.",
    ),
    block(
      "istj-information-risk",
      "risk",
      "Filtering Out Inconvenient Reality",
      "Once the organising pattern feels clear, data that does not fit may be labelled exceptional, political, or too operational. Yet one inconvenient detail can reveal a mistaken assumption or a stakeholder cost the procedure ignores. The risk is not generalisation itself; it is allowing the working record to determine which evidence counts. Deliberately preserve exceptions until they are explained rather than removed from the operational picture.",
    ),
    block(
      "istj-information-guidance",
      "guidance",
      "Maintain a Model and an Exception Log",
      "Write the current operating record, its three most important assumptions, and the indicators expected if it is correct. Beside it, keep observations that do not fit. Review both with someone close to implementation. Revise the procedure when exceptions form a pattern, and record why. This protects reliable continuity while ensuring that evidence can genuinely adjust the direction.",
    ),
  ],
  "decision-making": [
    block(
      "istj-judgements-summary",
      "summary",
      "Criteria, Consequence, and Deliberate Commitment",
      "ISTJs may prefer judgements grounded in explicit objectives, internal consistency, evidence, and long-term consequence. They often want enough time to understand the procedure before committing, then may hold the chosen direction steadily. This can reduce reactive switching. Good judgement still includes human impact, reversibility, and unknowns. A logically coherent choice can fail when the criteria omit adoption, ethics, or information held by others.",
    ),
    block(
      "istj-judgements-analysis",
      "analysis",
      "Private Convergence",
      "The person may compare alternatives internally and communicate only after a preferred direction has emerged. This protects concentration but hides the judgement process from collaborators, who may receive a conclusion without the evidence or trade-offs behind it. Earlier visibility does not require endless consensus. Sharing the criteria and uncertainty allows others to improve the working record before the cost of adjustment becomes high.",
    ),
    block(
      "istj-judgements-strength",
      "strength",
      "Resisting Short-Term Pressure",
      "An ISTJ may hold a necessary standard or long-term commitment when immediate incentives favour convenience or appearance. By connecting the judgement to operational consequences and tested precedent, the person can protect quality, investment, or future capability. This strength needs review triggers so perseverance does not become rigidity. The judgement should remain stable because current evidence supports it, not because changing course would make earlier responsibility feel wasted.",
    ),
    block(
      "istj-judgements-risk",
      "risk",
      "Optimising the Wrong Criteria",
      "Precise analysis can produce a poor judgement when the governing criteria are incomplete. Efficiency, scalability, or logical elegance may be optimised while trust, accessibility, timing, or transition cost remains outside the working record. Those consequences later return as implementation failure. Before finalising, ask who defines success, who bears the cost, and which qualitative evidence should influence the choice.",
    ),
    block(
      "istj-judgements-guidance",
      "guidance",
      "Make the Responsibility Trail Visible",
      "Record the obligation, verified facts, governing criteria, viable alternative, and review trigger before committing. Share that trail with people responsible for execution or affected by the outcome. Clarify what is settled, what remains adjustable, and who owns each follow-up. This preserves careful judgement while making accountability inspectable and helping others act with context rather than merely complying.",
    ),
  ],
  "communication": [
    block(
      "istj-coordination-summary",
      "summary",
      "Concise, Structured, and Selective",
      "ISTJs may prefer coordination that has a clear purpose, coherent reasoning, and enough substance to justify attention. They may speak selectively after internal processing rather than narrate each step. This can make contributions focused, but others cannot infer the private model automatically. Effective coordination translates procedure into context, assumptions, judgements, and invitations for evidence without requiring constant social performance.",
    ),
    block(
      "istj-coordination-analysis",
      "analysis",
      "The Missing Middle of the Reasoning",
      "Because the ISTJ has already connected many steps internally, an explanation may move from problem to conclusion while omitting the bridge. Listeners can experience the result as abrupt or unsupported. The answer is not greater volume; it is a visible logic chain. State what you observed, what it suggests, which uncertainty remains, and why the recommendation follows.",
    ),
    block(
      "istj-coordination-risk",
      "risk",
      "Under-Coordination and Assumed Understanding",
      "The person may delay sharing until the working record feels sufficiently refined, then become frustrated when others lack context or raise questions already resolved privately. Silence can be interpreted as distance, agreement, or lack of interest. Under pressure, concise correction may also sound dismissive. Communicate earlier enough that others can influence the work, not merely receive the completed procedure.",
    ),
    block(
      "istj-coordination-guidance",
      "guidance",
      "Share the Working Record Early",
      "Use a concise structure: obligation, known facts, current procedure, unresolved exception, and requested input. Mark provisional elements clearly so colleagues can improve them before a routine hardens. When disagreeing, name the evidence or standard that differs rather than only rejecting the conclusion. This turns precision into shared operational understanding and reduces avoidable ambiguity.",
    ),
    block(
      "istj-coordination-reflection",
      "reflection",
      "What Was Visible to Others?",
      "Review a recent judgement that felt obvious to you. What information did collaborators actually receive, and which connections existed only in your own model? Did you ask for evidence early enough to adjust the direction? What emotional or practical concern was relevant even if it was expressed imprecisely? Clear procedure becomes influential when other people can inspect and use it.",
    ),
  ],
  "teamwork-and-leadership": [
    block(
      "istj-teamwork-summary",
      "summary",
      "Designing Capability and Direction",
      "In teams, an ISTJ may contribute by clarifying standards, sequencing dependable work, preserving institutional knowledge, and noticing where a handoff threatens continuity. Leadership can be quiet and procedure-led rather than socially dominant. The person may prefer capable colleagues with clearly owned responsibilities. Effective teamwork requires making expectations and exceptions visible, learning from frontline experience, and treating coordination as part of reliability rather than an interruption to the real work.",
    ),
    block(
      "istj-teamwork-analysis",
      "analysis",
      "Selective Collaboration",
      "The ISTJ may collaborate intensely when another person contributes expertise or challenge, while finding unfocused group process draining. Selectivity can protect quality and attention. It can also exclude information that arrives through informal conversation or people whose thinking style is less concise. Design collaboration around clear questions and judgement rights, but leave enough room for evidence that does not arrive in the preferred format.",
    ),
    block(
      "istj-teamwork-strength",
      "strength",
      "Designing for Independent Judgement",
      "A developed ISTJ can create frameworks that help others make consistent judgements without central approval. Clear principles, interfaces, and feedback loops can distribute capability while preserving coherence. This form of leadership scales better than personal control. It works when the procedure includes space for local adaptation and when people understand how to challenge a rule that no longer serves the objective.",
    ),
    block(
      "istj-teamwork-risk",
      "risk",
      "Retreating From Imperfect Collaboration",
      "When meetings are inefficient or reasoning feels weak, the ISTJ may withdraw and solve the problem alone. This can produce a better immediate design but reduce ownership, learning, and access to operational knowledge. Repeated withdrawal also reinforces the belief that collaboration adds little value. Improve the structure of collaboration before abandoning it: narrow the question, prepare evidence, and assign judgements deliberately.",
    ),
    block(
      "istj-teamwork-guidance",
      "guidance",
      "Create a Challengeable Procedure",
      "State the operational principles, constraints, and interfaces that guide the team. Give owners authority within those boundaries and establish review points based on evidence. Invite a designated critic to test assumptions and include operational voices before finalising standards. The aim is a operation others can understand, adapt, and improve—not one that functions only when the original design is present.",
    ),
  ],
  "career-environment": [
    block(
      "istj-career-summary",
      "summary",
      "Depth, Autonomy, and Long-Range Consequence",
      "ISTJs may prefer work that rewards independent judgement, complex operations thinking, learning, and sustained improvement. Working Plan, technology, research, design, policy, or specialised leadership can offer these conditions, but no work setting belongs to a type. Fit depends on interests, expertise, values, resources, and organisational reality. The relevant question is whether the work permits depth while connecting private analysis to meaningful external outcomes.",
    ),
    block(
      "istj-career-analysis",
      "analysis",
      "The Need for Protected Attention",
      "Frequent interruption and shifting expectations can make it difficult to maintain accurate, dependable work. The ISTJ may need protected concentration, stable priorities, and clear ownership. Total isolation is not the answer; reliable procedure requires contact with users, colleagues, and changing evidence. A supportive environment combines focused execution with scheduled coordination rather than treating either constant availability or private control as ideal.",
    ),
    block(
      "istj-career-example",
      "example",
      "Work That Rewards Procedure",
      "Quality assurance, operations coordination, records management, compliance, logistics, technical administration, or implementation planning may reward attention to standards, evidence, and dependable follow-through. The same job title can vary widely. Examine whether the daily work includes clear responsibility, access to operational facts, authority to improve procedures, and enough continuity to learn from results rather than relying on occupational stereotypes.",
    ),
    block(
      "istj-career-risk",
      "risk",
      "Waiting for the Perfect Operation",
      "High standards can make imperfect organisations feel undeserving of effort, while imagined future roles appear more coherent than any real environment. The person may postpone influence until conditions are ideal or repeatedly redesign a path without testing it. Development often requires improving a limited operation from inside it. Distinguish constraints that violate core values from ordinary ambiguity, politics, and maintenance that accompany consequential work.",
    ),
    block(
      "istj-career-guidance",
      "guidance",
      "Evaluate Operational Fit",
      "Assess roles across responsibility clarity, evidence quality, process stability, exception handling, implementation ownership, and access to practical feedback. Ask how standards are reviewed, whether improvements can survive short-term pressure, and who maintains the system after a change. Choose an environment where dependable work matters, then build the communication and adaptation skills that keep procedure responsive to reality.",
    ),
  ],
  "relationship-dynamics": [
    block(
      "istj-commitments-summary",
      "summary",
      "Selective Trust and Deliberate Commitment",
      "ISTJs may invest deeply in a relatively small number of commitments, valuing honesty, intellectual respect, reliability, and space for independent thought. Care may be expressed through problem solving, planning, or sustained commitment rather than frequent emotional narration. People vary widely, and a type code cannot explain attachment or intimacy. Commitments become stronger when private loyalty is made visible in forms the other person can recognise.",
    ),
    block(
      "istj-commitments-analysis",
      "analysis",
      "Internal Commitment, External Ambiguity",
      "The ISTJ may assume that continued presence, practical help, or careful thought clearly communicates care. Another person may need direct appreciation, emotional acknowledgement, or more frequent contact. Neither form is inherently superior. Ask how care is received rather than relying only on the form that feels most sincere to give. Translation protects authenticity while making commitment accessible.",
    ),
    block(
      "istj-commitments-strength",
      "strength",
      "Depth Without Performance",
      "A developed expression can offer steadiness, candid reflection, respect for autonomy, and willingness to engage difficult long-term problems. The ISTJ may avoid superficial reassurance and take another person's goals seriously. This can create trust when analysis is invited and emotion is not treated as noise. Deep connection includes being present with an experience that cannot immediately be optimised.",
    ),
    block(
      "istj-commitments-risk",
      "risk",
      "Withdrawing Into Self-Sufficiency",
      "When misunderstood, disappointed, or overwhelmed, the person may retreat into private analysis and reduce coordination. This protects short-term control but leaves the other person to interpret silence. A conclusion about the relationship may form internally before concerns are shared. Independence becomes isolation when it removes the possibility of repair. Communicate the need for space, its purpose, and when contact will resume.",
    ),
    block(
      "istj-commitments-guidance",
      "guidance",
      "Make the Inner Position Visible",
      "Practise naming one appreciation, one uncertainty, and one need before offering a solution. When conflict arises, explain the working record you are using and ask how the other person understands the situation. Agree on how space and reconnection will work. These actions do not require constant disclosure; they provide enough information for trust to operate without guessing.",
    ),
  ],
  "change-and-adaptation": [
    block(
      "istj-adjustment-summary",
      "summary",
      "Adapting the Procedure",
      "ISTJs may anticipate adjustment by modelling future conditions and preparing a coherent route before disruption arrives. They can support transformation when current operations no longer fit long-term needs. Adaptation becomes harder when adjustment contradicts a deeply developed model or arrives without intelligible purpose. The dynamic slot below examines how adjacent preferences may make planning more iterative, practical, or collaborative.",
      [
        {
          id: "istj-combination-adaptation",
          source: "combination",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
    block(
      "istj-adjustment-analysis",
      "analysis",
      "Redirection Versus Abandoning the Direction",
      "Because operational working records integrate many judgements, revising one assumption can feel as though the whole procedure is being destabilised. The person may defend the original direction longer than evidence warrants. Separate the underlying purpose from the current design. A working record can change while the deeper objective remains intact, and redirection often demonstrates stronger working plans than preserving a coherent but inaccurate expectation.",
    ),
    block(
      "istj-adjustment-strength",
      "strength",
      "Preparing for Second-Order Effects",
      "The ISTJ may notice that a transition adjustments incentives, capabilities, and future options beyond the immediate implementation plan. This supports more responsible sequencing and can protect resources others overlook. The strength is most useful when affected people help test the expectation. Adjustment procedure should include lived transition costs, not only the final operation's conceptual advantages.",
    ),
    block(
      "istj-adjustment-risk",
      "risk",
      "Rigidity Hidden as Operational Consistency",
      "A reluctance to revise may be explained as protecting the long term even when evidence has adjustmentd. The person can selectively interpret setbacks as poor execution rather than a flawed assumption. This delays learning and may place growing demands on others. Define failure and review criteria before implementation so adaptation does not depend on admitting the entire direction was mistaken.",
    ),
    block(
      "istj-adjustment-guidance",
      "guidance",
      "Revise Procedures Without Losing Continuity",
      "Treat each procedure as a controlled working version. Record the evidence behind it, expected indicators, review dates, and which safeguards must remain stable. At review, identify what actual operation confirmed, contradicted, or left unresolved. Invite an informed colleague to test the interpretation. A documented revision preserves continuity and learning without turning consistency into loyalty to an outdated method.",
    ),
  ],
  "stress-and-recovery": [
    block(
      "istj-strain-summary",
      "summary",
      "Contraction, Control, and Over-Isolation",
      "Under sustained strain, an ISTJ may withdraw, narrow attention, intensify private planning, or become unusually critical of inefficiency and interruption. At other times the person may react through impulsive sensory activity or urgent attempts to control immediate details. Strain responses vary and are not diagnostic. The useful task is identifying the earliest loss of flexibility, coordination, sleep, or perspective for this individual.",
    ),
    block(
      "istj-strain-analysis",
      "analysis",
      "When Private Review Becomes Repetition",
      "Quiet time can restore concentration, but extended withdrawal may repeat the same record without fresh facts or emotional perspective. The person can appear occupied while repeatedly checking details and postponing contact that could clarify responsibility. Recovery benefits from a boundary: enough privacy to settle attention, followed by practical movement, trusted conversation, and a return to directly observable conditions.",
    ),
    block(
      "istj-strain-evidence",
      "evidence",
      "Personal Early-Warning Signals",
      "Possible signals include cancelling contact, reworking plans without new data, becoming contemptuous of ordinary mistakes, losing tolerance for ambiguity, or neglecting physical routines while trying to solve the operation mentally. These signs are individual rather than universal. Track what appears before judgement, sleep, health, or relationship quality declines, and ask trusted people what adjustment they notice first.",
    ),
    block(
      "istj-strain-risk",
      "risk",
      "Solving Pressure With More Procedure",
      "When the problem involves grief, exhaustion, conflict, or limited control, another plan may create temporary distance without resolving the experience. The ISTJ may analyse causes while remaining disconnected from support or bodily needs. Operational thinking is still available later. Immediate recovery may require naming the feeling, reducing obligations, accepting uncertainty, or asking directly for help.",
    ),
    block(
      "istj-strain-guidance",
      "guidance",
      "Ground, Communicate, and Reduce Scope",
      "Pause one nonessential optimisation, restore sleep and movement, and choose one concrete task that can be finished without redesigning the operation. Tell a trusted person that capacity is reduced and specify the support needed. Revisit operational conclusions after recovery and new evidence. If distrain is persistent or significantly affects functioning, seek appropriate professional support rather than using type language as an explanation.",
    ),
  ],
  "growth-roadmap": [
    block(
      "istj-development-summary",
      "summary",
      "From Private Direction to Shared Capability",
      "ISTJ development is not about abandoning responsibility, memory, or respect for tested structure. It involves making procedures reviewable, communicating exceptions before they become failures, distinguishing quality control from overcontrol, and allowing current operational evidence to revise precedent. Development expands range: the person can still protect reliability while involving others early enough to improve and share ownership of the work. The dynamic slot below highlights combinations affecting this path.",
      [
        {
          id: "istj-combination-isolation-risk",
          source: "combination",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
    block(
      "istj-development-analysis",
      "analysis",
      "Collaboration as Model Expansion",
      "Collaboration need not mean surrendering judgement or accepting unfocused process. At its best, it adds observations, constraints, and interpretations unavailable to one mind. The developmental task is designing collaboration with enough clarity to protect depth and enough openness to permit real influence. A consultation that cannot adjust the plan is coordination, not evidence gathering.",
    ),
    block(
      "istj-development-risk",
      "risk",
      "Overcontrol Disguised as Readiness",
      "The person may delay release, delegation, or conversation until the work meets a private standard that keeps moving. This preserves control but prevents feedback from improving the actual outcome. Overcontrol often focuses attention on defects that are intellectually visible rather than consequences that matter most. Define the required quality level, the cost of delay, and the evidence only real use can provide.",
    ),
    block(
      "istj-development-guidance",
      "guidance",
      "Practise Earlier Exposure",
      "Choose one model, proposal, or concern and share it at sixty-percent clarity with a trusted, relevant person. State what is stable, what is uncertain, and what feedback could adjust the direction. Resist solving every objection immediately; record it and review the procedure later. Repeat weekly so visibility becomes part of rigorous thinking rather than a threat to it.",
    ),
    block(
      "istj-development-action",
      "action",
      "A Monthly Assumption Review",
      "Once a month, select one important procedure and review its purpose, exceptions, stakeholder effects, and implementation evidence. Identify one standard that remains justified and one step that needs revision. Communicate the change, update the operating record, and credit the evidence source. This creates visible practical humility while preserving the ISTJ's strength in durable, dependable structure.",
    ),
  ],
  "ninety-day-action-plan": [
    block(
      "istj-action-summary",
      "summary",
      "A Ninety-Day Shared-Procedure Practice",
      "Use the next ninety days to test whether earlier exposure improves a meaningful operational outcome. Choose one project that requires both deep analysis and adoption by others. Preserve focused work, but make assumptions and provisional judgements visible at planned intervals. The objective is a stronger procedure that other people can understand, challenge, and execute—not maximum consensus or a flawless plan.",
    ),
    block(
      "istj-action-days-1-30",
      "action",
      "Days 1–30 · Map Responsibility and Evidence",
      "Choose one recurring responsibility. Document the expected result, current procedure, owners, handoffs, known exceptions, and evidence that the standard still works. Ask two people who perform or receive the work where reality differs from the record. Identify one step retained through habit and one safeguard that must not be lost. Establish baseline measures for error, delay, rework, and workload.",
    ),
    block(
      "istj-action-days-31-60",
      "action",
      "Days 31–60 · Revise and Run the Procedure",
      "Change one evidence-backed step while keeping ownership, quality criteria, and the exception route explicit. Run the revised procedure for a fixed period and record errors, workarounds, handoff failures, and user impact. Ask the owner to explain where the documentation helps or constrains judgement. Update the record after actual use rather than expecting the first revision to be final.",
    ),
    block(
      "istj-action-days-61-90",
      "action",
      "Days 61–90 · Stabilise Shared Ownership",
      "Ask another owner to run the procedure without relying on your reminders or private knowledge. Confirm the decision boundary, escalation point, and review date, then remove one redundant control. Compare reliability, workload, and exception handling with the baseline. Keep the parts that protect continuity, document why other parts changed, and schedule the next evidence review before the process becomes unquestioned habit.",
    ),
    block(
      "istj-action-review",
      "reflection",
      "Evidence of Development",
      "Review concrete indicators: assumptions shared early, counterexamples retained, useful versions released, judgements revised from evidence, and responsibility distributed without loss of coherence. Ask collaborators whether the reasoning became easier to understand and challenge. Development is demonstrated by repeated behaviour under real conditions, not by agreement with an attractive operational identity.",
    ),
    block(
      "istj-action-guidance",
      "guidance",
      "Protect Depth Without Returning to Isolation",
      "If collaboration becomes noisy, improve its structure rather than abandoning it. Narrow the question, request evidence in advance, and separate consultation from judgement rights. If overcontrol delays delivery, reduce scope while preserving the critical quality standard. The plan succeeds when independent thought and external correction become parts of one reliable process.",
    ),
  ],
  methodology: [
    block(
      "istj-methodology-framework",
      "analysis",
      "How to Use This Report",
      "This report interprets an MBTI-style preference result using EI, SN, TF, and JP dimensions, confidence values, static type-level content, and matched dynamic rules. It describes tendencies for reflection. It is not a clinical diagnosis, intelligence test, capability assessment, or scientifically absolute account of personality. No section should be used alone for consequential employment, educational, relationship, financial, or health judgements.",
    ),
    block(
      "istj-methodology-variation",
      "evidence",
      "Context and Individual Variation",
      "People sharing an ISTJ result can differ substantially because of culture, age, expertise, responsibilities, health, values, environment, and development. Balanced or lower-confidence dimensions increase the likelihood that neighbouring preferences are similarly accessible. Give repeated lived evidence more weight than a type stereotype, and treat descriptions that do not fit as information rather than a failure to match the code.",
    ),
    block(
      "istj-methodology-dynamic",
      "analysis",
      "Dynamic Interpretation",
      "Generated reports select rule content from supplied dimension scores and confidence patterns. Applied-rule metadata records which adaptations were inserted, supporting traceability across report, content, and rule versions. Dynamic text can qualify a broad narrative, but it cannot infer motive, history, maturity, mental health, or future outcomes. Interpretation remains a reflective aid rather than an automated judgement.",
    ),
    block(
      "istj-methodology-version",
      "guidance",
      "Version and Responsible Review",
      "Report version: 1.0.0. Content version: 1.0.0. Rule version: 1.0.0. These identifiers preserve the source used to generate a result as content and rules evolve. Revisit the report when circumstances or self-understanding adjustment, compare it with feedback and behaviour, and retain only interpretations that support accurate and responsible reflection.",
    ),
  ],
};

export const ISTJ_COMPLETE_REPORT:
  CompletePersonalityReportDefinition = {
    personalityType: "ISTJ",
    version: COMPLETE_PERSONALITY_REPORT_VERSION,
    title: { en: "ISTJ Complete Personality Report" },
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
