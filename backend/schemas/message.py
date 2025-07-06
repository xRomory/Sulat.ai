from pydantic import BaseModel
from typing import List, Literal

class ComposeRequest(BaseModel):
    contentIdea: str
    messageType: str
    toneStyles: List[str]
    occasion: str
    messageLength: Literal["short", "medium", "long"]
    language: Literal["english", "filipino", "taglish"]
    enhancements: List[str]