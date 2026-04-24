/**
 * Admin auth helper — lightweight localStorage gate.
 * Set VITE_ADMIN_SECRET in .env (never committed) to override the default.
 * Call loginAdmin(password) to authenticate; logoutAdmin() to clear.
 */

const STORAGE_KEY = 'aa_admin'
const ADMIN_SECRET = import.meta.env.VITE_ADMIN_SECRET ?? 'allastro-admin-2025'

export function isAdmin(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === ADMIN_SECRET
  } catch {
    return false
  }
}

export function loginAdmin(password: string): boolean {
  if (password === ADMIN_SECRET) {
    try { localStorage.setItem(STORAGE_KEY, ADMIN_SECRET) } catch { /* safari private */ }
    return true
  }
  return false
}

export function logoutAdmin(): void {
  try { localStorage.removeItem(STORAGE_KEY) } catch { /* ignore */ }
}
