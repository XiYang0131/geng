# 梗百科

一个轻量版互联网梗词翻译器 MVP。用户输入梗词后，已缓存内容直接返回，未缓存内容调用 DeepSeek 生成结构化解释，并可写入 Supabase 作为线上共享缓存。

## 本地运行

1. 安装 Node.js 18 或更高版本。
2. 安装依赖：

```powershell
npm install
```

3. 复制环境变量模板：

```powershell
Copy-Item .env.example .env
```

4. 编辑 `.env`，填入 DeepSeek API Key：

```env
DEEPSEEK_API_KEY=your_deepseek_api_key_here
DEEPSEEK_BASE_URL=https://api.deepseek.com
DEEPSEEK_MODEL=deepseek-v4-flash
PORT=8788
```

5. 启动服务：

```powershell
npm start
```

6. 打开：

```text
http://127.0.0.1:8788
```

## 接入 Supabase

1. 在 Supabase 新建项目。
2. 打开 Supabase 左侧 `SQL Editor`，执行 [supabase/schema.sql](./supabase/schema.sql)。
3. 在 Supabase `Project Settings -> API` 复制：

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

4. 把这两个变量加到本地 `.env` 或 Vercel 环境变量里。

注意：`SUPABASE_SERVICE_ROLE_KEY` 只能放在服务端环境变量里，不要写进前端代码，也不要提交到 GitHub。

启用后，查询流程会变成：

```text
先查 Supabase 缓存 -> 命中直接返回 -> 未命中调用 DeepSeek -> 写入 Supabase -> 返回结果
```

## Vercel 部署

这个仓库已经包含 Vercel Functions：

```text
api/explain.js
api/health.js
```

部署步骤：

1. 在 Vercel 导入 GitHub 仓库。
2. Framework Preset 选择 `Other`。
3. Build Command 留空。
4. Output Directory 留空。
5. 添加环境变量：

```env
DEEPSEEK_API_KEY=your_deepseek_api_key_here
DEEPSEEK_BASE_URL=https://api.deepseek.com
DEEPSEEK_MODEL=deepseek-v4-flash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
TRENDING_REFRESH_SECRET=your_refresh_secret
```

6. 点击 Deploy。

如果不配置 Supabase，线上仍然可以调用 DeepSeek，但缓存只会保存在函数内存里，不适合长期存储所有用户查询结果。

## 刷新热门候选

配置 `SUPABASE_URL`、`SUPABASE_SERVICE_ROLE_KEY`、`DEEPSEEK_API_KEY` 后，可以手动访问：

```text
https://your-domain.vercel.app/api/trending-refresh?secret=your_refresh_secret
```

它会读取外部热榜，使用 DeepSeek 筛出像梗词的候选，并写入 Supabase 的 `meme_trending_terms` 表。首页会在“正在流行”里展示这些候选。
