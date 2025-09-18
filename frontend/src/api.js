const BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:8000';

async function http(path, opts = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) },
    ...opts
  });
  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const data = await res.json();
      if (data?.detail) msg = Array.isArray(data.detail) ? data.detail.map(d=>d.msg).join(', ') : data.detail;
    } catch {}
    throw new Error(msg);
  }
  if (res.status === 204) return null;
  return res.json();
}

export const listBooks = () => http('/books');
export const createBook = (payload) => http('/books', { method: 'POST', body: JSON.stringify(payload) });
