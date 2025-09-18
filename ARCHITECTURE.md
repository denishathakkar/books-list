
# BookList Application – Sequence Diagrams & API Details

## Sequence Diagrams

### 1) List all books
```mermaid
sequenceDiagram
  participant FE as Frontend (React)
  participant BE as Backend (FastAPI)
  participant DB as Database (SQLite)

  FE->>BE: GET /books
  BE->>DB: SELECT * FROM books ORDER BY id
  DB-->>BE: rows[]
  BE-->>FE: 200 OK + JSON [Book]
```

### 2) Get a single book
```mermaid
sequenceDiagram
  participant FE as Frontend (React)
  participant BE as Backend (FastAPI)
  participant DB as Database (SQLite)

  FE->>BE: GET /books/{id}
  BE->>DB: SELECT * FROM books WHERE id = {id}
  alt Book found
    DB-->>BE: row
    BE-->>FE: 200 OK + JSON Book
  else Not found
    DB-->>BE: null
    BE-->>FE: 404 Not Found + {"detail":"Book not found"}
  end
```

### 3) Create a book
```mermaid
sequenceDiagram
  participant FE as Frontend (React)
  participant BE as Backend (FastAPI)
  participant DB as Database (SQLite)

  FE->>BE: POST /books (title, author, year?, isbn?, description?)
  alt Validation passes (Pydantic)
    BE->>DB: INSERT INTO books (...)
    DB-->>BE: inserted row with id
    BE-->>FE: 201 Created + JSON Book
  else Validation error
    BE-->>FE: 422 Unprocessable Entity + validation details
  end
```

### 4) Update a book
```mermaid
sequenceDiagram
  participant FE as Frontend (React)
  participant BE as Backend (FastAPI)
  participant DB as Database (SQLite)

  FE->>BE: PUT /books/{id} (partial or full payload)
  BE->>DB: SELECT * FROM books WHERE id = {id}
  alt Book found
    BE->>DB: UPDATE books SET ... WHERE id = {id}
    DB-->>BE: updated row
    BE-->>FE: 200 OK + JSON Book
  else Not found
    BE-->>FE: 404 Not Found + {"detail":"Book not found"}
  end
```

### 5) Delete a book
```mermaid
sequenceDiagram
  participant FE as Frontend (React)
  participant BE as Backend (FastAPI)
  participant DB as Database (SQLite)

  FE->>BE: DELETE /books/{id}
  BE->>DB: SELECT * FROM books WHERE id = {id}
  alt Book found
    BE->>DB: DELETE FROM books WHERE id = {id}
    DB-->>BE: success
    BE-->>FE: 204 No Content
  else Not found
    BE-->>FE: 404 Not Found + {"detail":"Book not found"}
  end
```

### 6) Health check
```mermaid
sequenceDiagram
  participant FE as Frontend (React)
  participant BE as Backend (FastAPI)

  FE->>BE: GET /health
  BE-->>FE: 200 OK + {"status":"ok"}
```
