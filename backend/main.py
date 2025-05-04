from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import requests
from dotenv import load_dotenv


load_dotenv()

# FastAPI uygulaması
app = FastAPI()

# CORS ayarları
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:7000"],  # frontend için izin verilen URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API URL'si ve API Key'i doğrudan burada yazıyoruz
generate_content_url = f"{os.getenv('GEMINI_BASE_URL')}/models/{os.getenv('GEMINI_MODEL')}:generateContent?key={os.getenv('GEMINI_API_KEY')}"

print("Gemini API URL:", generate_content_url)

# Kullanıcıdan gelen istek için modelin aldığı veriyi tanımlıyoruz
class PromptRequest(BaseModel):
    topic: str

@app.post("/generate-roadmap")
async def generate_roadmap(request: PromptRequest):
    try:
        # Gemini API'ye gönderilecek prompt
        system_prompt = f"""
        Aşağıdaki konuda detaylı bir yol haritası oluştur. Yanıtı kesinlikle aşağıdaki JSON formatında ver:
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

        # Gemini API'ye POST isteği gönder
        response = requests.post(
            generate_content_url,
            headers={"Content-Type": "application/json"},
            json={
                "contents": [
                    {
                        "parts": [{"text": system_prompt}]
                    }
                ],
                "generation_config": {
                    "response_mime_type": "application/json"
                }
            }
        )

        # Hata durumunda 500 iç hatasını dön
        if response.status_code != 200:
            print(f"Error {response.status_code}: {response.text}")  # Hata detaylarını yazdır
            raise HTTPException(status_code=500, detail="API request failed")

        try:
            response_data = response.json()
            # Doğrudan 'roadmap' alanını döndürmeyi dene
            return {"roadmap": response_data}
        except ValueError:
            # Eğer JSON çözme hatası olursa (beklenmeyen bir yanıt)
            print("JSON çözme hatası:", response.text)
            raise HTTPException(status_code=500, detail="Beklenen JSON formatında bir yanıt alınamadı.")

    except Exception as e:
        # Genel hata durumunda
        raise HTTPException(status_code=500, detail=str(e))

# Uvicorn ile çalıştırma
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=9000)