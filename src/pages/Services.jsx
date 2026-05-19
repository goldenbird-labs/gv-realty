import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Home, TrendingDown, Building2, FileText, Key, BarChart3, Shield, Briefcase, ArrowRight } from 'lucide-react'

const services = [
  {
    id: 'reo',
    icon: TrendingDown,
    title: 'REO Properties',
    subtitle: 'Bank-Owned Homes',
    desc: 'We specialize in bank-owned (Real Estate Owned) properties and have deep relationships with lenders and asset management companies across California and Florida. Our REO expertise allows buyers to access distressed inventory and close efficiently.',
    bullets: ['Asset management coordination', 'Occupancy verification & cash-for-keys', 'BPO and BOV valuations', 'Utility activation & property prep', 'Vendor management for repairs'],
  },
  {
    id: 'short-sales',
    icon: Shield,
    title: 'Short Sales',
    subtitle: 'Loss Mitigation Specialist',
    desc: 'Giomar Vasquez is a certified Short Sale and Loss Mitigation Specialist. We guide sellers through every step — from initial hardship assessment to lender negotiation and final approval — minimizing damage to credit while avoiding foreclosure.',
    bullets: ['Hardship letter preparation', 'Lender negotiation & approval', 'Title and escrow coordination', 'Deficiency waiver pursuit', 'HUD-1 and closing support'],
  },
  {
    id: 'hud',
    icon: Key,
    title: 'HUD Homes',
    subtitle: 'Government-Owned Properties',
    desc: 'As approved HUD agents, we assist buyers in purchasing HUD-foreclosed properties at competitive prices. HUD homes can offer significant value, especially for owner-occupants and non-profit buyers in priority bidding periods.',
    bullets: ['HUD bidding & registration', 'Owner-occupant vs. investor guidance', 'Property condition reports', 'FHA 203(k) loan referrals', 'Closing coordination with HUD'],
  },
  {
    id: 'probate',
    icon: FileText,
    title: 'Probate Sales',
    subtitle: 'Estate & Inherited Properties',
    desc: 'We work with executors, administrators, and attorneys to handle the sale of inherited and probate properties. Our experience with court-confirmed sales ensures compliance and a smooth process for all parties.',
    bullets: ['Executor & administrator support', 'Court-confirmation process', 'Estate property valuations', 'Coordination with probate attorneys', 'Sensitive handling of occupied estates'],
  },
  {
    id: 'standard',
    icon: Home,
    title: 'Standard Sales & Purchases',
    subtitle: 'Residential & Commercial',
    desc: 'Whether you\'re buying your first home or selling a multi-unit investment, our agents bring market knowledge across five California counties and three Florida counties to help you achieve the best outcome.',
    bullets: ['Buyer & seller representation', 'Comparable market analysis', 'Offer negotiation & review', 'Contingency management', 'Full closing support'],
  },
  {
    id: 'management',
    icon: Building2,
    title: 'Property Management',
    subtitle: 'Residential & Investment',
    desc: 'We manage residential properties on behalf of investors and landlords, handling tenant relations, maintenance coordination, rent collection, and reporting — so you can earn passively without the headaches.',
    bullets: ['Tenant screening & placement', 'Lease drafting & renewals', 'Maintenance & vendor coordination', 'Monthly financial reporting', 'Eviction support if needed'],
  },
  {
    id: 'bpo',
    icon: BarChart3,
    title: 'BPO / BOV Services',
    subtitle: 'Broker Price Opinion & Valuation',
    desc: 'We provide professional Broker Price Opinions (BPO) and Broker Opinion of Value (BOV) reports for lenders, servicers, and investors. Our local market expertise ensures accurate, well-supported valuations.',
    bullets: ['Interior & exterior BPOs', 'Residential and commercial BOVs', 'Comparative market data', 'Fast turnaround for servicers', 'Available in CA & FL markets'],
  },
  {
    id: 'investment',
    icon: Briefcase,
    title: 'Investment Analysis',
    subtitle: 'For Investors & Buyers',
    desc: 'We help investors evaluate properties through cap rate analysis, cash-on-cash return projections, and neighborhood trend data. Whether you\'re acquiring your first rental or building a portfolio, we bring the numbers.',
    bullets: ['Cap rate & ROI projections', 'Cash flow analysis', 'Neighborhood comparables', 'Multi-family & commercial review', 'Portfolio strategy consultation'],
  },
]

export default function Services() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="bg-navy-900 py-20 px-6 lg:px-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1800&h=600&fit=crop&q=60')] bg-cover bg-center opacity-10" />
        <div className="relative max-w-7xl mx-auto">
          <span className="section-label">What We Do</span>
          <h1 className="font-display text-5xl text-white mt-4 max-w-2xl leading-tight">
            Full-Service Real Estate <em className="font-normal italic text-gold">Expertise</em>
          </h1>
          <p className="text-white/40 text-sm mt-4 max-w-xl leading-relaxed">
            G & V Options & Solutions Inc. handles the full spectrum of real estate — from complex distressed sales to standard residential transactions, property management, and investment advisory.
          </p>
          <div className="flex flex-wrap gap-6 mt-8 text-xs text-white/40">
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-gold rounded-full" />California: LA · Orange · Ventura · San Bernardino · Riverside</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-gold rounded-full" />Florida: Miami-Dade · Broward · Palm Beach</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((svc, i) => (
            <motion.div
              key={svc.id}
              id={svc.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="border border-gray-200 p-8 hover:border-gold/40 hover:shadow-md transition-all group"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-navy-900 flex items-center justify-center shrink-0 group-hover:bg-gold transition-colors">
                  <svc.icon size={20} className="text-gold group-hover:text-navy-900 transition-colors" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-navy-900">{svc.title}</h3>
                  <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-gold mt-0.5">{svc.subtitle}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-5">{svc.desc}</p>
              <ul className="space-y-1.5">
                {svc.bullets.map(b => (
                  <li key={b} className="flex items-start gap-2 text-xs text-gray-500">
                    <span className="w-1 h-1 bg-gold rounded-full mt-1.5 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 bg-navy-900 p-10 md:p-14 text-center">
          <span className="section-label">Work With Us</span>
          <h2 className="font-display text-3xl text-white mt-3 mb-4">
            Ready to Get <em className="font-normal italic text-gold">Started?</em>
          </h2>
          <p className="text-white/40 text-sm max-w-lg mx-auto mb-8">
            Whether you're dealing with a distressed property, looking to buy your first home, or need a rental managed — our team is ready to help across California and Florida.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-gold inline-flex">
              Contact Us <ArrowRight size={14} />
            </Link>
            <Link to="/partners" className="btn-outline-white inline-flex">
              Meet Our Partners
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
