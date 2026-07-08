import type { CSSProperties } from 'react'
import { PALETTE } from '../utils/languageColors'

interface HeroStatsProps {
  repoCount: number
}

const containerStyle: CSSProperties = {
  position: 'fixed',
  top: 24,
  left: 24,
  zIndex: 10,
  pointerEvents: 'none',
  fontFamily: 'system-ui, -apple-system, sans-serif',
}

export default function HeroStats({ repoCount }: HeroStatsProps) {
  return (
    <div style={containerStyle}>
      <div
        style={{
          fontSize: 48,
          fontWeight: 700,
          color: PALETTE.accent,
          lineHeight: 1,
          letterSpacing: '-0.02em',
          textShadow: '0 0 24px rgba(110, 207, 255, 0.35)',
        }}
      >
        {repoCount}
      </div>
      <div
        style={{
          marginTop: 6,
          fontSize: 12,
          color: PALETTE.text,
          opacity: 0.7,
        }}
      >
        repositories &middot; parthchandak02
      </div>
    </div>
  )
}
