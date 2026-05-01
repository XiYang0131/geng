const { explainTerm } = require("../lib/memeService");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    const result = await explainTerm(body.term);
    res.status(result.status).json(result.body);
  } catch (error) {
    res.status(500).json({ error: error.message || "服务器开小差了，请重试。" });
  }
};
