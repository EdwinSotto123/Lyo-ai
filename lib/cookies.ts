// Cookie utility functions

const COOKIE_NAME = "auth_token"

export function setAuthTokenCookie(token: string, expiresIn?: number) {
  if (typeof document === "undefined") return

  // Calculate expiration date (default to 1 hour if not provided)
  const maxAge = expiresIn || 3600
  const expires = new Date(Date.now() + maxAge * 1000).toUTCString()

  // Set cookie with SameSite=Lax for security
  document.cookie = `${COOKIE_NAME}=${token}; expires=${expires}; path=/; SameSite=Lax; Secure=${window.location.protocol === "https:"}`
}

export function getAuthTokenCookie(): string | null {
  if (typeof document === "undefined") return null

  const name = COOKIE_NAME + "="
  const decodedCookie = decodeURIComponent(document.cookie)
  const cookieArray = decodedCookie.split(";")

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i]
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1)
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length)
    }
  }
  return null
}

export function deleteAuthTokenCookie() {
  if (typeof document === "undefined") return

  // Delete cookie by setting it to expire in the past
  document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`
}

