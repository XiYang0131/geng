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
```

6. 点击 Deploy。

注意：Vercel Functions 不适合用本地文件做长期数据库。当前线上版本会使用函数内存缓存，适合先试用；如果要长期保存所有用户查询结果，下一步建议接入 Supabase。
