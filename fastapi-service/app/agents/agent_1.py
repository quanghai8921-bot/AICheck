import json
from typing import Dict, Any
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from app.config import get_llm
from app.utils.text_metrics import calculate_text_metrics

AGENT_1_SYSTEM_PROMPT
