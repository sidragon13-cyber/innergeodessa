import {
  createKidsRuntimeQuestionId,
  type KidsQuestionContract,
} from "../question-contract";

export const K912_RELEASE_ID = "KIDS-K912-RF-V2" as const;

export const K912_PRESENTATION_ORDER_SHA256 =
  "21fb20d0fcaba35d352d9a5f881eb3c57b55f897a14d875ca51d012bffc4293e" as const;

export const K912_QUESTION_DATA_SHA256 =
  "8ca43b2c6fa2598864450d7ab5ba4ed698c81df5d099b2fb7e72a230c0a0f333" as const;

export const k912Questions = [
  {
    id: createKidsRuntimeQuestionId(
      "K912V2-THINK-01",
    ),
    sourceItemId: "K912V2-THINK-01",
    module: "kids",
    form: "k912",
    releaseId: K912_RELEASE_ID,
    order: 1,
    domain: "think",
    prompt: {
      en: "Would you enjoy figuring out the hidden rule in a pattern, sequence, or arrangement?",
      zh: "你会喜欢找出一个图案、顺序或排列背后的隐藏规律吗？",
    },
    visual: {
      support: "helpful",
      assetId: "K912V2-THINK-01",
      masterPath: "/assets/kids/k912/v2/K912V2-THINK-01.png",
      displayPath: "/assets/kids/k912/v2/web/K912V2-THINK-01.webp",
      alt: {
        en: "Would you enjoy working out the hidden rule behind a pattern or arrangement?",
        zh: "你会喜欢找出一个图案或排列背后的隐藏规律吗？",
      },
    },
  },
  {
    id: createKidsRuntimeQuestionId(
      "K912V2-THINK-02",
    ),
    sourceItemId: "K912V2-THINK-02",
    module: "kids",
    form: "k912",
    releaseId: K912_RELEASE_ID,
    order: 2,
    domain: "think",
    prompt: {
      en: "Would you enjoy comparing several possible strategies before deciding which one to try?",
      zh: "你会喜欢先比较几种可能的策略，再决定尝试哪一种吗？",
    },
    visual: {
      support: "helpful",
      assetId: "K912V2-THINK-02",
      masterPath: "/assets/kids/k912/v2/K912V2-THINK-02.png",
      displayPath: "/assets/kids/k912/v2/web/K912V2-THINK-02.webp",
      alt: {
        en: "Would you enjoy comparing several possible strategies before deciding which one to try?",
        zh: "你会喜欢先比较几种可能的方法，再决定尝试哪一种吗？",
      },
    },
  },
  {
    id: createKidsRuntimeQuestionId(
      "K912V2-THINK-03",
    ),
    sourceItemId: "K912V2-THINK-03",
    module: "kids",
    form: "k912",
    releaseId: K912_RELEASE_ID,
    order: 3,
    domain: "think",
    prompt: {
      en: "If a problem had several rules that all had to be followed, would you enjoy finding a solution that fits them together?",
      zh: "如果一个问题需要同时遵守几个规则，你会喜欢找出一个能同时符合这些规则的解决方法吗？",
    },
    visual: {
      support: "helpful",
      assetId: "K912V2-THINK-03",
      masterPath: "/assets/kids/k912/v2/K912V2-THINK-03.png",
      displayPath: "/assets/kids/k912/v2/web/K912V2-THINK-03.webp",
      alt: {
        en: "If a problem had several rules that all had to be followed, would you enjoy finding a solution that fits them together?",
        zh: "如果一个问题需要同时遵守几个规则，你会喜欢找出一个能同时符合这些规则的解决方法吗？",
      },
    },
  },
  {
    id: createKidsRuntimeQuestionId(
      "K912V2-THINK-04",
    ),
    sourceItemId: "K912V2-THINK-04",
    module: "kids",
    form: "k912",
    releaseId: K912_RELEASE_ID,
    order: 4,
    domain: "think",
    prompt: {
      en: "Would you enjoy organising information into groups based on a rule or relationship you notice?",
      zh: "你会喜欢根据自己发现的规律或关系，把信息分成不同的组吗？",
    },
    visual: {
      support: "helpful",
      assetId: "K912V2-THINK-04",
      masterPath: "/assets/kids/k912/v2/K912V2-THINK-04.png",
      displayPath: "/assets/kids/k912/v2/web/K912V2-THINK-04.webp",
      alt: {
        en: "Would you enjoy organising information into groups based on a rule or relationship you notice?",
        zh: "你会喜欢根据自己发现的规律或关系，把信息分成不同的组吗？",
      },
    },
  },
  {
    id: createKidsRuntimeQuestionId(
      "K912V2-THINK-05",
    ),
    sourceItemId: "K912V2-THINK-05",
    module: "kids",
    form: "k912",
    releaseId: K912_RELEASE_ID,
    order: 5,
    domain: "think",
    prompt: {
      en: "Would you enjoy turning a big idea into a step-by-step plan that shows what needs to happen first, next, and later?",
      zh: "你会喜欢把一个比较大的想法整理成分步骤的计划，想清楚先做什么、接着做什么、之后再做什么吗？",
    },
    visual: {
      support: "helpful",
      assetId: "K912V2-THINK-05",
      masterPath: "/assets/kids/k912/v2/K912V2-THINK-05.png",
      displayPath: "/assets/kids/k912/v2/web/K912V2-THINK-05.webp",
      alt: {
        en: "A child turning a treehouse idea into a step-by-step visual plan.",
        zh: "孩子通过草图和模型，把树屋想法整理成分步骤的计划。",
      },
    },
  },
  {
    id: createKidsRuntimeQuestionId(
      "K912V2-THINK-06",
    ),
    sourceItemId: "K912V2-THINK-06",
    module: "kids",
    form: "k912",
    releaseId: K912_RELEASE_ID,
    order: 6,
    domain: "think",
    prompt: {
      en: "Would you enjoy looking at several clues and working out the relationship that connects them?",
      zh: "你会喜欢观察几个线索，并找出把它们联系起来的关系吗？",
    },
    visual: {
      support: "helpful",
      assetId: "K912V2-THINK-06",
      masterPath: "/assets/kids/k912/v2/K912V2-THINK-06.png",
      displayPath: "/assets/kids/k912/v2/web/K912V2-THINK-06.webp",
      alt: {
        en: "Would you enjoy looking at several clues and working out the relationship that connects them?",
        zh: "你会喜欢观察几个线索，并找出把它们联系起来的关系吗？",
      },
    },
  },
  {
    id: createKidsRuntimeQuestionId(
      "K912V2-THINK-07",
    ),
    sourceItemId: "K912V2-THINK-07",
    module: "kids",
    form: "k912",
    releaseId: K912_RELEASE_ID,
    order: 7,
    domain: "think",
    prompt: {
      en: "After seeing how something has changed over several steps, would you enjoy predicting what is most likely to happen next and explaining why?",
      zh: "观察一件事情连续几个步骤的变化后，你会喜欢预测下一步最可能发生什么，并想一想为什么吗？",
    },
    visual: {
      support: "helpful",
      assetId: "K912V2-THINK-07",
      masterPath: "/assets/kids/k912/v2/K912V2-THINK-07.png",
      displayPath: "/assets/kids/k912/v2/web/K912V2-THINK-07.webp",
      alt: {
        en: "A child watching a multi-step marble track and considering what will happen next.",
        zh: "孩子观察弹珠轨道连续几个步骤的变化，并思考下一步会发生什么。",
      },
    },
  },
  {
    id: createKidsRuntimeQuestionId(
      "K912V2-DISCOVER-01",
    ),
    sourceItemId: "K912V2-DISCOVER-01",
    module: "kids",
    form: "k912",
    releaseId: K912_RELEASE_ID,
    order: 8,
    domain: "discover",
    prompt: {
      en: "Would you enjoy investigating why something unexpected happened instead of accepting the first explanation?",
      zh: "如果发生了一件意外的事情，你会喜欢继续调查原因，而不是马上接受第一个解释吗？",
    },
    visual: {
      support: "helpful",
      assetId: "K912V2-DISCOVER-01",
      masterPath: "/assets/kids/k912/v2/K912V2-DISCOVER-01.png",
      displayPath: "/assets/kids/k912/v2/web/K912V2-DISCOVER-01.webp",
      alt: {
        en: "Would you enjoy investigating why something unexpected happened instead of accepting the first explanation?",
        zh: "如果发生了一件意外的事情，你会喜欢继续调查原因，而不是马上接受第一个解释吗？",
      },
    },
  },
  {
    id: createKidsRuntimeQuestionId(
      "K912V2-DISCOVER-02",
    ),
    sourceItemId: "K912V2-DISCOVER-02",
    module: "kids",
    form: "k912",
    releaseId: K912_RELEASE_ID,
    order: 9,
    domain: "discover",
    prompt: {
      en: "Would you enjoy testing two different explanations to see which one fits the evidence better?",
      zh: "你会喜欢测试两种不同的解释，看看哪一种和证据更符合吗？",
    },
    visual: {
      support: "helpful",
      assetId: "K912V2-DISCOVER-02",
      masterPath: "/assets/kids/k912/v2/K912V2-DISCOVER-02.png",
      displayPath: "/assets/kids/k912/v2/web/K912V2-DISCOVER-02.webp",
      alt: {
        en: "Would you enjoy testing two different explanations to see which one fits the evidence better?",
        zh: "你会喜欢测试两种不同的解释，看看哪一种和证据更符合吗？",
      },
    },
  },
  {
    id: createKidsRuntimeQuestionId(
      "K912V2-DISCOVER-03",
    ),
    sourceItemId: "K912V2-DISCOVER-03",
    module: "kids",
    form: "k912",
    releaseId: K912_RELEASE_ID,
    order: 10,
    domain: "discover",
    prompt: {
      en: "If you noticed something changing over time, would you enjoy collecting more observations to understand what is happening?",
      zh: "如果你发现一件事情随着时间发生变化，你会喜欢继续观察并收集更多信息，弄清楚发生了什么吗？",
    },
    visual: {
      support: "helpful",
      assetId: "K912V2-DISCOVER-03",
      masterPath: "/assets/kids/k912/v2/K912V2-DISCOVER-03.png",
      displayPath: "/assets/kids/k912/v2/web/K912V2-DISCOVER-03.webp",
      alt: {
        en: "If you noticed a pattern changing over time, would you enjoy collecting more observations to understand what is happening?",
        zh: "如果你发现一个规律随着时间发生变化，你会喜欢继续观察并收集更多信息，弄清楚发生了什么吗？",
      },
    },
  },
  {
    id: createKidsRuntimeQuestionId(
      "K912V2-DISCOVER-04",
    ),
    sourceItemId: "K912V2-DISCOVER-04",
    module: "kids",
    form: "k912",
    releaseId: K912_RELEASE_ID,
    order: 11,
    domain: "discover",
    prompt: {
      en: "Would you enjoy looking beyond what you first see to figure out how a machine, natural process, or other system actually works?",
      zh: "你会喜欢不只看表面，而是进一步弄清楚一台机器、一个自然过程或其他系统究竟是怎样运作的吗？",
    },
    visual: {
      support: "helpful",
      assetId: "K912V2-DISCOVER-04",
      masterPath: "/assets/kids/k912/v2/K912V2-DISCOVER-04.png",
      displayPath: "/assets/kids/k912/v2/web/K912V2-DISCOVER-04.webp",
      alt: {
        en: "A child examining the inside of a machine to understand how its parts work together.",
        zh: "孩子观察机器内部结构，尝试弄清各个部分怎样共同运作。",
      },
    },
  },
  {
    id: createKidsRuntimeQuestionId(
      "K912V2-DISCOVER-05",
    ),
    sourceItemId: "K912V2-DISCOVER-05",
    module: "kids",
    form: "k912",
    releaseId: K912_RELEASE_ID,
    order: 12,
    domain: "discover",
    prompt: {
      en: "Would you enjoy noticing small differences between several examples and using those differences as clues to explain what might be happening?",
      zh: "你会喜欢观察几个例子之间的小差别，并把这些差别当作线索，去弄清楚可能发生了什么吗？",
    },
    visual: {
      support: "helpful",
      assetId: "K912V2-DISCOVER-05",
      masterPath: "/assets/kids/k912/v2/K912V2-DISCOVER-05.png",
      displayPath: "/assets/kids/k912/v2/web/K912V2-DISCOVER-05.webp",
      alt: {
        en: "A child closely comparing several plants and recording small differences.",
        zh: "孩子仔细比较几株植物，并记录它们之间的细微差别。",
      },
    },
  },
  {
    id: createKidsRuntimeQuestionId(
      "K912V2-DISCOVER-06",
    ),
    sourceItemId: "K912V2-DISCOVER-06",
    module: "kids",
    form: "k912",
    releaseId: K912_RELEASE_ID,
    order: 13,
    domain: "discover",
    prompt: {
      en: "Would you enjoy changing one part of a simple experiment while keeping the other parts the same, to see what difference it makes?",
      zh: "做一个简单实验时，你会喜欢只改变其中一个条件，其他条件保持不变，看看结果会有什么不同吗？",
    },
    visual: {
      support: "helpful",
      assetId: "K912V2-DISCOVER-06",
      masterPath: "/assets/kids/k912/v2/K912V2-DISCOVER-06.png",
      displayPath: "/assets/kids/k912/v2/web/K912V2-DISCOVER-06.webp",
      alt: {
        en: "A child comparing plants in a simple experiment where one condition is changed.",
        zh: "孩子进行简单植物实验，只改变一个条件并比较结果。",
      },
    },
  },
  {
    id: createKidsRuntimeQuestionId(
      "K912V2-DISCOVER-07",
    ),
    sourceItemId: "K912V2-DISCOVER-07",
    module: "kids",
    form: "k912",
    releaseId: K912_RELEASE_ID,
    order: 14,
    domain: "discover",
    prompt: {
      en: "When you come across a topic or object you know very little about, would you enjoy looking for information or observations until you understand it better?",
      zh: "遇到一个自己不太了解的话题或东西时，你会喜欢主动寻找资料或继续观察，直到把它弄得更明白吗？",
    },
    visual: {
      support: "helpful",
      assetId: "K912V2-DISCOVER-07",
      masterPath: "/assets/kids/k912/v2/K912V2-DISCOVER-07.png",
      displayPath: "/assets/kids/k912/v2/web/K912V2-DISCOVER-07.webp",
      alt: {
        en: "A child using books, observations, and digital information to investigate unfamiliar minerals.",
        zh: "孩子结合书籍、观察和数字资料，主动调查不熟悉的矿物。",
      },
    },
  },
  {
    id: createKidsRuntimeQuestionId(
      "K912V2-BUILD-01",
    ),
    sourceItemId: "K912V2-BUILD-01",
    module: "kids",
    form: "k912",
    releaseId: K912_RELEASE_ID,
    order: 15,
    domain: "build",
    prompt: {
      en: "Would you enjoy designing and assembling a simple object from separate parts?",
      zh: "你会喜欢设计一个简单物品，并把不同的零件组合起来吗？",
    },
    visual: {
      support: "helpful",
      assetId: "K912V2-BUILD-01",
      masterPath: "/assets/kids/k912/v2/K912V2-BUILD-01.png",
      displayPath: "/assets/kids/k912/v2/web/K912V2-BUILD-01.webp",
      alt: {
        en: "Would you enjoy designing and assembling a simple object from separate parts?",
        zh: "你会喜欢设计一个简单物品，并把不同的零件组合起来吗？",
      },
    },
  },
  {
    id: createKidsRuntimeQuestionId(
      "K912V2-BUILD-02",
    ),
    sourceItemId: "K912V2-BUILD-02",
    module: "kids",
    form: "k912",
    releaseId: K912_RELEASE_ID,
    order: 16,
    domain: "build",
    prompt: {
      en: "If something simple was unstable or did not work properly, would you enjoy changing its structure to improve it?",
      zh: "如果一个简单的东西不够稳，或者不能正常工作，你会喜欢改变它的结构，让它变得更好吗？",
    },
    visual: {
      support: "helpful",
      assetId: "K912V2-BUILD-02",
      masterPath: "/assets/kids/k912/v2/K912V2-BUILD-02.png",
      displayPath: "/assets/kids/k912/v2/web/K912V2-BUILD-02.webp",
      alt: {
        en: "If something simple was unstable or did not work properly, would you enjoy changing its structure to improve it?",
        zh: "如果一个简单的东西不够稳，或者不能正常工作，你会喜欢改变它的结构，让它变得更好吗？",
      },
    },
  },
  {
    id: createKidsRuntimeQuestionId(
      "K912V2-BUILD-03",
    ),
    sourceItemId: "K912V2-BUILD-03",
    module: "kids",
    form: "k912",
    releaseId: K912_RELEASE_ID,
    order: 17,
    domain: "build",
    prompt: {
      en: "Would you enjoy testing different materials to see which one works best for a practical purpose?",
      zh: "你会喜欢测试不同材料，看看哪一种更适合完成一个实际用途吗？",
    },
    visual: {
      support: "helpful",
      assetId: "K912V2-BUILD-03",
      masterPath: "/assets/kids/k912/v2/K912V2-BUILD-03.png",
      displayPath: "/assets/kids/k912/v2/web/K912V2-BUILD-03.webp",
      alt: {
        en: "Would you enjoy testing different materials to see which one works best for a practical purpose?",
        zh: "你会喜欢测试不同材料，看看哪一种更适合完成一个实际用途吗？",
      },
    },
  },
  {
    id: createKidsRuntimeQuestionId(
      "K912V2-BUILD-04",
    ),
    sourceItemId: "K912V2-BUILD-04",
    module: "kids",
    form: "k912",
    releaseId: K912_RELEASE_ID,
    order: 18,
    domain: "build",
    prompt: {
      en: "Would you enjoy taking apart a safe, simple object to understand how its physical parts fit together?",
      zh: "你会喜欢拆开一个安全、简单的物品，看看它的各个部分是怎样组合在一起的吗？",
    },
    visual: {
      support: "helpful",
      assetId: "K912V2-BUILD-04",
      masterPath: "/assets/kids/k912/v2/K912V2-BUILD-04.png",
      displayPath: "/assets/kids/k912/v2/web/K912V2-BUILD-04.webp",
      alt: {
        en: "Would you enjoy taking apart a safe, simple object to understand how its physical parts fit together?",
        zh: "你会喜欢拆开一个安全、简单的物品，看看它的各个部分是怎样组合在一起的吗？",
      },
    },
  },
  {
    id: createKidsRuntimeQuestionId(
      "K912V2-BUILD-05",
    ),
    sourceItemId: "K912V2-BUILD-05",
    module: "kids",
    form: "k912",
    releaseId: K912_RELEASE_ID,
    order: 19,
    domain: "build",
    prompt: {
      en: "Would you enjoy turning a rough plan or sketch into something physical that can actually be used or tested?",
      zh: "你会喜欢把一个简单计划或草图变成可以真正使用或测试的实体东西吗？",
    },
    visual: {
      support: "helpful",
      assetId: "K912V2-BUILD-05",
      masterPath: "/assets/kids/k912/v2/K912V2-BUILD-05.png",
      displayPath: "/assets/kids/k912/v2/web/K912V2-BUILD-05.webp",
      alt: {
        en: "Would you enjoy turning a rough plan or sketch into something physical that can actually be used or tested?",
        zh: "你会喜欢把一个简单计划或草图变成可以真正使用或测试的实体东西吗？",
      },
    },
  },
  {
    id: createKidsRuntimeQuestionId(
      "K912V2-BUILD-06",
    ),
    sourceItemId: "K912V2-BUILD-06",
    module: "kids",
    form: "k912",
    releaseId: K912_RELEASE_ID,
    order: 20,
    domain: "build",
    prompt: {
      en: "If a simple object stopped working, would you enjoy checking its parts one by one to find the problem and try a safe repair?",
      zh: "如果一个简单物品不能正常工作了，你会喜欢逐一检查它的各个部分，找出问题并尝试安全地修好吗？",
    },
    visual: {
      support: "helpful",
      assetId: "K912V2-BUILD-06",
      masterPath: "/assets/kids/k912/v2/K912V2-BUILD-06.png",
      displayPath: "/assets/kids/k912/v2/web/K912V2-BUILD-06.webp",
      alt: {
        en: "A child checking the parts of a model vehicle to find and repair a problem.",
        zh: "孩子逐一检查模型车辆的部件，寻找问题并尝试修复。",
      },
    },
  },
  {
    id: createKidsRuntimeQuestionId(
      "K912V2-BUILD-07",
    ),
    sourceItemId: "K912V2-BUILD-07",
    module: "kids",
    form: "k912",
    releaseId: K912_RELEASE_ID,
    order: 21,
    domain: "build",
    prompt: {
      en: "After testing something you built, would you enjoy changing the design and trying again to make it work better?",
      zh: "测试自己做出来的东西之后，你会喜欢根据结果修改设计，再试一次，让它变得更好吗？",
    },
    visual: {
      support: "helpful",
      assetId: "K912V2-BUILD-07",
      masterPath: "/assets/kids/k912/v2/K912V2-BUILD-07.png",
      displayPath: "/assets/kids/k912/v2/web/K912V2-BUILD-07.webp",
      alt: {
        en: "A child testing a bridge model and comparing possible design improvements.",
        zh: "孩子测试桥梁模型，并比较可以进一步改进的设计方案。",
      },
    },
  },
  {
    id: createKidsRuntimeQuestionId(
      "K912V2-CREATE-01",
    ),
    sourceItemId: "K912V2-CREATE-01",
    module: "kids",
    form: "k912",
    releaseId: K912_RELEASE_ID,
    order: 22,
    domain: "create",
    prompt: {
      en: "Would you enjoy developing your own visual style for a poster, page, object, or digital design?",
      zh: "你会喜欢为海报、页面、物品或数字作品设计属于自己的视觉风格吗？",
    },
    visual: {
      support: "helpful",
      assetId: "K912V2-CREATE-01",
      masterPath: "/assets/kids/k912/v2/K912V2-CREATE-01.png",
      displayPath: "/assets/kids/k912/v2/web/K912V2-CREATE-01.webp",
      alt: {
        en: "Would you enjoy developing your own visual style for a poster, page, object, or digital design?",
        zh: "你会喜欢为海报、页面、物品或数字作品设计属于自己的视觉风格吗？",
      },
    },
  },
  {
    id: createKidsRuntimeQuestionId(
      "K912V2-CREATE-02",
    ),
    sourceItemId: "K912V2-CREATE-02",
    module: "kids",
    form: "k912",
    releaseId: K912_RELEASE_ID,
    order: 23,
    domain: "create",
    prompt: {
      en: "Would you enjoy turning an idea or topic into your own poster, comic, illustrated explanation, short video, or other creative form?",
      zh: "你会喜欢把一个想法或话题变成自己设计的海报、漫画、图文说明、短视频或其他创意作品吗？",
    },
    visual: {
      support: "helpful",
      assetId: "K912V2-CREATE-02",
      masterPath: "/assets/kids/k912/v2/K912V2-CREATE-02.png",
      displayPath: "/assets/kids/k912/v2/web/K912V2-CREATE-02.webp",
      alt: {
        en: "A child transforming an idea into an imaginative handmade visual creation.",
        zh: "孩子把一个想法转化成具有想象力的手工作品。",
      },
    },
  },
  {
    id: createKidsRuntimeQuestionId(
      "K912V2-CREATE-03",
    ),
    sourceItemId: "K912V2-CREATE-03",
    module: "kids",
    form: "k912",
    releaseId: K912_RELEASE_ID,
    order: 24,
    domain: "create",
    prompt: {
      en: "If you were given several simple materials, would you enjoy combining them in unusual ways to create something new?",
      zh: "如果给你一些简单材料，你会喜欢用不同寻常的方法把它们组合起来，创造出新的作品吗？",
    },
    visual: {
      support: "helpful",
      assetId: "K912V2-CREATE-03",
      masterPath: "/assets/kids/k912/v2/K912V2-CREATE-03.png",
      displayPath: "/assets/kids/k912/v2/web/K912V2-CREATE-03.webp",
      alt: {
        en: "A child combining simple everyday materials in an original way to create something new.",
        zh: "孩子用自己的方式组合普通材料，创造出一个新的作品。",
      },
    },
  },
  {
    id: createKidsRuntimeQuestionId(
      "K912V2-CREATE-04",
    ),
    sourceItemId: "K912V2-CREATE-04",
    module: "kids",
    form: "k912",
    releaseId: K912_RELEASE_ID,
    order: 25,
    domain: "create",
    prompt: {
      en: "Would you enjoy deciding how to tell the same story using different words, images, sounds, or performances?",
      zh: "你会喜欢用不同的文字、图像、声音或表演方式来讲述同一个故事吗？",
    },
    visual: {
      support: "helpful",
      assetId: "K912V2-CREATE-04",
      masterPath: "/assets/kids/k912/v2/K912V2-CREATE-04.png",
      displayPath: "/assets/kids/k912/v2/web/K912V2-CREATE-04.webp",
      alt: {
        en: "Would you enjoy deciding how to tell the same story using different words, images, sounds, or performances?",
        zh: "你会喜欢用不同的文字、图像、声音或表演方式来讲述同一个故事吗？",
      },
    },
  },
  {
    id: createKidsRuntimeQuestionId(
      "K912V2-CREATE-05",
    ),
    sourceItemId: "K912V2-CREATE-05",
    module: "kids",
    form: "k912",
    releaseId: K912_RELEASE_ID,
    order: 26,
    domain: "create",
    prompt: {
      en: "Would you enjoy inventing a character, world, scene, or concept that did not exist before?",
      zh: "你会喜欢创造一个以前不存在的角色、世界、场景或概念吗？",
    },
    visual: {
      support: "helpful",
      assetId: "K912V2-CREATE-05",
      masterPath: "/assets/kids/k912/v2/K912V2-CREATE-05.png",
      displayPath: "/assets/kids/k912/v2/web/K912V2-CREATE-05.webp",
      alt: {
        en: "Would you enjoy inventing a character, world, scene, or concept that did not exist before?",
        zh: "你会喜欢创造一个以前不存在的角色、世界、场景或概念吗？",
      },
    },
  },
  {
    id: createKidsRuntimeQuestionId(
      "K912V2-CREATE-06",
    ),
    sourceItemId: "K912V2-CREATE-06",
    module: "kids",
    form: "k912",
    releaseId: K912_RELEASE_ID,
    order: 27,
    domain: "create",
    prompt: {
      en: "If two people solved the same creative task in very different ways, would you enjoy finding a third approach of your own?",
      zh: "如果两个人用很不同的方法完成同一个创意任务，你会喜欢再想出一种自己的方法吗？",
    },
    visual: {
      support: "helpful",
      assetId: "K912V2-CREATE-06",
      masterPath: "/assets/kids/k912/v2/K912V2-CREATE-06.png",
      displayPath: "/assets/kids/k912/v2/web/K912V2-CREATE-06.webp",
      alt: {
        en: "If two people solved the same creative task in very different ways, would you enjoy finding a third approach of your own?",
        zh: "如果两个人用很不同的方法完成同一个创意任务，你会喜欢再想出一种自己的方法吗？",
      },
    },
  },
  {
    id: createKidsRuntimeQuestionId(
      "K912V2-CREATE-07",
    ),
    sourceItemId: "K912V2-CREATE-07",
    module: "kids",
    form: "k912",
    releaseId: K912_RELEASE_ID,
    order: 28,
    domain: "create",
    prompt: {
      en: "Would you enjoy improving the look, feel, or experience of something by changing its design?",
      zh: "你会喜欢通过改变设计，让一个东西的外观、感觉或使用体验得到改善吗？",
    },
    visual: {
      support: "helpful",
      assetId: "K912V2-CREATE-07",
      masterPath: "/assets/kids/k912/v2/K912V2-CREATE-07.png",
      displayPath: "/assets/kids/k912/v2/web/K912V2-CREATE-07.webp",
      alt: {
        en: "How much would you enjoy improving the look, feel, or experience of something by changing its design?",
        zh: "你有多喜欢通过改变设计，让一个东西的外观、感觉或使用体验得到改善？",
      },
    },
  },
  {
    id: createKidsRuntimeQuestionId(
      "K912V2-CONNECT-01",
    ),
    sourceItemId: "K912V2-CONNECT-01",
    module: "kids",
    form: "k912",
    releaseId: K912_RELEASE_ID,
    order: 29,
    domain: "connect",
    prompt: {
      en: "Would you enjoy helping someone understand a topic by explaining it in a way that makes sense to them?",
      zh: "你会喜欢用对方容易理解的方法，帮助别人弄懂一个话题吗？",
    },
    visual: {
      support: "helpful",
      assetId: "K912V2-CONNECT-01",
      masterPath: "/assets/kids/k912/v2/K912V2-CONNECT-01.png",
      displayPath: "/assets/kids/k912/v2/web/K912V2-CONNECT-01.webp",
      alt: {
        en: "Would you enjoy helping someone understand a topic by explaining it in a way that makes sense to them?",
        zh: "你会喜欢用对方容易理解的方法，帮助别人弄懂一个话题吗？",
      },
    },
  },
  {
    id: createKidsRuntimeQuestionId(
      "K912V2-CONNECT-02",
    ),
    sourceItemId: "K912V2-CONNECT-02",
    module: "kids",
    form: "k912",
    releaseId: K912_RELEASE_ID,
    order: 30,
    domain: "connect",
    prompt: {
      en: "Would you enjoy working with someone to help them practise a skill they are trying to improve?",
      zh: "你会喜欢和别人一起练习，帮助他们提升正在学习的一项技能吗？",
    },
    visual: {
      support: "helpful",
      assetId: "K912V2-CONNECT-02",
      masterPath: "/assets/kids/k912/v2/K912V2-CONNECT-02.png",
      displayPath: "/assets/kids/k912/v2/web/K912V2-CONNECT-02.webp",
      alt: {
        en: "Would you enjoy working with someone to help them practise a skill they are trying to improve?",
        zh: "你会喜欢和别人一起练习，帮助他们提升正在学习的一项技能吗？",
      },
    },
  },
  {
    id: createKidsRuntimeQuestionId(
      "K912V2-CONNECT-03",
    ),
    sourceItemId: "K912V2-CONNECT-03",
    module: "kids",
    form: "k912",
    releaseId: K912_RELEASE_ID,
    order: 31,
    domain: "connect",
    prompt: {
      en: "Would you enjoy working with a group to decide who will do which part so everyone can contribute to the same goal?",
      zh: "和大家一起完成任务时，你会喜欢共同商量每个人负责哪一部分，让大家都能为同一个目标出力吗？",
    },
    visual: {
      support: "helpful",
      assetId: "K912V2-CONNECT-03",
      masterPath: "/assets/kids/k912/v2/K912V2-CONNECT-03.png",
      displayPath: "/assets/kids/k912/v2/web/K912V2-CONNECT-03.webp",
      alt: {
        en: "A group of children contributing different parts to the same shared project.",
        zh: "一组孩子各自参与不同部分，共同完成同一个项目。",
      },
    },
  },
  {
    id: createKidsRuntimeQuestionId(
      "K912V2-CONNECT-04",
    ),
    sourceItemId: "K912V2-CONNECT-04",
    module: "kids",
    form: "k912",
    releaseId: K912_RELEASE_ID,
    order: 32,
    domain: "connect",
    prompt: {
      en: "If two people misunderstood each other, would you enjoy helping them understand what each person meant?",
      zh: "如果两个人互相误解了，你会喜欢帮助他们弄清楚彼此真正想表达的意思吗？",
    },
    visual: {
      support: "helpful",
      assetId: "K912V2-CONNECT-04",
      masterPath: "/assets/kids/k912/v2/K912V2-CONNECT-04.png",
      displayPath: "/assets/kids/k912/v2/web/K912V2-CONNECT-04.webp",
      alt: {
        en: "A child helping two other children talk through a misunderstanding and understand each other.",
        zh: "一个孩子帮助另外两个孩子把误会说清楚，重新理解彼此的意思。",
      },
    },
  },
  {
    id: createKidsRuntimeQuestionId(
      "K912V2-CONNECT-05",
    ),
    sourceItemId: "K912V2-CONNECT-05",
    module: "kids",
    form: "k912",
    releaseId: K912_RELEASE_ID,
    order: 33,
    domain: "connect",
    prompt: {
      en: "If a group had several good ideas, would you enjoy helping everyone compare them and agree on a direction together?",
      zh: "如果一个小组有几个不错的想法，你会喜欢和大家一起比较这些想法，并共同决定接下来往哪个方向做吗？",
    },
    visual: {
      support: "helpful",
      assetId: "K912V2-CONNECT-05",
      masterPath: "/assets/kids/k912/v2/K912V2-CONNECT-05.png",
      displayPath: "/assets/kids/k912/v2/web/K912V2-CONNECT-05.webp",
      alt: {
        en: "Children discussing a shared project and comparing ideas before deciding what to do together.",
        zh: "孩子们围绕共同项目讨论并比较不同想法，再一起决定下一步。",
      },
    },
  },
  {
    id: createKidsRuntimeQuestionId(
      "K912V2-CONNECT-06",
    ),
    sourceItemId: "K912V2-CONNECT-06",
    module: "kids",
    form: "k912",
    releaseId: K912_RELEASE_ID,
    order: 34,
    domain: "connect",
    prompt: {
      en: "Would you enjoy listening to someone's idea and asking questions that help them develop it further?",
      zh: "你会喜欢听别人的想法，并通过提问帮助他们把这个想法发展得更完整吗？",
    },
    visual: {
      support: "helpful",
      assetId: "K912V2-CONNECT-06",
      masterPath: "/assets/kids/k912/v2/K912V2-CONNECT-06.png",
      displayPath: "/assets/kids/k912/v2/web/K912V2-CONNECT-06.webp",
      alt: {
        en: "Would you enjoy listening to someone's idea and asking questions that help them develop it further?",
        zh: "你会喜欢听别人的想法，并通过提问帮助他们把这个想法发展得更完整吗？",
      },
    },
  },
  {
    id: createKidsRuntimeQuestionId(
      "K912V2-CONNECT-07",
    ),
    sourceItemId: "K912V2-CONNECT-07",
    module: "kids",
    form: "k912",
    releaseId: K912_RELEASE_ID,
    order: 35,
    domain: "connect",
    prompt: {
      en: "When working with someone who thinks or does things differently from you, would you enjoy adjusting how you work together so both of you can contribute?",
      zh: "和一个想法或做事方式与你不同的人一起合作时，你会喜欢调整彼此的合作方式，让双方都能发挥作用吗？",
    },
    visual: {
      support: "helpful",
      assetId: "K912V2-CONNECT-07",
      masterPath: "/assets/kids/k912/v2/K912V2-CONNECT-07.png",
      displayPath: "/assets/kids/k912/v2/web/K912V2-CONNECT-07.webp",
      alt: {
        en: "Two children adjusting how they work together while developing the same model.",
        zh: "两个孩子在共同制作模型时调整彼此的合作方式。",
      },
    },
  },
  {
    id: createKidsRuntimeQuestionId(
      "K912V2-MOVE-01",
    ),
    sourceItemId: "K912V2-MOVE-01",
    module: "kids",
    form: "k912",
    releaseId: K912_RELEASE_ID,
    order: 36,
    domain: "move",
    prompt: {
      en: "Would you enjoy an active game where you need to keep moving, react to what is happening, and change direction as the activity changes?",
      zh: "你会喜欢参加一种需要不断移动、根据现场变化作出反应，并随时改变移动方向的活动吗？",
    },
    visual: {
      support: "helpful",
      assetId: "K912V2-MOVE-01",
      masterPath: "/assets/kids/k912/v2/K912V2-MOVE-01.png",
      displayPath: "/assets/kids/k912/v2/web/K912V2-MOVE-01.webp",
      alt: {
        en: "A child actively changing direction while moving through an outdoor activity.",
        zh: "孩子在户外活动中不断移动，并根据现场变化改变方向。",
      },
    },
  },
  {
    id: createKidsRuntimeQuestionId(
      "K912V2-MOVE-02",
    ),
    sourceItemId: "K912V2-MOVE-02",
    module: "kids",
    form: "k912",
    releaseId: K912_RELEASE_ID,
    order: 37,
    domain: "move",
    prompt: {
      en: "Would you enjoy an activity where you move between several stations and actively try a different task at each one?",
      zh: "你会喜欢在几个活动点之间不断移动，并在每一个活动点亲自尝试不同任务吗？",
    },
    visual: {
      support: "helpful",
      assetId: "K912V2-MOVE-02",
      masterPath: "/assets/kids/k912/v2/K912V2-MOVE-02.png",
      displayPath: "/assets/kids/k912/v2/web/K912V2-MOVE-02.webp",
      alt: {
        en: "A child moving through several different physical activity stations.",
        zh: "孩子在多个不同的身体活动点之间移动并完成不同任务。",
      },
    },
  },
  {
    id: createKidsRuntimeQuestionId(
      "K912V2-MOVE-03",
    ),
    sourceItemId: "K912V2-MOVE-03",
    module: "kids",
    form: "k912",
    releaseId: K912_RELEASE_ID,
    order: 38,
    domain: "move",
    prompt: {
      en: "Would you enjoy being outdoors and using your body to explore natural features, such as following a trail or moving across different kinds of ground?",
      zh: "你会喜欢在户外活动，用身体去体验周围的自然环境，例如沿着路线前进或走过不同类型的地面吗？",
    },
    visual: {
      support: "helpful",
      assetId: "K912V2-MOVE-03",
      masterPath: "/assets/kids/k912/v2/K912V2-MOVE-03.png",
      displayPath: "/assets/kids/k912/v2/web/K912V2-MOVE-03.webp",
      alt: {
        en: "A child moving across stones and a log while exploring an outdoor natural setting.",
        zh: "孩子在自然环境中跨过石头和木头进行户外行动探索。",
      },
    },
  },
  {
    id: createKidsRuntimeQuestionId(
      "K912V2-MOVE-04",
    ),
    sourceItemId: "K912V2-MOVE-04",
    module: "kids",
    form: "k912",
    releaseId: K912_RELEASE_ID,
    order: 39,
    domain: "move",
    prompt: {
      en: "Would you enjoy exploring the same space through different routes or ways of moving?",
      zh: "你会喜欢用不同的路线或移动方式去探索同一个空间吗？",
    },
    visual: {
      support: "helpful",
      assetId: "K912V2-MOVE-04",
      masterPath: "/assets/kids/k912/v2/K912V2-MOVE-04.png",
      displayPath: "/assets/kids/k912/v2/web/K912V2-MOVE-04.webp",
      alt: {
        en: "Would you enjoy exploring the same space through different routes or ways of moving?",
        zh: "你会喜欢用不同的路线或移动方式去探索同一个空间吗？",
      },
    },
  },
  {
    id: createKidsRuntimeQuestionId(
      "K912V2-MOVE-05",
    ),
    sourceItemId: "K912V2-MOVE-05",
    module: "kids",
    form: "k912",
    releaseId: K912_RELEASE_ID,
    order: 40,
    domain: "move",
    prompt: {
      en: "Would you enjoy learning a movement or dance sequence and getting your body to follow the rhythm or order of the steps?",
      zh: "你会喜欢学习一组动作或舞蹈，并让身体跟着节奏或动作顺序完成它吗？",
    },
    visual: {
      support: "helpful",
      assetId: "K912V2-MOVE-05",
      masterPath: "/assets/kids/k912/v2/K912V2-MOVE-05.png",
      displayPath: "/assets/kids/k912/v2/web/K912V2-MOVE-05.webp",
      alt: {
        en: "Children following rhythm and movement together during an energetic dance activity.",
        zh: "孩子们在活跃的舞蹈活动中跟随节奏完成身体动作。",
      },
    },
  },
  {
    id: createKidsRuntimeQuestionId(
      "K912V2-MOVE-06",
    ),
    sourceItemId: "K912V2-MOVE-06",
    module: "kids",
    form: "k912",
    releaseId: K912_RELEASE_ID,
    order: 41,
    domain: "move",
    prompt: {
      en: "Would you enjoy a physical challenge that asks you to balance, climb, jump, throw, or move in a new way?",
      zh: "你会喜欢参加需要平衡、攀爬、跳跃、投掷，或者尝试新移动方式的身体挑战吗？",
    },
    visual: {
      support: "helpful",
      assetId: "K912V2-MOVE-06",
      masterPath: "/assets/kids/k912/v2/K912V2-MOVE-06.png",
      displayPath: "/assets/kids/k912/v2/web/K912V2-MOVE-06.webp",
      alt: {
        en: "A child taking on a climbing challenge that requires whole-body movement.",
        zh: "孩子参与需要全身动作的攀爬身体挑战。",
      },
    },
  },
  {
    id: createKidsRuntimeQuestionId(
      "K912V2-MOVE-07",
    ),
    sourceItemId: "K912V2-MOVE-07",
    module: "kids",
    form: "k912",
    releaseId: K912_RELEASE_ID,
    order: 42,
    domain: "move",
    prompt: {
      en: "Would you enjoy learning a physical skill that combines several movements, such as moving, turning, balancing, or controlling an object?",
      zh: "你会喜欢学习一种需要把几个动作连在一起的身体技能，例如移动、转身、保持平衡，或者控制一个物体吗？",
    },
    visual: {
      support: "helpful",
      assetId: "K912V2-MOVE-07",
      masterPath: "/assets/kids/k912/v2/K912V2-MOVE-07.png",
      displayPath: "/assets/kids/k912/v2/web/K912V2-MOVE-07.webp",
      alt: {
        en: "A child combining balance, footwork, and ball control in a movement course.",
        zh: "孩子在运动路线中组合平衡、脚步移动和控球动作。",
      },
    },
  },
] as const satisfies readonly KidsQuestionContract[];

export const K912_QUESTION_COUNT = k912Questions.length;
