import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

interface Question {
  q: string
  options: { label: string; scores: [number, number, number] }[] // [Nakshatra, BabaJi, MeraAstroMitr]
}

const QUESTIONS: Question[] = [
  {
    q: 'What draws you to Vedic astrology?',
    options: [
      { label: '🎮 I want to learn & level up my cosmic knowledge', scores: [3, 0, 1] },
      { label: '💼 I need accurate reports for major life decisions', scores: [1, 3, 1] },
      { label: '🤖 I want deep AI-powered insights I can chat with', scores: [1, 1, 3] },
    ],
  },
  {
    q: 'How do you prefer to use an astrology app daily?',
    options: [
      { label: '✦ Morning rituals, daily quizzes & streak tracking', scores: [3, 0, 1] },
      { label: '📋 Generate comprehensive reports & save them', scores: [1, 3, 1] },
      { label: '💬 Chat freely and ask follow-up questions', scores: [0, 1, 3] },
    ],
  },
  {
    q: 'Which feature excites you most?',
    options: [
      { label: '🏆 Achievements, oracle cards & cosmic gamification', scores: [3, 0, 0] },
      { label: '🏛️ Live pandit sessions, Vaastu & gem consultancy', scores: [0, 3, 1] },
      { label: '🕸️ Spiderweb RAG, Varshfal & Telegram bot', scores: [0, 1, 3] },
    ],
  },
  {
    q: 'What best describes your experience level?',
    options: [
      { label: '🌱 Curious beginner — I want to explore & learn', scores: [3, 0, 1] },
      { label: '🧘 Intermediate seeker — I trust astrology for decisions', scores: [1, 3, 1] },
      { label: '⚡ Power user — I want data, APIs & offline access', scores: [0, 1, 3] },
    ],
  },
]

const PLATFORMS = [
  {
    name: 'Nakshatra',
    tagline: 'Vedic Wisdom Quest',
    color: '#FFB347',
    glyph: '✦',
    why: 'Your energy matches Nakshatra\'s gamified, daily-ritual-first approach to Vedic learning.',
    href: '#platforms',
  },
  {
    name: 'BabaJi',
    tagline: 'The Digital Pandit',
    color: '#0a9396',
    glyph: 'ॐ',
    why: 'You need the depth of BabaJi — premium consultancy, live sessions and Stripe-backed multi-tier plans.',
    href: '#platforms',
  },
  {
    name: 'MeraAstroMitr',
    tagline: 'Your AI Astrology Companion',
    color: '#9b59b6',
    glyph: '⬡',
    why: 'MeraAstroMitr\'s Spiderweb RAG and streaming chat interface are built for exactly your use case.',
    href: '#platforms',
  },
]

export function PlatformQuiz() {
  const [step, setStep] = useState(0) // 0 = not started, 1-4 = questions, 5 = result
  const [scores, setScores] = useState([0, 0, 0])
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const question = QUESTIONS[step - 1]

  function pickOption(optScores: [number, number, number]) {
    const next = scores.map((s, i) => s + optScores[i]) as [number, number, number]
    setScores(next)
    if (step < QUESTIONS.length) {
      setStep(step + 1)
    } else {
      setStep(5)
    }
  }

  const resultIdx = scores.indexOf(Math.max(...scores))
  const result = PLATFORMS[resultIdx]

  function restart() {
    setStep(0)
    setScores([0, 0, 0])
  }

  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <p className="font-cinzel text-xs tracking-[0.3em] text-gold/60 uppercase mb-3">Interactive</p>
          <h2 className="section-heading text-3xl md:text-4xl text-gradient-gold mb-3">Find Your Portal</h2>
          <p className="font-cormorant text-white/50 text-base max-w-lg mx-auto">
            Answer 4 questions and we'll match you to the platform aligned with your cosmic path.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="start"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              className="glass-gold p-10 text-center"
            >
              <div className="text-5xl mb-4">🔭</div>
              <p className="font-cinzel text-white/70 mb-8 leading-relaxed">
                4 questions · 1 minute · Instant cosmic match
              </p>
              <button onClick={() => setStep(1)} className="btn-primary text-sm">
                Begin Your Quest →
              </button>
            </motion.div>
          )}

          {step >= 1 && step <= 4 && question && (
            <motion.div
              key={`q-${step}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
              className="glass-gold p-8 md:p-10"
            >
              {/* Progress */}
              <div className="flex gap-1.5 mb-8">
                {QUESTIONS.map((_, i) => (
                  <div key={i} className="flex-1 h-1 rounded-full transition-all duration-500"
                    style={{ background: i < step ? '#FFB347' : 'rgba(255,179,71,0.15)' }} />
                ))}
              </div>
              <p className="font-cinzel text-xs tracking-[0.25em] text-gold/50 uppercase mb-3">
                Question {step} of {QUESTIONS.length}
              </p>
              <h3 className="font-cinzel font-bold text-xl md:text-2xl text-white mb-8 leading-snug">
                {question.q}
              </h3>
              <div className="flex flex-col gap-3">
                {question.options.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => pickOption(opt.scores)}
                    className="text-left p-4 rounded-xl border border-white/10 hover:border-gold/40 hover:bg-gold/5 transition-all duration-200 text-sm text-white/75 hover:text-white font-medium leading-relaxed group"
                  >
                    <span className="text-base mr-1">{opt.label.slice(0, 2)}</span>
                    {opt.label.slice(2)}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="glass p-8 md:p-10 border rounded-2xl text-center"
              style={{ borderColor: `${result.color}30` }}
            >
              <p className="font-cinzel text-xs tracking-[0.3em] text-white/30 uppercase mb-4">Your cosmic match</p>
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl font-bold mx-auto mb-5"
                style={{ background: `${result.color}18`, border: `1px solid ${result.color}33`, color: result.color }}
              >
                {result.glyph}
              </div>
              <h3 className="font-cinzel font-black text-3xl mb-1" style={{ color: result.color }}>
                {result.name}
              </h3>
              <p className="font-cinzel text-xs tracking-widest text-white/40 uppercase mb-5">{result.tagline}</p>
              <p className="font-cormorant text-white/65 text-lg leading-relaxed mb-8 max-w-md mx-auto">
                {result.why}
              </p>

              {/* Score bars */}
              <div className="flex flex-col gap-3 mb-8 max-w-xs mx-auto text-left">
                {PLATFORMS.map((p, i) => (
                  <div key={p.name} className="flex items-center gap-3">
                    <span className="font-cinzel text-xs tracking-wide w-28 shrink-0" style={{ color: p.color }}>{p.name}</span>
                    <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: p.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.max(scores[i] / (QUESTIONS.length * 3) * 100, 4)}%` }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                      />
                    </div>
                    <span className="font-cinzel text-xs text-white/30 w-6 text-right">{scores[i]}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                <a href={result.href} className="btn-primary text-sm" style={{ background: `linear-gradient(135deg, ${result.color}, ${result.color}cc)` }}>
                  Explore {result.name} →
                </a>
                <button onClick={restart} className="btn-ghost text-sm">
                  Retake Quiz
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
