from typing import Optional
from sqlmodel import SQLModel, Field

class Book(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    author: str
    year: Optional[int] = None
    isbn: Optional[str] = None
    description: Optional[str] = None
