import { motion } from 'framer-motion'

const LINKS = [
  { label: 'Nakshatra', href: '#platforms' },
  { label: 'BabaJi', href: '#platforms' },
  { label: 'MeraAstroMitr', href: '#platforms' },
  { label: 'Compare', href: '#compare' },
  { label: 'Deploy', href: '#deploy' },
]

export function Footer() {
  return (
    <footer className="relative py-16 px-6 border-t border-white/6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 mb-12">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-3 max-w-xs text-center md:text-left">
            <div className="flex items-center gap-2">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <circle cx="16" cy="16" r="2.5" fill="#FFB347" />
                <circle cx="8" cy="8" r="1.5" fill="#FFD700" />
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
              <span className="font-cinzel font-bold text-lg tracking-widest text-gradient-gold">AllAstro</span>
            </div>
            <p className="font-cormorant text-white/40 text-sm leading-relaxed">
              One universe of Vedic wisdom — three portals, one ecosystem. Built with Claude AI.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-3">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="font-cinzel text-xs tracking-widest text-white/40 hover:text-gold transition-colors uppercase"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="divider-cosmic mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="font-cinzel text-[11px] tracking-widest text-white/25 uppercase">
            © {new Date().getFullYear()} AllAstro · Astrology is guidance, not gospel
          </p>

          <div className="flex items-center gap-2">
            <span className="font-cinzel text-[11px] tracking-widest text-white/25 uppercase">
              Powered by
            </span>
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="font-cinzel text-[11px] tracking-widest text-gold/60 uppercase"
            >
              Claude AI ✦
            </motion.span>
          </div>
        </div>
      </div>
    </footer>
  )
}
