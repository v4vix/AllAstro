import { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'

const STATS = [
  { value: 320000, label: 'Cosmic Readings', suffix: '+', format: (n: number) => n >= 1000 ? `${Math.floor(n / 1000)}K` : String(n) },
  { value: 3, label: 'AI Platforms', suffix: '', format: (n: number) => String(n) },
  { value: 18, label: 'Vedic Features', suffix: '', format: (n: number) => String(n) },
  { value: 100, label: 'Classical Grounding', suffix: '%', format: (n: number) => String(n) },
]

function CountUp({ target, format, suffix, active }: { target: number; format: (n: number) => string; suffix: string; active: boolean }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!active) return
    const duration = 1800
    const steps = 60
    const step = target / steps
    let count = 0
    const interval = setInterval(() => {
      count = Math.min(count + step, target)
      setCurrent(Math.floor(count))
      if (count >= target) clearInterval(interval)
    }, duration / steps)
    return () => clearInterval(interval)
  }, [active, target])

  return (
    <span>
      {format(current)}{suffix}
    </span>
  )
}

export function StatsStrip() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="glass border border-white/8 rounded-2xl px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <div key={s.label} className="flex flex-col items-center text-center gap-1">
                <span
                  className="font-cinzel font-black text-3xl md:text-4xl text-gradient-gold tabular-nums"
                  style={{ animationDelay: `${i * 0.3}s` }}
                >
                  <CountUp target={s.value} format={s.format} suffix={s.suffix} active={inView} />
                </span>
                <span className="font-cinzel text-[10px] tracking-[0.25em] text-white/40 uppercase">
                  {s.label}
                </span>
                <div
                  className="w-8 h-0.5 rounded-full mt-1"
                  style={{
                    background: ['#FFB347', '#0a9396', '#9b59b6', '#00FFCC'][i % 4],
                    opacity: 0.5,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
