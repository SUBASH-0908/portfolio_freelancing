import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaStar, FaCheckCircle } from 'react-icons/fa'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  { name: 'Sarah Johnson',  role: 'CEO, TechStartup',   username: '@sarahj', message: 'Absolutely stunning work! The animations blew my mind. Best portfolio site I have ever seen.',  rating: 5 },
  { name: 'Alex Chen',      role: 'Product Manager',    username: '@alexc',  message: 'Exceptional quality and attention to detail. Delivered beyond expectations on every metric.',    rating: 5 },
  { name: 'Maria Garcia',   role: 'Creative Director',  username: '@mariag', message: 'World-class design sensibility. The animations are butter-smooth and truly cinematic.',          rating: 5 },
  { name: 'James Wilson',   role: 'Startup Founder',    username: '@jamesw', message: 'Transformed our vision into reality. Incredible eye for modern web aesthetics.',                rating: 5 },
  { name: 'Emma Davis',     role: 'UX Lead',            username: '@emmad',  message: 'Premium quality work with outstanding communication. Highly recommended!',                      rating: 5 },
  { name: 'Raj Patel',      role: 'CTO, FinTech',       username: '@rajp',   message: 'Technical excellence combined with beautiful design. Our site engagement doubled!',            rating: 5 },
]

const row1 = [...testimonials, ...testimonials]
const row2 = [...testimonials, ...testimonials].reverse()

function TestimonialCard({ t }) {
  return (
    <div
      className="flex-shrink-0 w-72 md:w-80 h-44 rounded-2xl p-5 mx-3 bg-white border border-zinc-100 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
      style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
    >
      <div>
        <div className="flex items-center gap-1 mb-2">
          {Array(t.rating).fill(0).map((_, i) => (
            <FaStar key={i} className="text-yellow-400 text-xs" />
          ))}
        </div>
        <p className="text-zinc-600 text-sm leading-relaxed line-clamp-3 overflow-hidden">"{t.message}"</p>
      </div>
      <div className="flex items-center gap-3 mt-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
          {t.name[0]}
        </div>
        <div>
          <div className="flex items-center gap-1">
            <span className="text-sm font-bold text-zinc-800">{t.name}</span>
            <FaCheckCircle className="text-blue-500 text-xs" />
          </div>
          <div className="text-xs text-zinc-400">{t.role}</div>
        </div>
      </div>
    </div>
  )
}

export default function Welcome() {
  const sectionRef      = useRef(null)
  const welcomeTitleRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(welcomeTitleRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 0.12,
          y: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'center center',
            scrub: 1,
          },
        }
      )
      gsap.fromTo('.welcome-reveal',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.welcome-content',
            start: 'top 75%',
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="relative bg-white overflow-hidden">
      {/* ── Screen 1: Welcome Typography ── */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden noise">
        {/* Massive background text */}
        <div
          ref={welcomeTitleRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        >
          <span
            className="font-black uppercase text-black leading-none tracking-tighter"
            style={{ fontSize: '28vw', opacity: 0 }}
          >
            WELCOME
          </span>
        </div>

        {/* Main content */}
        <div className="welcome-content relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className="welcome-reveal inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-yellow-400/10 border border-yellow-400/20">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            <span className="text-xs uppercase tracking-widest font-bold text-yellow-600">About Me</span>
          </div>

          <h2 className="welcome-reveal text-5xl md:text-7xl font-black text-black uppercase tracking-tighter leading-tight mb-6">
            To my{' '}
            <span className="relative inline-block">
              <span className="relative z-10">creative</span>
              <span
                className="absolute -bottom-2 left-0 w-full h-3 bg-yellow-400 -z-10 rounded"
                style={{ transform: 'skewX(-5deg)' }}
              />
            </span>
            <br />space
          </h2>

          <p className="welcome-reveal text-zinc-500 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-4">
            I am a Final Year B.Tech Information Technology student at Muthayammal Engineering College
            (CGPA 7.85). I have a strong interest in Python programming, web development, and backend
            development — enjoying hands-on projects and real-world problem solving.
          </p>

          <p className="welcome-reveal text-zinc-400 text-base leading-relaxed max-w-xl mx-auto mb-10">
            My goal is to start my career as a Software Engineer where I can continuously learn,
            contribute, and grow while building innovative applications.
          </p>

          {/* Stats */}
          <div className="welcome-reveal grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[
              { val: '3+',   label: 'Projects' },
              { val: '2',    label: 'Internships' },
              { val: '7.85', label: 'CGPA' },
            ].map(s => (
              <div key={s.label} className="text-center p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
                <div className="text-3xl font-black text-black">{s.val}</div>
                <div className="text-xs text-zinc-500 uppercase tracking-widest mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Skills highlight */}
          <div className="welcome-reveal mt-8 flex flex-wrap justify-center gap-2">
            {['Python', 'JavaScript', 'React', 'Node.js', 'Express.js', 'MongoDB', 'HTML/CSS', 'SQL', 'GitHub', 'Arduino'].map(skill => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-zinc-100 text-zinc-600 border border-zinc-200 hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-all duration-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Screen 2: Testimonials Marquee ── */}
      <div className="relative py-20 bg-gradient-to-b from-white to-zinc-50 overflow-hidden">
        <div className="text-center mb-14 px-6">
          <span className="inline-block text-xs uppercase tracking-widest font-bold text-yellow-600 mb-3">Testimonials</span>
          <h3 className="text-4xl md:text-5xl font-black text-black uppercase tracking-tighter">
            Client <span className="text-yellow-500">Love</span>
          </h3>
          <p className="text-zinc-400 mt-3">What people are saying about my work</p>
        </div>

        {/* Row 1 – Left */}
        <div className="marquee-container mb-5 overflow-hidden">
          <div className="marquee-track-left">
            {row1.map((t, i) => <TestimonialCard key={i} t={t} />)}
            {row1.map((t, i) => <TestimonialCard key={`b${i}`} t={t} />)}
          </div>
        </div>

        {/* Row 2 – Right */}
        <div className="marquee-container overflow-hidden">
          <div className="marquee-track-right">
            {row2.map((t, i) => <TestimonialCard key={i} t={t} />)}
            {row2.map((t, i) => <TestimonialCard key={`b${i}`} t={t} />)}
          </div>
        </div>

        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-zinc-50 to-transparent pointer-events-none z-10" />
      </div>
    </section>
  )
}
