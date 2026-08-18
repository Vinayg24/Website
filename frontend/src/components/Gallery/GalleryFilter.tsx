import { useState } from 'react'
import { motion, useAnimation } from 'framer-motion'

interface GalleryFilterProps {
  categories: string[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export const GalleryFilter = ({ categories, selectedCategory, onCategoryChange }: GalleryFilterProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const controls = useAnimation()

  return (
    <motion.div
      className="gallery-filter-bar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      style={{
        position: 'sticky',
        top: '90px',
        background: 'linear-gradient(135deg, rgba(16, 16, 16, 0.85) 0%, rgba(8, 8, 8, 0.95) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(212, 175, 53, 0.25)',
        borderRadius: '20px',
        padding: '12px 16px',
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        gap: '10px',
        marginBottom: '40px',
        justifyContent: 'flex-start',
        alignItems: 'center',
        maxWidth: '100%',
        zIndex: 15,
      }}
    >
      {categories.map((category, index) => {
        const isSelected = category === selectedCategory
        const isHovered = hoveredIndex === index

        return (
          <motion.button
            key={category}
            initial={{
              scale: isSelected ? 1.05 : 0.9,
              y: isHovered ? -8 : 0,
            }}
            animate={{
              scale: isSelected ? 1.08 : isHovered ? 1.02 : 0.95,
              y: isHovered ? -4 : 0,
              rotate: isHovered ? 2 : 0,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => onCategoryChange(category)}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '9999px',
              background: isSelected
                ? 'linear-gradient(135deg, #D4AF37, #F5E6B3)'
                : 'linear-gradient(135deg, rgba(24, 24, 24, 0.6), rgba(16, 16, 16, 0.8))',
              border: isSelected
                ? '1px solid #D4AF37'
                : '1px solid rgba(212, 175, 53, 0.3)',
              color: isSelected
                ? '#080808'
                : '#F5E6B3',
              fontWeight: isSelected ? 600 : 500,
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.9rem',
              cursor: 'pointer',
              boxShadow: isSelected
                ? '0 6px 20px rgba(212, 175, 53, 0.4)'
                : '0 2px 8px rgba(0, 0, 0, 0.2)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
            whileHover={{
              scale: isSelected ? 1.12 : 1.06,
              boxShadow: isSelected
                ? '0 10px 30px rgba(212, 175, 53, 0.5)'
                : '0 4px 16px rgba(212, 175, 53, 0.3)',
            }}
            whileTap={{
              scale: isSelected ? 0.98 : 0.95,
            }}
          >
            <motion.div
              animate={{
                scale: isSelected ? [1, 1.1, 1] : [0.8, 1, 0.8],
                opacity: isSelected ? [0.7, 1, 0.7] : [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: isSelected ? '#D4AF37' : '#F5E6B3',
              }}
            />
            <span
              style={{
                fontSize: '0.85rem',
                letterSpacing: '0.3px',
                whiteSpace: 'nowrap',
              }}
            >
              {category}
            </span>
          </motion.button>
        )
      })}
    </motion.div>
  )
}

export default GalleryFilter