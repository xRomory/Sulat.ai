from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Literal, Optional

from services.gemini_api import generate_message

router = APIRouter()

class ComposeRequest(BaseModel):
    contentIdea: str
    messageType: str
    toneStyles: List[str]
    occasion: str
    messageLength: Literal["short", "medium", "long"]
    language: Literal["english", "filipino", "taglish"]
    enhancements: List[str]

@router.post("/compose-message")
async def compose_message(req: ComposeRequest):
    prompt = (
        f"Write a {req.messageLength} message in {req.language} for the following idea: '{req.contentIdea}'."
        f"Message type: {req.messageType.replace('-', ' ')}. "
        f"Occasion: {req.occasion if req.occasion != 'none' else 'normal day'}, "
        f"Tone: {', '.join(req.toneStyles)}. "
        f"Enhancements: {', '.join(req.enhancements) if req.enhancements else 'none'}."
    )
    result = await generate_message(prompt)
    return {"message": result}