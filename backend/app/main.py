from typing import List
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from .db import init_db, get_session
from .models import Book
from .schema import BookCreate

init_db()
app = FastAPI(title="BookList API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/books", response_model=List[Book])
def list_books():
    with get_session() as session:
        return session.query(Book).order_by(Book.id).all()

@app.post("/books", status_code=status.HTTP_201_CREATED, response_model=Book)
def create_book(payload: BookCreate):
    with get_session() as session:
        book = Book(**payload.model_dump())
        session.add(book)
        session.commit()
        session.refresh(book)
        return book
