from datetime import datetime, timezone
import re

# UTCnow 
def utcnow():
    return datetime.now(timezone.utc)

#---------- Out of Scope Context for User Prompt ----------
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