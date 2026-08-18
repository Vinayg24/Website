import { motion, useReducedMotion } from 'framer-motion'
import Breadcrumbs from '../Common/Breadcrumbs'

interface PageHeroProps {
  badge: string
  title: string
  subtitle: string
  pageName: string
}

export const PageHero = ({ badge, title, subtitle, pageName }: PageHeroProps) => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        padding: 'clamp(110px, 12vw, 150px) 24px 60px 24px',
        backgroundColor: '#080808',
        color: '#FFFFFF',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(212, 175, 53, 0.15)',
      }}
    >
      {/* Ambient background glow */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '350px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(212, 175, 53, 0.1) 0%, transparent 70%)',
            filter: 'blur(90px)',
          }}
        />
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Breadcrumb Trail */}
        <Breadcrumbs currentPage={pageName} />

        {/* Category Pill */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.1 : 0.4 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 18px',
            borderRadius: '999px',
            background: 'linear-gradient(135deg, rgba(212, 175, 53, 0.18), rgba(245, 230, 179, 0.06))',
            border: '1px solid rgba(212, 175, 53, 0.35)',
            marginBottom: '16px',
          }}
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#D4AF37', boxShadow: '0 0 10px #D4AF37' }} />
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#F5E6B3', fontWeight: 600 }}>
            {badge}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.1 : 0.5, delay: shouldReduceMotion ? 0 : 0.1 }}
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(2.2rem, 5vw, 4rem)',
            fontWeight: 800,
            lineHeight: 1.12,
            marginBottom: '16px',
            background: 'linear-gradient(90deg, #FFFFFF 20%, #D4AF37 60%, #F5E6B3 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.1 : 0.5, delay: shouldReduceMotion ? 0 : 0.15 }}
          style={{
            maxWidth: '680px',
            fontSize: '1.05rem',
            color: '#A0A0A0',
            fontWeight: 300,
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          {subtitle}
        </motion.p>
      </div>
    </div>
  )
}

export default PageHero

