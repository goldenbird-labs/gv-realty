import { Router } from 'express'
import { supabase } from '../services/supabase.js'
import { embedText } from '../services/embeddings.js'
import { properties as seedData } from '../../src/data/properties.js'

const router = Router()

// GET /api/properties — list with filters
router.get('/', async (req, res) => {
  try {
    const { type, propertyType, city, beds, minPrice, maxPrice, featured, limit = 50 } = req.query

    // Fall back to seed data if Supabase not configured
    if (!supabase) return res.json(seedData)

    let q = supabase.from('properties').select('*, agents(name, photo, title)').eq('status', 'active')

    if (type && type !== 'all')         q = q.eq('type', type)
    if (propertyType && propertyType !== 'all') q = q.eq('property_type', propertyType)
    if (city)                           q = q.ilike('city', `%${city}%`)
    if (beds && beds !== 'any')         q = q.gte('beds', parseInt(beds))
    if (minPrice)                       q = q.gte('price', Number(minPrice))
    if (maxPrice)                       q = q.lte('price', Number(maxPrice))
    if (featured === 'true')            q = q.eq('featured', true)

    q = q.order('featured', { ascending: false }).order('created_at', { ascending: false }).limit(Number(limit))

    const { data, error } = await q
    if (error) throw error
    res.json(data)
  } catch (err) {
    console.error('GET /properties:', err.message)
    res.json(seedData)
  }
})

// GET /api/properties/:id — single property
router.get('/:id', async (req, res) => {
  try {
    if (!supabase) {
      const p = seedData.find(p => p.id === req.params.id)
      return p ? res.json(p) : res.status(404).json({ error: 'Not found' })
    }
    const { data, error } = await supabase
      .from('properties')
      .select('*, agents(name, photo, title, phone, email, bio)')
      .eq('id', req.params.id)
      .single()
    if (error) throw error
    res.json(data)
  } catch (err) {
    const p = seedData.find(p => p.id === req.params.id)
    p ? res.json(p) : res.status(404).json({ error: 'Not found' })
  }
})

// POST /api/properties/search — semantic vector search
router.post('/search', async (req, res) => {
  try {
    const { query, type } = req.body
    if (!query) return res.status(400).json({ error: 'Query required' })

    // If Supabase + OpenAI not configured, fall back to text filter
    if (!supabase || !process.env.OPENAI_API_KEY) {
      const q = query.toLowerCase()
      const results = seedData.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.features.some(f => f.includes(q))
      )
      return res.json(results)
    }

    const embedding = await embedText(query)
    const { data, error } = await supabase.rpc('match_properties', {
      query_embedding: embedding,
      match_threshold: 0.4,
      match_count: 12,
      filter_type: type || null,
    })
    if (error) throw error
    res.json(data)
  } catch (err) {
    console.error('POST /properties/search:', err.message)
    res.status(500).json({ error: err.message })
  }
})

export default router
