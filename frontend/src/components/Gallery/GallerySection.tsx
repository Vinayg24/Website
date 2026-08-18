import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GalleryCard } from './GalleryCard'
import { GalleryFilter } from './GalleryFilter'
import { Lightbox } from './Lightbox'
import { GalleryCanvas } from './GalleryCanvas'
import { portfolioItems, PORTFOLIO_CATEGORIES, PortfolioItem } from '../../data/portfolioData'

gsap.registerPlugin(ScrollTrigger)

export const GallerySection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'title'>('featured')
  const [openLightbox, setOpenLightbox] = useState<PortfolioItem | null>(null)
  const [filteredItems, setFilteredItems] = useState<PortfolioItem[]>(portfolioItems)
  const [visibleCount, setVisibleCount] = useState<number>(8)

  const pinSectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  // Filter & sort items when category, search, or sort changes
  useEffect(() => {
    let items = [...portfolioItems]

    if (selectedCategory !== 'All') {
      items = items.filter(item => item.category === selectedCategory)
    }

    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase()
      items = items.filter(
        item =>
          item.title.toLowerCase().includes(term) ||
          item.clientOrCouple.toLowerCase().includes(term) ||
          item.location.toLowerCase().includes(term) ||
          item.tags.some(tag => tag.toLowerCase().includes(term))
      )
    }

    if (sortBy === 'featured') {
      items.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    } else if (sortBy === 'newest') {
      items.sort((a, b) => Number(b.year) - Number(a.year))
    } else if (sortBy === 'title') {
      items.sort((a, b) => a.title.localeCompare(b.title))
    }

    setFilteredItems(items)
  }, [selectedCategory, searchTerm, sortBy])

  // GSAP Horizontal Pinning ScrollTrigger
  useEffect(() => {
    const track = trackRef.current
    const pinSection = pinSectionRef.current
    if (!track || !pinSection) return

    const ctx = gsap.context(() => {
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 120)

      gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: pinSection,
          start: 'top top',
          end: () => `+=${Math.max(window.innerHeight * 1.8, track.scrollWidth - window.innerWidth)}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        }
      })
    }, pinSectionRef)

    return () => ctx.revert()
  }, [filteredItems, visibleCount])

  const handleCardClick = useCallback((item: PortfolioItem) => {
    setOpenLightbox(item)
    document.body.style.overflow = 'hidden'
  }, [])

  const handleCloseLightbox = useCallback(() => {
    setOpenLightbox(null)
    document.body.style.overflow = ''
  }, [])

  const displayedItems = filteredItems.slice(0, visibleCount)

  return (
    <section id="portfolio" style={{ position: 'relative', backgroundColor: '#080808', color: '#FFFFFF' }}>
      {/* 3D Aperture Lens Background */}
      <GalleryCanvas />

      {/* GSAP Pinned Scroll Container */}
      <div ref={pinSectionRef} style={{ position: 'relative', width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
        
        {/* Header, Search & Filter Controls */}
        <div style={{ position: 'relative', zIndex: 10, padding: '20px 24px 10px 24px', maxWidth: '1400px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '16px' }}
          >
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: '#D4AF37', fontWeight: 700, padding: '5px 14px', borderRadius: '20px', background: 'rgba(212, 175, 53, 0.15)', border: '1px solid rgba(212, 175, 53, 0.3)' }}>
              Cinematic Master Portfolio
            </span>

            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, margin: '10px 0 6px 0', background: 'linear-gradient(90deg, #FFFFFF 30%, #D4AF37 70%, #F5E6B3 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Live 4K Cinema & Fine Art Showcase
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#A0A0A0', fontWeight: 300, margin: 0 }}>
              Filter across 15 categories, search by location or gear, and navigate through our cinema works.
            </p>
          </motion.div>

          {/* Search & Sort Bar */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', width: '100%', maxWidth: '720px', marginBottom: '16px' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
              <input
                type="text"
                placeholder="Search by title, location (e.g. Udaipur, Italy), or tag..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  minHeight: '44px',
                  padding: '10px 16px 10px 40px',
                  borderRadius: '30px',
                  background: 'rgba(16, 16, 16, 0.85)',
                  border: '1px solid rgba(212, 175, 53, 0.3)',
                  color: '#FFFFFF',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
              <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#D4AF37', fontSize: '0.9rem' }}>
                🔍
              </span>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              style={{
                minHeight: '44px',
                padding: '10px 16px',
                borderRadius: '30px',
                background: 'rgba(16, 16, 16, 0.85)',
                border: '1px solid rgba(212, 175, 53, 0.3)',
                color: '#F5E6B3',
                fontSize: '0.85rem',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="featured">Sort: Featured First</option>
              <option value="newest">Sort: Newest First</option>
              <option value="title">Sort: Title A-Z</option>
            </select>
          </div>

          <GalleryFilter
            categories={PORTFOLIO_CATEGORIES}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Horizontal Track of 16:9 Video Cards */}
        <div style={{ width: '100%', overflow: 'hidden', padding: '20px 0 30px 0', position: 'relative', zIndex: 10 }}>
          <div
            ref={trackRef}
            style={{
              display: 'flex',
              gap: '40px',
              paddingLeft: 'max(40px, 5vw)',
              paddingRight: 'max(40px, 5vw)',
              width: 'fit-content',
              willChange: 'transform',
            }}
          >
            {displayedItems.map((item, index) => (
              <GalleryCard
                key={item.id}
                artwork={item}
                index={index}
                featured={item.featured}
                onClick={handleCardClick}
              />
            ))}
          </div>
        </div>

        {/* Load More Control */}
        {visibleCount < filteredItems.length && (
          <div style={{ textAlignment: 'center', textAlign: 'center', zIndex: 15, paddingBottom: '20px' }}>
            <button
              onClick={() => setVisibleCount(prev => prev + 4)}
              style={{
                padding: '12px 32px',
                minHeight: '44px',
                borderRadius: '30px',
                background: 'linear-gradient(135deg, rgba(212, 175, 53, 0.2), rgba(245, 230, 179, 0.1))',
                border: '1px solid rgba(212, 175, 53, 0.4)',
                color: '#F5E6B3',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Load More Works ({filteredItems.length - visibleCount} Remaining)
            </button>
          </div>
        )}
      </div>

      {/* Fullscreen Video Player Modal */}
      {openLightbox && (
        <Lightbox
          artwork={openLightbox}
          onClose={handleCloseLightbox}
          allArtworks={filteredItems}
        />
      )}
    </section>
  )
}

export default GallerySection