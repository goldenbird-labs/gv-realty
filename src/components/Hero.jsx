import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Phone, ShieldCheck, Award } from 'lucide-react'
import gvLogo from '../assets/Gvlogo.png'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] },
})

const STATS = [
  { value: '20+', label: 'Years Experience' },
  { value: '300+', label: 'Properties Sold' },
  { value: 'CA & FL', label: '2 States' },
  { value: '11', label: 'Counties Served' },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">

      {/* ── BACKGROUND IMAGE (full bleed, all screens) ── */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1800&h=1200&fit=crop&q=90"
          alt="Luxury property"
          className="w-full h-full object-cover object-center"
        />
        {/* Light gradient — readable text without killing the image */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/60 to-navy-950/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-navy-950/30" />
      </div>

      {/* ── CONTENT ── */}
      <div className="relative z-10 flex flex-col justify-center flex-1 px-6 sm:px-12 lg:px-20 pt-28 pb-8 max-w-7xl mx-auto w-full">

        {/* Logo */}
        <motion.div {...fadeUp(0.1)} className="mb-8">
          <div className="inline-block bg-white/10 backdrop-blur-sm border border-white/15 px-6 py-4 rounded-xl">
            <img src={gvLogo} alt="G & V Options & Solutions Inc." className="h-14 w-auto object-contain" />
          </div>
        </motion.div>

        {/* Label */}
        <motion.div {...fadeUp(0.2)} className="flex items-center gap-3 mb-5">
          <span className="w-10 h-px bg-gold" />
          <span className="text-gold text-[11px] font-semibold tracking-[0.3em] uppercase">California &amp; Florida Real Estate</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 {...fadeUp(0.3)} className="font-display text-[clamp(40px,6vw,80px)] text-white leading-[1.04] mb-6 max-w-3xl">
          The Right Property<br />
          <em className="font-normal italic text-gold">For Every Client</em>
        </motion.h1>

        {/* Subtitle */}
        <motion.p {...fadeUp(0.4)} className="text-white/60 text-base sm:text-lg leading-relaxed max-w-lg mb-10">
          Residential, commercial, and investment properties across California and Florida —
          trusted agents, real results, 20+ years of experience.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.5)} className="flex flex-wrap items-center gap-4 mb-12">
          <Link to="/properties" className="btn-gold px-8 py-4 text-sm">
            Browse Properties <ArrowRight size={15} />
          </Link>
          <Link to="/contact" className="flex items-center gap-2 px-8 py-4 border border-white/25 text-white/80 hover:border-gold/50 hover:text-gold text-sm font-medium tracking-wide transition-all duration-200">
            Contact Us
          </Link>
          <a href="tel:5628571007" className="flex items-center gap-2 text-white/60 hover:text-gold transition-colors group">
            <span className="flex items-center justify-center w-9 h-9 rounded-full border border-gold/30 group-hover:border-gold transition-colors">
              <Phone size={13} className="text-gold" />
            </span>
            <span className="text-sm font-medium">562-857-1007</span>
          </a>
        </motion.div>

        {/* Trust badges */}
        <motion.div {...fadeUp(0.6)} className="flex flex-wrap gap-3 mb-16">
          <div className="flex items-center gap-2 bg-white/8 backdrop-blur-sm border border-white/12 px-4 py-2.5">
            <ShieldCheck size={14} className="text-gold" />
            <span className="text-white/70 text-[11px] font-medium tracking-wide">CA BRE #01500295</span>
          </div>
          <div className="flex items-center gap-2 bg-white/8 backdrop-blur-sm border border-white/12 px-4 py-2.5">
            <ShieldCheck size={14} className="text-gold" />
            <span className="text-white/70 text-[11px] font-medium tracking-wide">FL BRE #BK3351317</span>
          </div>
          <div className="flex items-center gap-2 bg-white/8 backdrop-blur-sm border border-white/12 px-4 py-2.5">
            <Award size={14} className="text-gold" />
            <span className="text-white/70 text-[11px] font-medium tracking-wide">CSSE™ Certified</span>
          </div>
        </motion.div>

      </div>

      {/* ── STATS BAR (pinned to bottom) ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="relative z-10 border-t border-white/10 bg-navy-950/70 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
          {STATS.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center py-6 px-4 text-center">
              <span className="font-display text-2xl sm:text-3xl text-gold font-semibold">{value}</span>
              <span className="text-[10px] text-white/40 tracking-[0.15em] uppercase mt-1.5">{label}</span>
            </div>
          ))}
        </div>
      </motion.div>

    </section>
  )
}
