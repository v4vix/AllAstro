import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

/* ─── Types ─────────────────────────────────────────────────────────────── */

type Track = 'beta' | 'uat' | 'jyotish' | null

interface FormState {
  name: string
  email: string
  extra1: string
  extra2: string
  extra3: string
  submitted: boolean
  loading: boolean
}

const DEFAULT_FORM: FormState = { name: '', email: '', extra1: '', extra2: '', extra3: '', submitted: false, loading: false }

/* ─── Track config ────────────────────────────────────────────────────────── */

const TRACKS = [
  {
    id: 'beta' as Track,
    icon: '⚡',
    title: 'Beta Tester',
    subtitle: 'Early Access Pioneer',
    color: '#9b59b6',
    tagline: 'First to experience every new feature across all three platforms.',
    perks: [
      '30-day early access before general release',
      'Exclusive ⚡ Beta Tester badge on profile',
      'Direct Slack channel with the dev team',
      'Vote on the product roadmap',
      'Free Pro/Elite access during beta period',
    ],
    formFields: [
      { key: 'extra1' as const, label: 'Which platform(s) do you use?', placeholder: 'Nakshatra, BabaJi, MeraAstroMitr...' },
      { key: 'extra2' as const, label: 'Experience level', placeholder: 'Casual user / Power user / Developer' },
      { key: 'extra3' as const, label: 'Primary device', placeholder: 'iOS / Android / Web' },
    ],
    count: 47,
    countLabel: 'Beta Testers enrolled',
  },
  {
    id: 'uat' as Track,
    icon: '🔬',
    title: 'UAT Partner',
    subtitle: 'Enterprise Validation',
    color: '#0a9396',
    tagline: 'Formally validate features before your org adopts them in production.',
    perks: [
      'Dedicated isolated test environment',
      'Pre-seeded accounts for all tier levels',
      'Structured test plans & acceptance checklists',
      '48-hour issue resolution SLA guarantee',
      'Custom integration walkthrough session',
    ],
    formFields: [
      { key: 'extra1' as const, label: 'Organisation / Team', placeholder: 'Company name or team context' },
      { key: 'extra2' as const, label: 'Your role', placeholder: 'QA Engineer / Product Manager / CTO...' },
      { key: 'extra3' as const, label: 'Testing scope', placeholder: 'Which features / platforms to validate' },
    ],
    count: 12,
    countLabel: 'UAT Partners active',
  },
  {
    id: 'jyotish' as Track,
    icon: '✦',
    title: 'Jyotish Scholar',
    subtitle: 'Classical Accuracy Guardian',
    color: '#FFB347',
    tagline: 'Help ensure every calculation honours Brihat Parashara Hora Shastra.',
    perks: [
      'Expert ✦ Pandit badge on your profile',
      'Revenue share on consultations you verify',
      'Access to calculation comparison toolkit',
      'Co-credit on accuracy certification docs',
      'Academic collaboration & citation opportunities',
    ],
    formFields: [
      { key: 'extra1' as const, label: 'Years of Jyotish practice', placeholder: 'e.g. 15 years' },
      { key: 'extra2' as const, label: 'Specialisation', placeholder: 'Parashari / KP / Nadi / Mundane...' },
      { key: 'extra3' as const, label: 'Affiliation / lineage', placeholder: 'Guru / Institute / Self-study...' },
    ],
    count: 8,
    countLabel: 'Scholars reviewing',
  },
]

/* ─── Changelog items ─────────────────────────────────────────────────────── */

const CHANGELOG = [
  { platform: 'Nakshatra', label: 'Learning paths content — 5 courses', status: 'Alpha', color: '#FFB347', note: 'Lesson content live; quiz coverage at 40%' },
  { platform: 'Nakshatra', label: 'Community feed backend', status: 'Alpha', color: '#FFB347', note: 'Post, like, comment — needs moderation tooling' },
  { platform: 'BabaJi', label: 'Kundli video player UI', status: 'Beta', color: '#0a9396', note: 'Narrated chart video renders in < 90s' },
  { platform: 'BabaJi', label: 'Matchmaking result cards', status: 'Beta', color: '#0a9396', note: 'Guna table + compatibility score visualisation' },
  { platform: 'BabaJi', label: 'Vaastu result UI & checklist', status: 'Alpha', color: '#0a9396', note: 'Room-by-room card layout, PDF export coming' },
  { platform: 'MeraAstroMitr', label: 'Consultation booking calendar', status: 'Beta', color: '#9b59b6', note: 'Slot-picker, credit debit, confirmation email' },
  { platform: 'MeraAstroMitr', label: 'Mantra & Totke UI', status: 'Beta', color: '#9b59b6', note: 'Personalised from weak-planet kundli data' },
  { platform: 'MeraAstroMitr', label: 'Vastu Shastra page (Pro)', status: 'Alpha', color: '#9b59b6', note: 'Upload floor plan → AI checklist + PDF' },
]

