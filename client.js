const categories = [
  { id: "hot", name: "热门新梗", desc: "近期讨论度高、跨平台传播快的网络表达。" },
  { id: "classic", name: "常青老梗", desc: "流传时间较久，仍然经常被使用的梗。" },
  { id: "irony", name: "阴阳怪气", desc: "语气含蓄、反讽或带一点冒犯风险的表达。" },
  { id: "emotion", name: "情绪表达", desc: "用于表达崩溃、开心、无语、委屈等状态。" },
  { id: "abstract", name: "抽象整活", desc: "语义跳跃、偏玩梗和二创语境的表达。" },
  { id: "abbr", name: "谐音缩写", desc: "拼音、英文、数字、谐音混合形成的缩写。" },
  { id: "entertainment", name: "饭圈娱乐", desc: "综艺、影视、直播、偶像和粉圈语境常见表达。" },
  { id: "workplace", name: "职场社交", desc: "工作沟通、同事互动里容易遇到的网络化表达。" }
];

const seedTerms = [
  {
    term: "电子榨菜",
    slug: "dian-zi-zha-cai",
    aliases: ["下饭视频", "精神榨菜"],
    category: "classic",
    one_liner: "指不太费脑、适合吃饭或放松时看的视频、综艺、直播等内容。",
    detailed_explanation:
      "这个词把线上娱乐内容比作吃饭时配的小菜，重点不是营养密度，而是陪伴感和轻松感。它通常是调侃或自嘲，不一定是贬义。",
    tone: "轻松调侃 / 自嘲 / 中性解释",
    origin: "常见于短视频、弹幕和社交平台，来源存在多种说法，以下为常见解释。",
    usage_scenarios: ["朋友聊天", "评论区调侃", "描述下饭视频"],
    avoid_scenarios: ["正式工作汇报", "严肃内容评价"],
    examples: [
      "这个综艺太适合吃饭时看了，简直是我的电子榨菜。",
      "我不想动脑，就想刷点电子榨菜。",
      "这类视频没什么负担，但确实下饭。"
    ],
    reply_templates: {
      normal: "懂了，就是适合放松时看的内容。",
      humorous: "懂，精神米饭必须配电子榨菜。",
      sarcastic: "怪不得越看越饿，原来是在配菜。"
    },
    similar_terms: ["下饭视频", "精神零食", "赛博泡面"],
    notes: "通常无明显攻击性，但不适合正式场合。",
    seo_title: "电子榨菜是什么意思？电子榨菜梗解释、来源和用法",
    seo_description: "解释电子榨菜的含义、语气、来源、使用场景和例句。"
  },
  {
    term: "显眼包",
    slug: "xian-yan-bao",
    aliases: ["很会整活的人"],
    category: "hot",
    one_liner: "形容一个人特别吸睛、爱表现、存在感很强，通常带玩笑意味。",
    detailed_explanation:
      "显眼包可以是夸人有综艺感，也可以是调侃人太抢镜。语气取决于关系和上下文，熟人之间多为玩笑。",
    tone: "调侃 / 亲昵称呼 / 轻微吐槽",
    origin: "在短视频、综艺评论和社交平台传播较广。",
    usage_scenarios: ["朋友整活", "评论区评价", "形容舞台表现"],
    avoid_scenarios: ["不熟的人", "严肃评价", "对方介意被调侃时"],
    examples: ["他一出场就开始整活，真是显眼包。", "这个显眼包怎么又站到镜头中间了。"],
    reply_templates: {
      normal: "就是存在感很强、很吸睛的意思。",
      humorous: "没办法，他自带聚光灯。",
      sarcastic: "主角光环先借他戴一会儿。"
    },
    similar_terms: ["社牛", "整活", "气氛组"],
    notes: "对不熟的人使用可能显得冒犯。",
    seo_title: "显眼包是什么意思？显眼包是什么梗",
    seo_description: "解释显眼包的含义、语气和使用场景。"
  },
  {
    term: "难评",
    slug: "nan-ping",
    aliases: ["不好评价", "一言难尽"],
    category: "emotion",
    one_liner: "表示事情复杂、离谱或尴尬到不知道怎么评价。",
    detailed_explanation:
      "难评常用于看到争议内容、迷惑行为或不好直接表态的场景。它是一种留白式表达，既能表达无语，也能避免说得太重。",
    tone: "无语 / 克制吐槽 / 中性偏负面",
    origin: "从评论区高频表达扩散，现已成为常见网络用语。",
    usage_scenarios: ["看见离谱事件", "不想直接骂", "朋友聊天"],
    avoid_scenarios: ["需要明确反馈的工作场景", "对方期待严肃建议时"],
    examples: ["这个处理方式真的难评。", "看完只有两个字：难评。"],
    reply_templates: {
      normal: "就是一言难尽、不好评价的意思。",
      humorous: "评价系统正在加载失败。",
      sarcastic: "不评价，是我最后的礼貌。"
    },
    similar_terms: ["一言难尽", "无语", "离谱"],
    notes: "容易被理解为负面态度，正式沟通中建议换成具体意见。",
    seo_title: "难评是什么意思？难评梗解释和用法",
    seo_description: "解释难评的含义、语气、例句和回复模板。"
  },
  {
    term: "尊嘟假嘟",
    slug: "zun-du-jia-du",
    aliases: ["真的假的", "真嘟假嘟"],
    category: "abbr",
    one_liner: "是“真的假的”的可爱谐音表达，常用于卖萌、惊讶或轻松追问。",
    detailed_explanation:
      "尊嘟假嘟把普通疑问变得更软萌，适合轻松聊天。它有明显网络语气，过度使用可能显得刻意。",
    tone: "可爱 / 玩笑 / 轻松追问",
    origin: "来自谐音表达和短视频评论区传播。",
    usage_scenarios: ["朋友聊天", "轻松追问", "玩梗互动"],
    avoid_scenarios: ["正式沟通", "严肃追责", "不熟关系"],
    examples: ["你居然抢到了票？尊嘟假嘟？", "尊嘟假嘟，我有点不信。"],
    reply_templates: {
      normal: "就是在问真的假的。",
      humorous: "尊嘟，比奶茶还真。",
      sarcastic: "假嘟，但你可以先信三秒。"
    },
    similar_terms: ["真的假的", "真嘟假嘟", "我不信"],
    notes: "适合轻松语境，不适合严肃场合。",
    seo_title: "尊嘟假嘟是什么意思？尊嘟假嘟是什么梗",
    seo_description: "解释尊嘟假嘟的含义、来源、语气和用法。"
  },
  {
    term: "CPU你",
    slug: "cpu-ni",
    aliases: ["pua你", "精神控制你"],
    category: "irony",
    one_liner: "网络语境里常指用话术影响、带偏或操控对方想法。",
    detailed_explanation:
      "CPU你是对“PUA”等说法的戏谑化变体，多用于调侃被人绕进去、被话术拿捏。它可能触及不舒服的关系语境，使用时要注意分寸。",
    tone: "调侃 / 警惕 / 轻度阴阳怪气",
    origin: "由网络谐音和情感话题传播形成。",
    usage_scenarios: ["朋友调侃", "提醒别被话术带偏", "评论区吐槽"],
    avoid_scenarios: ["严肃心理问题", "指控他人操控时缺乏证据", "攻击性争吵"],
    examples: ["你别CPU我，我差点就信了。", "这套话术有点会CPU人。"],
    reply_templates: {
      normal: "意思是别用话术带偏我。",
      humorous: "我的处理器拒绝运行这段话术。",
      sarcastic: "谢谢，系统检测到精神控制插件。"
    },
    similar_terms: ["PUA", "拿捏", "洗脑"],
    notes: "涉及真实关系伤害时，不建议只用玩梗代替严肃表达。",
    seo_title: "CPU你是什么意思？CPU你梗解释和用法",
    seo_description: "解释CPU你的网络含义、语气风险和使用场景。"
  },
  {
    term: "破防",
    slug: "po-fang",
    aliases: ["绷不住", "被戳中"],
    category: "emotion",
    one_liner: "指情绪防线被击穿，可能是感动、崩溃、委屈或生气。",
    detailed_explanation:
      "破防原本带有游戏语境，后来泛指情绪被触动。它既可以用于正向感动，也可以用于负面崩溃。",
    tone: "情绪强烈 / 自嘲 / 共情",
    origin: "从游戏和弹幕语境扩散到日常网络表达。",
    usage_scenarios: ["被故事感动", "被现实戳中", "表达绷不住"],
    avoid_scenarios: ["需要冷静讨论事实时", "对他人痛苦轻佻玩梗"],
    examples: ["看到这里我真的破防了。", "这句话太真实，直接破防。"],
    reply_templates: {
      normal: "就是情绪被戳中了。",
      humorous: "防线掉线，正在重连。",
      sarcastic: "很好，今天的情绪稳定到此结束。"
    },
    similar_terms: ["绷不住", "泪目", "被戳中"],
    notes: "具体含义要看上下文。",
    seo_title: "破防是什么意思？破防梗解释和例句",
    seo_description: "解释破防的含义、来源、语气和常见用法。"
  }
];

