# 📚 BookList Application

A simple full‑stack web app built with **FastAPI (Python)** and **React** for managing a list of books.

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/books-list.git
cd books-list
```

### 2. Backend (FastAPI + SQLite)

Create a virtual environment and install dependencies:

```bash
cd backend
python3 -m venv venv
source venv/bin/activate   # On macOS/Linux
venv\Scripts\activate    # On Windows PowerShell

pip install -r requirements.txt
```

Run the FastAPI app:

```bash
uvicorn app.main:app --reload --port 8000
```

The API will be available at:  
👉 http://localhost:8000

You can also check the docs:  
👉 http://localhost:8000/docs

---

### 3. Frontend (React with Vite)

Install dependencies and run dev server:

```bash
cd frontend
npm install
npm run dev -- --port 5173
```

The app will be available at:  
👉 http://localhost:5173


## 📝 Documentation

See [ARCHITECTURE.md](ARCHITECTURE.md) for:

- Sequence diagrams of all flows
- Detailed API reference
- Models (Book, BookCreate, BookUpdate)

---

## ✅ Requirements Checklist

- [x] FastAPI CRUD endpoints
- [x] SQLite persistence
- [x] React frontend with Add/List/Update/Delete
- [x] Error handling in backend + frontend
- [x] Git version control
- [x] Architecture design doc (ARCHITECTURE.md)
- [x] README setup instructions

---

## 👤 Author

Assignment completed by **Denisha Thakkar*  


