import {
  COMPLETE_PERSONALITY_REPORT_STANDARD,
  COMPLETE_PERSONALITY_REPORT_VERSION,
} from "../report-standard";
import type {
  CompletePersonalityReportDefinition,
  ReportContentBlock,
  ReportDynamicSlot,
} from "../types";
import { localizeStaticBlock } from "./localization";

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
  const localized = localizeStaticBlock(id, type);

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
      "esfp-identity-summary",
      "summary",
      "Your Complete ESFP Report",
      "This complete report examines an ESFP preference pattern through participation, reframing, values-sensitive invitation, communication, work, relationships, stress, and development. It treats the type code as a working hypothesis about preferred ways of engaging with shared experiences and immediate opportunities—not as a fixed identity, clinical judgement, or measure of intelligence. Experience, culture, responsibilities, trust, and learned skills can substantially change how the pattern appears. Use recognition and mismatch alike as evidence for reflection.",
    ),
  ],
  "personality-overview": [
    block(
      "esfp-overview-summary",
      "summary",
      "Expressive Connection and Present-Moment Participation",
      "An ESFP pattern often combines outward engagement, attention to immediate experience, values-guided judgement, and openness to responding as circumstances develop. The person may energise others by noticing what is happening now, welcoming participation, and turning a shared value into a tangible experience. This orientation can make connection and action accessible, but usefulness depends on consent, practical follow-through, and respect for different energy, access, and boundaries. Social responsiveness is a preference pattern, not a guarantee of empathy or impact.",
    ),
  ],
  "dimension-results": [
    block(
      "esfp-dimensions-context",
      "analysis",
      "Reading the Four Dimensions",
      "An ESFP result combines preferences across EI, SN, TF, and JP, but each dimension may carry different strength and confidence. A balanced EI score can make participation quieter, a practical SN result can ground experience in evidence, a balanced TF result can bring human consequences forward, and a firmer JP result can increase closure. The dynamic interpretations below qualify the type-level narrative. Compare them with behaviour across roles, relationships, cultures, energy levels, and periods of pressure.",
      [
        {
          id: "esfp-ei-participation",
          source: "dimension",
          dimensions: ["EI"],
        },
        {
          id: "esfp-sn-experience",
          source: "dimension",
          dimensions: ["SN"],
        },
        {
          id: "esfp-tf-analysis",
          source: "dimension",
          dimensions: ["TF"],
        },
        {
          id: "esfp-jp-flexibility",
          source: "dimension",
          dimensions: ["JP"],
        },
        {
          id: "esfp-overall-confidence",
          source: "confidence",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
  ],
  "key-strengths": [
    block(
      "esfp-strengths-bridge",
      "summary",
      "Strengths in Context",
      "Likely ESFP strengths include expressive connection, authentic encouragement, imaginative connection, adaptability, and the ability to help people see alternatives beyond an inherited story. The pattern can be useful when a group needs renewed energy or a values-consistent route through uncertainty. These are not automatic competencies. Their value depends on listening, craft, ethical judgement, and discipline to convert inspiration into evidence and sustained contribution. Later sections distinguish generative participation from novelty that disperses attention.",
    ),
  ],
  "growth-risks": [
    block(
      "esfp-risks-bridge",
      "guidance",
      "Growth Through Selective Commitment",
      "Responsive development may involve choosing among meaningful experiences, sustaining effort after inspiration becomes routine, and recognising when enthusiasm is inviting participation versus creating social pressure. Other risks include changing direction before learning accumulates, overpromising from genuine excitement, or treating another person's need for stability as resistance. These are not fixed defects. The following sections protect curiosity and values while increasing reliability, boundaries, trust, and cumulative impact.",
    ),
  ],
  "core-personality-pattern": [
    block(
      "esfp-core-summary",
      "summary",
      "Experience, Values, and Activation",
      "The central ESFP pattern often involves noticing an immediate opportunity for shared experience, connecting it with a personal or collective value, and creating enough relational energy for participation to begin. Meaning develops through direct engagement, sensory awareness, and feedback rather than being accepted because of convention. At its best, this helps people move from passive observation toward an experience they can shape together. The dynamic slots below qualify how the pattern changes with preference strength, balance, and confidence.",
      [
        {
          id: "esfp-combination-experiment",
          source: "combination",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
        {
          id: "esfp-balanced-dimensions",
          source: "confidence",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
    block(
      "esfp-core-analysis",
      "analysis",
      "Reframing the Given Problem",
      "An ESFP may notice that a difficult question rests on an assumption nobody has examined. By changing the frame—what success means, which constraint is fixed, or whose perspective matters—the ESFP participant can reveal options that linear problem solving misses. This is most useful when the reframe remains accountable to evidence and consequence. A clever alternative that ignores the actual decision, available capacity, or affected people is stimulation rather than problem solving.",
    ),
    block(
      "esfp-core-strength",
      "strength",
      "Creating Intellectual Movement",
      "A developed expression can help people move beyond false choices. The ESFP may combine fragments from different fields, articulate an overlooked contradiction, or design a reversible trial that replaces abstract disagreement with learning. This expressive participation can reduce fear around uncertainty because the group gains several ways to proceed. The contribution becomes durable when options are prioritised and someone accepts ownership for testing, integrating, and completing the most valuable one.",
    ),
    block(
      "esfp-core-risk",
      "risk",
      "Experience Without Accumulation",
      "When participation becomes the default response to every constraint, work can remain perpetually promising but rarely cumulative. New shared experiences may displace earlier commitments before results are visible, and implementation detail can be dismissed as less intellectually interesting. Others then carry integration and maintenance costs while the ESFP experiences the system as unnecessarily restrictive. Freedom is strengthened, not reduced, when selected experiments have boundaries, evidence criteria, and a defined finish.",
    ),
    block(
      "esfp-core-reflection",
      "reflection",
      "Which Experience Expresses a Living Value?",
      "List the experiences currently generating energy. Which one serves a value you want to embody, improves another person's real options, and can be tested within a defined period? What promise must be paused so this choice receives honest effort? Name the human consequence and completion condition before beginning. The connective aim is not to suppress inspiration; it is to help one meaningful experience become lived evidence.",
    ),
  ],
  "motivation-and-needs": [
    block(
      "esfp-motivation-summary",
      "summary",
      "Autonomy, Discovery, and Intellectual Range",
      "ESFPs may feel energised by freedom to explore, difficult questions, capable collaborators, and environments where assumptions can be invitationd without excessive status protection. Motivation often rises when a problem has several plausible routes and activation can change the direction. Not every ESFP seeks constant social stimulation or entrepreneurial risk. The underlying need is usually room for independent thought and adaptive movement, balanced by enough purpose for participation to matter.",
    ),
    block(
      "esfp-motivation-analysis",
      "analysis",
      "Engagement Through Open Questions",
      "A settled routine can feel less engaging than a question whose structure is still emerging. The ESFP may invest intensely while learning is rapid, then lose momentum when success depends on repetition, documentation, or incremental refinement. This does not make routine meaningless; it shows that motivation and obligation do not always align. Sustainable contribution requires a system that protects curiosity while making completion visible and socially accountable.",
    ),
    block(
      "esfp-motivation-strength",
      "strength",
      "Energy That Makes Experience Social",
      "A useful ESFP strength is making an emerging experience feel imaginable and participatory. The ESFP participant may connect interests across boundaries, notice latent enthusiasm, and invite others into an early experiment before certainty exists. This expressive participation can renew agency in a discouraged group. The strength grows when excitement includes consent, realistic capacity, and a plan that remains meaningful after the initial relational energy changes.",
    ),
    block(
      "esfp-motivation-risk",
      "risk",
      "Inspiration as a Substitute for Embodiment",
      "A new cause, relationship, or expressive direction can feel deeply authentic before its demands are known. When ordinary repetition is interpreted as loss of meaning, the ESFP may leave just as values need practice rather than sensory awareness. The participation risk is not inspiration; it is allowing the emotional vividness of a new experience to decide which promises deserve sustained care.",
    ),
    block(
      "esfp-motivation-guidance",
      "guidance",
      "Design a Portfolio of Meaningful Commitments",
      "Separate commitments into participation, expression, and ongoing care. Limit how many can occupy each category, and do not make a new relational or public promise until one is fulfilled, transferred, or honestly released. Connect maintenance with the ESFP participant or value it protects. Review the portfolio weekly so freedom includes conscious trade-offs rather than an accumulation of enthusiastic obligations.",
    ),
  ],
  "information-processing": [
    block(
      "esfp-information-summary",
      "summary",
      "Reading the Immediate Environment",
      "An ESFP pattern often notices visible reactions, sensory detail, available resources, and changes in the social atmosphere. Information becomes meaningful through direct contact: what people do, what the setting permits, and which response changes the experience now. This can support timely adaptation, while an engaging moment may receive more weight than delayed consequences or information outside the room. Observation becomes reliable when immediate impressions are checked with direct questions and follow-up evidence.",
    ),
    block(
      "esfp-information-analysis",
      "analysis",
      "Understanding Through Participation",
      "The ESFP may understand a situation by joining it, watching how people respond, and trying a practical adjustment rather than analysing it at a distance. This can reveal needs, energy, and friction that a written account misses. Participation also changes the setting, so the person's own enthusiasm or visibility must be treated as part of the evidence. Ask what was present before you intervened and what others experienced differently.",
    ),
    block(
      "esfp-information-strength",
      "strength",
      "Noticing What Makes Participation Work",
      "ESFPs may quickly notice which practical detail helps people engage: the timing, tone, physical arrangement, example, or invitation that lowers friction. This can make learning, service, and shared activity more accessible. The strength is most useful when the observation is shared with other owners and tested across more than one moment. A response that worked once is evidence to examine, not a universal formula for what people need.",
    ),
    block(
      "esfp-information-risk",
      "risk",
      "When the Energy of the Moment Becomes the Evidence",
      "A positive immediate response can make an activity seem more useful, inclusive, or sustainable than it is. The ESFP may give too little weight to people who stayed quiet, costs that appear later, or responsibilities left after the event. Enjoyment is real information, but it does not answer every question about access, consent, safety, or follow-through. Review the experience after the energy settles and include those who participated differently.",
    ),
    block(
      "esfp-information-guidance",
      "guidance",
      "Check the Experience After the Moment",
      "For one shared activity, record who participated, who declined, what practical barriers appeared, and which promises or cleanup remained. Ask one enthusiastic participant and one less-visible participant what helped and what created pressure. Compare immediate energy with later effort and benefit. Continue or adapt the activity because the full pattern supports its value, not only because the moment felt successful.",
    ),
  ],
  "decision-making": [
    block(
      "esfp-decisions-summary",
      "summary",
      "Testing Criteria and Preserving Options",
      "ESFPs may approach decisions by examining assumptions, comparing multiple models, and keeping options open while useful information is still emerging. They can identify a choice hidden by conventional framing and may prefer reversible experiments to premature certainty. This supports adaptive judgement, but a decision eventually requires criteria, ownership, and consequence. Remaining open is valuable only while additional participation can materially improve the choice.",
    ),
    block(
      "esfp-decisions-analysis",
      "analysis",
      "Feeling the Meaning of Several Paths",
      "The ESFP may test a decision by imagining how each path affects identity, experience, and the people involved. This expressive participation can reveal values that a purely instrumental comparison misses. It can also make every option emotionally vivid and therefore difficult to release. State which values are essential, which can be expressed later, and when participation must become a provisional choice.",
    ),
    block(
      "esfp-decisions-strength",
      "strength",
      "Finding the Reversible Route",
      "A useful decision strength is recognising when a large commitment can be divided into smaller tests. Instead of choosing between two total strategies, the ESFP may design a pilot that creates better evidence and preserves immediate moment options. This reduces the cost of uncertainty. It works only when the pilot has success criteria, a decision owner, and a date for choosing whether to stop, adapt, or scale.",
    ),
    block(
      "esfp-decisions-risk",
      "risk",
      "When Fresh Energy Competes With a Promise",
      "A vivid new experience can make an existing commitment feel less alive even when it still matters. Renegotiation may be justified when circumstances or values change, but repeated redirection transfers uncertainty to colleagues and loved ones. Distinguish a real conflict from a temporary rise in energy, and agree in advance which practical signals are strong enough to reopen the promise.",
    ),
    block(
      "esfp-decisions-guidance",
      "guidance",
      "Use a Convergence Contract",
      "Before exploring, name the decision, deadline, governing criteria, and level of reversibility. Allow deliberate divergence until the agreed point, then rank options and make a recommendation with remaining uncertainty visible. Record what would reopen the choice. This protects the ESFP's ability to discover alternatives while giving collaborators a dependable moment when discussion becomes coordinated action.",
    ),
  ],
  "communication": [
    block(
      "esfp-communication-summary",
      "summary",
      "Interactive, Generative, and Challenging",
      "ESFPs may think through conversation, using questions, counterexamples, humour, and reframing to develop a shared experience. This expressive participation can make discussion energetic and intellectually open. Dialogue is not necessarily hostility, but intent does not erase impact. Effective communication distinguishes participation from opposition, adjusts intensity to trust and context, and ensures that the other person's meaning is understood before it is tested.",
    ),
    block(
      "esfp-communication-analysis",
      "analysis",
      "Conversation as a Thinking Laboratory",
      "Dialogue can function as real-time activation. The ESFP offers a proposition, observes the response, modifies the frame, and searches for a stronger explanation. This expressive participation can help groups think beyond rehearsed positions. It can also make others feel used as intellectual material if emotional stakes or power differences are ignored. Invite and ask permission before turning a vulnerable topic into an open-ended dialogue.",
    ),
    block(
      "esfp-communication-risk",
      "risk",
      "Social Momentum That Outruns Preference",
      "Visible enthusiasm can make participation feel expected even when the ESFP intends an open invitation. People may join because the moment is public, enjoyable, or difficult to interrupt, while reservations about energy, access, or personal boundaries remain unspoken. Notice who hangs back, leaves early, or agrees without choosing a role. Offer a low-pressure way to decline or modify the activity, and treat different levels of participation as information rather than rejection.",
    ),
    block(
      "esfp-communication-guidance",
      "guidance",
      "Make the Invitation Clear",
      "Begin by stating whether the conversation is for shared enjoyment, practical coordination, a decision, or support. Reflect the other person's experience before adding your own energy or solution. Limit the number of activities or directions introduced at once. When stakes are personal, ask what response would feel useful. These practices preserve expressive warmth while reducing ambiguity created by constant invitation.",
    ),
    block(
      "esfp-communication-reflection",
      "reflection",
      "Did Enthusiasm Create Choice?",
      "Review a conversation in which you introduced an exciting alternative. Did the other person gain genuine room to imagine, decline, or slow down, or did warmth make participation feel expected? Which question helped them express their own value, and which one redirected attention to your experience? Activation is most trustworthy when people experience it as agency rather than emotional momentum.",
    ),
  ],
  "teamwork-and-leadership": [
    block(
      "esfp-teamwork-summary",
      "summary",
      "Making Participation Practical",
      "In teams, an ESFP may contribute by noticing who is engaged, translating a shared aim into an immediate activity, and adapting the environment so people can participate more easily. Leadership may appear through facilitation, hospitality, demonstration, or visible encouragement rather than formal authority. Teams also need role clarity and follow-through, so social energy is most useful when it helps owners act rather than making the ESFP responsible for sustaining every interaction.",
    ),
    block(
      "esfp-teamwork-analysis",
      "analysis",
      "Visible Energy Changes the Group",
      "The ESFP's participation can quickly raise energy, make a task approachable, or draw attention to a neglected person. It can also change the room so strongly that quieter preferences become harder to see. Before mobilising the group, ask what kind of participation is needed, which constraints matter, and who wants a different pace or role. An invitation is useful when it creates options rather than a new social expectation.",
    ),
    block(
      "esfp-teamwork-strength",
      "strength",
      "Creating Immediate Belonging",
      "The ESFP may help new or hesitant contributors enter a group by making introductions, demonstrating the first step, and responding visibly to their contribution. This can reduce social friction and turn a formal invitation into an experience of belonging. The contribution is strongest when welcome does not demand performance, when practical access needs are addressed, and when connection continues after the high-energy beginning.",
    ),
    block(
      "esfp-teamwork-risk",
      "risk",
      "When Others Inherit the Aftercare",
      "A successful event or rapid response can leave scheduling, documentation, cleanup, and follow-up to less-visible colleagues. Even when unintentional, this creates an unequal exchange: one person carries the energising moment while others absorb its maintenance costs. Trust improves when the ESFP names the aftercare before beginning, takes ownership of at least one routine task, and stays available after attention moves elsewhere.",
    ),
    block(
      "esfp-teamwork-guidance",
      "guidance",
      "Include the Work After the Invitation",
      "Before starting a shared activity, name the purpose, participation choices, practical owner, access needs, end time, and aftercare. Choose at least one follow-through responsibility yourself. During the activity, notice who needs a quieter entry point or a different role. Afterward, complete the promised communication and cleanup before creating the next experience.",
    ),
  ],
  "career-environment": [
    block(
      "esfp-career-summary",
      "summary",
      "Autonomy, Variety, and Consequential Problems",
      "ESFPs may prefer work that combines intellectual freedom, changing problems, capable colleagues, and permission to improve the frame rather than merely follow a method. Roles involving encouragement, strategy, design, entrepreneurship, research, consulting, or complex communication may offer these conditions, but no occupation belongs to a personality type. Fit depends on interests, values, expertise, resources, and the actual culture of a workplace.",
    ),
    block(
      "esfp-career-analysis",
      "analysis",
      "Freedom Needs a Meaningful Constraint",
      "Complete freedom can become diffuse. Many ESFPs work best when the problem is consequential and constraints are clear enough to focus invention without prescribing every method. A strong environment defines outcomes, ethical boundaries, decision rights, and feedback while allowing activation inside them. The right question is not whether a role is unrestricted, but whether its constraints create a worthwhile design invitation.",
    ),
    block(
      "esfp-career-example",
      "example",
      "Work That Rewards Experience and Human Meaning",
      "Community encouragement, expressive strategy, education, communications, entrepreneurship, advocacy, people development, product discovery, or mission-led programmes may reward imaginative connection and experience-led activation. The same title can energise in one culture and exhaust in another. Examine the daily balance of inspiration, delivery, administration, relationship work, and maintenance rather than relying on a type-based occupation list.",
    ),
    block(
      "esfp-career-risk",
      "risk",
      "Experience Without Accumulated Practice",
      "Frequent role or activity changes can broaden social range and practical experience, but they can also prevent craft, trust, and evidence of contribution from accumulating. Leaving when work becomes less stimulating may hide the developmental task of sustaining a valued experience for others. Before changing direction, ask whether the environment truly blocks contribution or whether the next expressive step is completing and caring for what has already begun.",
    ),
    block(
      "esfp-career-guidance",
      "guidance",
      "Assess the Work System",
      "Evaluate opportunities across six dimensions: problem variety, autonomy, quality of colleagues, tolerance for constructive invitation, access to evidence, and ownership through implementation. Invite and ask how shared experiences are selected and who maintains successful experiments. Seek roles where curiosity can alter real outcomes, then build a personal completion system that does not depend on every phase remaining novel.",
    ),
  ],
  "relationship-dynamics": [
    block(
      "esfp-relationships-summary",
      "summary",
      "Connection Through Curiosity and Exchange",
      "ESFPs may build connection through lively conversation, shared discovery, humour, and mutual independence. They may value relationships where shared experiences can be invitationd without threatening belonging. Affection is not limited to verbal dialogue, however, and partners or friends may need steadiness, listening, and emotional presence that cannot be replaced by analysis. Individual history and attachment experience matter more than a four-letter code.",
    ),
    block(
      "esfp-relationships-analysis",
      "analysis",
      "Understanding Is Not Always the Immediate Need",
      "When someone describes a difficulty, the ESFP may rapidly generate explanations, alternatives, or a different frame. This expressive participation can be helpful when the ESFP participant wants options. It can feel distancing when they first need their experience recognised. Invite and ask whether the moment calls for listening, comfort, participation, or problem solving. Emotional responsiveness is not surrendering values; it is selecting the form of attention the relationship currently requires.",
    ),
    block(
      "esfp-relationships-strength",
      "strength",
      "Keeping Relationships Open to Growth",
      "A developed ESFP can bring playfulness, candour, and willingness to reconsider established patterns. They may help a relationship discuss assumptions that have become restrictive and imagine arrangements that suit both people better. This flexibility supports growth when commitments remain dependable. Change should be negotiated with the ESFP participant affected, not announced as the obvious result of a new insight.",
    ),
    block(
      "esfp-relationships-risk",
      "risk",
      "Debating the Person's Experience",
      "Values-Sensitive invitation becomes harmful when another person's report of hurt, fatigue, or need is treated as a proposition to defeat. The ESFP may focus on inconsistencies in wording and miss the relational signal. Accuracy still matters, but timing and purpose matter too. A relationship becomes safer when subjective experience can be acknowledged before causes, alternatives, or responsibility are examined.",
    ),
    block(
      "esfp-relationships-guidance",
      "guidance",
      "Make Enthusiasm Reliably Relational",
      "Keep a small number of explicit relational promises and review them rather than relying on warm intention. When energy or plans change, communicate early and acknowledge the effect instead of assuming the new experience will feel equally exciting to others. Reflect the other person's meaning before offering a reframe. Freedom and reliability coexist when adaptation is negotiated and emotional costs are not transferred silently.",
    ),
  ],
  "change-and-adaptation": [
    block(
      "esfp-change-summary",
      "summary",
      "Opportunity Inside Transition",
      "ESFPs may respond to change by identifying new experiences, questioning inherited constraints, and experimenting with alternative routes. This expressive participation can reduce paralysis and help others see that the immediate moment is not limited to the first plan. The pattern is less effective when change is pursued for stimulation, when losses are minimised, or when the next pivot begins before people and systems have integrated the previous one.",
      [
        {
          id: "esfp-combination-adaptation",
          source: "combination",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
    block(
      "esfp-change-analysis",
      "analysis",
      "Adaptation Through Experiment",
      "The ESFP may prefer to learn by trying a new configuration rather than designing the complete transition in advance. Reversible experiments can create evidence quickly and reduce attachment to one plan. Some changes are not easily reversible, and repeated activation can exhaust people who need stable expectations. Match the method to consequence: explore freely where recovery is cheap and plan more carefully where trust, safety, or continuity is at risk.",
    ),
    block(
      "esfp-change-strength",
      "strength",
      "Loosening False Constraints",
      "During uncertainty, the ESFP participant may identify that a feared limitation is an assumption rather than a fact. By separating genuine safeguards from habit, the ESFP can restore agency and create routes around an apparent impasse. This is particularly valuable when the reframe includes operational knowledge and affected stakeholders. A constraint should be removed because evidence shows it is unnecessary, not simply because it limits optionality.",
    ),
    block(
      "esfp-change-risk",
      "risk",
      "Pivoting Before Learning Consolidates",
      "If early friction is interpreted as evidence that a direction has failed, the ESFP may pivot before the team understands whether the problem was concept, execution, timing, or adoption. The next approach then inherits unresolved weaknesses. Adaptation becomes stronger when each change preserves a decision record, captures evidence, and closes or transfers unfinished obligations before opening a new path.",
    ),
    block(
      "esfp-change-guidance",
      "guidance",
      "Keep Participation Safe While Plans Move",
      "Classify each change by reversibility, practical consequence, and promises already made. For reversible choices, run a short shared experience and gather response. For difficult-to-reverse choices, add consultation, transition support, and time for people who adapt more slowly. At every gate, state what remains available and which commitments survive the change so flexibility supports participation rather than excitement alone.",
    ),
  ],
  "stress-and-recovery": [
    block(
      "esfp-stress-summary",
      "summary",
      "Restlessness, Diffusion, and Reactive Invitation",
      "Under sustained stress, an ESFP may scatter attention across new experiences, invite others more urgently, or keep generating alternatives to avoid an uncomfortable commitment. At other times the ESFP participant may become unusually preoccupied with details, mistakes, or physical disruption. Stress responses vary widely and are not diagnostic. The useful question is which behaviours signal reduced choice, poorer judgement, or loss of restorative routines for this individual.",
    ),
    block(
      "esfp-stress-analysis",
      "analysis",
      "When Social Energy Masks Fatigue",
      "Conversation, activity, music, and new company can feel restorative because they change the atmosphere. They may also keep activation high and postpone contact with fatigue, disappointment, or uncertainty. Recovery requires more than enjoyable stimulation. Sleep, quiet movement, reduced social input, and completion of one small obligation can restore capacity that another lively invitation merely redirects.",
    ),
    block(
      "esfp-stress-evidence",
      "evidence",
      "Personal Participation Warning Signs",
      "Possible warning signs include accepting too many invitations, filling every quiet interval, changing plans repeatedly, missing practical commitments, or seeking social energy while avoiding one consequential conversation. These signs are individual, not universal. Track what appears before sleep, patience, accuracy, or relationship quality declines, and ask trusted people what change in availability or tone they notice first.",
    ),
    block(
      "esfp-stress-risk",
      "risk",
      "Turning Pressure Into an Intellectual Contest",
      "When feeling constrained, the ESFP may argue against the legitimacy of the demand instead of deciding how to respond. Some constraints deserve invitation; others represent real agreements, limits, or consequences. Constant reframing can isolate the ESFP participant from support because every concern becomes another position to dialogue. Name the pressure directly before analysing whether the system should be different.",
    ),
    block(
      "esfp-stress-guidance",
      "guidance",
      "Reduce Stimulation and Restore Choice",
      "Pause one optional social input, close one unfinished promise, and make one practical decision with the information available. Tell a trusted person what support would help without turning the exchange into another event. Use quiet physical routines that reduce activation. If distress persists or significantly affects functioning, seek appropriate professional support rather than relying on a personality explanation.",
    ),
  ],
  "growth-roadmap": [
    block(
      "esfp-growth-summary",
      "summary",
      "From Experience to Durable Contribution",
      "ESFP development is not about becoming less curious or more conventional. It involves increasing the ability to select, complete, communicate, and integrate the most valuable experiences. Growth expands choice: the ESFP participant can still invitation assumptions and improvise, while also recognising when stability, emotional presence, or disciplined repetition serves the larger purpose. The dynamic slot below highlights combinations that may shape this work.",
      [
        {
          id: "esfp-combination-focus-risk",
          source: "combination",
          dimensions: ["EI", "SN", "TF", "JP"],
        },
      ],
    ),
    block(
      "esfp-growth-analysis",
      "analysis",
      "Convergence Is a Expressive Skill",
      "Selecting one direction can feel like losing the others, yet convergence is what allows a shared experience to encounter reality deeply enough to develop. A mature ESFP treats selection as another design problem: which option creates the most learning or value under present constraints? Commitment can be time-bounded and revisable without being superficial. Depth reveals experiences that constant switching never reaches.",
    ),
    block(
      "esfp-growth-risk",
      "risk",
      "Identity Built Around Infinite Potential",
      "If unrealised experience becomes central to identity, a concrete path can feel like a reduction of the self rather than a chosen expression of values. The ESFP may preserve potential at the cost of trust, craft, or visible contribution. Freedom becomes more robust when it includes choosing, grieving excluded options, and remaining present after the path becomes ordinary.",
    ),
    block(
      "esfp-growth-guidance",
      "guidance",
      "Practise Bounded Values Experiments",
      "Choose a developmental edge—completion, listening, boundaries, or maintenance—and connect it to one value you want to embody. Design a four-week experiment with one observable behaviour and one person affected by it. Review evidence weekly without replacing the target with a more exciting shared experience. At the end, decide what expression of the value deserves continued practice.",
    ),
    block(
      "esfp-growth-action",
      "action",
      "A Weekly Experience-to-Promise Review",
      "Once a week, review new inspirations, active experiments, delivery commitments, and relational promises together. Invite and ask which option expresses a chosen value now, defer those whose time has not come, and identify the next concrete act of follow-through. Communicate changes to everyone affected. Record one insight that became available only because enthusiasm stayed present through repetition.",
    ),
  ],
  "ninety-day-action-plan": [
    block(
      "esfp-action-summary",
      "summary",
      "A Ninety-Day Focus Experiment",
      "Use the next ninety days to test whether selective commitment increases rather than diminishes freedom. Choose one meaningful outcome that requires participation and delivery. Keep the plan exploratory: observations may change the method, but changes should be recorded rather than made impulsively. The objective is a completed learning cycle with visible value, not a perfect performance.",
    ),
    block(
      "esfp-action-days-1-30",
      "action",
      "Days 1–30 · Observe and Invite",
      "Choose one shared setting where participation or enjoyment could improve. Observe who joins, who hesitates, what practical barriers exist, and which experience people say they want rather than assuming energy equals interest. Offer one small, reversible activity with a clear time boundary and an easy way to decline or adapt it. Success means participants can choose their level of involvement and describe what made the experience worthwhile.",
    ),
    block(
      "esfp-action-days-31-60",
      "action",
      "Days 31–60 · Repeat and Share Ownership",
      "Repeat the activity only if feedback supports it, then give participants responsibility for one element such as timing, access, materials, or facilitation. Track attendance alongside opt-outs, practical friction, energy after the event, and commitments still unfinished. Hold one short feedback conversation without defending the original idea. Place new activity ideas on a review list until the current commitment is completed.",
    ),
    block(
      "esfp-action-days-61-90",
      "action",
      "Days 61–90 · Integrate the Experience",
      "Decide whether to stop, adapt, or continue using participant feedback, practical cost, and the original value. Complete cleanup, handover, and any promise made during the activity. Ask where enthusiasm increased choice and where social momentum made preference harder to express. Retain one practice that improved inclusion or follow-through, and close one activity that depends on novelty rather than sustained value.",
    ),
    block(
      "esfp-action-review",
      "reflection",
      "Evidence of Responsive Participation",
      "Review concrete indicators: experiences completed, invitations intentionally declined, promises communicated early, consent checked, and feedback integrated without immediately lifting the energy. Also record whether stamina, interpersonal trust, and practical quality changed. Development is supported by repeated behaviour under real conditions, not by identification with an appealing personality description.",
    ),
    block(
      "esfp-action-guidance",
      "guidance",
      "Keep Participation Warm and Dependable",
      "Adjust methods when lived experience warrants it, but preserve explicit promises unless they are renegotiated. If the plan becomes another source of scattered activity, reduce it to one completion behaviour and one interpersonal behaviour. A small shared experience that is finished and cared for creates more agency than an exciting programme that is repeatedly reinvented.",
    ),
  ],
  methodology: [
    block(
      "esfp-methodology-framework",
      "analysis",
      "How to Use This Report",
      "This report interprets an MBTI-style preference result using the measured EI, SN, TF, and JP dimensions, confidence values, static type-level content, and matched dynamic rules. It describes tendencies that may be useful for reflection. It is not a clinical diagnosis, intelligence test, capability assessment, or scientifically absolute account of personality. No section should be used alone for consequential employment, educational, relationship, or health decisions.",
    ),
    block(
      "esfp-methodology-variation",
      "evidence",
      "Context and Individual Variation",
      "People sharing an ESFP result can differ substantially because of culture, age, expertise, responsibilities, health, values, environment, and personal development. Balanced or lower-confidence dimensions increase the likelihood that neighbouring preferences are similarly accessible. Give greater weight to repeated lived evidence than to a type stereotype, and treat descriptions that do not fit as information rather than failure.",
    ),
    block(
      "esfp-methodology-dynamic",
      "analysis",
      "Dynamic Interpretation",
      "Generated reports select rule content from the supplied dimension scores and confidence patterns. Applied-rule metadata records which adaptations were inserted, supporting traceability across report, content, and rule versions. Dynamic text can qualify a broad type narrative, but it cannot infer motives, history, maturity, mental health, or immediate moment outcomes. Interpretation remains a reflective aid rather than an automated judgement.",
    ),
    block(
      "esfp-methodology-version",
      "guidance",
      "Version and Responsible Review",
      "Report version: 1.0.0. Content version: 1.0.0. Rule version: 1.0.0. These identifiers preserve the source used to generate a result as content and rules evolve. Revisit the report when circumstances or self-understanding change, compare it with feedback and behaviour, and retain only interpretations that support accurate, responsible reflection.",
    ),
  ],
};

export const ESFP_COMPLETE_REPORT:
  CompletePersonalityReportDefinition = {
    personalityType: "ESFP",
    version: COMPLETE_PERSONALITY_REPORT_VERSION,
    title: {
      en: "ESFP Complete Personality Report",
      zh: "ESFP 完整人格报告",
    },
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
