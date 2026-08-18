import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export interface PortfolioItem {
  id: string
  title: string
  clientOrCouple: string
  category: string
  type: 'image' | 'video'
  imageUrl?: string
  videoUrl: string
  thumbnailUrl: string
  location: string
  cameraGear: string
  lensSpecs: string
  photographer: string
  year: string
  duration?: string
  description: string
  featured: boolean
}

interface GalleryCardProps {
  artwork: PortfolioItem
  index: number
  featured?: boolean
  onClick: (item: PortfolioItem) => void
}

export const GalleryCard = ({ artwork, featured = false, onClick }: GalleryCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.1 }
    )

    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      ref={cardRef}
      className="gallery-card-16-9"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(artwork)}
      style={{
        position: 'relative',
        cursor: 'pointer',
        flexShrink: 0,
        width: 'clamp(480px, 46vw, 760px)',
        aspectRatio: '16 / 9',
        borderRadius: '28px',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(28, 24, 16, 0.8) 0%, rgba(12, 12, 12, 0.96) 100%)',
        border: isHovered ? '1px solid rgba(212, 175, 53, 0.7)' : '1px solid rgba(212, 175, 53, 0.25)',
        boxShadow: isHovered
          ? '0 25px 55px rgba(212, 175, 53, 0.3), 0 0 30px rgba(0, 0, 0, 0.8)'
          : '0 15px 40px rgba(0, 0, 0, 0.7)',
        transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.5s ease, border-color 0.5s ease',
        transform: isHovered ? 'scale(1.04) translateY(-6px)' : 'scale(1)',
      }}
    >
      {/* Fallback Poster Image */}
      <img
        src={artwork.thumbnailUrl}
        alt={artwork.title}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: isVideoLoaded ? 0 : 1,
          transition: 'opacity 0.6s ease',
        }}
      />

      {/* Auto-playing Muted Looping Video */}
      <video
        ref={videoRef}
        src={artwork.videoUrl}
        poster={artwork.thumbnailUrl}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        onLoadedData={() => setIsVideoLoaded(true)}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: isHovered ? 'brightness(1.1) contrast(1.05)' : 'brightness(0.82) contrast(1)',
          transform: isHovered ? 'scale(1.06)' : 'scale(1)',
          transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.4s ease',
        }}
      />

      {/* Gradient Darkening Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(8, 8, 8, 0.2) 0%, transparent 40%, rgba(8, 8, 8, 0.92) 100%)',
          opacity: isHovered ? 0.7 : 0.5,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Top Badges */}
      <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 2, display: 'flex', gap: '10px', alignItems: 'center' }}>
        <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.2px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(212, 175, 53, 0.35)', color: '#F5E6B3', border: '1px solid rgba(212, 175, 53, 0.6)', backdropFilter: 'blur(12px)' }}>
          {artwork.category}
        </span>
        {artwork.duration && (
          <span style={{ fontSize: '11px', fontWeight: 600, padding: '6px 12px', borderRadius: '999px', background: 'rgba(8, 8, 8, 0.7)', color: '#FFFFFF', border: '1px solid rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(12px)' }}>
            {artwork.duration}
          </span>
        )}
      </div>

      {/* Featured Star */}
      {featured && (
        <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 2, width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #D4AF37, #F5E6B3)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(212, 175, 53, 0.7)', color: '#080808', fontWeight: 700, fontSize: '14px' }}>
          ★
        </div>
      )}

      {/* Center Glowing Play Icon on Hover */}
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          top: '45%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 3,
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #D4AF37, #F5E6B3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 30px rgba(212, 175, 53, 0.7), 0 0 15px rgba(255, 255, 255, 0.4)',
          pointerEvents: 'none'
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#080808">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      </motion.div>

      {/* Card Information Overlay */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px', zIndex: 2 }}>
        <p style={{ fontSize: '12px', color: '#D4AF37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 6px 0' }}>
          {artwork.clientOrCouple} • {artwork.location}
        </p>
        <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.6rem', fontWeight: 700, color: '#FFFFFF', margin: '0 0 8px 0', lineHeight: 1.2 }}>
          {artwork.title}
        </h3>

        <motion.p
          animate={{ opacity: isHovered ? 1 : 0.85, height: 'auto' }}
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#C0C0C0', margin: 0, lineHeight: 1.5, fontWeight: 300 }}
        >
          {artwork.description}
        </motion.p>
      </div>
    </motion.div>
  )
}

export default GalleryCard