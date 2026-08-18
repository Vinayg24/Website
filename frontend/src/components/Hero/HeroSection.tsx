import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// ─────────────────────────────────────────────
// Video playlist (served from /public/videos/)
// ─────────────────────────────────────────────
const VIDEO_PLAYLIST = [
  '/videos/hero-bg1.mp4',
  '/videos/hero-bg2.mp4',
  '/videos/hero-bg3.mp4',
  '/videos/hero-bg4.mp4',
]

const CROSSFADE_DURATION = 1200 // ms

// ─────────────────────────────────────────────
// Makes the Three.js renderer background transparent
// ─────────────────────────────────────────────
const TransparentBackground = () => {
  const { gl } = useThree()
  useEffect(() => {
    gl.setClearColor(0x000000, 0)
    gl.setClearAlpha(0)
  }, [gl])
  return null
}

// ─────────────────────────────────────────────
// Rotating Cinematic Video Background
// Uses double-buffering: two <video> elements fade
// between each other for a seamless crossfade.
// ─────────────────────────────────────────────
const CinematicVideoBackground = () => {
  // Pick a random starting index once on mount
  const startIndex = useRef(Math.floor(Math.random() * VIDEO_PLAYLIST.length))
  const [activeSlot, setActiveSlot] = useState<0 | 1>(0)       // which slot is visible
  const [slotSrc, setSlotSrc] = useState<[string, string]>([
    VIDEO_PLAYLIST[startIndex.current],
    VIDEO_PLAYLIST[(startIndex.current + 1) % VIDEO_PLAYLIST.length],
  ])
  const [slotOpacity, setSlotOpacity] = useState<[number, number]>([1, 0])

  const currentIndexRef = useRef(startIndex.current)
  const isCrossfading = useRef(false)
  const videoRefs = useRef<[HTMLVideoElement | null, HTMLVideoElement | null]>([null, null])
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Advance to next video with crossfade
  const advance = useCallback(() => {
    if (isCrossfading.current) return
    isCrossfading.current = true

    const nextIndex = (currentIndexRef.current + 1) % VIDEO_PLAYLIST.length
    const nextSrc = VIDEO_PLAYLIST[nextIndex]
    const incomingSlot: 0 | 1 = activeSlot === 0 ? 1 : 0

    // Pre-load the incoming video
    setSlotSrc(prev => {
      const updated: [string, string] = [...prev] as [string, string]
      updated[incomingSlot] = nextSrc
      return updated
    })

    // Give the browser a tick to set the src, then play + fade
    requestAnimationFrame(() => {
      const incomingEl = videoRefs.current[incomingSlot]
      if (incomingEl) {
        incomingEl.currentTime = 0
        incomingEl.play().catch(() => {})
      }

      // Fade in incoming, fade out outgoing
      setSlotOpacity(incomingSlot === 0 ? [1, 0] : [0, 1])
      setActiveSlot(incomingSlot)
      currentIndexRef.current = nextIndex

      fadeTimerRef.current = setTimeout(() => {
        // Pause the now-hidden slot to save resources
        const outgoingEl = videoRefs.current[activeSlot]
        if (outgoingEl) outgoingEl.pause()
        isCrossfading.current = false
      }, CROSSFADE_DURATION + 200)
    })
  }, [activeSlot])

  // Attach ended listeners to both video elements
  useEffect(() => {
    const els = videoRefs.current
    const handlers = els.map((el) => {
      if (!el) return null
      const h = () => advance()
      el.addEventListener('ended', h)
      return h
    })
    return () => {
      els.forEach((el, i) => {
        if (el && handlers[i]) el.removeEventListener('ended', handlers[i]!)
      })
    }
  }, [advance])

  // Auto-play slot 0 on mount
  useEffect(() => {
    const el = videoRefs.current[0]
    if (el) el.play().catch(() => {})
    return () => {
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current)
    }
  }, [])

  const sharedVideoStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: `opacity ${CROSSFADE_DURATION}ms ease-in-out`,
    willChange: 'opacity',
  }

  return (
    <>
      {([0, 1] as const).map((slot) => (
        <video
          key={slot}
          ref={(el) => { videoRefs.current[slot] = el }}
          src={slotSrc[slot]}
          muted
          playsInline
          preload="auto"
          loop={false}          // ended event drives rotation; no infinite loop on one clip
          style={{ ...sharedVideoStyle, opacity: slotOpacity[slot], zIndex: 0 }}
        />
      ))}
    </>
  )
}

