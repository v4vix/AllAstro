import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface Product {
  id: string
  name: string
  subtitle: string
  tagline: string
  description: string
  glassClass: string
  accentColor: string
  glyphColor: string
  glyph: string
  status: string
  statusColor: string
  stack: string[]
  features: string[]
  href: string
}

const PRODUCTS: Product[] = [
  {
    id: 'nakshatra',
    name: 'Nakshatra',
    subtitle: 'Vedic Wisdom Quest',
    tagline: 'FAANG-level gamified Vedic astrology',
    description:
      'A cinematic, cosmic learning platform with achievements, daily rituals, Kundli analysis, Tarot, Numerology and a full Panchanga — powered by Claude AI and wrapped in a starfield UI.',
    glassClass: 'glass-gold',
    accentColor: '#FFB347',
    glyphColor: '#FFD700',
    glyph: '✦',
    status: 'Production Ready',
    statusColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    stack: ['React + Vite', 'Node/Express', 'SQLite', 'Capacitor', 'Claude AI'],
    features: [
      'Kundli & birth-chart analysis',
      'Tarot & oracle cards',
      'Numerology engine',
      'Panchanga & Muhurta',
      'Gamification & achievements',
      'iOS + Android via Capacitor',
    ],
    href: 'https://nakshatra-app.onrender.com',
  },
  {
    id: 'babaji',
    name: 'BabaJi',
    subtitle: 'The Digital Pandit',
    tagline: 'Enterprise-grade Jyotish consultancy',
    description:
      'A full-stack monorepo with AI-driven Kundli rectification, Vaastu video generation, real-time sessions via LiveKit, 4-tier Stripe subscriptions and safety-gated astrology guidance.',
    glassClass: 'glass-teal',
    accentColor: '#0a9396',
    glyphColor: '#0a9396',
    glyph: 'ॐ',
    status: 'Beta',
    statusColor: 'text-sky-400 bg-sky-400/10 border-sky-400/20',
    stack: ['Next.js 15', 'FastAPI', 'PostgreSQL', 'LiveKit', 'Stripe'],
    features: [
      'Kundli rectification + video',
      'Vaastu analysis & report',
      'Real-time consult sessions',
      '4-tier subscriptions (Stripe)',
      'Knowledge graph RAG',
      'Expo React Native app',
    ],
    href: 'https://babaji-web.onrender.com',
  },
  {
    id: 'meraastromitr',
    name: 'MeraAstroMitr',
    subtitle: 'Your AI Astrology Companion',
    tagline: 'Rules-engine SaaS with Spiderweb RAG',
    description:
      'A pluggable spiderweb ingestion/query engine powering Kundli, Rashifal, Varshfal and chat — with offline Ollama fallback, 14 Playwright E2E tests and optional Telegram bot.',
    glassClass: 'glass-purple',
    accentColor: '#9b59b6',
    glyphColor: '#9b59b6',
    glyph: '⬡',
    status: 'Alpha',
    statusColor: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
    stack: ['Next.js 15', 'FastAPI', 'PostgreSQL', 'Spiderweb RAG', 'Playwright'],
    features: [
      'Spiderweb RAG engine',
      'Rashifal & Varshfal AI',
      'Offline mode (Ollama)',
      'Telegram bot interface',
      '14 E2E tests (Playwright)',
      'Referral & billing system',
    ],
    href: 'https://meraastromitr-web.onrender.com',
  },
]

function ProductCard({ p, index }: { p: Product; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.15 }}
      className={`${p.glassClass} p-7 flex flex-col h-full group`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold shrink-0"
          style={{
            background: `${p.accentColor}18`,
            border: `1px solid ${p.accentColor}33`,
            color: p.glyphColor,
            textShadow: `0 0 16px ${p.glyphColor}`,
          }}
        >
          {p.glyph}
        </div>
        <span
          className={`font-cinzel text-[10px] tracking-widest uppercase px-3 py-1 rounded-full border ${p.statusColor}`}
        >
          {p.status}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-cinzel font-bold text-2xl mb-1" style={{ color: p.accentColor }}>
        {p.name}
      </h3>
      <p className="font-cinzel text-xs tracking-widest text-white/40 uppercase mb-3">
        {p.subtitle}
      </p>
      <p className="font-cormorant text-white/70 text-base leading-relaxed mb-5">
        {p.description}
      </p>

      {/* Features */}
      <ul className="space-y-2 mb-6 flex-1">
        {p.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-white/60">
            <span className="mt-0.5 shrink-0" style={{ color: p.accentColor }}>✓</span>
            {f}
          </li>
        ))}
      </ul>

      {/* Stack badges */}
      <div className="flex flex-wrap gap-2 mb-6">
        {p.stack.map((s) => (
          <span
            key={s}
            className="font-cinzel text-[10px] tracking-wide px-2.5 py-1 rounded-full"
            style={{
              background: `${p.accentColor}12`,
              border: `1px solid ${p.accentColor}28`,
              color: `${p.accentColor}cc`,
            }}
          >
            {s}
          </span>
        ))}
      </div>

      {/* CTA */}
      <a
        href={p.href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-sm font-cinzel font-semibold tracking-wide transition-all duration-200 group-hover:gap-3"
        style={{ color: p.accentColor }}
      >
        Explore {p.name}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </a>
    </motion.article>
  )
}

export function Products() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true })

  return (
    <section id="platforms" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-cinzel text-xs tracking-[0.3em] text-gold/60 uppercase mb-3">
            Our Platforms
          </p>
          <h2 className="section-heading text-4xl md:text-5xl text-gradient-gold mb-5">
            Three Portals
          </h2>
          <p className="font-cormorant text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            Each platform targets a distinct niche — from a first-time seeker exploring gamified Vedic wisdom to an enterprise pandit offering AI-generated consultancy reports.
          </p>
        </motion.div>

        <div className="divider-cosmic mb-16" />

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.id} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
