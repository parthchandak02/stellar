import { useMemo } from 'react'
import { Line } from '@react-three/drei'
import type { Repo } from '../data/repos'
import { getLanguageColor } from '../utils/languageColors'
import {
  buildConstellationEdges,
  positionStars,
} from '../utils/positionStars'

interface ConstellationLinesProps {
  repos: Repo[]
  selectedId: number | null
}

export default function ConstellationLines({
  repos,
  selectedId,
}: ConstellationLinesProps) {
  const layouts = useMemo(() => positionStars(repos), [repos])
  const edges = useMemo(
    () => buildConstellationEdges(repos, layouts),
    [repos, layouts],
  )
  const positionById = useMemo(
    () => new Map(layouts.map((l) => [l.id, l.position])),
    [layouts],
  )

  const selectedRepo = repos.find((r) => r.id === selectedId)
  const selectedLanguage = selectedRepo?.language ?? null

  return (
    <group>
      {edges.map((edge) => {
        const from = positionById.get(edge.from)
        const to = positionById.get(edge.to)
        if (!from || !to) return null

        const highlighted =
          selectedId !== null &&
          (edge.from === selectedId ||
            edge.to === selectedId ||
            edge.language === selectedLanguage)

        const dimmed = selectedId !== null && !highlighted
        const color = getLanguageColor(edge.language)

        return (
          <Line
            key={`${edge.from}-${edge.to}`}
            points={[from, to]}
            color={color}
            transparent
            opacity={dimmed ? 0.06 : highlighted ? 0.65 : 0.22}
            lineWidth={highlighted ? 1.5 : 1}
          />
        )
      })}
    </group>
  )
}
