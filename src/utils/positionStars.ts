import type { Repo } from '../data/repos'

export interface StarLayout {
  id: number
  position: [number, number, number]
  radius: number
}

const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2

export function starRadius(createdAt: string, minDate: number, maxDate: number): number {
  const created = new Date(createdAt).getTime()
  if (maxDate <= minDate) return 0.15
  // Older repos shine larger: the oldest gets t = 1, the newest t = 0
  const t = (maxDate - created) / (maxDate - minDate)
  return 0.08 + Math.min(1, Math.max(0, t)) * 0.28
}

export function positionStars(repos: Repo[], sphereRadius = 7): StarLayout[] {
  if (repos.length === 0) return []

  const dates = repos.map((r) => new Date(r.created_at).getTime())
  const minDate = Math.min(...dates)
  const maxDate = Math.max(...dates)

  return repos.map((repo, index) => {
    const theta = (2 * Math.PI * index) / GOLDEN_RATIO
    const phi = Math.acos(1 - (2 * (index + 0.5)) / repos.length)
    const jitter = 0.85 + (repo.id % 7) * 0.025
    const r = sphereRadius * jitter

    return {
      id: repo.id,
      position: [
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta) * 0.55,
        r * Math.cos(phi),
      ],
      radius: starRadius(repo.created_at, minDate, maxDate),
    }
  })
}

export function distance3d(
  a: [number, number, number],
  b: [number, number, number],
): number {
  const dx = a[0] - b[0]
  const dy = a[1] - b[1]
  const dz = a[2] - b[2]
  return Math.sqrt(dx * dx + dy * dy + dz * dz)
}

export interface ConstellationEdge {
  from: number
  to: number
  language: string
}

export function buildConstellationEdges(
  repos: Repo[],
  layouts: StarLayout[],
  maxDistance = 5.5,
): ConstellationEdge[] {
  const positionById = new Map(layouts.map((l) => [l.id, l.position]))
  const edges: ConstellationEdge[] = []
  const seen = new Set<string>()

  const byLanguage = new Map<string, Repo[]>()
  for (const repo of repos) {
    if (!repo.language) continue
    const group = byLanguage.get(repo.language) ?? []
    group.push(repo)
    byLanguage.set(repo.language, group)
  }

  for (const [language, group] of byLanguage) {
    if (group.length < 2) continue

    for (let i = 0; i < group.length; i++) {
      const a = group[i]
      const posA = positionById.get(a.id)
      if (!posA) continue

      let nearest: { repo: Repo; dist: number } | null = null
      for (let j = 0; j < group.length; j++) {
        if (i === j) continue
        const b = group[j]
        const posB = positionById.get(b.id)
        if (!posB) continue
        const dist = distance3d(posA, posB)
        if (dist > maxDistance) continue
        if (!nearest || dist < nearest.dist) {
          nearest = { repo: b, dist }
        }
      }

      if (!nearest) continue
      const key = [a.id, nearest.repo.id].sort((x, y) => x - y).join('-')
      if (seen.has(key)) continue
      seen.add(key)
      edges.push({ from: a.id, to: nearest.repo.id, language })
    }
  }

  return edges
}
