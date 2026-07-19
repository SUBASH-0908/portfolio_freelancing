import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const skills = [
  {
    title: 'Python Development',
    tag: 'Backend',
    color: '#3b82f6',
    desc: 'Building scripts, automation tools, and backend logic using Python. Clean, readable, and efficient code.',
    icon: '🐍',
  },
  {
    title: 'Web Development',
    tag: 'Frontend',
    color: '#f4c400',
    desc: 'Crafting modern, responsive websites with HTML, CSS, and JavaScript. Clean UI and smooth interactions.',
    icon: '🌐',
  },
  {
    title: 'React Applications',
    tag: 'UI/UX',
    color: '#06b6d4',
    desc: 'Building dynamic single-page applications with React. Component-based architecture and state management.',
    icon: '⚛️',
  },
  {
    title: 'Backend & REST APIs',
    tag: 'API',
    color: '#dc2626',
    desc: 'Creating RESTful APIs with Node.js and Express.js. CRUD operations, routing, and MongoDB integration.',
    icon: '⚡',
  },
  {
    title: 'IoT & Embedded Systems',
    tag: 'Hardware',
    color: '#22c55e',
    desc: 'Developing sensor-based IoT systems with Arduino and Embedded C for smart device solutions.',
    icon: '🔧',
  },
  {
    title: 'AI-Powered Apps',
    tag: 'AI/ML',
    color: '#a855f7',
    desc: 'Integrating AI APIs (Groq, Generative AI) into applications for intelligent, real-time features.',
    icon: '🤖',
  },
]

export default function Skills() {
  const sectionRef   = useRef(null)
  const containerRef = useRef(null)
  const cardsRef     = useRef([])
  const bgRef        = useRef(null)
  const [activeIdx, setActiveIdx] = useState(2)
  const isMobile = useRef(false)

  useEffect(() => {
    isMobile.current = window.innerWidth < 768
    if (isMobile.current) return

    const ctx = gsap.context(() => {
      const N      = skills.length
      const radius = 600
      const total  = N

      const updateCards = (progress) => {
        const activeFloat = progress * (total - 1)
        const activeIndex = Math.round(activeFloat)
        setActiveIdx(activeIndex)

        cardsRef.current.forEach((card, i) => {
          if (!card) return
          const offset = i - activeFloat
          const angle  = (offset / (total - 1)) * Math.PI * 0.7
          const x      = Math.sin(angle) * radius
          const y      = radius - Math.cos(angle) * radius * 0.5
          const scale  = 1 - Math.abs(offset) * 0.12
          const opacity = 1 - Math.abs(offset) * 0.25
          const rotZ   = angle * 18
          const z      = -Math.abs(offset) * 60

          gsap.set(card, { x, y: y * 0.4, scale, opacity, rotationZ: rotZ, z, transformOrigin: 'center bottom' })
        })

        if (bgRef.current) {
          gsap.to(bgRef.current, { backgroundColor: `${skills[activeIndex]?.color}18`, duration: 0.4 })
        }
      }

      updateCards(2 / (total - 1))

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${window.innerHeight * 5}`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => updateCards(self.progress),
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative overflow-hidden"
      style={{ height: '100vh', background: '#0a0a0a' }}
    >
      {/* Dynamic bg */}
      <div ref={bgRef} className="absolute inset-0 transition-colors duration-500" />

      {/* Background SKILLS text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span
          className="font-black uppercase leading-none tracking-tighter"
          style={{ fontSize: '18vw', color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.04)', letterSpacing: '-0.05em' }}
        >
          SKILLS
        </span>
      </div>

      {/* Header */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 text-center z-[20] pointer-events-none">
        <span className="text-xs uppercase tracking-widest font-bold text-yellow-500">What I Know</span>
        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mt-2">
          My <span className="text-yellow-400">Skills</span>
        </h2>
      </div>

      {/* Desktop 3D Carousel */}
      <div
        className="hidden md:flex absolute inset-0 items-center justify-center"
        style={{ perspective: '1000px', perspectiveOrigin: 'center bottom' }}
      >
        <div ref={containerRef} className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
          {skills.map((s, i) => (
            <div
              key={s.title}
              ref={el => (cardsRef.current[i] = el)}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ width: 360, height: 480, transformStyle: 'preserve-3d' }}
            >
              <div
                className="w-full h-full rounded-[30px] overflow-hidden flex flex-col"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow:
                    i === activeIdx
                      ? `0 30px 80px ${s.color}40, 0 0 0 1px ${s.color}30`
                      : '0 20px 50px rgba(0,0,0,0.4)',
                  transition: 'box-shadow 0.4s ease',
                }}
              >
                <div
                  className="h-48 flex items-center justify-center relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${s.color}30, ${s.color}10)` }}
                >
                  <span className="text-8xl">{s.icon}</span>
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        'linear-gradient(45deg, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(-45deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                    }}
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <span
                    className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3 self-start"
                    style={{ background: `${s.color}20`, color: s.color }}
                  >
                    {s.tag}
                  </span>
                  <h3 className="text-xl font-black text-white mb-3">{s.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed flex-1">{s.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Snap Carousel */}
      <div className="md:hidden absolute inset-0 flex items-center pt-32">
        <div className="no-scrollbar w-full px-4 overflow-x-auto flex gap-4 snap-x snap-mandatory">
          {skills.map((s) => (
            <div key={s.title} className="flex-shrink-0 snap-center" style={{ width: '80vw', height: 420 }}>
              <div
                className="w-full h-full rounded-[28px] overflow-hidden flex flex-col"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: `0 20px 50px ${s.color}20`,
                }}
              >
                <div
                  className="h-40 flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${s.color}30, ${s.color}10)` }}
                >
                  <span className="text-6xl">{s.icon}</span>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <span
                    className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full mb-2 self-start"
                    style={{ background: `${s.color}20`, color: s.color }}
                  >
                    {s.tag}
                  </span>
                  <h3 className="text-lg font-black text-white mb-2">{s.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed flex-1">{s.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress dots */}
      <div className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 gap-2.5 z-10">
        {skills.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === activeIdx ? 24 : 8,
              height: 8,
              background: i === activeIdx ? '#f4c400' : 'rgba(255,255,255,0.2)',
            }}
          />
        ))}
      </div>
    </section>
  )
}
