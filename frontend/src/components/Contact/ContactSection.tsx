import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Wedding Photography',
    date: '',
    location: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successData, setSuccessData] = useState<{ enquiryId: string; name: string } | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Client-side form validation before dispatch
  const validateForm = (): string | null => {
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      return 'Please enter your full name (minimum 2 characters).'
    }

    const phoneDigits = formData.phone.replace(/\D/g, '')
    if (!phoneDigits || phoneDigits.length < 7 || phoneDigits.length > 15) {
      return 'Please enter a valid phone number (7 to 15 digits).'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      return 'Please enter a valid email address (e.g. name@example.com).'
    }

    if (formData.date) {
      const selectedDate = new Date(formData.date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (selectedDate < today) {
        return 'Event date cannot be in the past. Please select today or a future date.'
      }
    }

    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 1. Validate inputs
    const validationError = validateForm()
    if (validationError) {
      setErrorMessage(validationError)
      return
    }

    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      // POST /api/contact endpoint (proxied via Vite or targeted to backend port 5000)
      const primaryUrl = '/api/contact'
      const fallbackUrl = 'http://localhost:5000/api/contact'

      let response: Response | null = null

      try {
        response = await fetch(primaryUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
      } catch (networkErr) {
        // Fallback directly to localhost:5000 if relative proxy hits connection error
        response = await fetch(fallbackUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
      }

      const contentType = response.headers.get('content-type') || ''
      let data: any = {}

      // Robust Response Check: Ensure JSON before calling response.json()
      if (contentType.includes('application/json')) {
        data = await response.json()
      } else {
        const rawText = await response.text()
        console.error('Non-JSON Response received:', rawText.substring(0, 250))
        throw new Error(
          `Server returned non-JSON response (status ${response.status}). Please check backend server on port 5000.`
        )
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit inquiry. Please try again.')
      }

      // Success Modal Data
      setSuccessData({
        enquiryId: data.enquiryId || 'SRK-2026-CONFIRMED',
        name: formData.name
      })

      // Reset form inputs after successful save
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: 'Wedding Photography',
        date: '',
        location: '',
        message: ''
      })
    } catch (err: any) {
      console.error('Contact Form Submission Exception:', err)
      setErrorMessage(
        err.message || 'Unable to connect to backend server. Please try again or contact +91 9460142572.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        width: '100%',
        padding: '100px 24px',
        backgroundColor: '#080808',
        color: '#FFFFFF',
        overflow: 'hidden'
      }}
    >
      {/* Background radial glow */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '10%', right: '-5%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212, 175, 53, 0.12) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Section Title */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 60px auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '999px',
              background: 'linear-gradient(135deg, rgba(212, 175, 53, 0.18), rgba(245, 230, 179, 0.06))',
              border: '1px solid rgba(212, 175, 53, 0.35)',
              marginBottom: '16px'
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#D4AF37', boxShadow: '0 0 10px #D4AF37' }} />
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#F5E6B3', fontWeight: 600 }}>
              Reserve Your Date
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: '14px',
              background: 'linear-gradient(90deg, #FFFFFF 20%, #D4AF37 60%, #F5E6B3 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Book Your Shoot With Us
          </motion.h2>

          <p style={{ fontSize: '1rem', color: '#A0A0A0', fontWeight: 300, lineHeight: 1.6 }}>
            Ready to capture your love story or brand campaign? Reach out to check date availability and customized pricing.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '40px' }}>
          {/* Left Column: Direct Info & Quick Action Buttons */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              padding: '36px 32px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, rgba(24, 24, 24, 0.8) 0%, rgba(12, 12, 12, 0.95) 100%)',
              border: '1px solid rgba(212, 175, 53, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', color: '#FFF', marginBottom: '8px' }}>
                Shree Radha Krishna Studio
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#D4AF37', margin: '0 0 24px 0', fontWeight: 500 }}>
                Luxury Photography & Cinematography
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.2rem', color: '#D4AF37', marginTop: '2px' }}>📍</span>
                  <div>
                    <span style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', display: 'block' }}>Studio Address</span>
                    <span style={{ fontSize: '0.9rem', color: '#E0E0E0', lineHeight: 1.5, display: 'block' }}>
                      44 A, Ved Vatika, Ramnagar Extension,<br />
                      Sodala, Jaipur, Rajasthan 302019, India
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.2rem', color: '#D4AF37' }}>📞</span>
                  <div>
                    <span style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', display: 'block' }}>Direct Inquiry Hotline</span>
                    <a href="tel:+919460142572" style={{ fontSize: '0.95rem', color: '#F5E6B3', textDecoration: 'none', fontWeight: 600 }}>+91 9460142572</a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.2rem', color: '#D4AF37' }}>✉️</span>
                  <div>
                    <span style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', display: 'block' }}>Email Bookings</span>
                    <a href="mailto:ajeetdigitallab@gmail.com" style={{ fontSize: '0.9rem', color: '#E0E0E0', textDecoration: 'none' }}>ajeetdigitallab@gmail.com</a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.2rem', color: '#D4AF37' }}>🕒</span>
                  <div>
                    <span style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', display: 'block' }}>Opening Hours</span>
                    <span style={{ fontSize: '0.9rem', color: '#E0E0E0' }}>Monday – Sunday: 10:00 AM – 8:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Instant Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a
                href="https://wa.me/919460142572?text=Hi%20Shree%20Radha%20Krishna%20Studio,%20I%20would%20like%20to%20inquire%20about%20booking%20a%20shoot."
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '14px 20px',
                  borderRadius: '30px',
                  background: 'linear-gradient(135deg, #25D366, #128C7E)',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 6px 20px rgba(37, 211, 102, 0.3)',
                }}
              >
                <span>💬 Chat On WhatsApp (+91 9460142572)</span>
              </a>

              <a
                href="tel:+919460142572"
                style={{
                  padding: '14px 20px',
                  borderRadius: '30px',
                  background: 'linear-gradient(135deg, #D4AF37, #F5E6B3)',
                  color: '#080808',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 6px 20px rgba(212, 175, 53, 0.4)',
                }}
              >
                <span>📞 Call Studio (+91 9460142572)</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              padding: '36px 32px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, rgba(24, 24, 24, 0.8) 0%, rgba(12, 12, 12, 0.95) 100%)',
              border: '1px solid rgba(212, 175, 53, 0.25)',
              position: 'relative'
            }}
          >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', color: '#FFF', margin: '0 0 8px 0' }}>
                Send an Online Inquiry
              </h3>

              {/* Error Message Banner */}
              {errorMessage && (
                <div
                  style={{
                    padding: '12px 16px',
                    borderRadius: '10px',
                    background: 'rgba(220, 53, 69, 0.15)',
                    border: '1px solid rgba(220, 53, 69, 0.4)',
                    color: '#FF6B6B',
                    fontSize: '0.85rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span>⚠️ {errorMessage}</span>
                  <button
                    type="button"
                    onClick={() => setErrorMessage(null)}
                    style={{ background: 'transparent', border: 'none', color: '#FF6B6B', cursor: 'pointer', fontSize: '1rem', marginLeft: '10px' }}
                  >
                    ✕
                  </button>
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                <div>
                  <label htmlFor="form-name" style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Your Name *</label>
                  <input
                    id="form-name"
                    type="text"
                    required
                    aria-required="true"
                    placeholder="e.g. Ananya Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', minHeight: '44px', padding: '12px 14px', borderRadius: '10px', background: 'rgba(8,8,8,0.8)', border: '1px solid rgba(212, 175, 53, 0.3)', color: '#FFF', fontSize: '0.875rem' }}
                  />
                </div>

                <div>
                  <label htmlFor="form-phone" style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Phone Number *</label>
                  <input
                    id="form-phone"
                    type="tel"
                    required
                    aria-required="true"
                    placeholder="+91 9460142572"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', minHeight: '44px', padding: '12px 14px', borderRadius: '10px', background: 'rgba(8,8,8,0.8)', border: '1px solid rgba(212, 175, 53, 0.3)', color: '#FFF', fontSize: '0.875rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                <div>
                  <label htmlFor="form-email" style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Email Address *</label>
                  <input
                    id="form-email"
                    type="email"
                    required
                    aria-required="true"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', minHeight: '44px', padding: '12px 14px', borderRadius: '10px', background: 'rgba(8,8,8,0.8)', border: '1px solid rgba(212, 175, 53, 0.3)', color: '#FFF', fontSize: '0.875rem' }}
                  />
                </div>

                <div>
                  <label htmlFor="form-service" style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Service Needed</label>
                  <select
                    id="form-service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    style={{ width: '100%', minHeight: '44px', padding: '12px 14px', borderRadius: '10px', background: 'rgba(8,8,8,0.8)', border: '1px solid rgba(212, 175, 53, 0.3)', color: '#FFF', fontSize: '0.875rem' }}
                  >
                    <option value="Wedding Photography">Wedding Photography</option>
                    <option value="Pre Wedding Shoots">Pre Wedding Shoots</option>
                    <option value="Cinematic Wedding Films">Cinematic Wedding Films</option>
                    <option value="Fashion Photography">Fashion Photography</option>
                    <option value="Commercial & Brand Shoots">Commercial & Brand Shoots</option>
                    <option value="Product Photography">Product Photography</option>
                    <option value="Event Coverage">Event Coverage</option>
                    <option value="Drone Photography">Drone Photography</option>
                    <option value="Reels & Social Media">Reels & Social Media</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                <div>
                  <label htmlFor="form-date" style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Event Date</label>
                  <input
                    id="form-date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    style={{ width: '100%', minHeight: '44px', padding: '12px 14px', borderRadius: '10px', background: 'rgba(8,8,8,0.8)', border: '1px solid rgba(212, 175, 53, 0.3)', color: '#FFF', fontSize: '0.875rem' }}
                  />
                </div>

                <div>
                  <label htmlFor="form-location" style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Event Location / City</label>
                  <input
                    id="form-location"
                    type="text"
                    placeholder="e.g. Udaipur, Delhi, Dubai, Mumbai"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    style={{ width: '100%', minHeight: '44px', padding: '12px 14px', borderRadius: '10px', background: 'rgba(8,8,8,0.8)', border: '1px solid rgba(212, 175, 53, 0.3)', color: '#FFF', fontSize: '0.875rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Message / Shoot Vision</label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your event scale, themes, or specific expectations..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: 'rgba(8,8,8,0.8)', border: '1px solid rgba(212, 175, 53, 0.3)', color: '#FFF', fontSize: '0.875rem', resize: 'none' }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  padding: '14px 28px',
                  borderRadius: '30px',
                  background: isSubmitting
                    ? 'linear-gradient(135deg, rgba(212, 175, 53, 0.5), rgba(245, 230, 179, 0.3))'
                    : 'linear-gradient(135deg, #D4AF37, #F5E6B3)',
                  border: 'none',
                  color: '#080808',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  marginTop: '8px',
                  boxShadow: '0 6px 20px rgba(212, 175, 53, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  opacity: isSubmitting ? 0.75 : 1,
                  transition: 'all 0.3s ease'
                }}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        border: '2px solid #080808',
                        borderTopColor: 'transparent'
                      }}
                    />
                    <span>Submitting Enquiry...</span>
                  </>
                ) : (
                  <span>Submit Inquiry</span>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Premium Success Modal */}
      <AnimatePresence>
        {successData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSuccessData(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              backgroundColor: 'rgba(5, 5, 5, 0.92)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '500px',
                width: '100%',
                borderRadius: '24px',
                padding: '36px 30px',
                background: 'linear-gradient(135deg, rgba(28, 24, 16, 0.96), rgba(12, 12, 12, 0.98))',
                border: '1px solid rgba(212, 175, 53, 0.4)',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 30px rgba(212, 175, 53, 0.2)',
                textAlign: 'center',
                position: 'relative'
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
                  fontSize: '2rem',
                  margin: '0 auto 20px auto',
                  boxShadow: '0 0 30px rgba(212, 175, 53, 0.6)'
                }}
              >
                ✨
              </div>

              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', color: '#FFFFFF', fontWeight: 800, margin: '0 0 8px 0' }}>
                Thank You!
              </h3>

              <p style={{ fontSize: '0.95rem', color: '#D4AF37', fontWeight: 600, margin: '0 0 16px 0' }}>
                Enquiry ID: <span style={{ color: '#F5E6B3', letterSpacing: '1px' }}>{successData.enquiryId}</span>
              </p>

              <p style={{ fontSize: '0.9rem', color: '#C0C0C0', lineHeight: 1.65, fontWeight: 300, marginBottom: '24px' }}>
                Dear <strong style={{ color: '#FFF' }}>{successData.name}</strong>, your enquiry has been submitted successfully. Our team will contact you shortly.
              </p>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button
                  onClick={() => setSuccessData(null)}
                  style={{
                    padding: '12px 28px',
                    borderRadius: '30px',
                    background: 'linear-gradient(135deg, #D4AF37, #F5E6B3)',
                    color: '#080808',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 6px 20px rgba(212, 175, 53, 0.4)'
                  }}
                >
                  Done
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default ContactSection
