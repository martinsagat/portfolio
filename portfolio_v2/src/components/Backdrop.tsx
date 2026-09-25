"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import type { Group, Mesh } from "three";

function Ring({
  radius,
  tube,
  speed,
  color,
  tilt,
  animate,
}: {
  radius: number;
  tube: number;
  speed: number;
  color: string;
  tilt: [number, number, number];
  animate: boolean;
}) {
  const mesh = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!mesh.current || !animate) return;
    mesh.current.rotation.z += delta * speed;
  });

  return (
    <mesh ref={mesh} rotation={tilt}>
      <torusGeometry args={[radius, tube, 48, 160]} />
      <meshPhysicalMaterial
        color={color}
        metalness={0.35}
        roughness={0.28}
        clearcoat={0.7}
        clearcoatRoughness={0.25}
      />
    </mesh>
  );
}

function Sculpture({
  animate,
  compact,
}: {
  animate: boolean;
  compact: boolean;
}) {
  const group = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!group.current || !animate) return;
    group.current.rotation.y += delta * 0.16;
    group.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.22) * 0.16;
  });

  return (
    <group
      ref={group}
      position={compact ? [0.15, -2.15, 0] : [3.35, -0.35, 0]}
      scale={compact ? 0.78 : 1.2}
    >
      <mesh>
        <icosahedronGeometry args={[0.72, 0]} />
        <meshStandardMaterial color="#14202b" metalness={0.55} roughness={0.28} />
      </mesh>
      <Ring
        radius={1.35}
        tube={0.045}
        speed={0.35}
        color="#d5dee2"
        tilt={[1.15, 0.2, 0.4]}
        animate={animate}
      />
      <Ring
        radius={1.7}
        tube={0.035}
        speed={-0.22}
        color="#8ea3ae"
        tilt={[0.4, 1.1, 0.15]}
        animate={animate}
      />
      <Ring
        radius={2.05}
        tube={0.028}
        speed={0.14}
        color="#5d7684"
        tilt={[1.8, 0.55, 1.2]}
        animate={animate}
      />
      <mesh position={[1.85, 0.95, 0.4]} rotation={[0.6, 0.3, 0.2]}>
        <octahedronGeometry args={[0.28, 0]} />
        <meshStandardMaterial color="#14202b" metalness={0.4} roughness={0.32} />
      </mesh>
    </group>
  );
}

export default function Backdrop() {
  const [animate, setAnimate] = useState(true);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const width = window.matchMedia("(max-width: 800px)");
    const updateMotion = () => setAnimate(!motion.matches);
    const updateWidth = () => setCompact(width.matches);
    updateMotion();
    updateWidth();
    motion.addEventListener("change", updateMotion);
    width.addEventListener("change", updateWidth);
    return () => {
      motion.removeEventListener("change", updateMotion);
      width.removeEventListener("change", updateWidth);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0" aria-hidden>
      <Canvas
        camera={{ position: [0, 0.15, 6.4], fov: 40 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        frameloop={animate ? "always" : "demand"}
      >
        <color attach="background" args={["#eef2f1"]} />
        <ambientLight intensity={0.65} />
        <directionalLight position={[5, 6, 4]} intensity={2.4} />
        <directionalLight position={[-6, -2, -2]} intensity={0.55} color="#9eb4c0" />
        <Sculpture animate={animate} compact={compact} />
      </Canvas>
      <div
        className={
          compact
            ? "absolute inset-0 bg-[linear-gradient(180deg,#eef2f1_0%,rgba(238,242,241,0.92)_42%,rgba(238,242,241,0.35)_68%,transparent_100%)]"
            : "absolute inset-0 bg-[linear-gradient(90deg,#eef2f1_0%,rgba(238,242,241,0.94)_22%,rgba(238,242,241,0.45)_40%,transparent_56%)]"
        }
      />
    </div>
  );
}
