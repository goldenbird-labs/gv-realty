import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)

async function updateAgents() {
  console.log('Updating agents in Supabase...\n')

  // Delete all existing agents and properties (re-seed clean)
  await supabase.from('properties').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  await supabase.from('agents').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  console.log('Cleared existing data')

  // Run the main seed
  const { default: seed } = await import('./seed.js')
}

updateAgents()
