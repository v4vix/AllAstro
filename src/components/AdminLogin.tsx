import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { loginAdmin, logoutAdmin, isAdmin } from '../lib/admin'

interface Props {
  onAuthChange: (authed: boolean) => void
}

export function AdminLogin({ onAuthChange }: Props) {
  const [open, setOpen] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [authed, setAuthed] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Sync on mount
  useEffect(() => {
    const a = isAdmin()
    setAuthed(a)
    onAuthChange(a)
  }, [onAuthChange])

  function handleOpen() {
    setPassword('')
    setError(false)
    setOpen(true)
    setTimeout(() => inputRef.current?.focus(), 80)
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (loginAdmin(password)) {
      setAuthed(true)
      onAuthChange(true)
      setOpen(false)
    } else {
      setError(true)
      setPassword('')
      inputRef.current?.focus()
    }
  }

  function handleLogout() {
    logoutAdmin()
    setAuthed(false)
    onAuthChange(false)
  }

  return (
    <>
      {/* Trigger button */}
      {authed ? (
        <button
          onClick={handleLogout}
          title="Sign out admin"
          className="hidden md:inline-flex items-center gap-1.5 font-cinzel text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full border border-gold/30 text-gold/70 hover:text-gold hover:border-gold/60 transition-all"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
          Admin
        </button>
      ) : (
        <button
          onClick={handleOpen}
          title="Admin login"
          className="hidden md:inline-flex items-center gap-1.5 font-cinzel text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full border border-white/10 text-white/25 hover:text-white/50 hover:border-white/20 transition-all"
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
          Admin
        </button>
      )}

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
            onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="glass border border-white/12 rounded-2xl p-8 w-full max-w-sm"
            >
              <h3 className="font-cinzel text-lg font-bold text-gold mb-1">Admin Access</h3>
              <p className="font-cormorant text-white/40 text-sm mb-6">Enter the admin passphrase to unlock restricted sections.</p>

              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <input
                  ref={inputRef}
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(false) }}
                  placeholder="Passphrase…"
                  className={`w-full px-4 py-2.5 rounded-xl bg-white/5 border text-sm font-mono text-white outline-none transition-colors ${
                    error
                      ? 'border-red-500/60 focus:border-red-500'
                      : 'border-white/10 focus:border-gold/40'
                  }`}
                />
                {error && (
                  <p className="text-xs text-red-400/80 -mt-2">Incorrect passphrase. Try again.</p>
                )}
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 btn-primary text-sm py-2.5"
                  >
                    Unlock
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="flex-1 btn-ghost text-sm py-2.5"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
