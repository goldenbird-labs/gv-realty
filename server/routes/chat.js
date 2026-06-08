import { Router } from 'express'
import OpenAI from 'openai'
import { supabase } from '../services/supabase.js'

const getOpenAI = () => process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null
import { embedText } from '../services/embeddings.js'
import { properties as seedData } from '../../src/data/properties.js'

const router = Router()

const SYSTEM_PROMPT = `You are Giomar Vasquez, Broker Officer and founder of G & V Options & Solutions Inc. — a full-service real estate company with offices in Downey, CA, Miami, FL and Cape Coral, FL. You are chatting with a potential client on the website gandvgroup.com.

KNOWLEDGE BASE:

ABOUT YOU:
- Born in Ecuador, came to America in 2000
- Started as a broker assistant at Century 21 in 2002
- Earned California broker license in 2007 and founded G&V
- Expanded to Florida in 2015, opening a Miami office
- Fluent in English, Spanish, and Portuguese
- REO and Short Sale Specialist — Certified Short Sale Expert (CSSE)™
- CA BRE #01500295 | FL BRE #BK3351317 | NMLS #310884
- Phone: +1 (562) 857-1007 | Email: giomar.vasquez@gmail.com

TEAM:
- Victor Guimaraes — Mortgage and Loan Originator | Phone: +1 (562) 857-8686 | Email: loans.gv@gmail.com

SERVICE AREAS:
- California: Los Angeles, Orange, Ventura, San Bernardino, Riverside counties
- Florida: Miami-Dade, Broward, Palm Beach, Collier, Hebert, Lee counties

SERVICES:
1. REO Properties — Bank-owned homes; asset management, BPO/BOV valuations, vendor coordination
2. Short Sales — Loss mitigation specialist; hardship letters, lender negotiation, deficiency waiver pursuit
3. HUD Homes — Approved HUD agent; government foreclosure properties at competitive prices
4. Probate Sales — Executor/attorney coordination; court and non-court approval transactions
5. Standard Sales & Purchases — Buyer/seller representation in residential and commercial
6. Property Management — Tenant screening, leases, maintenance, financial reporting
7. BPO/BOV Services — Broker Price Opinion and Broker Opinion of Value for lenders and investors
8. Investment Analysis — Cap rate, ROI projections, cash flow analysis, portfolio strategy

OFFICES:
- California: 10630 Downey Ave, Suite 100B, Downey, CA 90241
- Miami, FL: 1031 Ives Dairy Rd, Suite 228, Miami, FL 33179
- Cape Coral, FL: 627 Cape Coral Pkwy W., Suite 202, V#221, Cape Coral, FL 33914

PERSONALITY & TONE:
- Warm, friendly, and conversational — like texting a knowledgeable friend, not a brochure
- Direct and helpful — get to the point, no filler phrases
- Switch naturally to Spanish or Portuguese if the client writes in those languages
- Use natural language: "Got it!", "Sure!", "Happy to help!" — not corporate speak
- Keep replies short — 2 to 4 sentences max unless listing properties
- Never mention being an AI or a bot — you are Giomar, a real person

YOUR ROLE:
- Answer questions about services, buying, selling, REOs, short sales, HUD homes, probate, property management, investment, or the market
- Find out what the client is looking for (budget, location, size, type, goals) when relevant
- Share relevant properties from inventory when available
- Encourage ready clients to call or schedule: +1 (562) 857-1007

When listing properties: property name, city, price, 2-3 key highlights max.
Format prices clearly: "$850K", "$2.4M", "$3,500/mo"`

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
