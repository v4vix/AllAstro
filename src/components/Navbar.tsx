import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

const links = [
  { label: 'Platforms', href: '/#platforms' },
  { label: 'Compare', href: '/#compare' },
  { label: 'Deploy', href: '/#deploy' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const isBeta = location.pathname === '/beta'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-5'}`}
    >
      <div
        className={`mx-auto max-w-6xl px-6 flex items-center justify-between rounded-2xl transition-all duration-500 ${
          scrolled ? 'glass border border-white/10 shadow-lg shadow-black/30' : ''
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <circle cx="16" cy="16" r="2.5" fill="#FFB347" />
            <circle cx="8" cy="8" r="1.5" fill="#FFD700" className="animate-twinkle" />
            <circle cx="24" cy="8" r="1.2" fill="#FFB347" />
            <circle cx="6" cy="20" r="1" fill="#9B59B6" />
            <circle cx="26" cy="22" r="1.3" fill="#00FFCC" />
            <circle cx="16" cy="28" r="1.1" fill="#FFB347" />
            <line x1="16" y1="16" x2="8" y2="8" stroke="rgba(255,179,71,0.4)" strokeWidth="0.8" />
            <line x1="16" y1="16" x2="24" y2="8" stroke="rgba(255,179,71,0.4)" strokeWidth="0.8" />
            <line x1="16" y1="16" x2="26" y2="22" stroke="rgba(255,179,71,0.3)" strokeWidth="0.8" />
            <line x1="16" y1="16" x2="6" y2="20" stroke="rgba(155,89,182,0.3)" strokeWidth="0.8" />
            <line x1="16" y1="16" x2="16" y2="28" stroke="rgba(0,255,204,0.25)" strokeWidth="0.8" />
          </svg>
          <span className="font-cinzel font-bold text-lg tracking-widest text-gradient-gold">
            AllAstro
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {!isBeta && links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-cinzel text-sm font-semibold tracking-widest text-white/60 hover:text-gold transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/beta"
            className={`font-cinzel text-sm font-semibold tracking-widest transition-colors duration-200 ${
              isBeta ? 'text-gold' : 'text-white/60 hover:text-gold'
            }`}
          >
            Beta Access
          </Link>
        </nav>

        {/* CTA */}
        {!isBeta ? (
          <a href="/#platforms" className="hidden md:inline-flex btn-primary text-sm py-2 px-5">
            Explore Universe
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        ) : (
          <Link to="/" className="hidden md:inline-flex btn-ghost text-sm py-2 px-5">
            ← Hub
          </Link>
        )}

        {/* Hamburger */}
        <button
          className="md:hidden p-2 text-white/70 hover:text-gold transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mx-4 mt-2 glass border border-white/10 rounded-xl p-5 flex flex-col gap-4"
          >
            {!isBeta && links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="font-cinzel text-sm font-semibold tracking-widest text-white/70 hover:text-gold transition-colors">
                {l.label}
              </a>
            ))}
            <Link to="/beta" onClick={() => setOpen(false)}
              className="font-cinzel text-sm font-semibold tracking-widest text-gold">
              Beta Access ✦
            </Link>
            {!isBeta ? (
              <a href="/#platforms" onClick={() => setOpen(false)} className="btn-primary text-sm text-center justify-center">
                Explore Universe
              </a>
            ) : (
              <Link to="/" onClick={() => setOpen(false)} className="btn-ghost text-sm text-center justify-center">
                ← Back to Hub
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
