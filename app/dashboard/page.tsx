"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { KinsoLogo } from "@/components/kinso-logo"
import { motion } from "framer-motion"

export default function DashboardPage() {
  const { user, isLoading, signOut } = useAuth()
  const router = useRouter()

  // Redirect if not logged in
  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header Bar */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <KinsoLogo className="h-8 w-8" />
            <span className="text-xl font-semibold text-foreground">KINSO</span>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user.email}</span>
            <div className="flex items-center gap-3">
              <img
                src={user.avatar || "/placeholder.svg"}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover border border-gray-200"
              />
              <button
                onClick={signOut}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Blank Dashboard */}
      <main className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Welcome Message */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Welcome, {user.name.split(" ")[0]}!</h1>
            <p className="text-muted-foreground">Your dashboard is ready. Start connecting your accounts.</p>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
