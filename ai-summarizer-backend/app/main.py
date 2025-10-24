from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import Base, engine
from .routes import auth, predict, history

Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Summarizer Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or your React URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(predict.router)
app.include_router(history.router)

@app.get("/")
def home():
    return {"message": "AI Summarizer API is running!"}
