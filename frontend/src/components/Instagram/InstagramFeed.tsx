import { motion } from 'framer-motion'

interface InstaTile {
  id: string
  imageUrl: string
  likes: string
  comments: string
  type: 'photo' | 'reel'
  link: string
}

const instaPosts: InstaTile[] = [
  {
    id: 'ig-1',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
    likes: '4.2K',
    comments: '184',
    type: 'photo',
    link: 'https://instagram.com'
  },
  {
    id: 'ig-2',
    imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
    likes: '8.9K',
    comments: '412',
    type: 'reel',
    link: 'https://instagram.com'
  },
  {
    id: 'ig-3',
    imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
    likes: '3.1K',
    comments: '96',
    type: 'photo',
    link: 'https://instagram.com'
  },
  {
    id: 'ig-4',
    imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
    likes: '6.5K',
    comments: '230',
    type: 'photo',
    link: 'https://instagram.com'
  },
  {
    id: 'ig-5',
    imageUrl: 'https://images.unsplash.com/photo-1508672019048-805479767517?auto=format&fit=crop&w=600&q=80',
    likes: '12.4K',
    comments: '890',
    type: 'reel',
    link: 'https://instagram.com'
  },
  {
    id: 'ig-6',
    imageUrl: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=600&q=80',
    likes: '9.8K',
    comments: '512',
    type: 'reel',
    link: 'https://instagram.com'
  }
]

export const InstagramFeed = () => {
  return (
    <section
      id="instagram"
      style={{
        position: 'relative',
        width: '100%',
        padding: '80px 24px',
        backgroundColor: '#050505',
        color: '#FFFFFF',
        overflow: 'hidden'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          style={{ marginBottom: '12px' }}
        >
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#D4AF37', fontWeight: 600 }}>
            Social Media Feed
          </span>
        </motion.div>

        <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, margin: '0 0 8px 0' }}>
          Follow Us On Instagram
        </h2>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'inline-block', color: '#F5E6B3', fontSize: '0.95rem', textDecoration: 'none', marginBottom: '40px', fontWeight: 500 }}
        >
          @shreeradhakrishnastudio • <span style={{ textDecoration: 'underline', color: '#D4AF37' }}>Follow For Daily Stories</span>
        </a>

        {/* 6 Tile Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
          {instaPosts.map((post, idx) => (
            <motion.a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ scale: 1.03 }}
              style={{
                position: 'relative',
                aspectRatio: '1',
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'block',
                border: '1px solid rgba(212, 175, 53, 0.2)',
              }}
            >
              <img src={post.imageUrl} alt="Instagram post" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

              {/* Type tag */}
              <div style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '10px', background: 'rgba(8,8,8,0.7)', padding: '3px 8px', borderRadius: '999px', color: '#FFF' }}>
                {post.type === 'reel' ? '🎥 Reel' : '📷 Photo'}
              </div>

              {/* Hover Stats */}
              <div
                className="insta-hover"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(8, 8, 8, 0.75)',
                  backdropFilter: 'blur(4px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '16px',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
              >
                <span style={{ fontSize: '0.85rem', color: '#FFF', fontWeight: 600 }}>❤️ {post.likes}</span>
                <span style={{ fontSize: '0.85rem', color: '#FFF', fontWeight: 600 }}>💬 {post.comments}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default InstagramFeed
