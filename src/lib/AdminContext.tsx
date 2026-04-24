import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { isAdmin as checkAdmin } from './admin'

interface AdminContextValue {
  isAdmin: boolean
  setIsAdmin: (v: boolean) => void
}

const AdminContext = createContext<AdminContextValue>({
  isAdmin: false,
  setIsAdmin: () => {},
})

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    setIsAdmin(checkAdmin())
  }, [])

  return (
    <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdminContext() {
  return useContext(AdminContext)
}
