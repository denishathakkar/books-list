# backend/app/main.py
from typing import List
from fastapi import FastAPI, HTTPException, status, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from .db import init_db, get_session
from .models import Book
from .schema import BookCreate, BookUpdate  # <-- add BookUpdate

init_db()
app = FastAPI(title="BookList API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174", "http://127.0.0.1:5174"],
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

@app.get("/books/{book_id}", response_model=Book)
def get_book(book_id: int):
    with get_session() as session:
        book = session.get(Book, book_id)
        if not book:
            raise HTTPException(status_code=404, detail="Book not found")
        return book

@app.put("/books/{book_id}", response_model=Book)
def update_book(book_id: int, payload: BookUpdate):
    with get_session() as session:
        book = session.get(Book, book_id)
        if not book:
            raise HTTPException(status_code=404, detail="Book not found")
        for field, value in payload.model_dump(exclude_unset=True).items():
            setattr(book, field, value)
        session.add(book)
        session.commit()
        session.refresh(book)
        return book

@app.delete("/books/{book_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_book(book_id: int):
    with get_session() as session:
        book = session.get(Book, book_id)
        if not book:
            raise HTTPException(status_code=404, detail="Book not found")
        session.delete(book)
        session.commit()
        return JSONResponse(status_code=status.HTTP_204_NO_CONTENT, content=None)
