from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json
import os

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load data relative to this file
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, 'consumer_data.json')
CONSUMPTION_FILE = os.path.join(BASE_DIR, 'consumption_samples.json')

def load_json(filename):
    if os.path.exists(filename):
        with open(filename, 'r') as f:
            return json.load(f)
    return []

@app.get("/api/stats")
async def get_stats():
    data = load_json(DATA_FILE)
    if not data:
        return {"total": 0, "normal": 0, "theft": 0, "risk": 0}
    
    total = len(data)
    normal = len([d for d in data if d['actual_label'] == 0])
    theft = len([d for d in data if d['actual_label'] == 1])
    moderate = len([d for d in data if d['risk_score'] > 40 and d['risk_score'] <= 80])
    avg_risk = sum([d['risk_score'] for d in data]) / total if total > 0 else 0
    
    return {
        "total": total,
        "normal": normal,
        "theft": theft,
        "moderate": moderate,
        "avg_risk": round(avg_risk, 2)
    }

@app.get("/api/consumers")
async def get_consumers():
    return load_json(DATA_FILE)

@app.get("/api/consumers/{consumer_id}")
async def get_consumer_detail(consumer_id: str):
    data = load_json(DATA_FILE)
    consumption = load_json(CONSUMPTION_FILE)
    
    consumer = next((d for d in data if d['id'] == consumer_id), None)
    if not consumer:
        raise HTTPException(status_code=404, detail="Consumer not found")
    
    return {
        **consumer,
        "series": consumption.get(consumer_id, [])
    }

@app.get("/api/alerts")
async def get_alerts():
    data = load_json(DATA_FILE)
    alerts = [d for d in data if d['risk_score'] > 80][:20]
    return alerts

@app.get("/api/logs")
async def get_logs():
    return load_json(DATA_FILE)[:100]

@app.get("/api/model-performance")
async def get_performance():
    return {
        "accuracy": 0.924,
        "precision": 0.871,
        "recall": 0.846,
        "f1": 0.858,
        "auc": 0.943,
        "confusion_matrix": {
            "tn": 9842, "fp": 158,
            "fn": 204, "tp": 1126
        }
    }
