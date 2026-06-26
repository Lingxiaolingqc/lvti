const LANGUAGES = ["en", "zh"];
const AXIS_POSITIVE_POLE = { RP: "R", SF: "S", DI: "D", EC: "E" };
const AXIS_NEGATIVE_POLE = { RP: "P", SF: "F", DI: "I", EC: "C" };
const AXIS_COLORS = { RP: "#c84764", SF: "#3867a8", DI: "#c0523b", EC: "#3f7e53" };
const STORAGE_KEYS = {
  language: "lvti.language",
  answers: "lvti.answers",
  currentQuestionIndex: "lvti.currentQuestionIndex",
  completed: "lvti.completed",
  started: "lvti.started",
  selectedQuestionIds: "lvti.selectedQuestionIds",
};

const uiText = {
  en: {
    subtitle: "Love View Type Indicator",
    description: "Find your love-view type through 40 quick questions.",
    intro:
      "LVTI maps how you approach romance, security, communication, and emotion in love. It is designed for self-reflection, sharing, and a little honest fun.",
    coverMeta: ["40 questions", "4 love-view axes", "16 possible types", "Language: English"],
    coverAxesTitle: "What LVTI looks at",
    coverAxes: [
      "Romantic vs Practical",
      "Stable vs Free",
      "Direct vs Indirect",
      "Emotional vs Calm",
    ],
    start: "Start Test",
    continue: "Continue Test",
    reset: "Start Over",
    disclaimer: "For self-reflection and fun, not a psychological diagnosis.",
    question: "Question",
    of: "of",
    back: "Back",
    next: "Next",
    seeType: "See My Type",
    share: "Share Result",
    copied: "Copied!",
    copyFailed: "Could not copy. Please copy your result manually.",
    retake: "Retake Test",
    strengths: "Love strengths",
    blindSpots: "Possible blind spots",
    communicationStyle: "Communication notes",
    conflictStyle: "Conflict notes",
    idealDynamic: "Relationship notes",
    compatibilityNotes: "Compatibility notes",
    axisBreakdown: "Your love-view map",
    slight: "slight preference",
    clear: "clear preference",
    strong: "strong preference",
    scale: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"],
    sharePrefix: "I got",
    shareMiddle: "on LVTI.",
    shareSuffix: "Take the test:",
  },
  zh: {
    subtitle: "恋爱观类型测试",
    description: "用 40 道轻量问题，找到你的恋爱观类型。",
    intro:
      "LVTI 会从浪漫感、稳定需求、表达方式和情绪处理四个角度，描绘你的恋爱观类型。它适合自我了解、分享，也适合带着一点好奇心认真玩玩。",
    coverMeta: ["40 道题", "4 个恋爱观维度", "16 种可能类型", "语言：中文"],
    coverAxesTitle: "LVTI 会观察什么",
    coverAxes: [
      "浪漫型 vs 现实型",
      "稳定型 vs 自由型",
      "直接型 vs 含蓄型",
      "感性型 vs 冷静型",
    ],
    start: "开始测试",
    continue: "继续测试",
    reset: "重新开始",
    disclaimer: "仅供自我了解和娱乐，不是心理诊断。",
    question: "题目",
    of: "/",
    back: "上一题",
    next: "下一题",
    seeType: "查看我的类型",
    share: "分享结果",
    copied: "已复制！",
    copyFailed: "无法复制，请手动复制你的结果。",
    retake: "重新测试",
    strengths: "恋爱优势",
    blindSpots: "可能的盲点",
    communicationStyle: "沟通提醒",
    conflictStyle: "冲突提醒",
    idealDynamic: "关系提醒",
    compatibilityNotes: "适配提醒",
    axisBreakdown: "你的恋爱观地图",
    slight: "轻微倾向",
    clear: "明显倾向",
    strong: "强烈倾向",
    scale: ["非常不同意", "不同意", "中立", "同意", "非常同意"],
    sharePrefix: "我的 LVTI 类型是",
    shareMiddle: "。",
    shareSuffix: "来测测你的类型：",
  },
};

const axes = [
  {
    id: "RP",
    poles: ["R", "P"],
    labels: {
      R: { en: "Romantic", zh: "浪漫型" },
      P: { en: "Practical", zh: "现实型" },
    },
  },
  {
    id: "SF",
    poles: ["S", "F"],
    labels: {
      S: { en: "Stable", zh: "稳定型" },
      F: { en: "Free", zh: "自由型" },
    },
  },
  {
    id: "DI",
    poles: ["D", "I"],
    labels: {
      D: { en: "Direct", zh: "直接型" },
      I: { en: "Indirect", zh: "含蓄型" },
    },
  },
  {
    id: "EC",
    poles: ["E", "C"],
    labels: {
      E: { en: "Emotional", zh: "感性型" },
      C: { en: "Calm", zh: "冷静型" },
    },
  },
];

