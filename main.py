from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import requests
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# CORS ayarları
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:7000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ortam değişkenleri
API_KEY = os.getenv("GEMINI_API_KEY")
MODEL_NAME = os.getenv("GEMINI_MODEL")
BASE_URL = os.getenv("GEMINI_BASE_URL")

# İstek atılacak tam URL
FULL_URL = f"{BASE_URL}/models/{MODEL_NAME}:generateContent?key={API_KEY}"

class PromptRequest(BaseModel):
    topic: str

@app.post("/generate-roadmap")
async def generate_roadmap(request: PromptRequest):
    try:
        prompt_text = f"""
        Kullanıcının aşağıdaki isteğine göre bir yol haritası oluştur.
        Yanıtı aşağıdaki JSON formatında ver:
        {{
            "title": "Yol Haritası Başlığı",
            "description": "Genel açıklama",
            "steps": [
                {{
                    "step": 1,
                    "title": "Adım Başlığı",
                    "description": "Adım açıklaması",
                    "estimated_time": "Tahmini süre",
                    "resources": ["Kaynak 1", "Kaynak 2"]
                }}
            ],
            "total_estimated_time": "Toplam tahmini süre"
        }}

        Kullanıcı İsteği: {request.topic}
        """

        response = requests.post(
            FULL_URL,
            headers={"Content-Type": "application/json"},
            json={
                "contents": [
                    {
                        "parts": [{"text": prompt_text}]
                    }
                ]
            }
        )

        if response.status_code != 200:
            raise Exception(response.json())

        roadmap_text = response.json()["candidates"][0]["content"]["parts"][0]["text"]
        return {"roadmap": roadmap_text}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=9000) 