from __future__ import annotations

from fastapi import APIRouter

from okx_bot.config import settings
from okx_bot.state.store import RuntimeState, StateStore, utc_now_iso

router = APIRouter()
store = StateStore(settings.state_path)


@router.get("/health")
def health():
    return {"ok": True}


@router.get("/state")
def get_state():
    data = store.read()
    if data is not None:
        return data

    # Default bootstrap state
    state = RuntimeState(
        mode=settings.mode,
        status="not_running",
        symbol=settings.symbol,
        timeframe=settings.timeframe,
        updated_at=utc_now_iso(),
    )
    store.write(state)
    return store.read()
