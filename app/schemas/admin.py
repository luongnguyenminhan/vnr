from pydantic import BaseModel
from typing import Optional, List


class UploadCorpusRequest(BaseModel):
    collection: str
    password: str
    url: Optional[str] = None


class CorpusMeta(BaseModel):
    name: str
    doc_count: int = 0


class IndexStatus(BaseModel):
    collections: List[CorpusMeta]
