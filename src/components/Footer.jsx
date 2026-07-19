import { FaWhatsapp, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa'

const navLinks = ['Home', 'About', 'Portfolio', 'Service', 'Contact']

const marqueePhrases = [
  'PYTHON DEVELOPER •', 'WEB DEVELOPER •', 'MERN LEARNER •', 'REACT DEVELOPER •',
  'IT STUDENT •', 'IoT BUILDER •', 'BACKEND ENGINEER •', 'AI ENTHUSIAST •',
]

const marqueeText = marqueePhrases.join('  ')

function scrollTo(id) {
  document.getElementById(
    id === 'Home' ? 'home'
    : id === 'About' ? 'about'
    : id === 'Portfolio' ? 'portfolio'
    : id === 'Service' ? 'service'
    : 'contact'
  )?.scrollIntoView({ behavior: 'smooth' })
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: '#f4c400' }}>
      {/* Layered Marquee Background */}
      <div className="absolute inset-0 flex flex-col justify-center gap-2 opacity-[0.07] pointer-events-none select-none overflow-hidden">
        {[0, 1, 2, 3].map((row) => (
          <div key={row} className="marquee-container overflow-hidden">
            <div className={row % 2 === 0 ? 'marquee-track-left' : 'marquee-track-right'}>
              {[...Array(4)].map((_, i) => (
                <span
                  key={i}
                  className="font-black uppercase tracking-tighter whitespace-nowrap text-black mx-4"
                  style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', letterSpacing: '-0.04em' }}
                >
                  {marqueeText}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24 flex flex-col items-center gap-12">

        {/* Profile image */}
        <div className="relative group">
          <div
            className="absolute inset-0 rounded-full opacity-40 group-hover:opacity-70 transition-opacity duration-500"
            style={{ background: 'radial-gradient(circle, #000000 0%, transparent 70%)', filter: 'blur(30px)', transform: 'translateY(20px)' }}
          />
          <img
            src="/avatar-cartoon.png"
            alt="Subash H – Developer Avatar"
            className="relative w-36 h-36 md:w-48 md:h-48 object-contain drop-shadow-2xl animate-float rounded-full"
            style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))' }}
          />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://github.com/SUBASH-0908"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-3.5 rounded-full font-black text-sm uppercase tracking-widest text-white transition-all duration-300 hover:scale-105"
            style={{ background: '#2563eb', boxShadow: '0 4px 20px rgba(37,99,235,0.4)' }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 40px rgba(37,99,235,0.7)' }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(37,99,235,0.4)' }}
          >
            <FaGithub /> Follow
          </a>
          <a
            href={`https://wa.me/917904434191?text=${encodeURIComponent('Hi Subash! I saw your portfolio.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-3.5 rounded-full font-black text-sm uppercase tracking-widest text-black bg-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <FaWhatsapp className="text-green-500" /> Message
          </a>
        </div>

        {/* Branding */}
        <div className="text-center">
          <div className="text-5xl md:text-6xl font-black tracking-tighter">
            <span className="text-black">Subash</span>
            <span className="text-white" style={{ textShadow: '0 0 30px rgba(255,255,255,0.3)' }}>.dev</span>
          </div>
          <p className="text-black/60 font-semibold text-sm uppercase tracking-widest mt-2">
            Python · Web · MERN · IoT · AI
          </p>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {navLinks.map(link => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="text-xs font-black uppercase tracking-widest text-black/60 hover:text-black transition-colors duration-300 relative group"
            >
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300 rounded-full" />
            </button>
          ))}
        </nav>

        {/* Divider */}
        <div className="w-full max-w-2xl h-px bg-black/10 rounded-full" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-2xl gap-4 text-center">
          <p className="text-xs font-bold text-black/50 uppercase tracking-wider">
            © {new Date().getFullYear()} Subash H. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {[
              { icon: FaWhatsapp,   href: 'https://wa.me/917904434191',                         color: '#25D366' },
              { icon: FaInstagram,  href: 'https://instagram.com',                              color: '#E1306C' },
              { icon: FaLinkedinIn, href: 'https://linkedin.com/in/subash-hochimin',            color: '#0A66C2' },
              { icon: FaGithub,     href: 'https://github.com/SUBASH-0908',                     color: '#000'    },
            ].map(({ icon: Icon, href, color }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center text-black/50 hover:text-black transition-all duration-300 hover:scale-110"
                style={{ background: 'rgba(0,0,0,0.08)' }}
                onMouseEnter={e => { e.currentTarget.style.background = color; e.currentTarget.querySelector('svg').style.color = 'white' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.08)'; e.currentTarget.querySelector('svg').style.color = '' }}
              >
                <Icon className="text-sm" />
              </a>
            ))}
          </div>
          <div className="flex gap-4">
            <a href="mailto:subashhochimin@gmail.com" className="text-xs font-bold text-black/40 uppercase tracking-wider hover:text-black transition-colors">Email</a>
            <a href="https://linkedin.com/in/subash-hochimin" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-black/40 uppercase tracking-wider hover:text-black transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
