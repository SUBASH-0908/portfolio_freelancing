import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { FaTimes, FaBars } from 'react-icons/fa'
import { FaWhatsapp, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa'

const navLinks = ['Home', 'About', 'Portfolio', 'Service', 'Skills', 'Contact']
const SHOW_AT  = 40   // px — nav content appears after scrolling this far

export default function Navbar() {
  const navBgRef    = useRef(null)   // the dark blur background strip
  const linksUlRef  = useRef(null)   // ul holding desktop links
  const btnRef      = useRef(null)   // CTA button
  const linksRef    = useRef([])

  const [mobileOpen, setMobileOpen] = useState(false)
  const [modalOpen,  setModalOpen]  = useState(false)
  const [form,       setForm]       = useState({ name: '', role: '', message: '' })

  const isVisible = useRef(false)
  const ticking   = useRef(false)

  /* ── On mount: hide only the nav content (bg, links, button) ── */
  useEffect(() => {
    // Logo is ALWAYS visible — do NOT hide it
    // Only hide the background strip, links, and button
    gsap.set(navBgRef.current,   { opacity: 0 })
    gsap.set(linksUlRef.current, { opacity: 0, y: -10 })
    if (btnRef.current) gsap.set(btnRef.current, { opacity: 0, scale: 0.9 })

    isVisible.current = false

    // If page refreshed mid-scroll — instantly show content
    if (window.scrollY > SHOW_AT) {
      gsap.set(navBgRef.current,   { opacity: 1 })
      gsap.set(linksUlRef.current, { opacity: 1, y: 0 })
      if (btnRef.current) gsap.set(btnRef.current, { opacity: 1, scale: 1 })
      isVisible.current = true
    }
  }, [])

  /* ── Scroll: show/hide content (not logo) ── */
  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return
      ticking.current = true

      requestAnimationFrame(() => {
        const y = window.scrollY

        if (y > SHOW_AT && !isVisible.current) {
          // Show nav content
          isVisible.current = true
          gsap.to(navBgRef.current,   { opacity: 1, duration: 0.4, ease: 'power2.out' })
          gsap.to(linksUlRef.current, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' })
          if (btnRef.current) gsap.to(btnRef.current, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(1.7)' })

        } else if (y <= SHOW_AT && isVisible.current) {
          // Hide nav content (logo stays)
          isVisible.current = false
          gsap.to(navBgRef.current,   { opacity: 0, duration: 0.35, ease: 'power2.inOut' })
          gsap.to(linksUlRef.current, { opacity: 0, y: -10, duration: 0.3, ease: 'power2.in' })
          if (btnRef.current) gsap.to(btnRef.current, { opacity: 0, scale: 0.9, duration: 0.25 })
        }

        ticking.current = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    const map = {
      Home:      'home',
      About:     'about',
      Portfolio: 'portfolio',
      Projects:  'projects',
      Service:   'service',
      Skills:    'skills',
      Contact:   'contact',
    }
    const target = document.getElementById(map[id] ?? id.toLowerCase())
    target?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.message) return
    alert(`Thanks ${form.name}! Testimonial received.`)
    setForm({ name: '', role: '', message: '' })
    setModalOpen(false)
  }

  return (
    <>
      {/* ─────────────── NAVBAR ─────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-[999] flex items-center justify-between px-6 md:px-12 py-4"
        style={{ willChange: 'transform' }}
      >
        {/* Dark blur background (hides at top, shows on scroll) */}
        <div
          ref={navBgRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'rgba(9,9,11,0.65)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        />

        {/* Logo — ALWAYS visible */}
        <div
          onClick={() => scrollTo('Home')}
          className="relative z-10 cursor-pointer group"
        >
          <span className="text-2xl font-black tracking-tight font-display group-hover:drop-shadow-[0_0_14px_rgba(250,204,21,0.8)] transition-all duration-300">
            <span className="text-yellow-400">Sub</span>
            <span className="text-white">ash</span>
          </span>
        </div>

        {/* Desktop nav links (hides at top) */}
        <ul ref={linksUlRef} className="relative z-10 hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <li
              key={link}
              ref={el => (linksRef.current[i] = el)}
              onClick={() => scrollTo(link)}
              className="relative cursor-pointer group"
            >
              <span className="text-sm font-semibold uppercase tracking-widest text-white/70 hover:text-white transition-colors duration-300">
                {link}
              </span>
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-yellow-400 transition-all duration-300 group-hover:w-full" />
            </li>
          ))}
        </ul>

        {/* Right side: CTA (desktop) + Hamburger (mobile) */}
        <div className="relative z-10 flex items-center gap-3">
          <button
            ref={btnRef}
            onClick={() => setModalOpen(true)}
            className="hidden md:flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold tracking-wide bg-yellow-400 text-black
                       hover:bg-yellow-300 hover:shadow-[0_0_22px_rgba(250,204,21,0.55)] hover:scale-105 active:scale-95
                       transition-all duration-300"
          >
            Add Testimonial
          </button>

          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 text-white text-xl"
            aria-label="Open menu"
          >
            <FaBars />
          </button>
        </div>
      </nav>

      {/* ─────────────── MOBILE OVERLAY ─────────────── */}
      <div
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 transition-all duration-500
          ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{
          background: 'rgba(9,9,11,0.97)',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
        }}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-6 right-6 p-2 text-white/60 hover:text-white text-2xl transition-colors"
          aria-label="Close menu"
        >
          <FaTimes />
        </button>

        {navLinks.map(link => (
          <button
            key={link}
            onClick={() => scrollTo(link)}
            className="text-5xl font-black uppercase tracking-tighter text-white hover:text-yellow-400 transition-colors duration-300"
          >
            {link}
          </button>
        ))}

        <button
          onClick={() => { setMobileOpen(false); setModalOpen(true) }}
          className="mt-4 rounded-full bg-yellow-400 px-8 py-3 text-lg font-bold text-black"
        >
          Add Testimonial
        </button>
      </div>

      {/* ─────────────── TESTIMONIAL MODAL ─────────────── */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(12px)' }}
          onClick={e => e.target === e.currentTarget && setModalOpen(false)}
        >
          <div
            className="relative w-full max-w-md rounded-3xl p-8"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.14)',
              backdropFilter: 'blur(30px)',
            }}
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white text-xl transition-colors"
            >
              <FaTimes />
            </button>

            <h3 className="mb-1 text-2xl font-black text-white">Add Testimonial</h3>
            <p className="mb-6 text-sm text-white/40">Share your experience working with me</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { key: 'name', type: 'text', ph: 'Your Name *',        req: true  },
                { key: 'role', type: 'text', ph: 'Your Role / Company', req: false },
              ].map(f => (
                <input
                  key={f.key}
                  type={f.type}
                  placeholder={f.ph}
                  required={f.req}
                  value={form[f.key]}
                  onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white
                             placeholder-white/30 outline-none transition-colors focus:border-yellow-400/50"
                />
              ))}

              <textarea
                placeholder="Your Message *"
                required
                rows={4}
                value={form.message}
                onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white
                           placeholder-white/30 outline-none transition-colors focus:border-yellow-400/50"
              />

              <button
                type="submit"
                className="w-full rounded-xl bg-yellow-400 py-3.5 text-sm font-bold uppercase tracking-widest text-black
                           transition-all duration-300 hover:bg-yellow-300 hover:shadow-[0_0_28px_rgba(250,204,21,0.4)]"
              >
                Submit Testimonial
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
