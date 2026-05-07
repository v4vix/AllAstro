import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

// ─── Numerology Engine ─────────────────────────────────────────────────────────

function reduceToSingle(n: number, masterNumbers = true): number {
  while (n > 9) {
    if (masterNumbers && (n === 11 || n === 22 || n === 33)) break
    n = String(n).split('').reduce((s, d) => s + parseInt(d), 0)
  }
  return n
}

function lifePathNumber(dateStr: string, masterNumbers = true): number {
  if (!dateStr) return 0
  const [year, month, day] = dateStr.split('-').map(Number)
  const m = reduceToSingle(month, false)
  const d = reduceToSingle(day, false)
  const y = reduceToSingle(
    String(year).split('').reduce((s, c) => s + parseInt(c), 0),
    false
  )
  return reduceToSingle(m + d + y, masterNumbers)
}

// Pythagorean chart
const PYTHAGOREAN: Record<string, number> = {
  a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,
  j:1,k:2,l:3,m:4,n:5,o:6,p:7,q:8,r:9,
  s:1,t:2,u:3,v:4,w:5,x:6,y:7,z:8,
}

function nameToNumber(name: string): number {
  const val = name.toLowerCase().replace(/[^a-z]/g, '').split('')
    .reduce((s, c) => s + (PYTHAGOREAN[c] || 0), 0)
  return val > 0 ? reduceToSingle(val) : 0
}

function expressionNumber(fullName: string): number {
  return nameToNumber(fullName)
}

function soulUrgeNumber(fullName: string): number {
  const vowels = fullName.toLowerCase().replace(/[^aeiou]/g, '')
  return nameToNumber(vowels)
}

function personalityNumber(fullName: string): number {
  const consonants = fullName.toLowerCase().replace(/[^a-z]/g, '').replace(/[aeiou]/g, '')
  return nameToNumber(consonants)
}

function personalYearNumber(dateStr: string): number {
  if (!dateStr) return 0
  const [, month, day] = dateStr.split('-').map(Number)
  const currentYear = new Date().getFullYear()
  const m = reduceToSingle(month, false)
  const d = reduceToSingle(day, false)
  const y = reduceToSingle(String(currentYear).split('').reduce((s, c) => s + parseInt(c), 0), false)
  return reduceToSingle(m + d + y, true)
}

// ─── Meanings ──────────────────────────────────────────────────────────────────

interface NumberMeaning {
  title: string
  essence: string
  strengths: string[]
  challenges: string[]
  lifePurpose: string
  color: string
  planet: string
  gemstone: string
}

