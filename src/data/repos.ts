export interface Repo {
  id: number
  name: string
  full_name: string
  description: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  html_url: string
  updated_at: string
  created_at: string
  pushed_at: string
  archived: boolean
}

export type RepoSource = 'live' | 'fallback'

const API_URL = 'https://api.github.com/users/parthchandak02/repos?per_page=100&sort=updated&type=owner'

export const FALLBACK_REPOS: Repo[] = [
  { id: 1293066762, name: 'tide', full_name: 'parthchandak02/tide', description: '3D ocean surface visualization driven by live marine API data', stargazers_count: 0, forks_count: 0, language: 'TypeScript', html_url: 'https://github.com/parthchandak02/tide', updated_at: '2026-07-08T04:53:01Z', created_at: '2026-07-08T04:49:20Z', pushed_at: '2026-07-08T04:52:57Z', archived: false },
  { id: 1286856145, name: 'wc26', full_name: 'parthchandak02/wc26', description: 'World Cup 2026 live standings — all 12 groups, match results, and knockout bracket', stargazers_count: 0, forks_count: 0, language: 'TypeScript', html_url: 'https://github.com/parthchandak02/wc26', updated_at: '2026-07-08T05:18:29Z', created_at: '2026-07-02T06:50:40Z', pushed_at: '2026-07-08T05:18:25Z', archived: false },
  { id: 1290307321, name: 'atmos', full_name: 'parthchandak02/atmos', description: 'Weather atmosphere living sky visualization', stargazers_count: 0, forks_count: 0, language: 'TypeScript', html_url: 'https://github.com/parthchandak02/atmos', updated_at: '2026-07-05T05:34:47Z', created_at: '2026-07-05T05:03:23Z', pushed_at: '2026-07-05T05:34:44Z', archived: false },
  { id: 1285686796, name: 'skyline', full_name: 'parthchandak02/skyline', description: '3D city skyline from crypto market data', stargazers_count: 0, forks_count: 0, language: 'TypeScript', html_url: 'https://github.com/parthchandak02/skyline', updated_at: '2026-07-05T01:10:51Z', created_at: '2026-07-01T07:10:25Z', pushed_at: '2026-07-05T01:10:48Z', archived: false },
  { id: 1283769340, name: 'summit', full_name: 'parthchandak02/summit', description: '3D price path journey with R3F — drive along a mountain road of BTC price', stargazers_count: 0, forks_count: 0, language: 'TypeScript', html_url: 'https://github.com/parthchandak02/summit', updated_at: '2026-07-04T06:22:00Z', created_at: '2026-06-30T01:08:17Z', pushed_at: '2026-07-04T06:21:57Z', archived: false },
  { id: 1286631297, name: 'orbit', full_name: 'parthchandak02/orbit', description: 'N-body gravity simulation with product data', stargazers_count: 0, forks_count: 0, language: 'HTML', html_url: 'https://github.com/parthchandak02/orbit', updated_at: '2026-07-04T04:27:00Z', created_at: '2026-07-01T18:16:13Z', pushed_at: '2026-07-04T04:26:57Z', archived: false },
  { id: 1279824973, name: 'type', full_name: 'parthchandak02/type', description: 'Pokémon type constellation drill-down visualization', stargazers_count: 0, forks_count: 0, language: 'HTML', html_url: 'https://github.com/parthchandak02/type', updated_at: '2026-07-02T06:18:42Z', created_at: '2026-06-28T05:25:58Z', pushed_at: '2026-07-02T06:18:38Z', archived: false },
  { id: 1280243658, name: 'grove', full_name: 'parthchandak02/grove', description: 'Organic forest growth from solar data', stargazers_count: 0, forks_count: 0, language: 'HTML', html_url: 'https://github.com/parthchandak02/grove', updated_at: '2026-07-02T05:57:37Z', created_at: '2026-06-28T06:33:19Z', pushed_at: '2026-07-02T05:57:33Z', archived: false },
  { id: 1284194024, name: 'morph', full_name: 'parthchandak02/morph', description: 'SST polygon morph organism from marine data', stargazers_count: 0, forks_count: 0, language: 'HTML', html_url: 'https://github.com/parthchandak02/morph', updated_at: '2026-07-02T00:37:39Z', created_at: '2026-06-30T06:23:31Z', pushed_at: '2026-07-02T00:37:35Z', archived: false },
  { id: 1284898313, name: 'wisp', full_name: 'parthchandak02/wisp', description: 'Spring-mass trivia network visualization', stargazers_count: 0, forks_count: 0, language: 'HTML', html_url: 'https://github.com/parthchandak02/wisp', updated_at: '2026-07-01T05:16:08Z', created_at: '2026-06-30T07:41:40Z', pushed_at: '2026-07-01T05:16:05Z', archived: false },
  { id: 1282102172, name: 'trace', full_name: 'parthchandak02/trace', description: 'Strange attractor physics simulation from crypto data', stargazers_count: 0, forks_count: 0, language: 'HTML', html_url: 'https://github.com/parthchandak02/trace', updated_at: '2026-07-01T02:39:56Z', created_at: '2026-06-29T04:32:37Z', pushed_at: '2026-07-01T02:39:52Z', archived: false },
  { id: 1281938372, name: 'tessellate', full_name: 'parthchandak02/tessellate', description: 'Kaleidoscope symmetry generator from timezone data', stargazers_count: 0, forks_count: 0, language: 'HTML', html_url: 'https://github.com/parthchandak02/tessellate', updated_at: '2026-07-01T01:27:15Z', created_at: '2026-06-29T01:00:02Z', pushed_at: '2026-07-01T01:27:12Z', archived: false },
  { id: 1281714711, name: 'resonate', full_name: 'parthchandak02/resonate', description: 'Earthquake wave ripple simulation', stargazers_count: 0, forks_count: 0, language: 'HTML', html_url: 'https://github.com/parthchandak02/resonate', updated_at: '2026-06-29T02:13:29Z', created_at: '2026-06-28T22:47:17Z', pushed_at: '2026-06-29T02:13:25Z', archived: false },
  { id: 1281940000, name: 'flux', full_name: 'parthchandak02/flux', description: 'Cellular automata from forex data', stargazers_count: 0, forks_count: 0, language: 'HTML', html_url: 'https://github.com/parthchandak02/flux', updated_at: '2026-06-29T02:03:49Z', created_at: '2026-06-29T01:04:50Z', pushed_at: '2026-06-29T02:03:45Z', archived: false },
  { id: 1281740614, name: 'swell', full_name: 'parthchandak02/swell', description: 'Abstract wave animation from city temperature data', stargazers_count: 0, forks_count: 0, language: 'HTML', html_url: 'https://github.com/parthchandak02/swell', updated_at: '2026-06-29T01:26:00Z', created_at: '2026-06-28T23:15:40Z', pushed_at: '2026-06-29T01:25:56Z', archived: false },
  { id: 1281565339, name: 'flora', full_name: 'parthchandak02/flora', description: 'Botanical growth visualization from country data', stargazers_count: 0, forks_count: 0, language: 'HTML', html_url: 'https://github.com/parthchandak02/flora', updated_at: '2026-06-28T23:17:08Z', created_at: '2026-06-28T20:00:06Z', pushed_at: '2026-06-28T23:17:04Z', archived: false },
  { id: 1281447767, name: 'drift', full_name: 'parthchandak02/drift', description: 'Wind-driven particle flow visualization', stargazers_count: 0, forks_count: 0, language: 'HTML', html_url: 'https://github.com/parthchandak02/drift', updated_at: '2026-06-28T22:25:58Z', created_at: '2026-06-28T18:13:45Z', pushed_at: '2026-06-28T22:25:55Z', archived: false },
]

