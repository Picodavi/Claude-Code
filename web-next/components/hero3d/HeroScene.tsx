"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

type Ball = {
  pos: [number, number, number];
  r: number;
  color: string;
  rough: number;
  metal: number;
  squash?: number;
};

// Objetos flotantes estilo "landing 3D": esferas y guijarros suaves, cálidos.
const BALLS: Ball[] = [
  { pos: [0, 0.1, 0], r: 1.15, color: "#16130e", rough: 0.35, metal: 0.15 },
  { pos: [1.9, 1.2, 0.6], r: 0.55, color: "#DE8E29", rough: 0.3, metal: 0.2 },
  { pos: [-2.1, 0.9, 0.3], r: 0.42, color: "#f5f3ee", rough: 0.45, metal: 0.05 },
  { pos: [1.5, -1.3, 0.4], r: 0.7, color: "#15533B", rough: 0.35, metal: 0.15 },
  { pos: [-1.7, -1.2, 0.5], r: 0.5, color: "#B9701A", rough: 0.3, metal: 0.2 },
  { pos: [2.4, -0.2, -0.6], r: 0.34, color: "#16130e", rough: 0.4, metal: 0.1 },
  { pos: [-2.6, -0.1, -0.4], r: 0.3, color: "#DE8E29", rough: 0.3, metal: 0.2 },
  { pos: [0.4, 1.9, -0.5], r: 0.26, color: "#f5f3ee", rough: 0.5, metal: 0.05 },
  { pos: [0.8, -2, -0.3], r: 0.6, color: "#16130e", rough: 0.35, metal: 0.15, squash: 0.4 },
  { pos: [-0.6, 1.4, 0.8], r: 0.22, color: "#15533B", rough: 0.35, metal: 0.15 },
];

function Cluster() {
  const g = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!g.current) return;
    const scroll = typeof window !== "undefined" ? window.scrollY : 0;
    g.current.rotation.y = scroll * 0.0012 + state.clock.elapsedTime * 0.1;
    g.current.rotation.x = state.pointer.y * 0.15 + scroll * 0.0004;
    g.current.rotation.z = state.pointer.x * 0.08;
    g.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.1;
  });

  return (
    <group ref={g}>
      {BALLS.map((b, i) => (
        <mesh key={i} position={b.pos} scale={b.squash ? [1, b.squash, 1] : 1}>
          <sphereGeometry args={[b.r, 48, 48]} />
          <meshStandardMaterial color={b.color} roughness={b.rough} metalness={b.metal} />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroScene() {
  useEffect(() => {
    const ping = () => window.dispatchEvent(new Event("resize"));
    const timers = [80, 250, 600].map((ms) => window.setTimeout(ping, ms));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 42 }}
      dpr={[1, 2]}
      frameloop="always"
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.85} />
      <directionalLight position={[3, 4, 5]} intensity={2} />
      <directionalLight position={[-4, -2, 2]} intensity={0.7} color="#DE8E29" />
      <pointLight position={[-5, 3, 4]} intensity={40} color="#ffffff" />
      <Cluster />
    </Canvas>
  );
}
