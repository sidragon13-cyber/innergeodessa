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
      "enfp-identity-summary",
      "summary",
      "Your Complete ENFP Report",
      "This complete report examines an ENFP preference pattern through exploration, reframing, values-sensitive invitation, communication, work, relationships, stress, and development. It treats the type code as a working hypothesis about preferred ways of engaging with ideas and possibilities—not as a fixed identity, clinical judgement, or measure of intelligence. Experience, culture, responsibilities, trust, and learned skills can substantially change how the pattern appears. Use recognition and mismatch alike as evidence for reflection.",
    ),
  ],
  "personality-overview": [
    block(
      "enfp-overview-summary",
      "summary",
      "Possibility Activation and Values-Driven Exploration",
      "An ENFP pattern often combines outward engagement, imaginative possibility, values-guided judgement, and openness to an emerging route. The person may energise others by connecting ideas with human potential, reframing a constraint, and inviting experimentation around what could become more meaningful or alive. This orientation can activate change, but usefulness depends on consent, selection, follow-through, and respect for constraints that protect people and outcomes. Inspiration is a preference pattern, not a guarantee of originality or impact.",
    ),
  ],
  "dimension-results": [
    block(
      "enfp-dimensions-context",
      "analysis",
      "Reading the Four Dimensions",
      "An ENFP result combines preferences across EI, SN, TF, and JP, but each dimension may carry different strength and confidence. A balanced EI score can make exploration quieter, a practical SN result can ground possibility in evidence, a balanced TF result can bring human consequences forward, and a firmer JP result can increase closure. The dynamic interpretations below qualify the type-level narrative. Compare them with behaviour across roles, relationships, cultures, energy levels, and periods of pressure.",
      [
        {
          id: "enfp-ei-exploration",
          source: "dimension",
          dimensions: ["EI"],
        },
        {
          id: "enfp-sn-possibility",
          source: "dimension",
          dimensions: ["SN"],
        },
        {
          id: "enfp-tf-analysis",
          source: "dimension",
          dimensions: ["TF"],
        },
        {
          id: "enfp-jp-flexibility",
          source: "dimension",
          dimensions: ["JP"],
        },
        {
          id: "enfp-overall-confidence",
          source: "confidence",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
  ],
  "key-strengths": [
    block(
      "enfp-strengths-bridge",
      "summary",
      "Strengths in Context",
      "Likely ENFP strengths include possibility activation, authentic encouragement, imaginative connection, adaptability, and the ability to help people see alternatives beyond an inherited story. The pattern can be useful when a group needs renewed energy or a values-consistent route through uncertainty. These are not automatic competencies. Their value depends on listening, craft, ethical judgement, and discipline to convert inspiration into evidence and sustained contribution. Later sections distinguish generative exploration from novelty that disperses attention.",
    ),
  ],
  "growth-risks": [
    block(
      "enfp-risks-bridge",
      "guidance",
      "Growth Through Selective Commitment",
      "Development may involve choosing among meaningful possibilities, sustaining effort after inspiration becomes routine, and recognising when enthusiasm is inviting participation versus creating social pressure. Other risks include changing direction before learning accumulates, overpromising from genuine excitement, or treating another person's need for stability as resistance. These are not fixed defects. The following sections protect curiosity and values while increasing reliability, boundaries, trust, and cumulative impact.",
    ),
  ],
  "core-personality-pattern": [
    block(
      "enfp-core-summary",
      "summary",
      "Possibility, Values, and Activation",
      "The central ENFP pattern often involves noticing an unrealised possibility, connecting it with a personal or shared value, and creating enough relational energy for exploration to begin. Ideas develop through dialogue, imagination, and experience rather than being accepted because of convention. At its best, this helps people move from a limiting story toward an experiment with genuine meaning. The dynamic slots below qualify how the pattern changes with preference strength, balance, and confidence.",
      [
        {
          id: "enfp-combination-experiment",
          source: "combination",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
        {
          id: "enfp-balanced-dimensions",
          source: "confidence",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
    block(
      "enfp-core-analysis",
      "analysis",
      "Reframing the Given Problem",
      "An ENFP may notice that a difficult question rests on an assumption nobody has examined. By changing the frame—what success means, which constraint is fixed, or whose perspective matters—the person can reveal options that linear problem solving misses. This is most useful when the reframe remains accountable to evidence and consequence. A clever alternative that ignores the actual decision, available capacity, or affected people is stimulation rather than problem solving.",
    ),
    block(
      "enfp-core-strength",
      "strength",
      "Creating Intellectual Movement",
      "A developed expression can help people move beyond false choices. The ENFP may combine fragments from different fields, articulate an overlooked contradiction, or design a reversible trial that replaces abstract disagreement with learning. This can reduce fear around uncertainty because the group gains several ways to proceed. The contribution becomes durable when options are prioritised and someone accepts ownership for testing, integrating, and completing the most valuable one.",
    ),
    block(
      "enfp-core-risk",
      "risk",
      "Possibility Without Accumulation",
      "When exploration becomes the default response to every constraint, work can remain perpetually promising but rarely cumulative. New ideas may displace earlier commitments before results are visible, and implementation detail can be dismissed as less intellectually interesting. Others then carry integration and maintenance costs while the ENFP experiences the system as unnecessarily restrictive. Freedom is strengthened, not reduced, when selected experiments have boundaries, evidence criteria, and a defined finish.",
    ),
    block(
      "enfp-core-reflection",
      "reflection",
      "Which Possibility Expresses a Living Value?",
      "List the possibilities currently generating energy. Which one serves a value you want to embody, improves another person's real options, and can be tested within a defined period? What promise must be paused so this choice receives honest effort? Name the human consequence and completion condition before beginning. The aim is not to suppress inspiration; it is to help one meaningful possibility become lived evidence.",
    ),
  ],
  "motivation-and-needs": [
    block(
      "enfp-motivation-summary",
      "summary",
      "Autonomy, Discovery, and Intellectual Range",
      "ENFPs may feel energised by freedom to explore, difficult questions, capable collaborators, and environments where assumptions can be invitationd without excessive status protection. Motivation often rises when a problem has several plausible routes and activation can change the direction. Not every ENFP seeks constant social stimulation or entrepreneurial risk. The underlying need is usually room for independent thought and adaptive movement, balanced by enough purpose for exploration to matter.",
    ),
    block(
      "enfp-motivation-analysis",
      "analysis",
      "Engagement Through Open Questions",
      "A settled routine can feel less engaging than a question whose structure is still emerging. The ENFP may invest intensely while learning is rapid, then lose momentum when success depends on repetition, documentation, or incremental refinement. This does not make routine meaningless; it shows that motivation and obligation do not always align. Sustainable contribution requires a system that protects curiosity while making completion visible and socially accountable.",
    ),
    block(
      "enfp-motivation-strength",
      "strength",
      "Energy That Makes Possibility Social",
      "A useful ENFP strength is making an emerging possibility feel imaginable and participatory. The person may connect interests across boundaries, notice latent enthusiasm, and invite others into an early experiment before certainty exists. This can renew agency in a discouraged group. The strength grows when excitement includes consent, realistic capacity, and a plan that remains meaningful after the initial relational energy changes.",
    ),
    block(
      "enfp-motivation-risk",
      "risk",
      "Inspiration as a Substitute for Embodiment",
      "A new cause, relationship, or creative direction can feel deeply authentic before its demands are known. When ordinary repetition is interpreted as loss of meaning, the ENFP may leave just as values need practice rather than imagination. The risk is not inspiration; it is allowing the emotional vividness of a new possibility to decide which promises deserve sustained care.",
    ),
    block(
      "enfp-motivation-guidance",
      "guidance",
      "Design a Portfolio of Meaningful Commitments",
      "Separate commitments into exploration, expression, and ongoing care. Limit how many can occupy each category, and do not make a new relational or public promise until one is fulfilled, transferred, or honestly released. Connect maintenance with the person or value it protects. Review the portfolio weekly so freedom includes conscious trade-offs rather than an accumulation of enthusiastic obligations.",
    ),
  ],
  "information-processing": [
    block(
      "enfp-information-summary",
      "summary",
      "Patterns Across Possibilities",
      "An ENFP pattern often notices relationships among ideas, emerging implications, and alternatives hidden by the current frame. Information is not only collected; it is recombined to see what else could be true. This can reveal strategic openings and imaginative errors quickly. The same speed can produce weak conclusions if novelty is mistaken for evidence or if concrete exceptions are treated as details. Exploration becomes credible when models remain testable.",
    ),
    block(
      "enfp-information-analysis",
      "analysis",
      "Possibility Through Human and Symbolic Connection",
      "The ENFP may expand understanding by connecting a practical issue with stories, values, relationships, and possibilities from another domain. This can reveal routes that a narrow problem frame excludes. It needs a later convergence step that compares alternatives against meaning, evidence, capacity, and effects on people. Without that step, an inspiring field of options can leave the next responsible action unclear.",
    ),
    block(
      "enfp-information-strength",
      "strength",
      "Connecting Distant Domains",
      "ENFPs may transfer a useful principle from one field into another, noticing structural similarity where surface features differ. This can support innovation, learning, and communication across specialist boundaries. The transfer is strongest when differences are tested rather than ignored. A metaphor can open inquiry, but operational evidence must determine whether the borrowed model explains the present system or merely sounds compelling.",
    ),
    block(
      "enfp-information-risk",
      "risk",
      "The Seduction of an Elegant Possibility",
      "An intellectually satisfying explanation can gain momentum before its assumptions are checked. The ENFP may defend its possibility value while others are asking whether it is accurate, safe, or usable. Dialogue can then protect the idea from the evidence it was meant to invite. A concept deserves further investment when it explains observed facts, survives serious alternatives, and produces a prediction or action that can be tested.",
    ),
    block(
      "enfp-information-guidance",
      "guidance",
      "Turn Inspiration Into a Values Test",
      "For a promising possibility, state the limiting story, the value the alternative could express, and the lived observation that would show improvement. Identify one person's boundary and one practical constraint the experiment must respect. Ask an affected participant—not only an enthusiastic supporter—to shape the test. Continue because experience supports the value, not merely because the story remains emotionally compelling.",
    ),
  ],
  "decision-making": [
    block(
      "enfp-decisions-summary",
      "summary",
      "Testing Criteria and Preserving Options",
      "ENFPs may approach decisions by examining assumptions, comparing multiple models, and keeping options open while useful information is still emerging. They can identify a choice hidden by conventional framing and may prefer reversible experiments to premature certainty. This supports adaptive judgement, but a decision eventually requires criteria, ownership, and consequence. Remaining open is valuable only while additional exploration can materially improve the choice.",
    ),
    block(
      "enfp-decisions-analysis",
      "analysis",
      "Feeling the Meaning of Several Paths",
      "The ENFP may test a decision by imagining how each path affects identity, possibility, and the people involved. This can reveal values that a purely instrumental comparison misses. It can also make every option emotionally vivid and therefore difficult to release. State which values are essential, which can be expressed later, and when exploration must become a provisional choice.",
    ),
    block(
      "enfp-decisions-strength",
      "strength",
      "Finding the Reversible Route",
      "A useful decision strength is recognising when a large commitment can be divided into smaller tests. Instead of choosing between two total strategies, the ENFP may design a pilot that creates better evidence and preserves future options. This reduces the cost of uncertainty. It works only when the pilot has success criteria, a decision owner, and a date for choosing whether to stop, adapt, or scale.",
    ),
    block(
      "enfp-decisions-risk",
      "risk",
      "A New Possibility That Reopens Every Promise",
      "After a decision is made, another meaningful option can make the existing commitment feel inauthentic or unnecessarily limiting. Reopening may be justified when values or evidence change, but repeated redirection transfers uncertainty to colleagues and loved ones. Distinguish a genuine conflict of conscience from renewed excitement, and define in advance which signals are strong enough to renegotiate the promise.",
    ),
    block(
      "enfp-decisions-guidance",
      "guidance",
      "Use a Convergence Contract",
      "Before exploring, name the decision, deadline, governing criteria, and level of reversibility. Allow deliberate divergence until the agreed point, then rank options and make a recommendation with remaining uncertainty visible. Record what would reopen the choice. This protects the ENFP's ability to discover alternatives while giving collaborators a dependable moment when discussion becomes coordinated action.",
    ),
  ],
  "communication": [
    block(
      "enfp-communication-summary",
      "summary",
      "Interactive, Generative, and Challenging",
      "ENFPs may think through conversation, using questions, counterexamples, humour, and reframing to develop an idea. This can make discussion energetic and intellectually open. Dialogue is not necessarily hostility, but intent does not erase impact. Effective communication distinguishes exploration from opposition, adjusts intensity to trust and context, and ensures that the other person's meaning is understood before it is tested.",
    ),
    block(
      "enfp-communication-analysis",
      "analysis",
      "Conversation as a Thinking Laboratory",
      "Dialogue can function as real-time activation. The ENFP offers a proposition, observes the response, modifies the frame, and searches for a stronger explanation. This can help groups think beyond rehearsed positions. It can also make others feel used as intellectual material if emotional stakes or power differences are ignored. Ask permission before turning a vulnerable topic into an open-ended dialogue.",
    ),
    block(
      "enfp-communication-risk",
      "risk",
      "Winning the Exchange, Losing the Signal",
      "Verbal agility can make it possible to answer nearly every objection. The risk is that a technically successful response conceals information about trust, fatigue, values, or implementation. A person who stops arguing may not be persuaded; they may conclude that participation is costly. Notice withdrawal, repetition, and changes in tone as data. The goal is shared understanding and better judgement, not proof that every invitation can be countered.",
    ),
    block(
      "enfp-communication-guidance",
      "guidance",
      "Name the Mode of the Conversation",
      "Begin by stating whether you want brainstorming, critique, decision, or support. During critique, summarise the other position in terms they accept before offering a reframe. Limit the number of new directions introduced at once. When stakes are personal, ask what kind of response would be useful. These practices preserve intellectual honesty while reducing the relational ambiguity created by constant invitation.",
    ),
    block(
      "enfp-communication-reflection",
      "reflection",
      "Did Enthusiasm Create Choice?",
      "Review a conversation in which you introduced an exciting alternative. Did the other person gain genuine room to imagine, decline, or slow down, or did warmth make participation feel expected? Which question helped them express their own value, and which one redirected attention to your possibility? Activation is most trustworthy when people experience it as agency rather than emotional momentum.",
    ),
  ],
  "teamwork-and-leadership": [
    block(
      "enfp-teamwork-summary",
      "summary",
      "Catalysing Options and Learning",
      "In teams, an ENFP may contribute by widening the option space, challenging stale assumptions, connecting expertise, and maintaining energy during ambiguity. Leadership may appear as intellectual catalyst rather than formal command. The person can help a group experiment before committing heavily. Teams also need continuity, role clarity, and maintenance, so the catalytic contribution must connect with people who can integrate decisions and carry work through completion.",
    ),
    block(
      "enfp-teamwork-analysis",
      "analysis",
      "Useful Disruption Requires Context",
      "Questioning the current method can prevent complacency, especially when a team has confused tradition with necessity. Yet disruption has costs: people may be protecting regulatory, operational, or relational constraints the ENFP has not seen. Before reframing, learn what the existing process solves and who bears the transition burden. A invitation becomes useful when it respects accumulated knowledge while making genuine alternatives discussable.",
    ),
    block(
      "enfp-teamwork-strength",
      "strength",
      "Cross-Pollinating Expertise",
      "The ENFP may help specialists see how their work connects, translating a pattern from one domain into a question another team can test. This can accelerate innovation and reduce siloed thinking. The contribution is strongest when the person credits expertise, separates analogy from proof, and remains involved long enough to help resolve the integration problems created by the new connection.",
    ),
    block(
      "enfp-teamwork-risk",
      "risk",
      "Unequal Distribution of Follow-Through",
      "Teams can become excited by an ENFP's ideas while execution, documentation, and repair repeatedly fall to others. Even when unintentional, this creates an unequal exchange: one person retains novelty while colleagues absorb completion costs. Trust improves when idea ownership includes responsibility for testing assumptions, securing resources, documenting decisions, and staying available through the less stimulating stages of delivery.",
    ),
    block(
      "enfp-teamwork-guidance",
      "guidance",
      "Pair Catalysis With Stewardship",
      "For each proposal, name the problem owner, experiment owner, integration owner, and completion condition. Choose at least one stewardship role yourself. During meetings, distinguish ideas offered for exploration from recommendations that require resources. Review abandoned experiments for lessons and cleanup. This makes the ENFP's generative contribution easier for a team to trust and reuse.",
    ),
  ],
  "career-environment": [
    block(
      "enfp-career-summary",
      "summary",
      "Autonomy, Variety, and Consequential Problems",
      "ENFPs may prefer work that combines intellectual freedom, changing problems, capable colleagues, and permission to improve the frame rather than merely follow a method. Roles involving innovation, strategy, design, entrepreneurship, research, consulting, or complex communication may offer these conditions, but no occupation belongs to a personality type. Fit depends on interests, values, expertise, resources, and the actual culture of a workplace.",
    ),
    block(
      "enfp-career-analysis",
      "analysis",
      "Freedom Needs a Meaningful Constraint",
      "Complete freedom can become diffuse. Many ENFPs work best when the problem is consequential and constraints are clear enough to focus invention without prescribing every method. A strong environment defines outcomes, ethical boundaries, decision rights, and feedback while allowing activation inside them. The right question is not whether a role is unrestricted, but whether its constraints create a worthwhile design invitation.",
    ),
    block(
      "enfp-career-example",
      "example",
      "Work That Rewards Possibility and Human Meaning",
      "Community innovation, creative strategy, education, communications, entrepreneurship, advocacy, people development, product discovery, or mission-led programmes may reward imaginative connection and values-driven activation. The same title can energise in one culture and exhaust in another. Examine the daily balance of inspiration, delivery, administration, relationship work, and maintenance rather than relying on a type-based occupation list.",
    ),
    block(
      "enfp-career-risk",
      "risk",
      "A Trail of Meaningful Beginnings",
      "Frequent role or cause changes can broaden empathy and experience, but they can also prevent craft, trust, and long-term evidence of contribution from accumulating. Leaving when work becomes routine may hide the developmental task of embodying values through maintenance. Before changing direction, ask whether the environment truly blocks integrity or whether the next authentic step is completing and caring for what has already begun.",
    ),
    block(
      "enfp-career-guidance",
      "guidance",
      "Assess the Work System",
      "Evaluate opportunities across six dimensions: problem variety, autonomy, quality of colleagues, tolerance for constructive invitation, access to evidence, and ownership through implementation. Ask how ideas are selected and who maintains successful experiments. Seek roles where curiosity can alter real outcomes, then build a personal completion system that does not depend on every phase remaining novel.",
    ),
  ],
  "relationship-dynamics": [
    block(
      "enfp-relationships-summary",
      "summary",
      "Connection Through Curiosity and Exchange",
      "ENFPs may build connection through lively conversation, shared discovery, humour, and mutual independence. They may value relationships where ideas can be invitationd without threatening belonging. Affection is not limited to verbal dialogue, however, and partners or friends may need steadiness, listening, and emotional presence that cannot be replaced by analysis. Individual history and attachment experience matter more than a four-letter code.",
    ),
    block(
      "enfp-relationships-analysis",
      "analysis",
      "Understanding Is Not Always the Immediate Need",
      "When someone describes a difficulty, the ENFP may rapidly generate explanations, alternatives, or a different frame. This can be helpful when the person wants options. It can feel distancing when they first need their experience recognised. Ask whether the moment calls for listening, comfort, exploration, or problem solving. Emotional responsiveness is not surrendering values; it is selecting the form of attention the relationship currently requires.",
    ),
    block(
      "enfp-relationships-strength",
      "strength",
      "Keeping Relationships Open to Growth",
      "A developed ENFP can bring playfulness, candour, and willingness to reconsider established patterns. They may help a relationship discuss assumptions that have become restrictive and imagine arrangements that suit both people better. This flexibility supports growth when commitments remain dependable. Change should be negotiated with the person affected, not announced as the obvious result of a new insight.",
    ),
    block(
      "enfp-relationships-risk",
      "risk",
      "Debating the Person's Experience",
      "Values-Sensitive invitation becomes harmful when another person's report of hurt, fatigue, or need is treated as a proposition to defeat. The ENFP may focus on inconsistencies in wording and miss the relational signal. Accuracy still matters, but timing and purpose matter too. A relationship becomes safer when subjective experience can be acknowledged before causes, alternatives, or responsibility are examined.",
    ),
    block(
      "enfp-relationships-guidance",
      "guidance",
      "Make Enthusiasm Reliably Relational",
      "Keep a small number of explicit relational promises and review them rather than relying on warm intention. When energy or plans change, communicate early and acknowledge the effect instead of assuming the new possibility will feel equally exciting to others. Reflect the other person's meaning before offering a reframe. Freedom and reliability coexist when adaptation is negotiated and emotional costs are not transferred silently.",
    ),
  ],
  "change-and-adaptation": [
    block(
      "enfp-change-summary",
      "summary",
      "Opportunity Inside Transition",
      "ENFPs may respond to change by identifying new possibilities, questioning inherited constraints, and experimenting with alternative routes. This can reduce paralysis and help others see that the future is not limited to the first plan. The pattern is less effective when change is pursued for stimulation, when losses are minimised, or when the next pivot begins before people and systems have integrated the previous one.",
      [
        {
          id: "enfp-combination-adaptation",
          source: "combination",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
    block(
      "enfp-change-analysis",
      "analysis",
      "Adaptation Through Experiment",
      "The ENFP may prefer to learn by trying a new configuration rather than designing the complete transition in advance. Reversible experiments can create evidence quickly and reduce attachment to one plan. Some changes are not easily reversible, and repeated activation can exhaust people who need stable expectations. Match the method to consequence: explore freely where recovery is cheap and plan more carefully where trust, safety, or continuity is at risk.",
    ),
    block(
      "enfp-change-strength",
      "strength",
      "Loosening False Constraints",
      "During uncertainty, the person may identify that a feared limitation is an assumption rather than a fact. By separating genuine safeguards from habit, the ENFP can restore agency and create routes around an apparent impasse. This is particularly valuable when the reframe includes operational knowledge and affected stakeholders. A constraint should be removed because evidence shows it is unnecessary, not simply because it limits optionality.",
    ),
    block(
      "enfp-change-risk",
      "risk",
      "Pivoting Before Learning Consolidates",
      "If early friction is interpreted as evidence that a direction has failed, the ENFP may pivot before the team understands whether the problem was concept, execution, timing, or adoption. The next approach then inherits unresolved weaknesses. Adaptation becomes stronger when each change preserves a decision record, captures evidence, and closes or transfers unfinished obligations before opening a new path.",
    ),
    block(
      "enfp-change-guidance",
      "guidance",
      "Protect People While Possibilities Evolve",
      "Classify each change by reversibility, relational consequence, and the promises already made. For reversible choices, run a short values-led experiment. For difficult-to-reverse choices, add consultation, transition support, and time for people who process change more slowly. At every gate, state what remains meaningful and which commitments survive the pivot so flexibility serves agency rather than excitement alone.",
    ),
  ],
  "stress-and-recovery": [
    block(
      "enfp-stress-summary",
      "summary",
      "Restlessness, Diffusion, and Reactive Invitation",
      "Under sustained stress, an ENFP may scatter attention across new possibilities, invitation more sharply, or keep generating alternatives to avoid an uncomfortable commitment. At other times the person may become unusually preoccupied with details, mistakes, or physical disruption. Stress responses vary widely and are not diagnostic. The useful question is which behaviours signal reduced choice, poorer judgement, or loss of restorative routines for this individual.",
    ),
    block(
      "enfp-stress-analysis",
      "analysis",
      "When Mental Movement Replaces Recovery",
      "New information, conversation, and side projects can feel restorative because they change the mental channel. They may also keep the nervous system activated and postpone contact with fatigue, disappointment, or uncertainty. Recovery requires more than interesting stimulation. Sleep, movement, unstructured quiet, reduced input, and completion of small obligations can restore capacity that another imaginative invitation merely redirects.",
    ),
    block(
      "enfp-stress-evidence",
      "evidence",
      "Personal Early-Warning Signals",
      "Possible warning signs include opening many tasks without closing them, escalating dialogue over minor points, repeatedly changing tools or plans, missing practical commitments, or seeking novelty while avoiding one consequential decision. These signs are individual, not universal. Track what reliably appears before sleep, patience, accuracy, or relationship quality declines, and ask trusted people what change they notice first.",
    ),
    block(
      "enfp-stress-risk",
      "risk",
      "Turning Pressure Into an Intellectual Contest",
      "When feeling constrained, the ENFP may argue against the legitimacy of the demand instead of deciding how to respond. Some constraints deserve invitation; others represent real agreements, limits, or consequences. Constant reframing can isolate the person from support because every concern becomes another position to dialogue. Name the pressure directly before analysing whether the system should be different.",
    ),
    block(
      "enfp-stress-guidance",
      "guidance",
      "Reduce Inputs and Close Loops",
      "Choose one source of information to pause, one unfinished obligation to close, and one decision to make with current evidence. Tell a trusted person what support would help without inviting an immediate strategy dialogue. Use physical routines that reduce cognitive activation. If distress is persistent or significantly affects functioning, seek appropriate professional support rather than relying on a personality explanation.",
    ),
  ],
  "growth-roadmap": [
    block(
      "enfp-growth-summary",
      "summary",
      "From Possibility to Durable Contribution",
      "ENFP development is not about becoming less curious or more conventional. It involves increasing the ability to select, complete, communicate, and integrate the most valuable possibilities. Growth expands choice: the person can still invitation assumptions and improvise, while also recognising when stability, emotional presence, or disciplined repetition serves the larger purpose. The dynamic slot below highlights combinations that may shape this work.",
      [
        {
          id: "enfp-combination-focus-risk",
          source: "combination",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
    block(
      "enfp-growth-analysis",
      "analysis",
      "Convergence Is a Creative Skill",
      "Selecting one direction can feel like losing the others, yet convergence is what allows an idea to encounter reality deeply enough to develop. A mature ENFP treats selection as another design problem: which option creates the most learning or value under present constraints? Commitment can be time-bounded and revisable without being superficial. Depth reveals possibilities that constant switching never reaches.",
    ),
    block(
      "enfp-growth-risk",
      "risk",
      "Identity Built Around Infinite Potential",
      "If unrealised possibility becomes central to identity, a concrete path can feel like a reduction of the self rather than a chosen expression of values. The ENFP may preserve potential at the cost of trust, craft, or visible contribution. Freedom becomes more robust when it includes choosing, grieving excluded options, and remaining present after the path becomes ordinary.",
    ),
    block(
      "enfp-growth-guidance",
      "guidance",
      "Practise Bounded Values Experiments",
      "Choose a developmental edge—completion, listening, boundaries, or maintenance—and connect it to one value you want to embody. Design a four-week experiment with one observable behaviour and one person affected by it. Review evidence weekly without replacing the target with a more exciting idea. At the end, decide what expression of the value deserves continued practice.",
    ),
    block(
      "enfp-growth-action",
      "action",
      "A Weekly Possibility-to-Promise Review",
      "Once a week, review new inspirations, active experiments, delivery commitments, and relational promises together. Ask which option expresses a chosen value now, defer those whose time has not come, and identify the next concrete act of follow-through. Communicate changes to everyone affected. Record one insight that became available only because enthusiasm stayed present through repetition.",
    ),
  ],
  "ninety-day-action-plan": [
    block(
      "enfp-action-summary",
      "summary",
      "A Ninety-Day Focus Experiment",
      "Use the next ninety days to test whether selective commitment increases rather than diminishes freedom. Choose one meaningful outcome that requires exploration and delivery. Keep the plan exploratory: observations may change the method, but changes should be recorded rather than made impulsively. The objective is a completed learning cycle with visible value, not a perfect performance.",
    ),
    block(
      "enfp-action-days-1-30",
      "action",
      "Days 1–30 · Choose a Value in Action",
      "Choose one meaningful possibility and write the value it expresses, the people affected, three possible forms, and the evidence that would show real benefit. Select one reversible experiment using agency, feasibility, and relational impact. Define success, boundaries, ownership, and a completion date. Pause one competing promise and tell affected people what you have chosen.",
    ),
    block(
      "enfp-action-days-31-60",
      "action",
      "Days 31–60 · Sustain and Listen",
      "Continue the experiment after novelty falls. Track lived benefit, practical friction, participant choice, and promises still unfinished. Schedule two protected follow-through periods each week and one conversation devoted to hearing another person's meaning without activating a new direction. Place fresh ideas in a review list instead of immediately redirecting attention.",
    ),
    block(
      "enfp-action-days-61-90",
      "action",
      "Days 61–90 · Integrate and Honour Commitments",
      "Decide whether to stop, adapt, or deepen the work using the original value and accumulated evidence. Complete handover, cleanup, and communication. Ask participants where enthusiasm expanded agency and where changing direction created cost. Identify one follow-through practice worth retaining and one constraint that genuinely prevents meaningful contribution.",
    ),
    block(
      "enfp-action-review",
      "reflection",
      "Evidence of Development",
      "Review concrete indicators: values experiments completed, possibilities intentionally deferred, promises communicated early, consent checked, and feedback integrated without immediate reframing. Also record whether energy, relational trust, and work quality changed. Development is supported by repeated behaviour under real conditions, not by identification with an inspiring personality description.",
    ),
    block(
      "enfp-action-guidance",
      "guidance",
      "Keep Exploration Adaptive and Accountable",
      "Adjust methods when lived evidence warrants it, but preserve the chosen value and promises unless they are explicitly renegotiated. If the plan becomes another source of scattered inspiration, reduce it to one completion behaviour and one relational behaviour. A small finished expression of value creates more agency than an inspiring system that is repeatedly reinvented.",
    ),
  ],
  methodology: [
    block(
      "enfp-methodology-framework",
      "analysis",
      "How to Use This Report",
      "This report interprets an MBTI-style preference result using the measured EI, SN, TF, and JP dimensions, confidence values, static type-level content, and matched dynamic rules. It describes tendencies that may be useful for reflection. It is not a clinical diagnosis, intelligence test, capability assessment, or scientifically absolute account of personality. No section should be used alone for consequential employment, educational, relationship, or health decisions.",
    ),
    block(
      "enfp-methodology-variation",
      "evidence",
      "Context and Individual Variation",
      "People sharing an ENFP result can differ substantially because of culture, age, expertise, responsibilities, health, values, environment, and personal development. Balanced or lower-confidence dimensions increase the likelihood that neighbouring preferences are similarly accessible. Give greater weight to repeated lived evidence than to a type stereotype, and treat descriptions that do not fit as information rather than failure.",
    ),
    block(
      "enfp-methodology-dynamic",
      "analysis",
      "Dynamic Interpretation",
      "Generated reports select rule content from the supplied dimension scores and confidence patterns. Applied-rule metadata records which adaptations were inserted, supporting traceability across report, content, and rule versions. Dynamic text can qualify a broad type narrative, but it cannot infer motives, history, maturity, mental health, or future outcomes. Interpretation remains a reflective aid rather than an automated judgement.",
    ),
    block(
      "enfp-methodology-version",
      "guidance",
      "Version and Responsible Review",
      "Report version: 1.0.0. Content version: 1.0.0. Rule version: 1.0.0. These identifiers preserve the source used to generate a result as content and rules evolve. Revisit the report when circumstances or self-understanding change, compare it with feedback and behaviour, and retain only interpretations that support accurate, responsible reflection.",
    ),
  ],
};

export const ENFP_COMPLETE_REPORT:
  CompletePersonalityReportDefinition = {
    personalityType: "ENFP",
    version: COMPLETE_PERSONALITY_REPORT_VERSION,
    title: { en: "ENFP Complete Personality Report" },
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
