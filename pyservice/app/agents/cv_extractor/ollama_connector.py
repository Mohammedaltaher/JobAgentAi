import logging
import subprocess
import time
import requests
from os import getenv
from dotenv import load_dotenv

logger = logging.getLogger(__name__)

def get_wsl_ip():
    """
    Get the IP address of the WSL2 Ubuntu instance.
    Returns localhost if the command fails.
    """
    try:
        result = subprocess.run(
            ["wsl", "-d", "Ubuntu", "--", "bash", "-c", "ip addr show eth0 | grep -oP '(?<=inet\\s)\\d+(\.\\d+){3}'"],
            capture_output=True,
            text=True,
            check=True
        )
        return result.stdout.strip()
    except Exception as e:
        logger.error(f"Failed to get WSL IP: {e}")
        return "localhost"  # Fallback to localhost if WSL command fails

def test_ollama_connection(api_base, max_retries=3, retry_delay=2):
    """
    Test the connection to Ollama and verify it's responding.
    Returns True if connection succeeds, False otherwise.
    """
    for attempt in range(max_retries):
        try:
            response = requests.get(f"{api_base}/api/version", timeout=5)
            if response.status_code == 200:
                logger.info(f"Successfully connected to Ollama: {response.json()}")
                return True
            logger.warning(f"Ollama responded with status code {response.status_code}")
        except requests.exceptions.RequestException as e:
            logger.warning(f"Attempt {attempt+1}/{max_retries} failed: {e}")
            if attempt < max_retries - 1:
                logger.info(f"Retrying in {retry_delay} seconds...")
                time.sleep(retry_delay)
    return False

def check_model_availability(api_base, model_name):
    """
    Check if a specific model is available in Ollama.
    Returns True if the model is available, False otherwise.
    """
    try:
        response = requests.get(f"{api_base}/api/tags", timeout=5)
        if response.status_code == 200:
            models = response.json().get("models", [])
            for model in models:
                if model.get("name") == model_name.replace("ollama_chat/", ""):
                    logger.info(f"Model {model_name} is available")
                    return True
            logger.warning(f"Model {model_name} is not available in Ollama")
        else:
            logger.warning(f"Failed to get models list, status code: {response.status_code}")
    except requests.exceptions.RequestException as e:
        logger.error(f"Error checking model availability: {e}")
    return False

def pull_model_if_needed(api_base, model_name):
    """
    Pull a model if it's not already available.
    Returns True if the model is available or was successfully pulled, False otherwise.
    """
    model_name_clean = model_name.replace("ollama_chat/", "")
    
    # Check if model is already available
    if check_model_availability(api_base, model_name):
        return True
    
    # If not, try to pull it
    logger.info(f"Model {model_name_clean} not found, attempting to pull it...")
    try:
        # Pull the model
        response = requests.post(
            f"{api_base}/api/pull", 
            json={"name": model_name_clean},
            timeout=300  # Longer timeout for model pulling
        )
        
        if response.status_code == 200:
            logger.info(f"Successfully pulled model {model_name_clean}")
            return True
        else:
            logger.error(f"Failed to pull model {model_name_clean}: {response.status_code} - {response.text}")
    except requests.exceptions.RequestException as e:
        logger.error(f"Error pulling model {model_name_clean}: {e}")
    
    return False

def get_ollama_connection():
    """
    Set up the connection to Ollama.
    Returns the API base URL and model name to use.
    """
    # Try to connect to Ollama in WSL2
    WSL2_IP = get_wsl_ip()
    logger.info(f"Using WSL2 IP for Ollama: {WSL2_IP}")
    OLLAMA_API_BASE = f"http://{WSL2_IP}:11434"

    # Test the connection and fall back if needed
    if not test_ollama_connection(OLLAMA_API_BASE):
        logger.warning("Could not connect to Ollama in WSL2, falling back to localhost")
        OLLAMA_API_BASE = "http://localhost:11434"
        if not test_ollama_connection(OLLAMA_API_BASE):
            logger.error("Could not connect to Ollama on localhost either. Please ensure Ollama is running.")
            return None, None

    # Get the model name from environment
    model_name = getenv("OLLAMA_MODEL", "ollama_chat/deepseek-r1:8b")
    
    # Make sure the model is available
    if not pull_model_if_needed(OLLAMA_API_BASE, model_name):
        logger.error(f"Could not ensure model {model_name} is available. Please pull it manually.")
        return OLLAMA_API_BASE, None
    
    logger.info(f"Ollama connection ready with API base {OLLAMA_API_BASE} and model {model_name}")
    return OLLAMA_API_BASE, model_name
