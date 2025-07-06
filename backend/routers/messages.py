from fastapi import APIRouter, HTTPException
from services.gemini_api import generate_message
from utils import is_out_of_scope
from schemas.message import ComposeRequest

router = APIRouter()

@router.post("/compose-message")
async def compose_message(req: ComposeRequest):
    if is_out_of_scope(req.contentIdea):
        raise HTTPException(
            status_code=400,
            detail="Your prompt seems to be a general question or request. Sulat.ai is designed specifically to help write personal letters or messages, not answer general queries."
        )
    
    prompt = (
        f"Write a {req.messageLength} message in {req.language} for the following idea: '{req.contentIdea}'."
        f"Message type: {req.messageType.replace('-', ' ')}. "
        f"Occasion: {req.occasion if req.occasion != 'none' else 'normal day'}, "
        f"Tone: {', '.join(req.toneStyles)}. "
        f"Enhancements: {', '.join(req.enhancements) if req.enhancements else 'none'}."
    )
    result = await generate_message(prompt)
    return {"message": result}