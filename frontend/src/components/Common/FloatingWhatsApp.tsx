import { motion } from 'framer-motion'

export const FloatingWhatsApp = () => {
  return (
    <motion.a
      href="https://wa.me/919460142572?text=Hi%20Shree%20Radha%20Krishna%20Studio,%20I%20would%20like%20to%20inquire%20about%20booking%20a%20shoot."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp with Shree Radha Krishna Studio"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 9999,
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #25D366, #128C7E)',
        boxShadow: '0 8px 25px rgba(37, 211, 102, 0.5), 0 0 15px rgba(255, 255, 255, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF',
        textDecoration: 'none',
        border: '2px solid rgba(255, 255, 255, 0.25)',
        cursor: 'pointer',
      }}
    >
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.205 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.114 4.07 4.148-1.106zm12.981-6.721c-.08-.136-.292-.218-.611-.378-.318-.159-1.884-.93-2.176-1.036-.292-.106-.505-.159-.718.159-.213.318-.823 1.036-1.009 1.249-.186.213-.372.239-.691.08-.318-.159-1.344-.495-2.56-1.58-1.004-.897-1.681-2.004-1.879-2.344-.198-.34-.021-.524.138-.682.143-.143.318-.372.478-.558.159-.186.212-.318.318-.531.106-.213.053-.398-.027-.558-.08-.16-.718-1.728-.984-2.368-.259-.623-.523-.538-.718-.548-.186-.01-.399-.012-.612-.012-.213 0-.558.08-.85.398-.292.318-1.116 1.09-1.116 2.659s1.143 3.08 1.303 3.293c.159.213 2.247 3.43 5.443 4.811.761.329 1.355.526 1.819.673.765.243 1.46.209 2.01.127.613-.091 1.884-.77 2.15-1.513.266-.743.266-1.381.186-1.516z" />
      </svg>
    </motion.a>
  )
}

export default FloatingWhatsApp
