module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { listCachedTerms } = require("../lib/memeService");
    const url = new URL(req.url || "/api/terms", "http://localhost");
    const terms = await listCachedTerms({
      category: url.searchParams.get("category") || "",
      limit: url.searchParams.get("limit") || 24
    });
    res.status(200).json({ terms });
  } catch (error) {
    res.status(500).json({ error: error.message || "服务器开小差了，请重试。" });
  }
};
