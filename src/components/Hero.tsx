import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
})

const PLANETS = [
  {
    label: 'Nakshatra',
    glyph: '✦',
    color: '#FFB347',
    shadow: 'rgba(255,179,71,0.6)',
    delay: '0s',
    size: 'w-14 h-14',
  },
  {
    label: 'BabaJi',
    glyph: 'ॐ',
    color: '#0a9396',
    shadow: 'rgba(10,147,150,0.6)',
    delay: '2s',
    size: 'w-12 h-12',
  },
  {
    label: 'MeraAstroMitr',
    glyph: '⬡',
    color: '#9b59b6',
    shadow: 'rgba(155,89,182,0.6)',
    delay: '4s',
    size: 'w-12 h-12',
  },
]

export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-6 pt-28 pb-20 text-center overflow-hidden">
      {/* Radial glow behind text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(255,107,0,0.07) 0%, rgba(10,147,150,0.04) 45%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Eyebrow */}
      <motion.div {...fadeUp(0.1)} className="mb-6 flex items-center gap-3">
        <span className="divider-cosmic w-12" />
        <span className="font-cinzel text-xs tracking-[0.3em] text-gold/70 uppercase">
          One Universe · Three Portals
        </span>
        <span className="divider-cosmic w-12" />
      </motion.div>

      {/* Main headline */}
      <motion.h1
        {...fadeUp(0.25)}
        className="font-cinzel font-black leading-none mb-4"
        style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)' }}
      >
        <span className="text-gradient-gold block">AllAstro</span>
      </motion.h1>

      <motion.p
        {...fadeUp(0.4)}
        className="font-cormorant text-white/55 mb-10 max-w-xl mx-auto leading-relaxed"
        style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)' }}
      >
        The complete AI-powered Vedic astrology ecosystem — gamified learning, premium consultancy &amp; rules-engine SaaS, all under one cosmic roof.
      </motion.p>

      {/* CTAs */}
      <motion.div {...fadeUp(0.55)} className="flex flex-wrap items-center justify-center gap-4 mb-20">
        <a href="#platforms" className="btn-primary">
          Explore Platforms
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
        <a href="#deploy" className="btn-ghost">
          Deploy Now
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </a>
      </motion.div>

      {/* Orbiting planet icons */}
      <motion.div
        {...fadeUp(0.7)}
        className="flex items-end justify-center gap-10 md:gap-16"
      >
        {PLANETS.map((p) => (
          <div key={p.label} className="flex flex-col items-center gap-3">
            <div
              className={`${p.size} rounded-full flex items-center justify-center glass border`}
              style={{
                borderColor: `${p.color}33`,
                animation: `float 6s ease-in-out ${p.delay} infinite`,
                boxShadow: `0 0 24px ${p.shadow}33, inset 0 0 12px ${p.shadow}11`,
              }}
            >
              <span
                className="text-2xl leading-none"
                style={{ color: p.color, textShadow: `0 0 12px ${p.shadow}` }}
              >
                {p.glyph}
              </span>
            </div>
            <span
              className="font-cinzel text-xs tracking-widest"
              style={{ color: `${p.color}bb` }}
            >
              {p.label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="font-cinzel text-[10px] tracking-[0.25em] text-white/25 uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
