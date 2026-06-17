'use client'
import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial, Float, Stars, Environment, Torus } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'
import { Vector2 } from 'three'

function GlassOrb() {
  const meshRef = useRef()
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.15
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.1
    }
  })
  return (
    <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.6, 10]} />
        <MeshTransmissionMaterial
          backside
          backsideThickness={0.4}
          samples={12}
          thickness={0.6}
          chromaticAberration={0.08}
          transmission={1}
          roughness={0.02}
          ior={1.6}
          color="#2563EB"
          envMapIntensity={1.2}
        />
      </mesh>
    </Float>
  )
}

function RingAccent() {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = clock.getElapsedTime() * 0.08
      ref.current.rotation.z = clock.getElapsedTime() * 0.12
    }
  })
  return (
    <mesh ref={ref}>
      <Torus args={[2.4, 0.012, 16, 120]}>
        <meshBasicMaterial color="#4f46e5" transparent opacity={0.35} />
      </Torus>
    </mesh>
  )
}

function RingAccent2() {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.1
      ref.current.rotation.x = Math.PI / 3 + clock.getElapsedTime() * 0.05
    }
  })
  return (
    <mesh ref={ref}>
      <Torus args={[3.0, 0.008, 16, 120]}>
        <meshBasicMaterial color="#2563EB" transparent opacity={0.2} />
      </Torus>
    </mesh>
  )
}

function SceneContent() {
  return (
    <>
      <color attach="background" args={['#060606']} />
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#2563EB" />
      <pointLight position={[-10, -10, -5]} intensity={0.8} color="#4f46e5" />
      <Stars radius={80} depth={60} count={2500} factor={3} saturation={0} fade speed={0.6} />
      <Environment preset="city" />
      <GlassOrb />
      <RingAccent />
      <RingAccent2 />
      <EffectComposer>
        <Bloom luminanceThreshold={0.15} intensity={1.4} mipmapBlur radius={0.6} />
        <ChromaticAberration offset={new Vector2(0.0008, 0.0008)} />
      </EffectComposer>
    </>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 42 }}
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 1.5]}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </Canvas>
  )
}