const storeKey = "meme_dictionary_terms_v1";
const cacheKey = "meme_dictionary_cache_v1";
const statsKey = "meme_dictionary_stats_v1";
const app = document.querySelector("#app");
let cloudTerms = [];
let trendingTerms = [];

function loadTerms() {
  const saved = JSON.parse(localStorage.getItem(storeKey) || "[]");
  const bySlug = new Map([...seedTerms, ...saved, ...cloudTerms].map((term) => [term.slug, term]));
  return [...bySlug.values()];
}

function saveCustomTerm(term) {
  const saved = JSON.parse(localStorage.getItem(storeKey) || "[]");
  const next = saved.filter((item) => item.slug !== term.slug);
  next.push(term);
  localStorage.setItem(storeKey, JSON.stringify(next));
}

function getStats() {
  return JSON.parse(localStorage.getItem(statsKey) || "{}");
}

function setStats(stats) {
  localStorage.setItem(statsKey, JSON.stringify(stats));
}

function slugify(text) {
  const ascii = text
    .trim()
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return encodeURIComponent(ascii || Date.now().toString());
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function findTerm(query) {
  const key = query.trim().toLowerCase();
  return loadTerms().find((term) => {
    const names = [term.term, term.slug, ...(term.aliases || [])].map((item) =>
      String(item).toLowerCase()
    );
    return names.includes(key);
  });
}

function fallbackTerm(rawTerm) {
  const clean = rawTerm.trim();
  return {
    term: clean,
    slug: slugify(clean),
    aliases: [],
    category: "hot",
    temporary: true,
    one_liner: `${clean} 暂未收录为正式词条，且当前 LLM 服务不可用。`,
    detailed_explanation:
      "这个表达可能存在多种理解，具体含义需要结合上下文判断。请配置后端 API Key 后重试，以获得模型生成的结构化解释。",
    tone: "不确定 / 需要结合语境 / 中性解释",
    origin: "来源暂不确定，可能来自评论区、短视频、弹幕或圈层二创。",
    usage_scenarios: ["朋友聊天", "评论区理解", "需要快速判断语气时"],
    avoid_scenarios: ["正式场合", "不了解上下文时直接使用", "可能冒犯对方时"],
    examples: [
      `有人说“${clean}”时，可以先看前后文判断是在调侃还是认真表达。`,
      `如果不确定，可以直接问：你这里说的“${clean}”是哪个意思？`
    ],
    reply_templates: {
      normal: "我大概懂你的意思了，不过这个词可能要看上下文。",
      humorous: "先别急着跟风，让上下文先说话。",
      sarcastic: "这个解释暂时没有装作全知模式。"
    },
    similar_terms: ["一言难尽", "抽象", "难评"],
    notes: "这是服务不可用时的降级解释，不会当作正式词条。",
    seo_title: `${clean}是什么意思？${clean}网络用语解释`,
    seo_description: `查询${clean}的含义、语气、用法和回复模板。`
  };
}

function recordQuery(query, hitType) {
  const stats = getStats();
  const key = query.trim();
  stats[key] = stats[key] || { count: 0, likes: 0, dislikes: 0, copies: 0, shares: 0, hitType };
  stats[key].count += 1;
  stats[key].hitType = hitType;
  setStats(stats);
}

function getCachedTerm(query) {
  const cache = JSON.parse(localStorage.getItem(cacheKey) || "{}");
  return cache[query.trim()];
}

function setCachedTerm(query, term) {
  const cache = JSON.parse(localStorage.getItem(cacheKey) || "{}");
  cache[query.trim()] = term;
  localStorage.setItem(cacheKey, JSON.stringify(cache));
}

function sortTermsForList(terms) {
  return [...terms].sort(
    (a, b) =>
      Number(b.queryCount || 0) - Number(a.queryCount || 0) ||
      new Date(b.lastQueriedAt || 0) - new Date(a.lastQueriedAt || 0)
  );
}

function termTags(term, max = 3) {
  return Array.isArray(term.tags) ? term.tags.filter(Boolean).slice(0, max) : [];
}

function cardMeta(term) {
  const tags = termTags(term, 3).map((tag) => `<span class="miniTag">${escapeHtml(tag)}</span>`).join("");
  const heat = term.queryCount ? `<span class="miniTag">查询 ${Number(term.queryCount)}</span>` : "";
  return tags || heat ? `<div class="cardMeta">${tags}${heat}</div>` : "";
}

async function loadCloudTerms(category = "", limit = 24) {
  const params = new URLSearchParams({ limit: String(limit) });
  if (category) {
    params.set("category", category);
  }
  const response = await fetch(`/api/terms?${params.toString()}`);
  if (!response.ok) {
    return false;
  }
  const payload = await response.json().catch(() => ({}));
  const incoming = Array.isArray(payload.terms) ? payload.terms.map((term) => normalizeTerm(term, false)) : [];
  if (!incoming.length) {
    return false;
  }
  const bySlug = new Map([...cloudTerms, ...incoming].map((term) => [term.slug, term]));
  cloudTerms = [...bySlug.values()];
  return true;
}

async function loadTrendingTerms(limit = 12) {
  const response = await fetch(`/api/trending?limit=${limit}`);
  if (!response.ok) {
    return false;
  }
  const payload = await response.json().catch(() => ({}));
  trendingTerms = Array.isArray(payload.terms) ? payload.terms : [];
  return trendingTerms.length > 0;
}

async function requestAiTerm(query) {
  const response = await fetch("/api/explain", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ term: query })
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || "生成失败，请稍后重试。");
  }
  return normalizeTerm(payload.term || payload, true);
}

