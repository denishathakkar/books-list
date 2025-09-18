import React, { useEffect, useState } from 'react'
import { listBooks, createBook } from './api'
import BookForm from './components/BookForm'
import './styles.css'

export default function App() {
  const [books, setBooks] = useState([])
  const [error, setError] = useState(null)

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
      setBooks(prev => [...prev, created]) // append new book
    } catch (e) {
      setError(e.message || 'Failed to add book')
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
        {books.length === 0 ? (
          <p>No books yet. Add one!</p>
        ) : (
          <ul>
            {books.map(b => (
              <li key={b.id}>
                <strong>{b.title}</strong> — {b.author} {b.year ? `(${b.year})` : ''}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
