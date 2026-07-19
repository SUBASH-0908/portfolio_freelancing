import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    title: 'Jarvis AI Chatbot',
    desc: 'AI-powered chatbot with real-time conversations. Integrated Groq API for intelligent responses. Deployed as both a web app and Android APK.',
    tags: ['React', 'JavaScript', 'Groq API'],
    color: '#f4c400',
    gradient: 'from-yellow-400 to-orange-500',
    github: 'https://github.com/SUBASH-0908',
    live: '#',
  },
  {
    id: 2,
    title: 'Tournament Registration',
    desc: 'Online participant registration system with an interactive form and Google Sheets integration for automatic data storage and record management.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Google Sheets API'],
    color: '#3b82f6',
    gradient: 'from-blue-500 to-purple-600',
    github: 'https://github.com/SUBASH-0908',
    live: '#',
  },
  {
    id: 3,
    title: 'Smart Bag & Object Monitor',
    desc: 'IoT-based smart bag system with sensor-driven object detection, real-time alerts for user safety, and improved security for valuable belongings.',
    tags: ['Arduino', 'Embedded C', 'IoT', 'Sensors'],
    color: '#22c55e',
    gradient: 'from-green-400 to-teal-500',
    github: 'https://github.com/SUBASH-0908',
    live: '#',
  },
  {
    id: 4,
    title: 'MERN Backend APIs',
    desc: 'RESTful APIs built during the Ensemble Nexgen internship. Covers CRUD operations, Node.js routing, Express middleware, and MongoDB integration.',
    tags: ['Node.js', 'Express.js', 'MongoDB', 'REST API'],
    color: '#ef4444',
    gradient: 'from-red-500 to-rose-600',
    github: 'https://github.com/SUBASH-0908',
    live: '#',
  },
  {
    id: 5,
    title: 'ServiceNow Workflows',
    desc: 'Workflow automation and report creation on the ServiceNow platform. Covers platform administration and business process management concepts.',
    tags: ['ServiceNow', 'Workflow', 'Automation'],
    color: '#a855f7',
    gradient: 'from-purple-500 to-pink-600',
    github: '#',
    live: '#',
  },
  {
    id: 6,
    title: 'Generative AI Coding',
    desc: 'Projects from the "Creative Coding: Mastering Generative AI" training — exploring AI-assisted coding, prompting techniques, and modern toolchains.',
    tags: ['Python', 'AI', 'Generative AI'],
    color: '#f97316',
    gradient: 'from-orange-400 to-red-500',
    github: 'https://github.com/SUBASH-0908',
    live: '#',
  },
]

function ProjectCard({ p, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={index * 80}
      className="group relative rounded-[28px] overflow-hidden cursor-pointer transition-all duration-500"
      style={{
        boxShadow: hovered
          ? `0 30px 60px ${p.color}30, 0 0 0 1px ${p.color}30`
          : '0 8px 32px rgba(0,0,0,0.12)',
        transform: hovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image area */}
      <div className={`relative h-52 bg-gradient-to-br ${p.gradient} overflow-hidden`}>
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-7xl font-black text-white/20 uppercase tracking-tighter">
            {p.title[0]}
          </span>
        </div>
        {/* Explore overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center gap-3 transition-all duration-300"
          style={{ background: 'rgba(0,0,0,0.5)', opacity: hovered ? 1 : 0 }}
        >
          <a href={p.live} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white text-black hover:scale-110 transition-transform">
            <FaExternalLinkAlt className="text-sm" />
          </a>
          <a href={p.github} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white text-black hover:scale-110 transition-transform">
            <FaGithub className="text-sm" />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 bg-white">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {p.tags.map(tag => (
            <span
              key={tag}
              className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
              style={{ background: `${p.color}15`, color: p.color }}
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-black text-zinc-900 mb-2 group-hover:text-yellow-500 transition-colors">{p.title}</h3>
        <p className="text-sm text-zinc-500 leading-relaxed">{p.desc}</p>
      </div>
    </div>
  )
}

export default function Projects() {
  const sectionRef = useRef(null)
  const titleRef   = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 0.06,
          y: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="projects" className="relative py-24 overflow-hidden" style={{ background: '#f7f6f2' }}>
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: '#f4c400', filter: 'blur(120px)', opacity: 0.15 }}
      />

      {/* Background watermark */}
      <div
        ref={titleRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        <span
          className="font-black uppercase text-black leading-none"
          style={{ fontSize: '22vw', opacity: 0, letterSpacing: '-0.05em' }}
        >
          My Work
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-yellow-600">Portfolio</span>
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-zinc-900 mt-2">
              Featured<br />
              <span className="text-stroke-black">Projects</span>
            </h2>
          </div>
          <p className="text-zinc-500 max-w-xs text-sm leading-relaxed md:text-right">
            Real-world projects built with Python, React, IoT, and modern web tech — from AI chatbots to IoT devices.
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {projects.map((p, i) => <ProjectCard key={p.id} p={p} index={i} />)}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden service-track no-scrollbar">
          {projects.map((p, i) => (
            <div key={p.id} className="service-card-mobile w-[80vw]">
              <ProjectCard p={p} index={i} />
            </div>
          ))}
        </div>

        {/* View all button */}
        <div className="text-center mt-14" data-aos="fade-up">
          <a
            href="https://github.com/SUBASH-0908"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-zinc-900 text-white font-bold uppercase tracking-widest text-sm hover:bg-yellow-500 hover:text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(244,196,0,0.4)] hover:scale-105"
          >
            View All on GitHub
            <FaGithub className="text-base" />
          </a>
        </div>
      </div>
    </section>
  )
}
