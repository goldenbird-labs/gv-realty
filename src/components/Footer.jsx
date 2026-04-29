import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'

const InstagramIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)
const LinkedinIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
)
const XIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)
const FacebookIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

const footerLinks = {
  Properties: [
    { label: 'For Sale', href: '/properties?type=sale' },
    { label: 'For Rent', href: '/properties?type=rent' },
    { label: 'Commercial', href: '/properties?type=commercial' },
    { label: 'Featured', href: '/properties?featured=true' },
  ],
  Services: [
    { label: 'REOs & Short Sales', href: '/services' },
    { label: 'HUD Homes', href: '/services' },
    { label: 'Property Management', href: '/services' },
    { label: 'Our Partners', href: '/partners' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Agents', href: '/about#team' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Fair Housing', href: '/fair-housing' },
    { label: 'Accessibility', href: '/accessibility' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2 md:col-span-2">
            <Link to="/" className="flex flex-col leading-none mb-6">
              <span className="font-display text-2xl font-semibold tracking-wide">G&V</span>
              <span className="text-[9px] tracking-[0.35em] uppercase text-gold font-medium mt-0.5">Realty Group</span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-xs">
              California & Florida real estate — residential, commercial, and investment properties for buyers, sellers, and investors.
            </p>
            <div className="space-y-3 text-sm text-white/40">
              <div className="flex items-center gap-2">
                <Phone size={13} className="text-gold" />
                <span>+1 (562) 659-8722</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={13} className="text-gold" />
                <span>REO@HomesGandV.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={13} className="text-gold mt-0.5 shrink-0" />
                <span>10630 Downey Ave #100B, Downey CA<br />1031 Ives Dairy Rd #228, Miami FL</span>
              </div>
            </div>
            <p className="text-white/20 text-[10px] mt-4 leading-relaxed">
              CA BRE #01873038 · FL BRE #BK3351317 · NMLS #310884
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gold mb-5">{category}</h4>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/40 hover:text-gold transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <p className="text-white/25 text-xs">© {new Date().getFullYear()} G&V Options & Solutions, Inc. All rights reserved.</p>
            <span className="hidden sm:block text-white/10 text-xs">·</span>
            <p className="text-white/25 text-xs">
              Built & powered by{' '}
              <a href="https://birdlabs.net" target="_blank" rel="noopener noreferrer" className="text-gold/50 hover:text-gold transition-colors">
                Bird Labs
              </a>
            </p>
          </div>
          <div className="flex items-center gap-4">
            {[
              { Icon: FacebookIcon, href: 'https://www.facebook.com/gvrealtygroup', label: 'Facebook' },
              { Icon: InstagramIcon, href: 'https://www.instagram.com/gvrealtygroup', label: 'Instagram' },
              { Icon: LinkedinIcon, href: 'https://www.linkedin.com/company/gvrealtygroup', label: 'LinkedIn' },
              { Icon: XIcon, href: 'https://www.x.com/gvrealtygroup', label: 'X' },
            ].map(({ Icon, href, label }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 border border-white/10 flex items-center justify-center text-white/30 hover:text-gold hover:border-gold/40 transition-all"
              >
                <Icon size={13} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
