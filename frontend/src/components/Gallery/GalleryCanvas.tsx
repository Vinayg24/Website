import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const FloatingApertureLens = () => {
  const meshRef = useRef<THREE.Mesh>(null!)
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      meshRef.current.rotation.y += 0.005
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <torusGeometry args={[3.2, 0.25, 30, 200]} />
      <meshPhysicalMaterial
        color="#D4AF37"
        metalness={0.95}
        roughness={0.1}
        clearcoat={1}
        clearcoatRoughness={0.1}
        emissive="#D4AF37"
        emissiveIntensity={0.3}
        wireframe={true}
      />
    </mesh>
  )
}

const CameraLensesMesh = () => {
  const groupRef = useRef<THREE.Group>(null!)
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.08
    }
  })

  return (
    <group ref={groupRef}>
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[
          Math.cos(i * Math.PI / 4) * 8,
          (i % 2 === 0 ? 1 : -1) * 2,
          Math.sin(i * Math.PI / 4) * 8
        ]}>
          <octahedronGeometry args={[0.8]} />
          <meshPhysicalMaterial
            color="#D4AF37"
            metalness={0.9}
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            transparent
            opacity={0.15}
            emissive="#D4AF37"
            emissiveIntensity={0.2}
            wireframe={true}
          />
        </mesh>
      ))}
    </group>
  )
}

export const GalleryCanvas = () => {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.45 }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#D4AF37" />
        <FloatingApertureLens />
        <CameraLensesMesh />
      </Canvas>
    </div>
  )
}

export default GalleryCanvas