const questions = [
  q("q01", "RP", "R", "I feel loved when someone creates a special moment just for us.", "当对方为我们打造一个特别的时刻时，我会感到被深深地爱着。"),
  q("q02", "RP", "P", "For me, daily reliability matters more than romantic surprises.", "对我来说，日常可靠比浪漫惊喜更重要。"),
  q("q03", "RP", "R", "Small romantic gestures can stay in my mind for a long time.", "一些小小的浪漫也能让我记住很久。"),
  q("q04", "RP", "P", "I care more about whether a relationship works in real life than whether it feels like a movie.", "在一段关系中，比起像电影一样的浪漫，我更在意在日常生活中是否合得来。"),
  q("q05", "RP", "R", "I like love to have a sense of magic or destiny.", "我想要爱情里有种命中注定的感觉。"),
  q("q06", "RP", "P", "A good match should first make sense in everyday life.", "一段合适的关系首先应该在日常生活中和谐。"),
  q("q07", "RP", "R", "I care about the emotional meaning behind gifts or messages.", "我很在意礼物或消息背后的情感意义。"),
  q("q08", "RP", "P", "I would rather have practical support than dramatic declarations of love.", "比起轰轰烈烈的表达爱意，我更想要细微的支持。"),
  q("q09", "RP", "R", "I enjoy little rituals in love, like anniversaries, songs, or meaningful places.", "我喜欢爱情里的小仪式感，比如纪念日、某首歌或有意义的地点。"),
  q("q10", "RP", "P", "Before getting deeply attached, I think about whether our lifestyles fit.", "在进展很深之前，我会考虑彼此的生活方式是否合适。"),
  q("q11", "SF", "S", "I feel safer when I know where a relationship is heading.", "当我清楚一段关系会走向哪里时，我会更有安全感。"),
  q("q12", "SF", "F", "I prefer relationships that leave enough room for personal freedom.", "我更喜欢能保留足够个人自由的一段关系。"),
  q("q13", "SF", "S", "Clear commitment makes love feel more comfortable to me.", "明确的承诺会让我在爱情里更安心。"),
  q("q14", "SF", "F", "I do not like feeling locked into a fixed relationship script too early.", "我不喜欢太早被固定的恋爱剧本框住。"),
  q("q15", "SF", "S", "Consistency matters a lot to me when I start caring about someone.", "当我开始在意一个人时，我会先关注双方观念是否一致。"),
  q("q16", "SF", "F", "I like love to develop naturally instead of being rushed into labels.", "我喜欢感情自然发展，而不是很快被关系标签催着走。"),
  q("q17", "SF", "S", "Unclear signals in a relationship make me uneasy.", "关系里模糊不清的信号会让我不安。"),
  q("q18", "SF", "F", "Even in love, I need space to keep my own rhythm.", "即使在恋爱里，我也需要空间保持自己的节奏。"),
  q("q19", "SF", "S", "I value loyalty and dependability more than constant excitement.", "比起不断的新鲜刺激，我更看重忠诚和可靠。"),
  q("q20", "SF", "F", "A relationship feels better when both people can still explore who they are.", "如果两个人仍然能探索自己的生活和可能性，这段关系会让我感觉更好。"),
  q("q21", "DI", "D", "When I like someone, I prefer making my feelings clear to them.", "面对喜欢的人时，我更倾向于把各种感受直接表达清楚。"),
  q("q22", "DI", "I", "I often show affection through small actions instead of direct words.", "我常常通过小行动表达喜欢，而不是直接说出口。"),
  q("q23", "DI", "D", "I would rather ask directly than keep guessing what someone means.", "比起一直猜对方什么意思，我宁愿直接问清楚。"),
  q("q24", "DI", "I", "I usually observe carefully before revealing how much I care.", "在表现出我有多在意之前，我通常会先仔细观察。"),
  q("q25", "DI", "D", "Honest conversations are the fastest way for me to feel close.", "坦诚的对话是让我快速拉近关系的方式。"),
  q("q26", "DI", "I", "I like when two people can understand each other without saying everything out loud.", "我喜欢两个人不用把所有话都说出口，也能互相明白。"),
  q("q27", "DI", "D", "If something bothers me in love, I prefer talking about it sooner rather than later.", "如果感情里有什么让我介意，我更倾向于早点说出来。"),
  q("q28", "DI", "I", "I sometimes need time before I can put my feelings into words.", "我有时需要一些时间，才能把自己的感受说清楚。"),
  q("q29", "DI", "D", "I appreciate clear answers, even when they are not exactly what I hoped for.", "即使答案可能不如我所愿，我也更想要清楚直接的回应。"),
  q("q30", "DI", "I", "I prefer expressing affection in ways that feel natural instead of announcing it directly.", "我更喜欢用自然的方式表达喜欢，而不是很直接地宣布出来。"),
  q("q31", "EC", "E", "My feelings become intense when I really care about someone.", "当我真的在意一个人时，我的情绪会变得很强烈。"),
  q("q32", "EC", "C", "I prefer staying calm before reacting to relationship problems.", "面对感情问题时，我更倾向于先冷静下来再回应。"),
  q("q33", "EC", "E", "Emotional honesty matters more to me than sounding perfectly reasonable.", "对我来说，情感上的真实比听起来完全理性更重要。"),
  q("q34", "EC", "C", "I usually need time to think before making emotional decisions.", "在做情感上的决定前，我通常需要时间思考。"),
  q("q35", "EC", "E", "I want love to feel emotionally alive, not just peaceful.", "我希望爱情是有不断的生命力的，而不只是平静地度过每一天。"),
  q("q36", "EC", "C", "I trust feelings more after they have stayed consistent for a while.", "当一种感觉持续稳定一段时间后，我才会更相信它。"),
  q("q37", "EC", "E", "I can be deeply affected by small changes in someone's tone or attention.", "对方语气或关注度的一点变化，都可能很影响我的感受。"),
  q("q38", "EC", "C", "In love, I try not to let temporary emotions decide everything.", "在爱情里，我会尽量不让一时的情绪决定一切。"),
  q("q39", "EC", "E", "I feel closest to someone when we can share feelings openly and deeply.", "当我们能坦率而深入地分享感受时，我会觉得最亲近。"),
  q("q40", "EC", "C", "A steady and peaceful bond is more attractive to me than emotional highs and lows.", "比起情绪的大起大落，稳定平和的连接更吸引我。"),
  q("q41", "RP", "R", "A thoughtful treat on a date can feel romantic even if it is not expensive.", "约会时一个用心的小花费，即使不贵，也会让我觉得很浪漫。"),
  q("q42", "RP", "P", "On dates, I care more about a spending style that fits real life than expensive romantic gestures.", "约会时，比起昂贵的浪漫表达，我更在意消费方式是否符合现实生活。"),
  q("q43", "SF", "S", "A clear understanding about dating costs makes a relationship feel safer to me.", "对于约会花费有清楚共识，会让我在关系里更有安全感。"),
  q("q44", "SF", "F", "I prefer dating costs to stay flexible instead of following one fixed rule every time.", "我更喜欢约会花费保持弹性，而不是每次都必须遵守固定规则。"),
  q("q45", "DI", "D", "I would rather talk openly about splitting costs than silently guess what is expected.", "比起默默猜测该不该 AA，我更愿意直接聊清楚约会花费怎么分。"),
  q("q46", "DI", "I", "When paying on dates, I prefer handling it naturally in the moment instead of discussing it directly.", "约会付款时，比起提前直接讨论，我更倾向于当下自然处理。"),
  q("q47", "EC", "E", "Small spending gestures can affect my feelings when they make me feel remembered or valued.", "如果一些小花费让我感觉被记得、被重视，它们会很影响我的感受。"),
  q("q48", "EC", "C", "I try not to judge someone's affection by how much money they spend on me.", "我会尽量不根据对方为我花了多少钱来判断对方有多喜欢我。"),
];

