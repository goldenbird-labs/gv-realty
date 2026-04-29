import { motion } from 'framer-motion'
import { Brain, Globe, Shield, TrendingUp } from 'lucide-react'

const reasons = [
  {
    icon: Brain,
    title: 'AI-Powered Search',
    desc: 'Describe your dream home in plain English. Our AI searches the entire inventory semantically to surface properties that truly match your lifestyle.',
  },
  {
    icon: Globe,
    title: 'CA & FL Specialists',
    desc: 'Deep local expertise across California and Florida — from Miami Beach to Beverly Hills. Our network surfaces off-market opportunities the public never sees.',
  },
  {
    icon: Shield,
    title: 'White-Glove Service',
    desc: 'From first consultation to keys in hand, a dedicated specialist manages every detail of your transaction with discretion and expertise.',
  },
  {
    icon: TrendingUp,
    title: 'Market Intelligence',
    desc: 'Real-time data, predictive analytics, and seasoned insight combine to ensure you buy at the right price and sell at the right moment.',
  },
]

export default function WhyUs() {
  return (
    <section className="bg-white py-24 sm:py-32 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <span className="section-label">Why G&V Realty</span>
            <h2 className="font-display text-[clamp(32px,5vw,52px)] text-navy-900 mt-4 mb-6 leading-tight">
              A Different Kind of{' '}
              <em className="font-normal italic text-gold">Real Estate Firm</em>
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              We combine decades of luxury market expertise with cutting-edge technology to deliver an experience that is truly one of a kind. At G&V Realty, every client is a priority — never a transaction.
            </p>
            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&q=80"
                className="w-14 h-14 rounded-full object-cover border-2 border-gold"
                alt="Alexandra Voss"
              />
              <div>
                <p className="font-semibold text-navy-900 text-sm">Alexandra Voss</p>
                <p className="text-xs text-gray-500">Founding Partner, 18 years experience</p>
              </div>
            </div>
          </motion.div>

          {/* Right: feature grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="p-6 border border-gray-100 hover:border-gold/40 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-11 h-11 bg-navy-900 flex items-center justify-center mb-4 group-hover:bg-gold transition-colors duration-300">
                  <r.icon size={20} className="text-gold group-hover:text-navy-900 transition-colors duration-300" />
                </div>
                <h3 className="font-semibold text-navy-900 mb-2 text-sm">{r.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
