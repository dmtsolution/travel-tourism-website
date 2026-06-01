import { createContext, useContext, useState, useEffect } from 'react'
import { hashPassword, verifyPassword } from '../utils/hashPassword.js'
import {
  initializeDB,
  getUserByEmail,
  createUser as dbCreateUser,
  getUserById,
  updateUser as dbUpdateUser,
} from '../db/database.js'

const AuthContext = createContext(null)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    initializeDB()
    const stored = localStorage.getItem('travel_current_user')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        const fresh = getUserById(parsed.id)
        if (fresh) setUser(fresh)
        else localStorage.removeItem('travel_current_user')
      } catch {
        localStorage.removeItem('travel_current_user')
      }
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    const found = getUserByEmail(email.trim().toLowerCase())
    if (!found) throw new Error('Aucun compte trouvé avec cet email')
    if (!verifyPassword(password, found.password)) throw new Error('Mot de passe incorrect')
    const { password: _, ...safe } = found
    setUser(safe)
    localStorage.setItem('travel_current_user', JSON.stringify(safe))
    return safe
  }

  const register = (name, email, password) => {
    const existing = getUserByEmail(email.trim().toLowerCase())
    if (existing) throw new Error('Un compte avec cet email existe déjà')
    const hashed = hashPassword(password)
    const newUser = dbCreateUser({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: hashed,
      role: 'client',
    })
    const { password: _, ...safe } = newUser
    setUser(safe)
    localStorage.setItem('travel_current_user', JSON.stringify(safe))
    return safe
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('travel_current_user')
  }

  const updateProfile = (data) => {
    if (!user) throw new Error('Non connecté')
    const updated = dbUpdateUser(user.id, data)
    const { password: _, ...safe } = updated
    setUser(safe)
    localStorage.setItem('travel_current_user', JSON.stringify(safe))
    return safe
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}
