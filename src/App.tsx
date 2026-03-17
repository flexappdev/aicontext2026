import { useEffect, useMemo, useState } from 'react'
import { Menu, Search, X } from 'lucide-react'
import { MarkdownPanel } from './components/MarkdownPanel'
import { sections } from './content'
import { useSearchIndex } from './hooks/useSearchIndex'

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

// ─── Sidebar nav list (shared between sticky sidebar + mobile drawer) ────────
type SidebarNavProps = {
  active: string
  q: string
  recent: string[]
  onSelect: (id: string) => void
  searchResults: ReturnType<ReturnType<typeof useSearchIndex>['search']>
}

function SidebarNav({ active, q, recent, onSelect, searchResults }: SidebarNavProps) {
  const recentItems = useMemo(
    () => recent.filter((id) => id !== active).slice(0, 3)
      .map((id) => sections.find((s) => s.id === id))
      .filter(Boolean) as typeof sections,
    [recent, active]
  )

  // F03: grouped sections (no search query)
  const sidebarItems = useMemo(() => {
    if (q.trim()) return []
    const items: Array<{ type: 'header'; label: string } | { type: 'section'; section: typeof sections[0] }> = []
    let lastGroup: string | undefined = undefined
    for (const s of sections) {
      if (s.group !== lastGroup) {
        if (s.group) items.push({ type: 'header', label: s.group })
        lastGroup = s.group
      }
      items.push({ type: 'section', section: s })
    }
    return items
  }, [q])

  const btnCls = (id: string) =>
    `w-full text-left px-3 py-2 rounded-xl text-sm transition ` +
    (active === id
      ? 'bg-green-500/15 text-green-200 border border-green-500/20'
      : 'hover:bg-white/5 text-gray-200')

  return (
    <>
      {/* F08: recent sections (when not searching) */}
      {!q && recentItems.length > 0 && (
        <>
          <div className="px-3 pt-1 pb-0.5 text-[10px] font-semibold uppercase tracking-widest text-gray-500">Recent</div>
          {recentItems.map((s) => (
            <button key={`recent-${s.id}`} onClick={() => onSelect(s.id)} className="w-full text-left px-3 py-1.5 rounded-xl text-sm transition hover:bg-white/5 text-gray-400">
              {s.title}
            </button>
          ))}
          <div className="my-1.5 border-t border-white/5" />
        </>
      )}

      {/* F07: full-text search results */}
      {q.trim() && (
        <>
          {searchResults.length === 0 ? (
            <div className="px-3 py-3 text-sm text-gray-500">No results</div>
          ) : (
            searchResults.map(({ section: s, snippet }) => (
              <button key={s.id} onClick={() => onSelect(s.id)} className={btnCls(s.id)}>
                <div className="font-semibold">{s.title}</div>
                {snippet && (
                  <div className="text-xs text-gray-400 mt-0.5 leading-relaxed line-clamp-2">{snippet}</div>
                )}
              </button>
            ))
          )}
        </>
      )}

      {/* F03: grouped sections (when not searching) */}
      {!q.trim() && sidebarItems.map((item, i) => {
        if (item.type === 'header') {
          return (
            <div key={`hdr-${i}`} className="px-3 pt-2 pb-0.5 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
              {item.label}
            </div>
          )
        }
        const s = item.section
        return (
          <button key={s.id} onClick={() => onSelect(s.id)} className={btnCls(s.id)}>
            <div className="font-semibold">{s.title}</div>
          </button>
        )
      })}
    </>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────
function App() {
  const [active, setActive] = useState(getInitialActive)
  const [q, setQ] = useState('')
  const [recent, setRecent] = useState<string[]>(getInitialRecent)
  const [drawerOpen, setDrawerOpen] = useState(false) // F04

  const { search } = useSearchIndex() // F07
  const searchResults = useMemo(() => search(q), [q, search])

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
      if (e.key === 'Escape') { setDrawerOpen(false); return }
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

  // F04: close drawer on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setDrawerOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  function handleSelect(id: string) {
    setActive(id)
    setDrawerOpen(false)
  }

  const navProps: SidebarNavProps = { active, q, recent, onSelect: handleSelect, searchResults }

  return (
    <div className="min-h-screen bg-[#050507] text-gray-100">
      {/* F04: mobile drawer overlay */}
      {drawerOpen && (
        <div className="fixed inset-0 z-30 md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setDrawerOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-[280px] bg-[#0a0a0f] border-r border-white/10 overflow-y-auto p-2">
            <div className="flex items-center justify-between px-3 py-2 mb-1">
              <span className="text-sm font-bold text-gray-200">Sections</span>
              <button onClick={() => setDrawerOpen(false)} className="p-1 rounded hover:bg-white/10">
                <X size={16} className="text-gray-400" />
              </button>
            </div>
            <SidebarNav {...navProps} />
          </div>
        </div>
      )}

      <header className="sticky top-0 z-20 border-b border-white/10 bg-black/70 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* F04: hamburger (mobile only) */}
            <button
              className="md:hidden p-1.5 rounded-lg hover:bg-white/10 text-gray-300"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation"
            >
              <Menu size={20} />
            </button>
            <div className="font-black tracking-tight">
              <a href="/ai/" className="hover:opacity-90">AI Context 2026</a>
              <div className="text-xs text-gray-400 font-medium hidden sm:block">models • claude code • skills • MCP • open claw • workflows</div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 w-full max-w-md">
            <Search size={16} className="text-gray-400 shrink-0" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search all content… (j/k to navigate)"
              className="bg-transparent outline-none w-full text-sm"
            />
            {q && (
              <button onClick={() => setQ('')} className="text-gray-500 hover:text-gray-300">
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
        {/* Sticky desktop sidebar */}
        <aside className="hidden md:block md:sticky md:top-[76px] h-fit">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-2">
            <SidebarNav {...navProps} />
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
