import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { aboutStudioData } from '../../data/aboutData'

export const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const stats = [
    { value: `${aboutStudioData.weddingsCovered}+`, label: 'Wedding Stories', desc: 'Royal & Destination Weddings' },
    { value: `${aboutStudioData.awardsWon}+`, label: 'Awards & Honors', desc: 'International & National Titles' },
    { value: `${aboutStudioData.experienceYears}+`, label: 'Years Experience', desc: 'Master Photography & Cinema' },
    { value: '100%', label: 'Client Satisfaction', desc: '5-Star Google Verified Reviews' }
  ]

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#080808',
        color: '#FFFFFF',
        overflow: 'hidden',
        padding: '120px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Ambient Radial Golden Glows & Bokeh Background */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '10%', left: '-5%', width: '550px', height: '550px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212, 175, 53, 0.15) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', bottom: '5%', right: '-5%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212, 175, 53, 0.1) 0%, transparent 70%)', filter: 'blur(70px)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(212, 175, 53, 0.08) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.3 }} />
      </div>

      <div
        style={{
          maxWidth: '1380px',
          width: '100%',
          margin: '0 auto',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Split Showcase Grid: Image Hero vs Content */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '60px',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Overlapping Multi-Image Showcase */}
          <motion.div
            initial={{ opacity: 0, x: -60, scale: 0.96 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: 'relative',
              width: '100%',
            }}
          >
            {/* Primary Hero Image Frame */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16 / 10',
                borderRadius: '28px',
                overflow: 'hidden',
                border: '1px solid rgba(212, 175, 53, 0.35)',
                boxShadow: '0 30px 70px rgba(0, 0, 0, 0.85), 0 0 30px rgba(212, 175, 53, 0.15)',
                background: 'linear-gradient(135deg, rgba(28, 24, 16, 0.9), rgba(12, 12, 12, 0.95))',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1600&q=85"
                alt="Shree Radha Krishna Studio Master Setup"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(0.9) contrast(1.1) saturate(1.1)',
                  transition: 'transform 0.8s ease',
                }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(8, 8, 8, 0.8) 100%)' }} />

              {/* Floating Studio Badge on Image */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  right: '20px',
                  padding: '16px 20px',
                  borderRadius: '16px',
                  background: 'rgba(8, 8, 8, 0.85)',
                  backdropFilter: 'blur(15px)',
                  WebkitBackdropFilter: 'blur(15px)',
                  border: '1px solid rgba(212, 175, 53, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <div style={{ fontSize: '1.5rem' }}>🏆</div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#F5E6B3', fontWeight: 700 }}>
                    {aboutStudioData.founderName} — {aboutStudioData.founderTitle}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#A0A0A0' }}>
                    Jaipur • Udaipur • International Destination Cinema
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Founder Quote Card */}
            <div
              style={{
                marginTop: '20px',
                padding: '20px 24px',
                borderRadius: '18px',
                background: 'linear-gradient(135deg, rgba(28, 24, 16, 0.6), rgba(12, 12, 12, 0.9))',
                border: '1px solid rgba(212, 175, 53, 0.25)',
                fontStyle: 'italic',
                fontSize: '0.88rem',
                color: '#E0E0E0',
                lineHeight: 1.6
              }}
            >
              "{aboutStudioData.founderQuote}"
            </div>
          </motion.div>

          {/* Right Column: Studio Narrative & Statistics */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            {/* Category Pill Tag */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', alignSelf: 'flex-start' }}>
              <span
                style={{
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  color: '#F5E6B3',
                  fontWeight: 700,
                  padding: '6px 18px',
                  borderRadius: '999px',
                  background: 'linear-gradient(135deg, rgba(212, 175, 53, 0.2), rgba(245, 230, 179, 0.08))',
                  border: '1px solid rgba(212, 175, 53, 0.35)',
                }}
              >
                15+ Years Studio Legacy
              </span>
            </div>

            {/* Main Heading */}
            <h2
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                margin: 0,
                background: 'linear-gradient(90deg, #FFFFFF 20%, #D4AF37 60%, #F5E6B3 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Crafting Timeless Cinematic Stories & Royal Memories
            </h2>

            {/* Studio Narrative Description */}
            {aboutStudioData.storyParagraphs.map((para, idx) => (
              <p key={idx} style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', color: '#D0D0D0', lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
                {para}
              </p>
            ))}

            {/* 4 Statistics Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '16px',
                marginTop: '12px',
              }}
            >
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 25 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
                  whileHover={{ scale: 1.04, borderColor: 'rgba(212, 175, 53, 0.6)' }}
                  style={{
                    padding: '20px 18px',
                    borderRadius: '18px',
                    background: 'linear-gradient(135deg, rgba(28, 24, 16, 0.75) 0%, rgba(14, 14, 14, 0.95) 100%)',
                    border: '1px solid rgba(212, 175, 53, 0.22)',
                    backdropFilter: 'blur(15px)',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div
                    style={{
                      fontFamily: '"Playfair Display", serif',
                      fontSize: '2.1rem',
                      fontWeight: 800,
                      background: 'linear-gradient(90deg, #D4AF37, #F5E6B3)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      lineHeight: 1,
                      marginBottom: '6px',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#FFFFFF', fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>
                    {stat.label}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#888888', marginTop: '3px', fontWeight: 400 }}>
                    {stat.desc}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection