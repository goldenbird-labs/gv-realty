import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { testimonials } from '../data/properties'

export default function Testimonials() {
  return (
    <section className="bg-navy-900 py-24 sm:py-32 px-6 lg:px-10 relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="section-label">Client Stories</span>
          <h2 className="font-display text-[clamp(32px,5vw,52px)] text-white mt-3">
            What Our Clients <em className="font-normal italic text-gold">Say</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="bg-navy-800/60 border border-white/10 p-8 relative"
            >
              <Quote size={32} className="text-gold/20 mb-4" />
              <div className="flex gap-0.5 mb-5">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={12} className="text-gold fill-gold" />
                ))}
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-8 italic">"{t.quote}"</p>
              <div className="flex items-center gap-3 border-t border-white/10 pt-6">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-gold/30"
                />
                <div>
                  <p className="font-semibold text-white text-sm">{t.name}</p>
                  <p className="text-xs text-gold/60">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
