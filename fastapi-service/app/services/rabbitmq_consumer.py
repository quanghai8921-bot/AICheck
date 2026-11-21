import json
import asyncio
import logging
import aio_pika
from app.config import settings
from app.schemas.submission import SubmissionMessage
from app.services.submission_service import process_student_submission, send_report_to_spring

logger = logging.getLogger(__name__)

async def start_rabbitmq_consumer():
    """
    Lắng nghe hàng đợi RabbitMQ để tiếp nhận bài nộp từ Spring Boot.
    """

