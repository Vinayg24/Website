import { useState, useEffect } from 'react'

export const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100
        setScrollProgress(currentProgress)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        zIndex: 10001,
        pointerEvents: 'none',
        backgroundColor: 'rgba(212, 175, 53, 0.1)',
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, #D4AF37 0%, #F5E6B3 100%)',
          boxShadow: '0 0 10px rgba(212, 175, 53, 0.8)',
          transition: 'width 0.1s linear',
        }}
      />
    </div>
  )
}

export default ScrollProgressBar
