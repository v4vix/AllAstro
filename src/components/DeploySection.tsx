import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

type Tab = 'render' | 'docker' | 'source'

const PLATFORMS = [
  { id: 'render' as Tab, label: 'Render', icon: '▲' },
  { id: 'docker' as Tab, label: 'Docker', icon: '🐳' },
  { id: 'source' as Tab, label: 'Source', icon: '⌥' },
]

const DEPLOY_STEPS: Record<Tab, { title: string; steps: { label: string; cmd: string }[] }[]> = {
  render: [
    {
      title: 'Nakshatra — Single Docker image, Node 22',
      steps: [
        { label: 'Fork & connect repo to Render', cmd: 'https://render.com/deploy' },
        { label: 'New Web Service → Docker runtime', cmd: 'runtime: docker' },
        { label: 'Add env vars', cmd: 'ANTHROPIC_API_KEY=sk-...\nGROQ_API_KEY=gsk_...' },
        { label: 'render.yaml (already in repo)', cmd: 'git push origin main  # auto-deploy' },
      ],
    },
    {
      title: 'BabaJi — 3-service monorepo',
      steps: [
        { label: 'Use Render Blueprints', cmd: 'render blueprint sync' },
        { label: 'Services: babaji-web, babaji-api, babaji-kb', cmd: 'render.yaml already configured' },
        { label: 'Add Postgres managed DB', cmd: 'plan: free  # 90-day trial, then $7/mo' },
      ],
    },
    {
      title: 'MeraAstroMitr — 2-service + Postgres',
      steps: [
        { label: 'Blueprint sync', cmd: 'render blueprint sync' },
        { label: 'Services: meraastromitr-api, meraastromitr-web', cmd: 'render.yaml already configured' },
        { label: 'DB (Neon free tier recommended)', cmd: 'DATABASE_URL=postgresql://...' },
      ],
    },
  ],
  docker: [
    {
      title: 'Nakshatra — build & run locally',
      steps: [
        { label: 'Clone', cmd: 'git clone <your-nakshatra-repo>\ncd bitsizegyaan/nakshatra' },
        { label: 'Build image', cmd: 'docker build -t nakshatra:latest .' },
        { label: 'Run', cmd: 'docker run -p 3001:3001 \\\n  -e ANTHROPIC_API_KEY=$ANTHROPIC_API_KEY \\\n  nakshatra:latest' },
      ],
    },
    {
      title: 'BabaJi — Docker Compose',
      steps: [
        { label: 'Clone', cmd: 'git clone <your-babaji-repo>\ncd BabaJi' },
        { label: 'Compose up', cmd: 'docker compose up --build' },
        { label: 'Open', cmd: 'open http://localhost:3000' },
      ],
    },
    {
      title: 'MeraAstroMitr — Compose stack',
      steps: [
        { label: 'Clone', cmd: 'git clone <your-meraastromitr-repo>\ncd MeraAstroMitr' },
        { label: 'Compose up', cmd: 'docker compose up --build' },
        { label: 'Open', cmd: 'open http://localhost:4173' },
      ],
    },
  ],
  source: [
    {
      title: 'Nakshatra',
      steps: [
        { label: 'Install', cmd: 'cd nakshatra/backend && npm ci\ncd ../frontend && npm ci' },
        { label: 'Dev', cmd: 'npm run dev  # frontend :5173 + backend :3001' },
        { label: 'Build', cmd: 'npm run build && npm start' },
      ],
    },
    {
      title: 'BabaJi',
      steps: [
        { label: 'Prerequisites', cmd: 'node 22, python 3.11, pnpm 9' },
        { label: 'Bootstrap', cmd: 'pnpm install\npython -m venv .venv && pip install -r api/requirements.txt' },
        { label: 'Dev', cmd: 'pnpm dev  # web :3000 + api :8000' },
      ],
    },
    {
      title: 'MeraAstroMitr',
      steps: [
        { label: 'Bootstrap', cmd: './setup.sh  # installs all deps & seeds DB' },
        { label: 'Dev', cmd: 'docker compose up  # full stack' },
        { label: 'Tests', cmd: 'npx playwright test  # 14 E2E tests' },
      ],
    },
  ],
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }
  return (
    <button
      onClick={copy}
      className="shrink-0 p-1.5 rounded-md transition-all hover:bg-white/10 text-white/30 hover:text-gold"
      aria-label="Copy to clipboard"
      title="Copy"
    >
      {copied ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="9" y="9" width="13" height="13" rx="2" />
          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
        </svg>
      )}
    </button>
  )
}

