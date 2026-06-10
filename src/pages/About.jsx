import { motion } from 'framer-motion'
import { Phone, Mail, Award, TrendingUp, Globe, Users } from 'lucide-react'
import { agents, stats } from '../data/properties'

export default function About() {
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero */}
      <div className="relative bg-navy-900 py-24 px-6 lg:px-10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1800&h=600&fit=crop&q=60')] bg-cover bg-center opacity-10" />
        <div className="relative max-w-7xl mx-auto">
          <span className="section-label">Our Story</span>
          <h1 className="font-display text-5xl sm:text-6xl text-white mt-4 max-w-2xl leading-tight">
            Real Estate Done Right <em className="font-normal italic text-gold">Since 2002</em>
          </h1>
        </div>
      </div>

      {/* Story */}
      <section className="py-24 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <span className="section-label">Who We Are</span>
            <h2 className="font-display text-4xl text-navy-900 mt-4 mb-6 leading-tight">
              A Different Standard of <em className="font-normal italic text-gold">Excellence</em>
            </h2>
            <div className="space-y-4 text-gray-600 text-base leading-relaxed">
              <p>G & V Options & Solutions Inc. was founded in Southern California in 2007 by Giomar Vasquez, a REO and Short Sale Specialist who built her career from the ground up — starting as a broker assistant at Century 21 in 2002. In 2015, the company expanded to Florida with a second office in Miami, now serving clients across both coasts.</p>
              <p>We specialize in REOs, Short Sales, Standard Sales, Probates, HUD Homes, and Property Management — with deep expertise in loss mitigation, BPO/BOV services, and investment analysis. Our service area spans five California counties (Los Angeles, Orange, Ventura, San Bernardino, and Riverside) and six Florida counties (Miami-Dade, Broward, Palm Beach, Collier, Hebert, and Lee).</p>
              <p>Our team is multilingual — fluent in English, Spanish, and Portuguese — allowing us to serve a diverse clientele with the same clarity and care regardless of language. We partner closely with trusted vendors in title, escrow, mortgage, and construction to deliver a seamless, end-to-end real estate experience.</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="relative">
              <img
                src="/about-image.jpg"
                alt="G&V Realty office"
                className="w-full object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-gold p-6 hidden sm:block">
                <p className="font-display text-4xl font-semibold text-navy-900">20+</p>
                <p className="text-xs text-navy-900/70 uppercase tracking-wider mt-1">Years in Business</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats — hidden (placeholder numbers)
      <section className="bg-navy-900 py-16 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <p className="font-display text-4xl sm:text-5xl font-semibold text-gold mb-2">{s.value}</p>
              <p className="text-xs tracking-[0.15em] uppercase text-white/40">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>
      */}

      {/* Values */}
      <section className="py-24 px-6 lg:px-10 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-label">Our Values</span>
            <h2 className="font-display text-4xl text-navy-900 mt-3">What Drives <em className="font-normal italic text-gold">Everything We Do</em></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: 'Specialization', desc: 'From REOs and Short Sales to HUD Homes and Probates — we handle complex transactions that most agents avoid.' },
              { icon: Users, title: 'Client-First', desc: 'Our clients are not transactions. We guide every buyer and seller from first conversation to closing day and beyond.' },
              { icon: Globe, title: 'Multilingual', desc: 'Fluent in English, Spanish, and Portuguese — we serve a diverse clientele across California and Florida with full clarity.' },
              { icon: TrendingUp, title: 'Full-Service', desc: 'Beyond sales, we offer property management, BPO/BOV, loss mitigation, and investment analysis under one roof.' },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white p-7 border border-gray-100 hover:border-gold/40 transition-colors group">
                <div className="w-12 h-12 bg-navy-900 flex items-center justify-center mb-5 group-hover:bg-gold transition-colors">
                  <Icon size={20} className="text-gold group-hover:text-navy-900 transition-colors" />
                </div>
                <h3 className="font-semibold text-navy-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-24 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-label">The Team</span>
            <h2 className="font-display text-4xl text-navy-900 mt-3">Meet Our <em className="font-normal italic text-gold">Specialists</em></h2>
          </div>
          <div className="max-w-5xl mx-auto space-y-10">
            {agents.map((agent, i) => (
              <motion.div key={agent.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group bg-white border border-gray-100 p-8 sm:p-12 hover:border-gold/40 hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row gap-10 md:gap-14">
                <div className="flex flex-col items-center text-center md:w-60 shrink-0">
                  <div className="relative w-40 h-40 mb-5 overflow-hidden rounded-full border-4 border-cream group-hover:border-gold/30 transition-colors duration-300">
                    <img src={agent.photo} alt={agent.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-navy-900 mb-1">{agent.name}</h3>
                  <p className="text-xs text-gold tracking-[0.15em] uppercase mb-5">{agent.title}</p>
                  <div className="space-y-3">
                    <a href={`tel:${agent.phone}`} className="flex items-center justify-center gap-2 text-sm font-medium text-navy-900 hover:text-gold transition-colors">
                      <Phone size={13} /> {agent.phone}
                    </a>
                    <a href={`mailto:${agent.email}`} className="flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-gold transition-colors">
                      <Mail size={13} /> {agent.email}
                    </a>
                  </div>
                  {(agent.listingsSold || agent.volume) && (
                    <div className="flex justify-center gap-6 mt-5 pt-5 border-t border-gray-100 text-xs text-gray-400 w-full">
                      {agent.listingsSold && <span><span className="font-semibold text-navy-900">{agent.listingsSold}+</span> sales</span>}
                      {agent.volume && <span><span className="font-semibold text-navy-900">${agent.volume}</span> volume</span>}
                    </div>
                  )}
                  {(agent.licenseCA || agent.licenseFL) && (
                    <div className="mt-3 pt-3 border-t border-gray-100 text-[10px] text-gray-400 space-y-0.5 w-full">
                      {agent.licenseCA && <p>{agent.licenseCA}</p>}
                      {agent.licenseFL && <p>{agent.licenseFL}</p>}
                    </div>
                  )}
                </div>
                <div className="flex-1 pt-8 md:pt-0 border-t border-gray-100 md:border-t-0 md:border-l md:pl-14">
                  <p className="text-base text-left text-gray-500 leading-relaxed whitespace-pre-line">{agent.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
