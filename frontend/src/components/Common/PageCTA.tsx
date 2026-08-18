import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

interface PageCTAProps {
  heading: string
  subheading: string
  buttonText: string
  buttonLink: string
  isExternal?: boolean
}

export const PageCTA = ({
  heading,
  subheading,
  buttonText,
  buttonLink,
  isExternal = false,
}: PageCTAProps) => {
  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        padding: '80px 24px',
        backgroundColor: '#060606',
        borderTop: '1px solid rgba(212, 175, 53, 0.15)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: '16px',
            background: 'linear-gradient(90deg, #FFFFFF 20%, #D4AF37 60%, #F5E6B3 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            fontSize: '1.05rem',
            color: '#A0A0A0',
            fontWeight: 300,
            lineHeight: 1.7,
            marginBottom: '32px',
          }}
        >
          {subheading}
        </motion.p>

        {isExternal ? (
          <motion.a
            href={buttonLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: '0 12px 35px rgba(212, 175, 53, 0.45)' }}
            whileTap={{ scale: 0.96 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '16px 36px',
              borderRadius: '40px',
              background: 'linear-gradient(135deg, #D4AF37, #F5E6B3)',
              color: '#080808',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.95rem',
              fontWeight: 700,
              textDecoration: 'none',
              letterSpacing: '0.5px',
              boxShadow: '0 8px 25px rgba(212, 175, 53, 0.35)',
              transition: 'all 0.3s ease',
            }}
          >
            <span>{buttonText}</span>
            <span style={{ fontSize: '1.1rem' }}>→</span>
          </motion.a>
        ) : (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} style={{ display: 'inline-block' }}>
            <Link
              to={buttonLink}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '16px 36px',
                minHeight: '44px',
                borderRadius: '40px',
                background: 'linear-gradient(135deg, #D4AF37, #F5E6B3)',
                color: '#080808',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.95rem',
                fontWeight: 700,
                textDecoration: 'none',
                letterSpacing: '0.5px',
                boxShadow: '0 8px 25px rgba(212, 175, 53, 0.35)',
                transition: 'all 0.3s ease',
              }}
            >
              <span>{buttonText}</span>
              <span style={{ fontSize: '1.1rem' }}>→</span>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default PageCTA