interface GitHubSearchItem {
  id: number
  name: string
  full_name: string
  description: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  html_url: string
  updated_at: string
  created_at: string
  pushed_at: string
  archived: boolean
}

function mapItem(item: GitHubSearchItem): Repo {
  return {
    id: item.id,
    name: item.name,
    full_name: item.full_name,
    description: item.description,
    stargazers_count: item.stargazers_count,
    forks_count: item.forks_count,
    language: item.language,
    html_url: item.html_url,
    updated_at: item.updated_at,
    created_at: item.created_at,
    pushed_at: item.pushed_at,
    archived: item.archived,
  }
}

export async function fetchRepos(): Promise<{ repos: Repo[]; source: RepoSource; repoCount: number }> {
  try {
    const response = await fetch(API_URL, {
      headers: { Accept: 'application/vnd.github+json' },
    })
    if (!response.ok) throw new Error(`GitHub API ${response.status}`)
    const data = (await response.json()) as GitHubSearchItem[]
    if (!data?.length) throw new Error('Empty GitHub response')
    // Filter to non-fork repos
    const items = data.filter((r: any) => !r.fork)
    return { repos: items.map(mapItem), source: 'live', repoCount: items.length }
  } catch {
    return { repos: FALLBACK_REPOS, source: 'fallback', repoCount: FALLBACK_REPOS.length }
  }
}

export function formatCount(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}k`
  return String(count)
}
