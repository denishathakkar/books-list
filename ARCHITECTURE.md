# BookList Application – Sequence Diagrams & API Details

## All Flows in One Diagram

```mermaid
sequenceDiagram
  autonumber
  participant FE as Frontend (React)
  participant BE as Backend (FastAPI)
  participant DB as Database (SQLite)

  %% ===== Health =====
  rect rgba(56,189,248,0.10)
    note over FE,BE: Health Check
    FE->>BE: GET /health
    BE-->>FE: 200 OK {"status":"ok"}
  end

  %% ===== List =====
  rect rgba(99,102,241,0.10)
    note over FE,DB: List all books
    FE->>BE: GET /books
    BE->>DB: SELECT * FROM books ORDER BY id
    DB-->>BE: rows[]
    BE-->>FE: 200 OK + JSON [Book]
  end

  %% ===== Get One =====
  rect rgba(34,197,94,0.10)
    note over FE,DB: Get a single book
    FE->>BE: GET /books/{id}
    BE->>DB: SELECT * FROM books WHERE id={id}
    alt found
      DB-->>BE: row
      BE-->>FE: 200 OK + JSON Book
    else not found
      DB-->>BE: null
      BE-->>FE: 404 Not Found {"detail":"Book not found"}
    end
  end

  %% ===== Create =====
  rect rgba(251,191,36,0.12)
    note over FE,DB: Create a book
    FE->>BE: POST /books (title, author, year?, isbn?, description?)
    alt valid payload
      BE->>DB: INSERT INTO books (...)
      DB-->>BE: inserted row with id
      BE-->>FE: 201 Created + JSON Book
    else validation fails
      BE-->>FE: 422 Unprocessable Entity {"detail":[...]}
    end
  end

  %% ===== Update =====
  rect rgba(244,114,182,0.12)
    note over FE,DB: Update a book
    FE->>BE: PUT /books/{id} (BookUpdate partial/full)
    BE->>DB: SELECT * FROM books WHERE id={id}
    alt found
      BE->>DB: UPDATE books SET ... WHERE id={id}
      DB-->>BE: updated row
      BE-->>FE: 200 OK + JSON Book
    else not found
      BE-->>FE: 404 Not Found {"detail":"Book not found"}
    end
  end

  %% ===== Delete =====
  rect rgba(248,113,113,0.12)
    note over FE,DB: Delete a book
    FE->>BE: DELETE /books/{id}
    BE->>DB: SELECT * FROM books WHERE id={id}
    alt found
      BE->>DB: DELETE FROM books WHERE id={id}
      DB-->>BE: success
      BE-->>FE: 204 No Content
    else not found
      BE-->>FE: 404 Not Found {"detail":"Book not found"}
    end
  end
```

---

## API Details

**Base URL:** `http://localhost:8000`

| Method | Path            | Description            | Request Body   | Success Response                | Errors                      |
|-------:|-----------------|------------------------|----------------|---------------------------------|-----------------------------|
| GET    | `/health`       | Health check           | —              | `200 {"status":"ok"}`           | —                           |
| GET    | `/books`        | List all books         | —              | `200 [Book]`                    | —                           |
| POST   | `/books`        | Create a new book      | `BookCreate`   | `201 Book`                      | `422` validation            |
| GET    | `/books/{id}`   | Get one book by id     | —              | `200 Book`                      | `404 Book not found`        |
| PUT    | `/books/{id}`   | Update a book          | `BookUpdate`   | `200 Book`                      | `404` not found, `422`      |
| DELETE | `/books/{id}`   | Delete a book          | —              | `204 No Content`                | `404 Book not found`        |

```
