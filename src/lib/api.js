const BASE = '/api'

async function request(path, opts = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opts,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }))
    throw new Error(err.error || 'Request failed')
  }
  return res.json()
}

export const api = {
  // Properties
  getProperties: (params = {}) => {
    const qs = new URLSearchParams(params).toString()
    return request(`/properties${qs ? `?${qs}` : ''}`)
  },
  getProperty: (id) => request(`/properties/${id}`),
  searchProperties: (query) => request('/properties/search', {
    method: 'POST',
    body: JSON.stringify({ query }),
  }),

  // Leads
  submitLead: (data) => request('/leads', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // Newsletter
  subscribe: (email) => request('/subscribe', {
    method: 'POST',
    body: JSON.stringify({ email }),
  }),

  // Chat (returns a fetch Response for SSE streaming)
  chatStream: (messages) => fetch(`${BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  }),
}