function normalizeTerm(term, temporary) {
  return {
    ...fallbackTerm(term.term || "未知梗词"),
    ...term,
    slug: term.slug || slugify(term.term || "未知梗词"),
    temporary,
    aliases: Array.isArray(term.aliases) ? term.aliases : [],
    tags: Array.isArray(term.tags) ? term.tags : [],
    usage_scenarios: Array.isArray(term.usage_scenarios) ? term.usage_scenarios : [],
    avoid_scenarios: Array.isArray(term.avoid_scenarios) ? term.avoid_scenarios : [],
    examples: Array.isArray(term.examples) ? term.examples : [],
    similar_terms: Array.isArray(term.similar_terms) ? term.similar_terms : [],
    reply_templates: {
      normal: term.reply_templates?.normal || "需要结合上下文理解。",
      humorous: term.reply_templates?.humorous || "这梗先让上下文背锅。",
      sarcastic: term.reply_templates?.sarcastic || "不确定，但别急着乱用。"
    }
  };
}

function setLoading(isLoading, label = "正在为你翻译...") {
  const button = document.querySelector("#searchForm button, #sideSearch button");
  if (button) {
    button.disabled = isLoading;
    button.textContent = isLoading ? label : "翻译";
  }
}

function renderHome(message = "", skipCloudRefresh = false) {
  const terms = loadTerms();
  const hot = sortTermsForList(terms).slice(0, 10);
  app.innerHTML = `
    <section class="hero">
      <h1>互联网梗词翻译器</h1>
      <p>看不懂网络热梗？输入一个梗词，翻译成人话。</p>
      <form class="searchBox" id="searchForm">
        <input id="searchInput" maxlength="50" autocomplete="off" placeholder="输入梗词、缩写或谐音表达" />
        <button class="primary" type="submit">翻译</button>
      </form>
      ${message ? `<div class="message">${escapeHtml(message)}</div>` : ""}
    </section>
    <section class="section">
      <div class="sectionHead">
        <h2>大家在看</h2>
        <p>按搜索热度和最近查询更新</p>
      </div>
      <div class="chips">
        ${hot.map((term) => `<a class="chip" href="#/terms/${term.slug}">${escapeHtml(term.term)}</a>`).join("")}
      </div>
    </section>
    <section class="section">
      <div class="sectionHead">
        <h2>正在流行</h2>
        <p>来自外部热榜的候选梗词</p>
      </div>
      <div class="grid">
        ${
          trendingTerms
            .slice(0, 6)
            .map(
              (term) => `
                <button class="card trendCard" type="button" data-trend="${escapeHtml(term.term)}">
                  <span class="rank">#${escapeHtml(term.rank || "")}</span>
                  <h3>${escapeHtml(term.term)}</h3>
                  <p>${escapeHtml(term.reason || "热榜候选，点击后生成解释。")}</p>
                  ${cardMeta(term)}
                </button>
              `
            )
            .join("") || `<div class="card"><h3>等待刷新</h3><p>配置 Supabase 后访问刷新接口，就会出现全网热榜候选。</p></div>`
        }
      </div>
    </section>
    <section class="section">
      <div class="sectionHead">
        <h2>分类入口</h2>
        <p>按语境继续查</p>
      </div>
      <div class="grid">
        ${categories
          .map(
            (category) => `
              <a class="card" href="#/category/${category.id}">
                <h3>${escapeHtml(category.name)}</h3>
                <p>${escapeHtml(category.desc)}</p>
              </a>
            `
          )
          .join("")}
      </div>
    </section>
  `;

  document.querySelector("#searchForm").addEventListener("submit", (event) => {
    event.preventDefault();
    handleSearch(document.querySelector("#searchInput").value);
  });
  document.querySelectorAll("[data-trend]").forEach((button) => {
    button.addEventListener("click", () => handleSearch(button.dataset.trend));
  });

  if (!skipCloudRefresh) {
    Promise.all([loadCloudTerms("", 24), loadTrendingTerms(12)])
      .then((results) => {
        if (results.some(Boolean) && (location.hash || "#/") === "#/") {
          renderHome(message, true);
        }
      })
      .catch(() => {});
  }
}

