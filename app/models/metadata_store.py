import json
from pathlib import Path
from typing import Dict

STORE_PATH = Path(__file__).parent.parent / "_metadata.json"


def _read() -> Dict:
    if not STORE_PATH.exists():
        return {}
    try:
        return json.loads(STORE_PATH.read_text())
    except Exception:
        return {}


def _write(d: Dict):
    STORE_PATH.write_text(json.dumps(d))


def set_collection(name: str, meta: Dict):
    d = _read()
    d[name] = meta
    _write(d)


def get_all():
    return _read()


def delete_collection(name: str):
    d = _read()
    if name in d:
        d.pop(name)
        _write(d)
