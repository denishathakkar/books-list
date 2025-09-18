import os
from sqlmodel import SQLModel, create_engine, Session

DB_PATH = os.getenv("BOOKS_DB_PATH", "books.db")
DATABASE_URL = f"sqlite:///{DB_PATH}"

engine = create_engine(DATABASE_URL, echo=False, connect_args={"check_same_thread": False})

def init_db():
    from .models import Book  # ensure models are imported
    SQLModel.metadata.create_all(engine)

def get_session():
    return Session(engine)
