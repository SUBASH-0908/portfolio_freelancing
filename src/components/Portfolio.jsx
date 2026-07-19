import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'

const COLORS = [
  { name: 'yellow', value: '#f4c400' },
  { name: 'red',    value: '#ef4444' },
  { name: 'green',  value: '#22c55e' },
  { name: 'purple', value: '#a855f7' },
  { name: 'rose',   value: '#f43f5e' },
  { name: 'orange', value: '#f97316' },
]

const R   = 150   // reveal circle radius
const BOX = R * 2 // frame size

/* Shared text style — identical on both fill + outline layers */
const TEXT = {
  fontSize:        'clamp(5rem, 20vw, 22rem)',
  fontWeight:      900,
  fontFamily:      'inherit',
  textTransform:   'uppercase',
  letterSpacing:   '-0.03em',
  lineHeight:      1,
  userSelect:      'none',
  whiteSpace:      'nowrap',
  display:         'block',
  padding:         0,
  margin:          0,
}

export default function Portfolio() {
  const sectionRef   = useRef(null)
  const revealRef    = useRef(null)   // clip wrapper — sharp image + outline text
  const frameRef     = useRef(null)

  const [bgColor, setBgColor] = useState('#f4c400')
  const [inside,  setInside]  = useState(false)

  const cursorRef = useRef({ x: -999, y: -999 })
  const frameX    = useRef(null)
  const frameY    = useRef(null)
  const rafId     = useRef(null)

  /* ── RAF: update clip-path on the reveal wrapper ── */
  const tick = useCallback(() => {
    const { x, y } = cursorRef.current
    if (revealRef.current) {
      revealRef.current.style.clipPath =
        (x > 0 && y > 0)
          ? `circle(${R}px at ${x}px ${y}px)`
          : 'circle(0px at -999px -999px)'
    }
    rafId.current = requestAnimationFrame(tick)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    frameX.current = gsap.quickTo(frameRef.current, 'x', { duration: 0.35, ease: 'power3' })
    frameY.current = gsap.quickTo(frameRef.current, 'y', { duration: 0.35, ease: 'power3' })

    const onMove = (e) => {
      const rect = section.getBoundingClientRect()
      cursorRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
      frameX.current(cursorRef.current.x - R)
      frameY.current(cursorRef.current.y - R)
    }
    const onEnter = () => setInside(true)
    const onLeave = () => {
      setInside(false)
      cursorRef.current = { x: -999, y: -999 }
      if (revealRef.current) revealRef.current.style.clipPath = 'circle(0px at -999px -999px)'
    }

    section.addEventListener('mousemove',  onMove)
    section.addEventListener('mouseenter', onEnter)
    section.addEventListener('mouseleave', onLeave)
    rafId.current = requestAnimationFrame(tick)

    return () => {
      section.removeEventListener('mousemove',  onMove)
      section.removeEventListener('mouseenter', onEnter)
      section.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(rafId.current)
    }
  }, [tick])

  return (
    <div
      ref={sectionRef}
      id="portfolio"
      className="relative w-full h-screen overflow-hidden cursor-crosshair select-none"
      style={{ background: bgColor, transition: 'background 0.7s ease' }}
    >

      {/* ══════════════════════════════════════════
          LAYER 1 — White solid "SUBASH" text
          Sits behind everything. Visible where the
          model PNG is transparent (sides / top / bottom).
      ══════════════════════════════════════════ */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 1 }}
      >
        <span style={{ ...TEXT, color: 'white', textShadow: '0 2px 30px rgba(0,0,0,0.15)' }}>
          SUBASH
        </span>
      </div>

      {/* ══════════════════════════════════════════
          LAYER 2 — Blurred image
          Sits on top of white text. The model's body
          covers the center letters, text peeks at edges.
      ══════════════════════════════════════════ */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 2 }}
      >
        <img
          src="/hero-model.png"
          alt=""
          className="h-full object-contain max-h-full"
          style={{ filter: 'blur(8px) brightness(0.85)', transform: 'scale(1.05)' }}
        />
      </div>

      {/* ══════════════════════════════════════════
          LAYERS 3+4 — Reveal wrapper
          Clip-path circle follows cursor.
          Contains: sharp image (below) + outline text (above).
          Nothing from this wrapper is visible outside the circle.
      ══════════════════════════════════════════ */}
      <div
        ref={revealRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex:    3,
          clipPath:  'circle(0px at -999px -999px)',
          willChange:'clip-path',
        }}
      >
        {/* Sharp image — revealed inside circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/hero-model.png"
            alt="Subash H"
            className="h-full object-contain max-h-full"
            style={{ filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.35))' }}
          />
        </div>

        {/* Outline text — identical metrics, transparent + stroke — on top of sharp image */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ zIndex: 1 }}
        >
          <span style={{
            ...TEXT,
            color:            'transparent',
            WebkitTextStroke: '2px rgba(255,255,255,0.9)',
          }}>
            SUBASH
          </span>
        </div>

        {/* Role / tagline — inside reveal clip, hidden outside */}
        <div
          className="absolute bottom-16 left-0 right-0 flex flex-col items-center gap-1.5"
          style={{ zIndex: 2 }}
        >
          <div className="flex items-center gap-3">
            <span className="w-5 h-px bg-white/40 rounded-full" />
            {['Python Developer', 'Web Developer', 'MERN Stack'].map((r, i, arr) => (
              <span key={r} className="flex items-center gap-3">
                <span className="text-[11px] font-black uppercase tracking-[0.28em] text-white/80">{r}</span>
                {i < arr.length - 1 && <span className="text-white/30">·</span>}
              </span>
            ))}
            <span className="w-5 h-px bg-white/40 rounded-full" />
          </div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50">
            Crafting modern digital experiences · Open for freelance
          </p>
        </div>
      </div>

      {/* ══ Marching-ants frame ══ */}
      <div
        ref={frameRef}
        className="absolute top-0 left-0 pointer-events-none"
        style={{ width: BOX, height: BOX, zIndex: 6, opacity: inside ? 1 : 0, transition: 'opacity 0.3s ease' }}
      >
        <svg width={BOX} height={BOX} className="absolute inset-0" overflow="visible">
          <rect x="2" y="2" width={BOX-4} height={BOX-4} rx="14"
            fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeDasharray="9 5"
          >
            <animate attributeName="stroke-dashoffset" from="0" to="-28" dur="0.6s" repeatCount="indefinite" />
          </rect>
          {[[0,0],[BOX-8,0],[0,BOX-8],[BOX-8,BOX-8]].map(([cx,cy],i) => (
            <rect key={i} x={cx} y={cy} width="8" height="8" rx="1.5"
              fill="white" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
          ))}
        </svg>
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold uppercase tracking-widest text-white/50">
          ◆ REVEAL ◆
        </div>
      </div>

      {/* Left label — Freelancer availability */}
      <div className="absolute top-24 left-8 z-10 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" style={{ boxShadow: '0 0 6px #f4c400' }} />
        <span className="text-black/40 text-[10px] uppercase tracking-widest font-bold">
          Available for Freelance
        </span>
      </div>

      {/* Right hint */}
      <div className="absolute top-24 right-8 z-10 text-black/30 text-[10px] uppercase tracking-widest font-semibold">
        Move cursor to reveal
      </div>

      {/* Color switcher — centered bottom */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-3 z-10 pointer-events-auto">
        {COLORS.map(c => (
          <button
            key={c.name}
            onClick={() => setBgColor(c.value)}
            title={c.name}
            className="w-6 h-6 rounded-full border-2 transition-all duration-300 hover:scale-125 active:scale-95"
            style={{
              background:  c.value,
              borderColor: bgColor === c.value ? 'white' : 'rgba(255,255,255,0.35)',
              boxShadow:   bgColor === c.value ? `0 0 12px ${c.value}` : 'none',
            }}
          />
        ))}
      </div>
    </div>
  )
}
