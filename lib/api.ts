// API utility functions for making authenticated requests
import { getAuthTokenCookie } from "./cookies"

/**
 * Makes an authenticated API call with Bearer token automatically included
 * The token is retrieved from the cookie and added to the Authorization header
 */
export async function authenticatedFetch(
    url: string,
    options: RequestInit = {}
): Promise<Response> {
    const token = getAuthTokenCookie()
    const headers = new Headers(options.headers || {})

    // Always include Authorization header with Bearer token if available
    if (token) {
        headers.set("Authorization", `Bearer ${token}`)
    }

    // Set Content-Type if not already set
    if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json")
    }

    return fetch(url, {
        ...options,
        headers,
        credentials: "include", // Include cookies
    })
}

