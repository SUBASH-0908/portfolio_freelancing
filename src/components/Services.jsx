import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    num: '01',
    title: 'Landing Page Design',
    tag: 'Web Design',
    color: '#f4c400',
    icon: '🖥️',
    desc: 'High-converting, pixel-perfect landing pages built to impress visitors and turn them into clients. Fast load, mobile-first, SEO-ready.',
    features: ['Responsive Design', 'SEO Optimised', 'Contact Form', 'Fast Delivery'],
  },
  {
    num: '02',
    title: 'Full Stack Web App',
    tag: 'Full Stack',
    color: '#3b82f6',
    icon: '⚛️',
    desc: 'End-to-end web applications using the MERN stack. Authentication, database, REST APIs, and a polished React frontend — all in one.',
    features: ['React Frontend', 'Node.js Backend', 'MongoDB Database', 'JWT Auth'],
  },
  {
    num: '03',
    title: 'Backend & REST API',
    tag: 'Backend',
    color: '#dc2626',
    icon: '⚡',
    desc: 'Scalable REST APIs with Node.js & Express.js. Handles authentication, CRUD, file uploads, and third-party integrations.',
    features: ['Express.js APIs', 'MongoDB / SQL', 'Auth & Sessions', 'API Docs'],
  },
  {
    num: '04',
    title: 'Python Automation',
    tag: 'Scripting',
    color: '#22c55e',
    icon: '🐍',
    desc: 'Custom Python scripts for web scraping, file automation, data processing, Excel/PDF generation, and task scheduling.',
    features: ['Web Scraping', 'Data Processing', 'File Automation', 'Scheduling'],
  },
  {
    num: '05',
    title: 'AI-Powered Features',
    tag: 'AI / ML',
    color: '#a855f7',
    icon: '🤖',
    desc: 'Add intelligence to your product — chatbots, AI search, sentiment analysis, and Generative AI integration using Groq & OpenAI APIs.',
    features: ['ChatBot Integration', 'AI Search', 'Text Generation', 'API Integration'],
  },
  {
    num: '06',
    title: 'Website Revamp',
    tag: 'Redesign',
    color: '#f97316',
    icon: '🔄',
    desc: 'Transform your outdated website into a modern, fast, and beautiful product. UI/UX overhaul, performance boost, and mobile optimisation.',
    features: ['UI/UX Overhaul', 'Performance Fix', 'Mobile Friendly', 'Code Cleanup'],
  },
]

export default function Services() {
  const sectionRef = useRef(null)
  const [hoveredIdx, setHoveredIdx] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Row items slide in from alternating sides */
      gsap.fromTo('.srv-row',
        (i) => ({ opacity: 0, x: i % 2 === 0 ? -80 : 80 }),
        {
          opacity: 1, x: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      )
      /* Number counter flies in from top */
      gsap.fromTo('.srv-num',
        { opacity: 0, y: -40 },
        {
          opacity: 1, y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'back.out(1.6)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="service"
      className="relative py-24 overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      {/* Background text watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span style={{ fontSize: '18vw', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.05em', color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.03)' }}>
          SERVICES
        </span>
      </div>

      {/* Glow blobs */}
      <div className="absolute pointer-events-none" style={{ width: '40vw', height: '40vw', borderRadius: '50%', background: 'radial-gradient(rgba(244,196,0,0.06), transparent 70%)', filter: 'blur(60px)', right: 0, top: 0 }} />
      <div className="absolute pointer-events-none" style={{ width: '30vw', height: '30vw', borderRadius: '50%', background: 'radial-gradient(rgba(139,92,246,0.05), transparent 70%)', filter: 'blur(60px)', left: 0, bottom: 0 }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-yellow-500 block mb-3">Freelance Services</span>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
              What I <span className="text-yellow-400">Build</span>
              <br />
              <span style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)', color: 'transparent' }}>For You</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
            End-to-end web solutions tailored for startups, businesses, and founders who want to ship fast.
          </p>
        </div>

        {/* Service rows */}
        <div className="flex flex-col divide-y divide-zinc-800/60">
          {services.map((s, i) => (
            <div
              key={s.num}
              className="srv-row group py-6 md:py-7 cursor-pointer"
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">

                {/* Number */}
                <span className="srv-num text-5xl md:text-6xl font-black leading-none flex-shrink-0 transition-all duration-300"
                  style={{ color: hoveredIdx === i ? s.color : 'rgba(255,255,255,0.08)', minWidth: 80 }}
                >
                  {s.num}
                </span>

                {/* Icon + Title */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{
                      background: hoveredIdx === i ? `${s.color}20` : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${hoveredIdx === i ? s.color + '40' : 'rgba(255,255,255,0.06)'}`,
                    }}
                  >
                    <span className="text-xl">{s.icon}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full"
                        style={{ background: `${s.color}18`, color: s.color }}
                      >
                        {s.tag}
                      </span>
                    </div>
                    <h3 className="text-lg md:text-2xl font-black text-white uppercase tracking-tight leading-none transition-colors duration-300 group-hover:text-yellow-300">
                      {s.title}
                    </h3>
                  </div>
                </div>

                {/* Description + features — slide open on hover */}
                <div className="flex-1 overflow-hidden transition-all duration-500"
                  style={{ maxHeight: hoveredIdx === i ? 200 : 0, opacity: hoveredIdx === i ? 1 : 0 }}
                >
                  <p className="text-zinc-400 text-sm leading-relaxed mb-3">{s.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {s.features.map(f => (
                      <span key={f} className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                        style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.07)' }}
                      >
                        ✓ {f}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA arrow */}
                <div className="flex items-center gap-4 flex-shrink-0">
                  <a
                    href="https://wa.me/917904434191"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden md:flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 hover:scale-105"
                    style={{
                      background: hoveredIdx === i ? s.color : 'rgba(255,255,255,0.06)',
                      color: hoveredIdx === i ? (s.color === '#f4c400' ? '#000' : 'white') : 'rgba(255,255,255,0.4)',
                      border: `1px solid ${hoveredIdx === i ? s.color : 'rgba(255,255,255,0.08)'}`,
                    }}
                  >
                    Hire Me →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <p className="text-zinc-500 text-sm mb-4">Have a custom project idea?</p>
          <a
            href="https://wa.me/917904434191"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(244,196,0,0.4)]"
            style={{ background: 'linear-gradient(135deg,#f4c400,#fbbf24)' }}
          >
            ⚡ Let's Talk on WhatsApp →
          </a>
        </div>
      </div>
    </section>
  )
}
