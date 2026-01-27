from __future__ import annotations

from fastapi import FastAPI

from okx_bot.api.routes import router

app = FastAPI(title="okx-bot", version="0.1.0")
app.include_router(router)
