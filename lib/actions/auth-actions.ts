"use server"

import { cookies } from "next/headers"

const BACKEND_URL = "http://127.0.0.1:5000"

export async function getAuthStatus() {
    try {
        // Forward cookies to maintain session with Python backend if needed, 
        // though for this specific flow, the Python backend manages its own session via its own cookies.
        // However, since we are calling from Next.js server to Python server, we might need to handle session propagation 
        // if the Python backend relies on cookies that the browser sends to Next.js.
        // BUT, in this architecture, the Python backend sets cookies on localhost:5003.
        // When the browser requests Next.js, it doesn't send localhost:5003 cookies.
        // So server-to-server communication here acts as a fresh client unless we proxy cookies.
        // Given the Python code uses `session`, it relies on a session cookie.
        // If we want Next.js to proxy the auth status, we need to pass the 'session' cookie from the browser (if it was set on localhost domain)
        // or rely on the Python backend persisting state via file/db independent of the request session for the "check status" part if it's based on token file.

        // Looking at server.py:
        // It checks `get_credentials()` which reads from `token.json`.
        // It also checks `session.get('user')`.
        // `get_credentials()` is file-based, so it's global for the server instance (single user mode effectively).
        // So we don't strictly need to proxy user session cookies for `get_credentials()` to work, 
        // assuming this is a single-user local tool.

        const response = await fetch(`${BACKEND_URL}/auth/status`, {
            cache: "no-store",
        })

        if (!response.ok) {
            console.error("Failed to fetch auth status", response.status)
            return { authorized: false }
        }

        return await response.json()
    } catch (error) {
        console.error("Error fetching auth status:", error)
        return { authorized: false }
    }
}

export async function authorizeServices() {
    try {
        const response = await fetch(`${BACKEND_URL}/auth/authorize`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                services: ["calendar", "gmail", "meet"],
            }),
            cache: "no-store",
        })

        if (!response.ok) {
            throw new Error("Failed to get authorization URL")
        }

        const data = await response.json()
        return { url: data.auth_url }
    } catch (error) {
        console.error("Error initiating authorization:", error)
        throw error
    }
}

export async function disconnectServices() {
    try {
        const response = await fetch(`${BACKEND_URL}/auth/logout`, {
            method: "POST",
            cache: "no-store",
        })

        if (!response.ok) {
            throw new Error("Failed to disconnect services")
        }

        return { success: true }
    } catch (error) {
        console.error("Error disconnecting services:", error)
        return { success: false, error: "Failed to disconnect" }
    }
}

export async function getUnipileStatus() {
    try {
        const response = await fetch(`${BACKEND_URL}/unipile/status`, {
            cache: "no-store",
        })

        if (!response.ok) {
            console.error("Failed to fetch unipile status", response.status)
            return { connected: false, providers: {} }
        }

        return await response.json()
    } catch (error) {
        console.error("Error fetching unipile status:", error)
        return { connected: false, providers: {} }
    }
}

export async function getUnipileAuthLink(providers: string[]) {
    try {
        const response = await fetch(`${BACKEND_URL}/unipile/auth/link`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                providers: providers,
                user_id: "lyo_user", // TODO: Replace with actual user ID when available
            }),
            cache: "no-store",
        })

        if (!response.ok) {
            throw new Error("Failed to get unipile auth link")
        }

        return await response.json()
    } catch (error) {
        console.error("Error getting unipile auth link:", error)
        throw error
    }
}

export async function disconnectUnipileAccount(accountId: string) {
    try {
        const response = await fetch(`${BACKEND_URL}/unipile/accounts/${accountId}`, {
            method: "DELETE",
            cache: "no-store",
        })

        if (!response.ok) {
            throw new Error("Failed to disconnect unipile account")
        }

        return await response.json()
    } catch (error) {
        console.error("Error disconnecting unipile account:", error)
        return { success: false, error: "Failed to disconnect" }
    }
}
