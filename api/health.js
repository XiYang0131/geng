module.exports = function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { health } = require("../lib/memeService");
    res.status(200).json(health());
  } catch (error) {
    res.status(500).json({ error: error.message || "服务器开小差了，请重试。" });
  }
};
