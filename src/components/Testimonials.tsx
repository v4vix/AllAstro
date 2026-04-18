import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    role: 'Software Engineer',
    city: 'Mumbai',
    platform: 'Nakshatra',
    platformColor: '#FFB347',
    stars: 5,
    text: "I've tried 5 astrology apps. Nakshatra's gamification actually made me want to learn Vedic astrology properly. My Kundli analysis predicted my job change 3 months before it happened — the Oracle AI is shockingly good.",
    avatar: 'PS',
  },
  {
    name: 'Arjun Mehta',
    role: 'Product Manager',
    city: 'Bengaluru',
    platform: 'Nakshatra',
    platformColor: '#FFB347',
    stars: 5,
    text: 'The daily Panchanga is the first thing I check every morning. XP streaks and achievements turned a spiritual practice into something I actually keep up with. The Capacitor mobile app is buttery smooth.',
    avatar: 'AM',
  },
  {
    name: 'Sneha Iyer',
    role: 'Business Owner',
    city: 'Delhi',
    platform: 'BabaJi',
    platformColor: '#0a9396',
    stars: 5,
    text: 'Used BabaJi before signing a major business contract. The Muhurta picker found an auspicious window I never would have found with a traditional pandit — and at a fraction of the consultation cost.',
    avatar: 'SI',
  },
  {
    name: 'Rahul Krishnan',
    role: 'IT Director',
    city: 'Chennai',
    platform: 'BabaJi',
    platformColor: '#0a9396',
    stars: 5,
    text: "As a skeptic, BabaJi's citation-backed approach won me over. Every statement traces to a classical text. Our HR team now uses it for strategic planning and team compatibility reviews.",
    avatar: 'RK',
  },
  {
    name: 'Kavya Reddy',
    role: 'Data Scientist',
    city: 'Hyderabad',
    platform: 'MeraAstroMitr',
    platformColor: '#9b59b6',
    stars: 5,
    text: 'The AI chat is terrifyingly accurate. I asked about relocation timing and got a detailed Vaastu-transit combination analysis that a ₹5,000 pandit session couldn\'t match. The Spiderweb citations are gold.',
    avatar: 'KR',
  },
  {
    name: 'Vikash Gupta',
    role: 'Entrepreneur',
    city: 'Pune',
    platform: 'MeraAstroMitr',
    platformColor: '#9b59b6',
    stars: 5,
    text: 'We built our HR consultation calendar around MeraAstroMitr\'s Muhurta API. The offline Ollama mode means zero dependency on external APIs in production. 14 E2E tests give us confidence to ship fast.',
    avatar: 'VG',
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: '#FFD700', fontSize: '12px' }}>★</span>
      ))}
    </div>
  )
}

export function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="font-cinzel text-xs tracking-[0.3em] text-gold/60 uppercase mb-3">Real Seekers</p>
          <h2 className="section-heading text-4xl md:text-5xl text-gradient-gold mb-4">What They're Saying</h2>
          <p className="font-cormorant text-white/50 text-lg max-w-xl mx-auto">
            From curious beginners to enterprise clients — the cosmos has something for everyone.
          </p>
        </motion.div>

        <div className="divider-cosmic mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass border rounded-2xl p-6 flex flex-col gap-4 hover:border-opacity-40 transition-all"
              style={{ borderColor: `${t.platformColor}20` }}
            >
              {/* Platform badge */}
              <div className="flex items-center justify-between">
                <span
                  className="font-cinzel text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full border"
                  style={{ color: t.platformColor, borderColor: `${t.platformColor}30`, background: `${t.platformColor}10` }}
                >
                  {t.platform}
                </span>
                <Stars count={t.stars} />
              </div>

              {/* Quote */}
              <p className="font-cormorant text-white/70 text-base leading-relaxed flex-1">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-white/6">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-cinzel font-bold text-xs shrink-0"
                  style={{ background: `${t.platformColor}20`, color: t.platformColor, border: `1px solid ${t.platformColor}30` }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="font-cinzel text-xs font-semibold text-white/80">{t.name}</p>
                  <p className="text-[11px] text-white/35">{t.role} · {t.city}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
