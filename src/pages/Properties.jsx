import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SlidersHorizontal, LayoutGrid, List, X } from 'lucide-react'
import { useState } from 'react'
import PropertyCard from '../components/PropertyCard'
import { useStore } from '../store/useStore'

const PROPERTY_TYPES = ['all', 'house', 'apartment', 'condo', 'penthouse', 'villa', 'office', 'retail']
const BEDS_OPTIONS = ['any', '1', '2', '3', '4', '5']

export default function Properties() {
  const [searchParams] = useSearchParams()
  const [view, setView] = useState('grid')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { filteredProperties, filters, setFilter, resetFilters } = useStore()

  // Apply URL params on mount
  useEffect(() => {
    const type = searchParams.get('type')
    const city = searchParams.get('city')
    const query = searchParams.get('query')
    if (type) setFilter('type', type)
    if (city) setFilter('city', city)
    if (query) setFilter('query', query)
  }, [])

  const activeFilterCount = [
    filters.type !== 'all',
    filters.propertyType !== 'all',
    filters.beds !== 'any',
    filters.city !== '',
    filters.query !== '',
  ].filter(Boolean).length

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Page header */}
      <div className="bg-navy-900 py-14 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <span className="section-label">Browse Listings</span>
          <h1 className="font-display text-4xl sm:text-5xl text-white mt-3">
            {filters.type === 'sale' ? 'Properties For Sale' :
             filters.type === 'rent' ? 'Properties For Rent' :
             filters.type === 'commercial' ? 'Commercial Spaces' : 'All Properties'}
          </h1>
          <p className="text-white/40 mt-2 text-sm">{filteredProperties.length} properties found</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Type tabs */}
            {['all', 'sale', 'rent', 'commercial'].map(t => (
              <button
                key={t}
                onClick={() => setFilter('type', t)}
                className={`px-4 py-2 text-xs font-semibold tracking-[0.1em] uppercase border transition-all ${
                  filters.type === t
                    ? 'bg-navy-900 text-white border-navy-900'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-navy-900'
                }`}
              >
                {t === 'all' ? 'All' : t === 'sale' ? 'For Sale' : t === 'rent' ? 'For Rent' : 'Commercial'}
              </button>
            ))}

            {/* Filter button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold border border-gray-200 hover:border-navy-900 transition-colors"
            >
              <SlidersHorizontal size={13} />
              Filters
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 bg-gold text-navy-900 text-[9px] font-bold rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {activeFilterCount > 0 && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 transition-colors"
              >
                <X size={12} /> Clear filters
              </button>
            )}
          </div>

          {/* View toggle */}
          <div className="flex items-center border border-gray-200">
            <button
              onClick={() => setView('grid')}
              className={`p-2.5 ${view === 'grid' ? 'bg-navy-900 text-white' : 'text-gray-400 hover:text-navy-900'} transition-colors`}
            >
              <LayoutGrid size={15} />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-2.5 ${view === 'list' ? 'bg-navy-900 text-white' : 'text-gray-400 hover:text-navy-900'} transition-colors`}
            >
              <List size={15} />
            </button>
          </div>
        </div>

        {/* Filter sidebar (inline) */}
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-cream border border-gray-200 p-6 mb-8 grid grid-cols-2 sm:grid-cols-4 gap-6"
          >
            {/* Property Type */}
            <div>
              <label className="block text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-500 mb-3">Type</label>
              <div className="flex flex-col gap-2">
                {PROPERTY_TYPES.map(t => (
                  <button
                    key={t}
                    onClick={() => setFilter('propertyType', t)}
                    className={`text-left text-xs px-3 py-2 border transition-all capitalize ${
                      filters.propertyType === t
                        ? 'bg-navy-900 text-white border-navy-900'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-navy-900'
                    }`}
                  >
                    {t === 'all' ? 'All Types' : t}
                  </button>
                ))}
              </div>
            </div>

            {/* Beds */}
            <div>
              <label className="block text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-500 mb-3">Min Bedrooms</label>
              <div className="flex flex-col gap-2">
                {BEDS_OPTIONS.map(b => (
                  <button
                    key={b}
                    onClick={() => setFilter('beds', b)}
                    className={`text-left text-xs px-3 py-2 border transition-all ${
                      filters.beds === b
                        ? 'bg-navy-900 text-white border-navy-900'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-navy-900'
                    }`}
                  >
                    {b === 'any' ? 'Any' : `${b}+ Beds`}
                  </button>
                ))}
              </div>
            </div>

            {/* City */}
            <div>
              <label className="block text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-500 mb-3">City</label>
              <input
                type="text"
                placeholder="Miami, New York..."
                value={filters.city}
                onChange={e => setFilter('city', e.target.value)}
                className="w-full border border-gray-200 px-3 py-2 text-sm text-navy-900 outline-none focus:border-gold transition-colors"
              />
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-500 mb-3">
                Max Price: ${(filters.maxPrice / 1000000).toFixed(1)}M
              </label>
              <input
                type="range"
                min={500000}
                max={25000000}
                step={500000}
                value={filters.maxPrice}
                onChange={e => setFilter('maxPrice', Number(e.target.value))}
              />
            </div>
          </motion.div>
        )}

        {/* Results */}
        {filteredProperties.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="font-display text-2xl mb-2">No properties found</p>
            <p className="text-sm">Try adjusting your filters or search terms.</p>
            <button onClick={resetFilters} className="btn-gold mt-6">Clear Filters</button>
          </div>
        ) : (
          <div className={view === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
            : 'flex flex-col gap-4'
          }>
            {filteredProperties.map((p, i) => (
              <PropertyCard key={p.id} property={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
