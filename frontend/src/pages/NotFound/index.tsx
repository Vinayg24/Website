import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PageWrapper } from '../../components/Layout/PageWrapper'
import { Footer } from '../../components/Footer/Footer'

export const NotFoundPage = () => {
  return (
    <PageWrapper
      title="404 - Page Not Found — Shree Radha Krishna Studio"
      description="The requested page could not be found. Return to Shree Radha Krishna Studio home."
    >
      <div
        style={{
          minHeight: '75vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '120px 24px 60px 24px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            fontSize: 'clamp(5rem, 15vw, 9rem)',
            fontFamily: '"Playfair Display", serif',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #D4AF37 0%, #F5E6B3 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1,
            marginBottom: '10px',
          }}
        >
          404
        </motion.div>

        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', color: '#FFF', marginBottom: '12px' }}>
          Page Not Found
        </h2>

        <p style={{ fontSize: '1rem', color: '#A0A0A0', maxWidth: '480px', marginBottom: '32px', fontWeight: 300, lineHeight: 1.6 }}>
          The page you are looking for does not exist or has been moved. Return home to explore our luxury photography collection.
        </p>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
          <Link
            to="/"
            style={{
              padding: '14px 32px',
              borderRadius: '30px',
              background: 'linear-gradient(135deg, #D4AF37, #F5E6B3)',
              color: '#080808',
              fontSize: '0.95rem',
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 6px 20px rgba(212, 175, 53, 0.4)',
              display: 'inline-block',
            }}
          >
            ← Return To Home
          </Link>
        </motion.div>
      </div>
      <Footer />
    </PageWrapper>
  )
}

export default NotFoundPage
