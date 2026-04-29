import { Router } from 'express'
import OpenAI from 'openai'
import { supabase } from '../services/supabase.js'

const getOpenAI = () => process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null
import { embedText } from '../services/embeddings.js'
import { properties as seedData } from '../../src/data/properties.js'

const router = Router()

const SYSTEM_PROMPT = `You are an expert real estate advisor for G&V Realty, a luxury real estate agency.
You help clients find their perfect property through natural conversation.

Your role:
- Understand what the client is looking for (budget, location, size, lifestyle, must-haves)
- Search our inventory and suggest matching properties
- Answer questions about neighborhoods, the buying/renting process, and the market
- Always be warm, professional, and knowledgeable
- When you find matching properties, describe them compellingly and suggest the client contact an agent

When relevant properties are found via semantic search, they will be included in the context below.
Format prices clearly (e.g., "$4.85M" or "$12,000/mo").
Keep responses concise and conversational. Use bullet points for property features.`

// POST /api/chat — SSE streaming chat with semantic property search
router.post('/', async (req, res) => {
  try {
    const { messages } = req.body
    if (!messages?.length) return res.status(400).json({ error: 'Messages required' })

    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    // Semantic search based on the latest user message
    const lastUserMsg = [...messages].reverse().find(m => m.role === 'user')?.content || ''
    let propertyContext = ''

    try {
      if (process.env.OPENAI_API_KEY && supabase) {
        const embedding = await embedText(lastUserMsg)
        const { data } = await supabase.rpc('match_properties', {
          query_embedding: embedding,
          match_threshold: 0.4,
          match_count: 5,
        })
        if (data?.length) {
          propertyContext = '\n\nRELEVANT PROPERTIES FROM OUR INVENTORY:\n' +
            data.map(p => `- ${p.title} | ${p.city}, ${p.state} | $${p.price?.toLocaleString()} | ${p.beds}bd ${p.baths}ba | ${p.sqft?.toLocaleString()} sqft`).join('\n')
        }
      } else {
        // Fallback: keyword search on seed data
        const q = lastUserMsg.toLowerCase()
        const matches = seedData.filter(p =>
          p.title.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.features.some(f => f.includes(q))
        ).slice(0, 4)
        if (matches.length) {
          propertyContext = '\n\nRELEVANT PROPERTIES FROM OUR INVENTORY:\n' +
            matches.map(p => `- ${p.title} | ${p.city}, ${p.state} | $${p.price?.toLocaleString()} | ${p.beds}bd ${p.baths}ba | ${p.sqft?.toLocaleString()} sqft`).join('\n')
        }
      }
    } catch {}

    const openai = getOpenAI()
    if (!openai) {
      res.write(`data: ${JSON.stringify({ content: "I'd be happy to help you find a property! For live AI assistance, please ensure the OpenAI API key is configured. In the meantime, feel free to browse our listings or call us at +1 (305) 555-0100." })}\n\n`)
      res.write('data: [DONE]\n\n')
      return res.end()
    }
    const stream = await openai.chat.completions.create({
      model: 'gpt-4o',
      stream: true,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT + propertyContext },
        ...messages,
      ],
      max_tokens: 600,
      temperature: 0.7,
    })

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content
      if (content) res.write(`data: ${JSON.stringify({ content })}\n\n`)
    }
    res.write('data: [DONE]\n\n')
    res.end()
  } catch (err) {
    console.error('POST /chat:', err.message)
    res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`)
    res.end()
  }
})

export default router
