module.exports = async function handler(req, res) {
  if (!["GET", "POST"].includes(req.method)) {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const secret = process.env.TRENDING_REFRESH_SECRET || "";
    if (secret) {
      const url = new URL(req.url || "/api/trending-refresh", "http://localhost");
      const token = req.headers.authorization?.replace(/^Bearer\s+/i, "") || url.searchParams.get("secret") || "";
      if (token !== secret) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }
    }

    const { refreshTrendingTerms } = require("../lib/memeService");
    const terms = await refreshTrendingTerms();
    res.status(200).json({ ok: true, count: terms.length, terms });
  } catch (error) {
    res.status(500).json({ error: error.message || "服务器开小差了，请重试。" });
  }
};
