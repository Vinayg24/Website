import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
}

interface AuthContextType {
  user: User | null
  isAdmin: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  token: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const JWT_SECRET = (import.meta.env.VITE_JWT_SECRET as string) || 'shree-radha-krishna-secret-key-2024'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      try {
        const payload = JSON.parse(atob(storedToken.split('.')[1]))
        const currentTime = Date.now() / 1000

        if (payload.exp < currentTime) {
          localStorage.removeItem('token')
          setToken(null)
          setUser(null)
        } else {
          setToken(storedToken)
          setUser({
            id: payload.sub,
            email: payload.email,
            name: payload.name,
            role: payload.role
          })
        }
      } catch (error) {
        localStorage.removeItem('token')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const apiUrl = (import.meta.env.VITE_API_URL as string) || '/api'
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    if (!response.ok) {
      throw new Error('Invalid credentials')
    }

    const data = await response.json()
    localStorage.setItem('token', data.token)
    setToken(data.token)

    const payload = JSON.parse(atob(data.token.split('.')[1]))
    setUser({
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      role: payload.role
    })
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ user, isAdmin: user?.role === 'admin', isLoading, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}