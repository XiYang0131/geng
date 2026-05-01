# 梗百科

一个轻量版互联网梗词翻译器 MVP。用户输入梗词后，已缓存内容直接返回，未缓存内容调用 DeepSeek 生成结构化解释。

## 本地运行

1. 安装 Node.js 18 或更高版本。
2. 复制环境变量模板：

```powershell
Copy-Item .env.example .env
```

3. 编辑 `.env`，填入你的 DeepSeek API Key：

```env
DEEPSEEK_API_KEY=your_deepseek_api_key_here
DEEPSEEK_BASE_URL=https://api.deepseek.com
DEEPSEEK_MODEL=deepseek-v4-flash
PORT=8788
```

4. 启动服务：

```powershell
npm start
```

5. 打开：

```text
http://127.0.0.1:8788
```

## 部署说明

当前版本可以作为 Node 服务部署。`data/db.json` 是本地开发缓存，不建议提交到 GitHub，也不适合作为 Vercel 的长期数据库。

如果要部署到 Vercel，建议下一步把 `/api/explain` 拆成 Vercel Functions，并把缓存迁移到 Supabase。
