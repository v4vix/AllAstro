import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

type Support = 'yes' | 'partial' | 'no'

interface Feature {
  label: string
  nakshatra: Support
  babaji: Support
  meraastromitr: Support
  category: string
}

const FEATURES: Feature[] = [
  // Core readings
  { label: 'Kundli / Birth Chart', nakshatra: 'yes', babaji: 'yes', meraastromitr: 'yes', category: 'Core' },
  { label: 'Tarot Readings', nakshatra: 'yes', babaji: 'yes', meraastromitr: 'yes', category: 'Core' },
  { label: 'Numerology', nakshatra: 'yes', babaji: 'yes', meraastromitr: 'yes', category: 'Core' },
  { label: 'Panchanga & Muhurta', nakshatra: 'yes', babaji: 'yes', meraastromitr: 'partial', category: 'Core' },
  { label: 'Rashifal (Horoscope)', nakshatra: 'partial', babaji: 'yes', meraastromitr: 'yes', category: 'Core' },
  { label: 'Varshfal (Annual)', nakshatra: 'no', babaji: 'partial', meraastromitr: 'yes', category: 'Core' },
  { label: 'Vaastu Analysis', nakshatra: 'yes', babaji: 'yes', meraastromitr: 'partial', category: 'Core' },
  { label: 'Compatibility Match', nakshatra: 'yes', babaji: 'yes', meraastromitr: 'yes', category: 'Core' },
  // AI & Tech
  { label: 'AI Chat Interface', nakshatra: 'yes', babaji: 'partial', meraastromitr: 'yes', category: 'AI & Tech' },
  { label: 'Video Generation', nakshatra: 'no', babaji: 'yes', meraastromitr: 'no', category: 'AI & Tech' },
  { label: 'Offline Mode', nakshatra: 'yes', babaji: 'no', meraastromitr: 'yes', category: 'AI & Tech' },
  { label: 'Telegram Bot', nakshatra: 'no', babaji: 'no', meraastromitr: 'yes', category: 'AI & Tech' },
  // Platform
  { label: 'Mobile App', nakshatra: 'yes', babaji: 'yes', meraastromitr: 'partial', category: 'Platform' },
  { label: 'Stripe Billing', nakshatra: 'partial', babaji: 'yes', meraastromitr: 'yes', category: 'Platform' },
  { label: 'Gamification', nakshatra: 'yes', babaji: 'no', meraastromitr: 'no', category: 'Platform' },
  { label: 'Real-time Sessions', nakshatra: 'no', babaji: 'yes', meraastromitr: 'no', category: 'Platform' },
  { label: 'Safety Gates', nakshatra: 'yes', babaji: 'yes', meraastromitr: 'yes', category: 'Platform' },
  { label: 'E2E Test Suite', nakshatra: 'no', babaji: 'partial', meraastromitr: 'yes', category: 'Platform' },
]

const COLS = [
  { key: 'nakshatra' as const, label: 'Nakshatra', color: '#FFB347' },
  { key: 'babaji' as const, label: 'BabaJi', color: '#0a9396' },
  { key: 'meraastromitr' as const, label: 'MeraAstroMitr', color: '#9b59b6' },
]

const CATEGORIES = [...new Set(FEATURES.map((f) => f.category))]

function SupportIcon({ s }: { s: Support }) {
  if (s === 'yes')
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-500/30">
        <svg className="text-emerald-400" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </span>
    )
  if (s === 'partial')
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-500/15 border border-amber-500/30">
        <svg className="text-amber-400" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M5 12h14" />
        </svg>
      </span>
    )
  return (
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/5 border border-white/10">
      <svg className="text-white/20" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </span>
  )
}

export function FeatureMatrix() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true })

  return (
    <section id="compare" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-cinzel text-xs tracking-[0.3em] text-gold/60 uppercase mb-3">
            Feature Comparison
          </p>
          <h2 className="section-heading text-4xl md:text-5xl text-gradient-gold mb-5">
            What's Inside
          </h2>
          <p className="font-cormorant text-white/50 text-lg max-w-2xl mx-auto">
            18 features across core readings, AI capabilities and platform infrastructure.
          </p>
        </motion.div>

        <div className="divider-cosmic mb-10" />

        {/* Legend */}
        <div className="flex flex-wrap gap-5 justify-center mb-10 text-sm text-white/50">
          <span className="flex items-center gap-2"><SupportIcon s="yes" /> Full support</span>
          <span className="flex items-center gap-2"><SupportIcon s="partial" /> Partial / planned</span>
          <span className="flex items-center gap-2"><SupportIcon s="no" /> Not available</span>
        </div>

        {/* Table */}
        <div className="glass border border-white/8 rounded-2xl overflow-x-auto">
          <div className="min-w-[520px]">
          {/* Sticky column headers */}
          <div className="grid grid-cols-[1fr_repeat(3,minmax(100px,140px))] bg-cosmos/80 border-b border-white/8">
            <div className="px-5 py-4 font-cinzel text-xs tracking-widest text-white/30 uppercase">Feature</div>
            {COLS.map((c) => (
              <div
                key={c.key}
                className="px-3 py-4 font-cinzel text-xs tracking-wide font-semibold text-center uppercase"
                style={{ color: c.color }}
              >
                {c.label}
              </div>
            ))}
          </div>

          {CATEGORIES.map((cat) => (
            <div key={cat}>
              {/* Category row */}
              <div className="grid grid-cols-[1fr_repeat(3,minmax(100px,140px))] bg-white/[0.02] border-y border-white/5">
                <div className="px-5 py-2 font-cinzel text-[10px] tracking-[0.25em] text-white/30 uppercase col-span-4">
                  {cat}
                </div>
              </div>

              {FEATURES.filter((f) => f.category === cat).map((feat, i) => (
                <FeatureRow key={feat.label} feat={feat} i={i} />
              ))}
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FeatureRow({ feat, i }: { feat: Feature; i: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -10 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: i * 0.04 }}
      className="grid grid-cols-[1fr_repeat(3,minmax(100px,140px))] border-b border-white/5 last:border-0 hover:bg-white/[0.025] transition-colors"
    >
      <div className="px-5 py-3.5 text-sm text-white/70">{feat.label}</div>
      {COLS.map((c) => (
        <div key={c.key} className="flex items-center justify-center py-3.5">
          <SupportIcon s={feat[c.key]} />
        </div>
      ))}
    </motion.div>
  )
}
