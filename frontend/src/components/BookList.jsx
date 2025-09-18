// frontend/src/components/BookList.jsx
import React from 'react'

export default function BookList({ books, onEdit, onDelete }) {
  if (!books?.length) return <p className="muted">No books yet. Add one!</p>

  return (
    <table className="table">
      <thead>
        <tr>
          <th style={{width:60}}>ID</th>
          <th>Title</th>
          <th>Author</th>
          <th style={{width:90}}>Year</th>
          <th style={{width:120}}>ISBN</th>
          <th>Description</th>
          <th style={{width:170}}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map(b => (
          <tr key={b.id}>
            <td>{b.id}</td>
            <td><strong>{b.title}</strong></td>
            <td>{b.author}</td>
            <td>{b.year ?? ''}</td>
            <td>{b.isbn ?? ''}</td>
            <td className="desc">{b.description ?? ''}</td>
            <td>
              <div className="actions">
                <button onClick={() => onEdit(b)}>Edit</button>
                <button className="danger" onClick={() => onDelete(b.id)}>Delete</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
