import OpenAI from 'openai'

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null

export async function embedText(text) {
  if (!openai) throw new Error('OpenAI not configured')
  const res = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  })
  return res.data[0].embedding
}

export function buildPropertyText(p) {
  return [
    p.title,
    p.description,
    `${p.beds} bedrooms, ${p.baths} bathrooms`,
    `${p.sqft} sqft`,
    `${p.city}, ${p.state}`,
    `${p.type === 'sale' ? 'For Sale' : p.type === 'rent' ? 'For Rent' : 'Commercial'}`,
    `$${p.price?.toLocaleString()}`,
    p.features?.join(', '),
    p.property_type,
  ].filter(Boolean).join('. ')
}
