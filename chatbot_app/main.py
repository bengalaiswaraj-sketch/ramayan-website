import os
import re

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from google import genai
from google.genai import types

from knowledge import SYSTEM_PROMPT, GUARDRAIL_POLITE_RESPONSE, SPIRITUAL_DOMAIN_KEYWORDS, EXPLICIT_OFF_TOPIC_KEYWORDS

app = FastAPI(title="Ramayana Scripture Guide API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MAX_MESSAGE_LENGTH = 900
MAX_HISTORY_TURNS = 10

FOLLOW_UP_REGEX = re.compile(
    r"(^(why|how|when|where|who|which|what about|and |so |but |then )|tell me more|explain more|simpler|simple words|proof|evidence|verse|shloka|manuscript|source|this|that|it|he|she|they|in hindi|summarize)",
    re.IGNORECASE,
)


class ChatMessage(BaseModel):
    role: str
    text: str


class ChatRequest(BaseModel):
    message: str
    history: list[ChatMessage] = []


def is_outside_spiritual_domain(message: str, history: list[ChatMessage]) -> bool:
    lower = message.lower().strip()
    has_spiritual = any(kw in lower for kw in SPIRITUAL_DOMAIN_KEYWORDS)
    has_off_topic = any(kw in lower for kw in EXPLICIT_OFF_TOPIC_KEYWORDS)

    if has_off_topic and not has_spiritual:
        return True

    if has_spiritual:
        return False

    # Allow contextual follow-ups when there is prior conversation history
    if len(history) > 0 and (FOLLOW_UP_REGEX.search(lower) or len(lower.split()) <= 10):
        return False

    return True


def build_contents(history: list[ChatMessage], user_message: str) -> list[types.Content]:
    contents = []
    for msg in history[-MAX_HISTORY_TURNS * 2:]:
        role = "user" if msg.role == "user" else "model"
        contents.append(
            types.Content(role=role, parts=[types.Part.from_text(text=msg.text)])
        )
    contents.append(
        types.Content(role="user", parts=[types.Part.from_text(text=user_message)])
    )
    return contents


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.post("/chat")
async def chat(req: ChatRequest):
    if not req.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty.")

    if len(req.message) > MAX_MESSAGE_LENGTH:
        raise HTTPException(
            status_code=400,
            detail=f"Message too long. Please keep your question under {MAX_MESSAGE_LENGTH} characters.",
        )

    if is_outside_spiritual_domain(req.message, req.history):
        def guardrail_stream():
            yield GUARDRAIL_POLITE_RESPONSE
        return StreamingResponse(guardrail_stream(), media_type="text/plain")

    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="API key not configured.")

    client = genai.Client(api_key=api_key)

    contents = build_contents(req.history, req.message)

    config = types.GenerateContentConfig(
        system_instruction=SYSTEM_PROMPT,
        temperature=0.6,
        max_output_tokens=512,
        thinking_config=types.ThinkingConfig(thinking_level="MINIMAL"),
    )

    def generate():
        for chunk in client.models.generate_content_stream(
            model="gemini-3.5-flash-lite",
            contents=contents,
            config=config,
        ):
            if text := chunk.text:
                yield text

    return StreamingResponse(generate(), media_type="text/plain")


if __name__ == "__main__":
    import uvicorn

    port = int(os.environ.get("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)
