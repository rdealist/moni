from __future__ import annotations

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_prefix="OKX_BOT_", env_file=None)

    # trading
    mode: str = "paper"  # paper | demo | live (live disabled by default)
    symbol: str = "BTC-USDT"
    timeframe: str = "15m"

    # portfolio/risk (defaults match our discussion)
    equity_usdt: float = 1000.0
    risk_per_trade: float = 0.0025  # 0.25%
    max_daily_loss: float = 0.01  # 1%
    max_exposure_pct: float = 0.2  # 20%
    cooldown_minutes: int = 15

    # signal params
    atr_period: int = 14
    atr_mult_sl: float = 2.0
    ema_fast: int = 20
    ema_slow: int = 50

    # runtime
    state_path: str = "state/runtime.json"


settings = Settings()
