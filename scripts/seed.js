import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { properties, agents } from '../src/data/properties.js'

dotenv.config()

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)

async function seed() {
  console.log('🌱 Seeding G&V Realty database...\n')

  // Insert agents (no ID — let Supabase generate UUIDs)
  console.log('→ Inserting agents...')
  const { data: insertedAgents, error: agentErr } = await supabase
    .from('agents')
    .insert(agents.map(a => ({
      name: a.name,
      title: a.title,
      email: a.email,
      phone: a.phone,
      photo: a.photo,
      bio: a.bio,
      listings_sold: a.listingsSold,
      volume: a.volume,
    })))
    .select('id, email')

  if (agentErr) { console.error('Agent error:', agentErr.message); process.exit(1) }
  console.log(`   ✓ ${insertedAgents.length} agents inserted`)

  // Build mapping: old string ID → new UUID
  // agents are in same order as seed array
  const agentIdMap = {}
  agents.forEach((a, i) => { agentIdMap[a.id] = insertedAgents[i].id })

  // Insert properties
  console.log('→ Inserting properties...')
  const { data: insertedProps, error: propErr } = await supabase
    .from('properties')
    .insert(properties.map(p => ({
      title: p.title,
      description: p.description,
      type: p.type,
      property_type: p.propertyType,
      price: p.price,
      address: p.address,
      city: p.city,
      state: p.state,
      zip: p.zip,
      lat: p.lat,
      lng: p.lng,
      beds: p.beds,
      baths: p.baths,
      sqft: p.sqft,
      garage: p.garage,
      year_built: p.yearBuilt,
      features: p.features,
      images: p.images,
      status: p.status,
      featured: p.featured,
      agent_id: agentIdMap[p.agentId] || null,
    })))
    .select('id, title')

  if (propErr) { console.error('Property error:', propErr.message); process.exit(1) }
  console.log(`   ✓ ${insertedProps.length} properties inserted`)

  console.log('\n✅ Database seeded successfully!')
  console.log('\nAgents:')
  insertedAgents.forEach(a => console.log(`   ${a.id} — ${a.email}`))
  console.log('\nProperties:')
  insertedProps.forEach(p => console.log(`   ${p.id} — ${p.title}`))
}

seed()
