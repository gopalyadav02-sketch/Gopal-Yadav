import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import { useReducedMotion } from "./hooks";

const STAR_COUNT = 1500;

function MovingStars({ reduced }: { reduced: boolean }) {
  const points = useRef<THREE.Points>(null);
  const material = useRef<THREE.PointsMaterial>(null);
  const positions = useMemo(() => {
    const values = new Float32Array(STAR_COUNT * 3);
    let seed = 4819;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    for (let i = 0; i < STAR_COUNT; i += 1) {
      const radius = 12 + random() * 58;
      const angle = random() * Math.PI * 2;
      values[i * 3] = Math.cos(angle) * radius;
      values[i * 3 + 1] = (random() - 0.5) * 70;
      values[i * 3 + 2] = -random() * 70 + 8;
    }
    return values;
  }, []);

  useFrame(({ clock }, rawDelta) => {
    const cloud = points.current;
    if (!cloud || reduced) return;
    const delta = Math.min(rawDelta, 0.05);
    cloud.rotation.y += delta * 0.009;
    cloud.rotation.z = Math.sin(clock.elapsedTime * 0.08) * 0.018;
    cloud.position.z += delta * 0.75;
    if (cloud.position.z > 24) cloud.position.z = 0;
    if (material.current) material.current.opacity = 0.72 + Math.sin(clock.elapsedTime * 0.7) * 0.08;
  });

  return (
    <points ref={points} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={material}
        color="#dceaff"
        size={0.075}
        sizeAttenuation
        transparent
        opacity={0.78}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function CameraDrift({ reduced }: { reduced: boolean }) {
  useFrame(({ camera, pointer }, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const targetX = reduced ? 0 : pointer.x * 0.32;
    const targetY = reduced ? 0 : pointer.y * 0.2;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 2.4, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 2.4, delta);
    camera.lookAt(0, 0, -5);
  });
  return null;
}

export function SpaceScene() {
  const reduced = useReducedMotion();

  return (
    <div aria-hidden="true" className="space-canvas pointer-events-none fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 48 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: false }}>
        <color attach="background" args={["#02040a"]} />
        <fogExp2 attach="fog" args={["#02040a", 0.018]} />
        <MovingStars reduced={reduced} />
        <CameraDrift reduced={reduced} />
      </Canvas>
    </div>
  );
}