@echo off
REM Start Ollama in WSL2 Ubuntu
wsl -d Ubuntu -- /usr/local/bin/start_ollama.sh
echo Ollama started in WSL2 Ubuntu
