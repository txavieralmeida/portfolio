"use client";

import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "next-themes";
import { usePortraitParticles } from "./use-portrait-particles";

// ---------------------------------------------------------------------------
// GLSL shaders (template literals; no loader needed for Turbopack)
// ---------------------------------------------------------------------------

const vertexShader = /* glsl */ `
  attribute float aAlpha;

  varying float vAlpha;
  varying float vStrength;

  uniform float uTime;
  uniform float uScale;
  uniform float uDensity;
  uniform vec2  uMouse;
  uniform float uScroll;

  void main() {
    vec3 pos = position;

    // Scale to fill viewport width (uScale = world-space viewport width)
    pos.xy *= uScale;

    // Scroll dissolve: front sweeps bottom→top as uScroll goes 0→1
    // position.y is roughly in [-0.56, 0.56]; front starts below the portrait at -0.8
    float front   = -0.8 + uScroll * 1.6;
    float dissolve = 1.0 - smoothstep(front - 0.12, front + 0.12, position.y);
    pos.x += position.x * dissolve * uScale * 2.0; // spread outward to the sides
    pos.y -= dissolve * 0.25 * uScale;             // drift downward

    // Subtle idle float
    pos.x += sin(uTime * 0.7 + position.y * 8.0) * 0.004;
    pos.y += cos(uTime * 0.5 + position.x * 8.0) * 0.004;

    // Mouse repulsion — push particles away from cursor
    vec2  toParticle = pos.xy - uMouse;
    float dist       = length(toParticle);
    float strength   = smoothstep(0.22 * uScale, 0.0, dist);

    if (dist > 0.001) {
      pos.xy += normalize(toParticle) * strength * 0.08 * uScale;
    }
    pos.z += strength * 0.4;

    vAlpha    = aAlpha * (1.0 - dissolve);
    vStrength = strength;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position     = projectionMatrix * mvPosition;
    gl_PointSize    = max(2.0, uDensity * uScale * 0.011) + strength * 0.5;
  }
`;

const fragmentShader = /* glsl */ `
  varying float vAlpha;
  varying float vStrength;

  uniform vec3 uColor;

  void main() {
    // Circular particle shape
    vec2  centre = gl_PointCoord - 0.5;
    float dist   = length(centre);
    float alpha  = smoothstep(0.5, 0.2, dist);

    gl_FragColor = vec4(uColor, alpha * vAlpha * (0.75 + vStrength * 0.25));
  }
`;

// ---------------------------------------------------------------------------
// Inner scene — must be a child of <Canvas> to access R3F hooks
// ---------------------------------------------------------------------------

interface ParticlesProps {
  imageSrc: string;
}

function Particles({ imageSrc }: ParticlesProps) {
  const { resolvedTheme } = useTheme();
  const { positions, alphas, count, aspectRatio } = usePortraitParticles(imageSrc, 30, resolvedTheme === "light");
  const { gl, camera, size } = useThree();

  // Smoothed targets for mouse and scroll uniforms
  const mouseTarget  = useRef(new THREE.Vector2(9999, 9999));
  const scrollTarget = useRef(0);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Create uniforms once; colour starts neutral and is corrected in the effect below
  const uniforms = useMemo(
    () => ({
      uTime:    { value: 0 },
      uScale:   { value: 1.0 },
      uDensity: { value: 0.8 },
      uMouse:   { value: new THREE.Vector2(9999, 9999) },
      uScroll:  { value: 0 },
      uColor:   { value: new THREE.Color("#333333") },
    }),
    []
  );

  // Sync colour + blending when theme resolves/changes OR when material first mounts (count 0→N)
  useEffect(() => {
    if (!materialRef.current) return;
    const isDark = resolvedTheme === "dark";
    materialRef.current.uniforms.uColor.value.set(isDark ? "#bbbbbb" : "#000000");
    // Additive blending (glow) on dark; normal blending (opaque dots) on light
    materialRef.current.blending = isDark ? THREE.AdditiveBlending : THREE.NormalBlending;
    materialRef.current.needsUpdate = true;
  }, [resolvedTheme, count]);

  // Scroll tracking — progress 0→1 over the hero viewport height
  useEffect(() => {
    const handleScroll = () => {
      scrollTarget.current = Math.min(window.scrollY / (window.innerHeight * 0.50), 1);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mouse tracking — use the canvas bounding rect for accurate NDC→world mapping
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      // Normalised Device Coordinates: x∈[-1,1], y∈[-1,1]
      const ndcX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ndcY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      // Unproject NDC to world space at z=0
      const vec = new THREE.Vector3(ndcX, ndcY, 0.5);
      vec.unproject(camera);
      const dir = vec.sub(camera.position).normalize();
      const t = -(camera.position.z / dir.z);
      const world = new THREE.Vector3().addVectors(
        camera.position,
        dir.multiplyScalar(t)
      );

      mouseTarget.current.set(world.x, world.y);
    };

    const handlePointerLeave = () => {
      mouseTarget.current.set(9999, 9999);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [gl, camera, size]);

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    const scaleByWidth  = state.viewport.width * 0.40;
    const scaleByHeight = (state.viewport.height * 0.70) / aspectRatio;
    materialRef.current.uniforms.uScale.value = Math.max(scaleByWidth, scaleByHeight);
    // Screen pixels per world unit — keeps particle size proportional to portrait scale
    materialRef.current.uniforms.uDensity.value = state.viewport.factor;
    // Smooth lerp toward the real mouse position
    materialRef.current.uniforms.uMouse.value.lerp(mouseTarget.current, 0.08);
    // Smooth lerp toward scroll target
    materialRef.current.uniforms.uScroll.value = THREE.MathUtils.lerp(
      materialRef.current.uniforms.uScroll.value,
      scrollTarget.current,
      0.06
    );
  });

  if (count === 0) return null;

  return (
    <points>
      <bufferGeometry key={count}>
        {/* Built-in 'position' attribute */}
        <bufferAttribute args={[positions, 3]} attach="attributes-position" />
        {/* Custom alpha attribute for per-particle brightness */}
        <bufferAttribute args={[alphas, 1]} attach="attributes-aAlpha" />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ---------------------------------------------------------------------------
// Exported scene — the Canvas wrapper
// ---------------------------------------------------------------------------

interface ParticleSceneProps {
  imageSrc: string;
}

export default function ParticleScene({ imageSrc }: ParticleSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 1], fov: 75 }}
      gl={{ alpha: true, antialias: false }}
      dpr={[1, 1.5]}
      style={{ pointerEvents: "none" }}
    >
      <Particles imageSrc={imageSrc} />
    </Canvas>
  );
}
