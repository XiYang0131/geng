const http = require("http");
const fs = require("fs");
const path = require("path");

loadEnv();

const { explainTerm, health, listCachedTerms, listTrendingTerms, refreshTrendingTerms } = require("./lib/memeService");

const root = __dirname;
const port = Number(process.env.PORT || 8788);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8"
};

const server = http.createServer(async (request, response) => {
  try {
    if (request.method === "GET" && request.url === "/api/health") {
      sendJson(response, 200, health());
      return;
    }

    if (request.method === "GET" && request.url.startsWith("/api/terms")) {
      const url = new URL(request.url, "http://localhost");
      const terms = await listCachedTerms({
        category: url.searchParams.get("category") || "",
        limit: url.searchParams.get("limit") || 24
      });
      sendJson(response, 200, { terms });
      return;
    }

    if (request.method === "GET" && request.url.startsWith("/api/trending-refresh")) {
      const url = new URL(request.url, "http://localhost");
      const secret = process.env.TRENDING_REFRESH_SECRET || "";
      if (secret && url.searchParams.get("secret") !== secret) {
        sendJson(response, 401, { error: "Unauthorized" });
        return;
      }
      const terms = await refreshTrendingTerms();
      sendJson(response, 200, { ok: true, count: terms.length, terms });
      return;
    }

    if (request.method === "GET" && request.url.startsWith("/api/trending")) {
      const url = new URL(request.url, "http://localhost");
      const terms = await listTrendingTerms({
        limit: url.searchParams.get("limit") || 12
      });
      sendJson(response, 200, { terms });
      return;
    }

    if (request.method === "POST" && request.url === "/api/explain") {
      const body = await readJson(request);
      const result = await explainTerm(body.term);
      sendJson(response, result.status, result.body);
      return;
    }

    if (request.method === "GET") {
      serveStatic(request, response);
      return;
    }

    sendJson(response, 405, { error: "Method not allowed" });
  } catch (error) {
    sendJson(response, 500, { error: error.message || "服务器开小差了，请重试。" });
  }
});

server.listen(port, () => {
  const status = health();
  console.log(`梗百科已启动：http://127.0.0.1:${port}`);
  console.log(status.llmConfigured ? `DeepSeek 已配置：${status.model}` : "DeepSeek 未配置：请设置 DEEPSEEK_API_KEY");
  console.log(`缓存模式：${status.store}`);
});

function serveStatic(request, response) {
  const urlPath = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  const requested = urlPath === "/" ? "/index.html" : urlPath;
  const filePath = path.resolve(root, `.${requested}`);

  if (!filePath.startsWith(root)) {
    sendText(response, 403, "Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      sendText(response, 404, "Not found");
      return;
    }
    const ext = path.extname(filePath);
    response.writeHead(200, { "Content-Type": mimeTypes[ext] || "application/octet-stream" });
    response.end(data);
  });
}

function readJson(request) {
  return new Promise((resolve, reject) => {
    let data = "";
    request.on("data", (chunk) => {
      data += chunk;
      if (data.length > 1024 * 32) {
        reject(new Error("请求内容过大。"));
        request.destroy();
      }
    });
    request.on("end", () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch {
        reject(new Error("请求 JSON 格式不正确。"));
      }
    });
  });
}

function sendJson(response, status, payload) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(payload));
}

function sendText(response, status, text) {
  response.writeHead(status, { "Content-Type": "text/plain; charset=utf-8" });
  response.end(text);
}

function loadEnv() {
  const envPath = path.join(__dirname, ".env");
  if (!fs.existsSync(envPath)) {
    return;
  }
  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }
    const index = trimmed.indexOf("=");
    if (index === -1) {
      continue;
    }
    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim().replace(/^["']|["']$/g, "");
    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}