const STATUS_STYLE: Record<string, string> = {
  Alpha: 'text-amber-400 bg-amber-400/10 border-amber-400/25',
  Beta: 'text-sky-400 bg-sky-400/10 border-sky-400/25',
}

/* ─── TrackCard ──────────────────────────────────────────────────────────── */

function TrackCard({ track, index, activeTrack, onSelect }: {
  track: typeof TRACKS[0]; index: number; activeTrack: Track; onSelect: (t: Track) => void
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isOpen = activeTrack === track.id
  const [form, setForm] = useState<FormState>(DEFAULT_FORM)

  function set(key: keyof FormState, val: string) {
    setForm(f => ({ ...f, [key]: val }))
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    setForm(f => ({ ...f, loading: true }))
    // Simulated submission delay
    setTimeout(() => setForm(f => ({ ...f, loading: false, submitted: true })), 1200)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="glass border rounded-2xl overflow-hidden"
      style={{ borderColor: `${track.color}${isOpen ? '50' : '20'}`, transition: 'border-color 0.3s' }}
    >
      {/* Header — always visible */}
      <button
        className="w-full p-7 flex items-start gap-5 text-left group"
        onClick={() => onSelect(isOpen ? null : track.id)}
        aria-expanded={isOpen}
      >
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 transition-all duration-300"
          style={{
            background: `${track.color}18`,
            border: `1px solid ${track.color}33`,
            color: track.color,
            boxShadow: isOpen ? `0 0 24px ${track.color}33` : 'none',
          }}
        >
          {track.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="font-cinzel font-bold text-xl" style={{ color: track.color }}>{track.title}</h3>
            <span className="font-cinzel text-[10px] tracking-widest text-white/35 uppercase px-2 py-0.5 rounded-full border border-white/10">
              {track.count} enrolled
            </span>
          </div>
          <p className="font-cinzel text-xs tracking-widest text-white/35 uppercase mb-2">{track.subtitle}</p>
          <p className="text-sm text-white/55 leading-relaxed">{track.tagline}</p>
        </div>
        <svg
          className="shrink-0 mt-1 transition-transform duration-300 text-white/30"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-7 pb-8 border-t border-white/6 pt-6 grid md:grid-cols-2 gap-8">
              {/* Perks */}
              <div>
                <p className="font-cinzel text-xs tracking-widest text-white/30 uppercase mb-4">What you get</p>
                <ul className="space-y-3">
                  {track.perks.map(p => (
                    <li key={p} className="flex items-start gap-2 text-sm text-white/65">
                      <span className="mt-0.5 shrink-0" style={{ color: track.color }}>✓</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Application form */}
              <div>
                {form.submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-full gap-4 text-center py-8"
                  >
                    <span className="text-4xl">✦</span>
                    <h4 className="font-cinzel font-bold text-lg" style={{ color: track.color }}>Application Received!</h4>
                    <p className="text-sm text-white/55 max-w-xs">
                      We'll review your application and reach out within 48 hours via email.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={submit} className="flex flex-col gap-4">
                    <p className="font-cinzel text-xs tracking-widest text-white/30 uppercase mb-1">Apply now</p>
                    <div>
                      <label className="font-cinzel text-[10px] tracking-widest text-white/30 uppercase block mb-1">Full Name *</label>
                      <input
                        required
                        value={form.name}
                        onChange={e => set('name', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/25"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="font-cinzel text-[10px] tracking-widest text-white/30 uppercase block mb-1">Email *</label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={e => set('email', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/25"
                        placeholder="you@example.com"
                      />
                    </div>
                    {track.formFields.map(f => (
                      <div key={f.key}>
                        <label className="font-cinzel text-[10px] tracking-widest text-white/30 uppercase block mb-1">{f.label}</label>
                        <input
                          value={form[f.key] as string}
                          onChange={e => set(f.key, e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/25"
                          placeholder={f.placeholder}
                        />
                      </div>
                    ))}
                    <button
                      type="submit"
                      disabled={form.loading}
                      className="btn-primary text-sm mt-1 justify-center"
                      style={{ background: `linear-gradient(135deg, ${track.color}, ${track.color}cc)` }}
                    >
                      {form.loading ? (
                        <span className="flex items-center gap-2">
                          <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="inline-block">✦</motion.span>
                          Submitting…
                        </span>
                      ) : `Apply as ${track.title}`}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export function BetaAccess() {
  const [activeTrack, setActiveTrack] = useState<Track>(null)
  const changelogRef = useRef(null)
  const changelogInView = useInView(changelogRef, { once: true, margin: '-60px' })

  return (
    <main>
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-[55vh] px-6 pt-32 pb-16 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(155,89,182,0.08) 0%, rgba(10,147,150,0.04) 40%, transparent 70%)' }}
        />
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="divider-cosmic w-12" />
            <span className="font-cinzel text-xs tracking-[0.3em] text-gold/60 uppercase">Exclusive Access</span>
            <span className="divider-cosmic w-12" />
          </div>
          <h1 className="font-cinzel font-black text-gradient-gold leading-none mb-5"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}>
            Shape the Future<br />of Vedic AI
          </h1>
          <p className="font-cormorant text-white/55 max-w-xl mx-auto leading-relaxed mb-8"
            style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)' }}>
            Three access tracks. Beta testers, enterprise UAT partners and Jyotish scholars — all shaping the next generation of cosmic intelligence.
          </p>

          {/* Live stats strip */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {TRACKS.map(t => (
              <div key={t.id} className="flex items-center gap-2">
                <span style={{ color: t.color, fontSize: '16px' }}>{t.icon}</span>
                <span className="font-cinzel text-xs tracking-wide" style={{ color: t.color }}>{t.count}</span>
                <span className="text-white/35 text-xs">{t.countLabel}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Track cards */}
      <section className="py-4 px-6 pb-24">
        <div className="max-w-4xl mx-auto flex flex-col gap-5">
          <div className="text-center mb-8">
            <p className="font-cinzel text-xs tracking-[0.3em] text-gold/60 uppercase mb-3">Choose Your Track</p>
            <p className="text-white/40 text-sm">Click a track to expand and apply</p>
          </div>
          {TRACKS.map((t, i) => (
            <TrackCard key={t.id} track={t} index={i} activeTrack={activeTrack} onSelect={setActiveTrack} />
          ))}
        </div>
      </section>

      {/* Changelog */}
      <section className="py-16 px-6 pb-24" ref={changelogRef}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={changelogInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-10"
          >
            <p className="font-cinzel text-xs tracking-[0.3em] text-gold/60 uppercase mb-3">What to Test</p>
            <h2 className="section-heading text-3xl text-gradient-gold">Currently in Beta</h2>
          </motion.div>

          <div className="divider-cosmic mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CHANGELOG.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -10 }}
                animate={changelogInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="glass border border-white/8 rounded-xl p-4 flex items-start gap-4 hover:border-white/15 transition-colors"
              >
                <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ background: item.color }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-cinzel text-xs font-semibold" style={{ color: item.color }}>{item.platform}</span>
                    <span className={`font-cinzel text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full border ${STATUS_STYLE[item.status]}`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-sm text-white/75 font-medium mb-1">{item.label}</p>
                  <p className="text-xs text-white/35 leading-relaxed">{item.note}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-8 px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          <h3 className="font-cinzel text-xl text-center text-white/60 mb-8">Frequently Asked</h3>
          <div className="flex flex-col gap-4">
            {[
              ['Who can apply?', 'Anyone — from daily astrology enthusiasts to enterprise QA teams and traditional Jyotish pandits. Each track has its own focus.'],
              ['Is beta access free?', "Yes. Beta Testers and Jyotish Scholars get free Pro/Elite access on the platform they're testing. UAT partners get a full sandbox at no cost."],
              ['How long does beta access last?', "Typically 30-90 days per feature cycle. You'll receive an email when access renews or ends."],
              ['Can I be on multiple tracks?', 'Absolutely. Many of our contributors are Jyotish scholars who are also power users on the beta programme.'],
            ].map(([q, a]) => (
              <div key={q} className="glass border border-white/8 rounded-xl p-5">
                <p className="font-cinzel text-sm font-semibold text-white/80 mb-2">{q}</p>
                <p className="text-sm text-white/45 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer strip */}
      <div className="border-t border-white/6 py-10 px-6 text-center">
        <p className="font-cinzel text-[11px] tracking-widest text-white/20 uppercase">
          © {new Date().getFullYear()} AllAstro · Beta programme · Astrology is guidance, not gospel
        </p>
      </div>
    </main>
  )
}
