@echo off
REM Setup Ollama models for JobAgentAI
echo Setting up Ollama models for JobAgentAI...
cd %~dp0pyservice
python setup_ollama_models.py
if %ERRORLEVEL% NEQ 0 (
    echo There was an error setting up the Ollama models.
    echo Please check the logs and make sure Ollama is installed in your WSL2 Ubuntu.
    echo You may need to install Ollama manually in WSL2 using:
    echo wsl -d Ubuntu -- bash -c "curl -fsSL https://ollama.com/install.sh | sh"
    pause
    exit /b 1
)
echo Setup complete!
pause
