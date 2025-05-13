# logger_config.py
import logging
from logging.handlers import TimedRotatingFileHandler
import os

# Create logs directory if it doesn't exist
log_dir = "logs"
os.makedirs(log_dir, exist_ok=True)

# Logger setup
logger = logging.getLogger("app_logger")
logger.setLevel(logging.INFO)

# Avoid duplicate handlers on reload
if not logger.handlers:
    handler = TimedRotatingFileHandler(
        filename=os.path.join(log_dir, "app.log"),
        when="midnight",
        interval=1,
        backupCount=7,
        encoding="utf-8"
    )
    formatter = logging.Formatter(
        "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    )
    handler.setFormatter(formatter)
    logger.addHandler(handler)
    handler.suffix = "%Y-%m-%d"

# Optional: avoid propagating to root logger
logger.propagate = False
