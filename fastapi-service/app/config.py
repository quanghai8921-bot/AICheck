from pydantic_settings import BaseSettings
from langchain_ollama import ChatOllama

class Settings(BaseSettings):
    # App
    APP_NAME: str = "AICheck FastAPI AI Service"
    DEBUG: bool = True

    # Qwen Local (Ollama)
    OLLAMA_BASE_URL: str = "http://localhost:11434"
    OLLAMA_MODEL: str = "qwen2.5:3b"

    # RabbitMQ Settings
    RABBITMQ_URL: str = "amqp://guest:guest@localhost:5672/"
    SUBMISSION_QUEUE: str = "aicheck.submission.queue"

    # Spring Boot Backend Callback Settings
    SPRING_BASE_URL: str = "http://localhost:8080"
    SPRING_REPORT_CALLBACK_PATH: str = "/api/v1/internal/submissions/{answerId}/ai-report"

    class Config:
        env_file = ".env"
        extra = "allow"

settings = Settings()

def get_llm(temperature: float = 0.0) -> ChatOllama:
    """
    Khởi tạo mô hình Qwen local duy nhất chạy qua Ollama.
    Ép định dạng trả về luôn là JSON.
    """
    return ChatOllama(
        base_url=settings.OLLAMA_BASE_URL,
        model=settings.OLLAMA_MODEL,
        temperature=temperature,
        format="json"
    )
