// Backend API configuration
// Using Next.js API routes as proxy to avoid CORS issues
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001"

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN_GOOGLE: `${API_BASE_URL}/auth/login/google`,
        ME: `${API_BASE_URL}/auth/me`,
        LOGOUT: `${API_BASE_URL}/auth/logout`,
    },
}

