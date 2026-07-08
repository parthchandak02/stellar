import { Stars } from '@react-three/drei'
import { PALETTE } from '../utils/languageColors'

interface BackgroundProps {
  reducedMotion?: boolean
}

export default function Background({ reducedMotion = false }: BackgroundProps) {
  return (
    <>
      <color attach="background" args={[PALETTE.bg]} />
      <fog attach="fog" args={[PALETTE.bg, 12, 28]} />
      <ambientLight intensity={0.15} />
      <Stars
        radius={80}
        depth={40}
        count={reducedMotion ? 1200 : 3000}
        factor={3}
        saturation={0.2}
        fade
        speed={reducedMotion ? 0 : 0.3}
      />
    </>
  )
}
