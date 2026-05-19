import { Link } from 'react-router-dom'
import { MapPin, Mail } from 'lucide-react'

const openings = [
  {
    title: 'Licensed Real Estate Agent — Florida',
    location: 'Miami, FL',
    type: 'Full-time / Commission',
    description: 'We are looking for a motivated, licensed Florida real estate agent to join our growing team. You will work alongside Victor and Giomar to serve buyers and sellers across South Florida.',
  },
  {
    title: 'Licensed Real Estate Agent — California',
    location: 'Los Angeles, CA',
    type: 'Full-time / Commission',
    description: 'Expand our California presence as a licensed CA agent. Ideal candidates are self-starters with a client-first mindset and strong knowledge of the greater LA and Riverside markets.',
  },
]

export default function Careers() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="bg-navy-900 py-16 px-6 lg:px-10">
        <div className="max-w-4xl mx-auto">
          <span className="section-label">Join Us</span>
          <h1 className="font-display text-4xl text-white mt-3">Careers at G & V Options & Solutions Inc.</h1>
          <p className="text-white/40 text-sm mt-3 max-w-xl">
            We're a small, client-focused team doing big things across California and Florida. If you're passionate about real estate and love working with people, we'd like to hear from you.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-10 py-16">
        <h2 className="font-display text-3xl text-navy-900 mb-10">Current Openings</h2>
        <div className="space-y-6">
          {openings.map((job, i) => (
            <div key={i} className="border border-gray-200 p-8 hover:border-gold/40 hover:shadow-md transition-all">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-semibold text-navy-900 text-lg">{job.title}</h3>
                  <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><MapPin size={11} className="text-gold" />{job.location}</span>
                    <span className="px-2 py-0.5 bg-cream text-navy-900 font-medium">{job.type}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-5">{job.description}</p>
              <a
                href="mailto:hello@gvrealty.com?subject=Career Application"
                className="btn-gold py-3 px-6 text-[10px] inline-flex"
              >
                <Mail size={13} />
                Apply via Email
              </a>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-cream border border-gray-200 p-8 text-center">
          <h3 className="font-display text-2xl text-navy-900 mb-3">Don't See a Fit?</h3>
          <p className="text-gray-500 text-sm mb-6">We're always open to connecting with talented real estate professionals. Send us your resume and we'll keep you in mind for future opportunities.</p>
          <a href="mailto:hello@gvrealty.com?subject=General Enquiry" className="btn-navy inline-flex">
            Get In Touch
          </a>
        </div>
      </div>
    </div>
  )
}
