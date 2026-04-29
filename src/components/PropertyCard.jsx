import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Bed, Bath, Square, MapPin, Heart } from 'lucide-react'
import { useStore } from '../store/useStore'
import { agents, formatPrice } from '../data/properties'

export default function PropertyCard({ property, index = 0 }) {
  const { saved, toggleSaved } = useStore()
  const isSaved = saved.includes(property.id)
  const agent = agents.find(a => a.id === property.agentId)

  const badgeClass = {
    sale: 'badge-sale',
    rent: 'badge-rent',
    commercial: 'bg-navy-800 text-white',
  }[property.type] || 'badge-sale'

  const badgeLabel = {
    sale: 'For Sale',
    rent: 'For Rent',
    commercial: 'Commercial',
  }[property.type]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="property-card bg-white border border-gray-100 group"
    >
      {/* Image */}
      <Link to={`/properties/${property.id}`} className="block relative img-zoom h-56 sm:h-64">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        {/* Badge */}
        <span className={`absolute top-4 left-4 text-[10px] font-bold tracking-[0.1em] uppercase px-3 py-1.5 ${badgeClass}`}>
          {badgeLabel}
        </span>
        {/* Save button */}
        <button
          onClick={e => { e.preventDefault(); toggleSaved(property.id) }}
          className="absolute top-4 right-4 w-9 h-9 bg-white/90 flex items-center justify-center transition-colors hover:bg-white"
        >
          <Heart
            size={15}
            className={isSaved ? 'text-gold fill-gold' : 'text-gray-400'}
          />
        </button>
        {/* Price overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy-950/80 to-transparent p-4">
          <p className="font-display text-2xl font-semibold text-white">
            {formatPrice(property.price, property.type)}
          </p>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <Link to={`/properties/${property.id}`}>
            <h3 className="font-display text-lg font-semibold text-navy-900 hover:text-gold transition-colors leading-tight">
              {property.title}
            </h3>
          </Link>
        </div>

        <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-4">
          <MapPin size={11} />
          <span>{property.city}, {property.state}</span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-5 text-sm text-gray-600 border-t border-gray-100 pt-4">
          {property.beds > 0 && (
            <div className="flex items-center gap-1.5">
              <Bed size={14} className="text-gold" />
              <span className="font-medium">{property.beds}</span>
              <span className="text-xs text-gray-400">beds</span>
            </div>
          )}
          {property.baths > 0 && (
            <div className="flex items-center gap-1.5">
              <Bath size={14} className="text-gold" />
              <span className="font-medium">{property.baths}</span>
              <span className="text-xs text-gray-400">baths</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Square size={14} className="text-gold" />
            <span className="font-medium">{property.sqft.toLocaleString()}</span>
            <span className="text-xs text-gray-400">sqft</span>
          </div>
        </div>

        {/* Agent */}
        {agent && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
            <img src={agent.photo} alt={agent.name} className="w-7 h-7 rounded-full object-cover" />
            <span className="text-xs text-gray-500">{agent.name}</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}
