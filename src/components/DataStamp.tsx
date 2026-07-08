import type { CSSProperties } from 'react'
import type { RepoSource } from '../data/repos'
import { PALETTE } from '../utils/languageColors'

interface DataStampProps {
  source: RepoSource
  secondsAgo: number
  loading: boolean
  repoCount: number
}

const containerStyle: CSSProperties = {
  position: 'fixed',
  bottom: 20,
  left: 16,
  zIndex: 10,
  pointerEvents: 'none',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  fontSize: 10,
  color: PALETTE.text,
  opacity: 0.4,
}

export default function DataStamp({ source, secondsAgo, loading, repoCount }: DataStampProps) {
  const ago = loading ? '...' : `${secondsAgo}s ago`

  return (
    <div id="stamp" style={containerStyle}>
      GitHub · {repoCount} repos · <strong>{source}</strong> · {ago}
    </div>
  )
}
