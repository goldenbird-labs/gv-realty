import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Phone, Mail, ArrowRight } from 'lucide-react'

const partners = [
  {
    category: 'Mortgage & Lending',
    people: [
      {
        name: 'Victor Astudillo',
        role: 'Mortgage Lender',
        company: 'Lending Partner',
        desc: 'Victor specializes in residential and investment property financing, working closely with G&V clients to secure competitive loan terms — including financing for REO, short sale, and HUD purchases.',
        expertise: ['Residential Mortgages', 'Investment Property Loans', 'FHA & VA Financing', 'REO & Short Sale Loans'],
      },
    ],
  },
  {
    category: 'Title & Escrow',
    people: [
      {
        name: 'Tom Armas',
        role: 'Title Representative',
        company: 'Steward Title',
        desc: 'Tom leads our title work at Steward Title, ensuring clean title and smooth closings on every transaction. His experience with REO and short sale titles means he handles even complex chain-of-title issues efficiently.',
        expertise: ['Title Search & Insurance', 'REO Title Clearance', 'Short Sale Closing', 'Escrow Coordination'],
      },
      {
        name: 'Ruth Galvan',
        role: 'Escrow Officer',
        company: 'M Escrow',
        desc: 'Ruth manages escrow for G&V transactions at M Escrow, keeping closings on track with careful coordination between buyers, sellers, lenders, and agents.',
        expertise: ['Residential Escrow', 'REO & Probate Escrow', 'Closing Coordination', 'Document Management'],
      },
    ],
  },
  {
    category: 'Home Services & Contracting',
    people: [
      {
        name: 'Santos Davila',
        role: 'Plumbing & Rooter Services',
        company: 'All Star Rooter',
        desc: 'Santos and the All Star Rooter team handle plumbing inspections, repairs, and emergency services for G&V-managed and listed properties. Fast response times and reliable work across Southern California.',
        expertise: ['Drain Cleaning & Rooter', 'Plumbing Inspections', 'REO Property Prep', 'Emergency Repairs'],
      },
      {
        name: 'Rodrigo Coba',
        role: 'Architectural & Renovation',
        company: 'RC Architectural',
        desc: 'Rodrigo brings architectural design and renovation expertise to help investors, sellers, and buyers understand the full scope and potential of a property — from minor repairs to full gut renovations.',
        expertise: ['Architectural Plans', 'Renovation Scoping', 'Property Assessments', 'Design Consultation'],
      },
    ],
  },
]

export default function Partners() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="bg-navy-900 py-20 px-6 lg:px-10">
        <div className="max-w-4xl mx-auto">
          <span className="section-label">Trusted Network</span>
          <h1 className="font-display text-5xl text-white mt-4">
            Our Preferred <em className="font-normal italic text-gold">Partners</em>
          </h1>
          <p className="text-white/40 text-sm mt-4 max-w-xl leading-relaxed">
            G & V Options & Solutions Inc. works with a curated network of trusted professionals in lending, title, escrow, and home services. These are the people we call first — and the ones our clients can rely on.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-10 py-16 space-y-16">
        {partners.map((group, gi) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: gi * 0.1 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <h2 className="font-display text-2xl text-navy-900">{group.category}</h2>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <div className="space-y-6">
              {group.people.map((p, pi) => (
                <div key={pi} className="border border-gray-200 p-8 hover:border-gold/40 hover:shadow-md transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-semibold text-navy-900 text-lg">{p.name}</h3>
                      <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-gold mt-0.5">{p.role} · {p.company}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-5">{p.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.expertise.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-cream text-navy-900 text-[10px] font-medium tracking-wide">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-cream border-t border-gray-200 py-16 px-6 lg:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl text-navy-900 mb-3">Become a Partner</h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto mb-8">
            Are you a lender, title officer, contractor, or service provider who works with real estate transactions in California or Florida? We'd love to connect.
          </p>
          <Link to="/contact" className="btn-navy inline-flex">
            Get In Touch <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}
