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
            Redefining Luxury Real Estate <em className="font-normal italic text-gold">Since 2004</em>
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
              <p>Founded in Miami in 2004, G&V Realty was built on a single conviction: that the most discerning buyers and sellers in Florida and California deserve more than a transaction — they deserve a relationship.</p>
              <p>With offices in Miami and Los Angeles, we serve the full spectrum of luxury real estate across both states — from the sun-drenched beaches of South Florida to the iconic hillside estates of Beverly Hills and Malibu. We have closed over $48 billion in luxury real estate while remaining guided by the same white-glove principles that defined our founding.</p>
              <p>We were among the first luxury brokerages in California and Florida to integrate AI into the property search experience, allowing clients to describe their ideal home in natural language and instantly surface properties that truly match their lifestyle.</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=700&h=500&fit=crop&q=85"
                alt="G&V Realty office"
                className="w-full object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-gold p-6 hidden sm:block">
                <p className="font-display text-4xl font-semibold text-navy-900">20+</p>
                <p className="text-xs text-navy-900/70 uppercase tracking-wider mt-1">Years of Excellence</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
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

      {/* Values */}
      <section className="py-24 px-6 lg:px-10 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-label">Our Values</span>
            <h2 className="font-display text-4xl text-navy-900 mt-3">What Drives <em className="font-normal italic text-gold">Everything We Do</em></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: 'Excellence', desc: 'We hold ourselves to the highest standard in every detail — from how we answer the phone to how we close a deal.' },
              { icon: Users, title: 'Relationships', desc: 'Our clients are not transactions. Most of our business comes from clients who return to us decade after decade.' },
              { icon: Globe, title: 'Global Reach', desc: "Our network of elite partners spans 32 markets, giving our clients access to the world's most exclusive off-market opportunities." },
              { icon: TrendingUp, title: 'Innovation', desc: 'We invest aggressively in technology — from AI search to predictive market analytics — so our clients always have the edge.' },
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {agents.map((agent, i) => (
              <motion.div key={agent.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center group">
                <div className="relative w-40 h-40 mx-auto mb-5 overflow-hidden">
                  <img src={agent.photo} alt={agent.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold transition-colors" />
                </div>
                <h3 className="font-display text-xl font-semibold text-navy-900 mb-1">{agent.name}</h3>
                <p className="text-xs text-gold tracking-wide uppercase mb-3">{agent.title}</p>
                <p className="text-sm text-gray-500 leading-relaxed mb-5">{agent.bio}</p>
                <div className="flex items-center justify-center gap-2">
                  <a href={`tel:${agent.phone}`} className="flex items-center gap-1.5 text-xs text-navy-900 hover:text-gold transition-colors">
                    <Phone size={12} /> {agent.phone}
                  </a>
                </div>
                <div className="flex justify-center gap-4 mt-2 text-xs text-gray-500">
                  <span>{agent.listingsSold}+ sales</span>
                  <span>${agent.volume} volume</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
