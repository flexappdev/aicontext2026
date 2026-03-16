import { useEffect, useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { MarkdownPanel } from './components/MarkdownPanel'
import { sections } from './content'

const RECENT_KEY = 'ai-recent'
const MAX_RECENT = 5

function getInitialActive(): string {
  const hash = window.location.hash.slice(1)
  if (hash && sections.find((s) => s.id === hash)) return hash
  return sections[0]?.id || 'overview'
}

function getInitialRecent(): string[] {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]') }
  catch { return [] }
}

function App() {
  const [active, setActive] = useState(getInitialActive)
  const [q, setQ] = useState('')
  const [recent, setRecent] = useState<string[]>(getInitialRecent)

  const activeSection = useMemo(
    () => sections.find((s) => s.id === active) || sections[0],
    [active]
  )

  // F02: sync URL hash on navigation
  useEffect(() => {
    window.history.replaceState(null, '', `#${active}`)
  }, [active])

  // F08: track recently visited
  useEffect(() => {
    setRecent((prev) => {
      const next = [active, ...prev.filter((id) => id !== active)].slice(0, MAX_RECENT)
      localStorage.setItem(RECENT_KEY, JSON.stringify(next))
      return next
    })
  }, [active])

  // F01: keyboard navigation (j/k and arrow keys)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      const idx = sections.findIndex((s) => s.id === active)
      if ((e.key === 'j' || e.key === 'ArrowDown') && idx < sections.length - 1) {
        setActive(sections[idx + 1].id)
      }
      if ((e.key === 'k' || e.key === 'ArrowUp') && idx > 0) {
        setActive(sections[idx - 1].id)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [active])

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase()
    if (!qq) return sections
    return sections.filter((s) => {
      const t = `${s.title} ${(s.bullets || []).join(' ')}`.toLowerCase()
      return t.includes(qq)
    })
  }, [q])

  // F03: group sections for sidebar rendering
  const sidebarItems = useMemo(() => {
    if (q.trim()) return filtered.map((s) => ({ type: 'section' as const, section: s }))

    const items: Array<{ type: 'header'; label: string } | { type: 'section'; section: typeof sections[0] }> = []
    let lastGroup: string | undefined = undefined

    for (const s of filtered) {
      if (s.group !== lastGroup) {
        if (s.group) items.push({ type: 'header', label: s.group })
        lastGroup = s.group
      }
      items.push({ type: 'section', section: s })
    }
    return items
  }, [filtered, q])

  // F08: recent items to show at top (excluding current, max 3)
  const recentItems = useMemo(
    () => recent.filter((id) => id !== active).slice(0, 3)
      .map((id) => sections.find((s) => s.id === id))
      .filter(Boolean) as typeof sections,
    [recent, active]
  )

  return (
    <div className="min-h-screen bg-[#050507] text-gray-100">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-black/70 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
          <div className="font-black tracking-tight">
            <a href="/ai/" className="hover:opacity-90">AI Context 2026</a>
            <div className="text-xs text-gray-400 font-medium">models • claude code • skills • MCP • open claw • workflows</div>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 w-full max-w-md">
            <Search size={16} className="text-gray-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search sections… (j/k to navigate)"
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
        <aside className="md:sticky md:top-[76px] h-fit">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-2">
            {/* F08: recent sections */}
            {!q && recentItems.length > 0 && (
              <>
                <div className="px-3 pt-1 pb-0.5 text-[10px] font-semibold uppercase tracking-widest text-gray-500">Recent</div>
                {recentItems.map((s) => (
                  <button
                    key={`recent-${s.id}`}
                    onClick={() => setActive(s.id)}
                    className="w-full text-left px-3 py-1.5 rounded-xl text-sm transition hover:bg-white/5 text-gray-400"
                  >
                    {s.title}
                  </button>
                ))}
                <div className="my-1.5 border-t border-white/5" />
              </>
            )}

            {/* F03: grouped sections */}
            {sidebarItems.map((item, i) => {
              if (item.type === 'header') {
                return (
                  <div key={`hdr-${i}`} className="px-3 pt-2 pb-0.5 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                    {item.label}
                  </div>
                )
              }
              const s = item.section
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  className={
                    `w-full text-left px-3 py-2 rounded-xl text-sm transition ` +
                    (active === s.id
                      ? 'bg-green-500/15 text-green-200 border border-green-500/20'
                      : 'hover:bg-white/5 text-gray-200')
                  }
                >
                  <div className="font-semibold">{s.title}</div>
                </button>
              )
            })}
          </div>

          <div className="mt-3 text-xs text-gray-500">
            Source repo: <a className="underline" href="https://github.com/flexappdev/aicontext2026" target="_blank" rel="noreferrer">flexappdev/aicontext2026</a>
          </div>
        </aside>

        <main>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-2">{activeSection?.title}</h1>

            {activeSection?.bullets?.length ? (
              <ul className="mt-4 space-y-2 text-sm text-gray-200">
                {activeSection.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-400/80" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            {activeSection?.mdPath ? (
              <div className="mt-6">
                <MarkdownPanel mdPath={activeSection.mdPath} />
              </div>
            ) : null}
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
