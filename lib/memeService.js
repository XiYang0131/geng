const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const dbDir = path.join(root, "data");
const dbPath = path.join(dbDir, "db.json");
const memoryDb = { queryCache: {}, candidates: {}, queryLogs: [] };

function getConfig() {
  const isVercel = Boolean(process.env.VERCEL);
  return {
    apiKey: process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY,
    baseUrl: (process.env.DEEPSEEK_BASE_URL || process.env.OPENAI_BASE_URL || "https://api.deepseek.com").replace(/\/$/, ""),
    model: process.env.DEEPSEEK_MODEL || process.env.OPENAI_MODEL || "deepseek-v4-flash",
    provider: "deepseek",
    persistentStore: !isVercel && process.env.USE_FILE_DB !== "0"
  };
}

async function explainTerm(rawTerm) {
  const term = String(rawTerm || "").trim();
  const config = getConfig();

  if (!term) {
    return { status: 400, body: { error: "请输入一个梗词。" } };
  }

  if ([...term].length > 50) {
    return { status: 400, body: { error: "当前版本主要支持单个梗词或短语，请缩短后再试。" } };
  }

  const cached = findCachedTerm(term);
  if (cached) {
    return { status: 200, body: { term: normalizeAiJson(cached.term, term), source: cached.source } };
  }

  if (!config.apiKey) {
    return {
      status: 503,
      body: { error: "DeepSeek 服务未配置。请设置 DEEPSEEK_API_KEY 后重试。" }
    };
  }

  const aiTerm = await generateTerm(term, config);
  saveCachedTerm(term, aiTerm, config);
  return { status: 200, body: { term: aiTerm, source: "llm" } };
}

function health() {
  const config = getConfig();
  const db = readDb();
  return {
    ok: true,
    provider: config.provider,
    llmConfigured: Boolean(config.apiKey),
    model: config.model,
    baseUrl: config.baseUrl,
    cacheCount: Object.keys(db.queryCache).length,
    candidateCount: Object.keys(db.candidates).length,
    persistentStore: config.persistentStore
  };
}

async function generateTerm(term, config) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(`${config.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.apiKey}`
      },
      body: JSON.stringify({
        model: config.model,
        temperature: 0.25,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "你是一个中文互联网梗词词典编辑。只输出严格 JSON，不要 Markdown。内容要像词典，不像段子手。解释要通俗、克制、中立、可被普通用户理解。来源不确定时必须说明存在多种说法。例句要温和、短句、无攻击性。回复模板不能鼓励争吵、辱骂、歧视或人身攻击。"
          },
          {
            role: "user",
            content: buildPrompt(term)
          }
        ]
      }),
      signal: controller.signal
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      const message = payload.error?.message || "DeepSeek 调用失败，请检查 API Key、模型名或余额。";
      throw new Error(message);
    }

    const content = payload.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error("DeepSeek 没有返回可解析内容。");
    }

    return normalizeAiJson(JSON.parse(content), term);
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("生成时间有点久，请稍后重试。");
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

function buildPrompt(term) {
  return `请解释互联网梗词「${term}」，输出 JSON，字段必须完整。

写作规则：
1. 面向普通用户，像词典编辑，不要像聊天机器人。
2. 不要编造确定来源；不确定就写“来源存在多种说法”。
3. examples 只写温和例句，不要写攻击、羞辱、引战、低俗内容。
4. reply_templates.sarcastic 只能是轻微调侃，不得攻击任何具体人群或个人。
5. 如果词本身涉及攻击、歧视、辱骂，只做中立解释，examples 留空数组，reply_templates 三项都给出降温/不建议使用的回复。

JSON 结构：
{
  "term": "原词",
  "aliases": ["别名或相关叫法"],
  "one_liner": "一句话解释",
  "detailed_explanation": "详细解释",
  "tone": "语气判断",
  "origin": "来源或常见传播背景；不确定就明确说不确定",
  "usage_scenarios": ["适合使用场景1", "适合使用场景2", "适合使用场景3"],
  "avoid_scenarios": ["不适合使用场景1", "不适合使用场景2"],
  "examples": ["温和例句1", "温和例句2", "温和例句3"],
  "reply_templates": {
    "normal": "正常版回复",
    "humorous": "温和幽默版回复",
    "sarcastic": "轻微调侃但不攻击他人的回复"
  },
  "similar_terms": ["相似梗1", "相似梗2", "相似梗3"],
  "notes": "备注或避雷提醒",
  "category": "hot|classic|irony|emotion|abstract|abbr|entertainment|workplace",
  "seo_title": "SEO 标题",
  "seo_description": "SEO 描述"
}`;
}

function findCachedTerm(term) {
  const key = normalizeQuery(term);
  const db = readDb();
  const entry = db.queryCache[key];
  const now = new Date().toISOString();
  const source = getConfig().persistentStore ? "database-cache" : "memory-cache";

  db.queryLogs.push({ term, normalized: key, hit: Boolean(entry), source: entry ? source : "miss", createdAt: now });
  if (entry) {
    entry.queryCount += 1;
    entry.lastQueriedAt = now;
    entry.source = source;
    db.candidates[key] = buildCandidate(term, entry.term, entry.queryCount, now);
  }
  writeDb(db);

  return entry || null;
}

