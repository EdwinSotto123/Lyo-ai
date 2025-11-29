"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  name: string
  email: string
  avatar: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signInWithGoogle: () => Promise<void>
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for existing session in localStorage
    const storedUser = localStorage.getItem("kinso_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const signInWithGoogle = async () => {
    setIsLoading(true)

    // Simulate Google OAuth delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock user data (simulating Google response)
    const mockUser: User = {
      id: "google_" + Math.random().toString(36).substr(2, 9),
      name: "Sarah Johnson",
      email: "sarah.johnson@gmail.com",
      avatar: "/professional-woman-avatar.png",
    }

    localStorage.setItem("kinso_user", JSON.stringify(mockUser))
    setUser(mockUser)
    setIsLoading(false)
    router.push("/dashboard")
  }

  const signOut = () => {
    localStorage.removeItem("kinso_user")
    setUser(null)
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, isLoading, signInWithGoogle, signOut }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