const resultBase = {
  RSDE: ["The Firehearted Loyalist", "炽热守护者", "All in, heart first.", "全心投入，真诚热烈。"],
  RSDC: ["The Gentle Anchor", "温柔锚点", "Soft love, steady heart.", "温柔相爱，稳定靠近。"],
  RSIE: ["The Secret Devotee", "隐秘深情者", "Quiet signs, deep feelings.", "表达很轻，感情很深。"],
  RSIC: ["The Quiet Keeper", "安静守护者", "Steady care, hidden softness.", "稳定守护，温柔藏心。"],
  RFDE: ["The Spark Chaser", "心动追光者", "Big feelings, open skies.", "热烈心动，自由奔赴。"],
  RFDC: ["The Moonlit Explorer", "月光探索者", "Romantic, clear, never caged.", "浪漫清醒，不被困住。"],
  RFIE: ["The Hidden Dreamer", "隐秘造梦者", "A universe behind quiet eyes.", "安静眼神里，藏着一整个宇宙。"],
  RFIC: ["The Soft Wanderer", "温柔游牧者", "Tender heart, open road.", "心很柔软，路要自由。"],
  PSDE: ["The Loyal Builder", "忠诚建造者", "Love is built, not guessed.", "爱不是猜出来的，是一起建起来的。"],
  PSDC: ["The Steady Realist", "稳定现实派", "Clear mind, steady love.", "清醒相爱，稳定同行。"],
  PSIE: ["The Careful Guardian", "谨慎守护者", "Quiet effort, serious heart.", "默默用心，认真守护。"],
  PSIC: ["The Silent Harbor", "沉静港湾", "Low-key, loyal, dependable.", "低调、忠诚、可靠。"],
  PFDE: ["The Bold Freeheart", "坦率自由者", "Clear feelings, open doors.", "表达清楚，边界自由。"],
  PFDC: ["The Clear-Eyed Nomad", "清醒游牧者", "Honest love, light hands.", "清醒地爱，轻盈地靠近。"],
  PFIE: ["The Lowkey Romantic", "低调心动者", "Practical outside, soft inside.", "外表清醒，内心柔软。"],
  PFIC: ["The Independent Minimalist", "独立极简者", "Simple love, wide space.", "简单相爱，保留空间。"],
};

const results = Object.fromEntries(Object.entries(resultBase).map(([code, base]) => [code, makeResult(code, base)]));

const state = {
  language: loadLanguage(),
  answers: loadJson(STORAGE_KEYS.answers, {}),
  currentQuestionIndex: loadNumber(STORAGE_KEYS.currentQuestionIndex, 0),
  completed: loadBoolean(STORAGE_KEYS.completed, false),
  started: loadBoolean(STORAGE_KEYS.started, false),
  selectedQuestionIds: loadJson(STORAGE_KEYS.selectedQuestionIds, []),
  screen: "cover",
  shareNote: "",
};

