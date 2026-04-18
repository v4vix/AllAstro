import { useRef, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'

/* ─── Vedic computations ────────────────────────────────────────────────── */

const VARA = [
  { name: 'Ravivar', english: 'Sunday', lord: 'Sun', sanskrit: 'Surya', color: '#FFB347', gem: 'Ruby', number: 1, mantra: 'ॐ सूर्याय नमः', best: ['Leadership', 'Government', 'Health'] },
  { name: 'Somavar', english: 'Monday', lord: 'Moon', sanskrit: 'Chandra', color: '#C8D8E8', gem: 'Pearl', number: 2, mantra: 'ॐ चंद्राय नमः', best: ['Travel', 'Creativity', 'Emotions'] },
  { name: 'Mangalvar', english: 'Tuesday', lord: 'Mars', sanskrit: 'Mangala', color: '#FF6B6B', gem: 'Red Coral', number: 9, mantra: 'ॐ मंगलाय नमः', best: ['Courage', 'Property', 'Surgery'] },
  { name: 'Budhavar', english: 'Wednesday', lord: 'Mercury', sanskrit: 'Budha', color: '#6BCB77', gem: 'Emerald', number: 5, mantra: 'ॐ बुधाय नमः', best: ['Business', 'Education', 'Comm.'] },
  { name: 'Guruvar', english: 'Thursday', lord: 'Jupiter', sanskrit: 'Guru', color: '#FFD700', gem: 'Yellow Sapphire', number: 3, mantra: 'ॐ गुरवे नमः', best: ['Wisdom', 'Teaching', 'Finance'] },
  { name: 'Shukravar', english: 'Friday', lord: 'Venus', sanskrit: 'Shukra', color: '#FF88DD', gem: 'Diamond', number: 6, mantra: 'ॐ शुक्राय नमः', best: ['Love', 'Arts', 'Luxury'] },
  { name: 'Shanivar', english: 'Saturday', lord: 'Saturn', sanskrit: 'Shani', color: '#8899CC', gem: 'Blue Sapphire', number: 8, mantra: 'ॐ शनये नमः', best: ['Discipline', 'Service', 'Justice'] },
]

// Hora sequence: Sun → Venus → Mercury → Moon → Saturn → Jupiter → Mars (repeats)
const HORA_SEQ = ['Sun', 'Venus', 'Mercury', 'Moon', 'Saturn', 'Jupiter', 'Mars']
const VARA_FIRST_HORA: Record<number, number> = { 0: 0, 1: 3, 2: 6, 3: 2, 4: 5, 5: 1, 6: 4 }
const HORA_COLORS: Record<string, string> = {
  Sun: '#FFB347', Venus: '#FF88DD', Mercury: '#6BCB77', Moon: '#C8D8E8',
  Saturn: '#8899CC', Jupiter: '#FFD700', Mars: '#FF6B6B',
}

// Reference new moon: 2024-01-11 11:57 UTC
const REF_NEW_MOON_TS = 1704970620000
const LUNAR_CYCLE_MS = 29.530588 * 86400 * 1000

const TITHIS = ['Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami', 'Shashthi',
  'Saptami', 'Ashtami', 'Navami', 'Dashami', 'Ekadashi', 'Dwadashi', 'Trayodashi',
  'Chaturdashi', 'Purnima / Amavasya']

function computeCosmicData() {
  const now = new Date()
  const vara = VARA[now.getDay()]

  // Moon phase
  const elapsed = now.getTime() - REF_NEW_MOON_TS
  const cyclePos = ((elapsed % LUNAR_CYCLE_MS) + LUNAR_CYCLE_MS) % LUNAR_CYCLE_MS
  const dayInCycle = cyclePos / LUNAR_CYCLE_MS * 29.530588
  const illumination = Math.round(50 * (1 - Math.cos(2 * Math.PI * cyclePos / LUNAR_CYCLE_MS)))
  const tithiIndex = Math.floor(cyclePos / LUNAR_CYCLE_MS * 30) % 15
  const paksha = dayInCycle < 15 ? 'Shukla Paksha ☀' : 'Krishna Paksha 🌑'

  let moonPhase: string
  let moonEmoji: string
  if (dayInCycle < 1.85) { moonPhase = 'New Moon'; moonEmoji = '🌑' }
  else if (dayInCycle < 7.38) { moonPhase = 'Waxing Crescent'; moonEmoji = '🌒' }
  else if (dayInCycle < 9.22) { moonPhase = 'First Quarter'; moonEmoji = '🌓' }
  else if (dayInCycle < 14.77) { moonPhase = 'Waxing Gibbous'; moonEmoji = '🌔' }
  else if (dayInCycle < 16.61) { moonPhase = 'Full Moon'; moonEmoji = '🌕' }
  else if (dayInCycle < 22.15) { moonPhase = 'Waning Gibbous'; moonEmoji = '🌖' }
  else if (dayInCycle < 23.99) { moonPhase = 'Last Quarter'; moonEmoji = '🌗' }
  else { moonPhase = 'Waning Crescent'; moonEmoji = '🌘' }

  // Current hora
  const horaStartIdx = VARA_FIRST_HORA[now.getDay()]
  const currentHoraIdx = (horaStartIdx + now.getHours()) % 7
  const currentHora = HORA_SEQ[currentHoraIdx]
  const horaEndsAt = new Date(now)
  horaEndsAt.setMinutes(0, 0, 0)
  horaEndsAt.setHours(horaEndsAt.getHours() + 1)
  const minsLeft = Math.round((horaEndsAt.getTime() - now.getTime()) / 60000)

  return { vara, moonPhase, moonEmoji, illumination, tithiIndex, paksha, currentHora, minsLeft }
}

export function DailyBrief() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const data = useMemo(computeCosmicData, [])

  const cards = [
    {
      label: 'Today\'s Vara',
      icon: data.vara.mantra,
      value: data.vara.name,
      sub: `Ruled by ${data.vara.lord} (${data.vara.sanskrit})`,
      detail: `Lucky: ${data.vara.gem} · No. ${data.vara.number}`,
      color: data.vara.color,
      tags: data.vara.best,
    },
    {
      label: 'Moon Phase',
      icon: data.moonEmoji,
      value: data.moonPhase,
      sub: TITHIS[data.tithiIndex],
      detail: `${data.paksha} · ${data.illumination}% lit`,
      color: '#C8D8E8',
      tags: [],
    },
    {
      label: 'Current Hora',
      icon: '⌚',
      value: `${data.currentHora} Hora`,
      sub: `${data.minsLeft} min remaining`,
      detail: 'Planetary hour governs quality of action',
      color: HORA_COLORS[data.currentHora] || '#FFB347',
      tags: [],
    },
  ]

  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <p className="font-cinzel text-xs tracking-[0.3em] text-gold/60 uppercase mb-3">Live Today</p>
          <h2 className="section-heading text-3xl md:text-4xl text-gradient-gold mb-3">
            Cosmic Daily Brief
          </h2>
          <p className="font-cormorant text-white/50 text-base max-w-lg mx-auto">
            Real-time Vedic calendar data — no sign-up required. Vara, Moon phase &amp; planetary hora, computed for right now.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {cards.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="glass border rounded-2xl p-6 flex flex-col gap-3"
              style={{ borderColor: `${c.color}22` }}
            >
              <span className="font-cinzel text-[10px] tracking-[0.25em] text-white/35 uppercase">{c.label}</span>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{c.icon}</span>
                <div>
                  <p className="font-cinzel font-bold text-lg leading-tight" style={{ color: c.color }}>{c.value}</p>
                  <p className="text-xs text-white/50 mt-0.5">{c.sub}</p>
                </div>
              </div>
              <p className="text-xs text-white/35 leading-relaxed">{c.detail}</p>
              {c.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {c.tags.map((t) => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-full"
                      style={{ background: `${c.color}18`, color: `${c.color}cc`, border: `1px solid ${c.color}28` }}>
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Auspicious mantra strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="glass border border-gold/12 rounded-xl px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div>
            <p className="font-cinzel text-xs tracking-widest text-white/30 uppercase mb-1">Today's Mantra</p>
            <p className="font-cormorant text-xl text-gold/80">{data.vara.mantra}</p>
          </div>
          <div className="text-center md:text-right">
            <p className="font-cinzel text-xs tracking-widest text-white/30 uppercase mb-1">Best Activities Today</p>
            <p className="text-sm text-white/55">{data.vara.best.join(' · ')}</p>
          </div>
          <a href="/#platforms" className="shrink-0 btn-primary text-xs py-2 px-4">
            Full Panchanga →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
