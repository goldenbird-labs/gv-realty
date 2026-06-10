import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

const MLS_TABS = [
  {
    id: 'crmls-idx',
    label: 'Southern California',
    sublabel: 'CRMLS',
    url: 'https://www.crmls.org/servlet/lDisplayListings?LA=EN',
  },
  {
    id: 'fl-beaches',
    label: 'South Florida East',
    sublabel: 'Beaches MLS',
    url: 'https://matrix.beachesmls.com/Matrix/public/IDX.aspx?idx=1709af',
  },
  {
    id: 'fl-gulf',
    label: 'South Florida West',
    sublabel: 'Gulf Coast MLS',
    url: 'https://fgc.mlsmatrix.com/Matrix/public/IDX.aspx?idx=94741ce6',
  },
]

export default function Properties() {
  const [activeTab, setActiveTab] = useState(MLS_TABS[0].id)

  const current = MLS_TABS.find(t => t.id === activeTab)

  return (
    <div className="min-h-screen bg-white pt-20 flex flex-col">
      {/* Page header */}
      <div className="bg-navy-900 py-12 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <span className="section-label">Browse Listings</span>
          <h1 className="font-display text-4xl sm:text-5xl text-white mt-3">
            Search <em className="font-normal italic text-gold">Properties</em>
          </h1>
          <p className="text-white/40 mt-2 text-sm">
            Live MLS data across California and Florida
          </p>
        </div>
      </div>

      {/* MLS Tabs */}
      <div className="bg-navy-950 px-6 lg:px-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex overflow-x-auto">
          {MLS_TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-start px-6 py-4 shrink-0 border-b-2 transition-all duration-200 ${
                activeTab === tab.id
                  ? 'border-gold text-white'
                  : 'border-transparent text-white/40 hover:text-white/70'
              }`}
            >
              <span className="text-xs font-semibold tracking-[0.1em] uppercase">{tab.label}</span>
              <span className="text-[10px] text-gold/60 mt-0.5">{tab.sublabel}</span>
            </button>
          ))}
        </div>
      </div>

      {/* IDX Embed */}
      <div className="flex-1 flex flex-col">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex-1 flex flex-col"
        >
          {/* Open in new tab fallback link */}
          <div className="flex items-center justify-end gap-2 px-6 py-2 bg-gray-50 border-b border-gray-100">
            <span className="text-xs text-gray-400">Powered by live MLS data</span>
            <a
              href={current.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-gold hover:text-gold/80 font-medium transition-colors"
            >
              Open in new tab <ExternalLink size={11} />
            </a>
          </div>

          <iframe
            key={activeTab}
            src={current.url}
            title={current.label}
            className="w-full flex-1 border-0"
            style={{ minHeight: 'calc(100vh - 280px)' }}
            allow="geolocation"
          />
        </motion.div>
      </div>
    </div>
  )
}
