"use client";

import { useFrame } from "@react-three/fiber";
import type { MotionValue } from "framer-motion";
import { useRef } from "react";
import * as THREE from "three";
import type { SceneQuality } from "./quality";

type StudioSceneProps = {
  progress: MotionValue<number>;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  pointerEnabled: boolean;
  quality: SceneQuality;
};

const COLORS = ["#cfff6a", "#55e6b4", "#66a7ff", "#8d7dff"];

function RectFrame({ width, height, depth, color, opacity }: {
  width: number;
  height: number;
  depth: number;
  color: string;
  opacity: number;
}) {
  const thickness = 0.022;
  return (
    <group position={[0, 0, depth]}>
      <mesh position={[0, height / 2, 0]}><boxGeometry args={[width, thickness, thickness]} /><meshBasicMaterial color={color} transparent opacity={opacity} /></mesh>
      <mesh position={[0, -height / 2, 0]}><boxGeometry args={[width, thickness, thickness]} /><meshBasicMaterial color={color} transparent opacity={opacity} /></mesh>
      <mesh position={[-width / 2, 0, 0]}><boxGeometry args={[thickness, height, thickness]} /><meshBasicMaterial color={color} transparent opacity={opacity} /></mesh>
      <mesh position={[width / 2, 0, 0]}><boxGeometry args={[thickness, height, thickness]} /><meshBasicMaterial color={color} transparent opacity={opacity} /></mesh>
    </group>
  );
}

function FrameTunnel({ quality }: { quality: SceneQuality }) {
  const count = quality === "high" ? 8 : quality === "medium" ? 6 : 4;
  return (
    <group rotation={[0.04, -0.03, -0.07]}>
      {Array.from({ length: count }, (_, index) => {
        const scale = 1 + index * 0.31;
        return (
          <RectFrame
            key={index}
            width={3.7 * scale}
            height={2.25 * scale}
            depth={-0.75 - index * 0.82}
            color={COLORS[index % COLORS.length]}
            opacity={Math.max(0.1, 0.38 - index * 0.038)}
          />
        );
      })}
    </group>
  );
}

function ArchitecturalPlanes({ quality }: { quality: SceneQuality }) {
  if (quality === "low") return null;
  return (
    <group>
      <mesh position={[-2.8, 1.4, -3.2]} rotation={[0.05, 0.22, -0.3]}>
        <planeGeometry args={[3.8, 0.6]} />
        <meshBasicMaterial color="#55e6b4" transparent opacity={0.1} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      <mesh position={[2.7, -1.45, -2.1]} rotation={[-0.08, -0.18, 0.24]}>
        <planeGeometry args={[4.5, 0.52]} />
        <meshBasicMaterial color="#8d7dff" transparent opacity={0.11} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      {quality === "high" ? (
        <mesh position={[0.6, 2.15, -5.4]} rotation={[0.1, 0.05, -0.12]}>
          <planeGeometry args={[7, 0.28]} />
          <meshBasicMaterial color="#cfff6a" transparent opacity={0.12} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
      ) : null}
    </group>
  );
}

export function StudioScene({ progress, pointerX, pointerY, pointerEnabled, quality }: StudioSceneProps) {
  const rig = useRef<THREE.Group>(null);
  const frames = useRef<THREE.Group>(null);
  const planes = useRef<THREE.Group>(null);

  useFrame(({ camera, size }, delta) => {
    const p = progress.get();
    const px = pointerEnabled ? pointerX.get() : 0;
    const py = pointerEnabled ? pointerY.get() : 0;
    const compact = size.width < 900;
    const anchorX = compact ? 0 : 1.45;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, px * 0.16 - p * 0.18, 4.4, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, 0.08 + py * 0.09 - p * 0.12, 4.4, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, 8.2 - p * 3.65, 4.4, delta);
    camera.lookAt(anchorX * 0.32, 0.02, -1.8 - p * 0.7);

    if (rig.current) {
      rig.current.position.x = THREE.MathUtils.damp(rig.current.position.x, anchorX + px * 0.12, 4, delta);
      rig.current.position.y = THREE.MathUtils.damp(rig.current.position.y, -py * 0.05, 4, delta);
      rig.current.rotation.y = THREE.MathUtils.damp(rig.current.rotation.y, -0.08 + p * 0.19, 4, delta);
    }
    if (frames.current) {
      frames.current.rotation.z = -0.08 + p * 0.16 + px * 0.018;
      frames.current.position.z = p * 1.25;
      frames.current.scale.setScalar(0.94 + p * 0.24);
    }
    if (planes.current) {
      planes.current.position.x = p * -0.7;
      planes.current.position.y = p * 0.24;
    }
  });

  return (
    <>
      <fog attach="fog" args={["#041d18", 6.5, 17]} />
      <group ref={rig}>
        <group ref={frames}><FrameTunnel quality={quality} /></group>
        <group ref={planes}><ArchitecturalPlanes quality={quality} /></group>
      </group>
    </>
  );
}
