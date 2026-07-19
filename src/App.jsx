import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './index.css'

import Navbar from './components/Navbar'
import Portfolio from './components/Portfolio'
import Hero from './components/Hero'
import Welcome from './components/Welcome'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

function App() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: true,
      touchMultiplier: 2,
    })

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    // Init AOS
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
    })

    return () => {
      lenis.destroy()
      gsap.ticker.remove(() => {})
    }
  }, [])

  return (
    <div className="relative bg-zinc-950 overflow-x-hidden">
      <Navbar />

      {/* Portfolio section - fixed background */}
      <section id="portfolio-bg" className="relative">
        <Portfolio />
      </section>

      {/* Scrollable content over portfolio */}
      <div className="relative z-10">
        <section id="home">
          <Hero />
        </section>

        <section id="about">
          <Welcome />
        </section>

        <section id="projects">
          <Projects />
        </section>

        <section id="service">
          <Services />
        </section>

        <section id="skills">
          <Skills />
        </section>

        <section id="contact">
          <Contact />
        </section>

        <Footer />
      </div>
    </div>
  )
}

export default App
