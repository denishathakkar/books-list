// frontend/src/App.jsx
import React, { useEffect, useState } from 'react'
import { listBooks, createBook, updateBook, deleteBook } from './api'
import BookForm from './components/BookForm'
import BookList from './components/BookList'
import '../src/style.css'

export default function App() {
  const [books, setBooks] = useState([])
  const [error, setError] = useState(null)
  const [editing, setEditing] = useState(null)

  const load = async () => {
    try {
      setError(null)
      setBooks(await listBooks())
    } catch (e) {
      setError(e.message || 'Failed to load books')
    }
  }

  useEffect(() => { load() }, [])

  const onCreate = async (payload) => {
    try {
      setError(null)
      const created = await createBook(payload)
      setBooks(prev => [...prev, created])
    } catch (e) {
      setError(e.message || 'Failed to add book')
    }
  }

  const onUpdate = async (id, payload) => {
    try {
      setError(null)
      const updated = await updateBook(id, payload)
      setBooks(prev => prev.map(b => (b.id === id ? updated : b)))
      setEditing(null)
    } catch (e) {
      setError(e.message || 'Failed to update book')
    }
  }

  const onDelete = async (id) => {
    if (!confirm('Delete this book?')) return
    try {
      setError(null)
      await deleteBook(id)
      setBooks(prev => prev.filter(b => b.id !== id))
      if (editing?.id === id) setEditing(null)
    } catch (e) {
      setError(e.message || 'Failed to delete book')
    }
  }

  return (
    <div className="container">
      <h1>📚 BookList</h1>
      {error && <div className="error">{error}</div>}

      <section className="panel">
        <h2>Add a Book</h2>
        <BookForm onSubmit={onCreate} />
      </section>

      <section className="panel">
        <h2>Books</h2>
        <BookList books={books} onEdit={setEditing} onDelete={onDelete} />
      </section>

      {editing && (
        <section className="panel">
          <h2>Edit Book</h2>
          <BookForm
            initial={editing}
            onSubmit={(payload) => onUpdate(editing.id, payload)}
            onCancel={() => setEditing(null)}
          />
        </section>
      )}
    </div>
  )
}
