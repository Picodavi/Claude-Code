"use client";

import { useFrame } from "@react-three/fiber";
import type { MotionValue } from "framer-motion";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { SceneQuality } from "./quality";

type StudioSceneProps = {
  progress: MotionValue<number>;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  pointerEnabled: boolean;
  quality: SceneQuality;
};

const EMERALD = "#1f7655";
const LICHEN = "#c4dc7d";

function DepthRings({ quality }: { quality: SceneQuality }) {
  const rings = quality === "high" ? 7 : quality === "medium" ? 5 : 4;

  return (
    <group rotation={[0.04, 0.02, -0.08]}>
      {Array.from({ length: rings }, (_, index) => {
        const scale = 1 + index * 0.34;
        return (
          <mesh
            key={index}
            position={[0, 0, -0.7 - index * 0.72]}
            scale={[1.28 * scale, scale, 1]}
          >
            <torusGeometry
              args={[2.05, 0.018 + index * 0.004, 8, quality === "low" ? 48 : 96]}
            />
            <meshBasicMaterial
              color={index % 2 === 0 ? LICHEN : EMERALD}
              transparent
              opacity={Math.max(0.08, 0.32 - index * 0.035)}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function LightField({ quality }: { quality: SceneQuality }) {
  const count = quality === "high" ? 150 : quality === "medium" ? 76 : 32;
  const positions = useMemo(() => {
    const values = new Float32Array(count * 3);
    let seed = 19;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    for (let index = 0; index < count; index += 1) {
      values[index * 3] = (random() - 0.5) * 15;
      values[index * 3 + 1] = (random() - 0.5) * 9;
      values[index * 3 + 2] = -random() * 10 + 2;
    }
    return values;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={LICHEN}
        size={quality === "low" ? 0.024 : 0.036}
        transparent
        opacity={0.48}
        sizeAttenuation
      />
    </points>
  );
}

function LightRibbons({ quality }: { quality: SceneQuality }) {
  if (quality === "low") return null;

  return (
    <group rotation={[0, 0, -0.16]}>
      {[-2.2, 2.1].map((y, index) => (
        <mesh key={y} position={[0, y, -2.5]} rotation={[0, 0, index ? -0.05 : 0.05]}>
          <planeGeometry args={[10, 0.028]} />
          <meshBasicMaterial
            color={index ? EMERALD : LICHEN}
            transparent
            opacity={0.18}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

export function StudioScene({
  progress,
  pointerX,
  pointerY,
  pointerEnabled,
  quality,
}: StudioSceneProps) {
  const rig = useRef<THREE.Group>(null);
  const rings = useRef<THREE.Group>(null);
  const lights = useRef<THREE.Group>(null);
  const ribbons = useRef<THREE.Group>(null);

  useFrame(({ camera, size }, delta) => {
    const p = progress.get();
    const px = pointerEnabled ? pointerX.get() : 0;
    const py = pointerEnabled ? pointerY.get() : 0;
    const compact = size.width < 900;
    const anchorX = compact ? 0 : 1.65;
    const cameraTargetZ = 7.8 - p * 2.25;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, px * 0.12, 4.2, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, 0.05 + py * 0.08 - p * 0.05, 4.2, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, cameraTargetZ, 4.2, delta);
    camera.lookAt(anchorX * 0.34, 0.04, -1.2);

    if (rig.current) {
      rig.current.position.x = THREE.MathUtils.damp(
        rig.current.position.x,
        anchorX + px * 0.1,
        4,
        delta,
      );
      rig.current.position.y = THREE.MathUtils.damp(
        rig.current.position.y,
        Math.sin(p * Math.PI) * 0.12 - py * 0.05,
        4,
        delta,
      );
      rig.current.rotation.x = THREE.MathUtils.damp(
        rig.current.rotation.x,
        -0.02 - py * 0.018,
        4,
        delta,
      );
    }
    if (rings.current) rings.current.rotation.z = p * 0.28 + px * 0.025;
    if (lights.current) {
      lights.current.rotation.y += delta * 0.024;
      lights.current.position.z = p * 0.9;
    }
    if (ribbons.current) ribbons.current.rotation.z = -p * 0.08;
  });

  return (
    <>
      <fog attach="fog" args={["#062219", 6, 16]} />
      <ambientLight intensity={0.72} />
      <pointLight position={[4, 1, 4]} color="#79e2ac" intensity={3.5} distance={10} />

      <group ref={rig}>
        <group ref={rings}><DepthRings quality={quality} /></group>
        <group ref={lights}><LightField quality={quality} /></group>
        <group ref={ribbons}><LightRibbons quality={quality} /></group>
      </group>
    </>
  );
}
