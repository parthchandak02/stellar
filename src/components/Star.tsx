import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'
import type { Repo } from '../data/repos'
import { getLanguageColor } from '../utils/languageColors'
import type { StarLayout } from '../utils/positionStars'

interface StarProps {
  repo: Repo
  layout: StarLayout
  selected: boolean
  dimmed: boolean
  reducedMotion?: boolean
  onSelect: (repo: Repo) => void
}

export default function Star({
  repo,
  layout,
  selected,
  dimmed,
  reducedMotion = false,
  onSelect,
}: StarProps) {
  const meshRef = useRef<Mesh>(null)
  const color = getLanguageColor(repo.language)
  const baseScale = layout.radius
  const opacity = dimmed ? 0.2 : selected ? 1 : 0.85

  useFrame((state) => {
    if (!meshRef.current || reducedMotion) return
    // Pulse speed based on recency (recently pushed = faster pulse)
    const daysSincePush = repo.pushed_at
      ? (Date.now() - new Date(repo.pushed_at).getTime()) / (1000 * 86400)
      : 365
    const pulseSpeed = 1.2 + Math.max(0, Math.min(4, 4 - daysSincePush / 90)) * 0.6
    const pulse = 1 + Math.sin(state.clock.elapsedTime * pulseSpeed + repo.id) * 0.06
    const scale = baseScale * (selected ? 1.35 : pulse)
    meshRef.current.scale.setScalar(scale)
  })

  return (
    <mesh
      ref={meshRef}
      position={layout.position}
      scale={baseScale}
      onClick={(event) => {
        event.stopPropagation()
        onSelect(repo)
      }}
    >
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={selected ? 2.2 : 1.2}
        transparent
        opacity={opacity}
        roughness={0.35}
        metalness={0.1}
      />
      {selected && (
        <mesh scale={1.8}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.12}
            depthWrite={false}
          />
        </mesh>
      )}
    </mesh>
  )
}