validateModel();
render();

function q(id, axis, positivePole, en, zh) {
  return { id, axis, positivePole, reverse: false, text: { en, zh } };
}

function getQuestionById(id) {
  return questions.find((question) => question.id === id);
}

function getTestQuestions() {
  if (!Array.isArray(state.selectedQuestionIds) || state.selectedQuestionIds.length !== 40) {
    state.selectedQuestionIds = recoverQuestionSet();
    saveJson(STORAGE_KEYS.selectedQuestionIds, state.selectedQuestionIds);
  }
  const selected = state.selectedQuestionIds.map(getQuestionById).filter(Boolean);
  const answeredIds = Object.keys(state.answers).filter((id) => getQuestionById(id));
  if (selected.length === 40 && answeredIds.length >= 40 && !selected.every((question) => question.id in state.answers)) {
    state.selectedQuestionIds = recoverQuestionSet();
    saveJson(STORAGE_KEYS.selectedQuestionIds, state.selectedQuestionIds);
    return state.selectedQuestionIds.map(getQuestionById).filter(Boolean);
  }
  if (selected.length !== 40) {
    state.selectedQuestionIds = recoverQuestionSet();
    saveJson(STORAGE_KEYS.selectedQuestionIds, state.selectedQuestionIds);
    return state.selectedQuestionIds.map(getQuestionById).filter(Boolean);
  }
  return selected;
}

function recoverQuestionSet() {
  const answeredIds = Object.keys(state.answers).filter((id) => getQuestionById(id));
  if (answeredIds.length > 0 || state.currentQuestionIndex > 0) {
    return questions.slice(0, 40).map((question) => question.id);
  }
  return buildQuestionSet();
}

