import { useEffect, useState } from 'react'
import { Sparkles, Code, Zap, Brain } from 'lucide-react'

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-20 pb-32 relative">
      {/* Animated gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" />
      
      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div 
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-sm font-medium">Welcome to the Future of Coding</span>
        </div>

        {/* Main heading */}
        <h1 
          className={`text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-cyan-200 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Cursor 2025
        </h1>

        {/* Subheading */}
        <p 
          className={`text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          The AI-powered code editor that understands your entire codebase.
          <br />
          <span className="text-white/60">Code faster, think bigger.</span>
        </p>

        {/* CTA Buttons */}
        <div 
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold text-lg hover:from-purple-500 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 hover:scale-105">
            Get Started
          </button>
          <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
            Watch Demo
          </button>
        </div>

        {/* Feature icons */}
        <div 
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {[
            { icon: Brain, label: 'AI-Powered', color: 'from-purple-500 to-pink-500' },
            { icon: Code, label: 'Code Composer', color: 'from-blue-500 to-cyan-500' },
            { icon: Zap, label: 'Lightning Fast', color: 'from-yellow-500 to-orange-500' },
            { icon: Sparkles, label: 'Intelligent', color: 'from-green-500 to-emerald-500' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center gap-3 p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <div className={`p-4 rounded-lg bg-gradient-to-br ${item.color} bg-opacity-20`}>
                <item.icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-gray-300">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
