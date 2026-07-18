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

const PINE = "#0d3d2d";
const EMERALD = "#1f7655";
const LICHEN = "#c4dc7d";
const WARM = "#f7f2e7";

function WebsitePortal({ quality }: { quality: SceneQuality }) {
  const showDetails = quality !== "low";

  return (
    <group>
      <mesh position={[0, 0, -0.09]}>
        <boxGeometry args={[3.8, 2.48, 0.16]} />
        <meshStandardMaterial color="#061e17" roughness={0.34} metalness={0.36} />
      </mesh>
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[3.56, 2.23]} />
        <meshBasicMaterial color={WARM} />
      </mesh>

      <mesh position={[0, 0.91, 0.04]}>
        <planeGeometry args={[3.56, 0.4]} />
        <meshBasicMaterial color="#dfe7d7" />
      </mesh>
      {[-1.53, -1.38, -1.23].map((x, index) => (
        <mesh key={x} position={[x, 0.91, 0.065]}>
          <circleGeometry args={[0.045, 16]} />
          <meshBasicMaterial color={index === 0 ? LICHEN : index === 1 ? EMERALD : "#a9b2a4"} />
        </mesh>
      ))}
      <mesh position={[0.35, 0.91, 0.065]}>
        <planeGeometry args={[1.65, 0.12]} />
        <meshBasicMaterial color="#f8faf2" />
      </mesh>

      <mesh position={[-0.78, 0.13, 0.055]}>
        <planeGeometry args={[2, 1.15]} />
        <meshBasicMaterial color={PINE} />
      </mesh>
      <mesh position={[-1.2, 0.43, 0.08]}>
        <planeGeometry args={[0.86, 0.11]} />
        <meshBasicMaterial color={WARM} />
      </mesh>
      <mesh position={[-1.12, 0.2, 0.08]}>
        <planeGeometry args={[1.02, 0.11]} />
        <meshBasicMaterial color={WARM} />
      </mesh>
      <mesh position={[-1.37, -0.11, 0.08]}>
        <planeGeometry args={[0.52, 0.19]} />
        <meshBasicMaterial color={LICHEN} />
      </mesh>

      <mesh position={[0.85, 0.26, 0.07]} rotation={[0, 0, -0.08]}>
        <planeGeometry args={[1.05, 0.83]} />
        <meshBasicMaterial color="#d8e4cf" />
      </mesh>
      <mesh position={[0.85, 0.26, 0.085]} rotation={[0, 0, -0.08]}>
        <circleGeometry args={[0.25, showDetails ? 48 : 20]} />
        <meshBasicMaterial color={EMERALD} />
      </mesh>

      {showDetails && [-1.08, 0, 1.08].map((x, index) => (
        <group key={x} position={[x, -0.7, 0.07]}>
          <mesh>
            <planeGeometry args={[0.9, 0.37]} />
            <meshBasicMaterial color={index === 1 ? "#e2eadb" : "#edf0e7"} />
          </mesh>
          <mesh position={[-0.22, 0.06, 0.012]}>
            <planeGeometry args={[0.32, 0.045]} />
            <meshBasicMaterial color={index === 1 ? EMERALD : "#829787"} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function PortalRings({ quality }: { quality: SceneQuality }) {
  const rings = quality === "high" ? 5 : quality === "medium" ? 4 : 3;
  return (
    <group rotation={[0.02, 0, 0.04]}>
      {Array.from({ length: rings }, (_, index) => {
        const scale = 1 + index * 0.28;
        return (
          <mesh key={index} position={[0, 0, -0.6 - index * 0.58]} scale={[1.25 * scale, scale, 1]}>
            <torusGeometry args={[2.05, 0.025 + index * 0.004, 8, quality === "low" ? 48 : 96]} />
            <meshBasicMaterial
              color={index % 2 === 0 ? LICHEN : EMERALD}
              transparent
              opacity={0.34 - index * 0.035}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function LightField({ quality }: { quality: SceneQuality }) {
  const count = quality === "high" ? 110 : quality === "medium" ? 58 : 24;
  const positions = useMemo(() => {
    const values = new Float32Array(count * 3);
    let seed = 19;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    for (let index = 0; index < count; index += 1) {
      values[index * 3] = (random() - 0.5) * 12;
      values[index * 3 + 1] = (random() - 0.5) * 7;
      values[index * 3 + 2] = -random() * 7 + 1;
    }
    return values;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={LICHEN} size={quality === "low" ? 0.025 : 0.035} transparent opacity={0.5} sizeAttenuation />
    </points>
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
  const portal = useRef<THREE.Group>(null);
  const rings = useRef<THREE.Group>(null);
  const lights = useRef<THREE.Group>(null);

  useFrame(({ camera }, delta) => {
    const p = progress.get();
    const px = pointerEnabled ? pointerX.get() : 0;
    const py = pointerEnabled ? pointerY.get() : 0;
    const cameraTargetZ = 7.1 - p * 4.7;
    const cameraTargetX = px * 0.16 + Math.sin(p * Math.PI) * 0.16;
    const cameraTargetY = 0.1 + py * 0.1 - p * 0.08;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, cameraTargetX, 4.2, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, cameraTargetY, 4.2, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, cameraTargetZ, 4.5, delta);
    camera.lookAt(0, 0.08, -0.2);

    if (rig.current) {
      rig.current.rotation.y = THREE.MathUtils.damp(rig.current.rotation.y, -0.08 + p * 0.22 + px * 0.045, 4, delta);
      rig.current.rotation.x = THREE.MathUtils.damp(rig.current.rotation.x, 0.025 - py * 0.035, 4, delta);
      rig.current.position.y = THREE.MathUtils.damp(rig.current.position.y, Math.sin(p * Math.PI) * 0.12, 4, delta);
    }
    if (portal.current) {
      const targetScale = 1 + p * 0.12;
      portal.current.scale.setScalar(THREE.MathUtils.damp(portal.current.scale.x, targetScale, 4, delta));
    }
    if (rings.current) rings.current.rotation.z = p * 0.16;
    if (lights.current) lights.current.rotation.y += delta * 0.025;
  });

  return (
    <>
      <fog attach="fog" args={["#062219", 5.2, 13]} />
      <ambientLight intensity={1.45} />
      <directionalLight position={[3, 4, 5]} color="#efffd2" intensity={2.4} />
      <pointLight position={[-3, -1, 3]} color="#2cc98c" intensity={quality === "low" ? 5 : 8} distance={8} />

      <group ref={rig}>
        <group ref={rings}>
          <PortalRings quality={quality} />
        </group>
        <group ref={portal}>
          <WebsitePortal quality={quality} />
        </group>
        <group ref={lights}>
          <LightField quality={quality} />
        </group>
      </group>
    </>
  );
}
