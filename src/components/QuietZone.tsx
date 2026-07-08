import { useEffect, useRef } from 'react'
import type { Repo } from '../data/repos'
import { ALPHA, PALETTE } from '../utils/languageColors'

interface QuietZoneProps {
  visible: boolean
  repo: Repo | null
  onHide: () => void
}

const panelStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: 100,
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 20,
  padding: '18px 24px',
  borderRadius: 14,
  background: `rgba(10, 10, 26, ${ALPHA.active})`,
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  border: `1px solid rgba(110, 207, 255, ${ALPHA.field})`,
  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.45)',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  color: PALETTE.text,
  minWidth: 260,
  maxWidth: 'min(90vw, 380px)',
  transition: 'opacity 0.35s ease',
  pointerEvents: 'none',
}

const rowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: 20,
  fontSize: 13,
  marginBottom: 8,
}

const labelStyle: React.CSSProperties = {
  opacity: ALPHA.label,
}

const valueStyle: React.CSSProperties = {
  fontWeight: 600,
  color: PALETTE.accent,
  textAlign: 'right',
}

export default function QuietZone({ visible, repo, onHide }: QuietZoneProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (visible && repo) {
      timerRef.current = setTimeout(onHide, 4000)
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [visible, repo, onHide])

  if (!repo) {
    return (
      <div
        style={{ ...panelStyle, opacity: 0 }}
        aria-hidden
      />
    )
  }

  const description =
    repo.description?.trim() || 'No description provided.'
  const createdDate = new Date(repo.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  const pushedDate = repo.pushed_at
    ? (() => {
        const days = Math.round((Date.now() - new Date(repo.pushed_at).getTime()) / (1000 * 86400))
        if (days === 0) return 'today'
        if (days === 1) return 'yesterday'
        return `${days} days ago`
      })()
    : 'unknown'

  return (
    <div
      style={{
        ...panelStyle,
        opacity: visible ? 1 : 0,
      }}
      aria-hidden={!visible}
    >
      <div
        style={{
          fontSize: 15,
          fontWeight: 700,
          color: 'rgba(255,255,255,0.85)',
          marginBottom: 10,
        }}
      >
        {repo.full_name}
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>Created</span>
        <span style={valueStyle}>{createdDate}</span>
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>Updated</span>
        <span style={valueStyle}>{pushedDate}</span>
      </div>
      <div style={{ ...rowStyle, marginBottom: 0, flexDirection: 'column', gap: 4 }}>
        <span style={labelStyle}>About</span>
        <span style={{ fontSize: 12, lineHeight: 1.45, opacity: 0.75 }}>
          {description}
        </span>
      </div>
    </div>
  )
}
