// frontend/src/api.js
const BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:8000';

async function http(path, opts = {}) {
  try {
    const res = await fetch(`${BASE}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...opts
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) throw new Error(data?.detail || `HTTP ${res.status}`);
    return data;
  } catch (e) {
    throw new Error(e.message || 'Network error');
  }
}

export const listBooks   = () => http('/books');
export const createBook  = (payload) => http('/books', { method: 'POST', body: JSON.stringify(payload) });
export const updateBook  = (id, payload) => http(`/books/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
export const deleteBook  = (id) => http(`/books/${id}`, { method: 'DELETE' });
