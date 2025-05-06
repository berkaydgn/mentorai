# mentorai
17.GRUP - HACKATHON - YZTA
Giriş bilgileri: admin@test.com / 123

main.py içerisindeki generate_content_url bu görünümde olmalı = https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=GEMINI_API_KEY

# Yol Haritası Oluşturucu

Bu proje, kullanıcıların hedeflerine ulaşmak için özelleştirilmiş yol haritaları oluşturmasına yardımcı olan bir web uygulamasıdır. Google'ın Gemini API'sini kullanarak akıllı yol haritaları oluşturur.

## Özellikler

- Kullanıcı dostu arayüz
- Özelleştirilmiş yol haritaları
- Adım adım rehberlik
- Kaynak önerileri
- Tahmini süre hesaplamaları

## Kurulum

### Backend

1. Backend dizinine gidin:
```bash
cd backend
```

2. Sanal ortam oluşturun ve etkinleştirin:
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
```

3. Bağımlılıkları yükleyin:
```bash
pip install -r requirements.txt
```

4. `.env` dosyası oluşturun ve Gemini API anahtarınızı ekleyin:
```
GEMINI_API_KEY=your_api_key_here
GEMINI_MODEL=gemini_model_here
GEMINI_BASE_URL=gemini_base_url_here
```

5. Backend'i başlatın:
```bash
python main.py
```

### Frontend

1. Frontend dizinine gidin:
```bash
cd frontend
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Frontend'i başlatın:
```bash
npm start
```

## Kullanım

1. Tarayıcınızda `http://localhost:7000` adresine gidin
2. Hedefinizi veya öğrenmek istediğiniz konuyu yazın
3. "Yol Haritası Oluştur" butonuna tıklayın
4. Oluşturulan yol haritasını inceleyin

## Teknolojiler

- Frontend: React, Tailwind CSS
- Backend: FastAPI
- AI: Google Gemini API
