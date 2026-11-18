import asyncio
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.schemas.submission import SubmissionMessage, AIReportCallbackPayload
from app.services.submission_service import process_student_submission, send_report_to_spring
from app.services.rabbitmq_consumer import start_rabbitmq_consumer

