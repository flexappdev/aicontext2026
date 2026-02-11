import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export function MarkdownPanel({ mdPath }: { mdPath: string }) {
  const [md, setMd] = useState<string>('')
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setErr(null)
    fetch(mdPath)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.text()
      })
      .then((t) => {
        if (!cancelled) setMd(t)
      })
      .catch((e) => {
        if (!cancelled) setErr(String(e?.message || e))
      })
    return () => {
      cancelled = true
    }
  }, [mdPath])

  if (err) {
    return <div className="text-sm text-red-400">Failed to load {mdPath}: {err}</div>
  }

  return (
    <div className="prose prose-invert max-w-none prose-a:text-green-300 prose-code:text-green-200">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{md}</ReactMarkdown>
    </div>
  )
}
