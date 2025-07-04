from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Literal
from services.gemini_api import generate_message
import re

router = APIRouter()

QUESTION_PATTERNS = [
    r"^what\s", r"^how\s", r"^who\s", r"^when\s", r"^why\s", r"^where\s",
    r"^give me", r"^tell me", r"^define", r"^translate",
    r"^write code", r"^generate.*html", r"\brecipe\b$", r"\bcook\b$",
]

LETTER_INTENT_KEYWORDS = [
    "letter", "message", "greeting", "thank", "congratulate", 
    "apology", "invite", "wish", "write to", "compose",
    "say", "tell", "note", "remind", "express", "make a letter"
]

OUT_OF_SCOPE_KEYWORDS = [
    "recipe", "how to cook", "ingredients", "code", "python", "javascript",
    "math problem", "solve", "equation", "weather", "news", "stock", "joke", "chat", "assistant"
]

def is_out_of_scope(prompt: str) -> bool:
    prompt_lower = re.sub(r"\s+", " ", prompt.lower().strip())
    
    if any(word in prompt_lower for word in LETTER_INTENT_KEYWORDS):
        return False
    
    for pattern in QUESTION_PATTERNS:
        if re.match(pattern, prompt_lower):
            return True
        
    return any(word in prompt_lower for word in OUT_OF_SCOPE_KEYWORDS)

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