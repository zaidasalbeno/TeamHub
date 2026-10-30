import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)
const USERS_KEY = 'teamhub-users'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('teamhub-user') || 'null'))
  useEffect(() => {
    if (user) localStorage.setItem('teamhub-user', JSON.stringify(user))
    else localStorage.removeItem('teamhub-user')
  }, [user])
  const value = useMemo(() => ({ user, login: (email, role) => {
    const saved = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
    const found = saved.find((item) => item.email.toLowerCase() === email.toLowerCase())
    setUser(found ? { name: found.name, email: found.email, role: found.role } : { name: role === 'employer' ? 'Alex Morgan' : 'Jordan Lee', email, role })
  }, register: (name, email, role) => {
    const saved = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
    const next = { name, email, role }
    localStorage.setItem(USERS_KEY, JSON.stringify([...saved.filter((item) => item.email !== email), next]))
    setUser(next)
  }, logout: () => setUser(null) }), [user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
