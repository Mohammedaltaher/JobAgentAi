import datetime
import logging
import os
import uuid
from app.agents.cv_extractor.tools import get_agent_instruction
from dotenv import load_dotenv
from google.adk.agents import Agent
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.adk.memory import InMemoryMemoryService
from google.genai import types
from google.adk.models.lite_llm import LiteLlm

import asyncio
from os import getenv

# Configure logging to file in logs folder with current date
log_date = datetime.datetime.now().strftime("%Y%m%d")
log_filename = os.path.join(os.getcwd(), "logs", f"Cv_Extractor_Agent_{log_date}.log")
os.makedirs(os.path.dirname(log_filename), exist_ok=True)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[
        logging.FileHandler(log_filename, encoding="utf-8"),
        logging.StreamHandler(),
    ],
)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv(".env")
my_model = getenv("MODEL_GEMINI_2_0_FLASH")
ollama_model = LiteLlm(model="ollama_chat/gemma3:4b")

root_agent = Agent(
    name="agent_manager",
    model=ollama_model,
    description="""
               The CV Extraction Agent is designed to parse unstructured plain text CVs or resumes and convert them into a structured JSON format.
            """,
    instruction=get_agent_instruction(),
)

session_service = InMemorySessionService()
memory_service = InMemoryMemoryService()

my_session = session_service.create_session(
    app_name="cv_extraction",
    user_id="123",
    session_id="123",
    state={"initial_key": "initial_value"},
)

runner = Runner(
    agent=root_agent,
    app_name="cv_extraction",
    session_service=session_service,
    memory_service=memory_service,
)


async def call_agent(query: str) -> str:
    content = types.Content(role="user", parts=[types.Part(text=query)])
    logger.info(f"Running Query: {query}")
    final_response_text = "No final text response captured."

    async for event in runner.run_async(
        user_id="123", session_id="123", new_message=content
    ):
        if event.is_final_response():
            final_response_text = event.content.parts[0].text
            logger.info(f"Final Response: {final_response_text}")
            return final_response_text

    return final_response_text
