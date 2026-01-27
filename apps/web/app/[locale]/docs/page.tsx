import fs from "fs/promises";
import path from "path";
import ReactMarkdown from "react-markdown";

export default async function DocsPage() {
  // apps/web -> moni root
  const repoRoot = path.join(process.cwd(), "..", "..");
  const docPath = path.join(repoRoot, "docs", "okx-llm-trading.md");

  let content = "";
  try {
    content = await fs.readFile(docPath, "utf8");
  } catch {
    content = "# Docs\n\nMissing docs file: `docs/okx-llm-trading.md`";
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Docs</h1>
        <p className="text-sm text-muted-foreground mt-1">
          OKX（现货）连续行情：LLM 数据整合 → 规则决策 → 自动交易（MVP）
        </p>
      </div>

      <div className="rounded-xl border border-border/50 bg-card/50 p-6 prose prose-zinc dark:prose-invert max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
