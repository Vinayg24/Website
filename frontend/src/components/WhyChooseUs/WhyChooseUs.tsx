import { motion } from 'framer-motion'

interface Feature {
  id: string
  title: string
  subtitle: string
  description: string
  icon: string
}

const features: Feature[] = [
  {
    id: 'exp',
    title: '15+ Years Experience',
    subtitle: 'Master Visual Artists',
    description: 'Over a decade of documenting royal palace weddings, celebrity galas, and global brand campaigns with precision.',
    icon: '🏆'
  },
  {
    id: 'team',
    title: 'Professional Team',
    subtitle: 'Master Directors & Photographers',
    description: 'A dedicated team of lead photojournalists, fashion directors, certified FPV pilots, and sound engineers.',
    icon: '📸'
  },
  {
    id: 'gear',
    title: '4K Cinematic Equipment',
    subtitle: 'Hasselblad & Sony FX Rigs',
    description: 'Equipped with 100MP medium format cameras, 8K drone cinema, anamorphic lenses, and studio lighting.',
    icon: '🎥'
  },
  {
    id: 'delivery',
    title: 'Fast Delivery',
    subtitle: '48-Hour Preview Galleries',
    description: 'Instant preview teasers delivered within 48 hours for social media sharing, followed by custom leather album prints.',
    icon: '⚡'
  },
  {
    id: 'story',
    title: 'Creative Storytelling',
    subtitle: 'Story-Driven Cinema Edits',
    description: 'Custom musical scores, emotional audio capture, and narrative editing that turn celebrations into movies.',
    icon: '✨'
  },
  {
    id: 'travel',
    title: 'Worldwide Travel',
    subtitle: 'Destination Wedding Ready',
    description: 'Seamless travel protocols and visa readiness for destination weddings across Europe, Middle East, and Asia.',
    icon: '✈️'
  }
]

export const WhyChooseUs = () => {
  return (
    <section
      id="why-choose-us"
      style={{
        position: 'relative',
        width: '100%',
        padding: 'clamp(60px, 8vw, 120px) 24px',
        backgroundColor: '#0a0a0a',
        color: '#FFFFFF',
        overflow: 'hidden'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 60px auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '999px',
              background: 'linear-gradient(135deg, rgba(212, 175, 53, 0.18), rgba(245, 230, 179, 0.06))',
              border: '1px solid rgba(212, 175, 53, 0.35)',
              marginBottom: '16px'
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#D4AF37', boxShadow: '0 0 10px #D4AF37' }} />
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#F5E6B3', fontWeight: 600 }}>
              The Studio Advantage
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: '14px',
              background: 'linear-gradient(90deg, #FFFFFF 20%, #D4AF37 60%, #F5E6B3 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Why Choose Shree Radha Krishna Studio
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            style={{ fontSize: '1rem', color: '#A0A0A0', fontWeight: 300, lineHeight: 1.6 }}
          >
            We combine high-end cinema optics with passion, delivering unforgettable visual art for discerning clients globally.
          </motion.p>
        </div>

        {/* 6 Grid Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {features.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -6, borderColor: 'rgba(212, 175, 53, 0.6)' }}
              style={{
                padding: '32px 24px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, rgba(24, 24, 24, 0.7) 0%, rgba(12, 12, 12, 0.9) 100%)',
                border: '1px solid rgba(212, 175, 53, 0.2)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '16px' }}>{item.icon}</div>
              <span style={{ fontSize: '11px', color: '#D4AF37', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
                {item.subtitle}
              </span>
              <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.3rem', fontWeight: 700, color: '#FFFFFF', margin: '8px 0 10px 0' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#A0A0A0', lineHeight: 1.6, margin: 0, fontWeight: 300 }}>
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
