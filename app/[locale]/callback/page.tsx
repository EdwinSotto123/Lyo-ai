"use client"

import { useEffect } from "react"
import { useRouter } from "@/i18n/routing"
import { useAuth } from "@/lib/auth-context"

export default function CallbackPage() {
    const router = useRouter()
    const { handleCallback, user, isLoading } = useAuth()

    useEffect(() => {
        // Wait for auth to initialize
        if (isLoading) return

        const processCallback = async () => {
            try {
                // Extract tokens from URL hash or query parameters
                // Try hash first (common in OAuth flows)
                let hash = window.location.hash.substring(1) // Remove the '#'
                let params = new URLSearchParams(hash)

                let accessToken = params.get("access_token")
                let providerToken = params.get("provider_token") || ""
                let refreshToken = params.get("refresh_token") || ""
                let expiresIn = params.get("expires_in")

                // If not in hash, try query parameters
                if (!accessToken) {
                    params = new URLSearchParams(window.location.search.substring(1))
                    accessToken = params.get("access_token")
                    providerToken = params.get("provider_token") || ""
                    refreshToken = params.get("refresh_token") || ""
                    expiresIn = params.get("expires_in")
                }

                // Debug logging
                console.log("Callback URL:", window.location.href)
                console.log("Hash:", window.location.hash)
                console.log("Search:", window.location.search)
                console.log("Access token found:", !!accessToken)

                // If no token found, check if user is already authenticated
                if (!accessToken) {
                    if (user) {
                        // User is already authenticated, redirect to dashboard
                        console.log("User already authenticated, redirecting to dashboard")
                        router.replace("/dashboard")
                        return
                    }
                    // No token and not authenticated, redirect to login
                    console.error("No access token found in callback URL")
                    console.error("Full URL:", window.location.href)
                    router.replace("/login")
                    return
                }

                // Handle callback with auth context (it will store the token in cookie)
                const expiresInSeconds = expiresIn ? parseInt(expiresIn, 10) : 3600
                await handleCallback(accessToken, providerToken, refreshToken, expiresInSeconds)

                // Clean up the URL hash/query to remove tokens from the URL
                const cleanPath = window.location.pathname
                window.history.replaceState(null, "", cleanPath)

                // Navigate to dashboard
                router.replace("/dashboard")
            } catch (error) {
                console.error("Error processing callback:", error)
                // Clean up the URL hash/query even on error
                const cleanPath = window.location.pathname
                window.history.replaceState(null, "", cleanPath)

                // If user is authenticated despite error, go to dashboard
                if (user) {
                    router.replace("/dashboard")
                } else {
                    router.replace("/login")
                }
            }
        }

        processCallback()
    }, [router, handleCallback, user, isLoading])

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-600">Completando inicio de sesión...</p>
            </div>
        </div>
    )
}

