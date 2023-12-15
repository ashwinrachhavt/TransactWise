from fastapi import FastAPI, Body, Request
import pandas as pd
import numpy as np
from skllm.config import SKLLMConfig
from skllm import ZeroShotGPTClassifier
import os

import dotenv

dotenv_path = "/workspaces/TransactWise/transact-wise/.env"
dotenv.load_dotenv(dotenv_path)

df = pd.read_csv('/workspaces/TransactWise/transact-wise/api/Sample_Full_Transactions_Positive.csv')
X, y = df["Description"], df["Chart of Account Category"]

# Initialize Scikit-LLM model (move inside app for better access)
SKLLMConfig.set_openai_key(os.environ["OPENAI_API_KEY"])
clf = ZeroShotGPTClassifier(openai_model="gpt-4")
clf.fit(X, y)


app = FastAPI(docs_url="/api/docs", openapi_url="/api/openapi.json")

# Health check endpoint
@app.get("/api/healthchecker")
def healthchecker():
    return {"status": "success", "message": "Integrate FastAPI Framework with Next.js"}

# Prediction endpoint for text classification
@app.post("/api/classify")
async def classify_text(text: str, request: Request):
    # Validate input text
    if not text:
        return request.state.bad_request({"error": "Text cannot be empty."})

    # Predict label and return response
    predicted_label = clf.predict([text])[0]
    return {"predicted_label": predicted_label}

