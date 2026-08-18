import { motion } from 'framer-motion'
import { testimonialsData, TestimonialItem } from '../../data/testimonialsData'

export const TestimonialsSection = () => {
  return (
    <section
      id="testimonials"
      style={{
        position: 'relative',
        width: '100%',
        padding: '100px 24px',
        backgroundColor: '#080808',
        color: '#FFFFFF',
        overflow: 'hidden'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Header */}
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
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#F5E6B3', fontWeight: 600 }}>
              Client Testimonials
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
            Words From Our Couples & Clients
          </motion.h2>

          <p style={{ fontSize: '1rem', color: '#A0A0A0', fontWeight: 300, lineHeight: 1.6 }}>
            Read 5-star Google verified reviews from couples and brands who trusted us with their defining stories.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
          {testimonialsData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              style={{
                position: 'relative',
                padding: '32px 28px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, rgba(24, 24, 24, 0.8) 0%, rgba(12, 12, 12, 0.95) 100%)',
                border: '1px solid rgba(212, 175, 53, 0.25)',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.5)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                {/* Rating Stars & Google Verified Tag */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ color: '#D4AF37', fontSize: '1.1rem' }}>★★★★★</div>
                  {item.verifiedGoogleReview && (
                    <span style={{ fontSize: '10px', color: '#888', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ color: '#4285F4', fontWeight: 700 }}>G</span> Verified Review
                    </span>
                  )}
                </div>

                <p style={{ fontSize: '0.95rem', color: '#E0E0E0', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '24px', fontWeight: 300 }}>
                  "{item.reviewText}"
                </p>
              </div>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <img
                  src={item.avatarUrl}
                  alt={item.clientName}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
                  }}
                  style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #D4AF37' }}
                />
                <div>
                  <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>
                    {item.clientName}
                  </h4>
                  <p style={{ fontSize: '0.75rem', color: '#D4AF37', margin: '2px 0 0 0', fontWeight: 500 }}>
                    {item.eventOrProject} • {item.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