const MEANINGS: Record<number, NumberMeaning> = {
  1: { title: 'The Leader', essence: 'Independence, originality, leadership, pioneering spirit',
    strengths: ['Natural leader', 'Innovative thinker', 'Self-reliant', 'Determined'],
    challenges: ['Stubbornness', 'Isolation', 'Arrogance', 'Impatience'],
    lifePurpose: 'To develop individuality and lead others through original thinking and courageous action.',
    color: '#FF6B6B', planet: 'Sun', gemstone: 'Ruby' },
  2: { title: 'The Peacemaker', essence: 'Cooperation, diplomacy, sensitivity, partnership',
    strengths: ['Empathetic', 'Diplomatic', 'Cooperative', 'Intuitive'],
    challenges: ['Oversensitivity', 'Indecisiveness', 'Codependency'],
    lifePurpose: 'To master the art of cooperation, create harmony, and serve as the force that brings balance.',
    color: '#C8D8E8', planet: 'Moon', gemstone: 'Pearl' },
  3: { title: 'The Creator', essence: 'Self-expression, creativity, joy, communication',
    strengths: ['Creative', 'Expressive', 'Inspiring', 'Optimistic'],
    challenges: ['Scattered energy', 'Superficiality', 'Moodiness'],
    lifePurpose: 'To bring joy, creativity, and inspiration to the world through self-expression.',
    color: '#FFD700', planet: 'Jupiter', gemstone: 'Yellow Topaz' },
  4: { title: 'The Builder', essence: 'Stability, discipline, hard work, foundations',
    strengths: ['Reliable', 'Disciplined', 'Methodical', 'Practical'],
    challenges: ['Rigidity', 'Stubbornness', 'Limiting beliefs'],
    lifePurpose: 'To build lasting foundations through persistent effort, discipline, and practicality.',
    color: '#6B8E23', planet: 'Uranus', gemstone: 'Emerald' },
  5: { title: 'The Freedom Seeker', essence: 'Freedom, adventure, versatility, change',
    strengths: ['Adaptable', 'Progressive', 'Adventurous', 'Witty'],
    challenges: ['Restlessness', 'Irresponsibility', 'Impulsiveness'],
    lifePurpose: 'To experience freedom, teach others through example, and champion progressive change.',
    color: '#6BCB77', planet: 'Mercury', gemstone: 'Aquamarine' },
  6: { title: 'The Nurturer', essence: 'Love, responsibility, family, service, balance',
    strengths: ['Nurturing', 'Responsible', 'Compassionate', 'Harmonious'],
    challenges: ['Perfectionism', 'Martyrdom', 'Interference'],
    lifePurpose: 'To create harmony, nurture others, and serve as a force of love and responsibility.',
    color: '#FF88DD', planet: 'Venus', gemstone: 'Rose Quartz' },
  7: { title: 'The Seeker', essence: 'Wisdom, analysis, introspection, spiritual truth',
    strengths: ['Analytical', 'Intuitive', 'Introspective', 'Wise'],
    challenges: ['Isolation', 'Skepticism', 'Secretiveness'],
    lifePurpose: 'To develop deep wisdom, seek truth, and guide others with spiritual and intellectual insight.',
    color: '#9B8ECC', planet: 'Neptune', gemstone: 'Amethyst' },
  8: { title: 'The Powerhouse', essence: 'Material mastery, authority, abundance, karma',
    strengths: ['Ambitious', 'Confident', 'Efficient', 'Authoritative'],
    challenges: ['Materialism', 'Control issues', 'Workaholism'],
    lifePurpose: 'To achieve material mastery, manifest abundance, and use power for the greater good.',
    color: '#8899CC', planet: 'Saturn', gemstone: 'Blue Sapphire' },
  9: { title: 'The Humanitarian', essence: 'Compassion, universal love, service, completion',
    strengths: ['Compassionate', 'Generous', 'Idealistic', 'Wise'],
    challenges: ['Martyrdom', 'Bitterness', 'Impracticality'],
    lifePurpose: 'To serve humanity, complete karmic cycles, and inspire others through compassion.',
    color: '#FF6B00', planet: 'Mars', gemstone: 'Red Coral' },
  11: { title: 'The Intuitive Master', essence: 'Spiritual insight, inspiration, enlightenment (Master Number)',
    strengths: ['Highly intuitive', 'Inspirational', 'Visionary', 'Sensitive'],
    challenges: ['Anxiety', 'Self-doubt', 'Overwhelm'],
    lifePurpose: 'To illuminate others through spiritual insight and serve as a channel of higher wisdom.',
    color: '#E0E0FF', planet: 'Moon+Uranus', gemstone: 'Moonstone' },
  22: { title: 'The Master Builder', essence: 'Practical visionary, large-scale building (Master Number)',
    strengths: ['Visionary builder', 'Powerful', 'Practical', 'Transformative'],
    challenges: ['Pressure', 'Self-doubt', 'Impracticality'],
    lifePurpose: 'To manifest grand visions into reality and create lasting structures that serve humanity.',
    color: '#FFB347', planet: 'Uranus+Earth', gemstone: 'Pyrite' },
  33: { title: 'The Master Teacher', essence: 'Universal love, selfless service, healing (Master Number)',
    strengths: ['Deeply compassionate', 'Healing', 'Inspiring', 'Selfless'],
    challenges: ['Overwhelm', 'Self-sacrifice', 'Unrealistic idealism'],
    lifePurpose: 'To uplift humanity through unconditional love and serve as a vessel of healing and teaching.',
    color: '#FFD700', planet: 'Jupiter+Venus', gemstone: 'Alexandrite' },
}

const PERSONAL_YEAR_MEANINGS: Record<number, { title: string; theme: string }> = {
  1: { title: 'New Beginnings', theme: 'Start fresh. Plant seeds. Take initiative. This is your year to launch what you\'ve been planning.' },
  2: { title: 'Cooperation & Patience', theme: 'Relationships deepen. Patience rewarded. Things mature slowly — trust the process.' },
  3: { title: 'Creative Expansion', theme: 'Express yourself! Social, creative, joyful energy. A year for growth through communication.' },
  4: { title: 'Work & Foundation', theme: 'Build foundations. Hard work pays off. Focus on stability, health, and long-term structures.' },
  5: { title: 'Change & Freedom', theme: 'Embrace change. Travel, adventure, unexpected turns. Stay flexible and open to new directions.' },
  6: { title: 'Love & Responsibility', theme: 'Family, home, commitments. Love deepens. Service to others brings its own reward.' },
  7: { title: 'Inner Reflection', theme: 'A year for retreat, study, and spiritual deepening. Solitude is productive now.' },
  8: { title: 'Abundance & Power', theme: 'Major material opportunities. Business, career, finance take center stage. Harvest what you built.' },
  9: { title: 'Completion & Release', theme: 'Clear out old patterns. Complete cycles. Release what no longer serves you before the new cycle begins.' },
  11: { title: 'Spiritual Awakening', theme: 'A master year. Intuition is heightened. Spiritual insights and unexpected inspiration.' },
  22: { title: 'Master Building', theme: 'Large-scale vision becomes reality. A once-in-a-lifetime year for lasting achievement.' },
}

