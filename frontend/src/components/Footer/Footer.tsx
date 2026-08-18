import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer
      style={{
        width: '100%',
        backgroundColor: '#040404',
        color: '#FFFFFF',
        borderTop: '1px solid rgba(212, 175, 53, 0.2)',
        padding: '60px 24px 30px 24px',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', marginBottom: '40px' }}>
          {/* Col 1: Studio Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #D4AF37, #F5E6B3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#080808">
                  <path d="M4 4h3l2-2h6l2 2h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm8 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" />
                </svg>
              </div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>
                Shree Radha Krishna Studio
              </h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#D4AF37', fontWeight: 500, margin: '0 0 12px 0' }}>
              Luxury Photography & Cinematography
            </p>
            <p style={{ fontSize: '0.85rem', color: '#A0A0A0', lineHeight: 1.6, margin: 0, fontWeight: 300 }}>
              Preserving royal wedding moments, romantic destination stories, and commercial ad campaigns with timeless artistic flair.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', color: '#F5E6B3', marginBottom: '16px' }}>
              Studio Navigation
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.85rem' }}>
              <Link to="/" style={{ color: '#A0A0A0', textDecoration: 'none' }}>Home</Link>
              <Link to="/about" style={{ color: '#A0A0A0', textDecoration: 'none' }}>About Us</Link>
              <Link to="/services" style={{ color: '#A0A0A0', textDecoration: 'none' }}>Services</Link>
              <Link to="/portfolio" style={{ color: '#A0A0A0', textDecoration: 'none' }}>Portfolio</Link>
              <Link to="/contact" style={{ color: '#A0A0A0', textDecoration: 'none' }}>Contact & Booking</Link>
            </div>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', color: '#F5E6B3', marginBottom: '16px' }}>
              Our Offerings
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem', color: '#A0A0A0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>Royal Wedding Photography</li>
              <li>Cinematic Wedding Films</li>
              <li>Destination Pre Wedding Shoots</li>
              <li>Editorial Fashion & Lookbooks</li>
              <li>Commercial & Brand Campaigns</li>
              <li>4K Aerial Drone Cinematography</li>
            </ul>
          </div>

          {/* Col 4: Contact & Social */}
          <div>
            <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', color: '#F5E6B3', marginBottom: '16px' }}>
              Studio Contact
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#A0A0A0', lineHeight: 1.5, margin: '0 0 10px 0' }}>
              44 A, Ved Vatika, Ramnagar Extension, Sodala, Jaipur, Rajasthan 302019, India
            </p>
            <p style={{ fontSize: '0.85rem', margin: '0 0 6px 0' }}>
              <a href="tel:+919460142572" style={{ color: '#F5E6B3', textDecoration: 'none', fontWeight: 600 }}>📞 +91 9460142572</a>
            </p>
            <p style={{ fontSize: '0.85rem', margin: '0 0 14px 0' }}>
              <a href="mailto:ajeetdigitallab@gmail.com" style={{ color: '#D4AF37', textDecoration: 'none' }}>✉️ ajeetdigitallab@gmail.com</a>
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Follow Shree Radha Krishna Studio on Instagram" style={{ width: '44px', height: '44px', minWidth: '44px', minHeight: '44px', borderRadius: '50%', background: 'rgba(212, 175, 53, 0.15)', border: '1px solid rgba(212, 175, 53, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F5E6B3', textDecoration: 'none' }}>IG</a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="Subscribe to Shree Radha Krishna Studio on YouTube" style={{ width: '44px', height: '44px', minWidth: '44px', minHeight: '44px', borderRadius: '50%', background: 'rgba(212, 175, 53, 0.15)', border: '1px solid rgba(212, 175, 53, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F5E6B3', textDecoration: 'none' }}>YT</a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Follow Shree Radha Krishna Studio on Facebook" style={{ width: '44px', height: '44px', minWidth: '44px', minHeight: '44px', borderRadius: '50%', background: 'rgba(212, 175, 53, 0.15)', border: '1px solid rgba(212, 175, 53, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F5E6B3', textDecoration: 'none' }}>FB</a>
              <a href="https://wa.me/919460142572" target="_blank" rel="noopener noreferrer" aria-label="Chat with Shree Radha Krishna Studio on WhatsApp" style={{ width: '44px', height: '44px', minWidth: '44px', minHeight: '44px', borderRadius: '50%', background: 'rgba(37, 211, 102, 0.25)', border: '1px solid rgba(37, 211, 102, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#25D366', textDecoration: 'none', fontWeight: 700 }}>WA</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ paddingTop: '24px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', textAlign: 'center', fontSize: '0.8rem', color: '#888888' }}>
          <p style={{ margin: 0 }}>
            © {new Date().getFullYear()} <strong style={{ color: '#D4AF37' }}>Shree Radha Krishna Studio</strong>. All Rights Reserved. Luxury Photography & Cinematography.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