async function handleSearch(raw) {
  const query = raw.trim();
  if (!query) {
    renderHome("请输入一个梗词。");
    return;
  }
  if ([...query].length > 50) {
    renderHome("当前版本主要支持单个梗词或短语，请缩短后再试。");
    return;
  }

  const term = findTerm(query);
  if (term) {
    recordQuery(query, "published");
    location.hash = `#/terms/${term.slug}`;
    return;
  }

  const cached = getCachedTerm(query);
  if (cached) {
    recordQuery(query, "cache");
    renderTerm(cached);
    return;
  }

  setLoading(true, "正在为你翻译...");
  try {
    const generated = await requestAiTerm(query);
    setCachedTerm(query, generated);
    recordQuery(query, "llm");
    renderTerm(generated);
  } catch (error) {
    recordQuery(query, "llm-error");
    renderTerm(fallbackTerm(query));
    setTimeout(() => alert(error.message || "网络开小差了，请重试。"), 50);
  } finally {
    setLoading(false);
  }
}

function termBlocks(term) {
  return `
    <div class="blocks">
      <section class="block">
        <h3>详细解释</h3>
        <p>${escapeHtml(term.detailed_explanation)}</p>
      </section>
      <section class="block">
        <h3>语气判断</h3>
        <p>${escapeHtml(term.tone)}</p>
      </section>
      <section class="block">
        <h3>来源 / 典故</h3>
        <p>${escapeHtml(term.origin)}</p>
      </section>
      <section class="block">
        <h3>适合使用</h3>
        <ul>${term.usage_scenarios.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </section>
      <section class="block">
        <h3>不适合使用</h3>
        <ul>${term.avoid_scenarios.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </section>
      <section class="block">
        <h3>例句</h3>
        <ul>${term.examples.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </section>
      <section class="block">
        <h3>回复模板</h3>
        <ul>
          <li>正常版：${escapeHtml(term.reply_templates.normal)}</li>
          <li>幽默版：${escapeHtml(term.reply_templates.humorous)}</li>
          <li>阴阳怪气版：${escapeHtml(term.reply_templates.sarcastic)}</li>
        </ul>
      </section>
      <section class="block">
        <h3>备注 / 避雷</h3>
        <p>${escapeHtml(term.notes)}</p>
      </section>
    </div>
  `;
}

