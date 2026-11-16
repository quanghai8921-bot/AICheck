import httpx
import logging
from typing import Dict, Any
from app.config import settings
from app.schemas.submission import SubmissionMessage, AIReportCallbackPayload, StylometryData
from app.agents.agent_1 import analyze_submission_agent_1
from app.agents.agent_2 import compare_and_judge_agent_2
