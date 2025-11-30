"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { API_ENDPOINTS } from "./config"
import { getAuthTokenCookie, setAuthTokenCookie, deleteAuthTokenCookie } from "./cookies"
import { authenticatedFetch } from "./api"

interface User {
  id: string
  name: string
  email: string
  avatar_url: string
}

interface AuthTokens {
  token: string
  providerToken: string
  refreshToken: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  handleCallback: (token: string, providerToken: string, refreshToken: string, expiresIn?: number) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Get auth token from cookie
  const getAuthToken = (): string | null => {
    return getAuthTokenCookie()
  }

  // Save tokens - token in cookie, others in localStorage
  const saveTokens = (tokens: AuthTokens, expiresIn?: number) => {
    if (typeof window === "undefined") return
    // Store main token in cookie with SameSite
    setAuthTokenCookie(tokens.token, expiresIn)
    // Store other tokens in localStorage
    localStorage.setItem("provider_token", tokens.providerToken)
    localStorage.setItem("refresh_token", tokens.refreshToken)
  }

  // Clear tokens from cookie and localStorage
  const clearTokens = () => {
    if (typeof window === "undefined") return
    deleteAuthTokenCookie()
    localStorage.removeItem("provider_token")
    localStorage.removeItem("refresh_token")
    localStorage.removeItem("kinso_user")
  }

  // Fetch user data from backend
  const fetchUser = async (): Promise<User | null> => {
    const token = getAuthToken()
    if (!token) return null

    try {
      const response = await authenticatedFetch(API_ENDPOINTS.AUTH.ME, {
        method: "GET",
      })

      if (!response.ok) {
        if (response.status === 401) {
          // Token expired or invalid
          clearTokens()
          return null
        }
        throw new Error("Failed to fetch user data")
      }

      const userData = await response.json()
      return userData
    } catch (error) {
      console.error("Error fetching user:", error)
      clearTokens()
      return null
    }
  }

  // Check for existing session on mount
  useEffect(() => {
    const initializeAuth = async () => {
      // Check for stored user first
      const storedUser = localStorage.getItem("kinso_user")
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser)
          setUser(parsedUser)

          // Verify token is still valid by fetching user from backend
          const userData = await fetchUser()
          if (userData) {
            setUser(userData)
            localStorage.setItem("kinso_user", JSON.stringify(userData))
          } else {
            // Token invalid, clear stored user
            setUser(null)
            clearTokens()
          }
        } catch (error) {
          console.error("Error initializing auth:", error)
          clearTokens()
        }
      } else {
        // Try to fetch user if we have a token
        const userData = await fetchUser()
        if (userData) {
          setUser(userData)
          localStorage.setItem("kinso_user", JSON.stringify(userData))
        }
      }
      setIsLoading(false)
    }

    initializeAuth()
  }, [])

  const signInWithGoogle = async () => {
    try {
      // Call backend OAuth endpoint to get the redirect URL
      const callbackUrl = `${window.location.origin}/callback`
      const response = await authenticatedFetch(`${API_ENDPOINTS.AUTH.LOGIN_GOOGLE}`, {
        method: "GET",
      })

      if (!response.ok) {
        throw new Error("Failed to get OAuth URL")
      }

      const data = await response.json()
      // Redirect to the URL provided by the backend
      window.location.href = data.url
    } catch (error) {
      console.error("Error initiating Google sign in:", error)
      throw error
    }
  }

  const handleCallback = async (token: string, providerToken: string, refreshToken: string, expiresIn?: number) => {
    setIsLoading(true)
    try {
      // Save tokens (token will be stored in cookie with SameSite)
      saveTokens({ token, providerToken, refreshToken }, expiresIn)

      // Fetch user data
      const userData = await fetchUser()
      if (userData) {
        setUser(userData)
        localStorage.setItem("kinso_user", JSON.stringify(userData))
      } else {
        throw new Error("Failed to fetch user data after login")
      }
    } catch (error) {
      console.error("Error handling callback:", error)
      clearTokens()
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    setIsLoading(true)
    try {
      const token = getAuthToken()

      // Call logout endpoint
      if (token) {
        try {
          await authenticatedFetch(API_ENDPOINTS.AUTH.LOGOUT, {
            method: "GET",
          })
        } catch (error) {
          console.error("Error calling logout endpoint:", error)
          // Continue with local logout even if backend call fails
        }
      }

      // Clear local state
      clearTokens()
      setUser(null)
      router.push("/")
    } catch (error) {
      console.error("Error during logout:", error)
      // Clear local state anyway
      clearTokens()
      setUser(null)
      router.push("/")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signInWithGoogle, signOut, handleCallback }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
