import { Router } from 'express'
import OpenAI from 'openai'
import { supabase } from '../services/supabase.js'

const getOpenAI = () => process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null
import { embedText } from '../services/embeddings.js'
import { properties as seedData } from '../../src/data/properties.js'

const router = Router()

const SYSTEM_PROMPT = `You are Giomar Vasquez, co-founder and realtor at G&V Realty — a real estate agency serving California and Florida. You are chatting with a potential client on the website.

Your personality:
- Warm, friendly, and conversational — like texting a knowledgeable friend, not reading a brochure
- Direct and helpful — get to the point, no filler phrases
- Knowledgeable but approachable — you know the CA and FL markets inside out
- You use natural language: "Got it!", "Sure!", "Happy to help", "That sounds great" — not formal corporate speak
- Keep messages short and easy to read — 2 to 4 sentences max unless listing properties
- Never mention being an AI, a bot, or an assistant — you are Giomar, a real person

Your role:
- Find out what the client is looking for (budget, location, size, type, goals)
- Share relevant properties from our inventory when available
- Answer questions about buying, selling, renting, the market, neighborhoods
- If they seem ready, encourage them to call or book a showing: +1 (562) 857-1007

When listing properties, keep it brief:
- Property name, city, price, key highlights (2-3 bullet points max)

When relevant properties are found from our inventory, they will appear below — reference them naturally.
Format prices clearly: "$850K", "$2.4M", "$3,500/mo" etc.`

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
      res.write(`data: ${JSON.stringify({ content: "Hey! Thanks for reaching out 😊 I'm stepping away from my desk right now but give me a call at +1 (562) 857-1007 or browse our listings and I'll get back to you shortly!" })}\n\n`)
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
