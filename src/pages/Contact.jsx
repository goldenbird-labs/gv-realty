import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react'
import { agents } from '../data/properties'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', interest: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('loading')
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="bg-navy-900 py-20 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <span className="section-label">Get In Touch</span>
          <h1 className="font-display text-5xl text-white mt-4">
            Let's <em className="font-normal italic text-gold">Connect</em>
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="font-display text-3xl text-navy-900 mb-4">We're Here to Help</h2>
            <p className="text-gray-500 leading-relaxed mb-10">
              Whether you're buying, selling, investing, or simply exploring the market, our team is ready to guide you. Reach out and a specialist will respond within one business hour.
            </p>

            <div className="space-y-6 mb-10">
              {[
                { icon: Phone, label: 'Phone', value: '+1 (305) 555-0100' },
                { icon: Mail, label: 'Email', value: 'hello@gvrealty.com' },
                { icon: MapPin, label: 'Florida Office', value: 'Miami, FL — serving South Florida' },
                { icon: MapPin, label: 'California Office', value: 'Los Angeles, CA — serving Beverly Hills, Malibu & beyond' },
                { icon: Clock, label: 'Office Hours', value: 'Mon–Fri 8am–7pm · Sat 9am–5pm' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-navy-900 flex items-center justify-center shrink-0">
                    <Icon size={15} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-gold mb-0.5">{label}</p>
                    <p className="text-sm text-navy-900 font-medium">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Agents */}
            <div className="border-t border-gray-100 pt-8">
              <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-400 mb-4">Speak Directly With</p>
              <div className="space-y-4">
                {agents.map(a => (
                  <div key={a.id} className="flex items-center gap-3">
                    <img src={a.photo} alt={a.name} className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-navy-900">{a.name}</p>
                      <p className="text-xs text-gray-400">{a.title}</p>
                    </div>
                    <a href={`tel:${a.phone}`} className="text-xs text-gold hover:text-gold-dark transition-colors font-medium">{a.phone}</a>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            {status === 'success' ? (
              <div className="bg-cream border border-gray-200 p-12 text-center">
                <CheckCircle size={48} className="text-gold mx-auto mb-5" />
                <h3 className="font-display text-3xl text-navy-900 mb-3">Message Sent</h3>
                <p className="text-gray-500 text-sm leading-relaxed">A G&V Realty specialist will reach out within one business hour. We look forward to speaking with you.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 bg-cream border border-gray-200 p-8">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="field-group">
                    <label>Full Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} required placeholder="Alexandra Smith" />
                  </div>
                  <div className="field-group">
                    <label>Email Address *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" />
                  </div>
                  <div className="field-group">
                    <label>Phone Number</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="+1 (305) 555-0000" />
                  </div>
                  <div className="field-group">
                    <label>I'm Interested In</label>
                    <select name="interest" value={form.interest} onChange={handleChange}>
                      <option value="">Select one…</option>
                      <option>Buying a Property</option>
                      <option>Selling a Property</option>
                      <option>Renting</option>
                      <option>Commercial Leasing</option>
                      <option>Investment Advisory</option>
                      <option>Property Valuation</option>
                    </select>
                  </div>
                </div>
                <div className="field-group">
                  <label>Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Tell us about your goals, timeline, and any properties you have in mind…" style={{ resize: 'none' }} />
                </div>
                {status === 'error' && <p className="text-red-500 text-sm">Something went wrong. Please try again or call us directly.</p>}
                <button type="submit" disabled={status === 'loading'} className="btn-navy w-full justify-center py-4 disabled:opacity-50">
                  {status === 'loading' ? 'Sending…' : <><Send size={14} /> Send Message</>}
                </button>
                <p className="text-center text-xs text-gray-400">Your information is kept strictly confidential.</p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
