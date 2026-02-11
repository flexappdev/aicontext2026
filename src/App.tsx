import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { MarkdownPanel } from './components/MarkdownPanel'
import { sections } from './content'

function App() {
  const [active, setActive] = useState(sections[0]?.id || 'overview')
  const [q, setQ] = useState('')

  const activeSection = useMemo(() => sections.find((s) => s.id === active) || sections[0], [active])

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase()
    if (!qq) return sections
    return sections.filter((s) => {
      const t = `${s.title} ${(s.bullets || []).join(' ')}`.toLowerCase()
      return t.includes(qq)
    })
  }, [q])

  return (
    <div className="min-h-screen bg-[#050507] text-gray-100">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-black/70 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
          <div className="font-black tracking-tight">
            <a href="/ai/" className="hover:opacity-90">AI Context 2026</a>
            <div className="text-xs text-gray-400 font-medium">cheat sheet • models • tools • MCP</div>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 w-full max-w-md">
            <Search size={16} className="text-gray-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search sections…"
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
        <aside className="md:sticky md:top-[76px] h-fit">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-2">
            {filtered.map((s) => (
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
            ))}
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
