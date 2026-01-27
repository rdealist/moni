# OKX Bot (Python, uv)

Python service for the OKX continuous-market bot used by **moni**.

## Scope (MVP)
- Spot / BTC-USDT / 15m / Trend
- Start with **Paper** mode (no real orders)
- Then add **Demo trading** (OKX simulated trading)
- LLM is **off** initially; signals come from deterministic indicators

## Quick start

```bash
cd services/okx_bot

# install deps (creates .venv by default)
uv sync

# run API
uv run uvicorn okx_bot.main:app --reload --port 8001

# health
curl -s http://localhost:8001/health | jq

# runtime state (for web UI)
curl -s http://localhost:8001/state | jq
```

## Configuration
Via env vars (see `okx_bot/config.py`).

Suggested defaults:
- MODE=paper
- SYMBOL=BTC-USDT
- TIMEFRAME=15m
- EQUITY_USDT=1000
- RISK_PER_TRADE=0.0025
- MAX_DAILY_LOSS=0.01
- MAX_EXPOSURE_PCT=0.2

## Integration with moni web
- This service exposes `/state` JSON.
- The Next.js UI can poll it and render into `/[locale]/okx`.
