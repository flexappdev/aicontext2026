import { useEffect, useMemo, useState } from 'react'
import { BookOpen, Menu, Moon, Printer, Search, Sun, X } from 'lucide-react'
import { MarkdownPanel } from './components/MarkdownPanel'
import { sections } from './content'
import { useSearchIndex } from './hooks/useSearchIndex'

const RECENT_KEY = 'ai-recent'
const THEME_KEY  = 'ai-theme'
const MAX_RECENT = 5

type Theme = 'dark' | 'light'

function getInitialActive(): string {
  const hash = window.location.hash.slice(1)
  if (hash && sections.find((s) => s.id === hash)) return hash
  return sections[0]?.id || 'overview'
}

function getInitialRecent(): string[] {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]') }
  catch { return [] }
}

function getInitialTheme(): Theme {
  try { return (localStorage.getItem(THEME_KEY) || 'dark') as Theme }
  catch { return 'dark' }
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
      ? 'bg-[var(--c-active-bg)] text-[var(--c-active-txt)] border border-[var(--c-active-bdr)]'
      : 'hover:bg-[var(--c-hover)] text-[var(--c-text2)]')

  return (
    <>
      {/* F08: recent sections (when not searching) */}
      {!q && recentItems.length > 0 && (
        <>
          <div className="px-3 pt-1 pb-0.5 text-[10px] font-semibold uppercase tracking-widest text-[var(--c-faint)]">Recent</div>
          {recentItems.map((s) => (
            <button key={`recent-${s.id}`} onClick={() => onSelect(s.id)} className="w-full text-left px-3 py-1.5 rounded-xl text-sm transition hover:bg-[var(--c-hover)] text-[var(--c-muted)]">
              {s.title}
            </button>
          ))}
          <div className="my-1.5 border-t border-[var(--c-border)]" />
        </>
      )}

      {/* F07: full-text search results */}
      {q.trim() && (
        <>
          {searchResults.length === 0 ? (
            <div className="px-3 py-3 text-sm text-[var(--c-faint)]">No results</div>
          ) : (
            searchResults.map(({ section: s, snippet }) => (
              <button key={s.id} onClick={() => onSelect(s.id)} className={btnCls(s.id)}>
                <div className="font-semibold">{s.title}</div>
                {snippet && (
                  <div className="text-xs text-[var(--c-muted)] mt-0.5 leading-relaxed line-clamp-2">{snippet}</div>
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
            <div key={`hdr-${i}`} className="px-3 pt-2 pb-0.5 text-[10px] font-semibold uppercase tracking-widest text-[var(--c-faint)]">
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
  const [active, setActive]       = useState(getInitialActive)
  const [q, setQ]                 = useState('')
  const [recent, setRecent]       = useState<string[]>(getInitialRecent)
  const [drawerOpen, setDrawerOpen] = useState(false) // F04
  const [theme, setTheme]         = useState<Theme>(getInitialTheme) // F06
  const [quickRef, setQuickRef]   = useState(false) // F12

  const { search } = useSearchIndex() // F07
  const searchResults = useMemo(() => search(q), [q, search])

  const activeSection = useMemo(
    () => sections.find((s) => s.id === active) || sections[0],
    [active]
  )

  // F06: sync theme to DOM + localStorage
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

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
  const hasQuickRef = (activeSection?.bullets?.length ?? 0) > 0

  return (
    <div className="min-h-screen bg-[var(--c-bg)] text-[var(--c-text)]">
      {/* F04: mobile drawer overlay */}
      {drawerOpen && (
        <div className="fixed inset-0 z-30 md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setDrawerOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-[280px] bg-[var(--c-bg2)] border-r border-[var(--c-border)] overflow-y-auto p-2">
            <div className="flex items-center justify-between px-3 py-2 mb-1">
              <span className="text-sm font-bold text-[var(--c-text2)]">Sections</span>
              <button onClick={() => setDrawerOpen(false)} className="p-1 rounded hover:bg-[var(--c-btn)]">
                <X size={16} className="text-[var(--c-muted)]" />
              </button>
            </div>
            <SidebarNav {...navProps} />
          </div>
        </div>
      )}

      <header className="sticky top-0 z-20 border-b border-[var(--c-border)] backdrop-blur" style={{ background: 'var(--c-header)' }}>
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* F04: hamburger (mobile only) */}
            <button
              className="md:hidden p-1.5 rounded-lg hover:bg-[var(--c-btn)] text-[var(--c-text2)]"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation"
            >
              <Menu size={20} />
            </button>
            <div className="font-black tracking-tight">
              <a href="/ai/" className="hover:opacity-90">AI Context 2026</a>
              <div className="text-xs text-[var(--c-muted)] font-medium hidden sm:block">models • claude code • skills • MCP • open claw • workflows</div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-[var(--c-border)] bg-[var(--c-surface)] px-3 py-2 w-full max-w-md">
            <Search size={16} className="text-[var(--c-muted)] shrink-0" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search all content… (j/k to navigate)"
              className="bg-transparent outline-none w-full text-sm"
            />
            {q && (
              <button onClick={() => setQ('')} className="text-[var(--c-faint)] hover:text-[var(--c-muted)]">
                <X size={14} />
              </button>
            )}
          </div>
          {/* F06: theme toggle + F09: print button */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => window.print()}
              className="no-print p-1.5 rounded-lg hover:bg-[var(--c-btn)] text-[var(--c-muted)]"
              aria-label="Print page"
              title="Print / Save as PDF"
            >
              <Printer size={18} />
            </button>
            <button
              onClick={() => setTheme((t) => t === 'dark' ? 'light' : 'dark')}
              className="p-1.5 rounded-lg hover:bg-[var(--c-btn)] text-[var(--c-muted)]"
              aria-label="Toggle theme"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
        {/* Sticky desktop sidebar */}
        <aside className="no-print hidden md:block md:sticky md:top-[76px] h-fit">
          <div className="rounded-2xl border border-[var(--c-border)] bg-[var(--c-surface)] p-2">
            <SidebarNav {...navProps} />
          </div>
          <div className="mt-3 text-xs text-[var(--c-faint)]">
            Source repo: <a className="underline" href="https://github.com/flexappdev/aicontext2026" target="_blank" rel="noreferrer">flexappdev/aicontext2026</a>
          </div>
        </aside>

        <main>
          <div className="rounded-3xl border border-[var(--c-border)] bg-[var(--c-surface)] p-6">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
              <h1 className="text-2xl md:text-3xl font-black tracking-tight">{activeSection?.title}</h1>
              <div className="flex items-center gap-2 shrink-0 mt-1">
                {/* F12: quick reference toggle */}
                {hasQuickRef && (
                  <button
                    onClick={() => setQuickRef((v) => !v)}
                    className={`no-print flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border transition ${
                      quickRef
                        ? 'bg-[var(--c-active-bg)] border-[var(--c-active-bdr)] text-[var(--c-active-txt)]'
                        : 'border-[var(--c-border)] text-[var(--c-faint)] hover:bg-[var(--c-hover)]'
                    }`}
                    title="Toggle quick reference view"
                  >
                    <BookOpen size={12} />
                    {quickRef ? 'Full' : 'Quick ref'}
                  </button>
                )}
                {activeSection?.lastUpdated && (
                  <span className="text-[10px] font-medium text-[var(--c-faint)] border border-[var(--c-border)] rounded-full px-2 py-0.5">
                    Updated {activeSection.lastUpdated}
                  </span>
                )}
              </div>
            </div>

            {activeSection?.links?.length ? (
              <div className="flex flex-wrap gap-2 mb-3">
                {activeSection.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs border border-[var(--c-active-bdr)] rounded-full px-2.5 py-0.5 hover:bg-[var(--c-active-bg)] transition"
                    style={{ color: 'var(--c-accent)' }}
                  >
                    {link.label} ↗
                  </a>
                ))}
              </div>
            ) : null}

            {activeSection?.bullets?.length ? (
              <ul className="mt-4 space-y-2 text-sm text-[var(--c-text2)]">
                {activeSection.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: 'var(--c-accent)' }} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            {/* F12: show markdown only when not in quick-ref mode */}
            {!quickRef && activeSection?.mdPath ? (
              <div className="mt-6">
                <MarkdownPanel mdPath={activeSection.mdPath} light={theme === 'light'} />
              </div>
            ) : null}

            {/* F12: quick-ref mode with no bullets fallback */}
            {quickRef && !hasQuickRef && activeSection?.mdPath ? (
              <div className="mt-6">
                <MarkdownPanel mdPath={activeSection.mdPath} light={theme === 'light'} />
              </div>
            ) : null}
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