export function DeploySection() {
  const [tab, setTab] = useState<Tab>('render')
  const titleRef = useRef(null)
  const inView = useInView(titleRef, { once: true })

  return (
    <section id="deploy" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-cinzel text-xs tracking-[0.3em] text-gold/60 uppercase mb-3">
            Ship It
          </p>
          <h2 className="section-heading text-4xl md:text-5xl text-gradient-gold mb-5">
            Deploy to Production
          </h2>
          <p className="font-cormorant text-white/50 text-lg max-w-xl mx-auto">
            Every repo ships with a <code className="text-gold/70">render.yaml</code>, Dockerfile, and
            CI workflow. One push to main triggers an auto-deploy.
          </p>
        </motion.div>

        <div className="divider-cosmic mb-10" />

        {/* Tab switcher */}
        <div className="flex justify-center mb-8">
          <div className="glass border border-white/10 rounded-2xl p-1 flex gap-1">
            {PLATFORMS.map((p) => (
              <button
                key={p.id}
                onClick={() => setTab(p.id)}
                className={`font-cinzel text-xs tracking-widest uppercase px-5 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 ${
                  tab === p.id
                    ? 'bg-gold/15 text-gold border border-gold/25'
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                <span>{p.icon}</span>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Deploy cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {DEPLOY_STEPS[tab].map((block, bi) => (
            <motion.div
              key={block.title + tab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: bi * 0.1 }}
              className="glass-gold p-5 flex flex-col gap-4"
            >
              <h4 className="font-cinzel text-xs font-semibold tracking-wide text-gold/80 leading-snug">
                {block.title}
              </h4>
              {block.steps.map((s) => (
                <div key={s.label}>
                  <p className="text-xs text-white/40 mb-1.5">{s.label}</p>
                  <div className="flex items-start justify-between gap-2 bg-black/30 rounded-lg px-3 py-2 border border-white/6 group">
                    <pre className="text-xs text-emerald-300/80 font-mono whitespace-pre-wrap flex-1 leading-relaxed overflow-x-auto">
                      {s.cmd}
                    </pre>
                    <CopyButton text={s.cmd} />
                  </div>
                </div>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Render one-click badge strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 glass border border-white/8 rounded-2xl p-7 text-center"
        >
          <p className="font-cinzel text-sm tracking-widest text-white/50 uppercase mb-5">
            One-Click Render Deploys
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: 'Nakshatra', color: '#FFB347' },
              { label: 'BabaJi', color: '#0a9396' },
              { label: 'MeraAstroMitr', color: '#9b59b6' },
            ].map((item) => (
              <a
                key={item.label}
                href="https://render.com/deploy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass border text-sm font-cinzel font-semibold tracking-wide transition-all hover:-translate-y-0.5 hover:shadow-lg"
                style={{
                  borderColor: `${item.color}33`,
                  color: item.color,
                  boxShadow: `0 0 0 0 ${item.color}`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${item.color}33`
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 0 transparent'
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
                Deploy {item.label}
              </a>
            ))}
          </div>
          <p className="mt-5 text-xs text-white/25 font-cinzel tracking-widest">
            Free tier available · 750 hrs/month · Auto-sleep on idle
          </p>
        </motion.div>
      </div>
    </section>
  )
}
