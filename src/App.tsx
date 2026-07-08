import { Suspense, useCallback, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Background from './components/Background'
import ConstellationLines from './components/ConstellationLines'
import DataStamp from './components/DataStamp'
import HeroStats from './components/HeroStats'
import QuietZone from './components/QuietZone'
import StarField from './components/StarField'
import {
  FALLBACK_REPOS,
  fetchRepos,
  type Repo,
  type RepoSource,
} from './data/repos'
import { getTopLanguages, getLanguageColor } from './utils/languageColors'
import './styles.css'

const POLL_MS = 60_000

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() =>
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false,
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = () => setReduced(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return reduced
}

export default function App() {
  const [repos, setRepos] = useState<Repo[]>(FALLBACK_REPOS)
  const [source, setSource] = useState<RepoSource>('fallback')
  const [repoCount, setRepoCount] = useState(FALLBACK_REPOS.length)
  const [loading, setLoading] = useState(true)
  const [secondsAgo, setSecondsAgo] = useState(0)
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null)
  const [detailVisible, setDetailVisible] = useState(false)
  const [showGlow, setShowGlow] = useState(true)
  const reducedMotion = useReducedMotion()

  const loadRepos = useCallback(async () => {
    const result = await fetchRepos()
    setRepos(result.repos)
    setSource(result.source)
    setRepoCount(result.repoCount)
    setSecondsAgo(0)
    setLoading(false)
  }, [])

  useEffect(() => {
    void loadRepos()
    const poll = setInterval(() => void loadRepos(), POLL_MS)
    return () => clearInterval(poll)
  }, [loadRepos])

  useEffect(() => {
    const tick = setInterval(() => {
      setSecondsAgo((s) => s + 1)
    }, 1000)
    return () => clearInterval(tick)
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      setShowGlow(false)
      return
    }
    const t = setTimeout(() => setShowGlow(false), 500)
    return () => clearTimeout(t)
  }, [reducedMotion])

  const handleSelect = useCallback((repo: Repo) => {
    setSelectedRepo(repo)
    setDetailVisible(true)
  }, [])

  const handleBackgroundTap = useCallback(() => {
    setSelectedRepo(null)
    setDetailVisible(false)
  }, [])

  const handleHideDetail = useCallback(() => {
    setDetailVisible(false)
  }, [])

  const topLanguages = getTopLanguages(repos)
  const selectedId = selectedRepo?.id ?? null

  return (
    <>
      <Canvas
        className="stellar-canvas"
        camera={{ position: [0, 2, 14], fov: 55, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: false }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        }}
        frameloop={reducedMotion ? 'demand' : 'always'}
        onPointerMissed={handleBackgroundTap}
      >
        <Suspense fallback={null}>
          <Background reducedMotion={reducedMotion} />
          <ConstellationLines repos={repos} selectedId={selectedId} />
          <StarField
            repos={repos}
            selectedId={selectedId}
            reducedMotion={reducedMotion}
            onSelect={handleSelect}
          />
          <OrbitControls
            enablePan={false}
            enableZoom
            minDistance={6}
            maxDistance={22}
            autoRotate={!reducedMotion && selectedId === null}
            autoRotateSpeed={0.35}
          />
        </Suspense>
      </Canvas>

      {showGlow && <div className="first-visit-glow" aria-hidden />}

      <HeroStats repoCount={repoCount} />
      <DataStamp source={source} secondsAgo={secondsAgo} loading={loading} repoCount={repoCount} />

      <div id="desc" className="desc">
        Each repo is a star - older repos shine larger, language gives its color. Tap a star for details.
      </div>

      <div className="legend" aria-hidden>
        {topLanguages.map((lang) => (
          <span key={lang} className="legend-item">
            <span
              className="legend-dot"
              style={{ background: getLanguageColor(lang) }}
            />
            {lang}
          </span>
        ))}
      </div>

      <QuietZone
        visible={detailVisible}
        repo={selectedRepo}
        onHide={handleHideDetail}
      />
    </>
  )
}
