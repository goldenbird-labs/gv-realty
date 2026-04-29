import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Bed, Bath, Square, MapPin, Heart, Share2, Phone, Mail, ChevronLeft, ChevronRight, Check, Car, Calendar } from 'lucide-react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { properties, agents, formatPrice } from '../data/properties'
import { useStore } from '../store/useStore'
import PropertyCard from '../components/PropertyCard'

// Fix Leaflet's broken default icons with Vite
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({ iconUrl: markerIcon, iconRetinaUrl: markerIcon2x, shadowUrl: markerShadow })

function MortgageCalculator({ price }) {
  const [down, setDown] = useState(20)
  const [rate, setRate] = useState(6.5)
  const [years, setYears] = useState(30)

  const principal = price * (1 - down / 100)
  const monthlyRate = rate / 100 / 12
  const payments = years * 12
  const monthly = payments === 0 ? 0 :
    (principal * monthlyRate * Math.pow(1 + monthlyRate, payments)) /
    (Math.pow(1 + monthlyRate, payments) - 1)

  return (
    <div className="bg-cream border border-gray-200 p-6">
      <h3 className="font-display text-xl font-semibold text-navy-900 mb-5">Mortgage Calculator</h3>
      <div className="space-y-5">
        <div>
          <label className="field-group">
            <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-gray-500 block mb-2">
              Down Payment: {down}% (${(price * down / 100).toLocaleString()})
            </span>
          </label>
          <input type="range" min={5} max={50} value={down} onChange={e => setDown(+e.target.value)} />
        </div>
        <div>
          <label className="text-[10px] font-semibold tracking-[0.12em] uppercase text-gray-500 block mb-2">
            Interest Rate: {rate}%
          </label>
          <input type="range" min={3} max={12} step={0.1} value={rate} onChange={e => setRate(+e.target.value)} />
        </div>
        <div>
          <label className="text-[10px] font-semibold tracking-[0.12em] uppercase text-gray-500 block mb-2">
            Loan Term: {years} years
          </label>
          <div className="flex gap-2">
            {[10, 15, 20, 30].map(y => (
              <button
                key={y}
                onClick={() => setYears(y)}
                className={`flex-1 py-2 text-xs font-semibold border transition-all ${
                  years === y ? 'bg-navy-900 text-white border-navy-900' : 'border-gray-200 text-gray-600 hover:border-navy-900'
                }`}
              >{y}yr</button>
            ))}
          </div>
        </div>
        <div className="bg-navy-900 text-white p-5 text-center">
          <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Estimated Monthly Payment</p>
          <p className="font-display text-4xl font-semibold text-gold">
            ${Math.round(monthly).toLocaleString()}
          </p>
          <p className="text-xs text-white/40 mt-2">Principal + Interest only. Taxes & insurance extra.</p>
        </div>
      </div>
    </div>
  )
}

