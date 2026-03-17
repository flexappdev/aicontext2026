import { useEffect, useRef, useState } from 'react'
import { sections, type CheatSection } from '../content'

export type SearchResult = {
  section: CheatSection
  snippet: string
}

export function useSearchIndex() {
  const cache = useRef<Map<string, string>>(new Map())
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const mds = sections.filter((s) => s.mdPath)
    if (mds.length === 0) { setLoaded(true); return }

    let count = 0
    mds.forEach((s) => {
      fetch(s.mdPath!)
        .then((r) => (r.ok ? r.text() : ''))
        .then((text) => { cache.current.set(s.id, text) })
        .catch(() => {})
        .finally(() => {
          count++
          if (count === mds.length) setLoaded(true)
        })
    })
  }, [])

  function search(query: string): SearchResult[] {
    if (!query.trim()) return []
    const qq = query.trim().toLowerCase()

    return sections
      .filter((s) => {
        if (s.title.toLowerCase().includes(qq)) return true
        if (s.bullets?.some((b) => b.toLowerCase().includes(qq))) return true
        const content = s.mdPath ? cache.current.get(s.id) : undefined
        return content ? content.toLowerCase().includes(qq) : false
      })
      .map((s) => {
        let snippet = ''
        const content = s.mdPath ? cache.current.get(s.id) : undefined
        if (content) {
          const idx = content.toLowerCase().indexOf(qq)
          if (idx !== -1) {
            const start = Math.max(0, idx - 40)
            const end = Math.min(content.length, idx + qq.length + 80)
            snippet = content
              .slice(start, end)
              .replace(/#{1,6}\s/g, '')
              .replace(/[*`|]/g, '')
              .replace(/\n+/g, ' ')
              .trim()
            if (start > 0) snippet = '…' + snippet
            if (end < content.length) snippet += '…'
          }
        } else if (s.bullets) {
          snippet = s.bullets.find((b) => b.toLowerCase().includes(qq)) || ''
        }
        return { section: s, snippet }
      })
  }

  return { search, loaded }
}
