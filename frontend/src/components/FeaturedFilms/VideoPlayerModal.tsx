import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FilmItem } from './FilmCard'

interface VideoPlayerModalProps {
  film: FilmItem
  onClose: () => void
}

/**
 * Utility to convert any YouTube URL format (watch, short link, or embed)
 * into a valid YouTube embed URL with autoplay enabled.
 */
export const getYouTubeEmbedUrl = (url: string): string => {
  if (!url || url.trim() === '') return ''
  let embedUrl = url.trim()

  if (embedUrl.includes('youtube.com/embed/')) {
    embedUrl = embedUrl.split('?')[0]
    return `${embedUrl}?autoplay=1&rel=0&modestbranding=1`
  }

  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  const match = embedUrl.match(regExp)

  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}?autoplay=1&rel=0&modestbranding=1`
  }

  return embedUrl
}

export const VideoPlayerModal = ({ film, onClose }: VideoPlayerModalProps) => {
  const embedUrl = getYouTubeEmbedUrl(film.videoUrl)
  const hasVideo = Boolean(embedUrl && embedUrl.length > 0)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="video-modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: 'rgba(5, 5, 5, 0.94)',
        backdropFilter: 'blur(25px)',
        WebkitBackdropFilter: 'blur(25px)',
      }}
    >
      <motion.div
        initial={{ scale: 0.92, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 20, opacity: 0 }}
        transition={{ type: 'spring', damping: 26, stiffness: 320 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          maxWidth: '1060px',
          width: '100%',
          borderRadius: '28px',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(24, 20, 14, 0.95), rgba(10, 10, 10, 0.98))',
          border: '1px solid rgba(212, 175, 53, 0.35)',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.95), 0 0 35px rgba(212, 175, 53, 0.15)',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Top Header Bar with Close Button */}
        <div
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 20,
          }}
        >
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(212, 175, 53, 0.3)' }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              background: 'rgba(12, 12, 12, 0.75)',
              border: '1px solid rgba(212, 175, 53, 0.4)',
              color: '#F5E6B3',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
            }}
            aria-label="Close modal"
          >
            ✕
          </motion.button>
        </div>

        {/* Video Player Frame Container (16:9 Aspect Ratio) */}
        <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', backgroundColor: '#000000', flexShrink: 0 }}>
          {hasVideo ? (
            <iframe
              src={embedUrl}
              title={film.title}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '30px',
                backgroundImage: `url(${film.thumbnailUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(8, 8, 8, 0.88)', backdropFilter: 'blur(12px)' }} />

              <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '500px' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'rgba(212, 175, 53, 0.15)',
                    border: '1px solid rgba(212, 175, 53, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.8rem',
                    margin: '0 auto 16px auto',
                    boxShadow: '0 0 25px rgba(212, 175, 53, 0.2)'
                  }}
                >
                  🎥
                </div>

                <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: '#D4AF37', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                  Exclusive Premiere
                </span>

                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', color: '#FFF', fontWeight: 700, marginBottom: '8px' }}>
                  Trailer Coming Soon
                </h3>

                <p style={{ fontSize: '0.88rem', color: '#B0B0B0', lineHeight: 1.6, margin: 0, fontWeight: 300 }}>
                  This cinematic feature film trailer is currently undergoing final color grading and audio mastering. Contact our studio for private screening access.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Video Information & Control Bar */}
        <div
          style={{
            padding: '28px 32px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            background: 'linear-gradient(180deg, rgba(16, 16, 16, 0.9), rgba(8, 8, 8, 0.98))'
          }}
        >
          {/* Metadata Badges & Header */}
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <span style={{ fontSize: '11px', color: '#D4AF37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.2px', padding: '4px 12px', borderRadius: '20px', background: 'rgba(212, 175, 53, 0.15)', border: '1px solid rgba(212, 175, 53, 0.3)' }}>
                {film.category}
              </span>
              <span style={{ fontSize: '11px', color: '#F5E6B3', fontWeight: 600, padding: '4px 10px', borderRadius: '20px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)' }}>
                {film.qualityBadge}
              </span>
              {film.isDrone && (
                <span style={{ fontSize: '11px', color: '#FFFFFF', fontWeight: 600, padding: '4px 10px', borderRadius: '20px', background: 'rgba(212, 175, 53, 0.2)' }}>
                  🛸 FPV Aerial
                </span>
              )}
              <span style={{ fontSize: '11px', color: '#888' }}>•</span>
              <span style={{ fontSize: '11px', color: '#A0A0A0' }}>Duration: {film.duration}</span>
              <span style={{ fontSize: '11px', color: '#888' }}>•</span>
              <span style={{ fontSize: '11px', color: '#A0A0A0' }}>Released: {film.year}</span>
            </div>

            <h2 id="video-modal-title" style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 800, color: '#FFFFFF', margin: '0 0 6px 0', lineHeight: 1.2 }}>
              {film.title}
            </h2>

            <p style={{ fontSize: '0.9rem', color: '#D4AF37', fontWeight: 600, margin: '0 0 14px 0' }}>
              {film.coupleOrClient} — {film.location}
            </p>

            <p style={{ fontSize: '0.92rem', color: '#C0C0C0', lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
              {film.shortStory}
            </p>
          </div>

          {/* Action Buttons Row */}
          <div
            style={{
              paddingTop: '20px',
              borderTop: '1px solid rgba(212, 175, 53, 0.2)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link
                to="/contact"
                onClick={onClose}
                style={{
                  padding: '12px 24px',
                  minHeight: '44px',
                  borderRadius: '30px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #D4AF37, #F5E6B3)',
                  color: '#080808',
                  boxShadow: '0 6px 20px rgba(212, 175, 53, 0.4)',
                  whiteSpace: 'nowrap'
                }}
              >
                Book Similar Shoot
              </Link>

              <Link
                to="/portfolio"
                onClick={onClose}
                style={{
                  padding: '12px 24px',
                  minHeight: '44px',
                  borderRadius: '30px',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'transparent',
                  color: '#FFFFFF',
                  border: '1px solid rgba(212, 175, 53, 0.4)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  whiteSpace: 'nowrap'
                }}
              >
                View Portfolio
              </Link>
            </div>

            <button
              onClick={onClose}
              style={{
                padding: '12px 22px',
                borderRadius: '30px',
                fontWeight: 600,
                fontSize: '0.85rem',
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#A0A0A0',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default VideoPlayerModal