function renderTerm(term) {
  document.title = term.seo_title || `${term.term}是什么意思？`;
  const category = categories.find((item) => item.id === term.category);
  app.innerHTML = `
    <div class="layout">
      <article class="result">
        <header>
          <div>
            <h1 class="termTitle">${escapeHtml(term.term)}</h1>
            <div class="meta">
              ${term.temporary ? `<span class="tag">AI 临时解释</span>` : `<span class="tag">正式词条</span>`}
              ${category ? `<a class="tag" href="#/category/${category.id}">${escapeHtml(category.name)}</a>` : ""}
              ${term.source === "shared-cache" ? `<span class="tag">用户查询</span>` : ""}
              ${term.queryCount ? `<span class="tag">查询 ${Number(term.queryCount)}</span>` : ""}
              ${(term.aliases || []).map((alias) => `<span class="tag">${escapeHtml(alias)}</span>`).join("")}
              ${termTags(term, 5).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
            </div>
          </div>
          <div class="actions">
            <button class="ghost" data-action="copy-one">复制一句话</button>
            <button class="ghost" data-action="copy-all">复制完整结果</button>
            <button class="ghost" data-action="share">分享链接</button>
          </div>
        </header>
        <div class="oneLiner">${escapeHtml(term.one_liner)}</div>
        ${termBlocks(term)}
        <div class="actions">
          <button class="tiny" data-action="like">点赞</button>
          <button class="tiny" data-action="dislike">点踩</button>
        </div>
      </article>
      <aside class="sidebar">
        <section class="panel">
          <h2>相似梗</h2>
          <div class="chips">
            ${(term.similar_terms || [])
              .map((name) => {
                const matched = findTerm(name);
                return matched
                  ? `<a class="chip" href="#/terms/${matched.slug}">${escapeHtml(name)}</a>`
                  : `<span class="chip">${escapeHtml(name)}</span>`;
              })
              .join("")}
          </div>
        </section>
        <section class="panel">
          <h2>继续查询</h2>
          <form class="form" id="sideSearch">
            <input maxlength="50" placeholder="再输入一个梗词" />
            <button class="primary" type="submit">翻译</button>
          </form>
        </section>
      </aside>
    </div>
  `;

  document.querySelector("#sideSearch").addEventListener("submit", (event) => {
    event.preventDefault();
    handleSearch(event.target.querySelector("input").value);
  });

  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => runAction(button.dataset.action, term));
  });
}

