import { motion } from 'framer-motion'
import { stats } from '../data/properties'

export default function StatsBar() {
  return (
    <section className="bg-navy-900 py-16 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/10">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center lg:px-10"
            >
              <p className="font-display text-4xl sm:text-5xl font-semibold text-white mb-2">
                {s.value.includes('+') || s.value.includes('%') || s.value.includes('$') ? (
                  <>
                    <span className="gold-shimmer">{s.value}</span>
                  </>
                ) : s.value}
              </p>
              <p className="text-xs tracking-[0.15em] uppercase text-white/40">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
