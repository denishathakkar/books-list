import React, { useState, useEffect } from 'react'

export default function BookForm({ initial, onSubmit, onCancel }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [year, setYear] = useState('')
  const [isbn, setIsbn] = useState('')
  const [description, setDescription] = useState('')

  // keep fields in sync with initial (and clear for create)
  useEffect(() => {
    if (initial) {
      setTitle(initial.title ?? '')
      setAuthor(initial.author ?? '')
      setYear(initial.year ?? '')
      setIsbn(initial.isbn ?? '')
      setDescription(initial.description ?? '')
    } else {
      setTitle(''); setAuthor(''); setYear(''); setIsbn(''); setDescription('');
    }
  }, [initial])

  const submit = (e) => {
    e.preventDefault()
    onSubmit({
      title: title.trim(),
      author: author.trim(),
      year: year ? Number(year) : null,
      isbn: isbn.trim() || null,
      description: description.trim() || null
    })
    if (!initial) { // clear after create
      setTitle(''); setAuthor(''); setYear(''); setIsbn(''); setDescription('');
    }
  }

  return (
    <form onSubmit={submit} className="form">
      <div className="row">
        <label>Title</label>
        <input value={title} onChange={e=>setTitle(e.target.value)} required maxLength={200} />
      </div>
      <div className="row">
        <label>Author</label>
        <input value={author} onChange={e=>setAuthor(e.target.value)} required maxLength={200} />
      </div>
      <div className="row">
        <label>Year</label>
        <input type="number" value={year} onChange={e=>setYear(e.target.value)} min="0" max="2100" />
      </div>
      <div className="row">
        <label>ISBN</label>
        <input value={isbn} onChange={e=>setIsbn(e.target.value)} maxLength={20} />
      </div>
      <div className="row">
        <label>Description</label>
        <textarea value={description} onChange={e=>setDescription(e.target.value)} maxLength={2000} rows={3} />
      </div>
      <div className="actions">
        <button type="submit">{initial ? 'Update' : 'Add'}</button>
        {onCancel && <button type="button" className="secondary" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  )
}
