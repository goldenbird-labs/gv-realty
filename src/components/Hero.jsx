import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, MapPin, ChevronDown } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
})

const BG_IMAGES = [
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1800&h=1000&fit=crop&q=90',
  'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1800&h=1000&fit=crop&q=90',
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1800&h=1000&fit=crop&q=90',
]

export default function Hero() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('sale')
  const [query, setQuery] = useState('')
  const [imgIdx] = useState(0)

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/properties?type=${tab}&query=${encodeURIComponent(query)}`)
  }

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={BG_IMAGES[imgIdx]}
          alt="Luxury property"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-900/60 to-navy-950/90" />
      </div>

      {/* Ambient gold glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-20 w-full">
        {/* Label */}
        <motion.div {...fadeUp(0.2)} className="flex items-center gap-3 mb-8">
          <span className="gold-line" />
          <span className="section-label">G&V Realty</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.35)}
          className="font-display text-[clamp(44px,7vw,88px)] text-white leading-[1.02] mb-6 max-w-4xl"
        >
          Where Luxury Finds{' '}
          <em className="font-normal italic text-gold">Its Address</em>
        </motion.h1>

        <motion.p {...fadeUp(0.5)} className="text-white/60 text-lg max-w-xl mb-12 leading-relaxed">
          Exclusive access to the world's most exceptional properties. Curated by experts. Powered by AI.
        </motion.p>

        {/* Search card */}
        <motion.div
          {...fadeUp(0.65)}
          className="bg-white/10 backdrop-blur-md border border-white/20 p-2 max-w-3xl"
        >
          {/* Tabs */}
          <div className="flex border-b border-white/10 mb-4 px-4 pt-3">
            {['sale', 'rent', 'commercial'].map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`mr-6 pb-3 text-xs font-semibold tracking-[0.12em] uppercase transition-colors border-b-2 -mb-px ${
                  tab === t
                    ? 'text-gold border-gold'
                    : 'text-white/50 border-transparent hover:text-white/80'
                }`}
              >
                {t === 'sale' ? 'For Sale' : t === 'rent' ? 'For Rent' : 'Commercial'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 px-2 pb-2">
            <div className="flex-1 flex items-center gap-3 bg-white/10 border border-white/20 px-4 py-3">
              <MapPin size={16} className="text-gold shrink-0" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="City, neighborhood, address, or describe your ideal home…"
                className="flex-1 bg-transparent text-white placeholder-white/40 text-sm outline-none"
              />
            </div>
            <button type="submit" className="btn-gold px-8 py-3 shrink-0 justify-center">
              <Search size={15} />
              <span>Search</span>
            </button>
          </form>
        </motion.div>

        {/* Quick filters */}
        <motion.div {...fadeUp(0.8)} className="flex flex-wrap gap-3 mt-6">
          {['Miami', 'Miami Beach', 'Beverly Hills', 'Malibu', 'Los Angeles'].map(city => (
            <button
              key={city}
              onClick={() => navigate(`/properties?city=${city}`)}
              className="px-4 py-2 bg-white/10 border border-white/20 text-white/70 text-xs font-medium tracking-wide hover:bg-white/20 hover:text-white transition-all"
            >
              {city}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase">Explore</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ChevronDown size={16} className="text-gold" />
        </motion.div>
      </motion.div>
    </section>
  )
}
