import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FilmCard } from './FilmCard'
import { VideoPlayerModal } from './VideoPlayerModal'
import { featuredFilmsData, FilmItem } from '../../data/filmsData'

export const FeaturedFilmsSection = () => {
  const [selectedFilm, setSelectedFilm] = useState<FilmItem | null>(null)

  return (
    <section
      id="featured-films"
      style={{
        position: 'relative',
        width: '100%',
        padding: '120px 24px',
        backgroundColor: '#080808',
        color: '#FFFFFF',
        overflow: 'hidden'
      }}
    >
      {/* Ambient Radial Golden Background Glows */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div
          style={{
            position: 'absolute',
            top: '15%',
            right: '-5%',
            width: '650px',
            height: '650px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(212, 175, 53, 0.12) 0%, transparent 70%)',
            filter: 'blur(90px)'
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '10%',
            left: '-5%',
            width: '650px',
            height: '650px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(212, 175, 53, 0.08) 0%, transparent 70%)',
            filter: 'blur(90px)'
          }}
        />
      </div>

      <div style={{ maxWidth: '1320px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 60px auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 18px',
              borderRadius: '999px',
              background: 'linear-gradient(135deg, rgba(212, 175, 53, 0.18), rgba(245, 230, 179, 0.06))',
              border: '1px solid rgba(212, 175, 53, 0.35)',
              marginBottom: '16px'
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#D4AF37', boxShadow: '0 0 10px #D4AF37' }} />
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.22em', color: '#F5E6B3', fontWeight: 600 }}>
              Cinematic Showcase
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
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
            Featured Films & Cinema
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            style={{ fontSize: '1.05rem', color: '#A0A0A0', fontWeight: 300, lineHeight: 1.7 }}
          >
            A curated trilogy of our finest feature films, royal wedding stories, and high-fashion brand campaigns produced in 8K anamorphic quality.
          </motion.p>
        </div>

        {/* 3 Cards Grid Layout (1 row on Desktop, 2 on Tablet, 1 on Mobile) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '36px',
            marginBottom: '60px'
          }}
        >
          {featuredFilmsData.map((film, index) => (
            <FilmCard
              key={film.id}
              film={film}
              index={index}
              onPlay={setSelectedFilm}
            />
          ))}
        </div>

        {/* Centered Luxury Bottom CTA Button */}
        <div style={{ textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05, boxShadow: '0 12px 35px rgba(212, 175, 53, 0.45)' }}
            whileTap={{ scale: 0.96 }}
            style={{ display: 'inline-block' }}
          >
            <Link
              to="/portfolio"
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
                transition: 'all 0.3s ease'
              }}
            >
              <span>Explore Complete Film Collection</span>
              <span style={{ fontSize: '1.1rem' }}>→</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Fullscreen Video Player Modal */}
      <AnimatePresence>
        {selectedFilm && (
          <VideoPlayerModal
            film={selectedFilm}
            onClose={() => setSelectedFilm(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

export default FeaturedFilmsSection
