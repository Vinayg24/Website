import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

interface ProcessStep {
  number: string
  title: string
  subtitle: string
  description: string
  icon: JSX.Element
  features: string[]
}

const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Consultation',
    subtitle: 'Discovery & Vision',
    description: 'We begin with an in-depth consultation to understand your unique story, expectations, event scale, and aesthetic vision.',
    features: ['Personalized Vision Consultation', 'Budget & Scope Alignment', 'Custom Package Framing'],
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    )
  },
  {
    number: '02',
    title: 'Planning',
    subtitle: 'Concept & Logistics',
    description: 'Our creative directors curate location scouting, shot lists, lighting plans, moodboards, and timing schedules for flawless execution.',
    features: ['Location Scouting & Permits', 'Shot List & Creative Moodboard', 'Timeline & Logistics Management'],
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    )
  },
  {
    number: '03',
    title: 'Shoot Day',
    subtitle: 'Master Production',
    description: 'Equipped with 4K cinema rigs, prime lenses, and FPV drones, our master photojournalists document every candid emotion and regal detail.',
    features: ['Lead Master Crew & FPV Pilots', '4K Anamorphic & Cinema Optics', 'Real-Time Direction & Lighting'],
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    number: '04',
    title: 'Editing & Post Production',
    subtitle: 'Couture Craftsmanship',
    description: 'We apply bespoke color grading, sound engineering, dialogue sync, skin retouching, and cinematic scoring to create movie masterpieces.',
    features: ['Custom Color Grading', 'Dialogue & Orchestral Audio Sync', 'Magazine-Grade Fine Retouching'],
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    )
  },
  {
    number: '05',
    title: 'Delivery',
    subtitle: 'Heirloom Handover',
    description: 'Deliver high-resolution photos and cinematic films digitally with complete client satisfaction, premium cloud streaming, and custom leather albums.',
    features: ['4K Digital Cloud Vault', '48-Hour Preview Teaser Reels', 'Handcrafted Italian Leather Album'],
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    )
  }
]

export const ProcessSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      ref={sectionRef}
      id="process"
      style={{
        position: 'relative',
        width: '100%',
        padding: '120px 24px',
        backgroundColor: '#080808',
        color: '#FFFFFF',
        overflow: 'hidden'
      }}
    >
      {/* Background Radial Glows & Grid */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '800px',
            height: '800px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(212, 175, 53, 0.08) 0%, transparent 70%)',
            filter: 'blur(90px)'
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(212, 175, 53, 0.06) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            opacity: 0.4
          }}
        />
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 80px auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 18px',
              borderRadius: '999px',
              background: 'linear-gradient(135deg, rgba(212, 175, 53, 0.18), rgba(245, 230, 179, 0.06))',
              border: '1px solid rgba(212, 175, 53, 0.35)',
              marginBottom: '18px'
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#D4AF37', boxShadow: '0 0 10px #D4AF37' }} />
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.22em', color: '#F5E6B3', fontWeight: 600 }}>
              The Creative Journey
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(2.4rem, 5.5vw, 3.8rem)',
              fontWeight: 800,
              lineHeight: 1.12,
              marginBottom: '16px',
              background: 'linear-gradient(90deg, #FFFFFF 20%, #D4AF37 60%, #F5E6B3 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em'
            }}
          >
            Our Seamless 5-Step Process
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ fontSize: '1.05rem', color: '#A0A0A0', fontWeight: 300, lineHeight: 1.7 }}
          >
            From initial concept to final heirloom delivery, experience our luxury agency workflow engineered for complete creative excellence.
          </motion.p>
        </div>

        {/* 5 Steps Connecting Animated Timeline Layout */}
        <div style={{ position: 'relative' }}>
          {/* Central Connecting Animated Gold Line (Desktop) */}
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: '88%' } : { height: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              left: '50%',
              top: '40px',
              transform: 'translateX(-50%)',
              width: '2px',
              background: 'linear-gradient(180deg, rgba(212, 175, 53, 0.8) 0%, rgba(212, 175, 53, 0.3) 50%, rgba(245, 230, 179, 0.8) 100%)',
              boxShadow: '0 0 15px rgba(212, 175, 53, 0.5)',
              zIndex: 1,
              display: 'var(--desktop-line-display, block)'
            }}
          />

          {/* Steps Loop */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '60px', position: 'relative', zIndex: 2 }}>
            {processSteps.map((step, index) => {
              const isEven = index % 2 === 1

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40, x: isEven ? 30 : -30 }}
                  animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '40px',
                    alignItems: 'center',
                  }}
                >
                  {/* Step Card Container */}
                  <motion.div
                    whileHover={{ y: -6, borderColor: 'rgba(212, 175, 53, 0.65)' }}
                    transition={{ duration: 0.3 }}
                    style={{
                      position: 'relative',
                      padding: '36px 32px',
                      borderRadius: '24px',
                      background: 'linear-gradient(135deg, rgba(24, 20, 14, 0.85) 0%, rgba(12, 12, 12, 0.96) 100%)',
                      border: '1px solid rgba(212, 175, 53, 0.25)',
                      backdropFilter: 'blur(25px)',
                      boxShadow: '0 20px 45px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
                      gridColumn: isEven ? '2 / span 1' : '1 / span 1',
                    }}
                  >
                    {/* Top Step Number Badge & Subtitle */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '16px',
                          background: 'linear-gradient(135deg, rgba(212, 175, 53, 0.25), rgba(245, 230, 179, 0.08))',
                          border: '1px solid rgba(212, 175, 53, 0.4)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#D4AF37',
                          boxShadow: '0 0 20px rgba(212, 175, 53, 0.2)'
                        }}
                      >
                        <div style={{ width: '24px', height: '24px' }}>
                          {step.icon}
                        </div>
                      </div>

                      <span
                        style={{
                          fontFamily: '"Playfair Display", serif',
                          fontSize: '2rem',
                          fontWeight: 800,
                          background: 'linear-gradient(135deg, #D4AF37, #F5E6B3)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          opacity: 0.9
                        }}
                      >
                        {step.number}
                      </span>
                    </div>

                    <span style={{ fontSize: '11px', color: '#D4AF37', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.5px', display: 'block', marginBottom: '6px' }}>
                      Step {step.number} • {step.subtitle}
                    </span>

                    <h3
                      style={{
                        fontFamily: '"Playfair Display", serif',
                        fontSize: '1.75rem',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        marginBottom: '12px'
                      }}
                    >
                      {step.title}
                    </h3>

                    <p style={{ fontSize: '0.95rem', color: '#C0C0C0', lineHeight: 1.65, fontWeight: 300, marginBottom: '20px' }}>
                      {step.description}
                    </p>

                    {/* Feature Highlights */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '16px', borderTop: '1px solid rgba(212, 175, 53, 0.15)' }}>
                      {step.features.map((feat, fIdx) => (
                        <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#E0E0E0' }}>
                          <span style={{ color: '#D4AF37', fontSize: '10px' }}>✦</span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProcessSection
