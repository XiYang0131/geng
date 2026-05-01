module.exports = function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  res.status(200).json({
    ok: true,
    provider: "deepseek",
    llmConfigured: Boolean(process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY),
    model: process.env.DEEPSEEK_MODEL || process.env.OPENAI_MODEL || "deepseek-v4-flash",
    baseUrl: process.env.DEEPSEEK_BASE_URL || process.env.OPENAI_BASE_URL || "https://api.deepseek.com",
    persistentStore: false
  });
};
