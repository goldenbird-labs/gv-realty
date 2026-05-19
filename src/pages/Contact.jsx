import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react'

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
                { icon: Phone, label: 'Office Phone', value: '562-857-1007' },
                { icon: Mail, label: 'Email', value: 'giomar.vasquez@gmail.com' },
                { icon: MapPin, label: 'California Office', value: '10630 Downey Ave, Suite 100B, Downey CA 90241' },
                { icon: MapPin, label: 'Florida Office — Miami', value: '1031 Ives Dairy Rd, Suite 228, Miami FL 33179' },
                { icon: MapPin, label: 'Florida Office — Cape Coral', value: '627 Cape Coral Pkwy W., Suite 202, V#221, Cape Coral FL 33914' },
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

            {/* Direct contacts */}
            <div className="border-t border-gray-100 pt-8">
              <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-400 mb-4">Speak Directly With</p>
              <div className="space-y-5">
                {[
                  { name: 'Giomar Vasquez', topic: 'About Real Estate', phone: '562-857-1007', email: 'Giomar.Vasquez@gmail.com', photo: '/giomar.jpg' },
                  { name: 'Victor Astudillo', topic: 'About Mortgage & Loans', phone: '562-857-8686', email: 'loans.gv@gmail.com', photo: null },
                ].map(contact => (
                  <div key={contact.name} className="flex items-start gap-3">
                    {contact.photo
                      ? <img src={contact.photo} alt={contact.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                      : <div className="w-10 h-10 rounded-full bg-navy-900 flex items-center justify-center shrink-0 text-gold text-sm font-semibold">{contact.name[0]}</div>
                    }
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-navy-900">{contact.name}</p>
                      <p className="text-xs text-gold mb-1">{contact.topic}</p>
                      <a href={`tel:${contact.phone}`} className="block text-xs text-gray-500 hover:text-gold transition-colors">{contact.phone}</a>
                      <a href={`mailto:${contact.email}`} className="block text-xs text-gray-500 hover:text-gold transition-colors">{contact.email}</a>
                    </div>
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
                <p className="text-gray-500 text-sm leading-relaxed">A G & V Options & Solutions Inc. specialist will reach out within one business hour. We look forward to speaking with you.</p>
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
