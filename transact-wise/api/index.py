import os
from dotenv import load_dotenv

import pandas as pd
from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
from skllm import ZeroShotGPTClassifier
from skllm.config import SKLLMConfig


class TextModel(BaseModel):
    text: str


dotenv_path = ".env"
load_dotenv(dotenv_path)

df = pd.read_csv('/projects/bo/TransactWise/transact-wise/api/Sample_Full_Transactions_Positive.csv')
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
async def classify_text(text_model: TextModel):
    text = text_model.text
    if not text:
        return {"error": "Text cannot be empty."}

    predicted_label = clf.predict([text])[0]
    return {"predicted_label": predicted_label}


@app.post("/api/classify-file")
async def classify_text(file: UploadFile = File(...)):
    dataframe = pd.read_csv(file.file)
    # Assume dataframe has a 'Description' column for classification
    descriptions = dataframe['Description'].tolist()

    predicted_categories = clf.predict(descriptions)

    # Add predictions to dataframe and return as JSON
    dataframe['PredictedCategory'] = predicted_categories
    return dataframe.to_dict(orient='records')
