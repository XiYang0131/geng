module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { listTrendingTerms } = require("../lib/memeService");
    const url = new URL(req.url || "/api/trending", "http://localhost");
    const terms = await listTrendingTerms({
      limit: url.searchParams.get("limit") || 12
    });
    res.status(200).json({ terms });
  } catch (error) {
    res.status(500).json({ error: error.message || "服务器开小差了，请重试。" });
  }
};
