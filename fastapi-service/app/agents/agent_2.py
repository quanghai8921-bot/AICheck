import json
from typing import Dict, Any, Optional
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from app.config import get_llm

AGENT_2_SYSTEM_PROMPT 