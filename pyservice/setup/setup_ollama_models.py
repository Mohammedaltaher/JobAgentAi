#!/usr/bin/env python
"""
A utility script to ensure all needed Ollama models are available in the WSL2 environment.
"""
import sys
import requests
import time
import subprocess
import logging
import os

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[logging.StreamHandler()],
)
logger = logging.getLogger("ollama_setup")

def get_wsl_ip():
    """Get the IP address of the WSL2 Ubuntu instance."""
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
        return "localhost"

def test_ollama_connection(api_base):
    """Test if Ollama service is running and accessible."""
    try:
        response = requests.get(f"{api_base}/api/version", timeout=5)
        if response.status_code == 200:
            logger.info(f"Connected to Ollama version: {response.json().get('version', 'unknown')}")
            return True
        logger.error(f"Ollama responded with status code {response.status_code}")
        return False
    except requests.exceptions.RequestException as e:
        logger.error(f"Failed to connect to Ollama: {e}")
        return False

def ensure_ollama_running():
    """Make sure Ollama is running in WSL2."""
    logger.info("Checking if Ollama is running in WSL2...")
    
    wsl_ip = get_wsl_ip()
    api_base = f"http://{wsl_ip}:11434"
    
    if test_ollama_connection(api_base):
        return api_base
    
    logger.info("Starting Ollama in WSL2...")
    try:
        subprocess.run(
            ["wsl", "-d", "Ubuntu", "--", "bash", "-c", "OLLAMA_HOST=0.0.0.0 nohup ollama serve > /tmp/ollama.log 2>&1 &"],
            check=True
        )
        # Give Ollama some time to start
        for i in range(5):
            time.sleep(2)
            if test_ollama_connection(api_base):
                logger.info("Ollama started successfully")
                return api_base
            logger.info(f"Waiting for Ollama to start (attempt {i+1}/5)...")
    except subprocess.CalledProcessError as e:
        logger.error(f"Failed to start Ollama in WSL2: {e}")
    
    # Try localhost as a fallback
    localhost_api = "http://localhost:11434"
    if test_ollama_connection(localhost_api):
        logger.info("Connected to Ollama on localhost")
        return localhost_api
    
    logger.error("Could not start or connect to Ollama. Please start it manually.")
    return None

def pull_model(api_base, model_name):
    """Pull a model if it's not already available."""
    # Check if model is already available
    try:
        response = requests.get(f"{api_base}/api/tags", timeout=5)
        if response.status_code == 200:
            models = response.json().get("models", [])
            for model in models:
                if model.get("name") == model_name:
                    logger.info(f"Model {model_name} is already available")
                    return True
    except requests.exceptions.RequestException as e:
        logger.error(f"Error checking model availability: {e}")
        return False
    
    # If not, try to pull it
    logger.info(f"Model {model_name} not found, pulling it...")
    try:
        print(f"Starting to pull model {model_name}. This may take several minutes...")
        response = requests.post(
            f"{api_base}/api/pull", 
            json={"name": model_name},
            timeout=1800  # 30 minutes timeout for large models
        )
        
        # The pull request returns a stream of JSON objects showing progress
        if response.status_code == 200:
            logger.info(f"Successfully pulled model {model_name}")
            return True
        else:
            logger.error(f"Failed to pull model: {response.status_code} - {response.text}")
            return False
    except requests.exceptions.RequestException as e:
        logger.error(f"Error pulling model: {e}")
        return False

def main():
    """Main function to set up Ollama and required models."""
    logger.info("Setting up Ollama and required models...")
    
    # Ensure Ollama is running
    api_base = ensure_ollama_running()
    if not api_base:
        sys.exit(1)
    
    # List of models to pull
    models = ["deepseek-r1:8b"]
    
    # Pull each model
    success = True
    for model in models:
        if not pull_model(api_base, model):
            logger.error(f"Failed to pull model {model}")
            success = False
    
    if success:
        logger.info("All models pulled successfully!")
    else:
        logger.warning("Some models could not be pulled. Check the logs for details.")
        sys.exit(1)

if __name__ == "__main__":
    main()
