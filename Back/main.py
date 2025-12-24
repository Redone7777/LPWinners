from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="LPWinners API", version="1.0.0")

# CORS - permet au frontend (localhost:3000) de communiquer avec le backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ajouter vos endpoints ici:
# @app.get("/api/v1/champions")
# def get_champions(): ...