function buildQuestionSet() {
  const selected = [];
  for (const axis of axes) {
    for (const pole of axis.poles) {
      const candidates = questions.filter((question) => question.axis === axis.id && question.positivePole === pole);
      selected.push(...shuffle(candidates).slice(0, 5).map((question) => question.id));
    }
  }
  return shuffle(selected);
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function makeResult(code, [enName, zhName, enTagline, zhTagline]) {
  const traits = describeCode(code);
  return {
    code,
    name: { en: enName, zh: zhName },
    tagline: { en: enTagline, zh: zhTagline },
    summary: {
      en: `You bring a ${traits.en.join(", ")} style to love. Your type shows how you seek connection, handle closeness, and keep your heart feeling true to itself.`,
      zh: `你的恋爱方式带着${traits.zh.join("、")}的特点，也影响着你靠近他人、经营亲密关系，以及表达真实自我的方式。`,
    },
    strengths: {
      en: strengthLines(code, "en"),
      zh: strengthLines(code, "zh"),
    },
    blindSpots: {
      en: blindSpotLines(code, "en"),
      zh: blindSpotLines(code, "zh"),
    },
    communicationStyle: {
      en: communicationLine(code, "en"),
      zh: communicationLine(code, "zh"),
    },
    conflictStyle: {
      en: conflictLine(code, "en"),
      zh: conflictLine(code, "zh"),
    },
    idealDynamic: {
      en: idealLine(code, "en"),
      zh: idealLine(code, "zh"),
    },
    compatibilityNotes: {
      en: compatibilityLine(code, "en"),
      zh: compatibilityLine(code, "zh"),
    },
  };
}

function describeCode(code) {
  const en = [];
  const zh = [];
  const map = {
    R: ["romantic", "浪漫"],
    P: ["practical", "现实"],
    S: ["stable", "稳定"],
    F: ["freedom-loving", "自由"],
    D: ["direct", "直接"],
    I: ["subtle", "含蓄"],
    E: ["emotionally expressive", "感性"],
    C: ["calm", "冷静"],
  };
  for (const letter of code) {
    en.push(map[letter][0]);
    zh.push(map[letter][1]);
  }
  return { en, zh };
}

function strengthLines(code, lang) {
  const lines = {
    R: {
      en: "You bring romance and meaning into a relationship, helping love feel like more than routine and creating moments worth remembering.",
      zh: "你能为关系注入浪漫感和意义感，让爱不只是日常相处，也有值得记住的时刻。",
    },
    P: {
      en: "You keep love connected to real life, offering practical support and long-term effort that make the relationship easier to trust.",
      zh: "你能把爱落到真实生活里，用实际支持和长期配合让关系更稳、更可信。",
    },
    S: {
      en: "You value steadiness, commitment, and dependable presence, bringing a strong sense of safety into closeness.",
      zh: "你重视稳定、承诺和可依赖的陪伴，能给亲密关系带来踏实的安全感。",
    },
    F: {
      en: "You respect each person's space and rhythm, helping love stay close without losing the freedom to breathe.",
      zh: "你尊重彼此的空间和节奏，让关系在靠近之外也保有自由呼吸的余地。",
    },
    D: {
      en: "You are willing to name important feelings clearly, giving the relationship less guessing and more honest response.",
      zh: "你愿意把重要感受说清楚，让关系少一点猜测，多一点坦诚而及时的回应。",
    },
    I: {
      en: "You show care through details, actions, and quiet understanding, making affection feel natural, subtle, and deeply felt.",
      zh: "你擅长用细节、行动和默契表达在意，让关心显得自然、含蓄，也更耐人寻味。",
    },
    E: {
      en: "You enter love with emotional depth and sincerity, bringing warmth, aliveness, and a strong sense of being truly present.",
      zh: "你带着真诚的情绪深度进入关系，能让爱变得有温度、有生命力，也更真实。",
    },
    C: {
      en: "You can keep proportion through emotional ups and downs, giving the relationship more balance, patience, and calm.",
      zh: "你能在情绪起伏中保持冷静和分寸，让关系多一份平衡、耐心与安定。",
    },
  };
  return [lines[code[0]][lang], lines[code[1]][lang], lines[code[2]][lang], lines[code[3]][lang]];
}

function blindSpotLines(code, lang) {
  const lines = {
    R: {
      en: "You may expect love to keep feeling special in everyday life. Quiet phases may make you feel disappointed more easily.",
      zh: "你可能会期待爱情在日常里也持续保持特别感。平淡阶段可能会让你更容易感到失落。",
    },
    P: {
      en: "You may underestimate how much romance, emotional expression, or small rituals mean to the other person.",
      zh: "你可能会低估浪漫氛围、情绪表达或小仪式对对方的意义。",
    },
    S: {
      en: "Unclear pacing, vague commitment, or inconsistent response may unsettle you more than you show.",
      zh: "关系节奏模糊、承诺不清或回应不稳定时，你可能会比表面看起来更不安。",
    },
    F: {
      en: "When a relationship begins to carry responsibility, expectation, or fixed structure, you may instinctively feel pressured.",
      zh: "关系开始带来责任、期待或固定形式时，你可能会本能地感到压力。",
    },
    D: {
      en: "Your directness may feel overwhelming if it comes too quickly or strongly.",
      zh: "你的直接如果太快太满，可能会让对方感到被逼近。",
    },
    I: {
      en: "If you express too little, the other person may struggle to read your real feelings.",
      zh: "你如果表达得太少，对方可能很难确认你的真实心意。",
    },
    E: {
      en: "Small changes in tone, distance, or response may become much larger feelings inside you.",
      zh: "小小的语气、距离或回应变化，可能会在你心里被放大成更强烈的感受。",
    },
    C: {
      en: "Your calm may be mistaken for coldness, distance, or lack of investment.",
      zh: "你的冷静可能会被误解成冷淡、疏离或不够投入。",
    },
  };
  return [lines[code[0]][lang], lines[code[1]][lang], lines[code[2]][lang], lines[code[3]][lang]];
}

function communicationLine(code, lang) {
  if (lang === "zh") {
    return code.includes("D")
      ? "你更习惯把重要感受说清楚，也希望对方能给出明确回应。这样的沟通方式能减少误会，让关系更快进入真实的交流；只是当话题敏感时，放慢一点语气和节奏，会让你的坦诚更容易被接住。"
      : "你常通过行动、细节和时机表达在意，而不是马上把所有感受说出口。这样的沟通方式很细腻，也能让关系保留自然的余地；只是当对方需要确认时，适当说出你的心意，会让你的温柔更容易被理解。";
  }
  return code.includes("D")
    ? "You tend to name important feelings clearly, and you usually appreciate a direct response in return. This helps reduce confusion and brings the relationship into honest conversation more quickly; when the topic is sensitive, a softer pace can make your clarity easier to receive."
    : "You often express care through actions, details, and timing rather than saying everything directly. This gives your communication subtlety and naturalness; when the other person needs reassurance, putting some feelings into words can make your tenderness easier to understand.";
}

function conflictLine(code, lang) {
  if (lang === "zh") {
    return code.includes("E")
      ? "冲突中，你通常会很快感受到情绪的变化，也容易捕捉到关系里细微的不对劲。你的情绪往往不只是情绪本身，它也可能在提醒你：自己需要被理解、被重视，或需要更清楚的回应。把这份需求说出来，会比只让情绪往前冲更容易带来真正的沟通。"
      : "冲突中，你倾向先冷静下来、整理思路，再决定如何回应。这样的方式能避免关系被一时情绪推着走；只是对方可能需要知道，你的安静是在消化问题，而不是考虑退出关系。";
  }
  return code.includes("E")
    ? "In conflict, you may feel emotional shifts quickly and notice subtle changes in the relationship. Your feelings are often not only feelings; they may also be pointing to a need to feel understood, valued, or more clearly responded to. Naming that need can create real communication more effectively than letting emotion move forward on its own."
    : "In conflict, you tend to cool down, organize your thoughts, and respond after you have more clarity. This can keep the relationship from being driven by temporary emotion; the other person may still need to know that your quietness means you are processing, not leaving.";
}

function idealLine(code, lang) {
  if (lang === "zh") {
    return code.includes("F")
      ? "你更适合一种有空间感的亲密关系：两个人可以真实靠近，也能保留各自的节奏、兴趣和生活边界。你理想中的爱不是互相困住，而是在自由里仍然愿意选择彼此；你也需要留意，自己想要的空间是否有时变成了回避问题的方式。"
      : "你更适合一种稳定、清楚、可依赖的关系状态。你会在持续的回应、可靠的行动和逐渐建立的信任里感到安心；对你来说，爱不只是心动，也是一种愿意一起走下去的确定感。只是当你太想确认关系方向时，也要留意自己是否把安全感变成了控制感。";
  }
  return code.includes("F")
    ? "You thrive in a relationship with room to breathe: both people can be genuinely close while keeping their own rhythm, interests, and boundaries. Your ideal love does not trap either person; it allows both of you to keep choosing each other freely. It is also worth noticing whether your need for space sometimes becomes a way to avoid problem."
    : "You thrive in a relationship that feels steady, clear, and dependable. Consistent response, reliable action, and gradually built trust help you feel safe; for you, love is not only attraction, but also the sense that both people are willing to keep walking together. When you strongly need certainty, it is worth noticing whether your search for safety is turning into control.";
}

function compatibilityLine(code, lang) {
  if (lang === "zh") {
    return code.includes("R")
      ? "你通常更容易被能理解情感意义、珍惜仪式感、愿意回应浪漫的人打动。和更现实或慢热的人相处时，你们可能需要给彼此一点理解时间：你看重的是爱的温度，对方看重的可能是爱的稳定落地。"
      : "你通常更适合重视现实配合、边界感和长期稳定的人。和更浪漫或情绪强烈的人相处时，你们可能需要理解彼此表达爱的方式不同：你在意关系能不能走得稳，对方可能更在意关系有没有被认真感受。";
  }
  return code.includes("R")
    ? "You are often drawn to people who understand emotional meaning, value small rituals, and respond to romance. With someone more practical or slow-warming, you may need a little translation space: you may look for the warmth of love, while they may show love through steadiness and real-life effort."
    : "You often match well with people who value real-life fit, boundaries, and long-term steadiness. With someone more romantic or emotionally intense, it may help to remember that you express love differently: you may focus on whether the relationship can work, while they may focus on whether the relationship feels deeply felt.";
}

function scoreLvti() {
  const axisScores = { RP: 0, SF: 0, DI: 0, EC: 0 };
  for (const question of getTestQuestions()) {
    if (!(question.id in state.answers)) continue;
    let contribution = Number(state.answers[question.id]);
    if (question.reverse) contribution *= -1;
    axisScores[question.axis] += question.positivePole === AXIS_POSITIVE_POLE[question.axis] ? contribution : -contribution;
  }
  const axisPoles = {
    RP: axisScores.RP >= 0 ? "R" : "P",
    SF: axisScores.SF >= 0 ? "S" : "F",
    DI: axisScores.DI >= 0 ? "D" : "I",
    EC: axisScores.EC >= 0 ? "E" : "C",
  };
  const typeCode = axisPoles.RP + axisPoles.SF + axisPoles.DI + axisPoles.EC;
  return {
    typeCode,
    axisScores,
    axisPoles,
    axisPercentages: calculateAxisPercentages(axisScores),
    confidence: Object.fromEntries(Object.entries(axisScores).map(([axis, score]) => [axis, confidenceLabel(score)])),
  };
}

function calculateAxisPercentages(axisScores) {
  return Object.fromEntries(axes.map((axis) => {
    const questionCount = getTestQuestions().filter((question) => question.axis === axis.id).length;
    const maxScore = Math.max(1, questionCount * 2);
    const positive = Math.round(((axisScores[axis.id] + maxScore) / (maxScore * 2)) * 100);
    return [axis.id, {
      [AXIS_POSITIVE_POLE[axis.id]]: clamp(positive, 0, 100),
      [AXIS_NEGATIVE_POLE[axis.id]]: 100 - clamp(positive, 0, 100),
    }];
  }));
}

function confidenceLabel(score) {
  const strength = Math.abs(score);
  if (strength <= 4) return "slight";
  if (strength <= 10) return "clear";
  return "strong";
}

function render() {
  const app = document.getElementById("app");
  app.innerHTML = `<div class="page">${topbar()}${mainContent()}</div>`;
  bindEvents();
}

function topbar() {
  return `
    <div class="topbar">
      <div class="brand">
        <h1 class="brand-title">LVTI</h1>
        <span class="brand-subtitle">${t("subtitle")}</span>
      </div>
      <label class="language-picker">
        <span>${state.language === "zh" ? "语言" : "Language"}</span>
        <select data-language-select aria-label="Language">
          <option value="en" ${state.language === "en" ? "selected" : ""}>English</option>
          <option value="zh" ${state.language === "zh" ? "selected" : ""}>中文</option>
        </select>
      </label>
    </div>
  `;
}

function mainContent() {
  if (state.screen === "result" && state.completed && completedAll()) return resultScreen();
  if (state.screen === "test") return testScreen();
  return startScreen();
}

function startScreen() {
  const hasProgress = !state.completed && (Object.keys(state.answers).length > 0 || state.currentQuestionIndex > 0);
  const actionText = hasProgress ? t("continue") : t("start");
  return `
    <section class="hero">
      <div class="hero-copy">
        <span class="hero-kicker">${t("subtitle")}</span>
        <h1>LVTI</h1>
        <h2>${t("description")}</h2>
        <p>${t("intro")}</p>
        <div class="hero-actions">
          <button type="button" class="primary-button" data-action="start">${actionText}</button>
          ${hasProgress ? `<button type="button" class="ghost-button" data-action="reset">${t("reset")}</button>` : ""}
        </div>
        <span class="disclaimer">${t("disclaimer")}</span>
      </div>
      <aside class="cover-panel" aria-label="${t("coverAxesTitle")}">
        <div class="cover-meta">
          ${t("coverMeta").map((item) => `<span>${item}</span>`).join("")}
        </div>
        <h3>${t("coverAxesTitle")}</h3>
        <div class="cover-axis-list">
          ${t("coverAxes").map((item, index) => `
            <div class="cover-axis-item">
              <span>0${index + 1}</span>
              <strong>${item}</strong>
            </div>
          `).join("")}
        </div>
      </div>
      </aside>
    </section>
  `;
}

function testScreen() {
  const testQuestions = getTestQuestions();
  const index = clamp(state.currentQuestionIndex, 0, testQuestions.length - 1);
  state.currentQuestionIndex = index;
  const question = testQuestions[index];
  const selected = state.answers[question.id];
  const progress = Math.round((testQuestions.filter((item) => item.id in state.answers).length / testQuestions.length) * 100);
  return `
    <section>
      <div class="progress-meta">
        <span>${t("question")} ${index + 1} ${state.language === "en" ? t("of") : ""} ${testQuestions.length}</span>
        <span>${progress}%</span>
      </div>
      <div class="progress-track" aria-hidden="true"><div class="progress-fill" style="width:${progress}%"></div></div>
      <div class="question-panel">
        <h2 class="question-text">${question.text[state.language]}</h2>
        <div class="answer-list">
          ${[-2, -1, 0, 1, 2].map((value, i) => `
            <button type="button" class="answer-button ${selected === value ? "selected" : ""}" data-answer="${value}">
              ${uiText[state.language].scale[i]}
            </button>
          `).join("")}
        </div>
      </div>
      <div class="test-actions">
        <button type="button" class="ghost-button" data-action="back" ${index === 0 ? "disabled" : ""}>${t("back")}</button>
        <button type="button" class="primary-button" data-action="next" ${selected === undefined ? "disabled" : ""}>
          ${index === testQuestions.length - 1 ? t("seeType") : t("next")}
        </button>
      </div>
    </section>
  `;
}

function resultScreen() {
  const score = scoreLvti();
  const result = results[score.typeCode];
  return `
    <section>
      <div class="result-header">
        <p class="result-code">${result.code}</p>
        <h2 class="result-name">${result.name[state.language]}</h2>
        <p class="tagline">${result.tagline[state.language]}</p>
        <p class="summary">${result.summary[state.language]}</p>
        <h3>${t("axisBreakdown")}</h3>
        <div class="axis-grid">
          ${axes.map((axis) => {
            const pole = score.axisPoles[axis.id];
            const positivePole = AXIS_POSITIVE_POLE[axis.id];
            const negativePole = AXIS_NEGATIVE_POLE[axis.id];
            const positivePercent = score.axisPercentages[axis.id][positivePole];
            const negativePercent = score.axisPercentages[axis.id][negativePole];
            return `<div class="axis-item" style="background:${AXIS_COLORS[axis.id]}">
              <strong>${axis.labels[pole][state.language]}</strong>
              <span>${t(score.confidence[axis.id])}</span>
              <div class="axis-percent-row">
                <span>${axis.labels[positivePole][state.language]} ${positivePercent}%</span>
                <span>${axis.labels[negativePole][state.language]} ${negativePercent}%</span>
              </div>
              <div class="axis-percent-track" aria-hidden="true">
                <div class="axis-percent-fill" style="width:${positivePercent}%"></div>
              </div>
            </div>`;
          }).join("")}
        </div>
      </div>
      ${section(t("strengths"), list(result.strengths[state.language]))}
      ${section(t("blindSpots"), list(result.blindSpots[state.language]))}
      ${section(t("compatibilityNotes"), `<p>${result.compatibilityNotes[state.language]}</p>`)}
      ${section(t("idealDynamic"), `<p>${result.idealDynamic[state.language]}</p>`)}
      ${section(t("communicationStyle"), `<p>${result.communicationStyle[state.language]}</p>`)}
      ${section(t("conflictStyle"), `<p>${result.conflictStyle[state.language]}</p>`)}
      <div class="result-actions">
        <button type="button" class="share-button primary-button" data-action="share">${t("share")}</button>
        <button type="button" class="ghost-button" data-action="retake">${t("retake")}</button>
      </div>
      <p class="share-note">${state.shareNote}</p>
    </section>
  `;
}

function section(title, content) {
  return `<section class="result-section"><h3>${title}</h3>${content}</section>`;
}

function list(items) {
  return `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
}

function bindEvents() {
  document.querySelectorAll("[data-language-select]").forEach((select) => {
    select.addEventListener("change", () => {
      state.language = select.value;
      localStorage.setItem(STORAGE_KEYS.language, state.language);
      state.shareNote = "";
      render();
    });
  });
  document.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      const question = getTestQuestions()[state.currentQuestionIndex];
      state.answers[question.id] = Number(button.dataset.answer);
      saveJson(STORAGE_KEYS.answers, state.answers);
      render();
    });
  });
  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => handleAction(button.dataset.action));
  });
}

function handleAction(action) {
  if (action === "start") {
    const hasProgress = Object.keys(state.answers).length > 0 || state.currentQuestionIndex > 0;
    if (state.completed) {
      state.answers = {};
      state.selectedQuestionIds = buildQuestionSet();
      localStorage.removeItem(STORAGE_KEYS.answers);
      saveJson(STORAGE_KEYS.selectedQuestionIds, state.selectedQuestionIds);
    }
    if (!hasProgress && !state.completed) {
      state.selectedQuestionIds = buildQuestionSet();
      saveJson(STORAGE_KEYS.selectedQuestionIds, state.selectedQuestionIds);
    }
    state.currentQuestionIndex = hasProgress && !state.completed ? state.currentQuestionIndex : 0;
    state.completed = false;
    state.started = true;
    state.screen = "test";
  }
  if (action === "back") {
    state.currentQuestionIndex = Math.max(0, state.currentQuestionIndex - 1);
  }
  if (action === "next") {
    const testQuestions = getTestQuestions();
    if (state.currentQuestionIndex === testQuestions.length - 1) {
      state.completed = completedAll();
      if (state.completed) state.screen = "result";
      if (!state.completed) state.currentQuestionIndex = firstUnansweredIndex(testQuestions);
    } else {
      state.currentQuestionIndex += 1;
    }
  }
  if (action === "retake" || action === "reset") {
    state.answers = {};
    state.currentQuestionIndex = 0;
    state.completed = false;
    state.started = true;
    state.selectedQuestionIds = buildQuestionSet();
    state.screen = "test";
    state.shareNote = "";
    localStorage.removeItem(STORAGE_KEYS.answers);
    saveJson(STORAGE_KEYS.selectedQuestionIds, state.selectedQuestionIds);
  }
  if (action === "share") {
    shareResult();
    return;
  }
  localStorage.setItem(STORAGE_KEYS.currentQuestionIndex, String(state.currentQuestionIndex));
  localStorage.setItem(STORAGE_KEYS.completed, String(state.completed));
  localStorage.setItem(STORAGE_KEYS.started, String(state.started));
  render();
}

async function shareResult() {
  const score = scoreLvti();
  const result = results[score.typeCode];
  const text = `${t("sharePrefix")} ${result.code} - ${result.name[state.language]} ${t("shareMiddle")}\n${result.tagline[state.language]}\n${t("shareSuffix")} ${location.href}`;
  try {
    if (navigator.share) {
      await navigator.share({ title: "LVTI", text, url: location.href });
      return;
    }
    await navigator.clipboard.writeText(text);
    state.shareNote = t("copied");
  } catch {
    state.shareNote = t("copyFailed");
  }
  render();
}

function completedAll() {
  return getTestQuestions().every((question) => question.id in state.answers);
}

function firstUnansweredIndex(testQuestions = getTestQuestions()) {
  const index = testQuestions.findIndex((question) => !(question.id in state.answers));
  return index === -1 ? testQuestions.length - 1 : index;
}

function t(key) {
  return uiText[state.language][key] || key;
}

function loadLanguage() {
  const stored = localStorage.getItem(STORAGE_KEYS.language);
  return LANGUAGES.includes(stored) ? stored : "en";
}

function loadJson(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value && typeof value === "object" ? value : fallback;
  } catch {
    return fallback;
  }
}

function saveJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadNumber(key, fallback) {
  const value = Number(localStorage.getItem(key));
  return Number.isFinite(value) ? value : fallback;
}

function loadBoolean(key, fallback) {
  const value = localStorage.getItem(key);
  if (value === "true") return true;
  if (value === "false") return false;
  return fallback;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function validateModel() {
  const errors = [];
  if (questions.length < 40) errors.push("Expected at least 40 questions in the question bank.");
  for (const axis of axes) {
    const axisQuestions = questions.filter((question) => question.axis === axis.id);
    if (axisQuestions.length < 10) errors.push(`${axis.id} should have at least 10 questions.`);
    for (const pole of axis.poles) {
      const count = axisQuestions.filter((question) => question.positivePole === pole).length;
      if (count < 5) errors.push(`${axis.id}/${pole} should have at least 5 questions.`);
    }
  }
  const ids = new Set(questions.map((question) => question.id));
  if (ids.size !== questions.length) errors.push("Question ids must be unique.");
  const expectedCodes = ["R", "P"].flatMap((a) => ["S", "F"].flatMap((b) => ["D", "I"].flatMap((c) => ["E", "C"].map((d) => a + b + c + d))));
  for (const code of expectedCodes) {
    if (!results[code]) errors.push(`Missing result ${code}.`);
  }
  if (errors.length) console.error("LVTI model validation failed:", errors);
}
