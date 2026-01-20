# Moni（摹尼）- 投资组合管理工具设计方案

> 设计日期：2025-01-19

## 产品概述

**名称**：Moni / 摹尼
**定位**：科技敏捷型投资组合管理工具
**目标用户**：喜欢极简界面、实时监控资产动态的年轻个人用户
**商业模式**：完全开源免费，社区驱动

## 核心决策摘要

| 维度 | 决策 |
|------|------|
| 资产类型 | 综合资产（股票、基金、加密货币、存款、债券） |
| 数据来源 | 券商/交易所 API 同步（插件化架构） |
| 产品形态 | 全平台（Web + 移动端 + 桌面端） |
| 核心功能 | 投资分析报告（收益归因、风险评估、回测） |
| 技术栈 | React/Next.js + Node.js + shadcn/ui |
| 隐私策略 | 本地优先 + 可选云同步 + 自托管 |
| 架构方案 | Monorepo 单体架构（Turborepo） |

---

## 项目结构

```
moni/
├── apps/
│   ├── web/                # Next.js 14 Web 应用
│   ├── mobile/             # React Native + Expo 移动端
│   └── desktop/            # Electron 桌面端
├── packages/
│   ├── core/               # 核心计算引擎（收益计算、风险分析）
│   ├── ui/                 # 共享 UI 组件（基于 shadcn/ui）
│   ├── db/                 # 数据层（本地 SQLite + 可选云同步）
│   ├── sync/               # 数据同步引擎（CRDT）
│   └── plugins/            # 数据源插件系统
├── plugins/                # 官方数据源插件
│   ├── plugin-manual/      # 手动录入
│   ├── plugin-yahoo-finance/
│   ├── plugin-binance/
│   └── plugin-template/    # 插件开发模板
├── docs/                   # 文档
└── docker/                 # 自托管 Docker 配置
```

---

## 核心数据模型

```typescript
type AssetType = 'stock' | 'fund' | 'crypto' | 'bond' | 'cash' | 'other'

interface Asset {
  id: string
  type: AssetType
  symbol: string           // AAPL, BTC, 600519
  name: string
  currency: string         // USD, CNY, HKD
  exchange?: string        // NASDAQ, SSE, Binance
  pluginId: string
}

interface Holding {
  id: string
  assetId: string
  quantity: number
  costBasis: number
  acquiredAt: Date
  accountId: string
}

interface Transaction {
  id: string
  assetId: string
  type: 'buy' | 'sell' | 'dividend' | 'split' | 'transfer'
  quantity: number
  price: number
  fee: number
  executedAt: Date
  notes?: string
}

interface Account {
  id: string
  name: string
  pluginId?: string
  isManual: boolean
}
```

---

## 插件系统

```typescript
interface MoniPlugin {
  id: string
  name: string
  version: string

  capabilities: {
    sync: boolean       // 能否同步持仓
    quote: boolean      // 能否获取行情
    history: boolean    // 能否获取历史数据
  }

  supportedAssets: AssetType[]

  authenticate?(credentials: unknown): Promise<AuthResult>
  fetchHoldings?(accountId: string): Promise<Holding[]>
  fetchQuote(symbols: string[]): Promise<Quote[]>
  fetchHistory(symbol: string, range: DateRange): Promise<OHLCV[]>
  searchAsset(query: string): Promise<Asset[]>
}
```

**MVP 插件**：
- `plugin-manual` - 手动录入（P0）
- `plugin-yahoo-finance` - 免费行情（P0）
- `plugin-template` - 社区开发模板（P0）
- `plugin-binance` - 加密货币（P1）

---

## 分析引擎

```typescript
// 收益归因
interface PerformanceAttribution {
  totalReturn: number
  breakdown: {
    assetAllocation: number
    securitySelection: number
    timing: number
    currency: number
    fees: number
  }
  byAsset: AssetContribution[]
}

// 风险评估
interface RiskMetrics {
  volatility: number        // 波动率
  sharpeRatio: number       // 夏普比率
  maxDrawdown: number       // 最大回撤
  beta: number
  var95: number             // 95% VaR
  correlation: Matrix
}

// 历史回测
interface BacktestResult {
  period: DateRange
  returns: TimeSeriesData
  benchmark: TimeSeriesData
  trades: Transaction[]
  metrics: RiskMetrics
}
```

---

## 数据存储架构

**本地优先 + 可选云同步**

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Web App   │     │  Mobile App │     │ Desktop App │
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │
       ▼                   ▼                   ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   SQLite    │     │   SQLite    │     │   SQLite    │
│   (WASM)    │     │  (Native)   │     │  (Native)   │
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │
       └───────────────────┼───────────────────┘
                           ▼
                  ┌─────────────────┐
                  │  Sync Server    │  ← 可选，用户自托管
                  │  (CRDT Merge)   │
                  └─────────────────┘
