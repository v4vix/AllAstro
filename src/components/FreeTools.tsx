import { Link } from 'react-router-dom'

const TOOLS = [
  {
    path: '/numerology',
    emoji: '🔢',
    title: 'Numerology Calculator',
    tagline: 'Life Path · Expression · Soul Urge',
    description: 'Decode the numbers woven into your name and birthdate. Discover your Life Path, master numbers, and the current Personal Year cycle.',
    badge: 'Free · Instant',
    gradient: 'from-violet-600/20 to-indigo-600/20',
    border: 'border-violet-500/30 hover:border-violet-400/60',
    badgeColor: 'bg-violet-500/20 text-violet-300',
  },
]

export function FreeTools() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-4">
            Free Tools
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Self-Discovery, Instantly
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            No sign-up needed. Explore your cosmic blueprint with our free calculators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TOOLS.map((tool) => (
            <Link
              key={tool.path}
              to={tool.path}
              className={`group relative rounded-2xl border p-6 bg-gradient-to-br ${tool.gradient} ${tool.border} transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-violet-500/10 block`}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-4xl">{tool.emoji}</span>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${tool.badgeColor}`}>
                  {tool.badge}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{tool.title}</h3>
              <p className="text-xs font-medium text-gray-400 mb-3 tracking-wide">{tool.tagline}</p>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">{tool.description}</p>
              <div className="flex items-center gap-1 text-sm font-semibold text-violet-300 group-hover:text-violet-200 transition-colors">
                Try it free
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}

          {/* Coming Soon placeholder */}
          <div className="relative rounded-2xl border border-white/5 p-6 bg-white/[0.02] flex flex-col items-center justify-center text-center min-h-[200px]">
            <span className="text-4xl mb-3 opacity-40">✨</span>
            <p className="text-gray-500 font-medium">More tools coming soon</p>
            <p className="text-xs text-gray-600 mt-1">Kundli · Muhurta · Compatibility</p>
          </div>
        </div>
      </div>
    </section>
  )
}
