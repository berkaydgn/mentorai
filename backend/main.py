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
    allow_origins=["*"],  # Tüm originlere izin ver
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
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
        print(f"Received request for topic: {request.topic}")
        
        # Gemini API'ye gönderilecek prompt
        system_prompt = f"""
        Aşağıdaki konuda detaylı bir yol haritası oluştur. Yanıtı KESİNLİKLE aşağıdaki JSON formatında ver ve her zaman tam olarak 12 adım içermelidir.
        JSON formatı şu şekilde olmalıdır:

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
                }},
                {{
                    "step": 2,
                    "title": "Adım Başlığı",
                    "description": "Adım açıklaması",
                    "estimated_time": "Tahmini süre",
                    "resources": ["Kaynak 1", "Kaynak 2"]
                }}
                // ... diğer adımlar ...
            ],
            "total_estimated_time": "Toplam tahmini süre"
        }}

        ÖNEMLİ KURALLAR:
        1. Her zaman tam olarak 12 adım oluşturmalısın
        2. Adımlar mantıksal bir sırayla olmalıdır
        3. Her adımda title, description, estimated_time ve resources alanları olmalıdır
        4. Yanıt SADECE JSON formatında olmalıdır, başka hiçbir açıklama veya metin içermemelidir
        5. JSON formatına tam olarak uymalısın

        Kullanıcı İsteği: {request.topic}
        """
        
        print("Sending request to Gemini API...")
        print("Prompt:", system_prompt)

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
                    "response_mime_type": "application/json",
                    "temperature": 0.1,
                    "top_p": 0.8,
                    "top_k": 40
                }
            }
        )

        print(f"Gemini API Response Status: {response.status_code}")
        print(f"Gemini API Response: {response.text}")

        # Hata durumunda 500 iç hatasını dön
        if response.status_code != 200:
            print(f"Error {response.status_code}: {response.text}")
            raise HTTPException(status_code=500, detail="API request failed")

        try:
            response_data = response.json()
            print("Parsed response data:", response_data)
            
            # Yanıtı doğrudan döndür
            return {"roadmap": response_data}
        except ValueError as e:
            print("JSON parse error:", e)
            print("Raw response:", response.text)
            raise HTTPException(status_code=500, detail="Beklenen JSON formatında bir yanıt alınamadı.")

    except Exception as e:
        print("General error:", str(e))
        raise HTTPException(status_code=500, detail=str(e))

# Uvicorn ile çalıştırma
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=9000)