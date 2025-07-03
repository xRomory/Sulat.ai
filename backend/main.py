from fastapi import FastAPI
from routers import messages
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(messages.router)

@app.get("/")
def read_root():
    return {"return": "Hello from FastAPI!"}