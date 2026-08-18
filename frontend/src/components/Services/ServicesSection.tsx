import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { servicesData, ServiceItem } from '../../data/servicesData'

export const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null)

  return (
    <section id="services" className="services-section">
      {/* 3D Golden Particle Background */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.35 }}>
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <ServicesBackgroundParticles />
        </Canvas>
      </div>

      <div className="services-container">
        {/* Header */}
        <div className="services-header">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="services-badge"
          >
            <span className="services-badge-dot" />
            <span className="services-badge-text">Our Master Offerings</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="services-title"
          >
            Bespoke Art Services & Expressions
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="services-subtitle"
          >
            Custom private commissions, sanctuary murals, and gallery-wrapped canvases crafted with spiritual reverence and 3D precision.
          </motion.p>
        </div>

        {/* 3-Column Grid */}
        <div className="services-grid">
          {servicesData.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              onLearnMore={() => setSelectedService(service)}
            />
          ))}
        </div>
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <ServiceModal
            service={selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

// 3D Glassmorphic Card with Interactive R3F Canvas background
const ServiceCard = ({
  service,
  index,
  onLearnMore
}: {
  service: ServiceItem
  index: number
  onLearnMore: () => void
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5

    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseEnter = () => setIsHovered(true)

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.5, delay: index * 0.08, type: 'spring', stiffness: 220 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
        className="service-card"
      >
        {/* Interactive 3D Canvas in Card Top-Right */}
        <div className="service-card-3d-bg">
          <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[3, 3, 3]} intensity={1.2} />
            <Card3DObject type={service.icon} isHovered={isHovered} />
          </Canvas>
        </div>

        {/* Card Content Layer with 3D Pop Out */}
        <div className="service-card-content">
          {/* Top Tag & Timeline */}
          <div className="service-card-top">
            <span className="service-tag">{service.tag}</span>
            <span className="service-timeline">{service.timeline}</span>
          </div>

          {/* Glowing 3D Icon Box */}
          <motion.div
            animate={{ rotate: isHovered ? 360 : 0, scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="service-icon-box"
          >
            <ServiceIcon name={service.icon} />
          </motion.div>

          {/* Typography */}
          <h3 className="service-card-title">{service.title}</h3>
          <p className="service-card-sub">{service.subtitle}</p>
          <p className="service-card-desc">{service.description}</p>
        </div>

        {/* Action Button */}
        <div>
          <button onClick={onLearnMore} className="service-btn">
            <span>Learn More</span>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Micro 3D Object Component rendered inside each card canvas
const Card3DObject = ({ type, isHovered }: { type: string; isHovered: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      const speed = isHovered ? 0.04 : 0.015
      meshRef.current.rotation.y += speed
      meshRef.current.rotation.x += speed * 0.6
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 2) * 0.08
    }
  })

  switch (type) {
    case 'palette':
      return (
        <mesh ref={meshRef}>
          <torusKnotGeometry args={[0.5, 0.16, 64, 16]} />
          <meshPhysicalMaterial
            color="#D4AF37"
            metalness={0.9}
            roughness={0.1}
            clearcoat={1}
            emissive="#D4AF37"
            emissiveIntensity={0.2}
          />
        </mesh>
      )
    case 'brush':
      return (
        <mesh ref={meshRef}>
          <octahedronGeometry args={[0.65]} />
          <meshPhysicalMaterial
            color="#F5E6B3"
            metalness={0.85}
            roughness={0.15}
            clearcoat={1}
            wireframe={true}
          />
        </mesh>
      )
    case 'frame':
      return (
        <mesh ref={meshRef}>
          <boxGeometry args={[0.9, 0.7, 0.2]} />
          <meshPhysicalMaterial
            color="#D4AF37"
            metalness={0.9}
            roughness={0.1}
            emissive="#D4AF37"
            emissiveIntensity={0.15}
          />
        </mesh>
      )
    case 'sun':
      return (
        <mesh ref={meshRef}>
          <ringGeometry args={[0.3, 0.65, 32]} />
          <meshStandardMaterial
            color="#D4AF37"
            wireframe={true}
            emissive="#D4AF37"
            emissiveIntensity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      )
    case 'layout':
      return (
        <mesh ref={meshRef}>
          <dodecahedronGeometry args={[0.6]} />
          <meshPhysicalMaterial
            color="#F5E6B3"
            metalness={0.75}
            roughness={0.2}
            clearcoat={1}
          />
        </mesh>
      )
    case 'sparkles':
    default:
      return (
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[0.6, 1]} />
          <meshPhysicalMaterial
            color="#D4AF37"
            metalness={0.95}
            roughness={0.05}
            emissive="#D4AF37"
            emissiveIntensity={0.25}
          />
        </mesh>
      )
  }
}

