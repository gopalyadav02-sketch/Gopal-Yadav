import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
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

function BlackHole({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const outerDisk = useRef<THREE.Mesh>(null);
  const innerDisk = useRef<THREE.Mesh>(null);
  const glow = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame(({ clock }, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const root = group.current;
    if (!root) return;

    const scroll = window.scrollY / Math.max(window.innerHeight, 1);
    root.position.y = THREE.MathUtils.damp(root.position.y, scroll * 5.2, 3, delta);
    root.rotation.y = THREE.MathUtils.damp(root.rotation.y, reduced ? 0.18 : pointer.x * 0.2, 3, delta);
    root.rotation.x = THREE.MathUtils.damp(root.rotation.x, reduced ? 0.98 : 0.98 - pointer.y * 0.1, 3, delta);

    if (!reduced) {
      root.rotation.z += delta * 0.035;
      if (outerDisk.current) outerDisk.current.rotation.z -= delta * 0.22;
      if (innerDisk.current) innerDisk.current.rotation.z += delta * 0.34;
      if (glow.current) {
        const pulse = 1 + Math.sin(clock.elapsedTime * 0.65) * 0.035;
        glow.current.scale.setScalar(pulse);
      }
    }
  });

  return (
    <group ref={group} position={[0, -0.55, -3.2]} rotation={[0.98, 0.18, -0.08]}>
      <mesh ref={glow} renderOrder={0}>
        <ringGeometry args={[3.05, 4.65, 128]} />
        <meshBasicMaterial
          color="#3b79c9"
          transparent
          opacity={0.12}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh ref={outerDisk} renderOrder={1}>
        <ringGeometry args={[2.25, 4.25, 160, 3]} />
        <meshBasicMaterial
          color="#e7f3ff"
          transparent
          opacity={0.42}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh ref={innerDisk} position={[0, 0, 0.035]} renderOrder={2}>
        <ringGeometry args={[1.95, 3.52, 160, 2]} />
        <meshBasicMaterial
          color="#78b8ff"
          transparent
          opacity={0.72}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh position={[0, 0, 0.12]} renderOrder={4}>
        <sphereGeometry args={[2.12, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      <mesh position={[0, 0, 0.16]} renderOrder={5}>
        <ringGeometry args={[2.08, 2.22, 128]} />
        <meshBasicMaterial
          color="#d9efff"
          transparent
          opacity={0.72}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
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
        <BlackHole reduced={reduced} />
        <CameraDrift reduced={reduced} />
      </Canvas>
    </div>
  );
}