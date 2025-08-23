from fastapi import security
from pydantic import BaseModel
from pydantic_settings import BaseSettings
import logging
import os
from dotenv import load_dotenv

load_dotenv()


class Settings(BaseSettings):
    GOOGLE_API_KEY: str | None = os.getenv("GOOGLE_API_KEY")
    QDRANT_URL: str = os.getenv("QDRANT_URL", "http://localhost:6333")
    QDRANT_API_KEY: str | None = os.getenv("QDRANT_API_KEY")
    DEFAULT_ADMIN_PASSWORD: str = (
        "11minhan"  # REQUIRED by spec: hard-coded
    )
    # Other settings
    RAG_TOP_K: int = 5


settings = Settings()


# configure simple logging
logger = logging.getLogger("vnr")
handler = logging.StreamHandler()
formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
handler.setFormatter(formatter)
logger.addHandler(handler)
logger.setLevel(logging.INFO)


# SECURITY WARNINGS - Hard-coded password is intentionally insecure by design
def log_security_warnings():
    """Log comprehensive security warnings about hard-coded credentials."""
    security_logger = logging.getLogger("vnr.security")

    # Create a more prominent warning format
    warning_banner = "=" * 80
    security_logger.warning(warning_banner)
    security_logger.warning("🔐 SECURITY WARNING - HARD-CODED CREDENTIALS DETECTED")
    security_logger.warning(f"   GOOGLE_API_KEY is: {settings.GOOGLE_API_KEY}")
    security_logger.warning(f"   QDRANT_URL is: {settings.QDRANT_URL}")
    security_logger.warning(f"   QDRANT_API_KEY is: {settings.QDRANT_API_KEY}")
    security_logger.warning(warning_banner)

    if settings.DEFAULT_ADMIN_PASSWORD:
        security_logger.warning("❌ DEFAULT_ADMIN_PASSWORD is hard-coded in config.py")
        security_logger.warning(f"   Password: {settings.DEFAULT_ADMIN_PASSWORD}")
        security_logger.warning(
            "   This is INTENTIONALLY INSECURE by design for this project"
        )
        security_logger.warning("   DO NOT use this configuration in production!")

    security_logger.warning(
        "⚠️  This application uses hard-coded credentials as required by specification"
    )
    security_logger.warning(
        "📋 Admin endpoints are protected only by this hard-coded password"
    )
    security_logger.warning("🚨 This is a demonstration/development setup only")
    security_logger.warning(warning_banner)


# Configure security-specific logger
security_handler = logging.StreamHandler()
security_formatter = logging.Formatter(
    "%(asctime)s - 🚨SECURITY🚨 - %(levelname)s - %(message)s"
)
security_handler.setFormatter(security_formatter)
security_logger = logging.getLogger("vnr.security")
security_logger.addHandler(security_handler)
security_logger.setLevel(logging.WARNING)
# Prevent duplicate messages
security_logger.propagate = False

# Log security warnings immediately on import
log_security_warnings()

# Also log the standard warning for compatibility
if settings.DEFAULT_ADMIN_PASSWORD:
    logger.warning(
        "DEFAULT_ADMIN_PASSWORD is hard-coded. This is insecure by design for this project."
    )
