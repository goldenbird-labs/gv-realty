import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Heart, ChevronDown } from 'lucide-react'
import { useStore } from '../store/useStore'
import gvLogo from '../assets/Gvlogo.png'

const navLinks = [
  { label: 'Properties', href: '/properties', children: [
    { label: 'For Sale', href: '/properties?type=sale' },
    { label: 'For Rent', href: '/properties?type=rent' },
    { label: 'Commercial', href: '/properties?type=commercial' },
  ]},
  { label: 'Services', href: '/services', children: [
    { label: 'REOs & Short Sales', href: '/services#reo' },
    { label: 'HUD & Probate', href: '/services#hud' },
    { label: 'Property Management', href: '/services#management' },
    { label: 'Our Partners', href: '/partners' },
  ]},
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdown, setDropdown] = useState(null)
  const { saved } = useStore()
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMobileOpen(false), [location])

  const navBg = scrolled || !isHome
    ? 'bg-navy-900 shadow-lg'
    : 'bg-transparent'

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo — hidden on home page since hero displays it */}
          {!isHome && (
            <Link to="/">
              <img src={gvLogo} alt="G&V Realty Group" className="h-12 w-auto object-contain" style={{ filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.85)) brightness(1.3)' }} />
            </Link>
          )}

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setDropdown(link.label)}
                onMouseLeave={() => setDropdown(null)}
              >
                <Link
                  to={link.href}
                  className="flex items-center gap-1 text-xs font-medium tracking-[0.12em] uppercase text-white/70 hover:text-gold transition-colors duration-200"
                >
                  {link.label}
                  {link.children && <ChevronDown size={12} />}
                </Link>

                <AnimatePresence>
                  {link.children && dropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 w-44 bg-white shadow-xl border border-gray-100 py-2"
                    >
                      {link.children.map(child => (
                        <Link
                          key={child.label}
                          to={child.href}
                          className="block px-5 py-2.5 text-xs font-medium tracking-wide text-navy-900 hover:bg-cream hover:text-gold transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Link to="/saved" className="relative p-2 text-white/70 hover:text-gold transition-colors">
              <Heart size={18} />
              {saved.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold text-navy-900 text-[9px] font-bold rounded-full flex items-center justify-center">
                  {saved.length}
                </span>
              )}
            </Link>
            <Link to="/contact" className="btn-gold py-2.5 px-6 text-[10px]">
              List Property
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-white p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-navy-900 border-t border-white/10 px-6 py-6 flex flex-col gap-5"
          >
            {navLinks.map(link => (
              <div key={link.label}>
                <Link
                  to={link.href}
                  className="block text-xs font-medium tracking-[0.15em] uppercase text-white/70 hover:text-gold transition-colors mb-2"
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="pl-4 flex flex-col gap-2">
                    {link.children.map(child => (
                      <Link
                        key={child.label}
                        to={child.href}
                        className="text-xs text-white/50 hover:text-gold transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link to="/contact" className="btn-gold py-3 text-center text-[10px] justify-center mt-2">
              List Property
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
