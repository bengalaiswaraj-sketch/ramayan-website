import os

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from google import genai
from google.genai import types

from knowledge import SYSTEM_PROMPT

app = FastAPI(title="Ramayana Chatbot API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MAX_MESSAGE_LENGTH = 500
MAX_HISTORY_TURNS = 10

OFF_TOPIC_KEYWORDS = [
    "recipe", "stock market", "bitcoin", "crypto", "weather",
    "sports score", "movie review", "code", "programming",
    "python", "javascript", "sql", "machine learning",
    "write me a", "generate code", "hack", "password",
]


class ChatMessage(BaseModel):
    role: str
    text: str


class ChatRequest(BaseModel):
    message: str
    history: list[ChatMessage] = []


def is_off_topic(message: str) -> bool:
    lower = message.lower()
    hits = sum(1 for kw in OFF_TOPIC_KEYWORDS if kw in lower)
    return hits >= 2


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

    if is_off_topic(req.message):
        return {
            "reply": "I'm here to discuss the Ramayana and its textual history. Could you ask me something about that instead?"
        }

    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="API key not configured.")

    client = genai.Client(api_key=api_key)

    contents = build_contents(req.history, req.message)

    config = types.GenerateContentConfig(
        system_instruction=SYSTEM_PROMPT,
        temperature=0.7,
        max_output_tokens=512,
        thinking_config=types.ThinkingConfig(thinking_level="MINIMAL"),
    )

    def generate():
        for chunk in client.models.generate_content_stream(
            model="gemini-3.1-flash-lite",
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