async function runAction(action, term) {
  const stats = getStats();
  stats[term.term] = stats[term.term] || { count: 0, likes: 0, dislikes: 0, copies: 0, shares: 0 };
  if (action === "copy-one") {
    await copyText(`${term.term}：${term.one_liner}`);
    stats[term.term].copies += 1;
    alert("已复制一句话解释。");
  }
  if (action === "copy-all") {
    await copyText(`${term.term}\n${term.one_liner}\n\n${term.detailed_explanation}\n\n语气：${term.tone}`);
    stats[term.term].copies += 1;
    alert("已复制完整结果。");
  }
  if (action === "share") {
    const url = `${location.href.split("#")[0]}#/terms/${term.slug}`;
    await copyText(url);
    stats[term.term].shares += 1;
    alert("已复制词条链接。");
  }
  if (action === "like") {
    stats[term.term].likes += 1;
    alert("已记录点赞。");
  }
  if (action === "dislike") {
    stats[term.term].dislikes += 1;
    alert("已记录点踩。");
  }
  setStats(stats);
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

function renderCategory(id, skipCloudRefresh = false) {
  const category = categories.find((item) => item.id === id) || categories[0];
  const terms = sortTermsForList(loadTerms().filter((term) => term.category === category.id));
  document.title = `${category.name}梗大全 - 互联网梗词翻译器`;
  app.innerHTML = `
    <section class="section">
      <div class="sectionHead">
        <div>
          <h1>${escapeHtml(category.name)}梗大全</h1>
          <p>${escapeHtml(category.desc)}</p>
        </div>
        <a class="ghost" href="#/">返回首页</a>
      </div>
      <div class="grid">
        ${terms
          .map(
            (term) => `
              <a class="card" href="#/terms/${term.slug}">
                <h3>${escapeHtml(term.term)}</h3>
                <p>${escapeHtml(term.one_liner)}</p>
                ${cardMeta(term)}
              </a>
            `
          )
          .join("") || `<div class="card"><h3>暂无词条</h3><p>可以在后台新增这个分类的内容。</p></div>`}
      </div>
    </section>
    <section class="section">
      <div class="chips">
        ${categories.map((item) => `<a class="chip" href="#/category/${item.id}">${escapeHtml(item.name)}</a>`).join("")}
      </div>
    </section>
  `;

  if (!skipCloudRefresh) {
    loadCloudTerms(category.id, 24)
      .then((changed) => {
        if (changed && location.hash === `#/category/${category.id}`) {
          renderCategory(category.id, true);
        }
      })
      .catch(() => {});
  }
}

function renderAdmin() {
  const terms = loadTerms();
  const stats = getStats();
  app.innerHTML = `
    <section class="admin">
      <div class="sectionHead">
        <div>
          <h1>后台管理</h1>
          <p>admin / meme123</p>
        </div>
        <a class="ghost" href="#/">返回首页</a>
      </div>
      <div class="adminGrid">
        <section class="panel" id="loginPanel">
          <h2>管理员登录</h2>
          <form class="form" id="loginForm">
            <label>账号<input name="user" autocomplete="username" /></label>
            <label>密码<input name="pass" type="password" autocomplete="current-password" /></label>
            <button class="primary" type="submit">登录</button>
          </form>
        </section>
        <section class="panel" id="adminPanel" hidden>
          <h2>新增 / 编辑词条</h2>
          <form class="form" id="termForm">
            <label>梗词<input name="term" maxlength="50" required /></label>
            <label>分类
              <select name="category">${categories.map((item) => `<option value="${item.id}">${item.name}</option>`).join("")}</select>
            </label>
            <label>一句话解释<textarea name="one_liner" required></textarea></label>
            <label>详细解释<textarea name="detailed_explanation" required></textarea></label>
            <label>语气判断<input name="tone" required /></label>
            <button class="primary" type="submit">保存并发布</button>
            <button class="ghost" type="button" id="draftButton">AI 生成初稿</button>
          </form>
        </section>
      </div>
      <section class="section">
        <div class="sectionHead">
          <h2>词条列表</h2>
          <p>${terms.length} 个词条</p>
        </div>
        <div class="termList">
          ${terms
            .map(
              (term) => `
                <div class="termRow">
                  <div>
                    <strong>${escapeHtml(term.term)}</strong>
                    <p>${escapeHtml(term.one_liner)}</p>
                  </div>
                  <a class="tiny" href="#/terms/${term.slug}">查看</a>
                </div>
              `
            )
            .join("")}
        </div>
      </section>
      <section class="section">
        <div class="sectionHead">
          <h2>基础统计</h2>
          <p>匿名本地统计</p>
        </div>
        <div class="grid">
          ${Object.entries(stats)
            .sort((a, b) => (b[1].count || 0) - (a[1].count || 0))
            .slice(0, 6)
            .map(
              ([name, item]) => `
                <div class="card">
                  <h3>${escapeHtml(name)}</h3>
                  <p>查询 ${item.count || 0} 次，点赞 ${item.likes || 0}，点踩 ${item.dislikes || 0}，复制 ${item.copies || 0}</p>
                </div>
              `
            )
            .join("") || `<div class="card"><h3>暂无统计</h3><p>查询后会出现数据。</p></div>`}
        </div>
      </section>
    </section>
  `;

  const loginForm = document.querySelector("#loginForm");
  const adminPanel = document.querySelector("#adminPanel");
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(loginForm);
    if (data.get("user") === "admin" && data.get("pass") === "meme123") {
      adminPanel.hidden = false;
      document.querySelector("#loginPanel").innerHTML = `<h2>已登录</h2><p class="status">可以维护正式词条。</p>`;
    } else {
      alert("账号或密码不正确。");
    }
  });

  document.querySelector("#draftButton").addEventListener("click", async () => {
    const form = document.querySelector("#termForm");
    const name = form.term.value.trim();
    if (!name) {
      alert("请先输入梗词。");
      return;
    }
    const button = document.querySelector("#draftButton");
    button.disabled = true;
    button.textContent = "AI 生成中...";
    try {
      const draft = await requestAiTerm(name);
      form.category.value = draft.category || "hot";
      form.one_liner.value = draft.one_liner;
      form.detailed_explanation.value = draft.detailed_explanation;
      form.tone.value = draft.tone;
    } catch (error) {
      alert(error.message || "AI 生成失败，请稍后重试。");
    } finally {
      button.disabled = false;
      button.textContent = "AI 生成初稿";
    }
  });

  document.querySelector("#termForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const name = data.get("term").trim();
    const term = {
      ...fallbackTerm(name),
      temporary: false,
      term: name,
      slug: slugify(name),
      category: data.get("category"),
      one_liner: data.get("one_liner").trim(),
      detailed_explanation: data.get("detailed_explanation").trim(),
      tone: data.get("tone").trim()
    };
    saveCustomTerm(term);
    alert("已发布词条。");
    renderAdmin();
  });
}

function route() {
  const hash = location.hash || "#/";
  const parts = hash.replace(/^#\//, "").split("/");
  if (parts[0] === "") {
    document.title = "互联网梗词翻译器 - 网络热梗解释与用法查询";
    renderHome();
    return;
  }
  if (parts[0] === "terms") {
    const slug = parts[1];
    const term = loadTerms().find((item) => item.slug === slug);
    if (term) {
      renderTerm(term);
      return;
    }
    loadCloudTerms("", 50)
      .then(() => {
        const cloudTerm = loadTerms().find((item) => item.slug === slug);
        if (cloudTerm) {
          renderTerm(cloudTerm);
          return;
        }
        renderHome("没有找到这个词条，可以直接搜索生成 AI 临时解释。");
      })
      .catch(() => renderHome("没有找到这个词条，可以直接搜索生成 AI 临时解释。"));
    app.innerHTML = `<section class="section"><p>正在加载词条...</p></section>`;
    return;
  }
  if (parts[0] === "category") {
    renderCategory(parts[1]);
    return;
  }
  if (parts[0] === "admin") {
    renderAdmin();
    return;
  }
  renderHome();
}

window.addEventListener("hashchange", route);
route();
