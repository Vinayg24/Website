import { useState } from 'react'
import { motion } from 'framer-motion'

export interface FilmItem {
  id: string
  title: string
  category: 'Wedding Film' | 'Pre Wedding' | 'Destination Wedding' | 'Commercial' | 'Brand Film' | 'Product Film' | 'Fashion Film' | 'Drone Film' | string
  coupleOrClient: string
  location: string
  duration: string
  year: string
  shortStory: string
  thumbnailUrl: string
  videoUrl: string
  qualityBadge: '4K Cinema' | '8K Anamorphic' | '4K HDR' | '8K FPV' | '4K Cinema Optics'
  isDrone?: boolean
}

interface FilmCardProps {
  film: FilmItem
  index: number
  onPlay: (film: FilmItem) => void
}

export const FilmCard = ({ film, index, onPlay }: FilmCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const hasVideo = Boolean(film.videoUrl && film.videoUrl.trim().length > 0)

  // Single elegant quality label
  const formattedQuality = film.isDrone
    ? 'FPV DRONE'
    : film.qualityBadge
    ? film.qualityBadge.toUpperCase()
    : '4K CINEMA'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onPlay(film)}
      style={{
        position: 'relative',
        borderRadius: '24px',
        overflow: 'hidden',
        cursor: 'pointer',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '440px',
        background: 'linear-gradient(135deg, rgba(20, 18, 14, 0.92) 0%, rgba(10, 10, 10, 0.98) 100%)',
        border: isHovered
          ? '1px solid rgba(212, 175, 53, 0.65)'
          : '1px solid rgba(212, 175, 53, 0.2)',
        boxShadow: isHovered
          ? '0 25px 50px rgba(212, 175, 53, 0.25), 0 10px 30px rgba(0, 0, 0, 0.85)'
          : '0 15px 35px rgba(0, 0, 0, 0.7)',
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s ease',
      }}
    >
      {/* Hero Cinematic Thumbnail Image */}
      <motion.img
        src={film.thumbnailUrl}
        alt={film.title}
        loading="lazy"
        decoding="async"
        animate={{ scale: isHovered ? 1.07 : 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: isHovered ? 'brightness(0.72) contrast(1.1)' : 'brightness(0.85) contrast(1.05)',
        }}
      />

      {/* Dark Cinematic Gradient Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: isHovered
            ? 'linear-gradient(180deg, rgba(8,8,8,0.45) 0%, rgba(8,8,8,0.65) 45%, rgba(8,8,8,0.96) 100%)'
            : 'linear-gradient(180deg, rgba(8,8,8,0.3) 0%, rgba(8,8,8,0.45) 45%, rgba(8,8,8,0.92) 100%)',
          transition: 'background 0.4s ease',
          zIndex: 1,
        }}
      />

      {/* TOP BAR: ONLY Category Badge (Left) & Duration Badge (Right) */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          padding: '28px 30px 0 30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Category Badge (Top Left) */}
        <span
          style={{
            fontSize: '10px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1.2px',
            padding: '6px 14px',
            borderRadius: '999px',
            background: 'rgba(212, 175, 53, 0.22)',
            color: '#F5E6B3',
            border: '1px solid rgba(212, 175, 53, 0.4)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.3)',
          }}
        >
          {film.category}
        </span>

        {/* Duration Badge (Top Right) */}
        <span
          style={{
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.5px',
            padding: '6px 12px',
            borderRadius: '999px',
            background: 'rgba(8, 8, 8, 0.75)',
            color: '#E0E0E0',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
          }}
        >
          ⏱ {film.duration}
        </span>
      </div>

      {/* SMALL COMING SOON BADGE (Top-Left corner below category if video not available) */}
      {!hasVideo && (
        <div
          style={{
            position: 'absolute',
            top: '70px',
            left: '30px',
            zIndex: 3,
            padding: '4px 12px',
            borderRadius: '20px',
            background: 'rgba(8, 8, 8, 0.85)',
            border: '1px solid rgba(212, 175, 53, 0.4)',
            color: '#F5E6B3',
            fontSize: '9px',
            fontWeight: 700,
            letterSpacing: '1.2px',
            textTransform: 'uppercase',
            backdropFilter: 'blur(12px)',
          }}
        >
          Coming Soon
        </div>
      )}

      {/* CENTER HOVER PLAY BUTTON (Only if trailer exists) */}
      {hasVideo && (
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.85,
            y: isHovered ? 0 : 10
          }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            top: '38%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            pointerEvents: 'none'
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #D4AF37, #F5E6B3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 35px rgba(212, 175, 53, 0.8), 0 0 15px rgba(255, 255, 255, 0.4)',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#080808" style={{ marginLeft: '3px' }}>
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              background: 'rgba(8, 8, 8, 0.8)',
              padding: '5px 16px',
              borderRadius: '20px',
              border: '1px solid rgba(212, 175, 53, 0.4)',
              backdropFilter: 'blur(10px)'
            }}
          >
            Watch Trailer
          </span>
        </motion.div>
      )}

      {/* CARD FOOTER & TYPOGRAPHY HIERARCHY */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          padding: '0 30px 30px 30px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}
      >
        {/* 1. Film Title (Large Typography, Max 2 lines truncated) */}
        <h3
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(1.4rem, 2.4vw, 1.7rem)',
            fontWeight: 700,
            color: '#FFFFFF',
            margin: 0,
            lineHeight: 1.22,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            letterSpacing: '-0.01em',
          }}
        >
          {film.title}
        </h3>

        {/* 2. Description (Medium Typography, Max 2 lines) */}
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.85rem',
            color: '#A0A0A0',
            margin: 0,
            fontWeight: 300,
            lineHeight: 1.55,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {film.shortStory}
        </p>

        {/* 3. Location + Year Row */}
        <div style={{ fontSize: '0.8rem', color: '#888888', fontWeight: 500, letterSpacing: '0.5px' }}>
          📍 {film.location} • {film.year}
        </div>

        {/* 4. Single Quality Badge */}
        <div>
          <span
            style={{
              fontSize: '9px',
              fontWeight: 700,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              padding: '4px 12px',
              borderRadius: '999px',
              background: 'rgba(212, 175, 53, 0.15)',
              color: '#D4AF37',
              border: '1px solid rgba(212, 175, 53, 0.35)',
              display: 'inline-block',
            }}
          >
            {formattedQuality}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default FilmCard
