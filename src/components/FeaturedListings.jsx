import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import PropertyCard from './PropertyCard'
import { properties } from '../data/properties'

export default function FeaturedListings() {
  const featured = properties.filter(p => p.featured).slice(0, 4)

  return (
    <section className="bg-cream py-24 sm:py-32 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label">Handpicked for You</span>
            <h2 className="font-display text-[clamp(32px,5vw,52px)] text-navy-900 mt-3 leading-tight">
              Featured <em className="font-normal italic">Properties</em>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/properties" className="btn-outline-gold py-3 px-6 text-[10px]">
              <span>View All</span>
              <ArrowRight size={13} />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {featured.map((p, i) => (
            <PropertyCard key={p.id} property={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
