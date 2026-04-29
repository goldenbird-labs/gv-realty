import { Router } from 'express'
import { supabase } from '../services/supabase.js'
import axios from 'axios'

const router = Router()

async function getLocation(ip) {
  try {
    if (!ip || ['127.0.0.1', '::1'].includes(ip) || ip.startsWith('192.168') || ip.startsWith('10.'))
      return { country: 'Local', city: 'Local' }
    const { data } = await axios.get(`http://ip-api.com/json/${ip}?fields=country,city`, { timeout: 3000 })
    return { country: data.country || '', city: data.city || '' }
  } catch { return { country: '', city: '' } }
}

async function notify(lead) {
  if (!process.env.PUSHOVER_APP_TOKEN || !process.env.PUSHOVER_USER_KEY) return
  try {
    await axios.post('https://api.pushover.net/1/messages.json', {
      token: process.env.PUSHOVER_APP_TOKEN,
      user: process.env.PUSHOVER_USER_KEY,
      title: 'New Lead — G&V Realty',
      message: `${lead.name} (${lead.email})\n${lead.interest || ''}\n${lead.message}`,
      priority: 1,
    })
  } catch {}
}

// POST /api/leads
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, interest, message, property_id } = req.body
    if (!name || !email || !message)
      return res.status(400).json({ error: 'Name, email, and message are required.' })

    const ip = (req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress || '').trim()
    const { country, city } = await getLocation(ip)
    const lead = { name, email, phone, interest, message, property_id, ip, country, city }

    if (supabase) {
      const { error } = await supabase.from('leads').insert(lead)
      if (error) throw error
    }

    await notify(lead)
    res.json({ success: true })
  } catch (err) {
    console.error('POST /leads:', err.message)
    res.status(500).json({ error: 'Something went wrong. Please try again.' })
  }
})

// POST /api/subscribe
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body
    if (!email) return res.status(400).json({ error: 'Email required' })
    if (supabase) {
      await supabase.from('subscribers').upsert({ email }, { onConflict: 'email' })
    }
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