// Icon Component
const ServiceIcon = ({ name }: { name: string }) => {
  switch (name) {
    case 'camera':
      return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    case 'film':
      return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
        </svg>
      )
    case 'heart':
      return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    case 'palette':
      return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    case 'brush':
      return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      )
    case 'frame':
      return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    case 'sun':
      return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    case 'layout':
      return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      )
    case 'sparkles':
      return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    default:
      return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      )
  }
}

// Modal
const ServiceModal = ({
  service,
  onClose
}: {
  service: ServiceItem
  onClose: () => void
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="service-modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        backgroundColor: 'rgba(5, 5, 5, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)'
      }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '520px',
          borderRadius: '16px',
          padding: '24px',
          background: 'linear-gradient(135deg, rgba(25, 25, 25, 0.95), rgba(12, 12, 12, 0.98))',
          border: '1px solid rgba(212, 175, 53, 0.3)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)'
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close service modal"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '32px',
            height: '32px',
            minWidth: '32px',
            minHeight: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            background: 'rgba(212, 175, 53, 0.1)',
            border: '1px solid rgba(212, 175, 53, 0.2)',
            color: '#F5E6B3',
            cursor: 'pointer'
          }}
        >
          ✕
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
          <div className="service-icon-box" style={{ margin: 0 }}>
            <ServiceIcon name={service.icon} />
          </div>
          <div>
            <h3 id="service-modal-title" style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: 700, color: '#FFFFFF' }}>{service.title}</h3>
            <p style={{ fontSize: '11px', color: '#D4AF37', fontWeight: 500 }}>{service.subtitle}</p>
          </div>
        </div>

        <p style={{ fontSize: '12px', color: '#D0D0D0', lineHeight: 1.6, marginBottom: '16px', fontWeight: 300 }}>
          {service.fullDescription}
        </p>

        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#F5E6B3', fontWeight: 600, marginBottom: '8px' }}>
            Service Highlights & Offerings
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            {service.features.map((feature, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  color: '#E0E0E0',
                  background: 'rgba(212, 175, 53, 0.05)',
                  border: '1px solid rgba(212, 175, 53, 0.12)'
                }}
              >
                <span style={{ color: '#D4AF37', fontSize: '9px' }}>✦</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <div style={{ fontSize: '11px', color: '#999999' }}>
            <span>Turnaround: </span>
            <span style={{ color: '#F5E6B3', fontWeight: 500 }}>{service.timeline}</span>
          </div>

          <Link
            to="/contact"
            onClick={onClose}
            style={{
              padding: '10px 20px',
              minHeight: '44px',
              borderRadius: '6px',
              fontWeight: 600,
              fontSize: '12px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #D4AF37, #F5E6B3)',
              color: '#080808'
            }}
          >
            Inquire About This Service
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Background Particles
const ServicesBackgroundParticles = () => {
  const pointsRef = useRef<THREE.Points>(null!)
  const count = 150

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime()
      pointsRef.current.rotation.y = time * 0.03
      pointsRef.current.rotation.x = Math.sin(time * 0.02) * 0.1
    }
  })

  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 30
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 30
  }

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        sizeAttenuation
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
        color="#D4AF37"
      />
    </points>
  )
}

export default ServicesSection
