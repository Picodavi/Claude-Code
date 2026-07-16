"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Dibuja una "web" en un canvas 2D para usarla como pantalla del portátil.
function makeScreenTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 720;
  c.height = 450;
  const x = c.getContext("2d")!;
  // fondo
  x.fillStyle = "#ffffff";
  x.fillRect(0, 0, 720, 450);
  // barra de navegador
  x.fillStyle = "#efeae0";
  x.fillRect(0, 0, 720, 46);
  const dots = ["#DE8E29", "#15533B", "#c9c2b5"];
  dots.forEach((col, i) => {
    x.fillStyle = col;
    x.beginPath();
    x.arc(28 + i * 24, 23, 7, 0, Math.PI * 2);
    x.fill();
  });
  x.fillStyle = "#ffffff";
  x.fillRect(120, 12, 520, 22);
  // hero de la web
  x.fillStyle = "#15533B";
  x.fillRect(0, 46, 720, 210);
  x.fillStyle = "#ffffff";
  x.font = "800 40px sans-serif";
  x.fillText("Tu negocio,", 44, 130);
  x.fillText("online.", 44, 178);
  x.fillStyle = "#DE8E29";
  x.fillRect(44, 200, 150, 34);
  // tarjetas de contenido
  x.fillStyle = "#e7e1d7";
  [44, 290, 536].forEach((px) => {
    x.fillRect(px, 286, 140, 120);
  });
  x.fillStyle = "#DE8E29";
  [44, 290, 536].forEach((px) => {
    x.fillRect(px + 16, 302, 40, 10);
  });
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function Laptop() {
  const g = useRef<THREE.Group>(null);
  const screenTex = useMemo(() => makeScreenTexture(), []);

  useFrame((state) => {
    if (!g.current) return;
    const scroll = typeof window !== "undefined" ? window.scrollY : 0;
    g.current.rotation.y = -0.35 + state.pointer.x * 0.25 + scroll * 0.0006;
    g.current.rotation.x = 0.08 + state.pointer.y * -0.12;
    g.current.position.y = -0.2 + Math.sin(state.clock.elapsedTime * 0.8) * 0.12;
  });

  const body = (
    <meshStandardMaterial color="#2a2622" roughness={0.35} metalness={0.55} />
  );

  return (
    <group ref={g} rotation={[0.08, -0.35, 0]} scale={1.05}>
      {/* base / teclado */}
      <mesh position={[0, -0.82, 0]}>
        <boxGeometry args={[3.7, 0.16, 2.4]} />
        {body}
      </mesh>
      {/* trackpad */}
      <mesh position={[0, -0.735, 0.55]}>
        <boxGeometry args={[1.1, 0.02, 0.75]} />
        <meshStandardMaterial color="#3a352f" roughness={0.5} metalness={0.3} />
      </mesh>
      {/* tapa con bisagra en el borde trasero */}
      <group position={[0, -0.74, -1.2]} rotation={[-1.92, 0, 0]}>
        <mesh position={[0, 1.15, 0]}>
          <boxGeometry args={[3.7, 2.3, 0.1]} />
          {body}
        </mesh>
        {/* pantalla con la web */}
        <mesh position={[0, 1.15, 0.055]}>
          <planeGeometry args={[3.4, 2.05]} />
          <meshBasicMaterial map={screenTex} toneMapped={false} />
        </mesh>
      </group>
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
      camera={{ position: [0, 0, 6.2], fov: 42 }}
      dpr={[1, 2]}
      frameloop="always"
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 4, 5]} intensity={2} />
      <directionalLight position={[-4, 1, 2]} intensity={0.8} color="#DE8E29" />
      <pointLight position={[0, 2, 5]} intensity={30} color="#ffffff" />
      <Laptop />
    </Canvas>
  );
}
