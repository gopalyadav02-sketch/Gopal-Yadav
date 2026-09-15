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
  const material = useRef<THREE.ShaderMaterial>(null);
  const { pointer } = useThree();

  useFrame(({ clock }, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const root = group.current;
    if (!root) return;

    const scroll = window.scrollY / Math.max(window.innerHeight, 1);
    root.position.y = THREE.MathUtils.damp(root.position.y, -0.95 + scroll * 5.2, 3, delta);
    root.rotation.y = THREE.MathUtils.damp(root.rotation.y, reduced ? 0 : pointer.x * 0.055, 3, delta);
    root.rotation.x = THREE.MathUtils.damp(root.rotation.x, reduced ? -0.03 : -0.03 - pointer.y * 0.04, 3, delta);

    if (!reduced) {
      root.rotation.z = Math.sin(clock.elapsedTime * 0.18) * 0.035;
      if (material.current) material.current.uniforms.uTime.value += delta;
    }
  });

  return (
    <group ref={group} position={[0, -0.95, -3.2]}>
      <mesh renderOrder={3}>
        <planeGeometry args={[11.8, 8.2, 1, 1]} />
        <shaderMaterial
          ref={material}
          transparent
          depthWrite={false}
          uniforms={{ uTime: { value: 0 } }}
          vertexShader={/* glsl */ `
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={/* glsl */ `
            precision highp float;
            varying vec2 vUv;
            uniform float uTime;

            float hash(vec2 p) {
              return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
            }

            void main() {
              vec2 p = vUv - 0.5;
              p.x *= 1.42;
              float angle = atan(p.y, p.x);
              float radius = length(p);
              float coreRadius = 0.165;

              float turbulence = sin(angle * 15.0 - uTime * 1.7 + radius * 46.0) * 0.5 + 0.5;
              turbulence *= 0.72 + hash(floor(p * 170.0 + uTime * 0.7)) * 0.28;

              float disk = smoothstep(0.48, 0.22, radius) * smoothstep(coreRadius, 0.205, radius);
              float streaks = pow(turbulence, 3.0) * disk;
              float photonRing = exp(-pow((radius - 0.174) * 92.0, 2.0));
              float outerGlow = exp(-pow((radius - 0.25) * 10.0, 2.0)) * 0.26;
              float lensArc = exp(-pow((radius - 0.205) * 33.0, 2.0)) * (0.42 + 0.58 * abs(sin(angle)));

              vec3 ice = vec3(0.42, 0.72, 1.0);
              vec3 whiteHot = vec3(0.93, 0.97, 1.0);
              vec3 amber = vec3(1.0, 0.48, 0.16);
              float heat = smoothstep(0.43, 0.17, radius);
              vec3 diskColor = mix(ice, amber, streaks * 0.5);
              diskColor = mix(diskColor, whiteHot, heat * 0.72);

              vec3 color = diskColor * (disk * (0.16 + streaks * 1.45));
              color += whiteHot * photonRing * 1.8;
              color += ice * lensArc * 0.8;
              color += ice * outerGlow;

              float core = 1.0 - smoothstep(coreRadius - 0.004, coreRadius + 0.006, radius);
              color = mix(color, vec3(0.0), core);
              float alpha = max(max(disk * 0.92, photonRing), max(lensArc * 0.72, outerGlow));
              alpha = max(alpha, core);
              alpha *= 1.0 - smoothstep(0.43, 0.54, radius);
              gl_FragColor = vec4(color, alpha);
            }
          `}
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