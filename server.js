import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import { existsSync } from 'fs'

import propertiesRouter from './server/routes/properties.js'
import leadsRouter from './server/routes/leads.js'
import chatRouter from './server/routes/chat.js'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// API routes
app.use('/api/properties', propertiesRouter)
app.use('/api/leads', leadsRouter)
app.use('/api/subscribe', leadsRouter)
app.use('/api/chat', chatRouter)

// Serve built frontend in production
const distPath = path.join(__dirname, 'dist')
if (existsSync(distPath)) {
  app.use(express.static(distPath))
  app.get('/{*path}', (req, res) => res.sendFile(path.join(distPath, 'index.html')))
}

app.listen(PORT, () => console.log(`G&V Realty API running on http://localhost:${PORT}`))