export default function PropertyDetail() {
  const { id } = useParams()
  const property = properties.find(p => p.id === id)
  const { saved, toggleSaved } = useStore()
  const [imgIdx, setImgIdx] = useState(0)

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="font-display text-3xl text-navy-900 mb-4">Property Not Found</p>
          <Link to="/properties" className="btn-navy">Browse All Properties</Link>
        </div>
      </div>
    )
  }

  const agent = agents.find(a => a.id === property.agentId)
  const isSaved = saved.includes(property.id)
  const similar = properties
    .filter(p => p.id !== property.id && (p.type === property.type || p.city === property.city))
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Gallery */}
      <div className="relative h-[55vh] sm:h-[65vh] bg-navy-950">
        <img
          src={property.images[imgIdx]}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />

        {/* Image nav */}
        {property.images.length > 1 && (
          <>
            <button
              onClick={() => setImgIdx(i => (i - 1 + property.images.length) % property.images.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setImgIdx(i => (i + 1) % property.images.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-all"
            >
              <ChevronRight size={18} />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {property.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === imgIdx ? 'bg-gold w-6' : 'bg-white/50'}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Thumbnails */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          {property.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setImgIdx(i)}
              className={`w-14 h-10 border-2 transition-all overflow-hidden ${i === imgIdx ? 'border-gold' : 'border-transparent opacity-60'}`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left: Main content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`text-[10px] font-bold tracking-[0.1em] uppercase px-3 py-1.5 ${
                    property.type === 'sale' ? 'badge-sale' : property.type === 'rent' ? 'badge-rent' : 'bg-navy-800 text-white'
                  }`}>
                    {property.type === 'sale' ? 'For Sale' : property.type === 'rent' ? 'For Rent' : 'Commercial'}
                  </span>
                  <span className="text-[10px] font-semibold tracking-wide uppercase px-3 py-1.5 bg-gray-100 text-gray-600 capitalize">
                    {property.propertyType}
                  </span>
                </div>
                <h1 className="font-display text-3xl sm:text-4xl font-semibold text-navy-900 mb-2">
                  {property.title}
                </h1>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <MapPin size={13} className="text-gold" />
                  <span>{property.address}, {property.city}, {property.state} {property.zip}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => toggleSaved(property.id)}
                  className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:border-gold transition-colors"
                >
                  <Heart size={16} className={isSaved ? 'text-gold fill-gold' : 'text-gray-400'} />
                </button>
                <button className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:border-gold transition-colors">
                  <Share2 size={16} className="text-gray-400" />
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="bg-navy-900 px-6 py-5 mb-8 inline-block">
              <p className="font-display text-4xl font-semibold text-gold">
                {formatPrice(property.price, property.type)}
              </p>
            </div>

            {/* Key stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              {[
                { icon: Bed, label: 'Bedrooms', value: property.beds || 'N/A' },
                { icon: Bath, label: 'Bathrooms', value: property.baths },
                { icon: Square, label: 'Square Feet', value: property.sqft.toLocaleString() },
                { icon: Car, label: 'Garage', value: property.garage ? `${property.garage} cars` : 'None' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="border border-gray-100 p-4 text-center">
                  <Icon size={18} className="text-gold mx-auto mb-2" />
                  <p className="font-semibold text-navy-900 text-lg">{value}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="mb-10">
              <h2 className="font-display text-2xl text-navy-900 mb-4">About This Property</h2>
              <p className="text-gray-600 leading-relaxed">{property.description}</p>
              <div className="flex gap-4 mt-4 text-sm text-gray-500">
                <div className="flex items-center gap-1.5"><Calendar size={13} className="text-gold" /> Built {property.yearBuilt}</div>
                <div className="flex items-center gap-1.5"><MapPin size={13} className="text-gold" /> {property.city}, {property.state}</div>
              </div>
            </div>

            {/* Features */}
            <div className="mb-10">
              <h2 className="font-display text-2xl text-navy-900 mb-5">Features & Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.features.map(f => (
                  <div key={f} className="flex items-center gap-2.5 text-sm text-gray-700 capitalize">
                    <Check size={14} className="text-gold shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            {property.lat && property.lng && (
              <div className="mb-10">
                <h2 className="font-display text-2xl text-navy-900 mb-5">Location</h2>
                <div className="h-72 border border-gray-100 overflow-hidden">
                  <MapContainer
                    center={[property.lat, property.lng]}
                    zoom={14}
                    style={{ height: '100%', width: '100%' }}
                    scrollWheelZoom={false}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    />
                    <Marker position={[property.lat, property.lng]}>
                      <Popup>
                        <strong>{property.title}</strong><br />
                        {property.address}
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </div>
            )}

            {/* Mortgage calculator */}
            {property.type === 'sale' && <MortgageCalculator price={property.price} />}
          </div>

          {/* Right: Agent + enquiry */}
          <div className="space-y-6">
            {agent && (
              <div className="border border-gray-100 p-6 sticky top-24">
                <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-400 mb-4">Listed by</p>
                <div className="flex items-center gap-3 mb-4">
                  <img src={agent.photo} alt={agent.name} className="w-14 h-14 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-navy-900">{agent.name}</p>
                    <p className="text-xs text-gray-500">{agent.title}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mb-5">{agent.bio.slice(0, 120)}…</p>

                <div className="space-y-3 mb-6">
                  <a href={`tel:${agent.phone}`} className="btn-navy w-full justify-center py-3 text-[11px]">
                    <Phone size={13} /> {agent.phone}
                  </a>
                  <a href={`mailto:${agent.email}`} className="btn-outline-gold w-full justify-center py-3 text-[11px]">
                    <Mail size={13} /> Email Agent
                  </a>
                </div>

                {/* Quick enquiry */}
                <div className="border-t border-gray-100 pt-5">
                  <p className="text-xs font-semibold text-navy-900 mb-3">Send a Quick Enquiry</p>
                  <form className="space-y-3" onSubmit={e => e.preventDefault()}>
                    <input type="text" placeholder="Your name" className="w-full border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gold transition-colors" />
                    <input type="email" placeholder="Email address" className="w-full border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gold transition-colors" />
                    <textarea rows={3} placeholder={`I'm interested in ${property.title}…`} className="w-full border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gold transition-colors resize-none" />
                    <button type="submit" className="btn-gold w-full justify-center py-3 text-[11px]">
                      Request Info
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Similar properties */}
        {similar.length > 0 && (
          <div className="mt-16 pt-16 border-t border-gray-100">
            <h2 className="font-display text-3xl text-navy-900 mb-8">Similar Properties</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {similar.map((p, i) => <PropertyCard key={p.id} property={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
