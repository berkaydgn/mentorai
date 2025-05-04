from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
import os
from dotenv import load_dotenv
import logging

# Ortam değişkenlerini yükle
load_dotenv()

app = FastAPI()

# CORS (frontend bağlantısı için)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Gerekirse belirli bir domain listesi ver
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Gemini API
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"

# İstek & Yanıt modelleri
class GoalRequest(BaseModel):
    goal: str

class PlanResponse(BaseModel):
    plan: str
    tasks: list[str]

@app.post("/api/gemini", response_model=PlanResponse)
async def generate_plan(data: GoalRequest):
    if not GEMINI_API_KEY:
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY eksik")

    headers = {"Content-Type": "application/json"}
    params = {"key": GEMINI_API_KEY}

    prompt_text = (
        f"Kullanıcının hedefi: {data.goal}. "
        "Bu hedef için 6 haftalık bir ders planı oluştur. "
        "Her hafta için görevler ve küçük öğrenme hedefleri öner. "
        "Yanıta sadece plan ve görev listesi olacak şekilde sade bir yapı kullan."
    )

    payload = {
        "contents": [
            {
                "parts": [{"text": prompt_text}]
            }
        ]
    }

    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(GEMINI_ENDPOINT, headers=headers, params=params, json=payload)
            response.raise_for_status()
            result = response.json()
            full_text = result["candidates"][0]["content"]["parts"][0]["text"]

            # Basit görev çıkarımı
            lines = full_text.split("\n")
            tasks = [
                line.strip().lstrip("-–1234567890. ")
                for line in lines
                if line.strip().startswith(("-", "–", "1.", "2.", "3."))
            ]

            logger.info(f"Plan başarıyla oluşturuldu: {data.goal}")
            return {"plan": full_text, "tasks": tasks}

        except httpx.HTTPStatusError as e:
            logger.error(f"Gemini API HTTP hatası: {e.response.status_code}")
            raise HTTPException(status_code=502, detail="Gemini API'den yanıt alınamadı.")
        except Exception as e:
            logger.exception("Bilinmeyen bir hata oluştu.")
            raise HTTPException(status_code=500, detail=f"Hata: {str(e)}")
