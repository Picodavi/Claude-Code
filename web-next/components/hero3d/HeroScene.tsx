"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Grupo de formas (pino + oro) que gira con el scroll, con giro propio suave
// y una ligera inclinación hacia el cursor.
function Cluster() {
  const g = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!g.current) return;
    const scroll = typeof window !== "undefined" ? window.scrollY : 0;
    g.current.rotation.y = scroll * 0.0016 + state.clock.elapsedTime * 0.14;
    g.current.rotation.x =
      scroll * 0.0009 + state.pointer.y * 0.18 + Math.sin(state.clock.elapsedTime * 0.6) * 0.05;
    g.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.12;
  });

  return (
    <group ref={g}>
      <mesh>
        <torusKnotGeometry args={[1, 0.33, 180, 32]} />
        <meshStandardMaterial color="#15533B" roughness={0.22} metalness={0.55} />
      </mesh>
      <mesh position={[1.9, 1.15, 0.4]}>
        <icosahedronGeometry args={[0.52, 0]} />
        <meshStandardMaterial color="#DE8E29" roughness={0.18} metalness={0.6} flatShading />
      </mesh>
      <mesh position={[-2, -1.05, 0.3]}>
        <icosahedronGeometry args={[0.34, 0]} />
        <meshStandardMaterial color="#0F3F2D" roughness={0.3} metalness={0.45} flatShading />
      </mesh>
      <mesh position={[1.5, -1.35, -0.4]}>
        <sphereGeometry args={[0.3, 48, 48]} />
        <meshStandardMaterial color="#DE8E29" roughness={0.12} metalness={0.7} />
      </mesh>
      <mesh position={[-1.7, 1.3, -0.6]}>
        <sphereGeometry args={[0.22, 48, 48]} />
        <meshStandardMaterial color="#f5f3ee" roughness={0.5} metalness={0.1} />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  // R3F a veces mide 0 al montar; forzamos re-medida.
  useEffect(() => {
    const ping = () => window.dispatchEvent(new Event("resize"));
    const timers = [80, 250, 600].map((ms) => window.setTimeout(ping, ms));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 42 }}
      dpr={[1, 2]}
      frameloop="always"
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 5, 5]} intensity={1.6} />
      <pointLight position={[-5, 2, 3]} intensity={55} color="#DE8E29" />
      <pointLight position={[4, -2, 4]} intensity={32} color="#15533B" />
      <Cluster />
    </Canvas>
  );
}