function getMeaning(n: number): NumberMeaning {
  return MEANINGS[n] || MEANINGS[9]
}

// ─── Components ────────────────────────────────────────────────────────────────

interface NumberCardProps {
  label: string
  number: number
  description: string
  color: string
  onClick: () => void
  active: boolean
}

function NumberCard({ label, number, description, color, onClick, active }: NumberCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full text-left p-5 rounded-2xl border transition-all ${active
        ? 'border-opacity-60 bg-opacity-20'
        : 'border-white/10 bg-white/5 hover:bg-white/8'}`}
      style={active ? { borderColor: `${color}60`, backgroundColor: `${color}15` } : {}}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs tracking-wider uppercase font-cinzel" style={{ color: active ? color : 'rgba(255,255,255,0.4)' }}>{label}</span>
        <span className="text-3xl font-bold font-cinzel" style={{ color }}>{number}</span>
      </div>
      <p className="text-xs text-white/50 leading-relaxed">{description}</p>
    </motion.button>
  )
}

export function NumerologyPage() {
  const [dob, setDob] = useState('')
  const [fullName, setFullName] = useState('')
  const [computed, setComputed] = useState(false)
  const [activeNumber, setActiveNumber] = useState<number | null>(null)

  const lpn = dob ? lifePathNumber(dob) : 0
  const expr = fullName ? expressionNumber(fullName) : 0
  const soul = fullName ? soulUrgeNumber(fullName) : 0
  const pers = fullName ? personalityNumber(fullName) : 0
  const pyear = dob ? personalYearNumber(dob) : 0

  const canCompute = dob && fullName.trim().length > 1

  function handleCompute() {
    if (!canCompute) return
    setComputed(true)
    setActiveNumber(lpn)
  }

  const activeMeaning = activeNumber ? getMeaning(activeNumber) : null
  const pyearMeaning = PERSONAL_YEAR_MEANINGS[pyear] || PERSONAL_YEAR_MEANINGS[1]

  return (
    <div className="min-h-screen bg-void text-white">
      {/* Starfield effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30">
        {Array.from({ length: 60 }).map((_, i) => (
          <div key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              width: Math.random() * 2 + 1 + 'px', height: Math.random() * 2 + 1 + 'px',
              left: Math.random() * 100 + '%', top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 3 + 's', animationDuration: (2 + Math.random() * 2) + 's',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <Link to="/" className="inline-block mb-8 text-gold/60 hover:text-gold text-sm font-cinzel tracking-wider transition-colors">
            ← AllAstro
          </Link>
          <p className="font-cinzel text-xs tracking-[0.3em] text-gold/50 uppercase mb-3">Free Tool</p>
          <h1 className="font-cinzel text-4xl md:text-5xl font-bold text-gradient-gold mb-4">
            Numerology Reading
          </h1>
          <p className="text-white/50 font-cormorant text-lg max-w-md mx-auto">
            Discover your Life Path, Expression, Soul Urge, and Personal Year numbers — and their deeper meaning.
          </p>
        </div>

        {/* Input Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass border border-gold/15 rounded-3xl p-8 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block font-cinzel text-xs tracking-wider text-white/40 uppercase mb-2">Full Name at Birth</label>
              <input
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="As it appears on your birth certificate"
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-gold/50 font-cormorant text-lg"
              />
              <p className="text-xs text-white/25 mt-1">Include all names — first, middle, last</p>
            </div>
            <div>
              <label className="block font-cinzel text-xs tracking-wider text-white/40 uppercase mb-2">Date of Birth</label>
              <input
                type="date"
                value={dob}
                onChange={e => setDob(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold/50 font-cormorant text-lg"
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleCompute}
            disabled={!canCompute}
            className={`w-full py-4 rounded-2xl font-cinzel font-semibold tracking-wider transition-all ${canCompute
              ? 'bg-gradient-to-r from-gold/80 to-saffron/80 hover:from-gold hover:to-saffron text-void cursor-pointer'
              : 'bg-white/10 text-white/30 cursor-not-allowed'}`}
          >
            REVEAL MY NUMBERS
          </motion.button>
        </motion.div>

        {/* Results */}
        <AnimatePresence>
          {computed && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Number Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <NumberCard label="Life Path" number={lpn} description="Your core purpose and life journey"
                  color={getMeaning(lpn).color} onClick={() => setActiveNumber(lpn)} active={activeNumber === lpn} />
                <NumberCard label="Expression" number={expr} description="Talents and abilities expressed"
                  color={getMeaning(expr).color} onClick={() => setActiveNumber(expr)} active={activeNumber === expr} />
                <NumberCard label="Soul Urge" number={soul} description="Inner desires and motivations"
                  color={getMeaning(soul).color} onClick={() => setActiveNumber(soul)} active={activeNumber === soul} />
                <NumberCard label="Personality" number={pers} description="How others perceive you"
                  color={getMeaning(pers).color} onClick={() => setActiveNumber(pers)} active={activeNumber === pers} />
              </div>

              {/* Personal Year */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="glass border border-white/10 rounded-2xl p-5 mb-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-cinzel text-xs tracking-wider text-white/35 uppercase">Personal Year {new Date().getFullYear()}</p>
                    <p className="font-cinzel text-2xl font-bold text-gold">{pyear} — {pyearMeaning.title}</p>
                  </div>
                  <div className="text-5xl font-cinzel font-bold text-gold/20">{pyear}</div>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">{pyearMeaning.theme}</p>
              </motion.div>

              {/* Active Number Deep Dive */}
              <AnimatePresence mode="wait">
                {activeMeaning && activeNumber && (
                  <motion.div
                    key={activeNumber}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="glass rounded-2xl p-6 border"
                    style={{ borderColor: `${activeMeaning.color}25` }}
                  >
                    <div className="flex items-start gap-5 mb-5">
                      <div className="text-6xl font-cinzel font-bold shrink-0" style={{ color: activeMeaning.color }}>
                        {activeNumber}
                      </div>
                      <div>
                        <h3 className="font-cinzel text-xl font-bold text-white mb-1">{activeMeaning.title}</h3>
                        <p className="text-sm" style={{ color: activeMeaning.color }}>{activeMeaning.essence}</p>
                      </div>
                    </div>

                    <p className="text-white/70 leading-relaxed mb-5">{activeMeaning.lifePurpose}</p>

                    <div className="grid grid-cols-2 gap-4 mb-5">
                      <div>
                        <p className="font-cinzel text-xs tracking-wider text-white/30 uppercase mb-2">Strengths</p>
                        <ul className="space-y-1">
                          {activeMeaning.strengths.map(s => (
                            <li key={s} className="text-sm text-white/65 flex items-center gap-2">
                              <span style={{ color: activeMeaning.color }}>✦</span> {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="font-cinzel text-xs tracking-wider text-white/30 uppercase mb-2">Challenges</p>
                        <ul className="space-y-1">
                          {activeMeaning.challenges.map(c => (
                            <li key={c} className="text-sm text-white/65 flex items-center gap-2">
                              <span className="text-white/20">△</span> {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 text-xs">
                      {[['Planet', activeMeaning.planet], ['Gemstone', activeMeaning.gemstone]].map(([k, v]) => (
                        <span key={k} className="px-3 py-1.5 rounded-full border text-white/50"
                          style={{ borderColor: `${activeMeaning.color}30`, backgroundColor: `${activeMeaning.color}10` }}>
                          <span className="text-white/30">{k}: </span>
                          <span style={{ color: activeMeaning.color }}>{v}</span>
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* CTA to full products */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-6 glass border border-gold/10 rounded-2xl p-6 text-center"
              >
                <p className="font-cinzel text-sm tracking-wider text-white/40 uppercase mb-2">Go Deeper</p>
                <p className="text-white/60 text-sm mb-4">
                  Your numerology is one layer. Combine it with your Vedic birth chart for a complete cosmic portrait.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a href="https://meraastromitr-web.onrender.com" target="_blank" rel="noreferrer"
                    className="btn-primary text-sm py-2.5 px-5">
                    Kundli + AI Chart Reading →
                  </a>
                  <Link to="/" className="btn-secondary text-sm py-2.5 px-5">
                    Explore All Platforms
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
