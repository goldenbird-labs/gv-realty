import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Phone, MapPin, Star } from 'lucide-react'
import gvLogo from '../assets/Gvlogo.png'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.9, delay },
})

const STATS = [
  { value: '20+', label: 'Years Experience' },
  { value: '2', label: 'States' },
  { value: '6', label: 'FL Counties' },
  { value: '5', label: 'CA Counties' },
]

const SERVICES = ['REO & Short Sales', 'HUD Homes', 'Property Management', 'Probate Sales', 'Investment Advisory']

export default function Hero() {
  return (
    <section className="relative min-h-screen flex overflow-hidden bg-navy-950">

      {/* ── LEFT PANEL ── */}
      <div className="relative z-10 flex flex-col justify-center w-full lg:w-[52%] px-8 sm:px-12 lg:px-16 xl:px-20 pt-28 pb-16">

        {/* Logo */}
        <motion.div {...fadeUp(0.1)} className="mb-10">
          <img src={gvLogo} alt="G & V Options & Solutions Inc." className="h-20 w-auto object-contain" />
        </motion.div>

        {/* Location tag */}
        <motion.div {...fadeUp(0.2)} className="flex items-center gap-2 mb-5">
          <span className="w-8 h-px bg-gold" />
          <span className="text-gold text-[10px] font-semibold tracking-[0.3em] uppercase">California &amp; Florida Real Estate</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 {...fadeUp(0.3)} className="font-display text-[clamp(38px,4.5vw,66px)] text-white leading-[1.06] mb-6">
          The Right Property<br />
          <em className="font-normal italic text-gold">For Every Client</em>
        </motion.h1>

        {/* Subtitle */}
        <motion.p {...fadeUp(0.4)} className="text-white/55 text-[15px] leading-relaxed max-w-md mb-10">
          Residential, commercial, and investment properties across California and Florida.
          Trusted local agents with 20+ years of real relationships.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.5)} className="flex flex-wrap items-center gap-4 mb-12">
          <Link to="/properties" className="btn-gold px-8 py-3.5 text-sm">
            Browse Properties <ArrowRight size={15} />
          </Link>
          <a href="tel:5628571007" className="flex items-center gap-2.5 text-white/60 hover:text-gold transition-colors group">
            <span className="flex items-center justify-center w-9 h-9 rounded-full border border-gold/30 group-hover:border-gold/60 transition-colors">
              <Phone size={14} className="text-gold" />
            </span>
            <span className="text-sm font-medium tracking-wide">562-857-1007</span>
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div {...fadeUp(0.6)} className="grid grid-cols-4 gap-0 border border-white/10 divide-x divide-white/10 mb-12">
          {STATS.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center py-5 px-2 text-center">
              <span className="font-display text-2xl text-gold font-semibold">{value}</span>
              <span className="text-[10px] text-white/40 tracking-wide uppercase mt-1 leading-tight">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* Service tags */}
        <motion.div {...fadeUp(0.7)} className="flex flex-wrap gap-2">
          {SERVICES.map(s => (
            <span key={s} className="px-3 py-1.5 border border-white/10 text-white/40 text-[10px] font-medium tracking-[0.1em] uppercase hover:border-gold/30 hover:text-gold/60 transition-colors cursor-default">
              {s}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── RIGHT PANEL — property image ── */}
      <motion.div
        {...fadeIn(0.2)}
        className="hidden lg:block absolute right-0 top-0 w-[52%] h-full"
      >
        {/* Main image */}
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&h=1000&fit=crop&q=90"
          alt="Luxury property"
          className="w-full h-full object-cover"
        />

        {/* Subtle left fade so image blends into dark panel */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-navy-950/30" />

        {/* Floating property card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="absolute bottom-12 right-10 bg-white/95 backdrop-blur-sm p-5 w-64 shadow-2xl"
        >
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="font-display text-navy-900 text-base font-semibold">Featured Listing</p>
              <div className="flex items-center gap-1 mt-0.5">
                <MapPin size={11} className="text-gold" />
                <span className="text-[11px] text-gray-500">California &amp; Florida</span>
              </div>
            </div>
            <span className="text-[10px] font-bold bg-gold text-navy-900 px-2 py-1">FOR SALE</span>
          </div>
          <div className="flex items-center gap-1 mt-3 pt-3 border-t border-gray-100">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={10} className="text-gold fill-gold" />
            ))}
            <span className="text-[11px] text-gray-400 ml-1">Premium Properties</span>
          </div>
        </motion.div>

        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute top-32 right-10 bg-navy-900/90 backdrop-blur-sm border border-gold/20 px-4 py-3"
        >
          <p className="text-gold text-[10px] font-semibold tracking-[0.2em] uppercase">Certified Expert</p>
          <p className="text-white text-sm font-medium mt-0.5">Short Sale Specialist</p>
        </motion.div>
      </motion.div>

    </section>
  )
}