function saveCachedTerm(term, aiTerm, config) {
  const key = normalizeQuery(term);
  const now = new Date().toISOString();
  const db = readDb();
  const existing = db.queryCache[key];
  const queryCount = existing ? existing.queryCount + 1 : 1;

  db.queryCache[key] = {
    originalQuery: term,
    normalized: key,
    term: aiTerm,
    queryCount,
    createdAt: existing?.createdAt || now,
    lastQueriedAt: now,
    provider: config.provider,
    model: config.model
  };
  db.queryLogs.push({ term, normalized: key, hit: false, source: "llm", createdAt: now });
  db.candidates[key] = buildCandidate(term, aiTerm, queryCount, now);
  writeDb(db);
}

function buildCandidate(term, aiTerm, queryCount, now) {
  return {
    originalQuery: term,
    normalized: normalizeQuery(term),
    term: aiTerm.term || term,
    category: aiTerm.category || "hot",
    queryCount,
    status: queryCount >= 3 ? "ready_for_review" : "collecting",
    updatedAt: now
  };
}

function readDb() {
  if (!getConfig().persistentStore) {
    return memoryDb;
  }
  ensureDb();
  try {
    const db = JSON.parse(fs.readFileSync(dbPath, "utf8"));
    return {
      queryCache: db.queryCache || {},
      candidates: db.candidates || {},
      queryLogs: Array.isArray(db.queryLogs) ? db.queryLogs : []
    };
  } catch {
    return { queryCache: {}, candidates: {}, queryLogs: [] };
  }
}

function writeDb(db) {
  if (!getConfig().persistentStore) {
    memoryDb.queryCache = db.queryCache || {};
    memoryDb.candidates = db.candidates || {};
    memoryDb.queryLogs = (db.queryLogs || []).slice(-1000);
    return;
  }
  ensureDb();
  const next = {
    queryCache: db.queryCache || {},
    candidates: db.candidates || {},
    queryLogs: (db.queryLogs || []).slice(-1000)
  };
  fs.writeFileSync(dbPath, JSON.stringify(next, null, 2), "utf8");
}

function ensureDb() {
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({ queryCache: {}, candidates: {}, queryLogs: [] }, null, 2), "utf8");
  }
}

function normalizeQuery(term) {
  return String(term || "").trim().replace(/\s+/g, " ").toLowerCase();
}

function normalizeAiJson(value, originalTerm) {
  const categoryIds = new Set(["hot", "classic", "irony", "emotion", "abstract", "abbr", "entertainment", "workplace"]);
  return {
    term: stringOr(value.term, originalTerm),
    aliases: arrayOfStrings(value.aliases),
    one_liner: stringOr(value.one_liner, `${originalTerm} 是一个需要结合语境理解的网络表达。`),
    detailed_explanation: stringOr(value.detailed_explanation, "该表达可能有多种含义，建议结合上下文判断。"),
    tone: stringOr(value.tone, "中性 / 需要结合语境"),
    origin: stringOr(value.origin, "来源暂不确定，可能存在多种说法。"),
    usage_scenarios: arrayOfStrings(value.usage_scenarios).slice(0, 5),
    avoid_scenarios: arrayOfStrings(value.avoid_scenarios).slice(0, 5),
    examples: arrayOfStrings(value.examples).slice(0, 3),
    reply_templates: {
      normal: stringOr(value.reply_templates?.normal, "懂了，需要看上下文理解。"),
      humorous: stringOr(value.reply_templates?.humorous, "这个梗先让上下文解释一下。"),
      sarcastic: safeSarcasticReply(value.reply_templates?.sarcastic)
    },
    similar_terms: arrayOfStrings(value.similar_terms).slice(0, 5),
    notes: stringOr(value.notes, "梗词含义会随语境变化，解释仅供参考。"),
    category: categoryIds.has(value.category) ? value.category : "hot",
    seo_title: stringOr(value.seo_title, `${originalTerm}是什么意思？${originalTerm}网络用语解释`),
    seo_description: stringOr(value.seo_description, `解释${originalTerm}的含义、语气、来源和用法。`)
  };
}

function safeSarcasticReply(value) {
  const text = stringOr(value, "这个场面确实有点让人绷不住。");
  const riskyPatterns = [/你|您|他|她|它|他们|她们|它们/, /赶紧|闭嘴|活该|滚|废物|蠢|傻|垃圾/];
  if (riskyPatterns.some((pattern) => pattern.test(text))) {
    return "这个场面确实有点让人绷不住。";
  }
  return text;
}

function arrayOfStrings(value) {
  return Array.isArray(value) ? value.map((item) => String(item).trim()).filter(Boolean) : [];
}

function stringOr(value, fallback) {
  const text = String(value || "").trim();
  return text || fallback;
}

module.exports = {
  explainTerm,
  health
};
