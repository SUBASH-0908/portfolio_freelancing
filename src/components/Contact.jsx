import { useRef, useState } from 'react'
import { FaWhatsapp, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa'

/* ─────────────────────────────────────────────────────────────────
   Google Apps Script URL — handles BOTH:
   ✅ Saving lead data to Google Sheet
   ✅ Sending a professional auto-reply email to the user
   (No EmailJS needed at all)
───────────────────────────────────────────────────────────────── */
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbz-Eq9srl5fioC3mu1WyqhDLdxcURbhWsVMydoiNqAgwCRQ3QSSYRci5wFNe9qO15yn/exec'

const socialLinks = [
  {
    icon: FaWhatsapp,
    label: 'WhatsApp',
    href: `https://wa.me/917904434191?text=${encodeURIComponent('Hi Subash! I found your portfolio and would love to discuss a project.')}`,
    color: '#25D366',
  },
  { icon: FaInstagram, label: 'Instagram', href: 'https://instagram.com',                  color: '#E1306C' },
  { icon: FaLinkedinIn, label: 'LinkedIn', href: 'https://linkedin.com/in/subash-hochimin', color: '#0A66C2' },
  { icon: FaGithub,    label: 'GitHub',   href: 'https://github.com/SUBASH-0908',           color: '#6e40c9' },
]

export default function Contact() {
  const formRef = useRef(null)
  const [form,   setForm]   = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')

    try {
      /* One fetch call to Google Apps Script:
         → Stores the lead in your Google Sheet
         → Sends a professional auto-reply email to the user */
      await fetch(GOOGLE_SHEET_URL, {
        method:  'POST',
        mode:    'no-cors',           // required for Apps Script
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          name:      form.name,
          email:     form.email,
          message:   form.message,
          timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        }),
      })

      // no-cors means we can't read the response, but the script runs fine
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 6000)

    } catch (err) {
      console.error('Contact form error:', err)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const fieldCls   = 'w-full px-4 py-3.5 rounded-xl text-white text-sm placeholder-white/30 outline-none transition-all duration-300'
  const fieldStyle = { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }
  const onFocus    = (e) => (e.target.style.borderColor = 'rgba(250,204,21,0.5)')
  const onBlur     = (e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')

  return (
    <section
      id="contact"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-24"
      style={{ background: '#0a0a0a', borderRadius: '40px 40px 0 0' }}
    >
      {/* Background CONNECT text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-black uppercase tracking-tighter text-white leading-none"
          style={{ fontSize: '25vw', opacity: 0.025, letterSpacing: '-0.05em' }}>
          CONNECT
        </span>
      </div>

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(250,204,21,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-12 flex flex-col items-center gap-12">

        {/* Heading */}
        <div className="text-center">
          <span className="text-xs uppercase tracking-widest font-bold text-yellow-500 mb-4 block">Get In Touch</span>
          <h2 className="font-black uppercase tracking-tighter text-white leading-tight"
            style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)' }}>
            Let's <span className="text-yellow-400">Talk</span>
          </h2>
          <p className="text-zinc-500 mt-4 text-lg max-w-md mx-auto">
            Have a project in mind? Let's build something extraordinary together.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-4 text-sm text-zinc-400">
            <a href="mailto:subashhochimin@gmail.com" className="hover:text-yellow-400 transition-colors">
              📧 subashhochimin@gmail.com
            </a>
            <a href="tel:+917904434191" className="hover:text-yellow-400 transition-colors">
              📞 +91 7904434191
            </a>
            <span className="text-zinc-500">📍 Salem, Tamil Nadu, India</span>
          </div>
        </div>

        {/* Social icons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {socialLinks.map(({ icon: Icon, label, href, color }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
              className="group w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-500"
              style={{ border: '2px solid rgba(255,255,255,0.2)' }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = color; el.style.background = color; el.style.boxShadow = `0 0 40px ${color}60`; el.style.transform = 'scale(1.05)' }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(255,255,255,0.2)'; el.style.background = 'transparent'; el.style.boxShadow = 'none'; el.style.transform = 'scale(1)' }}
            >
              <Icon className="text-white text-xl" />
            </a>
          ))}
        </div>

        {/* ── Contact Form ── */}
        <form ref={formRef} onSubmit={handleSubmit}
          className="w-full max-w-2xl rounded-3xl p-8 md:p-10 space-y-5"
          style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input type="text" placeholder="Your Name *" value={form.name} required
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              className={fieldCls} style={fieldStyle} onFocus={onFocus} onBlur={onBlur}
            />
            <input type="email" placeholder="Your Email *" value={form.email} required
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              className={fieldCls} style={fieldStyle} onFocus={onFocus} onBlur={onBlur}
            />
          </div>

          <textarea placeholder="Your Message *" rows={5} value={form.message} required
            onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
            className={`${fieldCls} resize-none`} style={fieldStyle} onFocus={onFocus} onBlur={onBlur}
          />

          {/* Success message */}
          {status === 'success' && (
            <div className="rounded-xl px-5 py-4 text-sm font-semibold text-center"
              style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', color: '#4ade80' }}>
              ✅ Submitted successfully! Our team will contact you soon.
              <br />
              <span className="text-xs opacity-70 mt-1 block">A confirmation email has been sent to your inbox.</span>
            </div>
          )}

          {/* Error message */}
          {status === 'error' && (
            <div className="rounded-xl px-5 py-4 text-sm font-semibold text-center"
              style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171' }}>
              ⚠️ Something went wrong. Please try WhatsApp or email directly.
            </div>
          )}

          <button type="submit" disabled={status === 'sending'}
            className="w-full py-4 rounded-xl font-black text-black text-sm uppercase tracking-widest transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
            style={{ background: status === 'success' ? '#22c55e' : '#f4c400' }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 30px rgba(244,196,0,0.4)' }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none' }}
          >
            {status === 'sending' ? '⏳ Sending...' : status === 'success' ? '✓ Message Sent!' : 'Send Message →'}
          </button>

          <p className="text-center text-zinc-600 text-xs">
            Your data is safe · Reply within 24 hours
          </p>
        </form>
      </div>
    </section>
  )
}
