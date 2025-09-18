from fastapi import FastAPI

app = FastAPI(title="BookList API")

@app.get("/health")
def health():
    return {"status": "ok"}