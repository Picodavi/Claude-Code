"use client";

import { Suspense, useMemo, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Float,
  PresentationControls,
  RoundedBox,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";
import coverImg from "@/assets/xalet-cover.jpg";

// La "pantalla" del dispositivo: un plano con la captura real de la web.
function Screen() {
  const tex = useTexture(coverImg.src);
  useMemo(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
  }, [tex]);
  return (
    <mesh position={[0, 0, 0.09]}>
      <planeGeometry args={[3.62, 2.26]} />
      <meshBasicMaterial map={tex} toneMapped={false} />
    </mesh>
  );
}

// Dispositivo 3D: marco redondeado (verde pino) + pantalla con la web.
function Device() {
  return (
    <group rotation={[0, 0, 0]}>
      <RoundedBox args={[3.9, 2.5, 0.16]} radius={0.09} smoothness={6}>
        <meshStandardMaterial
          color="#0F3F2D"
          roughness={0.35}
          metalness={0.15}
        />
      </RoundedBox>
      <Suspense fallback={null}>
        <Screen />
      </Suspense>
      {/* piecita dorada (detalle de marca) */}
      <mesh position={[0, -1.4, 0.05]}>
        <boxGeometry args={[0.9, 0.09, 0.09]} />
        <meshStandardMaterial color="#DE8E29" roughness={0.3} metalness={0.4} />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  // R3F a veces mide 0 al montar (tras el swap del póster); forzamos re-medida.
  useEffect(() => {
    const ping = () => window.dispatchEvent(new Event("resize"));
    const timers = [80, 250, 600].map((ms) => window.setTimeout(ping, ms));
    return () => timers.forEach(clearTimeout);
  }, []);
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 40 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 5, 5]} intensity={1.4} />
      <pointLight position={[-5, 2, 3]} intensity={40} color="#DE8E29" />
      <pointLight position={[4, -2, 4]} intensity={22} color="#15533B" />
      <Suspense fallback={null}>
        <PresentationControls
          global
          cursor
          polar={[-0.25, 0.25]}
          azimuth={[-0.5, 0.5]}
          speed={1.4}
          damping={0.2}
          snap
        >
          <Float rotationIntensity={0.5} floatIntensity={0.7} speed={2}>
            <Device />
          </Float>
        </PresentationControls>
      </Suspense>
    </Canvas>
  );
}
