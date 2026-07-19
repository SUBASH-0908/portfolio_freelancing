import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaWhatsapp, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa'

gsap.registerPlugin(ScrollTrigger)

const words = ['Developer', 'Freelancer', 'Designer', 'Creator']

const socialLinks = [
  { icon: FaWhatsapp,   color: '#25D366', href: 'https://wa.me/917904434191',               label: 'WhatsApp' },
  { icon: FaInstagram,  color: '#E1306C', href: 'https://instagram.com',                   label: 'Instagram' },
  { icon: FaLinkedinIn, color: '#0A66C2', href: 'https://linkedin.com/in/subash-hochimin', label: 'LinkedIn'  },
  { icon: FaGithub,     color: '#6e40c9', href: 'https://github.com/SUBASH-0908',          label: 'GitHub'    },
]

export default function Hero() {
  const sectionRef = useRef(null)
  const imageRef   = useRef(null)
  const textRef    = useRef(null)
  const [currentWord, setCurrentWord] = useState(0)
  const [animating,   setAnimating]   = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true)
      setTimeout(() => {
        setCurrentWord(p => (p + 1) % words.length)
        setAnimating(false)
      }, 300)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(textRef.current, {
        y: -50,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      })
      gsap.to(imageRef.current, {
        y: 100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      })
      gsap.fromTo('.hero-text-item',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative w-full min-h-screen bg-white flex items-center overflow-hidden"
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-12 pt-24 pb-12">

        {/* ── Left: Text ── */}
        <div ref={textRef} className="flex-1 space-y-6">

          {/* Subtitle */}
          <div className="hero-text-item flex items-center gap-3">
            <span className="w-8 h-0.5 bg-yellow-500 rounded-full" />
            <span className="text-sm font-semibold uppercase tracking-widest text-zinc-500">
              Python Developer · Web Developer · MERN Learner
            </span>
          </div>

          {/* Main title */}
          <div className="hero-text-item">
            <p className="text-3xl md:text-4xl font-black text-black/80 uppercase tracking-tight">
              Hello, I'm
            </p>
            <h1
              className="font-black uppercase leading-none tracking-tighter text-black"
              style={{ fontSize: 'clamp(3.5rem, 11vw, 10rem)', lineHeight: 0.9 }}
            >
              Subash
            </h1>
          </div>

          {/* Rolling animated word */}
          <div className="hero-text-item flex items-center gap-4">
            <span className="text-xl md:text-2xl font-bold text-zinc-500">I am a</span>
            <div className="relative h-9 overflow-hidden">
              <span
                className="text-xl md:text-2xl font-black text-yellow-500 uppercase tracking-tight inline-block transition-all duration-300"
                style={{
                  transform: animating ? 'translateY(-100%)' : 'translateY(0)',
                  opacity: animating ? 0 : 1,
                }}
              >
                {words[currentWord]}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="hero-text-item text-zinc-500 text-base md:text-lg leading-relaxed max-w-md">
            Final Year B.Tech IT student passionate about Python, web development, and backend systems.
            Crafting modern, interactive digital experiences with clean code and creative problem-solving.
          </p>

          {/* Social icons */}
          <div className="hero-text-item flex items-center gap-3 pt-2">
            {socialLinks.map(({ icon: Icon, color, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="group w-12 h-12 rounded-full border-2 border-zinc-200 flex items-center justify-center text-zinc-400 transition-all duration-300 hover:scale-110"
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = color
                  e.currentTarget.style.background  = color
                  e.currentTarget.style.boxShadow   = `0 0 20px ${color}60`
                  e.currentTarget.querySelector('svg').style.color = 'white'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = ''
                  e.currentTarget.style.background  = ''
                  e.currentTarget.style.boxShadow   = ''
                  e.currentTarget.querySelector('svg').style.color = ''
                }}
              >
                <Icon className="text-lg transition-colors" />
              </a>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="hero-text-item flex items-center gap-4 pt-2">
            <a
              href="#contact"
              onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="px-8 py-3.5 rounded-full bg-black text-white font-bold text-sm uppercase tracking-widest hover:bg-yellow-500 hover:text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(244,196,0,0.4)] hover:scale-105"
            >
              Hire Me
            </a>
            <a
              href="#projects"
              onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="px-8 py-3.5 rounded-full border-2 border-black text-black font-bold text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300"
            >
              My Work
            </a>
          </div>
        </div>

        {/* ── Right: Hero Image ── */}
        <div className="flex-1 flex items-end justify-center relative">
          <div
            className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full"
            style={{
              background: 'radial-gradient(circle, #f4c400 0%, #f4c40040 60%, transparent 80%)',
              filter: 'blur(40px)',
              bottom: '-20px',
              right: '10%',
            }}
          />
          <img
            ref={imageRef}
            src="/hero-model.png"
            alt="Subash H – Python & Web Developer"
            className="relative z-10 h-[70vh] max-h-[700px] object-contain"
            style={{ filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.2))' }}
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">Scroll</span>
        <div className="w-0.5 h-12 bg-gradient-to-b from-zinc-400 to-transparent" />
      </div>
    </section>
  )
}
