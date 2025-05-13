#!/bin/bash
docker-compose up --build -d
echo "Application is running:"
echo "- Frontend: http://localhost:4200"
echo "- Backend API: http://localhost:5000"
echo "- Python Service: http://localhost:8000"
