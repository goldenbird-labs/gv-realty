import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronDown, ArrowRight, Phone } from 'lucide-react'
import gvLogo from '../assets/Gvlogo.png'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
})

const BG_IMAGES = [
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1800&h=1000&fit=crop&q=90',
  'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1800&h=1000&fit=crop&q=90',
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1800&h=1000&fit=crop&q=90',
]

const SERVICES = [
  'REO & Short Sales',
  'HUD Homes',
  'Property Management',
  'Probate Sales',
  'Investment Advisory',
]

export default function Hero() {
  const [imgIdx] = useState(0)

  /* ── Search (hidden, preserved for later use) ──────────────────
  const navigate = useNavigate()
  const [tab, setTab] = useState('sale')
  const [query, setQuery] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/properties?type=${tab}&query=${encodeURIComponent(query)}`)
  }

  <motion.div {...fadeUp(0.4)} className="w-full max-w-2xl bg-white/10 backdrop-blur-md border border-white/20">
    <div className="flex border-b border-white/10 px-4 pt-3">
      {['sale', 'rent', 'commercial'].map(t => (
        <button key={t} onClick={() => setTab(t)}
          className={`mr-6 pb-3 text-xs font-semibold tracking-[0.12em] uppercase transition-colors border-b-2 -mb-px ${
            tab === t ? 'text-gold border-gold' : 'text-white/50 border-transparent hover:text-white/80'}`}>
          {t === 'sale' ? 'For Sale' : t === 'rent' ? 'For Rent' : 'Commercial'}
        </button>
      ))}
    </div>
    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 p-3">
      <div className="flex-1 flex items-center gap-3 bg-white/10 border border-white/20 px-4 py-3">
        <MapPin size={16} className="text-gold shrink-0" />
        <input type="text" value={query} onChange={e => setQuery(e.target.value)}
          placeholder="City, neighborhood, address, or describe your ideal home…"
          className="flex-1 bg-transparent text-white placeholder-white/40 text-sm outline-none" />
      </div>
      <button type="submit" className="btn-gold px-8 py-3 shrink-0 justify-center">
        <Search size={15} /><span>Search</span>
      </button>
    </form>
  </motion.div>
  ── End Search ─────────────────────────────────────────────── */

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={BG_IMAGES[imgIdx]}
          alt="California and Florida real estate"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/85 via-navy-900/75 to-navy-950/90" />
      </div>

      {/* Ambient gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative w-full flex flex-col items-center text-center px-6 pt-24 pb-20">

        {/* Logo */}
        <motion.div {...fadeUp(0.1)} className="mb-5 bg-white/80 backdrop-blur-sm rounded-2xl px-10 py-5 shadow-xl">
          <img src={gvLogo} alt="G & V Options & Solutions Inc." className="h-28 w-auto object-contain" />
        </motion.div>

        {/* Tagline */}
        <motion.p {...fadeUp(0.2)} className="text-gold/80 text-[10px] tracking-[0.4em] uppercase mb-6">
          California &amp; Florida Real Estate
        </motion.p>

        {/* Headline */}
        <motion.h1 {...fadeUp(0.3)} className="font-display text-[clamp(36px,5.5vw,72px)] text-white leading-[1.05] mb-4 max-w-3xl">
          The Right Property{' '}
          <em className="font-normal italic text-gold">For Every Client</em>
        </motion.h1>

        {/* Subtitle */}
        <motion.p {...fadeUp(0.4)} className="text-white/50 text-base max-w-xl mb-10 leading-relaxed">
          Residential, commercial, and investment properties across California and Florida.
          Trusted local agents, real relationships.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.5)} className="flex flex-col sm:flex-row items-center gap-4 mb-12">
          <Link to="/properties" className="btn-gold px-8 py-4 text-sm">
            Browse Properties <ArrowRight size={15} />
          </Link>
          <Link to="/contact" className="btn-outline-white px-8 py-4 text-sm">
            Contact Us
          </Link>
          <a href="tel:5628571007" className="flex items-center gap-2 text-white/60 hover:text-gold transition-colors text-sm">
            <Phone size={14} /> 562-857-1007
          </a>
        </motion.div>

        {/* Service pills */}
        <motion.div {...fadeUp(0.6)} className="flex flex-wrap justify-center gap-2">
          {SERVICES.map(s => (
            <span key={s} className="px-4 py-1.5 bg-white/8 border border-white/15 text-white/50 text-[10px] font-medium tracking-[0.12em] uppercase backdrop-blur-sm">
              {s}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
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
