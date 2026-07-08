const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Rust: '#dea584',
  Go: '#00ADD8',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  Ruby: '#701516',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  PHP: '#4F5D95',
  CSS: '#663399',
  HTML: '#e34c26',
  Shell: '#89e051',
  Dart: '#00B4AB',
  Vue: '#41b883',
  Scala: '#c22d40',
  R: '#198CE7',
  Lua: '#000080',
  Haskell: '#5e5086',
  Elixir: '#6e4a7e',
  Clojure: '#db5855',
  Objective: '#438eff',
  'Objective-C': '#438eff',
  Jupyter: '#DA5B0B',
  Dockerfile: '#384d54',
  Makefile: '#427819',
}

const DEFAULT_COLOR = '#8b9dc3'

export function getLanguageColor(language: string | null): string {
  if (!language) return DEFAULT_COLOR
  return LANGUAGE_COLORS[language] ?? DEFAULT_COLOR
}

export const PALETTE = {
  bg: '#050510',
  layer: '#0a0a1a',
  accent: '#6ecfff',
  glow: '#ffffff',
  line: 'rgba(110, 207, 255, 0.25)',
  text: 'rgba(255, 255, 255, 0.55)',
  label: 'rgba(255, 255, 255, 0.4)',
} as const

export const ALPHA = {
  bg: 0.08,
  field: 0.25,
  active: 0.7,
  label: 0.45,
} as const

export function getTopLanguages(repos: { language: string | null }[]): string[] {
  const counts = new Map<string, number>()
  for (const repo of repos) {
    if (!repo.language) continue
    counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1)
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([lang]) => lang)
}
