export function KinsoLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M8 8L20 20L8 32" stroke="url(#gradient1)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M32 8L20 20L32 32"
        stroke="url(#gradient2)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="gradient1" x1="8" y1="8" x2="20" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF6B6B" />
          <stop offset="1" stopColor="#4ECDC4" />
        </linearGradient>
        <linearGradient id="gradient2" x1="32" y1="8" x2="20" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4ECDC4" />
          <stop offset="1" stopColor="#45B7D1" />
        </linearGradient>
      </defs>
    </svg>
  )
}
