import { useMemo } from 'react'
import type { Repo } from '../data/repos'
import { positionStars } from '../utils/positionStars'
import Star from './Star'

interface StarFieldProps {
  repos: Repo[]
  selectedId: number | null
  reducedMotion?: boolean
  onSelect: (repo: Repo) => void
}

export default function StarField({
  repos,
  selectedId,
  reducedMotion = false,
  onSelect,
}: StarFieldProps) {
  const layouts = useMemo(() => positionStars(repos), [repos])

  return (
    <group>
      {repos.map((repo) => {
        const layout = layouts.find((l) => l.id === repo.id)
        if (!layout) return null
        const selected = selectedId === repo.id
        const dimmed = selectedId !== null && !selected
        return (
          <Star
            key={repo.id}
            repo={repo}
            layout={layout}
            selected={selected}
            dimmed={dimmed}
            reducedMotion={reducedMotion}
            onSelect={onSelect}
          />
        )
      })}
    </group>
  )
}

export { positionStars }
