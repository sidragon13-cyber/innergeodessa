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
      "entp-identity-summary",
      "summary",
      "Your Complete ENTP Report",
      "This complete report examines an ENTP preference pattern through exploration, reframing, analytical challenge, communication, work, relationships, stress, and development. It treats the type code as a working hypothesis about preferred ways of engaging with ideas and possibilities—not as a fixed identity, clinical judgement, or measure of intelligence. Experience, culture, responsibilities, trust, and learned skills can substantially change how the pattern appears. Use recognition and mismatch alike as evidence for reflection.",
    ),
  ],
  "personality-overview": [
    block(
      "entp-overview-summary",
      "summary",
      "Exploratory Reframing and Adaptive Experimentation",
      "An ENTP pattern often combines outward engagement with possibilities, analytical testing, and a preference for keeping options responsive to new information. The person may energise a group by questioning assumptions, connecting distant ideas, and turning uncertainty into experiments. This orientation can generate valuable alternatives, but usefulness depends on selection, follow-through, relational judgement, and respect for constraints that protect real people or outcomes. Inventiveness is a preference pattern, not a guarantee of originality or success.",
    ),
  ],
  "dimension-results": [
    block(
      "entp-dimensions-context",
      "analysis",
      "Reading the Four Dimensions",
      "An ENTP result combines preferences across EI, SN, TF, and JP, but each dimension may carry different strength and confidence. A balanced EI score can make exploration quieter, a practical SN result can ground possibility in evidence, a balanced TF result can bring human consequences forward, and a firmer JP result can increase closure. The dynamic interpretations below qualify the type-level narrative. Compare them with behaviour across roles, relationships, cultures, energy levels, and periods of pressure.",
      [
        {
          id: "entp-ei-exploration",
          source: "dimension",
          dimensions: ["EI"],
        },
        {
          id: "entp-sn-possibility",
          source: "dimension",
          dimensions: ["SN"],
        },
        {
          id: "entp-tf-analysis",
          source: "dimension",
          dimensions: ["TF"],
        },
        {
          id: "entp-jp-flexibility",
          source: "dimension",
          dimensions: ["JP"],
        },
        {
          id: "entp-overall-confidence",
          source: "confidence",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
  ],
  "key-strengths": [
    block(
      "entp-strengths-bridge",
      "summary",
      "Strengths in Context",
      "Likely ENTP strengths include rapid reframing, possibility generation, intellectual agility, constructive challenge, and the ability to connect ideas across domains. The pattern can be especially useful when a team is trapped by inherited assumptions or needs several routes through uncertainty. These are not automatic competencies. Their value depends on knowledge, listening, ethical judgement, and the discipline to convert a promising concept into evidence and delivery. Later sections distinguish generative exploration from novelty that disperses attention.",
    ),
  ],
  "growth-risks": [
    block(
      "entp-risks-bridge",
      "guidance",
      "Growth Through Selective Commitment",
      "Development may involve choosing among attractive possibilities, sustaining effort after discovery becomes implementation, and recognising when debate is improving a decision versus displaying agility. Other risks include changing direction before an experiment produces evidence, underestimating maintenance work, or treating another person's need for context as resistance. These are not fixed defects. The following sections turn them into observable signals and practical experiments that protect curiosity while increasing reliability, trust, and cumulative impact.",
    ),
  ],
  "core-personality-pattern": [
    block(
      "entp-core-summary",
      "summary",
      "Possibility, Challenge, and Reframing",
      "The central ENTP pattern often involves scanning for alternatives, testing the logic of accepted explanations, and reframing a problem so that new action becomes possible. Ideas are explored through dialogue, comparison, and experiment rather than accepted because of convention or authority. At its best, this creates intellectual movement without demanding immediate certainty. The dynamic slots below qualify how the pattern changes with preference strength, balance, and confidence.",
      [
        {
          id: "entp-combination-experiment",
          source: "combination",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
        {
          id: "entp-balanced-dimensions",
          source: "confidence",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
    block(
      "entp-core-analysis",
      "analysis",
      "Reframing the Given Problem",
      "An ENTP may notice that a difficult question rests on an assumption nobody has examined. By changing the frame—what success means, which constraint is fixed, or whose perspective matters—the person can reveal options that linear problem solving misses. This is most useful when the reframe remains accountable to evidence and consequence. A clever alternative that ignores the actual decision, available capacity, or affected people is stimulation rather than problem solving.",
    ),
    block(
      "entp-core-strength",
      "strength",
      "Creating Intellectual Movement",
      "A developed expression can help people move beyond false choices. The ENTP may combine fragments from different fields, articulate an overlooked contradiction, or design a reversible trial that replaces abstract disagreement with learning. This can reduce fear around uncertainty because the group gains several ways to proceed. The contribution becomes durable when options are prioritised and someone accepts ownership for testing, integrating, and completing the most valuable one.",
    ),
    block(
      "entp-core-risk",
      "risk",
      "Possibility Without Accumulation",
      "When exploration becomes the default response to every constraint, work can remain perpetually promising but rarely cumulative. New ideas may displace earlier commitments before results are visible, and implementation detail can be dismissed as less intellectually interesting. Others then carry integration and maintenance costs while the ENTP experiences the system as unnecessarily restrictive. Freedom is strengthened, not reduced, when selected experiments have boundaries, evidence criteria, and a defined finish.",
    ),
    block(
      "entp-core-reflection",
      "reflection",
      "Which Possibility Deserves Commitment?",
      "List the options currently competing for attention. Which one addresses a consequential problem, has a testable assumption, and can produce useful evidence within a defined period? What must be paused so the experiment receives genuine effort? Name the completion condition before beginning. The aim is not to suppress alternatives; it is to ensure that curiosity creates knowledge or value that remains after the initial excitement has passed.",
    ),
  ],
  "motivation-and-needs": [
    block(
      "entp-motivation-summary",
      "summary",
      "Autonomy, Discovery, and Intellectual Range",
      "ENTPs may feel energised by freedom to explore, difficult questions, capable collaborators, and environments where assumptions can be challenged without excessive status protection. Motivation often rises when a problem has several plausible routes and experimentation can change the direction. Not every ENTP seeks constant social stimulation or entrepreneurial risk. The underlying need is usually room for independent thought and adaptive movement, balanced by enough purpose for exploration to matter.",
    ),
    block(
      "entp-motivation-analysis",
      "analysis",
      "Engagement Through Open Questions",
      "A settled routine can feel less engaging than a question whose structure is still emerging. The ENTP may invest intensely while learning is rapid, then lose momentum when success depends on repetition, documentation, or incremental refinement. This does not make routine meaningless; it shows that motivation and obligation do not always align. Sustainable contribution requires a system that protects curiosity while making completion visible and socially accountable.",
    ),
    block(
      "entp-motivation-strength",
      "strength",
      "Energy for the Unfamiliar",
      "A useful strength is willingness to enter ambiguous territory without demanding a complete map. The person may ask questions others avoid, learn across boundaries, and generate early momentum around an emerging opportunity. This can help a team discover what is possible before investing heavily. The strength is amplified when enthusiasm is paired with explicit hypotheses, realistic constraints, and a handover or execution plan that survives changes in personal interest.",
    ),
    block(
      "entp-motivation-risk",
      "risk",
      "Novelty as a Substitute for Progress",
      "Novelty can become rewarding in itself. A new project, method, or argument may provide the feeling of movement without resolving the original need. When boredom is interpreted as proof that a commitment is wrong, the person may abandon work precisely when depth, repetition, or collaboration would create value. The risk is not curiosity; it is allowing short-term stimulation to decide which obligations deserve sustained attention.",
    ),
    block(
      "entp-motivation-guidance",
      "guidance",
      "Design a Portfolio of Attention",
      "Separate commitments into exploration, delivery, and maintenance. Limit how many can occupy each category, and do not open a new exploration slot until one is closed, transferred, or deliberately stopped. Pair recurring work with automation, collaboration, or a visible outcome, but do not pretend it can always be eliminated. Review the portfolio weekly so autonomy includes conscious trade-offs rather than an accumulation of unfinished possibilities.",
    ),
  ],
  "information-processing": [
    block(
      "entp-information-summary",
      "summary",
      "Patterns Across Possibilities",
      "An ENTP pattern often notices relationships among ideas, emerging implications, and alternatives hidden by the current frame. Information is not only collected; it is recombined to see what else could be true. This can reveal strategic openings and conceptual errors quickly. The same speed can produce weak conclusions if novelty is mistaken for evidence or if concrete exceptions are treated as details. Exploration becomes credible when models remain testable.",
    ),
    block(
      "entp-information-analysis",
      "analysis",
      "Divergence Before Convergence",
      "The person may begin by expanding the option space: changing assumptions, considering unusual analogies, and asking how a system behaves under different conditions. This divergent process can prevent premature closure and expose hidden dependencies. It needs a later convergence step that compares alternatives against purpose, evidence, cost, and reversibility. Without that step, a rich map of possibilities can leave the actual decision no clearer.",
    ),
    block(
      "entp-information-strength",
      "strength",
      "Connecting Distant Domains",
      "ENTPs may transfer a useful principle from one field into another, noticing structural similarity where surface features differ. This can support innovation, learning, and communication across specialist boundaries. The transfer is strongest when differences are tested rather than ignored. A metaphor can open inquiry, but operational evidence must determine whether the borrowed model explains the present system or merely sounds compelling.",
    ),
    block(
      "entp-information-risk",
      "risk",
      "The Seduction of an Elegant Possibility",
      "An intellectually satisfying explanation can gain momentum before its assumptions are checked. The ENTP may defend its possibility value while others are asking whether it is accurate, safe, or usable. Debate can then protect the idea from the evidence it was meant to invite. A concept deserves further investment when it explains observed facts, survives serious alternatives, and produces a prediction or action that can be tested.",
    ),
    block(
      "entp-information-guidance",
      "guidance",
      "Turn a Reframe Into a Test",
      "For a promising idea, state the original assumption, the proposed alternative, and the observation that would distinguish them. Identify one concrete constraint the reframe must respect. Ask a knowledgeable critic to name the strongest failure mode. Then run the smallest responsible test that can change your confidence. This preserves intellectual range while making evidence—not verbal adaptability—the basis for continued commitment.",
    ),
  ],
  "decision-making": [
    block(
      "entp-decisions-summary",
      "summary",
      "Testing Criteria and Preserving Options",
      "ENTPs may approach decisions by examining assumptions, comparing multiple models, and keeping options open while useful information is still emerging. They can identify a choice hidden by conventional framing and may prefer reversible experiments to premature certainty. This supports adaptive judgement, but a decision eventually requires criteria, ownership, and consequence. Remaining open is valuable only while additional exploration can materially improve the choice.",
    ),
    block(
      "entp-decisions-analysis",
      "analysis",
      "Arguing Several Sides",
      "The person may test a decision by making the strongest case for competing positions, including views they do not personally endorse. This can reveal weak reasoning and reduce group conformity. Others may misread the process as indecision or insincerity if the purpose is not explained. State whether you are exploring, challenging, or advocating, and mark the point at which analysis must become a recommendation.",
    ),
    block(
      "entp-decisions-strength",
      "strength",
      "Finding the Reversible Route",
      "A useful decision strength is recognising when a large commitment can be divided into smaller tests. Instead of choosing between two total strategies, the ENTP may design a pilot that creates better evidence and preserves future options. This reduces the cost of uncertainty. It works only when the pilot has success criteria, a decision owner, and a date for choosing whether to stop, adapt, or scale.",
    ),
    block(
      "entp-decisions-risk",
      "risk",
      "Analysis That Keeps Reopening Closure",
      "After a decision is made, another plausible angle can make commitment feel intellectually premature. Reopening may be justified when evidence changes, but repeated reconsideration can erode coordination and trust. Colleagues may stop investing because no conclusion appears stable. Distinguish new evidence from a newly interesting argument, and define in advance which signals are strong enough to trigger review.",
    ),
    block(
      "entp-decisions-guidance",
      "guidance",
      "Use a Convergence Contract",
      "Before exploring, name the decision, deadline, governing criteria, and level of reversibility. Allow deliberate divergence until the agreed point, then rank options and make a recommendation with remaining uncertainty visible. Record what would reopen the choice. This protects the ENTP's ability to discover alternatives while giving collaborators a dependable moment when discussion becomes coordinated action.",
    ),
  ],
  "communication": [
    block(
      "entp-communication-summary",
      "summary",
      "Interactive, Generative, and Challenging",
      "ENTPs may think through conversation, using questions, counterexamples, humour, and reframing to develop an idea. This can make discussion energetic and intellectually open. Debate is not necessarily hostility, but intent does not erase impact. Effective communication distinguishes exploration from opposition, adjusts intensity to trust and context, and ensures that the other person's meaning is understood before it is tested.",
    ),
    block(
      "entp-communication-analysis",
      "analysis",
      "Conversation as a Thinking Laboratory",
      "Dialogue can function as real-time experimentation. The ENTP offers a proposition, observes the response, modifies the frame, and searches for a stronger explanation. This can help groups think beyond rehearsed positions. It can also make others feel used as intellectual material if emotional stakes or power differences are ignored. Ask permission before turning a vulnerable topic into an open-ended debate.",
    ),
    block(
      "entp-communication-risk",
      "risk",
      "Winning the Exchange, Losing the Signal",
      "Verbal agility can make it possible to answer nearly every objection. The risk is that a technically successful response conceals information about trust, fatigue, values, or implementation. A person who stops arguing may not be persuaded; they may conclude that participation is costly. Notice withdrawal, repetition, and changes in tone as data. The goal is shared understanding and better judgement, not proof that every challenge can be countered.",
    ),
    block(
      "entp-communication-guidance",
      "guidance",
      "Name the Mode of the Conversation",
      "Begin by stating whether you want brainstorming, critique, decision, or support. During critique, summarise the other position in terms they accept before offering a reframe. Limit the number of new directions introduced at once. When stakes are personal, ask what kind of response would be useful. These practices preserve intellectual honesty while reducing the relational ambiguity created by constant challenge.",
    ),
    block(
      "entp-communication-reflection",
      "reflection",
      "Did Curiosity Create Space?",
      "Review a recent conversation in which you introduced several alternatives. Did the other person gain room to think, or did they have to defend the original point against a moving target? Which question deepened understanding, and which one mainly displayed speed? What context or feeling remained unacknowledged? Reframing is most influential when people experience it as an invitation rather than a contest.",
    ),
  ],
  "teamwork-and-leadership": [
    block(
      "entp-teamwork-summary",
      "summary",
      "Catalysing Options and Learning",
      "In teams, an ENTP may contribute by widening the option space, challenging stale assumptions, connecting expertise, and maintaining energy during ambiguity. Leadership may appear as intellectual catalyst rather than formal command. The person can help a group experiment before committing heavily. Teams also need continuity, role clarity, and maintenance, so the catalytic contribution must connect with people who can integrate decisions and carry work through completion.",
    ),
    block(
      "entp-teamwork-analysis",
      "analysis",
      "Useful Disruption Requires Context",
      "Questioning the current method can prevent complacency, especially when a team has confused tradition with necessity. Yet disruption has costs: people may be protecting regulatory, operational, or relational constraints the ENTP has not seen. Before reframing, learn what the existing process solves and who bears the transition burden. A challenge becomes useful when it respects accumulated knowledge while making genuine alternatives discussable.",
    ),
    block(
      "entp-teamwork-strength",
      "strength",
      "Cross-Pollinating Expertise",
      "The ENTP may help specialists see how their work connects, translating a pattern from one domain into a question another team can test. This can accelerate innovation and reduce siloed thinking. The contribution is strongest when the person credits expertise, separates analogy from proof, and remains involved long enough to help resolve the integration problems created by the new connection.",
    ),
    block(
      "entp-teamwork-risk",
      "risk",
      "Unequal Distribution of Follow-Through",
      "Teams can become excited by an ENTP's ideas while execution, documentation, and repair repeatedly fall to others. Even when unintentional, this creates an unequal exchange: one person retains novelty while colleagues absorb completion costs. Trust improves when idea ownership includes responsibility for testing assumptions, securing resources, documenting decisions, and staying available through the less stimulating stages of delivery.",
    ),
    block(
      "entp-teamwork-guidance",
      "guidance",
      "Pair Catalysis With Stewardship",
      "For each proposal, name the problem owner, experiment owner, integration owner, and completion condition. Choose at least one stewardship role yourself. During meetings, distinguish ideas offered for exploration from recommendations that require resources. Review abandoned experiments for lessons and cleanup. This makes the ENTP's generative contribution easier for a team to trust and reuse.",
    ),
  ],
  "career-environment": [
    block(
      "entp-career-summary",
      "summary",
      "Autonomy, Variety, and Consequential Problems",
      "ENTPs may prefer work that combines intellectual freedom, changing problems, capable colleagues, and permission to improve the frame rather than merely follow a method. Roles involving innovation, strategy, design, entrepreneurship, research, consulting, or complex communication may offer these conditions, but no occupation belongs to a personality type. Fit depends on interests, values, expertise, resources, and the actual culture of a workplace.",
    ),
    block(
      "entp-career-analysis",
      "analysis",
      "Freedom Needs a Meaningful Constraint",
      "Complete freedom can become diffuse. Many ENTPs work best when the problem is consequential and constraints are clear enough to focus invention without prescribing every method. A strong environment defines outcomes, ethical boundaries, decision rights, and feedback while allowing experimentation inside them. The right question is not whether a role is unrestricted, but whether its constraints create a worthwhile design challenge.",
    ),
    block(
      "entp-career-example",
      "example",
      "Work That Rewards Reframing",
      "A product discovery team, policy lab, technical consultancy, venture studio, research group, or transformation programme may reward the ability to connect disciplines and test alternatives. The same title can be energising in one organisation and stifling in another. Examine the daily balance of exploration, delivery, administration, collaboration, and maintenance rather than relying on an occupational stereotype.",
    ),
    block(
      "entp-career-risk",
      "risk",
      "A Trail of Interesting Beginnings",
      "Frequent role or project changes can broaden experience, but they can also prevent depth, reputation, and long-term evidence of impact from accumulating. Leaving whenever learning slows may hide a need to develop execution, influence, or patience. Before changing direction, ask whether the environment is genuinely closed to growth or whether the next developmental task is completing, scaling, and maintaining what has already been discovered.",
    ),
    block(
      "entp-career-guidance",
      "guidance",
      "Assess the Work System",
      "Evaluate opportunities across six dimensions: problem variety, autonomy, quality of colleagues, tolerance for constructive challenge, access to evidence, and ownership through implementation. Ask how ideas are selected and who maintains successful experiments. Seek roles where curiosity can alter real outcomes, then build a personal completion system that does not depend on every phase remaining novel.",
    ),
  ],
  "relationship-dynamics": [
    block(
      "entp-relationships-summary",
      "summary",
      "Connection Through Curiosity and Exchange",
      "ENTPs may build connection through lively conversation, shared discovery, humour, and mutual independence. They may value relationships where ideas can be challenged without threatening belonging. Affection is not limited to verbal debate, however, and partners or friends may need steadiness, listening, and emotional presence that cannot be replaced by analysis. Individual history and attachment experience matter more than a four-letter code.",
    ),
    block(
      "entp-relationships-analysis",
      "analysis",
      "Understanding Is Not Always the Immediate Need",
      "When someone describes a difficulty, the ENTP may rapidly generate explanations, alternatives, or a different frame. This can be helpful when the person wants options. It can feel distancing when they first need their experience recognised. Ask whether the moment calls for listening, comfort, exploration, or problem solving. Emotional responsiveness is not surrendering logic; it is selecting the form of attention the relationship currently requires.",
    ),
    block(
      "entp-relationships-strength",
      "strength",
      "Keeping Relationships Open to Growth",
      "A developed ENTP can bring playfulness, candour, and willingness to reconsider established patterns. They may help a relationship discuss assumptions that have become restrictive and imagine arrangements that suit both people better. This flexibility supports growth when commitments remain dependable. Change should be negotiated with the person affected, not announced as the obvious result of a new insight.",
    ),
    block(
      "entp-relationships-risk",
      "risk",
      "Debating the Person's Experience",
      "Analytical challenge becomes harmful when another person's report of hurt, fatigue, or need is treated as a proposition to defeat. The ENTP may focus on inconsistencies in wording and miss the relational signal. Accuracy still matters, but timing and purpose matter too. A relationship becomes safer when subjective experience can be acknowledged before causes, alternatives, or responsibility are examined.",
    ),
    block(
      "entp-relationships-guidance",
      "guidance",
      "Build Reliability Into Spontaneity",
      "Keep a small number of explicit relational commitments and review them rather than relying on intention. When plans change, communicate early and acknowledge the effect instead of presenting the new option as self-evidently better. Practise reflecting the other person's meaning before reframing it. Freedom and reliability can coexist when adaptation is collaborative and the cost of flexibility is not repeatedly transferred to someone else.",
    ),
  ],
  "change-and-adaptation": [
    block(
      "entp-change-summary",
      "summary",
      "Opportunity Inside Transition",
      "ENTPs may respond to change by identifying new possibilities, questioning inherited constraints, and experimenting with alternative routes. This can reduce paralysis and help others see that the future is not limited to the first plan. The pattern is less effective when change is pursued for stimulation, when losses are minimised, or when the next pivot begins before people and systems have integrated the previous one.",
      [
        {
          id: "entp-combination-adaptation",
          source: "combination",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
    block(
      "entp-change-analysis",
      "analysis",
      "Adaptation Through Experiment",
      "The ENTP may prefer to learn by trying a new configuration rather than designing the complete transition in advance. Reversible experiments can create evidence quickly and reduce attachment to one plan. Some changes are not easily reversible, and repeated experimentation can exhaust people who need stable expectations. Match the method to consequence: explore freely where recovery is cheap and plan more carefully where trust, safety, or continuity is at risk.",
    ),
    block(
      "entp-change-strength",
      "strength",
      "Loosening False Constraints",
      "During uncertainty, the person may identify that a feared limitation is an assumption rather than a fact. By separating genuine safeguards from habit, the ENTP can restore agency and create routes around an apparent impasse. This is particularly valuable when the reframe includes operational knowledge and affected stakeholders. A constraint should be removed because evidence shows it is unnecessary, not simply because it limits optionality.",
    ),
    block(
      "entp-change-risk",
      "risk",
      "Pivoting Before Learning Consolidates",
      "If early friction is interpreted as evidence that a direction has failed, the ENTP may pivot before the team understands whether the problem was concept, execution, timing, or adoption. The next approach then inherits unresolved weaknesses. Adaptation becomes stronger when each change preserves a decision record, captures evidence, and closes or transfers unfinished obligations before opening a new path.",
    ),
    block(
      "entp-change-guidance",
      "guidance",
      "Use Reversible and Irreversible Gates",
      "Classify each change by reversibility and human consequence. For reversible choices, run short experiments with clear measures. For difficult-to-reverse choices, add consultation, scenario testing, and a transition plan. At every gate, state what was learned, what remains uncertain, and which commitments survive the pivot. This lets flexibility serve evidence rather than restlessness.",
    ),
  ],
  "stress-and-recovery": [
    block(
      "entp-stress-summary",
      "summary",
      "Restlessness, Diffusion, and Reactive Challenge",
      "Under sustained stress, an ENTP may scatter attention across new possibilities, challenge more sharply, or keep generating alternatives to avoid an uncomfortable commitment. At other times the person may become unusually preoccupied with details, mistakes, or physical disruption. Stress responses vary widely and are not diagnostic. The useful question is which behaviours signal reduced choice, poorer judgement, or loss of restorative routines for this individual.",
    ),
    block(
      "entp-stress-analysis",
      "analysis",
      "When Mental Movement Replaces Recovery",
      "New information, conversation, and side projects can feel restorative because they change the mental channel. They may also keep the nervous system activated and postpone contact with fatigue, disappointment, or uncertainty. Recovery requires more than interesting stimulation. Sleep, movement, unstructured quiet, reduced input, and completion of small obligations can restore capacity that another conceptual challenge merely redirects.",
    ),
    block(
      "entp-stress-evidence",
      "evidence",
      "Personal Early-Warning Signals",
      "Possible warning signs include opening many tasks without closing them, escalating debate over minor points, repeatedly changing tools or plans, missing practical commitments, or seeking novelty while avoiding one consequential decision. These signs are individual, not universal. Track what reliably appears before sleep, patience, accuracy, or relationship quality declines, and ask trusted people what change they notice first.",
    ),
    block(
      "entp-stress-risk",
      "risk",
      "Turning Pressure Into an Intellectual Contest",
      "When feeling constrained, the ENTP may argue against the legitimacy of the demand instead of deciding how to respond. Some constraints deserve challenge; others represent real agreements, limits, or consequences. Constant reframing can isolate the person from support because every concern becomes another position to debate. Name the pressure directly before analysing whether the system should be different.",
    ),
    block(
      "entp-stress-guidance",
      "guidance",
      "Reduce Inputs and Close Loops",
      "Choose one source of information to pause, one unfinished obligation to close, and one decision to make with current evidence. Tell a trusted person what support would help without inviting an immediate strategy debate. Use physical routines that reduce cognitive activation. If distress is persistent or significantly affects functioning, seek appropriate professional support rather than relying on a personality explanation.",
    ),
  ],
  "growth-roadmap": [
    block(
      "entp-growth-summary",
      "summary",
      "From Possibility to Durable Contribution",
      "ENTP development is not about becoming less curious or more conventional. It involves increasing the ability to select, complete, communicate, and integrate the most valuable possibilities. Growth expands choice: the person can still challenge assumptions and improvise, while also recognising when stability, emotional presence, or disciplined repetition serves the larger purpose. The dynamic slot below highlights combinations that may shape this work.",
      [
        {
          id: "entp-combination-focus-risk",
          source: "combination",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
    block(
      "entp-growth-analysis",
      "analysis",
      "Convergence Is a Creative Skill",
      "Selecting one direction can feel like losing the others, yet convergence is what allows an idea to encounter reality deeply enough to develop. A mature ENTP treats selection as another design problem: which option creates the most learning or value under present constraints? Commitment can be time-bounded and revisable without being superficial. Depth reveals possibilities that constant switching never reaches.",
    ),
    block(
      "entp-growth-risk",
      "risk",
      "Identity Built Around Being Unconstrained",
      "If freedom from limitation becomes central to identity, ordinary obligations may feel like threats rather than chosen structures that support relationships and long-term goals. The person may preserve optionality at the cost of trust or expertise. Autonomy is more robust when it includes the capacity to make commitments consciously, negotiate them honestly, and remain present when the work becomes less stimulating.",
    ),
    block(
      "entp-growth-guidance",
      "guidance",
      "Practise Bounded Experiments",
      "Choose a developmental edge—completion, listening, planning, or maintenance—and design a four-week experiment with one observable behaviour. Keep the experiment small enough to finish and meaningful enough to matter. Review evidence weekly without changing the target prematurely. At the end, decide what to retain, revise, or stop. This channels adaptability into cumulative learning.",
    ),
    block(
      "entp-growth-action",
      "action",
      "A Weekly Integration Review",
      "Once a week, review new ideas, active experiments, delivery commitments, and relational obligations in one place. Close or defer low-value options, identify the next concrete completion step, and communicate changes to anyone affected. Record one insight gained through follow-through rather than novelty. Over time, this builds evidence that intellectual agility and dependable execution can reinforce each other.",
    ),
  ],
  "ninety-day-action-plan": [
    block(
      "entp-action-summary",
      "summary",
      "A Ninety-Day Focus Experiment",
      "Use the next ninety days to test whether selective commitment increases rather than diminishes freedom. Choose one meaningful outcome that requires exploration and delivery. Keep the plan experimental: observations may change the method, but changes should be recorded rather than made impulsively. The objective is a completed learning cycle with visible value, not a perfect performance.",
    ),
    block(
      "entp-action-days-1-30",
      "action",
      "Days 1–30 · Select and Define",
      "Choose one consequential problem and write the current assumption, three plausible alternatives, and the evidence that would distinguish them. Select one experiment using impact, learning value, feasibility, and reversibility. Define success, stop conditions, ownership, and a completion date. Pause at least one competing initiative and tell affected collaborators what has been chosen.",
    ),
    block(
      "entp-action-days-31-60",
      "action",
      "Days 31–60 · Test and Sustain",
      "Run the experiment without changing its purpose whenever novelty falls. Track evidence, implementation friction, stakeholder response, and unfinished obligations. Schedule two protected delivery periods each week and one conversation focused on listening rather than reframing. If a new idea appears, place it in a review list instead of immediately redirecting resources.",
    ),
    block(
      "entp-action-days-61-90",
      "action",
      "Days 61–90 · Integrate and Complete",
      "Decide whether to stop, adapt, or scale using the original criteria and accumulated evidence. Complete documentation, handover, cleanup, and communication. Ask collaborators where curiosity helped and where changing frames increased cost. Identify one execution practice worth retaining and one constraint that genuinely deserves redesign in the next cycle.",
    ),
    block(
      "entp-action-review",
      "reflection",
      "Evidence of Development",
      "Review concrete indicators: experiments completed, decisions held stable until review, ideas intentionally declined, commitments communicated early, and feedback integrated without immediate counterargument. Also record whether energy, relationship trust, and work quality changed. Development is supported by repeated behaviour under real conditions, not by agreement with an appealing personality description.",
    ),
    block(
      "entp-action-guidance",
      "guidance",
      "Keep the Plan Adaptive but Accountable",
      "Adjust methods when evidence warrants it, but preserve the outcome, decision record, and obligations unless they are explicitly renegotiated. If the plan becomes another source of scattered activity, reduce it to one completion behaviour and one relational behaviour. A small finished experiment creates more useful knowledge than an elaborate system that is repeatedly redesigned.",
    ),
  ],
  methodology: [
    block(
      "entp-methodology-framework",
      "analysis",
      "How to Use This Report",
      "This report interprets an MBTI-style preference result using the measured EI, SN, TF, and JP dimensions, confidence values, static type-level content, and matched dynamic rules. It describes tendencies that may be useful for reflection. It is not a clinical diagnosis, intelligence test, capability assessment, or scientifically absolute account of personality. No section should be used alone for consequential employment, educational, relationship, or health decisions.",
    ),
    block(
      "entp-methodology-variation",
      "evidence",
      "Context and Individual Variation",
      "People sharing an ENTP result can differ substantially because of culture, age, expertise, responsibilities, health, values, environment, and personal development. Balanced or lower-confidence dimensions increase the likelihood that neighbouring preferences are similarly accessible. Give greater weight to repeated lived evidence than to a type stereotype, and treat descriptions that do not fit as information rather than failure.",
    ),
    block(
      "entp-methodology-dynamic",
      "analysis",
      "Dynamic Interpretation",
      "Generated reports select rule content from the supplied dimension scores and confidence patterns. Applied-rule metadata records which adaptations were inserted, supporting traceability across report, content, and rule versions. Dynamic text can qualify a broad type narrative, but it cannot infer motives, history, maturity, mental health, or future outcomes. Interpretation remains a reflective aid rather than an automated judgement.",
    ),
    block(
      "entp-methodology-version",
      "guidance",
      "Version and Responsible Review",
      "Report version: 1.0.0. Content version: 1.0.0. Rule version: 1.0.0. These identifiers preserve the source used to generate a result as content and rules evolve. Revisit the report when circumstances or self-understanding change, compare it with feedback and behaviour, and retain only interpretations that support accurate, responsible reflection.",
    ),
  ],
};

export const ENTP_COMPLETE_REPORT:
  CompletePersonalityReportDefinition = {
    personalityType: "ENTP",
    version: COMPLETE_PERSONALITY_REPORT_VERSION,
    title: { en: "ENTP Complete Personality Report" },
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
