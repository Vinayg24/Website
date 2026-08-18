import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export const NavBar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [showNavbar, setShowNavbar] = useState(true)
  const lastScrollY = useRef(0)

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY

      if (currentY > 100) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      if (currentY > lastScrollY.current && currentY > 200) {
        setShowNavbar(false)
      } else if (currentY < lastScrollY.current) {
        setShowNavbar(true)
      }

      lastScrollY.current = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Contact', path: '/contact' },
  ]

  const handleLinkClick = (path: string, e: React.MouseEvent) => {
    setIsOpen(false)

    if (path === '/reviews') {
      e.preventDefault()
      // Navigates to About page where Reviews/Testimonials live
      if (location.pathname !== '/about') {
        navigate('/about')
        setTimeout(() => {
          const section = document.querySelector('#testimonials')
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' })
          }
        }, 300)
      } else {
        const section = document.querySelector('#testimonials')
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
  }

  return (
    <AnimatePresence>
      {showNavbar && (
        <motion.nav
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backdropFilter: scrolled ? 'blur(20px)' : 'blur(10px)',
            backgroundColor: scrolled ? 'rgba(8, 8, 8, 0.95)' : 'rgba(8, 8, 8, 0.75)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: scrolled
              ? '0 8px 32px rgba(212, 175, 53, 0.15)'
              : '0 2px 10px rgba(212, 175, 53, 0.05)',
            border: `1px solid ${scrolled ? 'rgba(212, 175, 53, 0.2)' : 'rgba(212, 175, 53, 0.1)'}`,
            transition: 'all 0.3s ease',
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontFamily: 'serif, "Playfair Display", serif',
              fontSize: '1.4rem',
              fontWeight: 700,
              color: '#FFFFFF',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #D4AF37, #F5E6B3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                boxShadow: '0 0 15px rgba(212, 175, 53, 0.4)',
              }}
            >
              📷
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  background: 'linear-gradient(90deg, #FFFFFF 40%, #D4AF37 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: 1.1,
                }}
              >
                Shree Radha Krishna Studio
              </span>
              <span
                style={{
                  fontSize: '0.65rem',
                  fontFamily: 'Inter, sans-serif',
                  color: '#D4AF37',
                  letterSpacing: '1px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                }}
              >
                Luxury Photography & Films
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div
            className="nav-desktop-menu"
            style={{
              display: 'flex',
              gap: '2.2rem',
              alignItems: 'center',
            }}
          >
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={(e) => handleLinkClick(link.path, e)}
                  style={{
                    position: 'relative',
                    color: isActive ? '#D4AF37' : '#FFFFFF',
                    textDecoration: 'none',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.9rem',
                    fontWeight: isActive ? 600 : 500,
                    letterSpacing: '0.5px',
                    transition: 'color 0.3s ease',
                  }}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      style={{
                        position: 'absolute',
                        bottom: '-8px',
                        left: 0,
                        width: '100%',
                        height: '2px',
                        backgroundColor: '#D4AF37',
                        borderRadius: '1px',
                      }}
                    />
                  )}
                </Link>
              )
            })}

            {/* Primary CTA Button -> /contact */}
            <Link
              to="/contact"
              style={{
                padding: '10px 22px',
                borderRadius: '30px',
                background: 'linear-gradient(135deg, #D4AF37, #F5E6B3)',
                color: '#080808',
                fontSize: '0.85rem',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 4px 15px rgba(212, 175, 53, 0.4)',
                letterSpacing: '0.5px',
                transition: 'transform 0.2s ease, boxShadow 0.2s ease',
              }}
            >
              Book Your Shoot
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="nav-mobile-hamburger"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '44px',
              height: '44px',
              minWidth: '44px',
              minHeight: '44px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              zIndex: 1001,
            }}
          >
            <motion.div
              animate={{
                rotate: isOpen ? 45 : 0,
                y: isOpen ? 7 : 0,
              }}
              transition={{ duration: 0.3 }}
              style={{
                width: '24px',
                height: '2px',
                backgroundColor: '#D4AF37',
                marginBottom: '6px',
              }}
            />
            <motion.div
              animate={{
                opacity: isOpen ? 0 : 1,
                scale: isOpen ? 0 : 1,
              }}
              transition={{ duration: 0.3 }}
              style={{
                width: '24px',
                height: '2px',
                backgroundColor: '#D4AF37',
                marginBottom: '6px',
              }}
            />
            <motion.div
              animate={{
                rotate: isOpen ? -45 : 0,
                y: isOpen ? -7 : 0,
              }}
              transition={{ duration: 0.3 }}
              style={{
                width: '24px',
                height: '2px',
                backgroundColor: '#D4AF37',
              }}
            />
          </button>

          {/* Mobile Menu Overlay */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="nav-mobile-overlay"
                style={{
                  position: 'fixed',
                  inset: 0,
                  backgroundColor: 'rgba(8, 8, 8, 0.96)',
                  backdropFilter: 'blur(20px)',
                  zIndex: 999,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '1.8rem',
                  padding: '20px',
                }}
                onClick={() => setIsOpen(false)}
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={(e) => handleLinkClick(link.path, e)}
                    style={{
                      fontSize: '1.35rem',
                      fontFamily: 'serif, "Playfair Display", serif',
                      fontWeight: 500,
                      color: location.pathname === link.path ? '#D4AF37' : '#FFFFFF',
                      textDecoration: 'none',
                      position: 'relative',
                    }}
                  >
                    {link.name}
                  </Link>
                ))}

                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  style={{
                    padding: '14px 32px',
                    borderRadius: '30px',
                    background: 'linear-gradient(135deg, #D4AF37, #F5E6B3)',
                    color: '#080808',
                    fontSize: '1rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    textAlign: 'center',
                    boxShadow: '0 6px 20px rgba(212, 175, 53, 0.4)',
                    marginTop: '10px',
                  }}
                >
                  Book Your Shoot
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

export default NavBar