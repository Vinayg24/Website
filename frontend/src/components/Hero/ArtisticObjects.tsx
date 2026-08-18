import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export const ArtisticObject = ({ type = 'lotus', position = [0, 0, 0], scale = 1, color = '#D4AF37', rotationSpeed = 0.01 }: {
  type?: string
  position?: [number, number, number]
  scale?: number
  color?: string
  rotationSpeed?: number
}) => {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed
      meshRef.current.rotation.x += rotationSpeed * 0.5
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 1.5) * 0.1
    }
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[0.8, 16, 16]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.7}
        metalness={0.8}
        roughness={0.2}
        emissive={color}
        emissiveIntensity={0.5}
      />
    </mesh>
  )
}

export const FloatingShape = ({ position = [0, 0, 0], size = 0.5, color = '#F5E6B3' }: {
  position?: [number, number, number]
  size?: number
  color?: string
}) => {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.x = position[0] + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05
      meshRef.current.position.y = position[1] + Math.cos(state.clock.getElapsedTime() * 0.7) * 0.05
      meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.3
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[size, size * 0.3, 8, 16]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.4}
        wireframe={true}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </mesh>
  )
}

export const ParticleSystem = ({ count = 500 }: { count?: number }) => {
  const particlesRef = useRef<THREE.Points>(null!)
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20
  }

  useFrame((state) => {
    if (particlesRef.current) {
      const time = state.clock.getElapsedTime()
      particlesRef.current.position.x = Math.sin(time * 0.1) * 0.5
      particlesRef.current.rotation.y = time * 0.1
    }
  })

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
        opacity={0.3}
        blending={THREE.AdditiveBlending}
        color="#D4AF37"
      />
    </points>
  )
}

export const LotusFlow = () => {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime()
      groupRef.current.rotation.y = time * 0.2
      groupRef.current.children.forEach((child, index) => {
        child.rotation.y = time * 0.3 + index * 0.2
        child.position.y = Math.sin(time * 2 + index) * 0.05
      })
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {Array.from({ length: 12 }).map((_, i) => (
        <ArtisticObject
          key={i}
          type="lotus"
          position={[Math.cos((i * Math.PI) / 6) * 2, Math.sin((i * Math.PI) / 6) * 0.5, 0]}
          scale={0.3 + Math.sin(i) * 0.1}
          color="#D4AF37"
          rotationSpeed={0.02}
        />
      ))}
    </group>
  )
}

export const MandalaRings = () => {
  return (
    <group>
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={i} rotation={[0, 0, Math.PI / 4]}>
          <ringGeometry args={[0.5 + i * 0.3, 0.5 + i * 0.3 + 0.1, 32]} />
          <meshBasicMaterial
            color="#F5E6B3"
            transparent
            opacity={0.2 - i * 0.04}
            wireframe={true}
          />
        </mesh>
      ))}
    </group>
  )
}