// ─────────────────────────────────────────────
// Hero Section
// ─────────────────────────────────────────────
export const HeroSection = () => {
  const [showContent] = useState(true)

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', backgroundColor: '#080808' }}>

      {/* ── LAYER 1: Rotating Cinematic Background Videos ── */}
      <CinematicVideoBackground />

      {/* ── LAYER 2: Subtle Dark Gradient Overlay (40–50% opacity) ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: 'linear-gradient(135deg, rgba(8,8,8,0.5) 0%, rgba(8,8,8,0.38) 50%, rgba(8,8,8,0.55) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── LAYER 3: Transparent Three.js 3D Canvas ── */}
      <Canvas
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 2 }}
        camera={{ position: [0, 0, 10], fov: 50, near: 0.1, far: 100 }}
        gl={{ alpha: true, antialias: true, premultipliedAlpha: false }}
        shadows
        dpr={[1, Math.min(window.devicePixelRatio, 2)]}
      >
        <TransparentBackground />
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.5}
          castShadow
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          maxDistance={15}
          minDistance={8}
          dampingFactor={0.1}
          autoRotate={false}
          rotateSpeed={0.2}
        />

        <BackgroundParticles />
        <FloatingLotus />
        <AbstractGeometricShapes />
        <MandalaRing />
        <GlassCards />
      </Canvas>

      {/* ── LAYER 4: Hero Text Content ── */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 30 }}>
        <div style={{ textAlign: 'center', padding: '0 16px', pointerEvents: 'auto' }}>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: showContent ? 1 : 0,
              y: showContent ? 0 : 50
            }}
            transition={{ delay: 0.8, duration: 1, type: 'spring', stiffness: 300 }}
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              lineHeight: 1.1,
              color: '#FFFFFF',
              textShadow: '0 0 20px rgba(212, 175, 53, 0.3)',
              letterSpacing: '-0.02em',
              background: 'linear-gradient(90deg, #FFFFFF 30%, #D4AF37 50%, #F5E6B3 70%, #FFFFFF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1.2rem'
            }}
          >
            Shree Radha Krishna Studio
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: showContent ? 1 : 0,
              y: showContent ? 0 : 30
            }}
            transition={{ delay: 1.2, duration: 0.8 }}
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 300,
              lineHeight: 1.6,
              color: '#F5E6B3',
              maxWidth: '680px',
              letterSpacing: '0.5px',
              margin: '0 auto 2.5rem auto'
            }}
          >
            Capturing Timeless Stories &amp; Cinematic Elegance — Luxury Wedding Films, Candid Moments &amp; Editorial Campaigns
          </motion.p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: showContent ? 1 : 0,
                scale: showContent ? 1 : 0.8
              }}
              transition={{ delay: 1.6, duration: 0.6, type: 'spring' }}
              whileHover={{ scale: 1.05, boxShadow: '0 15px 35px rgba(212, 175, 53, 0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/portfolio"
                style={{
                  padding: '0.85rem 1.75rem',
                  minHeight: '44px',
                  borderRadius: '0.75rem',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #D4AF37, #F5E6B3)',
                  color: '#080808',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 30px rgba(212, 175, 53, 0.4)'
                }}
              >
                View Our Work
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: showContent ? 1 : 0,
                scale: showContent ? 1 : 0.8
              }}
              transition={{ delay: 1.8, duration: 0.6, type: 'spring' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/contact"
                style={{
                  padding: '0.85rem 1.75rem',
                  minHeight: '44px',
                  borderRadius: '0.75rem',
                  fontWeight: 600,
                  background: 'transparent',
                  color: '#FFFFFF',
                  border: '2px solid rgba(212, 175, 53, 0.5)',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)'
                }}
              >
                Book Your Shoot
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Three.js Scene Components (unchanged)
// ─────────────────────────────────────────────

const BackgroundParticles = () => {
  const particlesRef = useRef<THREE.Points>(null!)
  const count = 200

  useFrame((state) => {
    if (particlesRef.current) {
      const elapsed = state.clock.getElapsedTime()
      particlesRef.current.rotation.y = elapsed * 0.02
      particlesRef.current.position.x = Math.sin(elapsed * 0.1) * 0.5
    }
  })

  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 50
    positions[i * 3 + 1] = (Math.random() - 0.5) * 30
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        color="#D4AF37"
      />
    </points>
  )
}

const FloatingLotus = () => {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (groupRef.current) {
      const elapsed = state.clock.getElapsedTime()
      groupRef.current.rotation.y = elapsed * 0.15

      groupRef.current.children.forEach((child, index) => {
        const offset = index * 0.5
        child.position.y = Math.sin(elapsed * 0.8 + offset) * 0.3
      })
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} rotation={[0, (Math.PI / 4) * i, 0]} position={[Math.cos((i * Math.PI) / 4) * 3, 0, Math.sin((i * Math.PI) / 4) * 3]}>
          <sphereGeometry args={[0.6, 12, 8]} />
          <meshStandardMaterial
            color="#D4AF37"
            metalness={0.8}
            roughness={0.2}
            emissive="#D4AF37"
            emissiveIntensity={0.3}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  )
}

const AbstractGeometricShapes = () => {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (groupRef.current) {
      const elapsed = state.clock.getElapsedTime()
      groupRef.current.rotation.y = elapsed * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.sin(i) * 4,
            Math.cos(i * 0.5) * 2,
            Math.sin(i * 0.8) * 4
          ]}
        >
          <octahedronGeometry args={[0.4]} />
          <meshPhysicalMaterial
            color="#F5E6B3"
            metalness={0.9}
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            transparent
            opacity={0.6}
            emissive="#F5E6B3"
            emissiveIntensity={0.1}
          />
        </mesh>
      ))}
    </group>
  )
}

const MandalaRing = () => {
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      {Array.from({ length: 4 }).map((_, i) => (
        <mesh key={i} rotation={[0, 0, Math.PI * i * 0.1]}>
          <ringGeometry args={[1.2 + i * 0.3, 1.2 + i * 0.3 + 0.15, 32]} />
          <meshBasicMaterial
            color="#D4AF37"
            transparent
            opacity={0.15 - i * 0.02}
            wireframe={true}
          />
        </mesh>
      ))}
    </group>
  )
}

const GlassCards = () => {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (groupRef.current) {
      const elapsed = state.clock.getElapsedTime()
      groupRef.current.rotation.y = elapsed * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {Array.from({ length: 3 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i * Math.PI) / 1.5) * 4,
            Math.sin(i) * 1.5,
            Math.sin((i * Math.PI) / 1.5) * 4
          ]}
          rotation={[0, (i * Math.PI) / 3, 0]}
        >
          <boxGeometry args={[1.2, 0.8, 0.2]} />
          <meshStandardMaterial
            color="#FFFFFF"
            metalness={0.1}
            roughness={0.2}
            transparent
            opacity={0.15}
          />
        </mesh>
      ))}
    </group>
  )
}

export default HeroSection