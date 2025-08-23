from pydantic import BaseSettings
import logging


class Settings(BaseSettings):
    GOOGLE_API_KEY: str | None = None
    QDRANT_URL: str = "http://localhost:6333"
    QDRANT_API_KEY: str | None = None
    DEFAULT_ADMIN_PASSWORD: str = "ChangeMeHardCoded123!"  # REQUIRED by spec: hard-coded
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

# warn about hard-coded password
if settings.DEFAULT_ADMIN_PASSWORD:
    logger.warning("DEFAULT_ADMIN_PASSWORD is hard-coded. This is insecure by design for this project.")
