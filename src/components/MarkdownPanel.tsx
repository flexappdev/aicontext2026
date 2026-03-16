import React, { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Check, Copy } from 'lucide-react'

function CopyablePre({ children, ...props }: React.ComponentPropsWithoutRef<'pre'>) {
  const ref = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    const text = ref.current?.innerText ?? ''
    navigator.clipboard.writeText(text).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group/pre">
      <pre ref={ref} {...props}>{children}</pre>
      <button
        onClick={handleCopy}
        aria-label="Copy code"
        className="absolute top-2 right-2 opacity-0 group-hover/pre:opacity-100 transition-opacity p-1.5 rounded bg-white/10 hover:bg-white/20 text-gray-300"
      >
        {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
      </button>
    </div>
  )
}

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
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{ pre: CopyablePre }}
      >
        {md}
      </ReactMarkdown>
    </div>
  )
}