```

- Web: sql.js (WebAssembly)
- Mobile: react-native-sqlite-storage
- Desktop: better-sqlite3
- 同步: Yjs (CRDT)

---

## 技术栈

```json
{
  "monorepo": "Turborepo",
  "packageManager": "pnpm",
  "language": "TypeScript 5.x",
  "apps": {
    "web": "Next.js 14 (App Router)",
    "mobile": "React Native + Expo",
    "desktop": "Electron + Next.js"
  },
  "packages": {
    "ui": "shadcn/ui + Tailwind CSS",
    "db": "sql.js / better-sqlite3",
    "charts": "Recharts",
    "state": "Zustand",
    "sync": "Yjs (CRDT)"
  },
  "testing": {
    "unit": "Vitest",
    "e2e": "Playwright",
    "component": "Storybook"
  }
}
```

---

## UI 设计要点

- **深色模式优先**：护眼，符合科技感定位
- **极简信息层级**：最重要的数字最大，次要信息渐隐
- **键盘快捷键**：`G` 总览、`H` 持仓、`A` 分析、`/` 搜索
- **动效克制**：仅在数据变化时使用微动效
- **LLM 友好**：使用 shadcn/ui，便于 vibe coding

### 仪表盘布局参考

```
┌────────────────────────────────────────────────────────┐
│  Moni                        [同步状态]  [设置] [主题] │
├────────────────────────────────────────────────────────┤
│                                                        │
│   ¥ 1,234,567.89            +2.34% 今日               │
│   总资产                     +¥28,234.56              │
│                                                        │
├──────────────────────┬─────────────────────────────────┤
│                      │                                 │
│   [资产配置饼图]      │   热力图：各资产今日涨跌         │
│                      │   ┌──┬──┬──┬──┬──┐             │
│   股票  45%          │   │▓▓│▒▒│░░│▓▓│▒▒│             │
│   加密  25%          │   ├──┼──┼──┼──┼──┤             │
│   基金  20%          │   │░░│▓▓│▒▒│░░│▓▓│             │
│   现金  10%          │   └──┴──┴──┴──┴──┘             │
│                      │                                 │
├──────────────────────┴─────────────────────────────────┤
│  持仓列表                              排序: 市值 ↓    │
│  ────────────────────────────────────────────────────  │
│  AAPL    苹果     $189.23   +1.2%    ¥156,789   12.7% │
│  BTC     比特币   $67,234   +3.4%    ¥234,567   19.0% │
│  600519  茅台     ¥1,678    -0.5%    ¥167,800   13.6% │
│  ...                                                   │
└────────────────────────────────────────────────────────┘
```

---

## MVP 范围（P0）

| 功能 | 说明 |
|------|------|
| 手动添加资产 | 支持录入任意资产类型 |
| 行情自动更新 | 通过 Yahoo Finance 插件获取价格 |
| 资产总览仪表盘 | 总资产、今日盈亏、配置比例 |
| 基础收益分析 | 持仓盈亏、收益率计算 |
| 本地 SQLite 存储 | 数据持久化、导入导出 |
| 深色/浅色主题 | 主题切换 |

---

## P1 范围（v1.1）

| 功能 | 说明 |
|------|------|
| 交易记录管理 | 完整买卖记录、成本核算 |
| 收益归因分析 | 分解收益来源 |
| 风险指标 | 波动率、最大回撤、夏普比率 |
| 多账户管理 | 区分不同券商账户 |
| 数据云同步 | 可选的多设备同步 |

---

## P2 范围（v1.2+）

| 功能 | 说明 |
|------|------|
| 移动端 App | React Native 实现 |
| 桌面端 App | Electron 封装 |
| 券商 API 同步 | Binance 等插件 |
| 历史回测 | 模拟历史表现 |
| 自托管 Docker | 私有部署方案 |

---

## 实现步骤

### Step 1: 项目初始化
- 初始化 Turborepo + pnpm workspace
- 配置 TypeScript、ESLint、Prettier
- 创建 apps/web (Next.js 14)
- 集成 shadcn/ui + Tailwind CSS

### Step 2: 核心数据层
- 实现 packages/db（SQLite + sql.js）
- 定义数据模型 Schema
- 实现 CRUD 操作
- 添加数据迁移机制

### Step 3: 插件系统
- 定义插件接口（packages/plugins）
- 实现 plugin-manual（手动录入）
- 实现 plugin-yahoo-finance（行情获取）
- 插件沙箱运行时

### Step 4: 核心计算引擎
- 实现 packages/core
- 收益率计算（TWR、MWR）
- 基础风险指标
- 资产配置分析

### Step 5: Web 应用 UI
- 仪表盘页面（总览）
- 持仓列表页面
- 资产详情页面
- 交易记录页面
- 设置页面

### Step 6: 测试与验证
- 核心计算逻辑单元测试
- E2E 测试关键流程
- 构建验证

---

## 验证方式

| 命令 | 用途 |
|------|------|
| `pnpm dev` | 启动 Web 端开发服务器 |
| `pnpm test` | 运行 Vitest 单元测试 |
| `pnpm build` | 构建所有应用 |
| `pnpm typecheck` | 全栈类型检查 |
| `pnpm lint` | 代码规范检查 |

**端到端验证流程**：
1. 启动 Web 应用 (`pnpm dev`)
2. 手动添加一个股票资产
3. 验证行情自动更新
4. 查看仪表盘数据展示
5. 导出数据并重新导入验证
