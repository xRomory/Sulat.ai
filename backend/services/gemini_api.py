import httpx
import os
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

async def generate_message(prompt: str) -> str:
    headers = {
        "Content-Type": "application/json",
    }

    params = {
        "key": GEMINI_API_KEY,
    }

    payload = {
        "contents": [
            {
                "parts": [
                    { "text": prompt }
                ]
            }
        ]
    }

    async with httpx.AsyncClient(timeout=30.0) as client:
        response = await client.post(GEMINI_API_URL, headers=headers, params=params, json=payload)

        if response.status_code == 200:
            data = response.json()

            try:
                return data["candidates"][0]["content"]["parts"][0]["text"]
            except (KeyError, IndexError):
                try:
                    return data["candidates"][0]["contents"]["parts"][0]["text"]
                except (KeyError, IndexError):
                    return "No message generated."
            
        else:
            return f"Error: {response.status_code} - {response.text}"