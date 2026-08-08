from __future__ import annotations

from contextlib import asynccontextmanager

from fastapi import FastAPI

from .database import initialize
from .routers import (
    account_router,
    auth_router,
    health_router,
    internal_payments_router,
    items_router,
    session_router,
)


@asynccontextmanager
async def lifespan(_app: FastAPI):
    initialize()
    yield


app = FastAPI(
    title="InnerGeodessa Pilot API",
    version="0.1.0",
    lifespan=lifespan,
)

app.include_router(health_router)
app.include_router(items_router)
app.include_router(session_router)
app.include_router(auth_router)
app.include_router(account_router)
app.include_router(internal_payments_router)
