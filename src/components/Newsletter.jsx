import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  return (
    <section className="bg-navy-950 py-20 px-6 lg:px-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1800&h=400&fit=crop&q=60')] bg-cover bg-center opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/80 to-navy-950" />

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">Stay Ahead</span>
          <h2 className="font-display text-[clamp(28px,4vw,44px)] text-white mt-4 mb-4">
            Exclusive Listings & Market Reports,{' '}
            <em className="font-normal italic text-gold">First</em>
          </h2>
          <p className="text-white/50 text-sm mb-8 leading-relaxed">
            Join 12,000+ discerning investors and homebuyers who receive our curated weekly briefing on the luxury market.
          </p>

          {submitted ? (
            <div className="flex items-center justify-center gap-3 text-gold">
              <CheckCircle size={20} />
              <span className="font-medium">You're on the list. Welcome to G&V Realty.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/30 px-5 py-4 text-sm outline-none focus:border-gold transition-colors"
              />
              <button type="submit" className="btn-gold py-4 px-8 shrink-0 justify-center">
                <span>Subscribe</span>
                <ArrowRight size={14} />
              </button>
            </form>
          )}

          <p className="text-white/25 text-xs mt-5">No spam. Unsubscribe anytime. Your data is never shared.</p>
        </motion.div>
      </div>
    </section>
  )
}
