import { useState, useEffect, useRef } from 'react'
import { 
  Code2, 
  MessageSquare, 
  Layers, 
  Zap, 
  Lock, 
  Globe,
  Sparkles,
  GitBranch,
  Cpu
} from 'lucide-react'

interface Feature {
  icon: typeof Code2
  title: string
  description: string
  gradient: string
}

const features: Feature[] = [
  {
    icon: Sparkles,
    title: 'AI-Powered Autocomplete',
    description: 'Real-time code suggestions powered by advanced language models that understand your entire codebase context.',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: Code2,
    title: 'Composer Mode',
    description: 'Make coordinated changes across multiple files simultaneously. Perfect for refactoring and large-scale features.',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: MessageSquare,
    title: 'Chat with Context',
    description: 'Ask questions about your codebase and get intelligent answers. Debug faster with AI assistance.',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    icon: Zap,
    title: 'Background Agents',
    description: 'Run coding tasks asynchronously. Fix bugs and develop features even when you\'re away from your keyboard.',
    gradient: 'from-yellow-500 to-orange-500'
  },
  {
    icon: Layers,
    title: 'Full Codebase Indexing',
    description: 'Understands your entire project structure, dependencies, and patterns for context-aware suggestions.',
    gradient: 'from-indigo-500 to-purple-500'
  },
  {
    icon: Cpu,
    title: 'Multi-Model Support',
    description: 'Choose from various AI models from leading providers. Pick the right model for each task.',
    gradient: 'from-cyan-500 to-blue-500'
  },
  {
    icon: Lock,
    title: 'Privacy Mode',
    description: 'Keep your code private. No remote storage, complete control over your data and code.',
    gradient: 'from-red-500 to-pink-500'
  },
  {
    icon: Globe,
    title: 'Web & Mobile',
    description: 'Access and manage your coding agents from anywhere. Collaborate seamlessly across devices.',
    gradient: 'from-teal-500 to-green-500'
  },
]

export default function Features() {
  const [visibleFeatures, setVisibleFeatures] = useState<Set<number>>(new Set())
  const featureRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = featureRefs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleFeatures(prev => new Set(prev).add(index))
          }
        },
        { threshold: 0.2 }
      )

      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach(obs => obs?.disconnect())
    }
  }, [])

  return (
    <section className="py-32 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to code faster and build better software
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isVisible = visibleFeatures.has(index)
            
            return (
              <div
                key={index}
                ref={el => featureRefs.current[index] = el}
                className={`group relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className={`relative mb-4 w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-2 relative z-10">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed relative z-10">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
