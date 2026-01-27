from __future__ import annotations

import json
from dataclasses import asdict, dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


def utc_now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


@dataclass
class RuntimeState:
    mode: str
    status: str
    symbol: str
    timeframe: str
    updated_at: str

    # placeholders for next milestones
    latest_signal: dict[str, Any] | None = None
    latest_intent: dict[str, Any] | None = None
    recent_orders: list[dict[str, Any]] | None = None
    last_error: str | None = None


class StateStore:
    def __init__(self, path: str):
        self.path = Path(path)
        self.path.parent.mkdir(parents=True, exist_ok=True)

    def write(self, state: RuntimeState) -> None:
        payload = asdict(state)
        tmp = self.path.with_suffix(".tmp")
        tmp.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
        tmp.replace(self.path)

    def read(self) -> dict[str, Any] | None:
        if not self.path.exists():
            return None
        return json.loads(self.path.read_text(encoding="utf-8"))
