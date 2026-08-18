import { useEffect, useState, TouchEvent } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PortfolioItem } from '../../data/portfolioData'

interface LightboxProps {
  artwork: PortfolioItem
  onClose: () => void
  allArtworks: PortfolioItem[]
}

export const Lightbox = ({ artwork: initialArtwork, onClose, allArtworks }: LightboxProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(() =>
    allArtworks.findIndex(a => a.id === initialArtwork.id)
  )
  const [isZoomed, setIsZoomed] = useState(false)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)

  const activeIndex = currentIndex >= 0 ? currentIndex : 0
  const currentArtwork = allArtworks[activeIndex] || initialArtwork

  const handlePrev = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : allArtworks.length - 1))
    setIsZoomed(false)
  }

  const handleNext = () => {
    setCurrentIndex(prev => (prev < allArtworks.length - 1 ? prev + 1 : 0))
    setIsZoomed(false)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [allArtworks, onClose])

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStartX(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartX === null) return
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX - touchEndX
    if (diff > 50) handleNext()
    else if (diff < -50) handlePrev()
    setTouchStartX(null)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="lightbox-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        backgroundColor: 'rgba(5, 5, 5, 0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      {/* Prev Navigation Button */}
      {allArtworks.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); handlePrev() }}
          aria-label="Previous artwork"
          style={{
            position: 'absolute',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'rgba(212, 175, 53, 0.2)',
            border: '1px solid rgba(212, 175, 53, 0.4)',
            color: '#F5E6B3',
            fontSize: '1.2rem',
            cursor: 'pointer',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ‹
        </button>
      )}

      {/* Next Navigation Button */}
      {allArtworks.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); handleNext() }}
          aria-label="Next artwork"
          style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'rgba(212, 175, 53, 0.2)',
            border: '1px solid rgba(212, 175, 53, 0.4)',
            color: '#F5E6B3',
            fontSize: '1.2rem',
            cursor: 'pointer',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ›
        </button>
      )}

      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          position: 'relative',
          maxWidth: '1100px',
          width: '100%',
          borderRadius: '24px',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(28, 24, 16, 0.8) 0%, rgba(12, 12, 12, 0.95) 100%)',
          backdropFilter: 'blur(25px)',
          WebkitBackdropFilter: 'blur(25px)',
          border: '1px solid rgba(212, 175, 53, 0.3)',
          boxShadow: '0 25px 50px -12px rgba(212, 175, 53, 0.3)',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close lightbox"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '36px',
            height: '36px',
            minWidth: '36px',
            minHeight: '36px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            background: 'rgba(212, 175, 53, 0.15)',
            border: '1px solid rgba(212, 175, 53, 0.3)',
            color: '#F5E6B3',
            cursor: 'pointer',
            zIndex: 10,
          }}
        >
          ✕
        </button>

        <div>
          <div
            onClick={() => setIsZoomed(prev => !prev)}
            style={{
              position: 'relative',
              width: '100%',
              minHeight: '380px',
              maxHeight: '550px',
              backgroundColor: '#000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              cursor: 'zoom-in'
            }}
          >
            {currentArtwork.videoUrl.includes('youtube.com') || currentArtwork.videoUrl.includes('vimeo.com') ? (
              <iframe
                src={`${currentArtwork.videoUrl}?autoplay=1&rel=0`}
                title={currentArtwork.title}
                style={{ width: '100%', height: '500px', border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <motion.video
                src={currentArtwork.videoUrl}
                poster={currentArtwork.thumbnailUrl}
                controls
                autoPlay
                animate={{ scale: isZoomed ? 1.6 : 1 }}
                transition={{ duration: 0.3 }}
                style={{ width: '100%', maxHeight: '520px', objectFit: 'contain' }}
              />
            )}
          </div>

          <div style={{ padding: '24px 28px', borderTop: '1px solid rgba(212, 175, 53, 0.15)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#D4AF37', fontWeight: 600 }}>
                  {currentArtwork.category} • {currentArtwork.duration || '15s Cinema Preview'}
                </span>
                <span style={{ fontSize: '11px', color: '#666' }}>|</span>
                <span style={{ fontSize: '11px', color: '#A0A0A0' }}>{currentArtwork.cameraGear} ({currentArtwork.lensSpecs})</span>
              </div>

              <h2 id="lightbox-title" style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.6rem', fontWeight: 700, color: '#FFFFFF', margin: '4px 0 8px 0' }}>
                {currentArtwork.title}
              </h2>

              <p style={{ fontSize: '0.88rem', color: '#A0A0A0', margin: 0, fontWeight: 300 }}>
                Client / Couple: <strong style={{ color: '#F5E6B3' }}>{currentArtwork.clientOrCouple}</strong> — {currentArtwork.location} ({currentArtwork.year})
              </p>
              <p style={{ fontSize: '0.82rem', color: '#888888', marginTop: '6px', margin: '6px 0 0 0' }}>
                {currentArtwork.description}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <button
                onClick={() => setIsZoomed(prev => !prev)}
                style={{
                  padding: '10px 16px',
                  minHeight: '44px',
                  borderRadius: '30px',
                  background: 'rgba(212, 175, 53, 0.15)',
                  border: '1px solid rgba(212, 175, 53, 0.3)',
                  color: '#F5E6B3',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {isZoomed ? '🔍 Zoom Out' : '🔍 Zoom In'}
              </button>

              <Link
                to="/contact"
                onClick={onClose}
                style={{
                  padding: '14px 30px',
                  minHeight: '44px',
                  borderRadius: '30px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
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
                Inquire About This Shoot
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Lightbox